import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { registerSchema } from "@/lib/schemas";

export async function POST(req) {
  try {
    const result = registerSchema.safeParse(await req.json());
    if (!result.success)
      return NextResponse.json(
        {
          error: "Validation failed",
          issues: result.error.flatten().fieldErrors,
        },
        { status: 400 },
      );

    const { name, email, password } = result.data;
    await connectDB();

    if (await User.findOne({ email }))
      return NextResponse.json(
        { error: "An account with this email already exists" },
        { status: 409 },
      );

    const hashed = await bcrypt.hash(password, 12);
    const user = await User.create({ name, email, password: hashed });

    return NextResponse.json(
      { message: "Account created successfully", user },
      { status: 201 },
    );
  } catch (err) {
    console.error("[POST /api/auth/register]", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
