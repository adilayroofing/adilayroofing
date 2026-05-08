import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getPostSlugs,
  getPostBySlug,
  getRelatedPosts,
  generateTOC,
  generateTOCFromHtml,
  renderMarkdown,
  BASE_URL,
} from "@/lib/blog";
import { getPageSEO, buildMetadataFromSEO } from "@/lib/seo";
import Breadcrumbs from "@/components/blog/Breadcrumbs";
import BlogHero from "@/components/blog/BlogHero";
import TableOfContents from "@/components/blog/TableOfContents";
import BlogPostContent from "@/components/blog/BlogPostContent";
import ShareButtons from "@/components/blog/ShareButtons";
import BlogFAQSection from "@/components/blog/BlogFAQSection";
import RelatedPosts from "@/components/blog/RelatedPosts";
import StickyMobileCTA from "@/components/blog/StickyMobileCTA";
import CTASection from "@/components/CTASection";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import { ORG_REF, stripHtml } from "@/lib/schema";

// Revalidate daily. Deploys regenerate immediately; CMS-only edits and scheduled-post
// flips propagate within 24h.
export const revalidate = 86400;

// ─── Helpers ────────────────────────────────────────────────────────
function isPostPublished(dateStr: string): boolean {
  const now = new Date();
  now.setHours(23, 59, 59, 999);
  return new Date(dateStr) <= now;
}

// ─── Static params ──────────────────────────────────────────────────
export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

// ─── Metadata ───────────────────────────────────────────────────────
type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post || !isPostPublished(post.frontmatter.date))
    return { title: "Post Not Found" };

  // Check Supabase for CMS-managed SEO data first
  const dbSeo = await getPageSEO(`/blog/${slug}`);
  if (dbSeo) {
    return {
      ...buildMetadataFromSEO(dbSeo),
      keywords: [post.frontmatter.primaryKeyword, ...post.frontmatter.secondaryKeywords],
    };
  }

  // Fallback to frontmatter metadata
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
  const post = await getPostBySlug(slug);
  if (!post || !isPostPublished(post.frontmatter.date)) notFound();

  const { frontmatter: fm } = post;

  // Render content based on source
  const htmlContent =
    post.source === "cms" && post.htmlContent
      ? post.htmlContent
      : renderMarkdown(post.content);

  // Generate TOC based on source
  const toc =
    post.source === "cms" && post.htmlContent
      ? generateTOCFromHtml(post.htmlContent)
      : generateTOC(post.content);

  const related = await getRelatedPosts(fm.slug, fm.category, fm.relatedSlugs);
  const postUrl = `${BASE_URL}/blog/${fm.slug}`;

  // BlogPosting JSON-LD
  const featuredImageUrl = fm.featuredImage
    ? fm.featuredImage.startsWith("http")
      ? fm.featuredImage
      : `${BASE_URL}${fm.featuredImage}`
    : undefined;

  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${postUrl}#article`,
    headline: fm.title,
    description: fm.description,
    url: postUrl,
    datePublished: fm.date,
    dateModified: fm.dateModified || fm.date,
    author: {
      "@type": "Person",
      name: fm.author || "Adilay Roofing Team",
      affiliation: ORG_REF,
    },
    publisher: ORG_REF,
    image: featuredImageUrl
      ? {
          "@type": "ImageObject",
          url: featuredImageUrl,
          contentUrl: featuredImageUrl,
        }
      : undefined,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": postUrl,
    },
    inLanguage: "en-US",
    isPartOf: { "@id": `${BASE_URL}/blog#blog` },
    keywords: [fm.primaryKeyword, ...fm.secondaryKeywords].filter(Boolean).join(", "),
  };

  // FAQ JSON-LD
  const faqSchema =
    fm.faq && fm.faq.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: fm.faq.map((item) => ({
            "@type": "Question",
            name: stripHtml(item.question),
            acceptedAnswer: {
              "@type": "Answer",
              text: stripHtml(item.answer),
            },
          })),
        }
      : null;

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
      <BreadcrumbJsonLd
        items={[
          { name: "Blog", path: "/blog" },
          { name: fm.title, path: `/blog/${fm.slug}` },
        ]}
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
        featuredImage={fm.featuredImage}
      />

      {/* Article Body */}
      <article className="bg-white">
        <div className={`section-padding ${fm.featuredImage ? "pt-16 md:pt-20" : ""}`}>
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
