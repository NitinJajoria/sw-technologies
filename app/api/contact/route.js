import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Contact from "@/models/Contact";
import { contactSchema } from "@/lib/schemas";

export async function POST(req) {
  try {
    const result = contactSchema.safeParse(await req.json());
    if (!result.success)
      return NextResponse.json(
        {
          error: "Validation failed",
          issues: result.error.flatten().fieldErrors,
        },
        { status: 400 },
      );

    await connectDB();
    const contact = await Contact.create(result.data);
    return NextResponse.json(
      { message: "Thanks! We'll get back to you within 24 hours.", contact },
      { status: 201 },
    );
  } catch (err) {
    console.error("[POST /api/contact]", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
