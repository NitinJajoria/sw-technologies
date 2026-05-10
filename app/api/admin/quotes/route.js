import { NextResponse } from "next/server";
import { requireAdmin } from "@/middleware/adminMiddleware";
import { connectDB } from "@/lib/db";
import Quote from "@/models/Quote";

export async function GET() {
  const auth = await requireAdmin();
  if (auth instanceof NextResponse) return auth;
  await connectDB();
  const quotes = await Quote.find({}).sort({ createdAt: -1 });
  return NextResponse.json({ quotes });
}
