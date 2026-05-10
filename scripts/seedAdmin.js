import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { config } from "dotenv";

config({ path: ".env.local" });

const schema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    password: String,
    role: { type: String, default: "user" },
  },
  { timestamps: true },
);

const User = mongoose.models?.User || mongoose.model("User", schema);

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);

  const email = "admin@swtech.dev";
  const password = "Admin@SW2026";

  const existingAdmin = await User.findOne({ email });
  if (existingAdmin) {
    existingAdmin.password = await bcrypt.hash(password, 12);
    await existingAdmin.save();
    console.log("─".repeat(40));
    console.log("✅ Admin password updated");
    console.log("   Email   :", email);
    console.log("   Password:", password);
    console.log("─".repeat(40));
    return process.exit(0);
  }

  await User.create({
    name: "SW Admin",
    email,
    password: await bcrypt.hash(password, 12),
    role: "admin",
  });

  console.log("─".repeat(40));
  console.log("✅ Admin created");
  console.log("   Email   :", email);
  console.log("   Password:", password);
  console.log("─".repeat(40));
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
