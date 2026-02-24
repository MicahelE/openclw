import { notFound } from "next/navigation";
import { getContentBySlug, getAllSlugs } from "@/lib/content";
import { MdxContent } from "@/components/mdx-content";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return getAllSlugs("blog").map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = getContentBySlug("blog", slug);
  if (!item) return {};

  return {
    title: item.meta.title,
    description: item.meta.description,
    openGraph: {
      title: item.meta.title,
      description: item.meta.description,
      type: "article",
      publishedTime: item.meta.date,
      authors: [item.meta.author],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = getContentBySlug("blog", slug);
  if (!item) notFound();

  return (
    <article className="mx-auto max-w-3xl px-6 py-12">
      <Button href="/blog" variant="outline" size="sm">
        &larr; All Posts
      </Button>

      <header className="mt-6 mb-10">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          {item.meta.title}
        </h1>
        <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-gray-500">
          <span>By {item.meta.author}</span>
          <span>&middot;</span>
          <time>
            {new Date(item.meta.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
        </div>
        {item.meta.tags?.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {item.meta.tags.map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div>
        )}
      </header>

      <MdxContent source={item.content} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: item.meta.title,
            description: item.meta.description,
            author: { "@type": "Person", name: item.meta.author },
            datePublished: item.meta.date,
            publisher: {
              "@type": "Organization",
              name: "openclw.com",
              url: "https://openclw.com",
            },
          }),
        }}
      />
    </article>
  );
}
