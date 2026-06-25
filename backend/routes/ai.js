const express = require("express");
const router = express.Router();

const SUPPORTED_LANGUAGES = ["english", "pidgin", "yoruba", "hausa", "igbo"];

router.post("/report", async (req, res) => {
  try {
    const { prompt, language = "english" } = req.body;

    const lang = language.toLowerCase().trim();
    if (!SUPPORTED_LANGUAGES.includes(lang)) {
      return res.status(400).json({
        message: `Unsupported language. Choose from: ${SUPPORTED_LANGUAGES.join(", ")}`,
      });
    }

    const finalPrompt =
      lang === "english"
        ? prompt
        : `${prompt}\n\nWrite the entire response in ${lang === "pidgin" ? "Nigerian Pidgin" : lang}. Do not mix in English except for technical terms with no direct translation.`;

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        max_tokens: 1200, // slightly bumped — non-English output (esp. Yoruba/Igbo diacritics) can run longer than English for the same content
        messages: [{ role: "user", content: finalPrompt }],
      }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error?.message || "AI error");

    const text = data.choices?.[0]?.message?.content || "";
    res.json({ report: text, language: lang });
  } catch (err) {
    console.error("AI report error:", err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;