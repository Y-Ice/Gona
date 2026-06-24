import { useState } from "react";
import { Languages, UserCog, Check } from "lucide-react";
import { useLanguage, LANGUAGES } from "../../context/LanguageContext";
import { useTranslatedText } from "../../hooks/useTranslatedText";

function T({ text }) {
  const translated = useTranslatedText(text);
  return <>{translated}</>;
}

function LanguageTab() {
  const { selectedLanguage, setSelectedLanguage } = useLanguage();

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
      <div className="flex items-center gap-2 px-6 py-5 border-b border-gray-100">
        <Languages size={18} className="text-[#c47a0a]" />
        <h3 className="text-lg font-semibold text-gray-800">🇳🇬 <T text="Language & Region" /></h3>
      </div>

      <div className="px-6 py-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
          {Object.values(LANGUAGES).map((lang) => (
            <button
              key={lang.label}
              onClick={() => setSelectedLanguage(lang.label)}
              className={`flex flex-col items-center justify-center gap-1 rounded-xl border-2 py-5 transition-all
                ${selectedLanguage === lang.label
                  ? "border-[#c47a0a] bg-[#fdefd0]"
                  : "border-gray-200 bg-white hover:border-gray-300"
                }`}
            >
              <span className={`text-2xl ${selectedLanguage === lang.label ? "opacity-100" : "opacity-90"}`}>
                {(() => {
                  const map = {
                    English: '🇬🇧',
                    Hausa: '🇳🇬',
                    'Yorùbá': '🇳🇬',
                    Igbo: '🇳🇬',
                  };
                  return map[lang.label] || '🏳️';
                })()}
              </span>
              <span className={`text-sm font-sans ${selectedLanguage === lang.label ? "text-[#c47a0a] font-medium" : "text-gray-500"}`}>
                {lang.label}
              </span>
            </button>
          ))}
        </div>

        <div className="flex items-start gap-2 bg-[#f0ece0] rounded-xl px-4 py-3">
          <Check size={16} className="text-[#c47a0a] mt-0.5 flex-shrink-0" />
          <p className="text-sm text-gray-600 font-sans">
            <T text="Currently set to" />:{" "}
            <span className="font-semibold text-gray-800">{selectedLanguage}</span>.{" "}
            <T text="All farm data and labels will update to this language." />
          </p>
        </div>
      </div>
    </div>
  );
}



const tabs = [
  { id: "language", label: "Language", icon: <Languages size={18} /> },
];

const AdminSettings = () => {
  const [activeTab, setActiveTab] = useState("language");

  return (
    <div className="min-h-screen bg-[#f7f4ee] font-serif p-4 sm:p-6">
      <h1 className="text-xl sm:text-3xl text-gray-700 mb-6 font-sans font-bold tracking-tight">
        <T text="Settings" />
      </h1>

      <div className="mb-6 border-b border-gray-500 pb-4"></div>

      <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-3 h-fit">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-sans text-sm font-medium transition-all mb-1
                ${
                  activeTab === tab.id
                    ? "bg-[#fdefd0] text-[#c47a0a]"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
            >
              {tab.icon}
              <T text={tab.label} />
            </button>
          ))}
        </div>

        <div>{activeTab === "language" && <LanguageTab />}</div>
      </div>
    </div>
  );
};

export default AdminSettings;