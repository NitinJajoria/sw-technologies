import { NextResponse } from "next/server";
import { requireAuth } from "@/middleware/authMiddleware";
import { connectDB } from "@/lib/db";
import User from "@/models/User";

export async function GET() {
  const auth = await requireAuth();
  if (auth instanceof NextResponse) return auth;

  await connectDB();
  const user = await User.findById(auth.id);
  if (!user)
    return NextResponse.json({ error: "User not found" }, { status: 404 });

  return NextResponse.json({ user });
}
