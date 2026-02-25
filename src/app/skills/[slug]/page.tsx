import { notFound } from "next/navigation";
import { getSkillBySlug, getCategoryBySlug, getAllSkills } from "@/lib/skills";
import { SecurityBadge, Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";

export async function generateStaticParams() {
  try {
    const skills = getAllSkills();
    return skills.map((s) => ({ slug: s.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const skill = getSkillBySlug(slug);
  if (!skill) return {};

  return {
    title: `${skill.name} — OpenClaw Skill`,
    description: skill.shortDescription || skill.description.slice(0, 160),
    openGraph: {
      title: `${skill.name} — OpenClaw Skill`,
      description: skill.shortDescription || skill.description.slice(0, 160),
    },
  };
}

export default async function SkillDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const skill = getSkillBySlug(slug);
  if (!skill) notFound();

  const category = getCategoryBySlug(skill.categorySlug);

  return (
    <article className="mx-auto max-w-4xl px-6 py-12">
      <div className="mb-6 flex items-center gap-3">
        <Button href="/skills" variant="outline" size="sm">
          &larr; All Skills
        </Button>
      </div>

      <div className="flex flex-wrap items-start justify-between gap-4">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          {skill.name}
        </h1>
        <SecurityBadge
          rating={skill.securityRating as "safe" | "caution" | "unsafe"}
        />
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
        <span>by <strong>{skill.author}</strong></span>
        {category && <Badge variant="category">{category.name}</Badge>}
      </div>

      <div className="mt-8 space-y-8">
        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Description</h2>
          <p className="mt-3 leading-relaxed text-gray-700 dark:text-gray-300">
            {skill.description}
          </p>
        </section>

        {skill.permissionsRequired && (
          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Permissions Required</h2>
            <div className="mt-3 rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-800 dark:bg-amber-950">
              <p className="text-sm text-amber-800 dark:text-amber-200">{skill.permissionsRequired}</p>
            </div>
          </section>
        )}


        <section className="flex flex-wrap gap-3">
          {skill.githubUrl && (
            <Button href={skill.githubUrl} variant="outline" size="sm">
              View on GitHub
            </Button>
          )}
          {skill.clawhubUrl && (
            <Button href={skill.clawhubUrl} variant="primary" size="sm">
              View on ClawHub
            </Button>
          )}
        </section>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: skill.name,
            description: skill.shortDescription || skill.description,
            author: { "@type": "Person", name: skill.author },
            applicationCategory: "AI Agent Skill",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          }),
        }}
      />
    </article>
  );
}
