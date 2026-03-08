import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getPostSlugs,
  getPostBySlug,
  getRelatedPosts,
  generateTOC,
  renderMarkdown,
  BASE_URL,
} from "@/lib/blog";
import Breadcrumbs from "@/components/blog/Breadcrumbs";
import BlogHero from "@/components/blog/BlogHero";
import TableOfContents from "@/components/blog/TableOfContents";
import BlogPostContent from "@/components/blog/BlogPostContent";
import ShareButtons from "@/components/blog/ShareButtons";
import BlogFAQSection from "@/components/blog/BlogFAQSection";
import RelatedPosts from "@/components/blog/RelatedPosts";
import StickyMobileCTA from "@/components/blog/StickyMobileCTA";
import CTASection from "@/components/CTASection";

// Revalidate every 6 hours so scheduled posts go live automatically
export const revalidate = 21600;

// ─── Static params ──────────────────────────────────────────────────
export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

// ─── Metadata ───────────────────────────────────────────────────────
type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Post Not Found" };

  const { frontmatter: fm } = post;
  const url = `${BASE_URL}/blog/${fm.slug}`;

  return {
    title: fm.title,
    description: fm.description,
    keywords: [fm.primaryKeyword, ...fm.secondaryKeywords],
    openGraph: {
      title: fm.title,
      description: fm.description,
      url,
      type: "article",
      publishedTime: fm.date,
      authors: [fm.author],
      images: fm.featuredImage
        ? [{ url: `${BASE_URL}${fm.featuredImage}` }]
        : undefined,
    },
    alternates: {
      canonical: url,
    },
  };
}

// ─── Page ───────────────────────────────────────────────────────────
export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const { frontmatter: fm, content } = post;
  const htmlContent = renderMarkdown(content);
  const toc = generateTOC(content);
  const related = getRelatedPosts(fm.slug, fm.category, fm.relatedSlugs);
  const postUrl = `${BASE_URL}/blog/${fm.slug}`;

  // BlogPosting JSON-LD
  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: fm.title,
    description: fm.description,
    url: postUrl,
    datePublished: fm.date,
    dateModified: fm.date,
    author: {
      "@type": "Organization",
      name: "Adilay Roofing",
      url: BASE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "Adilay Roofing",
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/images/logo-new.png`,
      },
    },
    image: fm.featuredImage ? `${BASE_URL}${fm.featuredImage}` : undefined,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": postUrl,
    },
    keywords: [fm.primaryKeyword, ...fm.secondaryKeywords].join(", "),
  };

  // FAQ JSON-LD
  const faqSchema =
    fm.faq && fm.faq.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: fm.faq.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.answer,
            },
          })),
        }
      : null;

  // Breadcrumb JSON-LD
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: BASE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${BASE_URL}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: fm.title,
        item: postUrl,
      },
    ],
  };

  return (
    <>
      {/* JSON-LD Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogPostingSchema),
        }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema),
          }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: fm.title },
        ]}
      />

      {/* Hero */}
      <BlogHero
        title={fm.title}
        author={fm.author}
        date={fm.date}
        readTime={fm.readTime}
        category={fm.category}
      />

      {/* Article Body */}
      <article className="bg-white">
        <div className="section-padding">
          <div className="container-narrow mx-auto">
            {/* Mobile TOC */}
            <TableOfContents items={toc} />

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_250px] gap-10">
              {/* Main Content Column */}
              <div>
                <BlogPostContent htmlContent={htmlContent} />

                {/* Share Buttons */}
                <div className="mt-10 pt-6 border-t border-brand-border">
                  <ShareButtons url={postUrl} title={fm.title} />
                </div>
              </div>

              {/* Sidebar TOC (desktop only) */}
              <aside className="hidden lg:block">
                <div className="sticky top-32">
                  <TableOfContents items={toc} />
                </div>
              </aside>
            </div>
          </div>
        </div>
      </article>

      {/* FAQ Section */}
      {fm.faq && fm.faq.length > 0 && <BlogFAQSection items={fm.faq} />}

      {/* CTA */}
      <CTASection
        headline="Need Roofing Help in Philadelphia?"
        subtext="Contact Adilay Roofing today for a free estimate. Licensed (PA184779), insured, and serving Philadelphia and surrounding counties for 20+ years."
      />

      {/* Related Posts */}
      {related.length > 0 && (
        <RelatedPosts posts={related.map((p) => p.frontmatter)} />
      )}

      {/* Sticky Mobile CTA */}
      <StickyMobileCTA />
    </>
  );
}
