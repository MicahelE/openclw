import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface ContentMeta {
  title: string;
  description: string;
  date: string;
  author: string;
  tags: string[];
  category?: string;
  featuredImage?: string;
  slug: string;
}

export interface ContentItem {
  meta: ContentMeta;
  content: string;
}

function getContentDir(type: "tutorials" | "blog"): string {
  return path.join(process.cwd(), "content", type);
}

export function getAllContent(type: "tutorials" | "blog"): ContentMeta[] {
  const dir = getContentDir(type);
  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));

  const items = files.map((filename) => {
    const filePath = path.join(dir, filename);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(fileContent);
    return {
      ...data,
      slug: filename.replace(/\.mdx$/, ""),
    } as ContentMeta;
  });

  return items.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getContentBySlug(
  type: "tutorials" | "blog",
  slug: string
): ContentItem | null {
  const filePath = path.join(getContentDir(type), `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  return {
    meta: { ...data, slug } as ContentMeta,
    content,
  };
}

export function getAllSlugs(type: "tutorials" | "blog"): string[] {
  const dir = getContentDir(type);
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}
