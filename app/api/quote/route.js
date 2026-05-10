import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Quote from "@/models/Quote";
import { quoteSchema } from "@/lib/schemas";

export async function POST(req) {
  try {
    const result = quoteSchema.safeParse(await req.json());
    if (!result.success)
      return NextResponse.json(
        {
          error: "Validation failed",
          issues: result.error.flatten().fieldErrors,
        },
        { status: 400 },
      );

    await connectDB();
    const quote = await Quote.create(result.data);
    return NextResponse.json(
      {
        message: "Quote received! We'll send a proposal within 48 hours.",
        quote,
      },
      { status: 201 },
    );
  } catch (err) {
    console.error("[POST /api/quote]", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
