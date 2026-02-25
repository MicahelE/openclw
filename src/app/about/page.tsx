import { Button } from "@/components/ui/button";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "About agentclw.com — an independent resource hub for OpenClaw users, providing curated skills, tutorials, and professional setup services.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white">About agentclw.com</h1>

      <div className="mt-8 space-y-6 text-gray-700 dark:text-gray-300 leading-relaxed">
        <p>
          <strong>agentclw.com</strong> is an independent resource hub for the
          OpenClaw community. We are not affiliated with the official OpenClaw
          project &mdash; we are users and enthusiasts who saw a need for curated,
          security-focused resources.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white pt-4">Our Mission</h2>
        <p>
          OpenClaw has grown at an incredible pace, and with that growth comes
          challenges: a fragmented skill ecosystem, security concerns with
          unvetted skills, and a learning curve for new users. We built this
          site to help bridge those gaps.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white pt-4">What We Do</h2>
        <ul className="ml-6 list-disc space-y-2">
          <li>
            <strong>Curate and vet skills</strong> &mdash; Every skill in our
            directory is reviewed for security, permissions, and reliability.
          </li>
          <li>
            <strong>Create tutorials</strong> &mdash; Step-by-step guides that
            take you from installation to advanced configurations.
          </li>
          <li>
            <strong>Offer professional setup</strong> &mdash; For users who want
            a hands-off experience, our team handles the configuration.
          </li>
          <li>
            <strong>Report on the ecosystem</strong> &mdash; Blog posts covering
            security, comparisons, and best practices.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white pt-4">Security Philosophy</h2>
        <p>
          We take security seriously. Every skill in our directory receives a
          security rating based on the permissions it requires, its data access
          patterns, and community reports. Skills rated &ldquo;caution&rdquo; or
          &ldquo;unsafe&rdquo; include detailed explanations of the risks
          involved.
        </p>

        <div className="pt-4">
          <Button href="/contact" variant="primary">Get in Touch</Button>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "agentclw.com",
            url: "https://agentclw.com",
            description:
              "Independent resource hub for OpenClaw — curated skills, tutorials, and setup services.",
          }),
        }}
      />
    </div>
  );
}
