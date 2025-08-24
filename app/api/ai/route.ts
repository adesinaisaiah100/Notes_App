// app/api/ai/route.ts
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { question, notesContext } = await req.json();

  if (!question || !notesContext) {
    return new Response(JSON.stringify({ message: "Missing question or notes context" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "deepseek-r1-distill-llama-70b",
        temperature: 0.7,
        max_tokens: 512,
        stream: true,
        messages: [
          {
            role: "system",
            content:
              "You are an AI assistant that answers questions based solely on the provided notes. Do not add external knowledge.",
          },
          {
            role: "user",
            content: `Notes:\n${notesContext}\n\nQuestion: ${question}\n\nAnswer:`,
          },
        ],
      }),
    });

    if (!groqRes.ok || !groqRes.body) {
      let errorMessage = "Error querying Groq API";
      try {
        const errorData = await groqRes.json();
        errorMessage = errorData.error?.message || errorMessage;
      } catch (e) {
        // fallback if not JSON
        errorMessage = await groqRes.text();
      }
      console.error("Groq API error:", errorMessage);
      return new Response(JSON.stringify({ message: errorMessage }), {
        status: groqRes.status,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Stream the response back to the client
    return new Response(groqRes.body, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
      },
    });
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ message: err instanceof Error ? err.message : "Server error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}