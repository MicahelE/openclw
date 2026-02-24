import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { contacts } from "@/db/schema";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message, serviceType } = body;

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

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to save message" },
      { status: 500 }
    );
  }
}
