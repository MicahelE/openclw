import { getAllContent } from "@/lib/content";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "OpenClaw news, security guides, comparisons, and ecosystem updates. Stay informed about the latest in AI agent technology.",
};

export default function BlogPage() {
  const posts = getAllContent("blog");

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Blog</h1>
      <p className="mt-3 text-lg text-gray-600 dark:text-gray-400">
        News, security guides, and ecosystem updates for OpenClaw.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Card key={post.slug} href={`/blog/${post.slug}`}>
            <CardTitle>{post.title}</CardTitle>
            <CardDescription>{post.description}</CardDescription>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              {post.tags?.map((tag) => (
                <Badge key={tag}>{tag}</Badge>
              ))}
              <span className="text-xs text-gray-500">
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
          </Card>
        ))}
      </div>

      {posts.length === 0 && (
        <p className="py-12 text-center text-gray-500">No blog posts yet. Check back soon!</p>
      )}
    </div>
  );
}
