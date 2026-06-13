export const supportedLanguages = [
  { code: "en", label: "English", nativeLabel: "English", shortLabel: "EN", flag: "🇬🇧", speechCode: "en-IN" },
  { code: "hi", label: "Hindi", nativeLabel: "हिन्दी", shortLabel: "HI", flag: "🇮🇳", speechCode: "hi-IN" },
  { code: "mr", label: "Marathi", nativeLabel: "मराठी", shortLabel: "MR", flag: "🌿", speechCode: "mr-IN" },
  { code: "gu", label: "Gujarati", nativeLabel: "ગુજરાતી", shortLabel: "GU", flag: "🌱", speechCode: "gu-IN" },
  { code: "pa", label: "Punjabi", nativeLabel: "ਪੰਜਾਬੀ", shortLabel: "PA", flag: "🚜", speechCode: "pa-IN" },
  { code: "ta", label: "Tamil", nativeLabel: "தமிழ்", shortLabel: "TA", flag: "🌴", speechCode: "ta-IN" },
  { code: "te", label: "Telugu", nativeLabel: "తెలుగు", shortLabel: "TE", flag: "🌾", speechCode: "te-IN" },
  { code: "bn", label: "Bengali", nativeLabel: "বাংলা", shortLabel: "BN", flag: "🌦", speechCode: "bn-IN" },
  { code: "kn", label: "Kannada", nativeLabel: "ಕನ್ನಡ", shortLabel: "KN", flag: "🌼", speechCode: "kn-IN" },
  { code: "ml", label: "Malayalam", nativeLabel: "മലയാളം", shortLabel: "ML", flag: "🌴", speechCode: "ml-IN" }
];

export const supportedLanguageCodes = supportedLanguages.map((item) => item.code);
const languageAliases = {
  hinglish: "hi"
};

export function normalizeLanguage(language) {
  const normalized = languageAliases[language] || language;
  return supportedLanguageCodes.includes(normalized) ? normalized : "en";
}

export function getLanguageMeta(language) {
  return supportedLanguages.find((item) => item.code === normalizeLanguage(language)) || supportedLanguages[0];
}

function mergeDeep(base, override) {
  if (!override) {
    return base;
  }

  const output = { ...base };

  for (const [key, value] of Object.entries(override)) {
    if (
      value &&
      typeof value === "object" &&
      !Array.isArray(value) &&
      typeof base?.[key] === "object" &&
      base?.[key] !== null &&
      !Array.isArray(base?.[key])
    ) {
      output[key] = mergeDeep(base[key], value);
    } else {
      output[key] = value;
    }
  }

  return output;
}

const englishCopy = {
  greeting: "Namaste Kisan 👋",
  greetingHelp: "Today we kept your farm summary simple, visual, and easy to use.",
  online: "Online sync is active",
  offline: "Offline mode is on. Basic cards will still work.",
  liveMode: "Live farm mode",
  farmStatus: "Farm status",
  weatherTitle: "Today's weather",
  weatherHint: "Simple sky + field update",
  advisoryTitle: "Today's advice",
  quickActionsTitle: "Tap for quick help",
  quickActionsHint: "Big buttons for the most common farmer needs",
  moduleTitle: "22 smart tools",
  moduleHint: "Tap any card and get a real backend answer",
  aiPanelTitle: "AI Sathi",
  aiPanelHint: "Type, speak, or upload a photo",
  alertsTitle: "Alerts and reminders",
  alertsHint: "Friendly messages from weather, AI, and devices",
  performanceTitle: "Field signals",
  performanceHint: "Easy cards for health, market, water, and soil",
  billingTitle: "Plan and billing",
  billingHint: "Simple subscription view for every farmer",
  latestResult: "Latest answer",
  resultPlaceholder: "Tap any card to see the result here.",
  resultReady: "Answer ready",
  runAgain: "Run again",
  askNow: "Ask now",
  tapToAsk: "Tap to Ask",
  voiceInput: "Voice input",
  uploadPhoto: "Upload photo",
  imageReady: "Photo attached",
  imageHelp: "Photo is optional. Add one for pest check.",
  loading: "Loading your farm dashboard...",
  loadingFeature: "Working on your request...",
  searchPlaceholder: "Ask: when should I sell tomato?",
  noAlerts: "No fresh alert right now. Your farm looks stable.",
  networkFallback: "Network is slow, so safe fallback cards are visible.",
  featureWorking: "This tool is talking to the protected backend API.",
  quickSuggestions: [
    "Wheat ke liye kya dekhna hai?",
    "Tamatar ka mandi bhav dikhao",
    "Pani kab dena chahiye?",
    "Photo se pest check karo"
  ],
  quickActions: {
    "ai-crop-planning": { title: "🌾 Crop Planning", helper: "What to grow next" },
    "water-analytics": { title: "💧 Irrigation Help", helper: "When to give water" },
    "pest-detection": { title: "🐛 Pest Check", helper: "Upload a crop photo" },
    "market-price-prediction": { title: "📈 Market Price", helper: "Best selling time" },
    "voice-ai": { title: "🎤 Voice Help", helper: "Speak and get advice" }
  },
  status: {
    good: "Good",
    risk: "Risk",
    alert: "Alert"
  },
  miniMetrics: {
    cropScore: "Crop health",
    incomePotential: "Income chance",
    alertCount: "Alerts",
    mandiWindow: "Best sell time"
  },
  detailCards: {
    humidity: "Humidity",
    rainfallChance: "Rain chance",
    soilPh: "Soil pH",
    moisture: "Moisture"
  },
  featureLabels: {
    "ai-crop-planning": { title: "🌾 Crop Planning", helper: "Plan the next crop" },
    "fertilizer-optimization": { title: "💊 Fertilizer Help", helper: "Use less, grow better" },
    "pest-detection": { title: "🐛 Pest Check", helper: "Photo based crop check" },
    "yield-prediction": { title: "📊 Yield Prediction", helper: "Harvest outlook" },
    "market-price-prediction": { title: "📈 Market Price", helper: "Best mandi timing" },
    "iot-sensors": { title: "📡 Sensor Data", helper: "Soil and device status" },
    "satellite-monitoring": { title: "🛰 Crop Health", helper: "Satellite field view" },
    "voice-ai": { title: "🎤 Voice AI Assistant", helper: "Speak to the system" },
    "whatsapp-ai": { title: "💬 WhatsApp AI Assistant", helper: "Simple advisory chat" },
    "weather-data": { title: "🌦 Weather Intelligence", helper: "Local weather update" },
    "alerts-system": { title: "🚨 Smart Alerts", helper: "Urgent field reminders" },
    "supply-chain": { title: "🏭 Supply Chain", helper: "After-harvest movement" },
    "farm-ledger": { title: "💰 Farm Finance", helper: "Spend and margin" },
    "insurance-predictor": { title: "📉 Insurance Risk Analysis", helper: "Claim and risk signal" },
    "soil-health-analysis": { title: "🌱 Soil Health", helper: "Field soil check" },
    "carbon-scoring": { title: "🌍 Carbon Score", helper: "Sustainability signal" },
    "water-analytics": { title: "💧 Smart Irrigation", helper: "Water saving tips" },
    "community-advisory": { title: "🤝 Community Advice", helper: "Village-wide updates" },
    "credit-readiness": { title: "📊 Credit Ready", helper: "Loan readiness view" },
    "subscription-billing": { title: "💳 Subscription Management", helper: "Plan and payments" },
    "admin-intelligence": { title: "📡 Admin Insights", helper: "Cluster performance" },
    "digital-twin": { title: "🧪 Digital Twin Farm", helper: "Farm simulation view" },
    "ivr-system": { title: "📞 Voice Call Assistant", helper: "Automated phone guidance" },
    "notification-system": { title: "🔔 Notifications", helper: "Live reminder feed" }
  },
  aiActions: {
    crop: "🌾 Crop Planning",
    fertilizer: "💊 Fertilizer Help",
    pest: "🐛 Pest Check",
    yield: "📊 Crop Estimate",
    market: "📈 Market Price",
    health: "🛰 Health Score",
    insurance: "📉 Insurance Risk",
    "digital-twin": "🧪 Farm Simulation"
  }
};

const overrides = {
  hi: {
    greeting: "नमस्ते किसान 👋",
    greetingHelp: "आज की खेती की जानकारी आसान कार्ड में दिख रही है।",
    online: "ऑनलाइन सिंक चालू है",
    offline: "ऑफलाइन मोड चालू है। जरूरी कार्ड फिर भी काम करेंगे।",
    liveMode: "लाइव खेती मोड",
    farmStatus: "खेत की स्थिति",
    weatherTitle: "आज का मौसम",
    weatherHint: "आसान मौसम और खेत अपडेट",
    advisoryTitle: "आज की सलाह",
    quickActionsTitle: "जल्दी मदद के लिए टैप करें",
    quickActionsHint: "किसानों के काम के बड़े बटन",
    moduleTitle: "22 स्मार्ट टूल",
    moduleHint: "किसी भी कार्ड पर टैप करें और असली जवाब पाएं",
    aiPanelTitle: "AI साथी",
    aiPanelHint: "लिखें, बोलें या फोटो अपलोड करें",
    alertsTitle: "अलर्ट और याद दिलाना",
    alertsHint: "मौसम, AI और डिवाइस से आसान संदेश",
    performanceTitle: "खेत के संकेत",
    performanceHint: "स्वास्थ्य, बाजार, पानी और मिट्टी के आसान कार्ड",
    billingTitle: "प्लान और बिलिंग",
    billingHint: "हर किसान के लिए आसान सब्सक्रिप्शन व्यू",
    latestResult: "नया जवाब",
    resultPlaceholder: "जवाब देखने के लिए किसी कार्ड पर टैप करें।",
    resultReady: "जवाब तैयार है",
    runAgain: "फिर चलाएं",
    askNow: "अभी पूछें",
    tapToAsk: "पूछने के लिए टैप करें",
    voiceInput: "आवाज से पूछें",
    uploadPhoto: "फोटो अपलोड",
    imageReady: "फोटो जुड़ गया",
    imageHelp: "कीट जांच के लिए फोटो वैकल्पिक है।",
    loading: "आपका किसान डैशबोर्ड लोड हो रहा है...",
    loadingFeature: "आपकी रिक्वेस्ट पर काम हो रहा है...",
    searchPlaceholder: "पूछें: टमाटर कब बेचना चाहिए?",
    noAlerts: "अभी कोई नया अलर्ट नहीं है। आपका खेत स्थिर दिख रहा है।",
    networkFallback: "नेटवर्क धीमा है, इसलिए सुरक्षित फॉलबैक कार्ड दिख रहे हैं।",
    featureWorking: "यह टूल सुरक्षित बैकएंड API से जुड़ा है।",
    quickSuggestions: [
      "गेहूं के लिए क्या देखना है?",
      "टमाटर का मंडी भाव दिखाओ",
      "पानी कब देना चाहिए?",
      "फोटो से कीट जांच करो"
    ],
    quickActions: {
      "ai-crop-planning": { title: "🌾 फसल योजना", helper: "अगली फसल क्या हो" },
      "water-analytics": { title: "💧 सिंचाई मदद", helper: "पानी कब देना है" },
      "pest-detection": { title: "🐛 कीट जांच", helper: "फोटो से जांच" },
      "market-price-prediction": { title: "📈 मंडी भाव", helper: "बेचने का सही समय" },
      "voice-ai": { title: "🎤 आवाज मदद", helper: "बोलकर सलाह लें" }
    },
    status: {
      good: "अच्छा",
      risk: "जोखिम",
      alert: "अलर्ट"
    },
    miniMetrics: {
      cropScore: "फसल स्वास्थ्य",
      incomePotential: "आय मौका",
      alertCount: "अलर्ट",
      mandiWindow: "बेचने का समय"
    },
    detailCards: {
      humidity: "नमी",
      rainfallChance: "बारिश संभावना",
      soilPh: "मिट्टी pH",
      moisture: "मॉइस्चर"
    },
    featureLabels: {
      "ai-crop-planning": { title: "🌾 फसल योजना", helper: "अगली फसल क्या बोनी है" },
      "fertilizer-optimization": { title: "💊 खाद सलाह", helper: "कम खाद, बेहतर असर" },
      "pest-detection": { title: "🐛 कीट जांच", helper: "फोटो से कीट पहचान" },
      "yield-prediction": { title: "📊 फसल का अंदाजा", helper: "कटाई का अनुमान" },
      "market-price-prediction": { title: "📈 मंडी भाव", helper: "बेचने का समय" },
      "iot-sensors": { title: "📡 सेंसर डेटा", helper: "मिट्टी और डिवाइस हाल" },
      "satellite-monitoring": { title: "🛰 फसल स्वास्थ्य", helper: "ऊपर से खेत की नजर" },
      "voice-ai": { title: "🎤 आवाज AI", helper: "बोलकर पूछें" },
      "whatsapp-ai": { title: "💬 WhatsApp AI", helper: "आसान सलाह चैट" },
      "weather-data": { title: "🌦 मौसम", helper: "लोकल मौसम अपडेट" },
      "alerts-system": { title: "🚨 अलर्ट", helper: "जरूरी चेतावनी" },
      "supply-chain": { title: "🏭 सप्लाई ट्रैक", helper: "कटाई के बाद की चाल" },
      "farm-ledger": { title: "💰 खेती पैसा", helper: "खर्च और मुनाफा" },
      "insurance-predictor": { title: "📉 बीमा जोखिम", helper: "क्लेम और जोखिम" },
      "water-analytics": { title: "💧 पानी विश्लेषण", helper: "पानी बचत टिप्स" },
      "community-advisory": { title: "🤝 समुदाय सलाह", helper: "गांव की सामूहिक अपडेट" },
      "credit-readiness": { title: "📊 लोन तैयारी", helper: "क्रेडिट स्थिति" },
      "subscription-billing": { title: "💳 बिलिंग", helper: "प्लान और भुगतान" },
      "admin-intelligence": { title: "🔔 एडमिन इनसाइट", helper: "क्लस्टर प्रदर्शन" }
    },
    aiActions: {
      crop: "🌾 फसल योजना",
      fertilizer: "💊 खाद सलाह",
      pest: "🐛 कीट जांच",
      yield: "📊 फसल का अंदाजा",
      market: "📈 मंडी भाव",
      health: "🛰 स्वास्थ्य स्कोर",
      insurance: "📉 बीमा जोखिम",
      "digital-twin": "🧪 खेत सिमुलेशन"
    }
  },
  hinglish: {
    greeting: "Namaste Kisan 👋",
    greetingHelp: "Aaj ki kheti ki info simple cards me dikh rahi hai.",
    online: "Online sync on hai",
    offline: "Offline mode on hai. Basic cards fir bhi chalenge.",
    liveMode: "Live kheti mode",
    farmStatus: "Khet ka haal",
    weatherTitle: "Aaj ka mausam",
    quickActionsTitle: "Jaldi help ke liye tap karo",
    moduleTitle: "22 smart tools",
    moduleHint: "Kisi bhi card par tap karo aur real jawab pao",
    aiPanelTitle: "AI Sathi",
    aiPanelHint: "Likho, bolo ya photo bhejo",
    alertsTitle: "Alerts aur reminders",
    latestResult: "Naya jawab",
    resultPlaceholder: "Result dekhne ke liye koi bhi card tap karo.",
    runAgain: "Dobara chalao",
    askNow: "Abhi pucho",
    tapToAsk: "Tap karke pucho",
    voiceInput: "Bolo aur pucho",
    uploadPhoto: "Photo upload",
    searchPlaceholder: "Pucho: tamatar kab bechna chahiye?",
    quickSuggestions: [
      "Gehu ke liye kya dekhna hai?",
      "Tamatar ka mandi bhav dikhao",
      "Pani kab dena chahiye?",
      "Photo se pest check karo"
    ],
    quickActions: {
      "ai-crop-planning": { title: "🌾 Fasal Yojana", helper: "Agli fasal kya ho" },
      "water-analytics": { title: "💧 Pani Help", helper: "Pani kab dena hai" },
      "pest-detection": { title: "🐛 Pest Check", helper: "Photo se jaanch" },
      "market-price-prediction": { title: "📈 Mandi Bhav", helper: "Bechne ka right time" },
      "voice-ai": { title: "🎤 Voice Help", helper: "Bolkar advice lo" }
    },
    featureLabels: {
      "ai-crop-planning": { title: "🌾 Fasal Yojana", helper: "Agli fasal kya boye" },
      "fertilizer-optimization": { title: "💊 Khaad Help", helper: "Kam khaad, better asar" },
      "yield-prediction": { title: "📊 Fasal Ka Andaza", helper: "Harvest ka guess" },
      "market-price-prediction": { title: "📈 Mandi Bhav", helper: "Bechne ka time" },
      "satellite-monitoring": { title: "🛰 Fasal Health", helper: "Upar se field nazar" },
      "farm-ledger": { title: "💰 Kheti Paisa", helper: "Kharcha aur margin" },
      "insurance-predictor": { title: "📉 Bima Risk", helper: "Claim aur risk" },
      "water-analytics": { title: "💧 Pani Analytics", helper: "Pani bachane ki tips" },
      "credit-readiness": { title: "📊 Loan Ready", helper: "Credit taiyari" }
    },
    aiActions: {
      crop: "🌾 Fasal Yojana",
      fertilizer: "💊 Khaad Help",
      pest: "🐛 Pest Check",
      yield: "📊 Fasal Ka Andaza",
      market: "📈 Mandi Bhav",
      health: "🛰 Health Score",
      insurance: "📉 Bima Risk",
      "digital-twin": "🧪 Farm Simulation"
    }
  },
  mr: {
    greeting: "नमस्कार शेतकरी 👋",
    weatherTitle: "आजचे हवामान",
    farmStatus: "शेताची स्थिती",
    quickActionsTitle: "झटपट मदत",
    moduleTitle: "22 स्मार्ट साधने",
    aiPanelTitle: "AI साथी",
    alertsTitle: "अलर्ट आणि सूचना",
    status: { good: "चांगले", risk: "जोखीम", alert: "अलर्ट" }
  },
  gu: {
    greeting: "નમસ્તે ખેડૂત 👋",
    weatherTitle: "આજનું હવામાન",
    farmStatus: "ખેતરની સ્થિતિ",
    quickActionsTitle: "ઝડપી મદદ",
    moduleTitle: "22 સ્માર્ટ ટૂલ",
    aiPanelTitle: "AI સાથી",
    alertsTitle: "અલર્ટ અને યાદ અપાવો",
    status: { good: "સારું", risk: "જોખમ", alert: "અલર્ટ" }
  },
  pa: {
    greeting: "ਸਤ ਸ੍ਰੀ ਅਕਾਲ ਕਿਸਾਨ 👋",
    weatherTitle: "ਅੱਜ ਦਾ ਮੌਸਮ",
    farmStatus: "ਖੇਤ ਦੀ ਹਾਲਤ",
    quickActionsTitle: "ਝਟਪਟ ਮਦਦ",
    moduleTitle: "22 ਸਮਾਰਟ ਟੂਲ",
    aiPanelTitle: "AI ਸਾਥੀ",
    alertsTitle: "ਅਲਰਟ ਤੇ ਯਾਦ ਦਿਵਾਉਣਾ",
    status: { good: "ਠੀਕ", risk: "ਖਤਰਾ", alert: "ਅਲਰਟ" }
  },
  ta: {
    greeting: "வணக்கம் விவசாயி 👋",
    weatherTitle: "இன்றைய வானிலை",
    farmStatus: "பயிர் நிலை",
    quickActionsTitle: "உடனடி உதவி",
    moduleTitle: "22 ஸ்மார்ட் கருவிகள்",
    aiPanelTitle: "AI உதவி",
    alertsTitle: "அலர்ட் மற்றும் நினைவூட்டல்",
    status: { good: "நன்று", risk: "ஆபத்து", alert: "எச்சரிக்கை" }
  },
  te: {
    greeting: "నమస్తే రైతు 👋",
    weatherTitle: "ఈరోజు వాతావరణం",
    farmStatus: "పొలం స్థితి",
    quickActionsTitle: "తక్షణ సహాయం",
    moduleTitle: "22 స్మార్ట్ టూల్స్",
    aiPanelTitle: "AI సహాయకుడు",
    alertsTitle: "అలర్ట్స్ మరియు గుర్తింపులు",
    status: { good: "బాగుంది", risk: "ప్రమాదం", alert: "అలర్ట్" }
  },
  bn: {
    greeting: "নমস্কার কৃষক 👋",
    weatherTitle: "আজকের আবহাওয়া",
    farmStatus: "খেতের অবস্থা",
    quickActionsTitle: "দ্রুত সাহায্য",
    moduleTitle: "২২টি স্মার্ট টুল",
    aiPanelTitle: "AI সাথী",
    alertsTitle: "অ্যালার্ট ও রিমাইন্ডার",
    status: { good: "ভাল", risk: "ঝুঁকি", alert: "অ্যালার্ট" }
  },
  kn: {
    greeting: "ನಮಸ್ಕಾರ ರೈತರೆ 👋",
    weatherTitle: "ಇಂದಿನ ಹವಾಮಾನ",
    farmStatus: "ಹೊಲದ ಸ್ಥಿತಿ",
    quickActionsTitle: "ತ್ವರಿತ ಸಹಾಯ",
    moduleTitle: "22 ಸ್ಮಾರ್ಟ್ ಸಾಧನಗಳು",
    aiPanelTitle: "AI ಜೊತೆಗಾರ",
    alertsTitle: "ಅಲರ್ಟ್ ಮತ್ತು ಜ್ಞಾಪನೆಗಳು",
    status: { good: "ಚೆನ್ನಾಗಿದೆ", risk: "ಅಪಾಯ", alert: "ಅಲರ್ಟ್" }
  },
  ml: {
    greeting: "നമസ്കാരം കർഷകാ 👋",
    greetingHelp: "ഇന്ന് നിങ്ങളുടെ കൃഷിവിവരങ്ങൾ ലളിതമായ കാർഡുകളിൽ കാണിക്കുന്നു.",
    online: "ഓൺലൈൻ സിങ്ക് സജ്ജമാണ്",
    offline: "ഓഫ്‌ലൈൻ മോഡ് ഓണാണ്. അടിസ്ഥാന കാർഡുകൾ പ്രവർത്തിക്കും.",
    liveMode: "ലൈവ് കൃഷി മോഡ്",
    farmStatus: "കൃഷി നില",
    weatherTitle: "ഇന്നത്തെ കാലാവസ്ഥ",
    weatherHint: "എളുപ്പത്തിലുള്ള ആകാശവും വയൽ അപ്ഡേറ്റും",
    advisoryTitle: "ഇന്നത്തെ നിർദേശം",
    quickActionsTitle: "വേഗ സഹായത്തിന് ടാപ്പ് ചെയ്യൂ",
    quickActionsHint: "കർഷകർക്കായി വലിയ ബട്ടണുകൾ",
    moduleTitle: "22 സ്മാർട്ട് ടൂളുകൾ",
    moduleHint: "ഏത് കാർഡിലും ടാപ്പ് ചെയ്ത് ഉടൻ മറുപടി നേടൂ",
    aiPanelTitle: "AI സഹായം",
    aiPanelHint: "ടൈപ്പ് ചെയ്യൂ, പറയൂ അല്ലെങ്കിൽ ഫോട്ടോ അപ്‌ലോഡ് ചെയ്യൂ",
    alertsTitle: "അലർട്ടുകളും ഓർമ്മപ്പെടുത്തലുകളും",
    alertsHint: "മഴ, AI, ഉപകരണങ്ങൾ എന്നിവയിൽ നിന്ന് ലളിതമായ സന്ദേശങ്ങൾ",
    performanceTitle: "വയൽ സിഗ്നലുകൾ",
    performanceHint: "ആരോഗ്യം, വിപണി, വെള്ളം, മണ്ണ് എന്നിവയുടെ ലളിത കാർഡുകൾ",
    billingTitle: "പ്ലാനും ബില്ലിംഗും",
    billingHint: "എല്ലാ കർഷകർക്കും ലളിതമായ സബ്സ്ക്രിപ്ഷൻ കാഴ്ച",
    latestResult: "പുതിയ മറുപടി",
    resultPlaceholder: "മറുപടി കാണാൻ ഏതെങ്കിലും കാർഡിൽ ടാപ്പ് ചെയ്യൂ.",
    resultReady: "മറുപടി തയ്യാറായി",
    runAgain: "വീണ്ടും പ്രവർത്തിപ്പിക്കുക",
    askNow: "ഇപ്പോൾ ചോദിക്കൂ",
    tapToAsk: "ചോദിക്കാൻ ടാപ്പ് ചെയ്യൂ",
    voiceInput: "ശബ്ദ ഇൻപുട്ട്",
    uploadPhoto: "ഫോട്ടോ അപ്‌ലോഡ്",
    imageReady: "ഫോട്ടോ ചേർത്തു",
    imageHelp: "പെസ്റ്റ് പരിശോധനയ്ക്ക് ഫോട്ടോ ചേർക്കാം.",
    loading: "നിങ്ങളുടെ കൃഷി ഡാഷ്ബോർഡ് ലോഡ് ചെയ്യുന്നു...",
    loadingFeature: "നിങ്ങളുടെ അഭ്യർത്ഥനയിൽ പ്രവർത്തിക്കുന്നു...",
    searchPlaceholder: "ചോദിക്കുക: ടമാറ്റോ എപ്പോഴാണ് വിൽക്കേണ്ടത്?",
    noAlerts: "ഇപ്പോൾ പുതിയ അലർട്ട് ഒന്നുമില്ല. നിങ്ങളുടെ വയൽ സ്ഥിരമാണെന്ന് കാണുന്നു.",
    networkFallback: "നെറ്റ്‌വർക്ക് மெதുവാണ്, അതിനാൽ സുരക്ഷിത ഫാൾബാക്ക് കാർഡുകൾ കാണിക്കുന്നു.",
    featureWorking: "ഈ ടൂൾ സംരക്ഷിത ബാക്ക്‌എൻഡ് API-യുമായി സംസാരിക്കുന്നു.",
    quickSuggestions: [
      "ഗോതമ്പിന് എന്ത് ശ്രദ്ധിക്കണം?",
      "ടമാറ്റോയുടെ മണ്ടി വില കാണിക്കുക",
      "വെള്ളം എപ്പോൾ നൽകണം?",
      "ഫോട്ടോ ഉപയോഗിച്ച് കീടം പരിശോധിക്കുക"
    ],
    quickActions: {
      "ai-crop-planning": { title: "🌾 വിള പദ്ധതി", helper: "അടുത്ത വിള എന്ത്" },
      "water-analytics": { title: "💧 ജലസഹായം", helper: "വെള്ളം എപ്പോൾ നൽകണം" },
      "pest-detection": { title: "🐛 കീട പരിശോധന", helper: "ഫോട്ടോ വഴി പരിശോധിക്കുക" },
      "market-price-prediction": { title: "📈 മണ്ടി വില", helper: "വിൽപ്പനയ്ക്കുള്ള നല്ല സമയം" },
      "voice-ai": { title: "🎤 ശബ്ദ സഹായം", helper: "പറഞ്ഞ് ഉപദേശം നേടൂ" }
    },
    status: {
      good: "നല്ലത്",
      risk: "അപായം",
      alert: "അലർട്ട്"
    },
    miniMetrics: {
      cropScore: "വിള ആരോഗ്യനില",
      incomePotential: "വരുമാന അവസരം",
      alertCount: "അലർട്ടുകൾ",
      mandiWindow: "മികച്ച വിൽപ്പന സമയം"
    },
    detailCards: {
      humidity: "ആർദ്രത",
      rainfallChance: "മഴ സാധ്യത",
      soilPh: "മണ്ണ് pH",
      moisture: "ഈർപ്പം"
    },
    featureLabels: {
      "ai-crop-planning": { title: "🌾 വിള പദ്ധതി", helper: "അടുത്ത വിള എന്ത് നടണം" },
      "fertilizer-optimization": { title: "💊 വള നിർദേശം", helper: "കുറച്ച് വളം, നല്ല ഫലം" },
      "pest-detection": { title: "🐛 കീട പരിശോധന", helper: "ഫോട്ടോ ഉപയോഗിച്ച് പരിശോധിക്കുക" },
      "yield-prediction": { title: "📊 വിള ഫലം കണക്കാക്കൽ", helper: "വിളവെടുപ്പ് അനുമാനം" },
      "market-price-prediction": { title: "📈 മണ്ടി വില", helper: "വിൽക്കാനുള്ള സമയം" },
      "iot-sensors": { title: "📡 സെൻസർ ഡാറ്റ", helper: "മണ്ണും ഉപകരണങ്ങളും" },
      "satellite-monitoring": { title: "🛰 വിള ആരോഗ്യം", helper: "മുകളിലൂടെ വയൽ കാണുക" },
      "voice-ai": { title: "🎤 ശബ്ദ AI", helper: "പറഞ്ഞ് ചോദിക്കുക" },
      "whatsapp-ai": { title: "💬 WhatsApp AI", helper: "എളുപ്പമുള്ള ചാറ്റ്" },
      "weather-data": { title: "🌦 കാലാവസ്ഥ", helper: "പ്രാദേശിക കാലാവസ്ഥ അപ്ഡേറ്റ്" },
      "alerts-system": { title: "🚨 അലർട്ടുകൾ", helper: "അത്യാവശ്യ അറിയിപ്പുകൾ" },
      "supply-chain": { title: "🏭 സപ്ലൈ ചെയിൻ", helper: "വിളവെടുപ്പിന് ശേഷമുള്ള പ്രവാഹം" },
      "farm-ledger": { title: "💰 കൃഷി പണം", helper: "ചെലവും ലാഭവും" },
      "insurance-predictor": { title: "📉 ഇൻഷുറൻസ് റിസ്‌ക്", helper: "ക്ലെയിം സാധ്യത" },
      "water-analytics": { title: "💧 സ്മാർട്ട് ഇറിഗേഷൻ", helper: "വെള്ളം ലാഭിക്കാനുള്ള ടിപ്പുകൾ" },
      "community-advisory": { title: "🤝 സമൂഹ നിർദേശം", helper: "ഗ്രാമ അപ്ഡേറ്റുകൾ" },
      "credit-readiness": { title: "📊 വായ്പ ഒരുക്കം", helper: "ക്രെഡിറ്റ് നില" },
      "subscription-billing": { title: "💳 സബ്സ്ക്രിപ്ഷൻ", helper: "പ്ലാനും പേയ്മെന്റും" },
      "digital-twin": { title: "🧪 ഡിജിറ്റൽ ട്വിൻ", helper: "വയൽ സിമുലേഷൻ" },
      "ivr-system": { title: "📞 ഫോൺ സഹായം", helper: "ഓട്ടോമേറ്റഡ് വിളികൾ" },
      "admin-intelligence": { title: "📡 അഡ്മിൻ ഇൻസൈറ്റ്സ്", helper: "ക്ലസ്റ്റർ പ്രകടനം" },
      "notification-system": { title: "🔔 അറിയിപ്പുകൾ", helper: "തത്സമയ ഓർമ്മപ്പെടുത്തലുകൾ" }
    },
    aiActions: {
      crop: "🌾 വിള പദ്ധതി",
      fertilizer: "💊 വള നിർദേശം",
      pest: "🐛 കീട പരിശോധന",
      yield: "📊 വിള ഫലം കണക്കാക്കൽ",
      market: "📈 മണ്ടി വില",
      health: "🛰 ആരോഗ്യ സ്കോർ",
      insurance: "📉 ഇൻഷുറൻസ് റിസ്‌ക്",
      "digital-twin": "🧪 ഫാം സിമുലേഷൻ"
    }
  }
};

export function getFarmerCopy(language) {
  const code = normalizeLanguage(language);
  return mergeDeep(englishCopy, overrides[code]);
}
