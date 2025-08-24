"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Descendant, Element, Text } from "slate";

// Define Note type
type Note = {
  _id: string;
  userId: string;
  author: string;
  title: string;
  content: Descendant[];
  createdAt: string;
  updatedAt: string;
};

// Helper: Recursively extract plain text from Slate content
const extractTextFromContent = (content: Descendant[] = []): string => {
  if (!Array.isArray(content)) return "";
  return content
    .map((node) => {
      if (Text.isText(node)) return node.text || "";
      if (Element.isElement(node)) {
        return node.children
          .map((child) => extractTextFromContent([child]))
          .join(" ");
      }
      return "";
    })
    .join("\n");
};

interface AIProps {
  notes: Note[];
}

export default function AI({ notes }: AIProps) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAsk = async () => {
    if (!question.trim()) {
      setError("Please enter a question.");
      return;
    }

    setLoading(true);
    setError(null);
    setAnswer("");

    try {
      // Prepare notes context for the API
      const notesContext = notes
        .map(
          (note) =>
            `Title: ${note.title}\nContent: ${extractTextFromContent(
              note.content
            )}\nCreated: ${note.createdAt}`
        )

        .join("\n\n---\n\n");

      // Call server-side API route
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, notesContext }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error querying AI.");
      }

      if (!response.body) throw new Error("No response body received.");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";

        for (const line of lines) {
          if (!line.startsWith("data:")) continue;
          const data = line.replace(/^data:\s*/, "").trim();
          if (data === "[DONE]") break;
          try {
            const json = JSON.parse(data);
            const token = json.choices?.[0]?.delta?.content ?? "";
            if (token) setAnswer((prev) => prev + token);
          } catch (err) {
            console.warn("Failed to parse streaming data:", err);
          }
        }
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 p-8">
      <div className="flex flex-row items-center gap-4 p-4">
        <Input
          placeholder="Ask a question about your notes..."
          value={question}
          disabled={loading}
          className="w-full h-10 rounded-full px-4"
          onChange={(e) => setQuestion(e.target.value)}
          aria-label="Question input"
          aria-busy={loading}
        />
        <Button
          onClick={handleAsk}
          className="h-10 rounded-full px-6"
          disabled={loading}
          aria-label={loading ? "Processing question" : "Ask AI"}
        >
          {loading ? "Thinking..." : "Ask AI"}
        </Button>
      </div>

      {error && <p className="text-red-500" role="alert">{error}</p>}

      {answer && (
        <div className="rounded-md bg-gray-100 p-4 dark:bg-gray-800">
          <p className="text-sm whitespace-pre-line">{answer}</p>
        </div>
      )}
    </div>
  );
}