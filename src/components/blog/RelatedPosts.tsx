import type { BlogPostFrontmatter } from "@/lib/blog";
import BlogCard from "@/components/blog/BlogCard";

interface RelatedPostsProps {
  posts: BlogPostFrontmatter[];
}

export default function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) return null;

  return (
    <section className="bg-brand-light">
      <div className="section-padding">
        <div className="container-wide mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-brand-dark text-center mb-8">
            Related Articles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
