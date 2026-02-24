import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "openclw.com — OpenClaw Resources, Skills & Tutorials",
    template: "%s | openclw.com — OpenClaw Resources",
  },
  description:
    "Curated OpenClaw skills directory, tutorials, and professional setup services. Find security-vetted skills, step-by-step guides, and expert configuration help.",
  metadataBase: new URL("https://openclw.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://openclw.com",
    siteName: "openclw.com",
    title: "openclw.com — OpenClaw Resources, Skills & Tutorials",
    description:
      "Curated OpenClaw skills directory, tutorials, and professional setup services.",
  },
  twitter: {
    card: "summary_large_image",
    title: "openclw.com — OpenClaw Resources",
    description:
      "Curated OpenClaw skills directory, tutorials, and professional setup services.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
