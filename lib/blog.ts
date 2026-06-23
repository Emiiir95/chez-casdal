import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export type BlogFrontmatter = {
  title: string;
  description: string;
  date: string;
  slug: string;
  image?: string;
  imageAlt?: string;
  tags?: string[];
  readingMinutes?: number;
  city?: string;
  zip?: string;
  /** "html" si le corps est déjà du HTML (généré via le pipeline SEO),
   *  sinon Markdown classique. */
  format?: "html" | "markdown";
};

export type BlogPost = BlogFrontmatter & {
  contentHtml: string;
};

export type BlogPostSummary = BlogFrontmatter;

function readPost(filename: string): {
  data: BlogFrontmatter;
  content: string;
} {
  const fullPath = path.join(BLOG_DIR, filename);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  return { data: data as BlogFrontmatter, content };
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

export function getAllPosts(): BlogPostSummary[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md"));
  return files
    .map((file) => readPost(file).data)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

function isHtmlBody(content: string, format?: string): boolean {
  if (format === "html") return true;
  return content.trimStart().startsWith("<");
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const filename = `${slug}.md`;
  if (!fs.existsSync(path.join(BLOG_DIR, filename))) return null;
  const { data, content } = readPost(filename);

  const contentHtml = isHtmlBody(content, data.format)
    ? content
    : (await remark().use(html).process(content)).toString();

  return { ...data, contentHtml };
}
