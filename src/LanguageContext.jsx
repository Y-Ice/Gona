import { createContext, useContext, useEffect, useMemo, useState } from "react";

const translations = {
  en: {
    settings: "Settings",
    languageRegion: "Language & Region",
    chooseLanguagePrompt: "Choose your preferred language for the Gona interface.",
    currentlySetTo: "Currently set to:",
    navigationLabelsUpdate: "Navigation labels will update immediately.",
    editProfile: "Edit Profile",
    saveChanges: "Save Changes",
    fullName: "Full Name",
    email: "Email",
    phone: "Phone",
    newPassword: "New Password (Optional)",
    leaveBlank: "Leave blank to keep current",
    dashboardOverview: "Dashboard Overview",
    searchEmployees: "Search employees...",
    recentActivities: "Recent Activities",
    viewAll: "View all →",
    farmOverview: "Farm Overview",
    addFarm: "Add Farm",
    noRecentActivities: "No recent activities yet. Once you log actions, they'll appear here.",
    noFarmsYet: "No farms are registered yet. Add your first farm to see it listed here.",
    farmName: "Farm Name",
    location: "Location",
    specialization: "Specialization",
    sizeAcres: "Size (Acres)",
    status: "Status",
    actions: "Actions",
    dashboard: "Dashboard",
    farms: "Farms",
    crops: "Crops",
    employees: "Employees",
    activities: "Activities",
    reports: "Reports",
    logout: "Logout",
    search: "Search",
    languageTab: "Language",
    profileTab: "Edit Profile",
  },
  ha: {
    settings: "Saituna",
    languageRegion: "Harshe & Yanki",
    chooseLanguagePrompt: "Zaɓi yaren da kake so don dubawar Gona.",
    currentlySetTo: "An saita yanzu zuwa:",
    navigationLabelsUpdate: "Alamar kewaya za ta sabunta nan take.",
    editProfile: "Gyara Bayani",
    saveChanges: "Ajiye Canje-canje",
    fullName: "Cikakken suna",
    email: "Imel",
    phone: "Lambar waya",
    newPassword: "Sabon kalmar sirri (Na zaɓi)",
    leaveBlank: "Bar shi a fili don ci gaba da na yanzu",
    dashboardOverview: "Dubawa ta Dashboard",
    searchEmployees: "Nemo ma'aikata...",
    recentActivities: "Ayyuka na baya-bayan nan",
    viewAll: "Duba duka →",
    farmOverview: "Dubawa na Gona",
    addFarm: "Ƙara Gona",
    noRecentActivities: "Babu ayyuka na baya-bayan nan tukuna. Da zarar ka rikodin ayyuka, za su bayyana a nan.",
    noFarmsYet: "Babu gonaki da aka yi rijista tukuna. Ƙara gonarka ta farko don ganin ta anan.",
    farmName: "Sunan Gona",
    location: "Wuri",
    specialization: "Fasaha",
    sizeAcres: "Girman (Acres)",
    status: "Matsayi",
    actions: "Ayyuka",
    dashboard: "Dashboard",
    farms: "Gonaki",
    crops: "Amfanin gona",
    employees: "Ma'aikata",
    activities: "Ayyuka",
    reports: "Rahotanni",
    logout: "Fita",
    search: "Bincike",
    languageTab: "Harshe",
    profileTab: "Gyara Profaili",
  },
  yo: {
    settings: "Ètò",
    languageRegion: "Èdè àti Agbègbè",
    chooseLanguagePrompt: "Yan àwòrán rẹ̀ fẹ́ kí ìrán Gona fi hàn.",
    currentlySetTo: "Ní báyìí ṣètò sí:",
    navigationLabelsUpdate: "Àmọ̀rí ìkópa yóò ṣe imudojuiwọn lẹ́sẹkẹsẹ.",
    editProfile: "Ṣatunkọ Profaili",
    saveChanges: "Fipamọ Ayípadà",
    fullName: "Orúkọ pipe",
    email: "Ìmẹ́lì",
    phone: "Fóònù",
    newPassword: "Ọrọ aṣínà titun (Aṣayan)",
    leaveBlank: "Fi sílẹ̀ kí o sì pa mọ́ ti ìṣáájú",
    dashboardOverview: "Àkójọpọ̀ Dashboard",
    searchEmployees: "Lọ wá oṣiṣẹ...",
    recentActivities: "Awọn iṣẹlẹ laipẹ",
    viewAll: "Wo gbogbo →",
    farmOverview: "Àkójọpọ̀ Ọgbà",
    addFarm: "Ṣe afikun Ọgbà",
    noRecentActivities: "Ko si awọn iṣẹlẹ laipẹ sibẹsibẹ. Lọgan ti o ba ṣe igbasilẹ awọn iṣe, wọn yoo han nibi.",
    noFarmsYet: "Ko si awọn oko ti a forukọsilẹ sibẹsibẹ. Fi akọkọ rẹ kun lati rii ni ibi.",
    farmName: "Orukọ Ọgbà",
    location: "Ibi",
    specialization: "Imọ-ẹrọ",
    sizeAcres: "Iwọn (Acres)",
    status: "Ipo",
    actions: "Iṣe",
    dashboard: "Dashboard",
    farms: "Ọgbà",
    crops: "Ogbin",
    employees: "Awọn oṣiṣẹ",
    activities: "Awọn iṣẹ",
    reports: "Awọn ijabọ",
    logout: "Jade",
    search: "Wa",
    languageTab: "Èdè",
    profileTab: "Ṣatunkọ Profaili",
  },
  ig: {
    settings: "Ntọala",
    languageRegion: "Asụsụ & Mpaghara",
    chooseLanguagePrompt: "Họrọ asụsụ ịchọrọ maka ihu Gona.",
    currentlySetTo: "Ebe a họrọlarị:",
    navigationLabelsUpdate: "Aha ụzọ ga-emelite ozugbo.",
    editProfile: "Dezie Profaili",
    saveChanges: "Chekwa mgbanwe",
    fullName: "Aha zuru ezu",
    email: "Email",
    phone: "Ekwenti",
    newPassword: "Otu okwuntughe ọhụrụ (Nhọrọ)",
    leaveBlank: "Hapụ ya efu ka ọkụ gara aga dịgide",
    dashboardOverview: "Nlele Dashboard",
    searchEmployees: "Chọọ ndị ọrụ...",
    recentActivities: "Nrụ ọrụ nso nso a",
    viewAll: "Lee niile →",
    farmOverview: "Nlele Ogige",
    addFarm: "Tinye Ugbo",
    noRecentActivities: "Enweghị ọrụ nso nso a ugbu a. Ozugbo ịdekọ ọrụ, ha ga-apụta ebe a.",
    noFarmsYet: "Enweghị ọgbọ ala edebanyere aha ugbu a. Tinye nke mbụ gị iji hụ ya ebe a.",
    farmName: "Aha Ogige",
    location: "Ebe",
    specialization: "Ọkachamara",
    sizeAcres: "Nha (Acres)",
    status: "Ọnọdụ",
    actions: "Mmegharị",
    dashboard: "Dashboard",
    farms: "Ugbo",
    crops: "Mmanụ osisi",
    employees: "Ndị ọrụ",
    activities: "Omume",
    reports: "Akụkọ",
    logout: "Pụọ",
    search: "Chọọ",
    languageTab: "Asụsụ",
    profileTab: "Dezie Profaili",
  },
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguageState] = useState(() => {
    if (typeof window === "undefined") return "en";
    return localStorage.getItem("language") || "en";
  });

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  const value = useMemo(
    () => ({
      language,
      setLanguage: setLanguageState,
      t: (key) => translations[language]?.[key] || translations.en[key] || key,
    }),
    [language]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
};
