const fetch = require("node-fetch");

const textToSpeech = async (req, res) => {
  const { text, voice = "Tayo" } = req.body;

  if (!text) return res.status(400).json({ message: "Text is required" });

  try {
    const response = await fetch("https://yarngpt.ai/api/v1/tts", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.YARNGPT_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text, voice, response_format: "mp3" }),
    });

    if (!response.ok) {
      const err = await response.json();
      return res.status(response.status).json({ message: err.message || "YarnGPT error" });
    }

    res.setHeader("Content-Type", "audio/mpeg");
    response.body.pipe(res);
  } catch (err) {
    console.error("TTS error:", err);
    res.status(500).json({ message: "Text to speech failed" });
  }
};

module.exports = { textToSpeech };