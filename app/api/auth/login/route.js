import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { signToken, COOKIE_OPTIONS } from "@/lib/jwt";
import { loginSchema } from "@/lib/schemas";

export async function POST(req) {
  try {
    const result = loginSchema.safeParse(await req.json());
    if (!result.success)
      return NextResponse.json(
        {
          error: "Validation failed",
          issues: result.error.flatten().fieldErrors,
        },
        { status: 400 },
      );

    const { email, password } = result.data;
    await connectDB();

    const user = await User.findOne({ email }).lean();
    if (!user || !(await bcrypt.compare(password, user.password)))
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 },
      );

    const token = signToken({
      id: user._id,
      email: user.email,
      role: user.role,
    });
    const response = NextResponse.json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

    response.cookies.set("auth_token", token, COOKIE_OPTIONS);
    return response;
  } catch (err) {
    console.error("[POST /api/auth/login]", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
