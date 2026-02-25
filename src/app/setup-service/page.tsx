import { Button } from "@/components/ui/button";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Setup Service",
  description:
    "Professional OpenClaw setup and configuration services. Get expert help installing, configuring, and securing your OpenClaw instance.",
};

const tiers = [
  {
    name: "Basic Setup",
    price: "$99",
    description: "Perfect for individuals getting started with OpenClaw",
    features: [
      "OpenClaw installation on your platform",
      "Basic configuration and optimization",
      "3 vetted skills installed",
      "Security hardening checklist",
      "30-minute consultation call",
      "Email support for 7 days",
    ],
  },
  {
    name: "Full Configuration",
    price: "$299",
    popular: true,
    description: "Ideal for power users and small teams",
    features: [
      "Everything in Basic Setup",
      "Custom skill configuration",
      "Up to 10 vetted skills installed",
      "WhatsApp / Telegram bot setup",
      "Workflow automation setup",
      "60-minute consultation call",
      "Email support for 30 days",
      "Performance optimization",
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For teams and organizations with complex requirements",
    features: [
      "Everything in Full Configuration",
      "Multi-instance deployment",
      "Custom skill development",
      "API integration setup",
      "Security audit and hardening",
      "Team training session",
      "Dedicated support channel",
      "Ongoing maintenance plan",
    ],
  },
];

export default function SetupServicePage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 py-20 text-white">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            Professional OpenClaw Setup
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-purple-100">
            Skip the hassle. Our experts will configure OpenClaw perfectly for your
            use case, install security-vetted skills, and ensure everything runs
            smoothly.
          </p>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <h2 className="text-center text-3xl font-bold text-gray-900 dark:text-white">
          Choose Your Plan
        </h2>
        <p className="mt-3 text-center text-gray-600 dark:text-gray-400">
          All plans include security-vetted skills and expert configuration
        </p>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative rounded-2xl border p-8 ${
                tier.popular
                  ? "border-purple-500 shadow-lg shadow-purple-100 dark:shadow-purple-900/20"
                  : "border-gray-200 dark:border-gray-700"
              }`}
            >
              {tier.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-purple-700 px-4 py-1 text-xs font-semibold text-white">
                  Most Popular
                </span>
              )}
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                {tier.name}
              </h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                {tier.description}
              </p>
              <p className="mt-6 text-4xl font-extrabold text-gray-900 dark:text-white">
                {tier.price}
              </p>
              {tier.price !== "Custom" && (
                <p className="text-sm text-gray-500">one-time payment</p>
              )}

              <ul className="mt-8 space-y-3">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                    <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <Button
                  href="/contact"
                  variant={tier.popular ? "primary" : "outline"}
                  className="w-full"
                >
                  {tier.price === "Custom" ? "Contact Us" : "Get Started"}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* What You Get */}
      <section className="bg-gray-50 py-20 dark:bg-gray-900">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-center text-3xl font-bold text-gray-900 dark:text-white">
            Why Use Our Setup Service?
          </h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-2">
            <Card>
              <CardTitle>Security First</CardTitle>
              <CardDescription>
                Every skill we install is vetted for security. We check
                permissions, data access patterns, and known vulnerabilities before
                anything touches your system.
              </CardDescription>
            </Card>
            <Card>
              <CardTitle>Optimized Performance</CardTitle>
              <CardDescription>
                We configure OpenClaw for your hardware and use case, ensuring
                minimal resource usage and maximum responsiveness.
              </CardDescription>
            </Card>
            <Card>
              <CardTitle>Expert Knowledge</CardTitle>
              <CardDescription>
                Our team has deep experience with OpenClaw internals, the skill
                ecosystem, and best practices for production deployments.
              </CardDescription>
            </Card>
            <Card>
              <CardTitle>Ongoing Support</CardTitle>
              <CardDescription>
                Questions after setup? We provide email support to help you
                troubleshoot issues and optimize your configuration.
              </CardDescription>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-5xl px-6 py-20 text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          Ready to Get Started?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-gray-600 dark:text-gray-400">
          Tell us about your setup needs and we&apos;ll get back to you within 24
          hours with a plan tailored to your requirements.
        </p>
        <div className="mt-8">
          <Button href="/contact" variant="primary" size="lg">
            Contact Us
          </Button>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "OpenClaw Setup Service",
            description:
              "Professional OpenClaw setup and configuration services.",
            provider: {
              "@type": "Organization",
              name: "agentclw.com",
              url: "https://agentclw.com",
            },
            offers: [
              {
                "@type": "Offer",
                name: "Basic Setup",
                price: "99",
                priceCurrency: "USD",
              },
              {
                "@type": "Offer",
                name: "Full Configuration",
                price: "299",
                priceCurrency: "USD",
              },
            ],
          }),
        }}
      />
    </div>
  );
}
