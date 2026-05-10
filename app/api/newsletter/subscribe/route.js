import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Newsletter from "@/models/Newsletter";
import { newsletterSchema } from "@/lib/schemas";

export async function POST(req) {
  try {
    const result = newsletterSchema.safeParse(await req.json());
    if (!result.success)
      return NextResponse.json(
        {
          error:
            result.error.flatten().fieldErrors.email?.[0] || "Invalid email",
        },
        { status: 400 },
      );

    await connectDB();

    const exists = await Newsletter.findOne({ email: result.data.email });
    if (exists)
      return NextResponse.json(
        { error: "You are already subscribed!" },
        { status: 409 },
      );

    await Newsletter.create({ email: result.data.email });
    return NextResponse.json(
      { message: "You're subscribed! Welcome to SW Technologies updates." },
      { status: 201 },
    );
  } catch (err) {
    console.error("[POST /api/newsletter/subscribe]", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
