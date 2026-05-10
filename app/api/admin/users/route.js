import { NextResponse } from "next/server";
import { requireAdmin } from "@/middleware/adminMiddleware";
import { connectDB } from "@/lib/db";
import User from "@/models/User";

export async function GET() {
  const auth = await requireAdmin();
  if (auth instanceof NextResponse) return auth;
  await connectDB();
  const users = await User.find({}).sort({ createdAt: -1 }); // toJSON strips passwords
  return NextResponse.json({ users });
}
