import { NextResponse } from "next/server";
import { auth } from "@/auth";
import Note from "../../../models/Notes"; // Fixed import path
import { connectToDatabase } from "@/utils/database";

export async function GET(req: Request) {
  try {
    await connectToDatabase();
    const session = await auth();

    // Log session email for debugging
    try {
      console.log("GET /api/notes - session email:", session?.user?.email);
    } catch {}

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Match by email, id, or name in case stored userId format differs
    // Normalize possible identifier fields from the session without using `any`
    const userObj = session.user as { id?: string; sub?: string } | undefined;
    const identifierCandidates = [
      session.user?.email,
      // next-auth sometimes provides an id or sub field
      userObj?.id,
      userObj?.sub,
      session.user?.name,
    ].filter(Boolean) as string[];

    const notes = await Note.find({
      $or: identifierCandidates.map((id) => ({ userId: id })),
    });

    // If debug query is present and we're not in production, include session info
    try {
      const url = new URL(req.url);
      if (url.searchParams.get("debug") === "1" && process.env.NODE_ENV !== "production") {
        return NextResponse.json({ notes, session: { email: session.user?.email, name: session.user?.name } });
      }
    } catch {}

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