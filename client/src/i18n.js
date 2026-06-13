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

const resources = {
  en: {
    translation: {
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
        viewPlan: "Choose \u20B999 plan"
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
    }
  },
  hi: {
    translation: {
      nav: {
        home: "होम",
        features: "फ़ीचर्स",
        about: "जानकारी",
        login: "लॉगिन",
        dashboard: "डैशबोर्ड"
      },
      common: {
        getStarted: "शुरू करें",
        demo: "प्लेटफॉर्म टूर",
        live: "हर खेत के लिए लाइव इंटेलिजेंस",
        viewPlan: "\u20B999 प्लान चुनें"
      },
      hero: {
        badge: "गांवों के लिए AI ऑपरेटिंग सिस्टम",
        slides: {
          oneTitle: "स्मार्ट फार्मिंग AI",
          oneDesc: "मिट्टी, मौसम, फसल चक्र और बाज़ार मांग को लाभकारी फैसलों में बदलें।",
          twoTitle: "IoT + सैटेलाइट इंटीग्रेशन",
          twoDesc: "सेंसर, डिवाइस और सैटेलाइट डेटा को एक ही इंटेलिजेंस लेयर में देखें।",
          threeTitle: "किसान आय बढ़ाएं",
          threeDesc: "उपज बढ़ाएं, लागत घटाएं और सही समय पर सही बाज़ार चुनें।"
        }
      },
      landing: {
        trusted: "FPO, एग्रीटेक स्टार्टअप, NGO और जिला कार्यक्रमों के लिए तैयार",
        featuresTitle: "एक ही प्लेटफ़ॉर्म में 22 इंटेलिजेंस लेयर्स",
        featuresBody:
          "सलाह, जोखिम स्कोरिंग, सेंसर ऑर्केस्ट्रेशन और WhatsApp copilot जैसे सभी वर्कफ़्लो एक जगह।",
        aboutTitle: "सिर्फ एक और डैशबोर्ड नहीं, पूरा village intelligence stack",
        aboutBody:
          "AI Village Brain कृषि डेटा को जोड़कर फसल, लोगों, डिवाइस और आय के लिए कार्रवाई योग्य निर्णय बनाता है।",
        testimonialsTitle: "AI Village Brain के साथ टीमें तेज़ी से काम करती हैं",
        testimonialsBody: "प्रीमियम SaaS लुक के साथ ग्राउंड ऑपरेशंस के लिए व्यावहारिक डिज़ाइन।",
        pricingTitle: "गांव स्तर के प्रभाव के लिए आसान सब्सक्रिप्शन",
        pricingBody: "\u20B999 मासिक प्लान से शुरू करें और Razorpay या Stripe credentials जोड़कर live payment capture करें।"
      },
      auth: {
        title: "अपने village intelligence workspace में लॉगिन करें",
        subtitle: "Quick access credentials इस्तेमाल करें या नया किसान/एडमिन प्रोफाइल बनाएं।",
        login: "लॉगिन",
        signup: "अकाउंट बनाएं"
      },
      dashboard: {
        title: "किसान कमांड सेंटर",
        subtitle: "सलाह, अलर्ट, मौसम और लाभ ट्रेंड्स एक ही पैनल में।"
      },
      admin: {
        title: "एडमिन इंटेलिजेंस सूट",
        subtitle: "ऑपरेशन, राजस्व, adoption और AI performance का पोर्टफोलियो व्यू।"
      }
    }
  },
  ml: {
    translation: mergeDeep(resources.en.translation, {
      nav: {
        home: "ഹോം",
        features: "ഫീച്ചറുകൾ",
        about: "വിവരം",
        login: "ലോഗിൻ",
        dashboard: "ഡാഷ്ബോർഡ്"
      },
      common: {
        getStarted: "തുടങ്ങുക",
        demo: "ടൂർ കാണുക",
        live: "ഓരോ വയലിനുമുള്ള ലൈവ് ഇന്റലിജൻസ്",
        viewPlan: "₹99 പ്ലാൻ തിരഞ്ഞെടുക്കുക"
      },
      hero: {
        badge: "ഗ്രാമങ്ങൾക്കായുള്ള AI ഓപ്പറേറ്റിംഗ് സിസ്റ്റം",
        slides: {
          oneTitle: "സ്മാർട്ട് ഫാർമിംഗ് AI",
          oneDesc: "മണ്ണ്, കാലാവസ്ഥ, വിള ചക്രം, വിപണി ആവശ്യം എന്നിവയെ ലാഭകരമായ തീരുമാനങ്ങളാക്കുക.",
          twoTitle: "IoT + സാറ്റലൈറ്റ് ഇന്റഗ്രേഷൻ",
          twoDesc: "സെൻസറുകൾ, വയൽ ഉപകരണങ്ങൾ, സാറ്റലൈറ്റ് ഡാറ്റ എന്നിവ ഒരിടത്ത് കാണുക.",
          threeTitle: "കർഷക വരുമാനം ഉയർത്തുക",
          threeDesc: "വിളവ് മെച്ചപ്പെടുത്തുക, നഷ്ടം കുറയ്ക്കുക, ശരിയായ വിപണി സമയം പിടിക്കുക."
        }
      },
      landing: {
        trusted: "FPO, agritech സ്റ്റാർട്ടപ്പുകൾ, NGOകൾ, ജില്ലാതല പദ്ധതികൾ എന്നിവയ്ക്കായി തയ്യാറാക്കിയിരിക്കുന്നു",
        featuresTitle: "ഒരു ഓപ്പറേറ്റിംഗ് സിസ്റ്റത്തിൽ 22 ഇന്റലിജൻസ് ലെയറുകൾ",
        featuresBody:
          "സൂചനകൾ, റിസ്‌ക് സ്‌കോറിംഗ്, സെൻസർ ഓർക്കസ്ട്രേഷൻ, WhatsApp കോപൈലറ്റ് എന്നിവയിലൂടെ എല്ലാ workflow-കളും സ്കെയിലിനായി രൂപകൽപ്പന ചെയ്തിരിക്കുന്നു.",
        aboutTitle: "സാധാരണ ഡാഷ്ബോർഡ് മാത്രമല്ല, ഗ്രാമതല ഇന്റലിജൻസ്",
        aboutBody:
          "AI Village Brain ചിതറിനിൽക്കുന്ന കൃഷി ഡാറ്റയെ വിളകൾ, ആളുകൾ, ഉപകരണങ്ങൾ, വരുമാന സ്രോതസുകൾ എന്നിവയിൽ ഏകോപിത പ്രവർത്തനമാക്കി മാറ്റുന്നു.",
        testimonialsTitle: "AI Village Brain ഉപയോഗിക്കുന്ന ടീമുകൾ വേഗത്തിൽ പ്രവർത്തിക്കുന്നു",
        testimonialsBody: "ഫീൽഡ് ടീമുകൾക്കായി പ്രായോഗികമായി നിലനിൽക്കുമ്പോഴും ബോർഡ്‌റൂം-റെഡി ആയി കാണപ്പെടാൻ രൂപകൽപ്പന ചെയ്തിരിക്കുന്നു.",
        pricingTitle: "ഗ്രാമതല പ്രഭാവത്തിനായി ലളിതമായ സബ്സ്ക്രിപ്ഷൻ",
        pricingBody: "ഫ്ലാറ്റ് മാസപരമായ പ്ലാനോടെ ആരംഭിച്ച് live payment capture-യ്ക്ക് Razorpay അല്ലെങ്കിൽ Stripe credentials ബന്ധിപ്പിക്കുക."
      },
      auth: {
        title: "നിങ്ങളുടെ village intelligence workspace-ലേക്ക് ലോഗിൻ ചെയ്യുക",
        subtitle: "Quick access credentials ഉപയോഗിക്കുകയോ പുതിയ farmer/admin profile സൃഷ്ടിക്കുകയോ ചെയ്യുക.",
        login: "ലോഗിൻ",
        signup: "അക്കൗണ്ട് സൃഷ്ടിക്കുക"
      },
      dashboard: {
        title: "കർഷക കമാൻഡ് സെന്റർ",
        subtitle: "സൂചനകൾ, അലർട്ടുകൾ, കാലാവസ്ഥ, ലാഭ ട്രെൻഡുകൾ എല്ലാം ഒരു പാനലിൽ."
      },
      admin: {
        title: "അഡ്മിൻ ഇന്റലിജൻസ് സ്യൂട്ട്",
        subtitle: "ഓപ്പറേഷൻസ്, വരുമാനം, സ്വീകരണം, AI പ്രകടനം എന്നിവയുടെ പോർട്ട്ഫോളിയോ കാഴ്ച."
      }
    })
  }
};

const languageBundles = {
  hi: {
    translation: mergeDeep(resources.en.translation, {
      nav: {
        home: "होम",
        features: "फीचर्स",
        about: "जानकारी",
        login: "लॉगिन",
        dashboard: "डैशबोर्ड"
      },
      common: {
        getStarted: "शुरू करें",
        demo: "टूर देखें",
        live: "हर खेत के लिए लाइव इंटेलिजेंस",
        viewPlan: "₹99 प्लान चुनें"
      },
      hero: {
        badge: "गांवों के लिए AI ऑपरेटिंग सिस्टम",
        slides: {
          oneTitle: "स्मार्ट फार्मिंग AI",
          oneDesc: "मिट्टी, मौसम, फसल चक्र और बाजार मांग को लाभकारी फैसलों में बदलें।",
          twoTitle: "IoT + सैटेलाइट इंटीग्रेशन",
          twoDesc: "सेंसर, डिवाइस और सैटेलाइट डेटा को एक ही इंटेलिजेंस लेयर में देखें।",
          threeTitle: "किसान आय बढ़ाएं",
          threeDesc: "उपज बढ़ाएं, लागत घटाएं और सही समय पर सही बाजार चुनें।"
        }
      },
      auth: {
        title: "अपने village intelligence workspace में लॉगिन करें",
        subtitle: "Quick access credentials इस्तेमाल करें या नया किसान/एडमिन प्रोफाइल बनाएं।",
        login: "लॉगिन",
        signup: "अकाउंट बनाएं"
      },
      dashboard: {
        title: "किसान कमांड सेंटर",
        subtitle: "सलाह, अलर्ट, मौसम और लाभ ट्रेंड्स एक ही पैनल में।"
      },
      admin: {
        title: "एडमिन इंटेलिजेंस सूट",
        subtitle: "ऑपरेशन, राजस्व, adoption और AI performance का पोर्टफोलियो व्यू।"
      }
    })
  },
  hinglish: {
    translation: mergeDeep(resources.en.translation, {
      common: {
        getStarted: "Shuru Karo",
        demo: "Tour Dekho",
        live: "Har khet ke liye live intelligence",
        viewPlan: "₹99 plan dekho"
      },
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
      auth: {
        title: "Apne village intelligence workspace me login karo",
        subtitle: "Quick access credentials use karo ya naya farmer/admin profile banao.",
        signup: "Account Banao"
      },
      dashboard: {
        title: "Farmer command center",
        subtitle: "Advice, alerts, weather aur profit trends ek jagah."
      },
      admin: {
        title: "Admin intelligence suite",
        subtitle: "Ops, revenue, adoption aur AI performance ka portfolio view."
      }
    })
  },
  mr: {
    translation: mergeDeep(resources.en.translation, {
      nav: { home: "मुख्यपृष्ठ", features: "फीचर्स", about: "माहिती", login: "लॉगिन", dashboard: "डॅशबोर्ड" },
      common: { getStarted: "सुरू करा", demo: "टूर पाहा", live: "प्रत्येक शेतासाठी लाईव्ह माहिती", viewPlan: "₹99 प्लॅन" },
      dashboard: { title: "शेतकरी कमांड सेंटर", subtitle: "सल्ला, अलर्ट, हवामान आणि नफा एकाच ठिकाणी." }
    })
  },
  gu: {
    translation: mergeDeep(resources.en.translation, {
      nav: { home: "હોમ", features: "ફીચર્સ", about: "માહિતી", login: "લૉગિન", dashboard: "ડેશબોર્ડ" },
      common: { getStarted: "શરૂ કરો", demo: "ટુર જુઓ", live: "દરેક ખેતર માટે લાઇવ ઇન્ટેલિજન્સ", viewPlan: "₹99 પ્લાન" },
      dashboard: { title: "ખેડૂત કમાન્ડ સેન્ટર", subtitle: "સલાહ, અલર્ટ, હવામાન અને નફાનો દૃશ્ય એક જગ્યાએ." }
    })
  },
  pa: {
    translation: mergeDeep(resources.en.translation, {
      nav: { home: "ਹੋਮ", features: "ਫੀਚਰ", about: "ਜਾਣਕਾਰੀ", login: "ਲਾਗਇਨ", dashboard: "ਡੈਸ਼ਬੋਰਡ" },
      common: { getStarted: "ਸ਼ੁਰੂ ਕਰੋ", demo: "ਟੂਰ ਵੇਖੋ", live: "ਹਰ ਖੇਤ ਲਈ ਲਾਈਵ ਇੰਟੈਲੀਜੈਂਸ", viewPlan: "₹99 ਪਲਾਨ" },
      dashboard: { title: "ਕਿਸਾਨ ਕਮਾਂਡ ਸੈਂਟਰ", subtitle: "ਸਲਾਹ, ਅਲਰਟ, ਮੌਸਮ ਅਤੇ ਨਫ਼ਾ ਇਕ ਹੀ ਜਗ੍ਹਾ." }
    })
  },
  ta: {
    translation: mergeDeep(resources.en.translation, {
      nav: { home: "முகப்பு", features: "அம்சங்கள்", about: "பற்றி", login: "உள்நுழை", dashboard: "டாஷ்போர்டு" },
      common: { getStarted: "தொடங்கு", demo: "டூர் பாருங்கள்", live: "ஒவ்வொரு வயலுக்கும் நேரடி அறிவு", viewPlan: "₹99 திட்டம்" },
      dashboard: { title: "விவசாய கட்டுப்பாட்டு மையம்", subtitle: "ஆலோசனை, எச்சரிக்கை, வானிலை, லாபம் அனைத்தும் ஒரே இடத்தில்." }
    })
  },
  te: {
    translation: mergeDeep(resources.en.translation, {
      nav: { home: "హోమ్", features: "ఫీచర్స్", about: "గురించి", login: "లాగిన్", dashboard: "డాష్‌బోర్డ్" },
      common: { getStarted: "ప్రారంభించండి", demo: "టూర్ చూడండి", live: "ప్రతి పొలానికి లైవ్ ఇంటెలిజెన్స్", viewPlan: "₹99 ప్లాన్" },
      dashboard: { title: "రైతు కమాండ్ సెంటర్", subtitle: "సలహా, అలర్ట్స్, వాతావరణం, లాభ ధోరణులు ఒకేచోట." }
    })
  },
  bn: {
    translation: mergeDeep(resources.en.translation, {
      nav: { home: "হোম", features: "ফিচার", about: "পরিচিতি", login: "লগইন", dashboard: "ড্যাশবোর্ড" },
      common: { getStarted: "শুরু করুন", demo: "ট্যুর দেখুন", live: "প্রতি খেতের জন্য লাইভ ইন্টেলিজেন্স", viewPlan: "₹99 প্ল্যান" },
      dashboard: { title: "কৃষক কমান্ড সেন্টার", subtitle: "পরামর্শ, অ্যালার্ট, আবহাওয়া আর লাভের ছবি এক জায়গায়." }
    })
  },
  kn: {
    translation: mergeDeep(resources.en.translation, {
      nav: { home: "ಮುಖಪುಟ", features: "ಫೀಚರ್‌ಗಳು", about: "ಬಗ್ಗೆ", login: "ಲಾಗಿನ್", dashboard: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್" },
      common: { getStarted: "ಪ್ರಾರಂಭಿಸಿ", demo: "ಟೂರ್ ನೋಡಿ", live: "ಪ್ರತಿ ಹೊಲಕ್ಕೂ ಲೈವ್ ಇಂಟೆಲಿಜೆನ್ಸ್", viewPlan: "₹99 ಯೋಜನೆ" },
      dashboard: { title: "ರೈತ ಕಮಾಂಡ್ ಸೆಂಟರ್", subtitle: "ಸಲಹೆ, ಅಲರ್ಟ್, ಹವಾಮಾನ ಮತ್ತು ಲಾಭದ ಚಿತ್ರಣ ಒಂದೇ ಜಾಗದಲ್ಲಿ." }
    })
  }
};

Object.assign(resources, languageBundles);

i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem("ai-village-brain-language") || "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false
  }
});

export default i18n;
