import { NextResponse } from "next/server";
import { requireAdmin } from "@/middleware/adminMiddleware";
import { connectDB } from "@/lib/db";
import Contact from "@/models/Contact";

export async function GET() {
  const auth = await requireAdmin();
  if (auth instanceof NextResponse) return auth;
  await connectDB();
  const contacts = await Contact.find({}).sort({ createdAt: -1 });
  return NextResponse.json({ contacts });
}
