"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";

export default function HomePage() {
  const [tweet, setTweet] = useState("");
  const [result, setResult] = useState("");
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleOptimize = async () => {
    if (!tweet.trim()) {
      setStatus("Please enter your tweet copy first.");
      return;
    }

    setIsLoading(true);
    setStatus("Optimizing...");
    setResult("");

    try {
      const response = await fetch("/api/optimize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tweet })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.error || "Optimization failed.");
      }

      setResult(data.optimized || "");
      setStatus("Done.");
    } catch (error) {
      setStatus(error.message || "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main>
      <h1>AI Tweet Copy Optimizer</h1>
      <p className="status">
        Paste your draft and receive a tighter, higher-performing version.
      </p>
      <div className="card">
        <label htmlFor="tweet">Original tweet copy</label>
        <textarea
          id="tweet"
          placeholder="Paste your tweet copy here..."
          value={tweet}
          onChange={(event) => setTweet(event.target.value)}
        />
        <button onClick={handleOptimize} disabled={isLoading}>
          {isLoading ? "Optimizing..." : "Optimize Tweet"}
        </button>
        {status && <div className="status">{status}</div>}
        {result && (
          <>
            <label htmlFor="optimized" style={{ marginTop: 24 }}>
              Optimized tweet
            </label>
            <div id="optimized" className="output">
              <ReactMarkdown>{result}</ReactMarkdown>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
