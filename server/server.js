import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

app.post("/api/summarize", async (req, res) => {
  const { inputText } = req.body;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: `Summarize this:\n\n${inputText}` }],
        max_tokens: 300,
        temperature: 0.5,
      }),
    });

    const data = await response.json();
    const summary = data.choices?.[0]?.message?.content || "⚠️ No summary returned.";

    res.json({ summary });
  } catch (error) {
    console.error("API Error:", error);
    res.status(500).json({ error: "Something went wrong!" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
