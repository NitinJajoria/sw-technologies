import { NextResponse } from "next/server";
import { requireAdmin } from "@/middleware/adminMiddleware";
import { connectDB } from "@/lib/db";
import Newsletter from "@/models/Newsletter";

export async function GET(req) {
  const auth = await requireAdmin();
  if (auth instanceof NextResponse) return auth;

  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page")) || 1;
  const limit = parseInt(searchParams.get("limit")) || 10;
  const skip = (page - 1) * limit;

  await connectDB();
  const total = await Newsletter.countDocuments();
  const subscribers = await Newsletter.find({})
    .sort({ subscribedAt: -1 })
    .skip(skip)
    .limit(limit);

  return NextResponse.json({ 
    subscribers, 
    total, 
    page, 
    totalPages: Math.ceil(total / limit) 
  });
}
