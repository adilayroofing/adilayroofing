import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import BlogCard from "@/components/blog/BlogCard";
import CTASection from "@/components/CTASection";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";

// Revalidate every 6 hours so scheduled posts go live automatically
export const revalidate = 21600;

export const metadata: Metadata = {
  title: "Roofing Blog — Tips, Guides & Philadelphia Roofing Insights",
  description:
    "Expert roofing tips, cost guides, and insights for Philadelphia homeowners. Learn about roof replacement, repair, maintenance, and more from Adilay Roofing.",
  keywords: [
    "roofing blog Philadelphia",
    "roof replacement tips",
    "roofing cost guide",
    "Philadelphia roofing advice",
    "roof maintenance tips",
    "roofing contractor blog",
  ],
  openGraph: {
    title: "Roofing Blog | Adilay Roofing Philadelphia",
    description:
      "Expert roofing tips, cost guides, and insights for Philadelphia homeowners.",
    url: "https://www.adilayroofing.com/blog",
    type: "website",
  },
  alternates: {
    canonical: "https://www.adilayroofing.com/blog",
  },
};

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Blog", path: "/blog" }]} />
      {/* Hero */}
      <section className="bg-brand-dark">
        <div className="section-padding">
          <div className="container-narrow mx-auto text-center">
            <span className="inline-block text-brand-red font-bold text-xs md:text-sm tracking-widest uppercase mb-3 md:mb-4">
              Blog
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 md:mb-6">
              Roofing Tips & Expert Insights
            </h1>
            <p className="text-base md:text-xl text-white/70 max-w-2xl mx-auto">
              Practical advice for Philadelphia homeowners — from roof
              maintenance to choosing the right materials for your home.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="section-padding bg-white">
        <div className="container-wide mx-auto">
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {posts.map((post) => (
                <BlogCard
                  key={post.frontmatter.slug}
                  post={post.frontmatter}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-brand-gray text-lg">
                Blog posts coming soon! Check back for expert roofing tips and
                guides.
              </p>
            </div>
          )}
        </div>
      </section>

      <CTASection
        headline="Need Roofing Help in Philadelphia?"
        subtext="Contact Adilay Roofing today for a free estimate. Honest advice, quality work, no pressure."
      />
    </>
  );
}
