import Link from "next/link";
import type { BlogPostFrontmatter } from "@/lib/blog";
import { getCategoryLabel } from "@/data/blogCategories";

interface BlogCardProps {
  post: BlogPostFrontmatter;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block bg-white rounded-sm border border-brand-border overflow-hidden
                 hover:shadow-lg transition-shadow duration-300"
    >
      {/* Image */}
      <div className="relative h-48 md:h-56 overflow-hidden bg-brand-light">
        {post.featuredImage ? (
          <img
            src={post.featuredImage}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-brand-navy/5 flex items-center justify-center">
            <svg
              className="w-16 h-16 text-brand-navy/15"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
              />
            </svg>
          </div>
        )}
        {/* Category badge */}
        <span className="absolute top-3 left-3 bg-brand-red text-white text-xs font-bold px-3 py-1 rounded-sm uppercase tracking-wider">
          {getCategoryLabel(post.category)}
        </span>
      </div>

      {/* Content */}
      <div className="p-5 md:p-6">
        <div className="flex items-center gap-3 text-xs text-brand-gray mb-3">
          <time dateTime={post.date}>
            {new Date(post.date + "T12:00:00").toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </time>
          <span className="w-1 h-1 bg-brand-gray/40 rounded-full" />
          <span>{post.readTime}</span>
        </div>

        <h3 className="text-lg md:text-xl font-bold text-brand-dark mb-2 group-hover:text-brand-red transition-colors duration-200 line-clamp-2">
          {post.title}
        </h3>
        <p className="text-sm text-brand-gray leading-relaxed line-clamp-3">
          {post.description}
        </p>

        <span className="inline-flex items-center gap-2 text-brand-red font-semibold text-sm mt-4 group-hover:gap-3 transition-all duration-200">
          Read More
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </span>
      </div>
    </Link>
  );
}
