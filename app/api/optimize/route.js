import path from "path";
import { readFile } from "fs/promises";

export const runtime = "nodejs";

export async function POST(request) {
  try {
    const { tweet } = await request.json();
    if (!tweet || !tweet.trim()) {
      return Response.json(
        { error: "Tweet copy is required." },
        { status: 400 }
      );
    }

    const model = process.env.OPENAI_MODEL || "gpt-4o-mini";
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return Response.json(
        { error: "OPENAI_API_KEY is not configured." },
        { status: 500 }
      );
    }

    let prompt;
    try {
      const promptPath = path.join(
        process.cwd(),
        "prompts",
        "tweet_prompt.txt"
      );
      prompt = (await readFile(promptPath, "utf8")).trim();
    } catch (error) {
      return Response.json(
        {
          error:
            "Prompt file not found. Add prompts/tweet_prompt.txt to the project."
        },
        { status: 500 }
      );
    }

    if (!prompt) {
      return Response.json(
        { error: "Prompt file is empty." },
        { status: 500 }
      );
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: "system", content: prompt },
          { role: "user", content: tweet }
        ],
        temperature: 0.7
      })
    });

    if (!response.ok) {
      const errorBody = await response.text();
      return Response.json(
        { error: `OpenAI error: ${errorBody}` },
        { status: 500 }
      );
    }

    const data = await response.json();
    const optimized = data?.choices?.[0]?.message?.content?.trim();

    if (!optimized) {
      return Response.json(
        { error: "No optimized text returned." },
        { status: 500 }
      );
    }

    return Response.json({ optimized });
  } catch (error) {
    return Response.json(
      { error: error.message || "Server error." },
      { status: 500 }
    );
  }
}
