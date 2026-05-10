import { verifyToken } from "@/lib/jwt";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function requireAuth() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token)
    return NextResponse.json(
      { error: "Authentication required" },
      { status: 401 },
    );

  const payload = verifyToken(token);
  if (!payload)
    return NextResponse.json(
      { error: "Invalid or expired token" },
      { status: 401 },
    );

  return payload;
}
