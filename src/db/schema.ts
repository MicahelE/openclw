import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const categories = sqliteTable("categories", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  icon: text("icon"),
});

export const skills = sqliteTable("skills", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description").notNull(),
  shortDescription: text("short_description"),
  author: text("author").notNull(),
  categorySlug: text("category_slug")
    .notNull()
    .references(() => categories.slug),
  githubUrl: text("github_url"),
  clawhubUrl: text("clawhub_url"),
  securityRating: text("security_rating", {
    enum: ["safe", "caution", "unsafe"],
  })
    .notNull()
    .default("caution"),
  permissionsRequired: text("permissions_required"),

  featured: integer("featured", { mode: "boolean" }).default(false),
  createdAt: text("created_at")
    .notNull()
    .$defaultFn(() => new Date().toISOString()),
  updatedAt: text("updated_at")
    .notNull()
    .$defaultFn(() => new Date().toISOString()),
});

export const contacts = sqliteTable("contacts", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email").notNull(),
  message: text("message").notNull(),
  serviceType: text("service_type"),
  createdAt: text("created_at")
    .notNull()
    .$defaultFn(() => new Date().toISOString()),
});

export type Skill = typeof skills.$inferSelect;
export type Category = typeof categories.$inferSelect;
export type Contact = typeof contacts.$inferSelect;
