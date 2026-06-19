import { createContext, useContext, useState, useCallback } from "react";
import { getDictionaryTranslation } from "./translations";

export const LANGUAGES = {
  English: { code: "en", myMemoryCode: "en-GB", label: "English" },
  Hausa:   { code: "ha", myMemoryCode: "ha-NG", label: "Hausa" },
  "Yorùbá":  { code: "yo", myMemoryCode: "yo-NG", label: "Yorùbá" },
  Igbo:    { code: "ig", myMemoryCode: "ig-NG", label: "Igbo" },
};

const LanguageContext = createContext(null);
const cache = {};

export function LanguageProvider({ children }) {
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [isTranslating, setIsTranslating] = useState(false);

  const translate = useCallback(async (text) => {
    if (!text || typeof text !== "string" || text.trim() === "") return text;
    if (selectedLanguage === "English") return text;

    // 1. Check dictionary first — always accurate
    const dictResult = getDictionaryTranslation(text, selectedLanguage);
    if (dictResult) return dictResult;

    // 2. Check cache
    const langConfig = LANGUAGES[selectedLanguage];
    const cacheKey = `${langConfig.code}:${text}`;
    if (cache[cacheKey]) return cache[cacheKey];

    // 3. Fall back to MyMemory API
    try {
      const response = await fetch(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${langConfig.code}`
      );
      const data = await response.json();

      if (data.responseStatus === 200) {
        const translated = data.responseData.translatedText;
        cache[cacheKey] = translated;
        return translated;
      }

      return text;
    } catch (error) {
      console.error("Translation error:", error);
      return text;
    }
  }, [selectedLanguage]);

  const translateMany = useCallback(async (textsArray) => {
    setIsTranslating(true);
    try {
      const results = await Promise.all(textsArray.map((t) => translate(t)));
      return results;
    } finally {
      setIsTranslating(false);
    }
  }, [translate]);

  const speak = useCallback((text) => {
    if (!text || typeof window === "undefined") return;
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    const speechLangMap = {
      English: "en-NG",
      Hausa:   "ha",
      "Yorùbá":  "yo",
      Igbo:    "ig",
    };

    utterance.lang = speechLangMap[selectedLanguage] || "en-NG";
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 1;
    window.speechSynthesis.speak(utterance);
  }, [selectedLanguage]);

  const stopSpeaking = useCallback(() => {
    if (typeof window !== "undefined") {
      window.speechSynthesis.cancel();
    }
  }, []);

  return (
    <LanguageContext.Provider
      value={{
        selectedLanguage,
        setSelectedLanguage,
        translate,
        translateMany,
        speak,
        stopSpeaking,
        isTranslating,
        currentLangConfig: LANGUAGES[selectedLanguage],
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used inside <LanguageProvider>");
  }
  return context;
}