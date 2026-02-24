import { getAllContent } from "@/lib/content";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tutorials",
  description:
    "Step-by-step OpenClaw tutorials. Learn how to set up, configure, and get the most out of OpenClaw with our comprehensive guides.",
};

export default function TutorialsPage() {
  const tutorials = getAllContent("tutorials");

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Tutorials</h1>
      <p className="mt-3 text-lg text-gray-600 dark:text-gray-400">
        Step-by-step guides to help you get the most out of OpenClaw.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {tutorials.map((tutorial) => (
          <Card key={tutorial.slug} href={`/tutorials/${tutorial.slug}`}>
            <CardTitle>{tutorial.title}</CardTitle>
            <CardDescription>{tutorial.description}</CardDescription>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              {tutorial.tags?.map((tag) => (
                <Badge key={tag}>{tag}</Badge>
              ))}
              <span className="text-xs text-gray-500">
                {new Date(tutorial.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
          </Card>
        ))}
      </div>

      {tutorials.length === 0 && (
        <p className="py-12 text-center text-gray-500">No tutorials yet. Check back soon!</p>
      )}
    </div>
  );
}
