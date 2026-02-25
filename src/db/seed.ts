import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { categories, skills } from "./schema";
import { sql } from "drizzle-orm";
import path from "path";
import fs from "fs";

const dbDir = path.join(process.cwd(), "data");
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const sqlite = new Database(path.join(dbDir, "openclw.db"));
sqlite.pragma("journal_mode = WAL");
const db = drizzle(sqlite);

// Create tables
sqlite.exec(`
  CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    icon TEXT
  );

  CREATE TABLE IF NOT EXISTS skills (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT NOT NULL,
    short_description TEXT,
    author TEXT NOT NULL,
    category_slug TEXT NOT NULL REFERENCES categories(slug),
    github_url TEXT,
    clawhub_url TEXT,
    security_rating TEXT NOT NULL DEFAULT 'caution',
    permissions_required TEXT,
    install_command TEXT,
    featured INTEGER DEFAULT 0,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    service_type TEXT,
    created_at TEXT NOT NULL
  );
`);

const now = new Date().toISOString();

// Upsert categories (insert or update on conflict)
const categoryData = [
  {
    name: "Productivity",
    slug: "productivity",
    description: "Skills that boost your daily workflow and task management",
    icon: "zap",
  },
  {
    name: "Development",
    slug: "development",
    description: "Coding, DevOps, and software engineering tools",
    icon: "code",
  },
  {
    name: "Communication",
    slug: "communication",
    description: "Messaging, email, and social media integrations",
    icon: "message-circle",
  },
  {
    name: "Automation",
    slug: "automation",
    description: "Workflow automation and task scheduling",
    icon: "repeat",
  },
  {
    name: "Security",
    slug: "security",
    description: "Security scanning, monitoring, and protection tools",
    icon: "shield",
  },
  {
    name: "Data & Analytics",
    slug: "data-analytics",
    description: "Data processing, visualization, and reporting",
    icon: "bar-chart",
  },
];

for (const cat of categoryData) {
  db.run(sql`INSERT INTO categories (name, slug, description, icon)
    VALUES (${cat.name}, ${cat.slug}, ${cat.description}, ${cat.icon})
    ON CONFLICT(slug) DO UPDATE SET
      name = excluded.name,
      description = excluded.description,
      icon = excluded.icon`);
}

// Clear old skills before re-seeding
db.run(sql`DELETE FROM skills`);

// Insert skills
const skillData = [
  // --- Productivity ---
  {
    name: "Cognitive Memory",
    slug: "cognitive-memory",
    description:
      "Persistent memory layer for AI agents. Stores context, preferences, and conversation history across sessions. Enables agents to recall past interactions and build on previous work without losing context.",
    shortDescription:
      "Persistent memory and context recall for AI agents",
    author: "icemilo414",
    categorySlug: "productivity",
    githubUrl: "https://github.com/openclaw/skills/tree/main/skills/icemilo414/cognitive-memory",
    clawhubUrl: "https://clawhub.ai/icemilo414/cognitive-memory",
    securityRating: "safe",
    permissionsRequired: "File system read/write",
    installCommand: "claw install icemilo414/cognitive-memory",
    featured: 1,
  },
  {
    name: "Self Improving Agent",
    slug: "self-improving-agent",
    description:
      "Captures learnings, errors, and corrections to enable continuous improvement. Tracks what works and what fails across sessions, building a knowledge base that makes your agent smarter over time.",
    shortDescription:
      "Continuous improvement through learning capture and error tracking",
    author: "pskoett",
    categorySlug: "productivity",
    githubUrl: "https://github.com/openclaw/skills/tree/main/skills/pskoett/self-improving-agent",
    clawhubUrl: "https://clawhub.ai/pskoett/self-improving-agent",
    securityRating: "safe",
    permissionsRequired: "File system read/write",
    installCommand: "claw install pskoett/self-improving-agent",
    featured: 0,
  },
  {
    name: "Pndr",
    slug: "pndr",
    description:
      "Intelligent note-taking and reflection tool. Captures thoughts, generates summaries, and surfaces relevant past notes based on current context. Helps build a personal knowledge base over time.",
    shortDescription:
      "AI-powered note-taking with contextual recall",
    author: "dgershman",
    categorySlug: "productivity",
    githubUrl: "https://github.com/openclaw/skills/tree/main/skills/dgershman/pndr",
    clawhubUrl: "https://clawhub.ai/dgershman/pndr",
    securityRating: "safe",
    permissionsRequired: "File system read/write",
    installCommand: "claw install dgershman/pndr",
    featured: 0,
  },
  // --- Development ---
  {
    name: "Github",
    slug: "github",
    description:
      "Interact with GitHub using the gh CLI. Use gh issue, gh pr, gh run, and gh api for issues, pull requests, CI runs, and advanced queries. Streamlines the entire GitHub workflow from your terminal.",
    shortDescription:
      "GitHub CLI integration for issues, PRs, and CI runs",
    author: "steipete",
    categorySlug: "development",
    githubUrl: "https://github.com/openclaw/skills/tree/main/skills/steipete/github",
    clawhubUrl: "https://clawhub.ai/steipete/github",
    securityRating: "safe",
    permissionsRequired: "GitHub API token, network access",
    installCommand: "claw install steipete/github",
    featured: 1,
  },
  {
    name: "PR Reviewer",
    slug: "pr-reviewer",
    description:
      "Automated pull request review powered by AI. Analyzes diffs for bugs, security issues, performance problems, and style inconsistencies. Posts inline review comments directly on GitHub PRs.",
    shortDescription:
      "AI-powered pull request review with inline comments",
    author: "briancolinger",
    categorySlug: "development",
    githubUrl: "https://github.com/openclaw/skills/tree/main/skills/briancolinger/pr-reviewer",
    clawhubUrl: "https://clawhub.ai/briancolinger/pr-reviewer",
    securityRating: "safe",
    permissionsRequired: "Repository read access, GitHub API token",
    installCommand: "claw install briancolinger/pr-reviewer",
    featured: 1,
  },
  {
    name: "Debug Pro",
    slug: "debug-pro",
    description:
      "Advanced debugging assistant that analyzes stack traces, logs, and error messages. Identifies root causes, suggests fixes, and can apply patches automatically. Supports Node.js, Python, and more.",
    shortDescription:
      "AI debugging with root cause analysis and auto-fix suggestions",
    author: "cmanfre7",
    categorySlug: "development",
    githubUrl: "https://github.com/openclaw/skills/tree/main/skills/cmanfre7/debug-pro",
    clawhubUrl: "https://clawhub.ai/cmanfre7/debug-pro",
    securityRating: "safe",
    permissionsRequired: "File system read, process inspection",
    installCommand: "claw install cmanfre7/debug-pro",
    featured: 0,
  },
  {
    name: "Git Essentials",
    slug: "git-essentials",
    description:
      "Streamlined Git workflow tools. Generates semantic commit messages, manages branches, handles interactive rebasing, and creates well-structured pull requests. Works with GitHub, GitLab, and Bitbucket.",
    shortDescription:
      "Semantic commits, branch management, and PR creation",
    author: "arnarsson",
    categorySlug: "development",
    githubUrl: "https://github.com/openclaw/skills/tree/main/skills/arnarsson/git-essentials",
    clawhubUrl: "https://clawhub.ai/arnarsson/git-essentials",
    securityRating: "safe",
    permissionsRequired: "Git repository access",
    installCommand: "claw install arnarsson/git-essentials",
    featured: 1,
  },
  {
    name: "Backend Patterns",
    slug: "backend-patterns",
    description:
      "Scaffolds backend services following proven architectural patterns. Generates API routes, database schemas, middleware, and tests. Supports Express, FastAPI, and other popular frameworks.",
    shortDescription:
      "Backend scaffolding with proven architectural patterns",
    author: "charmmm718",
    categorySlug: "development",
    githubUrl: "https://github.com/openclaw/skills/tree/main/skills/charmmm718/backend-patterns",
    clawhubUrl: "https://clawhub.ai/charmmm718/backend-patterns",
    securityRating: "safe",
    permissionsRequired: "File system read/write",
    installCommand: "claw install charmmm718/backend-patterns",
    featured: 0,
  },
  // --- Communication ---
  {
    name: "Slack",
    slug: "slack",
    description:
      "Control Slack from your AI agent. React to messages, pin and unpin items, read channels and DMs, and manage your Slack workspace directly through OpenClaw commands.",
    shortDescription:
      "Slack integration for reading, sending, and managing messages",
    author: "steipete",
    categorySlug: "communication",
    githubUrl: "https://github.com/openclaw/skills/tree/main/skills/steipete/slack",
    clawhubUrl: "https://clawhub.ai/steipete/slack",
    securityRating: "caution",
    permissionsRequired: "Slack bot token, network access",
    installCommand: "claw install steipete/slack",
    featured: 0,
  },
  {
    name: "Voice Reply",
    slug: "voice-reply",
    description:
      "Text-to-speech and voice response integration for AI agents. Converts agent responses to natural-sounding voice output. Supports multiple languages, voices, and output formats.",
    shortDescription:
      "Voice output and text-to-speech for AI agent responses",
    author: "stolot0mt0m",
    categorySlug: "communication",
    githubUrl: "https://github.com/openclaw/skills/tree/main/skills/stolot0mt0m/voice-reply",
    clawhubUrl: "https://clawhub.ai/stolot0mt0m/voice-reply",
    securityRating: "safe",
    permissionsRequired: "Audio output, network access for TTS API",
    installCommand: "claw install stolot0mt0m/voice-reply",
    featured: 0,
  },
  // --- Automation ---
  {
    name: "Browse",
    slug: "browse",
    description:
      "Web browsing automation for AI agents. Navigate websites, extract content, fill forms, and interact with web applications. Includes headless browser support, screenshot capture, and structured data extraction.",
    shortDescription:
      "Web browsing and content extraction for AI agents",
    author: "pkiv",
    categorySlug: "automation",
    githubUrl: "https://github.com/openclaw/skills/tree/main/skills/pkiv/browse",
    clawhubUrl: "https://clawhub.ai/pkiv/browse",
    securityRating: "caution",
    permissionsRequired: "Network access, headless browser",
    installCommand: "claw install pkiv/browse",
    featured: 1,
  },
  {
    name: "Deploy Agent",
    slug: "deploy-agent",
    description:
      "Automated deployment assistant. Handles building, testing, and deploying applications to cloud providers. Supports Docker, Kubernetes, and serverless platforms with rollback capabilities.",
    shortDescription:
      "Automated build, test, and deploy to cloud providers",
    author: "sherajdev",
    categorySlug: "automation",
    githubUrl: "https://github.com/openclaw/skills/tree/main/skills/sherajdev/deploy-agent",
    clawhubUrl: "https://clawhub.ai/sherajdev/deploy-agent",
    securityRating: "caution",
    permissionsRequired: "Cloud provider credentials, Docker access, network access",
    installCommand: "claw install sherajdev/deploy-agent",
    featured: 0,
  },
  {
    name: "Docker Sandbox",
    slug: "docker-sandbox",
    description:
      "Run AI agent tasks in isolated Docker containers. Provides a safe execution environment for untrusted code, file operations, and system commands. Includes resource limits and network isolation.",
    shortDescription:
      "Isolated Docker containers for safe AI agent execution",
    author: "gitgoodordietrying",
    categorySlug: "automation",
    githubUrl: "https://github.com/openclaw/skills/tree/main/skills/gitgoodordietrying/docker-sandbox",
    clawhubUrl: "https://clawhub.ai/gitgoodordietrying/docker-sandbox",
    securityRating: "caution",
    permissionsRequired: "Docker socket access",
    installCommand: "claw install gitgoodordietrying/docker-sandbox",
    featured: 0,
  },
  // --- Security ---
  {
    name: "Skill Vetting",
    slug: "skill-vetting",
    description:
      "Automated security analysis for OpenClaw skills. Scans skill source code for malicious patterns, excessive permissions, obfuscated code, and known vulnerabilities. Generates security reports with risk ratings.",
    shortDescription:
      "Automated security scanning and vetting for OpenClaw skills",
    author: "eddygk",
    categorySlug: "security",
    githubUrl: "https://github.com/openclaw/skills/tree/main/skills/eddygk/skill-vetting",
    clawhubUrl: "https://clawhub.ai/eddygk/skill-vetting",
    securityRating: "safe",
    permissionsRequired: "File system read, network access for CVE database",
    installCommand: "claw install eddygk/skill-vetting",
    featured: 1,
  },
  {
    name: "Side Peace",
    slug: "side-peace",
    description:
      "Privacy-focused sidecar process that monitors AI agent actions in real time. Flags suspicious behavior, blocks unauthorized operations, and maintains an audit log of all agent activities.",
    shortDescription:
      "Real-time AI agent monitoring and action auditing",
    author: "bitbrujo",
    categorySlug: "security",
    githubUrl: "https://github.com/openclaw/skills/tree/main/skills/bitbrujo/side-peace",
    clawhubUrl: "https://clawhub.ai/bitbrujo/side-peace",
    securityRating: "safe",
    permissionsRequired: "Process monitoring, file system write for audit logs",
    installCommand: "claw install bitbrujo/side-peace",
    featured: 0,
  },
  {
    name: "Emergency Rescue",
    slug: "emergency-rescue",
    description:
      "Recovery tool for when AI agents go off the rails. Provides kill switches, state rollback, and system restoration. Monitors resource usage and can automatically halt runaway processes.",
    shortDescription:
      "Kill switches and state rollback for runaway AI agents",
    author: "gitgoodordietrying",
    categorySlug: "security",
    githubUrl: "https://github.com/openclaw/skills/tree/main/skills/gitgoodordietrying/emergency-rescue",
    clawhubUrl: "https://clawhub.ai/gitgoodordietrying/emergency-rescue",
    securityRating: "safe",
    permissionsRequired: "Process management, file system read/write",
    installCommand: "claw install gitgoodordietrying/emergency-rescue",
    featured: 0,
  },
  // --- Data & Analytics ---
  {
    name: "Exa Web Search Free",
    slug: "exa-web-search-free",
    description:
      "Free web search integration powered by the Exa API. Provides semantic search results with content snippets, summaries, and source links. Ideal for research tasks and information gathering.",
    shortDescription:
      "Free semantic web search via the Exa API",
    author: "whiteknight07",
    categorySlug: "data-analytics",
    githubUrl: "https://github.com/openclaw/skills/tree/main/skills/whiteknight07/exa-web-search-free",
    clawhubUrl: "https://clawhub.ai/whiteknight07/exa-web-search-free",
    securityRating: "safe",
    permissionsRequired: "Network access",
    installCommand: "claw install whiteknight07/exa-web-search-free",
    featured: 0,
  },
  {
    name: "Financial Calculator",
    slug: "financial-calculator",
    description:
      "Comprehensive financial calculations including loan amortization, investment returns, tax estimates, and budget analysis. Supports multiple currencies and provides clear breakdowns of results.",
    shortDescription:
      "Loan, investment, and budget calculations with detailed breakdowns",
    author: "tarigha",
    categorySlug: "data-analytics",
    githubUrl: "https://github.com/openclaw/skills/tree/main/skills/tarigha/financial-calculator",
    clawhubUrl: "https://clawhub.ai/tarigha/financial-calculator",
    securityRating: "safe",
    permissionsRequired: "None",
    installCommand: "claw install tarigha/financial-calculator",
    featured: 0,
  },
];

for (const s of skillData) {
  db.run(sql`INSERT INTO skills (name, slug, description, short_description, author, category_slug, github_url, clawhub_url, security_rating, permissions_required, install_command, featured, created_at, updated_at)
    VALUES (${s.name}, ${s.slug}, ${s.description}, ${s.shortDescription}, ${s.author}, ${s.categorySlug}, ${s.githubUrl}, ${s.clawhubUrl}, ${s.securityRating}, ${s.permissionsRequired}, ${s.installCommand}, ${s.featured}, ${now}, ${now})
    ON CONFLICT(slug) DO UPDATE SET
      name = excluded.name,
      description = excluded.description,
      short_description = excluded.short_description,
      author = excluded.author,
      category_slug = excluded.category_slug,
      github_url = excluded.github_url,
      clawhub_url = excluded.clawhub_url,
      security_rating = excluded.security_rating,
      permissions_required = excluded.permissions_required,
      install_command = excluded.install_command,
      featured = excluded.featured,
      updated_at = excluded.updated_at`);
}

console.log(`Seeded ${categoryData.length} categories and ${skillData.length} skills.`);
sqlite.close();
