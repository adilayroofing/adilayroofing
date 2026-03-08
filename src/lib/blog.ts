import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked, Renderer } from "marked";

// ─── Types ──────────────────────────────────────────────────────────
export interface BlogPostFrontmatter {
  title: string;
  slug: string;
  date: string;
  description: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  author: string;
  readTime: string;
  category: string;
  featuredImage: string;
  faq: { question: string; answer: string }[];
  relatedSlugs?: string[];
}

export interface BlogPost {
  frontmatter: BlogPostFrontmatter;
  content: string;
}

export interface TOCItem {
  id: string;
  text: string;
}

// ─── Constants ──────────────────────────────────────────────────────
const BLOG_DIR = path.join(process.cwd(), "content", "blog");
export const BASE_URL = "https://www.adilayroofing.com";

// ─── Markdown renderer with heading IDs ─────────────────────────────
const renderer = new Renderer();

renderer.heading = function ({ tokens, depth }) {
  const text = this.parser.parseInline(tokens);
  if (depth === 2) {
    const id = text
      .toLowerCase()
      .replace(/<[^>]*>/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    return `<h2 id="${id}">${text}</h2>\n`;
  }
  if (depth === 3) {
    const id = text
      .toLowerCase()
      .replace(/<[^>]*>/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    return `<h3 id="${id}">${text}</h3>\n`;
  }
  return `<h${depth}>${text}</h${depth}>\n`;
};

marked.use({ renderer });

// ─── getAllPosts (sorted by date, newest first, only published) ──────
export function getAllPosts(): BlogPost[] {
  const all = getAllPostsIncludingFuture();
  const now = new Date();
  // Set to end of today so posts dated "today" are included
  now.setHours(23, 59, 59, 999);
  return all.filter((p) => new Date(p.frontmatter.date) <= now);
}

// ─── getAllPostsIncludingFuture (for static generation) ──────────────
export function getAllPostsIncludingFuture(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md"));

  const posts = files.map((filename) => {
    const filePath = path.join(BLOG_DIR, filename);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(fileContent);
    return {
      frontmatter: data as BlogPostFrontmatter,
      content,
    };
  });

  posts.sort(
    (a, b) =>
      new Date(b.frontmatter.date).getTime() -
      new Date(a.frontmatter.date).getTime()
  );

  return posts;
}

// ─── getPostBySlug ──────────────────────────────────────────────────
export function getPostBySlug(slug: string): BlogPost | undefined {
  const filePath = path.join(BLOG_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return undefined;

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);
  return {
    frontmatter: data as BlogPostFrontmatter,
    content,
  };
}

// ─── getPostSlugs (for generateStaticParams) ────────────────────────
export function getPostSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

// ─── getRelatedPosts (only published) ────────────────────────────────
export function getRelatedPosts(
  currentSlug: string,
  category: string,
  relatedSlugs?: string[],
  limit = 3
): BlogPost[] {
  const all = getAllPosts(); // already date-filtered

  if (relatedSlugs && relatedSlugs.length > 0) {
    const manual = relatedSlugs
      .map((s) => all.find((p) => p.frontmatter.slug === s))
      .filter(Boolean) as BlogPost[];
    if (manual.length >= limit) return manual.slice(0, limit);
    // Fill remaining with same-category
    const remaining = all.filter(
      (p) =>
        p.frontmatter.slug !== currentSlug &&
        p.frontmatter.category === category &&
        !relatedSlugs.includes(p.frontmatter.slug)
    );
    return [...manual, ...remaining].slice(0, limit);
  }

  return all
    .filter(
      (p) =>
        p.frontmatter.slug !== currentSlug &&
        p.frontmatter.category === category
    )
    .slice(0, limit);
}

// ─── generateTOC from markdown content ──────────────────────────────
export function generateTOC(markdownContent: string): TOCItem[] {
  const headingRegex = /^## (.+)$/gm;
  const items: TOCItem[] = [];
  let match: RegExpExecArray | null;

  while ((match = headingRegex.exec(markdownContent)) !== null) {
    const text = match[1].trim();
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    items.push({ id, text });
  }

  return items;
}

// ─── renderMarkdown ─────────────────────────────────────────────────
export function renderMarkdown(content: string): string {
  return marked.parse(content) as string;
}
