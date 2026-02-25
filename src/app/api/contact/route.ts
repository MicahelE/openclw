import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { contacts } from "@/db/schema";
import nodemailer from "nodemailer";

async function sendNotificationEmail(data: {
  name: string;
  email: string;
  message: string;
  serviceType: string;
}) {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_EMAIL } =
    process.env;

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !CONTACT_EMAIL) {
    return;
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: Number(SMTP_PORT) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  await transporter.sendMail({
    from: `"OpenCLW Contact Form" <${SMTP_USER}>`,
    to: CONTACT_EMAIL,
    subject: `New contact: ${data.serviceType} — ${data.name}`,
    text: [
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      `Service: ${data.serviceType}`,
      "",
      data.message,
    ].join("\n"),
    replyTo: data.email,
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message, serviceType, website } = body;

    if (website) {
      return NextResponse.json({ success: true });
    }

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    db.insert(contacts)
      .values({
        name,
        email,
        message,
        serviceType: serviceType || "general",
      })
      .run();

    try {
      await sendNotificationEmail({
        name,
        email,
        message,
        serviceType: serviceType || "general",
      });
    } catch (emailErr) {
      console.error("Failed to send notification email:", emailErr);
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to save message" },
      { status: 500 }
    );
  }
}
