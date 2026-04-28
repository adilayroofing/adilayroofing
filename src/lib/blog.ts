import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked, Renderer } from "marked";
import { createClient } from "@supabase/supabase-js";

/** Public read-only Supabase client for fetching blog posts (no service role key needed) */
function createBlogClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

// ─── Types ──────────────────────────────────────────────────────────
export interface BlogPostFrontmatter {
  title: string;
  slug: string;
  date: string;
  /** Optional ISO date — falls back to `date` when absent. Used for schema.org dateModified. */
  dateModified?: string;
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
  content: string; // markdown content (for markdown posts)
  htmlContent?: string; // pre-rendered HTML (for CMS posts)
  source: "cms" | "markdown";
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

// ─── CMS (Supabase) blog post fetching ──────────────────────────────
async function getCMSBlogPosts(publishedOnly = true): Promise<BlogPost[]> {
  try {
    const supabase = createBlogClient();
    let query = supabase
      .from("blog_posts")
      .select("*")
      .order("date", { ascending: false });
    if (publishedOnly) {
      query = query.eq("status", "published");
    }
    const { data, error } = await query;

    if (error || !data) return [];

    return data.map((row) => ({
      frontmatter: {
        title: row.title,
        slug: row.slug,
        date: row.date,
        dateModified: row.updated_at || row.date,
        description: row.description || "",
        primaryKeyword: row.primary_keyword || "",
        secondaryKeywords: row.secondary_keywords || [],
        author: row.author || "Adilay Roofing",
        readTime: row.read_time || "5 min read",
        category: row.category || "general-roofing",
        featuredImage: row.featured_image || "",
        faq: (row.faq as { question: string; answer: string }[]) || [],
      },
      content: "", // CMS posts use HTML, not markdown
      htmlContent: row.body_html || "",
      source: "cms" as const,
    }));
  } catch {
    // Supabase not configured or unreachable — fall through to markdown
    return [];
  }
}

async function getCMSBlogPost(slug: string): Promise<BlogPost | undefined> {
  try {
    const supabase = createBlogClient();
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("slug", slug)
      .single();

    if (error || !data) return undefined;

    return {
      frontmatter: {
        title: data.title,
        slug: data.slug,
        date: data.date,
        dateModified: data.updated_at || data.date,
        description: data.description || "",
        primaryKeyword: data.primary_keyword || "",
        secondaryKeywords: data.secondary_keywords || [],
        author: data.author || "Adilay Roofing",
        readTime: data.read_time || "5 min read",
        category: data.category || "general-roofing",
        featuredImage: data.featured_image || "",
        faq: (data.faq as { question: string; answer: string }[]) || [],
      },
      content: "",
      htmlContent: data.body_html || "",
      source: "cms" as const,
    };
  } catch {
    return undefined;
  }
}

// ─── Markdown file blog post fetching ───────────────────────────────
function getMarkdownPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md"));

  return files.map((filename) => {
    const filePath = path.join(BLOG_DIR, filename);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(fileContent);
    return {
      frontmatter: data as BlogPostFrontmatter,
      content,
      source: "markdown" as const,
    };
  });
}

function getMarkdownPost(slug: string): BlogPost | undefined {
  const filePath = path.join(BLOG_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return undefined;

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);
  return {
    frontmatter: data as BlogPostFrontmatter,
    content,
    source: "markdown" as const,
  };
}

// ─── Merged fetching: CMS first, then markdown (deduplicated by slug)
function mergePosts(cmsPosts: BlogPost[], mdPosts: BlogPost[]): BlogPost[] {
  const cmsSlugs = new Set(cmsPosts.map((p) => p.frontmatter.slug));
  const uniqueMdPosts = mdPosts.filter((p) => !cmsSlugs.has(p.frontmatter.slug));
  const all = [...cmsPosts, ...uniqueMdPosts];
  all.sort(
    (a, b) =>
      new Date(b.frontmatter.date).getTime() -
      new Date(a.frontmatter.date).getTime()
  );
  return all;
}

function filterPublished(posts: BlogPost[]): BlogPost[] {
  const now = new Date();
  now.setHours(23, 59, 59, 999);
  return posts.filter((p) => new Date(p.frontmatter.date) <= now);
}

// ─── Public API ─────────────────────────────────────────────────────

/** Get all published posts (CMS + markdown, deduplicated, newest first) */
export async function getAllPosts(): Promise<BlogPost[]> {
  const cmsPosts = await getCMSBlogPosts(true); // only published
  const mdPosts = getMarkdownPosts();
  return filterPublished(mergePosts(cmsPosts, mdPosts));
}

/** Get all posts including future/draft (for static generation) */
export async function getAllPostsIncludingFuture(): Promise<BlogPost[]> {
  const cmsPosts = await getCMSBlogPosts(false); // include drafts for static generation
  const mdPosts = getMarkdownPosts();
  return mergePosts(cmsPosts, mdPosts);
}

/** Get a single post by slug (CMS first, then markdown fallback) */
export async function getPostBySlug(slug: string): Promise<BlogPost | undefined> {
  const cmsPost = await getCMSBlogPost(slug);
  if (cmsPost) return cmsPost;
  return getMarkdownPost(slug);
}

/** Get all slugs for generateStaticParams */
export async function getPostSlugs(): Promise<string[]> {
  const all = await getAllPostsIncludingFuture();
  return all.map((p) => p.frontmatter.slug);
}

/** Get only published post slugs (for sitemap) */
export async function getPublishedPostSlugs(): Promise<string[]> {
  const posts = await getAllPosts();
  return posts.map((p) => p.frontmatter.slug);
}

/** Find related posts (only published) */
export async function getRelatedPosts(
  currentSlug: string,
  category: string,
  relatedSlugs?: string[],
  limit = 3
): Promise<BlogPost[]> {
  const all = await getAllPosts();

  if (relatedSlugs && relatedSlugs.length > 0) {
    const manual = relatedSlugs
      .map((s) => all.find((p) => p.frontmatter.slug === s))
      .filter(Boolean) as BlogPost[];
    if (manual.length >= limit) return manual.slice(0, limit);
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

/** Generate TOC from HTML content (for CMS posts) */
export function generateTOCFromHtml(html: string): TOCItem[] {
  const headingRegex = /<h2[^>]*id="([^"]*)"[^>]*>(.*?)<\/h2>/gi;
  const items: TOCItem[] = [];
  let match: RegExpExecArray | null;

  while ((match = headingRegex.exec(html)) !== null) {
    const id = match[1];
    const text = match[2].replace(/<[^>]*>/g, "").trim();
    items.push({ id, text });
  }

  return items;
}

// ─── renderMarkdown ─────────────────────────────────────────────────
export function renderMarkdown(content: string): string {
  return marked.parse(content) as string;
}
