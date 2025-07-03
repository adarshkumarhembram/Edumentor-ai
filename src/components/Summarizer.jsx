// src/pages/Summarizer.jsx

import { useState } from "react";

function Summarizer() {
  const [inputText, setInputText] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSummarize = async () => {
    if (!inputText.trim()) return;
    setLoading(true);
    setSummary("");
    setError("");

    try {
      const response = await fetch("/api/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: inputText }),
      });

      const data = await response.json();

      if (!response.ok || !data.summary) {
        throw new Error(data.error || "No summary returned.");
      }

      setSummary(data.summary.trim());
    } catch (err) {
      console.error("❌ Error summarizing:", err);
      setError("⚠️ Failed to generate summary. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 mt-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-purple-700">🧠 AI Notes Summarizer</h2>

      <textarea
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Paste or write your notes here..."
        rows={8}
        className="w-full border p-4 rounded-lg mb-4"
      />

      <div className="flex gap-4">
        <button
          onClick={handleSummarize}
          disabled={loading}
          className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700"
        >
          {loading ? "Summarizing..." : "Summarize"}
        </button>

        <button
          onClick={() => {
            setInputText("");
            setSummary("");
            setError("");
          }}
          className="bg-gray-300 text-black px-6 py-2 rounded-lg hover:bg-gray-400"
        >
          Clear
        </button>
      </div>

      {error && (
        <div className="mt-4 text-red-600 font-medium">
          {error}
        </div>
      )}

      {summary && (
        <div className="mt-6 p-4 border rounded-lg bg-gray-100">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold text-gray-700">🔎 Summary:</h3>
            <button
              className="text-sm text-blue-600 hover:underline"
              onClick={() => navigator.clipboard.writeText(summary)}
            >
              📋 Copy
            </button>
          </div>
          <pre className="text-gray-800 whitespace-pre-wrap">{summary}</pre>
        </div>
      )}
    </div>
  );
}

export default Summarizer;
