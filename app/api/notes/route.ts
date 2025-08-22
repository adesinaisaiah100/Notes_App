import { NextResponse } from "next/server";
import { auth } from "@/auth";
import Note from "../../../models/Notes"; // Fixed import path
import { connectToDatabase } from "@/utils/database";

export async function GET() {
  try {
    await connectToDatabase();
    const session = await auth();
    
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const notes = await Note.find({ userId: session.user?.email });
    return NextResponse.json(notes);
  } catch (error) {
    console.error("GET /api/notes error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const session = await auth();
    
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const body = await req.json();
    const newNote = await Note.create({
      userId: session.user?.email,
      author: session.user?.name || session.user?.email, // fallback
      title: body.title,
      content: body.content,
    });
    
    return NextResponse.json(newNote);
  } catch (error) {
    console.error("POST /api/notes error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}