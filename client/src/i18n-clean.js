import i18n from "i18next";
import { initReactI18next } from "react-i18next";

function mergeDeep(base, override) {
  const output = { ...base };

  for (const [key, value] of Object.entries(override || {})) {
    if (
      value &&
      typeof value === "object" &&
      !Array.isArray(value) &&
      base?.[key] &&
      typeof base[key] === "object" &&
      !Array.isArray(base[key])
    ) {
      output[key] = mergeDeep(base[key], value);
    } else {
      output[key] = value;
    }
  }

  return output;
}

const baseTranslation = {
  nav: {
    home: "Home",
    features: "Features",
    about: "About",
    login: "Login",
    dashboard: "Dashboard"
  },
  common: {
    getStarted: "Get Started",
    demo: "Book Tour",
    live: "Live intelligence for every acre",
    viewPlan: "Choose ₹99 plan"
  },
  hero: {
    badge: "AI-powered village operating system",
    slides: {
      oneTitle: "Smart Farming AI",
      oneDesc: "Turn soil, climate, crop cycles, and local demand into profitable planting decisions.",
      twoTitle: "IoT + Satellite Integration",
      twoDesc: "Blend sensors, field devices, and remote imagery into one village-wide intelligence graph.",
      threeTitle: "Increase Farmer Income",
      threeDesc: "Improve yield, cut waste, reduce risk, and unlock stronger market timing for every farmer."
    }
  },
  landing: {
    trusted: "Built for farmer producer groups, agritech startups, NGOs, and district programs",
    featuresTitle: "Twenty-two intelligence layers in one operating system",
    featuresBody:
      "From recommendations and risk scoring to sensor orchestration and WhatsApp copilots, every workflow is designed for scale.",
    aboutTitle: "Village intelligence, not just another dashboard",
    aboutBody:
      "AI Village Brain turns fragmented agriculture data into coordinated action across crops, people, devices, and revenue streams.",
    testimonialsTitle: "Teams using AI Village Brain move faster",
    testimonialsBody: "Built to look boardroom-ready while staying practical for field teams.",
    pricingTitle: "Simple subscription for village-scale impact",
    pricingBody: "Start with a flat monthly plan and connect Razorpay or Stripe credentials for live payment capture."
  },
  auth: {
    title: "Sign in to your village intelligence workspace",
    subtitle: "Use quick access credentials or create a new farmer/admin profile.",
    login: "Login",
    signup: "Create account"
  },
  dashboard: {
    title: "Farmer command center",
    subtitle: "Recommendations, alerts, weather, and profitability trends in one panel."
  },
  admin: {
    title: "Admin intelligence suite",
    subtitle: "Operations, revenue, adoption, and AI performance at portfolio level."
  }
};

const resources = {
  en: { translation: baseTranslation },
  hi: {
    translation: mergeDeep(baseTranslation, {
      nav: { home: "होम", features: "फीचर्स", about: "जानकारी", login: "लॉगिन", dashboard: "डैशबोर्ड" },
      common: { getStarted: "शुरू करें", demo: "डेमो देखें", live: "हर खेत के लिए लाइव इंटेलिजेंस", viewPlan: "₹99 प्लान चुनें" },
      hero: {
        badge: "गांवों के लिए AI operating system",
        slides: {
          oneTitle: "स्मार्ट फार्मिंग AI",
          oneDesc: "मिट्टी, मौसम, फसल चक्र और मांग को बेहतर फैसलों में बदलें।",
          twoTitle: "IoT + Satellite Integration",
          twoDesc: "सेंसर, डिवाइस और सैटेलाइट डेटा को एक साथ देखें।",
          threeTitle: "किसान आय बढ़ाएँ",
          threeDesc: "उपज बढ़ाएँ, लागत घटाएँ और सही समय पर सही मंडी चुनें।"
        }
      },
      auth: { title: "अपने village workspace में लॉगिन करें", subtitle: "Quick access credentials या नया farmer/admin profile बनाएं।", signup: "खाता बनाएं" },
      dashboard: { title: "किसान कमांड सेंटर", subtitle: "सलाह, अलर्ट, मौसम और लाभ ट्रेंड्स एक ही जगह।" },
      admin: { title: "एडमिन इंटेलिजेंस सूट", subtitle: "Operations, revenue, adoption और AI performance का overview." }
    })
  },
  hinglish: {
    translation: mergeDeep(baseTranslation, {
      common: { getStarted: "Shuru Karo", demo: "Demo Dekho", live: "Har khet ke liye live intelligence" },
      hero: {
        badge: "Gaon ke liye AI operating system",
        slides: {
          oneTitle: "Smart Farming AI",
          oneDesc: "Mitti, mausam, crop cycle aur market demand ko better faislon me badlo.",
          twoTitle: "IoT + Satellite Integration",
          twoDesc: "Sensor, devices aur satellite data ko ek simple intelligence layer me dekho.",
          threeTitle: "Farmer Income Badhayo",
          threeDesc: "Yield badhao, waste kam karo aur mandi timing better banao."
        }
      },
      auth: { title: "Apne village intelligence workspace me login karo", subtitle: "Quick access credentials use karo ya naya farmer/admin profile banao.", signup: "Account Banao" },
      dashboard: { title: "Farmer command center", subtitle: "Advice, alerts, weather aur profit trends ek jagah." },
      admin: { title: "Admin intelligence suite", subtitle: "Ops, revenue, adoption aur AI performance ka portfolio view." }
    })
  },
  mr: { translation: mergeDeep(baseTranslation, { nav: { home: "मुख्यपृष्ठ", login: "लॉगिन", dashboard: "डॅशबोर्ड" } }) },
  gu: { translation: mergeDeep(baseTranslation, { nav: { home: "હોમ", login: "લૉગિન", dashboard: "ડેશબોર્ડ" } }) },
  pa: { translation: mergeDeep(baseTranslation, { nav: { home: "ਹੋਮ", login: "ਲੌਗਿਨ", dashboard: "ਡੈਸ਼ਬੋਰਡ" } }) },
  ta: { translation: mergeDeep(baseTranslation, { nav: { home: "முகப்பு", login: "உள்நுழைவு", dashboard: "டாஷ்போர்டு" } }) },
  te: { translation: mergeDeep(baseTranslation, { nav: { home: "హోమ్", login: "లాగిన్", dashboard: "డాష్‌బోర్డ్" } }) },
  bn: { translation: mergeDeep(baseTranslation, { nav: { home: "হোম", login: "লগইন", dashboard: "ড্যাশবোর্ড" } }) },
  kn: { translation: mergeDeep(baseTranslation, { nav: { home: "ಮುಖಪುಟ", login: "ಲಾಗಿನ್", dashboard: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್" } }) },
  ml: { translation: mergeDeep(baseTranslation, { nav: { home: "ഹോം", login: "ലോഗിൻ", dashboard: "ഡാഷ്‌ബോർഡ്" } }) }
};

const initialLanguage = typeof window !== "undefined" ? localStorage.getItem("ai-village-brain-language") || "en" : "en";

i18n.use(initReactI18next).init({
  resources,
  lng: initialLanguage,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false
  }
});

export default i18n;
