import { db } from "@/db";
import { skills, categories, contacts } from "@/db/schema";
import { eq, like, and, or, desc } from "drizzle-orm";
import type { Skill, Category, Contact } from "@/db/schema";

export function getContacts(): Contact[] {
  return db.select().from(contacts).orderBy(desc(contacts.createdAt)).all();
}

export function getAllCategories(): Category[] {
  return db.select().from(categories).all();
}

export function getAllSkills(): Skill[] {
  return db.select().from(skills).orderBy(desc(skills.featured), skills.name).all();
}

export function getFeaturedSkills(): Skill[] {
  return db
    .select()
    .from(skills)
    .where(eq(skills.featured, true))
    .all();
}

export function getSkillBySlug(slug: string): Skill | undefined {
  return db.select().from(skills).where(eq(skills.slug, slug)).get();
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return db
    .select()
    .from(categories)
    .where(eq(categories.slug, slug))
    .get();
}

export function getSkillsByCategory(categorySlug: string): Skill[] {
  return db
    .select()
    .from(skills)
    .where(eq(skills.categorySlug, categorySlug))
    .orderBy(desc(skills.featured), skills.name)
    .all();
}

export function searchSkills(query: string): Skill[] {
  const pattern = `%${query}%`;
  return db
    .select()
    .from(skills)
    .where(
      or(
        like(skills.name, pattern),
        like(skills.description, pattern),
        like(skills.author, pattern)
      )
    )
    .all();
}

export function filterSkills(params: {
  category?: string;
  security?: string;
  search?: string;
}): Skill[] {
  const conditions = [];

  if (params.category) {
    conditions.push(eq(skills.categorySlug, params.category));
  }
  if (params.security) {
    conditions.push(
      eq(skills.securityRating, params.security as "safe" | "caution" | "unsafe")
    );
  }
  if (params.search) {
    const pattern = `%${params.search}%`;
    conditions.push(
      or(
        like(skills.name, pattern),
        like(skills.description, pattern),
        like(skills.author, pattern)
      )!
    );
  }

  if (conditions.length === 0) {
    return getAllSkills();
  }

  return db
    .select()
    .from(skills)
    .where(and(...conditions))
    .orderBy(desc(skills.featured), skills.name)
    .all();
}
