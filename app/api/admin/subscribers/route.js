import { NextResponse } from "next/server";
import { requireAdmin } from "@/middleware/adminMiddleware";
import { connectDB } from "@/lib/db";
import Newsletter from "@/models/Newsletter";

export async function GET() {
  const auth = await requireAdmin();
  if (auth instanceof NextResponse) return auth;
  await connectDB();
  const subscribers = await Newsletter.find({}).sort({ subscribedAt: -1 });
  return NextResponse.json({ subscribers });
}
