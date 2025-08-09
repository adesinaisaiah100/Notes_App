import User from "@/models/user";
import { connectToDatabase } from "@/utils/database";
import bcrypt from "bcryptjs";

export async function POST(req) {
  const { email, password } = await req.json();
  await connectToDatabase();
  const user = await User.findOne({ email });
  if (!user) {
    return new Response(JSON.stringify({ message: "User not found. Please register." }), { status: 404 });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return new Response(JSON.stringify({ message: "Invalid credentials" }), { status: 401 });
  }
  return new Response(JSON.stringify({ message: "Login successful" }), { status: 200 });
}
