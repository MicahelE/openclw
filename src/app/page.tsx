import { Hero } from "@/components/ui/hero";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { SecurityBadge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getFeaturedSkills } from "@/lib/skills";
import { getAllContent } from "@/lib/content";

export default function Home() {
  const featuredSkills = getFeaturedSkills();
  const latestTutorials = getAllContent("tutorials").slice(0, 3);
  const latestPosts = getAllContent("blog").slice(0, 3);

  return (
    <>
      <Hero
        title="The OpenClaw Resource Hub"
        subtitle="Curated skills, in-depth tutorials, and professional setup services for the world's fastest-growing AI agent platform."
        primaryCta={{ label: "Browse Skills", href: "/skills" }}
        secondaryCta={{ label: "Get Setup Help", href: "/setup-service" }}
      />

      {/* Three Pillars */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-8 md:grid-cols-3">
          <Card href="/skills" className="text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300">
              <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
            </div>
            <CardTitle>Security-Vetted Skills</CardTitle>
            <CardDescription>
              Every skill reviewed for permissions, data access, and safety. Browse with confidence.
            </CardDescription>
          </Card>
          <Card href="/tutorials" className="text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300">
              <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
            </div>
            <CardTitle>Tutorials & Guides</CardTitle>
            <CardDescription>
              Step-by-step walkthroughs from setup to advanced configurations. Learn at your pace.
            </CardDescription>
          </Card>
          <Card href="/setup-service" className="text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300">
              <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            </div>
            <CardTitle>Professional Setup</CardTitle>
            <CardDescription>
              Expert configuration and deployment. Get OpenClaw running perfectly for your use case.
            </CardDescription>
          </Card>
        </div>
      </section>

      {/* Featured Skills */}
      {featuredSkills.length > 0 && (
        <section className="bg-gray-50 py-20 dark:bg-gray-900">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-10 flex items-end justify-between">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Featured Skills</h2>
                <p className="mt-2 text-gray-600 dark:text-gray-400">Hand-picked and security-vetted for reliability</p>
              </div>
              <Button href="/skills" variant="outline" size="sm">View All</Button>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featuredSkills.slice(0, 6).map((skill) => (
                <Card key={skill.slug} href={`/skills/${skill.slug}`}>
                  <div className="flex items-start justify-between">
                    <CardTitle>{skill.name}</CardTitle>
                    <SecurityBadge rating={skill.securityRating as "safe" | "caution" | "unsafe"} />
                  </div>
                  <CardDescription>{skill.shortDescription || skill.description.slice(0, 120) + "..."}</CardDescription>
                  <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
                    <span>by {skill.author}</span>
                    <span>&middot;</span>
                    <span className="capitalize">{skill.categorySlug.replace("-", " & ")}</span>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Latest Tutorials */}
      {latestTutorials.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 py-20">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Latest Tutorials</h2>
              <p className="mt-2 text-gray-600 dark:text-gray-400">Step-by-step guides to master OpenClaw</p>
            </div>
            <Button href="/tutorials" variant="outline" size="sm">All Tutorials</Button>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {latestTutorials.map((tutorial) => (
              <Card key={tutorial.slug} href={`/tutorials/${tutorial.slug}`}>
                <CardTitle>{tutorial.title}</CardTitle>
                <CardDescription>{tutorial.description}</CardDescription>
                <p className="mt-3 text-xs text-gray-500">{new Date(tutorial.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* Latest Blog Posts */}
      {latestPosts.length > 0 && (
        <section className="bg-gray-50 py-20 dark:bg-gray-900">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-10 flex items-end justify-between">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">From the Blog</h2>
                <p className="mt-2 text-gray-600 dark:text-gray-400">News, comparisons, and security guides</p>
              </div>
              <Button href="/blog" variant="outline" size="sm">All Posts</Button>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {latestPosts.map((post) => (
                <Card key={post.slug} href={`/blog/${post.slug}`}>
                  <CardTitle>{post.title}</CardTitle>
                  <CardDescription>{post.description}</CardDescription>
                  <p className="mt-3 text-xs text-gray-500">{new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Setup Service CTA */}
      <section className="mx-auto max-w-7xl px-6 py-20 text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Need Help Setting Up OpenClaw?</h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-400">
          Our experts will configure OpenClaw for your specific use case, install vetted skills, and ensure everything runs securely.
        </p>
        <div className="mt-8">
          <Button href="/setup-service" variant="primary" size="lg">Explore Setup Services</Button>
        </div>
      </section>
    </>
  );
}
