import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Agent Skills",
  description:
    "Browse popular agent skills from skills.sh. Install with a single npx command for Claude Code, Cursor, Copilot, and more.",
};

const agentSkills = [
  {
    name: "find-skills",
    repo: "vercel-labs/skills",
    description: "Discover and install agent skills from the skills.sh directory.",
    installs: "321K",
    tags: ["utility"],
  },
  {
    name: "vercel-react-best-practices",
    repo: "vercel-labs/agent-skills",
    description: "React and Next.js best practices for building modern web applications.",
    installs: "166K",
    tags: ["react", "nextjs"],
  },
  {
    name: "web-design-guidelines",
    repo: "vercel-labs/agent-skills",
    description: "Web design principles and UI/UX guidelines for building polished interfaces.",
    installs: "127K",
    tags: ["design", "ui"],
  },
  {
    name: "remotion-best-practices",
    repo: "remotion-dev/skills",
    description: "Best practices for building programmatic videos with Remotion.",
    installs: "111K",
    tags: ["video"],
  },
  {
    name: "frontend-design",
    repo: "anthropics/skills",
    description: "Frontend design patterns and component architecture guidance.",
    installs: "98K",
    tags: ["frontend", "design"],
  },
  {
    name: "agent-browser",
    repo: "vercel-labs/agent-browser",
    description: "Browser automation capabilities for AI agents.",
    installs: "58K",
    tags: ["automation", "browser"],
  },
  {
    name: "vercel-composition-patterns",
    repo: "vercel-labs/agent-skills",
    description: "Component composition patterns for scalable React applications.",
    installs: "57K",
    tags: ["react", "architecture"],
  },
  {
    name: "skill-creator",
    repo: "anthropics/skills",
    description: "Create and publish your own agent skills.",
    installs: "48K",
    tags: ["utility"],
  },
  {
    name: "browser-use",
    repo: "browser-use/browser-use",
    description: "Web browsing and interaction capabilities for AI agents.",
    installs: "39K",
    tags: ["automation", "browser"],
  },
  {
    name: "ui-ux-pro-max",
    repo: "nextlevelbuilder/ui-ux-pro-max-skill",
    description: "Advanced UI/UX design skills for building professional interfaces.",
    installs: "38K",
    tags: ["design", "ui"],
  },
  {
    name: "brainstorming",
    repo: "obra/superpowers",
    description: "Structured brainstorming and ideation techniques for problem-solving.",
    installs: "30K",
    tags: ["productivity"],
  },
  {
    name: "audit-website",
    repo: "squirrelscan/skills",
    description: "Automated website auditing for performance, accessibility, and SEO.",
    installs: "27K",
    tags: ["security", "seo"],
  },
  {
    name: "seo-audit",
    repo: "coreyhaines31/marketingskills",
    description: "Comprehensive SEO auditing and optimization recommendations.",
    installs: "26K",
    tags: ["seo", "marketing"],
  },
  {
    name: "remotion-render",
    repo: "inference-sh-8/skills",
    description: "Render Remotion videos programmatically from AI agents.",
    installs: "26K",
    tags: ["video", "automation"],
  },
];

export default function AgentSkillsPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Agent Skills</h1>
      <p className="mt-3 text-lg text-gray-600 dark:text-gray-400">
        Popular skills from{" "}
        <a
          href="https://skills.sh"
          target="_blank"
          rel="noopener noreferrer"
          className="text-purple-700 underline hover:text-purple-900 dark:text-purple-400 dark:hover:text-purple-300"
        >
          skills.sh
        </a>
        {" "}&mdash; the open agent skills ecosystem by Vercel. Install with a single command for Claude Code, Cursor, Copilot, and more.
      </p>

      <div className="mt-6 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Install any skill:</p>
        <pre className="mt-2 overflow-x-auto text-sm text-purple-700 dark:text-purple-400">
          <code>npx skills add &lt;owner/repo&gt;</code>
        </pre>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {agentSkills.map((skill) => (
          <Card
            key={`${skill.repo}/${skill.name}`}
            href={`https://skills.sh/${skill.repo}/${skill.name}`}
            className="flex flex-col"
          >
            <div className="flex items-start justify-between gap-2">
              <CardTitle>{skill.name}</CardTitle>
              <span className="shrink-0 text-xs font-medium text-gray-500 dark:text-gray-400">
                {skill.installs}
              </span>
            </div>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-500">{skill.repo}</p>
            <CardDescription>{skill.description}</CardDescription>
            <div className="mt-4 flex flex-wrap gap-2">
              {skill.tags.map((tag) => (
                <Badge key={tag} variant="category">
                  {tag}
                </Badge>
              ))}
            </div>
            <pre className="mt-4 overflow-x-auto rounded bg-gray-900 px-3 py-2 text-xs text-green-400">
              <code>npx skills add {skill.repo}</code>
            </pre>
          </Card>
        ))}
      </div>

      <div className="mt-12 text-center">
        <a
          href="https://skills.sh"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg bg-purple-700 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-purple-800"
        >
          Browse all skills on skills.sh &rarr;
        </a>
      </div>
    </div>
  );
}
