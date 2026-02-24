import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { categories, skills, contacts } from "./schema";
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

// Clear existing data
sqlite.exec("DELETE FROM skills");
sqlite.exec("DELETE FROM categories");
sqlite.exec("DELETE FROM contacts");

const now = new Date().toISOString();

// Seed categories
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
  db.insert(categories).values(cat).run();
}

// Seed skills
const skillData = [
  {
    name: "Smart File Organizer",
    slug: "smart-file-organizer",
    description:
      "Automatically organizes files in specified directories based on content type, date, and custom rules. Uses AI to categorize documents, images, and media files into a clean folder structure. Supports custom rules and scheduling.",
    shortDescription:
      "AI-powered file organization with custom rules and scheduling",
    author: "ClawLabs",
    categorySlug: "productivity",
    githubUrl: "https://github.com/clawlabs/smart-file-organizer",
    clawhubUrl: "https://clawhub.io/skills/smart-file-organizer",
    securityRating: "safe" as const,
    permissionsRequired: "File system read/write",
    installCommand: "claw install smart-file-organizer",
    featured: true,
    createdAt: now,
    updatedAt: now,
  },
  {
    name: "Git Autopilot",
    slug: "git-autopilot",
    description:
      "Intelligent Git workflow automation. Generates commit messages from diffs, manages branches, handles rebasing, and creates pull requests with AI-generated descriptions. Supports GitHub, GitLab, and Bitbucket.",
    shortDescription:
      "AI-generated commits, PRs, and branch management",
    author: "DevToolsOrg",
    categorySlug: "development",
    githubUrl: "https://github.com/devtoolsorg/git-autopilot",
    clawhubUrl: "https://clawhub.io/skills/git-autopilot",
    securityRating: "safe" as const,
    permissionsRequired: "Git repository access, GitHub API token",
    installCommand: "claw install git-autopilot",
    featured: true,
    createdAt: now,
    updatedAt: now,
  },
  {
    name: "WhatsApp Bridge",
    slug: "whatsapp-bridge",
    description:
      "Connect OpenClaw to WhatsApp for automated messaging, chatbot responses, and notification forwarding. Supports group management, media handling, and custom triggers. Uses the official WhatsApp Business API.",
    shortDescription:
      "WhatsApp integration for automated messaging and chatbots",
    author: "MsgConnect",
    categorySlug: "communication",
    githubUrl: "https://github.com/msgconnect/whatsapp-bridge",
    clawhubUrl: "https://clawhub.io/skills/whatsapp-bridge",
    securityRating: "caution" as const,
    permissionsRequired:
      "WhatsApp Business API access, network access, contact list",
    installCommand: "claw install whatsapp-bridge",
    featured: true,
    createdAt: now,
    updatedAt: now,
  },
  {
    name: "Code Reviewer Pro",
    slug: "code-reviewer-pro",
    description:
      "Automated code review powered by AI. Analyzes pull requests for bugs, security vulnerabilities, performance issues, and style inconsistencies. Provides inline suggestions and severity ratings.",
    shortDescription: "AI code review with security and performance analysis",
    author: "ClawLabs",
    categorySlug: "development",
    githubUrl: "https://github.com/clawlabs/code-reviewer-pro",
    clawhubUrl: "https://clawhub.io/skills/code-reviewer-pro",
    securityRating: "safe" as const,
    permissionsRequired: "Repository read access",
    installCommand: "claw install code-reviewer-pro",
    featured: true,
    createdAt: now,
    updatedAt: now,
  },
  {
    name: "Email Summarizer",
    slug: "email-summarizer",
    description:
      "Connects to your email inbox and provides daily digests, priority sorting, and smart summaries. Identifies action items and deadlines automatically. Supports Gmail, Outlook, and IMAP.",
    shortDescription: "Smart email digests with priority sorting and action items",
    author: "InboxZero",
    categorySlug: "productivity",
    githubUrl: "https://github.com/inboxzero/email-summarizer",
    clawhubUrl: "https://clawhub.io/skills/email-summarizer",
    securityRating: "caution" as const,
    permissionsRequired: "Email account access (OAuth), network access",
    installCommand: "claw install email-summarizer",
    featured: false,
    createdAt: now,
    updatedAt: now,
  },
  {
    name: "Cron Scheduler",
    slug: "cron-scheduler",
    description:
      "Schedule any OpenClaw task to run on a cron-like schedule. Supports complex scheduling patterns, dependency chains, retry logic, and failure notifications. Web-based dashboard for monitoring.",
    shortDescription: "Task scheduling with cron patterns and monitoring dashboard",
    author: "AutomateCrew",
    categorySlug: "automation",
    githubUrl: "https://github.com/automatecrew/cron-scheduler",
    clawhubUrl: "https://clawhub.io/skills/cron-scheduler",
    securityRating: "safe" as const,
    permissionsRequired: "System scheduling, network access for notifications",
    installCommand: "claw install cron-scheduler",
    featured: false,
    createdAt: now,
    updatedAt: now,
  },
  {
    name: "Vuln Scanner",
    slug: "vuln-scanner",
    description:
      "Automated vulnerability scanning for your projects. Checks dependencies, Docker images, and infrastructure configs against known CVE databases. Generates detailed reports with remediation steps.",
    shortDescription: "Dependency and infrastructure vulnerability scanning",
    author: "SecureClawTeam",
    categorySlug: "security",
    githubUrl: "https://github.com/secureclawteam/vuln-scanner",
    clawhubUrl: "https://clawhub.io/skills/vuln-scanner",
    securityRating: "safe" as const,
    permissionsRequired: "File system read, network access for CVE database",
    installCommand: "claw install vuln-scanner",
    featured: true,
    createdAt: now,
    updatedAt: now,
  },
  {
    name: "Slack Notifier",
    slug: "slack-notifier",
    description:
      "Send customizable notifications to Slack channels. Supports rich formatting, attachments, thread replies, and interactive messages. Built-in templates for common notification types.",
    shortDescription: "Rich Slack notifications with templates and threading",
    author: "MsgConnect",
    categorySlug: "communication",
    githubUrl: "https://github.com/msgconnect/slack-notifier",
    clawhubUrl: "https://clawhub.io/skills/slack-notifier",
    securityRating: "safe" as const,
    permissionsRequired: "Slack webhook URL or bot token",
    installCommand: "claw install slack-notifier",
    featured: false,
    createdAt: now,
    updatedAt: now,
  },
  {
    name: "API Monitor",
    slug: "api-monitor",
    description:
      "Monitor your APIs and web services for uptime, performance, and correctness. Supports health checks, response validation, latency tracking, and alerting via multiple channels.",
    shortDescription: "API uptime monitoring with alerts and performance tracking",
    author: "DevToolsOrg",
    categorySlug: "development",
    githubUrl: "https://github.com/devtoolsorg/api-monitor",
    clawhubUrl: "https://clawhub.io/skills/api-monitor",
    securityRating: "safe" as const,
    permissionsRequired: "Network access, notification channel credentials",
    installCommand: "claw install api-monitor",
    featured: false,
    createdAt: now,
    updatedAt: now,
  },
  {
    name: "Data Pipeline Builder",
    slug: "data-pipeline-builder",
    description:
      "Visual data pipeline construction with support for ETL operations, data transformation, and multi-source aggregation. Connects to databases, APIs, and file systems. Includes built-in data validation.",
    shortDescription: "Visual ETL pipeline builder with multi-source support",
    author: "DataFlowHQ",
    categorySlug: "data-analytics",
    githubUrl: "https://github.com/dataflowhq/data-pipeline-builder",
    clawhubUrl: "https://clawhub.io/skills/data-pipeline-builder",
    securityRating: "caution" as const,
    permissionsRequired:
      "Database credentials, file system access, network access",
    installCommand: "claw install data-pipeline-builder",
    featured: false,
    createdAt: now,
    updatedAt: now,
  },
  {
    name: "Meeting Notes AI",
    slug: "meeting-notes-ai",
    description:
      "Automatically transcribes and summarizes meetings. Extracts action items, decisions, and key topics. Integrates with Zoom, Google Meet, and Microsoft Teams. Distributes notes to attendees post-meeting.",
    shortDescription: "AI meeting transcription with action item extraction",
    author: "ProductivityAI",
    categorySlug: "productivity",
    githubUrl: "https://github.com/productivityai/meeting-notes-ai",
    clawhubUrl: "https://clawhub.io/skills/meeting-notes-ai",
    securityRating: "caution" as const,
    permissionsRequired:
      "Microphone access, calendar integration, meeting platform API",
    installCommand: "claw install meeting-notes-ai",
    featured: false,
    createdAt: now,
    updatedAt: now,
  },
  {
    name: "Docker Deployer",
    slug: "docker-deployer",
    description:
      "One-command deployment of Docker containers to any cloud provider. Supports Docker Compose, Kubernetes manifests, and custom deploy scripts. Built-in rollback and health checking.",
    shortDescription: "One-command Docker deployment to any cloud provider",
    author: "CloudShip",
    categorySlug: "development",
    githubUrl: "https://github.com/cloudship/docker-deployer",
    clawhubUrl: "https://clawhub.io/skills/docker-deployer",
    securityRating: "caution" as const,
    permissionsRequired:
      "Docker socket access, cloud provider credentials, network access",
    installCommand: "claw install docker-deployer",
    featured: false,
    createdAt: now,
    updatedAt: now,
  },
  {
    name: "Web Scraper Toolkit",
    slug: "web-scraper-toolkit",
    description:
      "Flexible web scraping with built-in rate limiting, proxy rotation, and data extraction patterns. Supports headless browser rendering, CSS selectors, and XPath. Exports to JSON, CSV, or database.",
    shortDescription: "Rate-limited web scraping with proxy rotation",
    author: "DataFlowHQ",
    categorySlug: "automation",
    githubUrl: "https://github.com/dataflowhq/web-scraper-toolkit",
    clawhubUrl: "https://clawhub.io/skills/web-scraper-toolkit",
    securityRating: "caution" as const,
    permissionsRequired: "Network access, file system write",
    installCommand: "claw install web-scraper-toolkit",
    featured: false,
    createdAt: now,
    updatedAt: now,
  },
  {
    name: "Secret Rotator",
    slug: "secret-rotator",
    description:
      "Automatically rotates API keys, tokens, and passwords on a configurable schedule. Supports AWS, GCP, Azure, and custom credential stores. Provides audit logging and compliance reports.",
    shortDescription: "Automated credential rotation with audit logging",
    author: "SecureClawTeam",
    categorySlug: "security",
    githubUrl: "https://github.com/secureclawteam/secret-rotator",
    clawhubUrl: "https://clawhub.io/skills/secret-rotator",
    securityRating: "safe" as const,
    permissionsRequired:
      "Cloud provider IAM access, secrets manager access",
    installCommand: "claw install secret-rotator",
    featured: false,
    createdAt: now,
    updatedAt: now,
  },
  {
    name: "Telegram Bot Framework",
    slug: "telegram-bot-framework",
    description:
      "Build and deploy Telegram bots powered by OpenClaw. Supports commands, inline queries, keyboards, and media handling. Includes conversation flows and state management.",
    shortDescription: "Telegram bot builder with conversation state management",
    author: "MsgConnect",
    categorySlug: "communication",
    githubUrl: "https://github.com/msgconnect/telegram-bot-framework",
    clawhubUrl: "https://clawhub.io/skills/telegram-bot-framework",
    securityRating: "safe" as const,
    permissionsRequired: "Telegram Bot API token, network access",
    installCommand: "claw install telegram-bot-framework",
    featured: false,
    createdAt: now,
    updatedAt: now,
  },
  {
    name: "CSV Analyzer",
    slug: "csv-analyzer",
    description:
      "Upload CSV files and get instant AI-powered analysis. Generates statistical summaries, detects anomalies, creates visualizations, and answers natural language queries about your data.",
    shortDescription: "AI-powered CSV analysis with natural language queries",
    author: "DataFlowHQ",
    categorySlug: "data-analytics",
    githubUrl: "https://github.com/dataflowhq/csv-analyzer",
    clawhubUrl: "https://clawhub.io/skills/csv-analyzer",
    securityRating: "safe" as const,
    permissionsRequired: "File system read",
    installCommand: "claw install csv-analyzer",
    featured: false,
    createdAt: now,
    updatedAt: now,
  },
  {
    name: "Workflow Automator",
    slug: "workflow-automator",
    description:
      "Create complex multi-step workflows with conditional logic, parallel execution, and error handling. Visual drag-and-drop builder with YAML export. Integrates with 50+ services via webhooks.",
    shortDescription: "Multi-step workflow builder with conditional logic",
    author: "AutomateCrew",
    categorySlug: "automation",
    githubUrl: "https://github.com/automatecrew/workflow-automator",
    clawhubUrl: "https://clawhub.io/skills/workflow-automator",
    securityRating: "caution" as const,
    permissionsRequired: "Network access, webhook endpoints, service credentials",
    installCommand: "claw install workflow-automator",
    featured: true,
    createdAt: now,
    updatedAt: now,
  },
  {
    name: "Log Analyzer",
    slug: "log-analyzer",
    description:
      "AI-powered log analysis for debugging and monitoring. Parses structured and unstructured logs, identifies patterns, detects anomalies, and suggests root causes for errors. Supports ELK stack integration.",
    shortDescription: "AI log analysis with anomaly detection and root cause suggestions",
    author: "DevToolsOrg",
    categorySlug: "development",
    githubUrl: "https://github.com/devtoolsorg/log-analyzer",
    clawhubUrl: "https://clawhub.io/skills/log-analyzer",
    securityRating: "safe" as const,
    permissionsRequired: "File system read, optional network for ELK",
    installCommand: "claw install log-analyzer",
    featured: false,
    createdAt: now,
    updatedAt: now,
  },
];

for (const skill of skillData) {
  db.insert(skills).values(skill).run();
}

console.log(`Seeded ${categoryData.length} categories and ${skillData.length} skills.`);
sqlite.close();
