import { NextRequest, NextResponse } from "next/server";
import { getContacts } from "@/lib/skills";

export async function GET(request: NextRequest) {
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword) {
    return NextResponse.json(
      { error: "Admin not configured" },
      { status: 503 }
    );
  }

  const auth = request.headers.get("Authorization");
  if (auth !== adminPassword) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = getContacts();
  return NextResponse.json(data);
}
