import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { question, notesContext } = req.body;

  if (!question || !notesContext) {
    return res.status(400).json({ message: "Missing question or notes context" });
  }

  try {
    const groqRes = await fetch("https://api.groq.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "mixtral-8x7b-32768", // Use a valid Groq model
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

    if (!groqRes.ok) {
      const errorData = await groqRes.json();
      return res.status(groqRes.status).json({
        message: errorData.error?.message || "Error querying Groq API",
      });
    }

    // Stream the response back to the client
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    const reader = groqRes.body?.getReader();
    if (!reader) {
      return res.status(500).json({ message: "Failed to read response stream" });
    }

    const stream = new ReadableStream({
      async start(controller) {
        const decoder = new TextDecoder();
        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            controller.enqueue("data: [DONE]\n\n");
            controller.close();
            break;
          }
          controller.enqueue(decoder.decode(value, { stream: true }));
        }
      },
    });

    return new Response(stream);
  } catch (err: any) {
    return res.status(500).json({ message: err.message || "Server error" });
  }
}