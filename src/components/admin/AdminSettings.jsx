import { useState } from "react";
import { Languages, UserCog, Check } from "lucide-react";
import { useLanguage, LANGUAGES } from "../../context/LanguageContext";

function LanguageTab() {
  const { selectedLanguage, setSelectedLanguage } = useLanguage();

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
      <div className="flex items-center gap-2 px-6 py-5 border-b border-gray-100">
        <Languages size={18} className="text-[#c47a0a]" />
        <h3 className="text-lg font-semibold text-gray-800">🇳🇬 Language & Region</h3>
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
            Currently set to:{" "}
            <span className="font-semibold text-gray-800">{selectedLanguage}</span>.
            All farm data and labels will update to this language.
          </p>
        </div>
      </div>
    </div>
  );
}

function EditProfileTab() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
      <div className="flex items-center gap-2 px-6 py-5 border-b border-gray-100">
        <UserCog size={18} className="text-[#c47a0a]" />
        <h3 className="text-lg font-semibold text-gray-800">Edit Profile</h3>
      </div>

      <div className="px-6 py-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-full bg-[#c47a0a] flex items-center justify-center text-white text-lg font-semibold font-sans flex-shrink-0">
            AU
          </div>
          <div>
            <p className="text-base font-semibold text-gray-800">Admin User</p>
            <p className="text-sm text-gray-500 font-sans">admin@farm.com</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5 mb-6">
          <div>
            <label className="text-xs font-sans font-semibold text-[#c47a0a] tracking-wider uppercase mb-2 block">
              Full Name
            </label>
            <input
              type="text"
              defaultValue="Admin User"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm font-sans text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200"
            />
          </div>

          <div>
            <label className="text-xs font-sans font-semibold text-[#c47a0a] tracking-wider uppercase mb-2 block">
              Email
            </label>
            <input
              type="email"
              defaultValue="admin@farm.com"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm font-sans text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200"
            />
          </div>

          <div>
            <label className="text-xs font-sans font-semibold text-[#c47a0a] tracking-wider uppercase mb-2 block">
              Phone
            </label>
            <input
              type="text"
              placeholder="e.g. 08012345678"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm font-sans text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200"
            />
          </div>

          <div>
            <label className="text-xs font-sans font-semibold text-[#c47a0a] tracking-wider uppercase mb-2 block">
              New Password (Optional)
            </label>
            <input
              type="password"
              placeholder="Leave blank to keep current"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm font-sans text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200"
            />
          </div>
        </div>

        <button className="flex items-center gap-2 bg-[#1e1a14] text-white text-sm font-sans font-medium px-5 py-3 rounded-xl hover:bg-[#2a241c]">
          <Check size={16} />
          Save Changes
        </button>
      </div>
    </div>
  );
}

const tabs = [
  { id: "language", label: "Language", icon: <Languages size={18} /> },
  { id: "profile", label: "Edit Profile", icon: <UserCog size={18} /> },
];

const AdminSettings = () => {
  const [activeTab, setActiveTab] = useState("language");

  return (
    <div className="min-h-screen bg-[#f7f4ee] font-serif p-4 sm:p-6">
      <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-6">Settings</h1>

      <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-3 h-fit">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-sans text-sm font-medium transition-all mb-1
                ${activeTab === tab.id
                  ? "bg-[#fdefd0] text-[#c47a0a]"
                  : "text-gray-600 hover:bg-gray-50"
                }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        <div>
          {activeTab === "language" && <LanguageTab />}
          {activeTab === "profile" && <EditProfileTab />}
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;