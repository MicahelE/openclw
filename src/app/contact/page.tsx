import type { Metadata } from "next";
import { ContactForm } from "./contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with us about OpenClaw setup services, general inquiries, or enterprise solutions.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-12">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Contact Us</h1>
      <p className="mt-3 text-lg text-gray-600 dark:text-gray-400">
        Have a question or want to learn more about our setup services? Send us a
        message and we&apos;ll get back to you within 24 hours.
      </p>
      <ContactForm />
    </div>
  );
}
