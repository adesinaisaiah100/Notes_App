import User from "@/models/user";
import { connectToDatabase } from "@/utils/database";
import bcrypt from "bcryptjs";

export async function POST(req) {
  const { name, email, password } = await req.json();
  await connectToDatabase();
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return new Response(JSON.stringify({ message: "User already exists" }), { status: 400 });
  }
  const hashedPassword = await bcrypt.hash(password || '', 10);
  await User.create({ name, email, password: hashedPassword });
  return new Response(JSON.stringify({ message: "User registered" }), { status: 200 });
}
