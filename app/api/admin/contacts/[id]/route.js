import { NextResponse } from "next/server";
import { requireAdmin } from "@/middleware/adminMiddleware";
import { connectDB } from "@/lib/db";
import Contact from "@/models/Contact";

export async function DELETE(_, { params }) {
  const auth = await requireAdmin();
  if (auth instanceof NextResponse) return auth;
  await connectDB();
  const deleted = await Contact.findByIdAndDelete(params.id);
  if (!deleted)
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ message: "Deleted successfully" });
}
