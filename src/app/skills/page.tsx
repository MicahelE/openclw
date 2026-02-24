import { Suspense } from "react";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { SecurityBadge, Badge } from "@/components/ui/badge";
import { SearchInput } from "@/components/ui/search-input";
import { CategoryFilter } from "@/components/ui/category-filter";
import { filterSkills, getAllCategories } from "@/lib/skills";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Skills Directory",
  description:
    "Browse security-vetted OpenClaw skills. Search and filter by category, security rating, and more. Find the best skills for productivity, development, and automation.",
};

function SkillsContent({ searchParams }: { searchParams: Record<string, string> }) {
  const categories = getAllCategories();
  const skills = filterSkills({
    category: searchParams.category,
    security: searchParams.security,
    search: searchParams.search,
  });

  const categoryOptions = categories.map((c) => ({
    label: c.name,
    value: c.slug,
  }));

  const securityOptions = [
    { label: "Safe", value: "safe" },
    { label: "Caution", value: "caution" },
    { label: "Unsafe", value: "unsafe" },
  ];

  return (
    <>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="flex-1">
          <Suspense>
            <SearchInput placeholder="Search skills..." />
          </Suspense>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        <div>
          <p className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Category</p>
          <Suspense>
            <CategoryFilter categories={categoryOptions} paramName="category" />
          </Suspense>
        </div>
        <div>
          <p className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Security Rating</p>
          <Suspense>
            <CategoryFilter categories={securityOptions} paramName="security" />
          </Suspense>
        </div>
      </div>

      <div className="mt-8">
        <p className="mb-4 text-sm text-gray-500">{skills.length} skill{skills.length !== 1 ? "s" : ""} found</p>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((skill) => (
            <Card key={skill.slug} href={`/skills/${skill.slug}`}>
              <div className="flex items-start justify-between gap-2">
                <CardTitle>{skill.name}</CardTitle>
                <SecurityBadge rating={skill.securityRating as "safe" | "caution" | "unsafe"} />
              </div>
              <CardDescription>
                {skill.shortDescription || skill.description.slice(0, 120) + "..."}
              </CardDescription>
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <Badge variant="category">{skill.categorySlug.replace("-", " & ")}</Badge>
                <span className="text-xs text-gray-500">by {skill.author}</span>
              </div>
            </Card>
          ))}
        </div>
        {skills.length === 0 && (
          <p className="py-12 text-center text-gray-500">No skills match your filters. Try adjusting your search.</p>
        )}
      </div>
    </>
  );
}

export default async function SkillsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>;
}) {
  const params = await searchParams;
  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Skills Directory</h1>
      <p className="mt-3 text-lg text-gray-600 dark:text-gray-400">
        Security-vetted OpenClaw skills, curated and categorized for safe use.
      </p>
      <div className="mt-8">
        <SkillsContent searchParams={params} />
      </div>
    </div>
  );
}
