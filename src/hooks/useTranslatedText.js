import { useState, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";

/**
 * useTranslatedText
 * Translates a single string whenever the language changes.
 *
 * Usage:
 *   const translated = useTranslatedText("Welcome to Gona");
 *   // Returns translated string, updates automatically when language changes
 */
export function useTranslatedText(text) {
  const { translate, selectedLanguage } = useLanguage();
  const [translated, setTranslated] = useState(text);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      const result = await translate(text);
      if (!cancelled) setTranslated(result);
    }

    run();

    return () => { cancelled = true; };
  }, [text, selectedLanguage, translate]);

  return translated;
}

/**
 * useTranslatedObject
 * Translates all string values in an object whenever the language changes.
 * Great for translating a whole farm record from MongoDB.
 *
 * Usage:
 *   const translated = useTranslatedObject({
 *     cropName: "Maize",
 *     status: "Ready for harvest",
 *     notes: "Water every 3 days"
 *   });
 */
export function useTranslatedObject(obj) {
  const { translate, selectedLanguage } = useLanguage();
  const [translated, setTranslated] = useState(obj);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      if (!obj) return;

      const entries = Object.entries(obj);
      const translated = {};

      await Promise.all(
        entries.map(async ([key, value]) => {
          if (typeof value === "string") {
            translated[key] = await translate(value);
          } else {
            translated[key] = value; // Keep numbers, booleans etc as-is
          }
        })
      );

      if (!cancelled) setTranslated(translated);
    }

    run();

    return () => { cancelled = true; };
  }, [obj, selectedLanguage, translate]);

  return translated;
}