import { requireAuth } from "./authMiddleware";
import { NextResponse } from "next/server";

export async function requireAdmin() {
  const auth = await requireAuth();
  if (auth instanceof NextResponse) return auth;

  if (auth.role !== "admin")
    return NextResponse.json(
      { error: "Forbidden: admin access only" },
      { status: 403 },
    );

  return auth;
}
