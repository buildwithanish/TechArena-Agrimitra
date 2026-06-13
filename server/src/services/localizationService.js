import { normalizeLanguage } from "../config/languages.js";

const sharedPhraseBook = {
  "Clouds with light wind": "हल्के हवा के साथ बादल",
  "Light irrigation is sufficient. Keep scouting for fungal pressure in humid pockets.":
    "हल्की सिंचाई पर्याप्त है। नमी वाले हिस्सों में फफूंद के दबाव पर नज़र रखें।",
  "AI Village Brain suggests a balanced crop mix led by profitability and field suitability.":
    "AI Village Brain लाभ और खेत की उपयुक्तता के आधार पर संतुलित फसल मिश्रण सुझाता है।",
  "Stable fit for current soil profile and high seasonal demand.": "मौजूदा मिट्टी और मौसमी मांग के लिए अच्छा विकल्प।",
  "Offers strong margin potential with moderate input cost.": "मध्यम लागत के साथ अच्छा मुनाफा देने की संभावना।",
  "Adds resilience and market diversification to the planting plan.": "बुआई योजना में स्थिरता और बाजार विविधता जोड़ता है।",
  "Add seaweed-based foliar spray at tillering stage": "टिलरिंग चरण में seaweed-based foliar spray दें",
  "Optimization reduces excess urea and improves nutrient balance for stronger root development.":
    "यह योजना अतिरिक्त यूरिया कम करके जड़ों की वृद्धि के लिए पोषक संतुलन बेहतर करती है।",
  "Scout affected blocks, improve airflow, and evaluate fungicide intervention.":
    "प्रभावित हिस्सों की जांच करें, हवा का प्रवाह बेहतर करें और fungicide intervention पर विचार करें।",
  "Inspect under-leaf clusters and apply targeted biocontrol if threshold increases.":
    "पत्तियों के नीचे के हिस्सों की जांच करें और जोखिम बढ़ने पर targeted biocontrol करें।",
  "Satellite-style health scoring suggests localized stress rather than whole-field decline.":
    "सैटेलाइट स्कोर बताता है कि तनाव पूरे खेत में नहीं बल्कि कुछ हिस्सों में है।",
  "Expect higher premium loading": "प्रीमियम थोड़ा अधिक हो सकता है",
  "Standard premium band expected": "सामान्य प्रीमियम की उम्मीद है",
  "Combine weather alerts and pest surveillance logs to strengthen claim readiness.":
    "क्लेम तैयारी मजबूत करने के लिए मौसम अलर्ट और कीट रिकॉर्ड साथ रखें।",
  "Delayed irrigation and nutrient adjustment": "सिंचाई और पोषक समायोजन में देरी",
  "Advance the next irrigation cycle by 24 hours": "अगली सिंचाई 24 घंटे पहले करें",
  "Add foliar micronutrients during evening window": "शाम के समय foliar micronutrients दें",
  "Monitor moisture sensor variance every 6 hours": "हर 6 घंटे में moisture sensor की जाँच करें",
  "High suitability for current field profile, stable price trend, and manageable input load.":
    "मौजूदा खेत प्रोफाइल, स्थिर कीमत और संभालने योग्य लागत के लिए अच्छा मेल।",
  "Improves profit resilience and works well with current moisture and market conditions.":
    "मुनाफे की स्थिरता बढ़ाता है और मौजूदा नमी व बाजार स्थिति के साथ अच्छा काम करता है.",
  moderate: "मध्यम",
  low: "कम",
  Healthy: "स्वस्थ",
  Watchlist: "नज़र रखें",
  "At risk": "जोखिम",
  Uptrend: "ऊपर की चाल",
  Softening: "धीमा पड़ रहा है",
  Elevated: "ज्यादा",
  Low: "कम",
  ready: "तैयार",
  queued: "कतार में",
  generated: "तैयार",
  sent: "भेजा गया",
  live: "लाइव",
  Strong: "मजबूत",
  Good: "अच्छा",
  Improving: "सुधर रहा है",
  Conservative: "सावधानी वाला",
  Base: "आधार",
  Upside: "बेहतर संभावना",
  "Sell in 3-5 days": "3-5 दिन में बेचें",
  "Hold and reassess after next mandi cycle": "अगले मंडी चक्र के बाद फिर देखें",
  "North-east boundary": "उत्तर-पूर्व किनारा",
  "Low-lying corner near canal": "नहर के पास नीचा हिस्सा"
};

const phraseBooks = {
  hi: sharedPhraseBook,
  hinglish: {
    ...sharedPhraseBook,
    "Clouds with light wind": "Halki hawa ke saath badal",
    "Light irrigation is sufficient. Keep scouting for fungal pressure in humid pockets.":
      "Halki irrigation kaafi hai. Nami wale hisson me fungal pressure check karte raho.",
    "AI Village Brain suggests a balanced crop mix led by profitability and field suitability.":
      "AI Village Brain profit aur field fit ke hisaab se balanced crop mix suggest karta hai."
  },
  mr: {
    "Clouds with light wind": "हलकी हवा आणि ढग",
    "Light irrigation is sufficient. Keep scouting for fungal pressure in humid pockets.":
      "हलकी सिंचन पुरेसे आहे. ओलसर भागात बुरशीचा दबाव तपासत राहा.",
    "AI Village Brain suggests a balanced crop mix led by profitability and field suitability.":
      "AI Village Brain नफा आणि शेताच्या योग्यतेनुसार संतुलित पिक मिश्रण सुचवते.",
    "Stable fit for current soil profile and high seasonal demand.": "सध्याच्या माती आणि मागणीसाठी योग्य.",
    "Offers strong margin potential with moderate input cost.": "मध्यम खर्चात चांगला नफा देऊ शकते.",
    "Adds resilience and market diversification to the planting plan.": "लागवड योजनेत स्थिरता आणि बाजार विविधता वाढवते."
  },
  gu: {
    "Clouds with light wind": "હળવા પવન સાથે વાદળ",
    "Light irrigation is sufficient. Keep scouting for fungal pressure in humid pockets.":
      "હળવું સિંચાઈ પૂરતું છે. ભેજવાળા ભાગોમાં ફૂગના દબાણ પર નજર રાખો.",
    "AI Village Brain suggests a balanced crop mix led by profitability and field suitability.":
      "AI Village Brain નફા અને ખેતરની યોગ્યતા પ્રમાણે સંતુલિત પાક મિશ્રણ સૂચવે છે.",
    "Stable fit for current soil profile and high seasonal demand.": "હાલની જમીન અને માંગ માટે યોગ્ય.",
    "Offers strong margin potential with moderate input cost.": "મધ્યમ ખર્ચ સાથે સારું નફો આપી શકે છે.",
    "Adds resilience and market diversification to the planting plan.": "યોજનામાં સ્થિરતા અને બજાર વૈવિધ્ય ઉમેરે છે."
  },
  pa: {
    "Clouds with light wind": "ਹੌਲੀ ਹਵਾ ਨਾਲ ਬੱਦਲ",
    "Light irrigation is sufficient. Keep scouting for fungal pressure in humid pockets.":
      "ਹੌਲੀ ਸਿੰਚਾਈ ਕਾਫ਼ੀ ਹੈ। ਨਮੀ ਵਾਲੇ ਹਿੱਸਿਆਂ ਵਿੱਚ ਫੰਗਸ ਦਬਾਅ ਵੇਖਦੇ ਰਹੋ।",
    "AI Village Brain suggests a balanced crop mix led by profitability and field suitability.":
      "AI Village Brain ਮੁਨਾਫੇ ਅਤੇ ਖੇਤ ਦੀ ਯੋਗਤਾ ਦੇ ਆਧਾਰ 'ਤੇ ਸੰਤੁਲਿਤ ਫਸਲ ਮਿਸ਼ਰਣ ਸੁਝਾਉਂਦਾ ਹੈ।",
    "Stable fit for current soil profile and high seasonal demand.": "ਮੌਜੂਦਾ ਮਿੱਟੀ ਅਤੇ ਮੰਗ ਲਈ ਠੀਕ।",
    "Offers strong margin potential with moderate input cost.": "ਮੱਧਮ ਖਰਚ ਨਾਲ ਵਧੀਆ ਮੁਨਾਫ਼ਾ ਦੇ ਸਕਦਾ ਹੈ.",
    "Adds resilience and market diversification to the planting plan.": "ਯੋਜਨਾ ਵਿੱਚ ਸਥਿਰਤਾ ਅਤੇ ਬਾਜ਼ਾਰ ਵੱਖਰੇਪਣ ਨੂੰ ਵਧਾਉਂਦਾ ਹੈ."
  },
  ta: {
    "Clouds with light wind": "லேசான காற்றுடன் மேகங்கள்",
    "Light irrigation is sufficient. Keep scouting for fungal pressure in humid pockets.":
      "லேசான பாசனம் போதுமானது. ஈரமான பகுதிகளில் பூஞ்சை அழுத்தத்தை கவனிக்கவும்.",
    "AI Village Brain suggests a balanced crop mix led by profitability and field suitability.":
      "AI Village Brain லாபம் மற்றும் வயல் பொருத்தத்தை அடிப்படையாக வைத்து சமநிலை பயிர் கலவையை பரிந்துரைக்கிறது.",
    "Stable fit for current soil profile and high seasonal demand.": "தற்போதைய மண் மற்றும் தேவைக்கு நல்ல பொருத்தம்.",
    "Offers strong margin potential with moderate input cost.": "மிதமான செலவில் நல்ல லாப வாய்ப்பு.",
    "Adds resilience and market diversification to the planting plan.": "நிலைத்தன்மை மற்றும் சந்தை பல்வகைபாட்டை சேர்க்கிறது."
  },
  te: {
    "Clouds with light wind": "తేలికపాటి గాలితో మేఘాలు",
    "Light irrigation is sufficient. Keep scouting for fungal pressure in humid pockets.":
      "తేలికపాటి నీరుపోశణ సరిపోతుంది. తేమ ఎక్కువగా ఉన్న చోట్ల ఫంగల్ ఒత్తిడిని గమనించండి.",
    "AI Village Brain suggests a balanced crop mix led by profitability and field suitability.":
      "AI Village Brain లాభం మరియు పొలానికి సరిపడే విధంగా సమతుల్య పంట మిశ్రమాన్ని సూచిస్తుంది.",
    "Stable fit for current soil profile and high seasonal demand.": "ప్రస్తుత మట్టి మరియు డిమాండ్‌కు సరైనది.",
    "Offers strong margin potential with moderate input cost.": "మధ్యస్థ ఖర్చుతో మంచి లాభం ఇవ్వగలదు.",
    "Adds resilience and market diversification to the planting plan.": "ప్లాంటింగ్ ప్లాన్‌కి స్థిరత్వం మరియు మార్కెట్ వైవిధ్యం జోడిస్తుంది."
  },
  bn: {
    "Clouds with light wind": "হালকা হাওয়ার সাথে মেঘ",
    "Light irrigation is sufficient. Keep scouting for fungal pressure in humid pockets.":
      "হালকা সেচ যথেষ্ট। আর্দ্র অংশে ছত্রাকের চাপ নজরে রাখুন।",
    "AI Village Brain suggests a balanced crop mix led by profitability and field suitability.":
      "AI Village Brain লাভ এবং জমির উপযোগিতা দেখে ভারসাম্যপূর্ণ ফসলের মিশ্রণ সাজেস্ট করে।",
    "Stable fit for current soil profile and high seasonal demand.": "বর্তমান মাটি ও চাহিদার জন্য ভালো মানানসই।",
    "Offers strong margin potential with moderate input cost.": "মাঝারি খরচে ভালো লাভের সুযোগ।",
    "Adds resilience and market diversification to the planting plan.": "প্ল্যানিং-এ স্থিতিশীলতা ও বাজার বৈচিত্র্য যোগ করে।"
  },
  kn: {
    "Clouds with light wind": "ಸೌಮ್ಯ ಗಾಳಿಯೊಡನೆ ಮೋಡಗಳು",
    "Light irrigation is sufficient. Keep scouting for fungal pressure in humid pockets.":
      "ಹಗುರ ನೀರಾವರಿ ಸಾಕು. ತೇವವಿರುವ ಭಾಗಗಳಲ್ಲಿ ಫಂಗಸ್ ಒತ್ತಡ ಗಮನಿಸಿ.",
    "AI Village Brain suggests a balanced crop mix led by profitability and field suitability.":
      "AI Village Brain ಲಾಭ ಮತ್ತು ಹೊಲದ ಹೊಂದಾಣಿಕೆಯನ್ನು ನೋಡಿ ಸಮತೂಲಿತ ಬೆಳೆ ಮಿಶ್ರಣವನ್ನು ಸೂಚಿಸುತ್ತದೆ.",
    "Stable fit for current soil profile and high seasonal demand.": "ಈಗಿನ ಮಣ್ಣು ಮತ್ತು ಬೇಡಿಕೆಗೆ ಸರಿಯಾದ ಹೊಂದಾಣಿಕೆ.",
    "Offers strong margin potential with moderate input cost.": "ಮಧ್ಯಮ ವೆಚ್ಚದಲ್ಲಿ ಉತ್ತಮ ಲಾಭ ಸಾಧ್ಯತೆ.",
    "Adds resilience and market diversification to the planting plan.": "ಯೋಜನೆಯಲ್ಲಿ ಸ್ಥಿರತೆ ಮತ್ತು ಮಾರುಕಟ್ಟೆ ವೈವಿಧ್ಯತೆ ಸೇರಿಸುತ್ತದೆ."
  },
  ml: {
    "Clouds with light wind": "ലഘുവായ കാറ്റോടുകൂടിയ മേഘങ്ങൾ",
    "Light irrigation is sufficient. Keep scouting for fungal pressure in humid pockets.":
      "ലഘുവായ ജലസേചനം മതി. ഈർപ്പം കൂടിയ ഭാഗങ്ങളിൽ ഫംഗസ് സമ്മർദ്ദം ശ്രദ്ധിക്കുക.",
    "AI Village Brain suggests a balanced crop mix led by profitability and field suitability.":
      "ലാഭവും വയൽ അനുയോജ്യതയും പരിഗണിച്ച് സമതുലിതമായ വിളമിശ്രണം AI Village Brain നിർദ്ദേശിക്കുന്നു.",
    "Stable fit for current soil profile and high seasonal demand.": "ഇപ്പോഴത്തെ മണ്ണിനും സീസണൽ ആവശ്യത്തിനും നല്ല പൊരുത്തം.",
    "Offers strong margin potential with moderate input cost.": "മിതമായ ചെലവിൽ നല്ല ലാഭസാധ്യത നൽകുന്നു.",
    "Adds resilience and market diversification to the planting plan.": "നടീൽ പദ്ധതിയിൽ സ്ഥിരതയും വിപണി വൈവിധ്യവും കൂട്ടുന്നു.",
    "Add seaweed-based foliar spray at tillering stage": "ടില്ലറിംഗ് ഘട്ടത്തിൽ seaweed അടിസ്ഥാന foliar spray ചേർക്കുക",
    "Optimization reduces excess urea and improves nutrient balance for stronger root development.":
      "ഈ പദ്ധതി അധിക യൂറിയ കുറച്ച് വേരുകളുടെ വളർച്ചയ്ക്ക് പോഷക സമതുലിതാവസ്ഥ മെച്ചപ്പെടുത്തുന്നു."
  }
};

export function translateText(text, language) {
  const code = normalizeLanguage(language);

  if (code === "en" || typeof text !== "string") {
    return text;
  }

  return phraseBooks[code]?.[text] || phraseBooks.hinglish?.[text] || phraseBooks.hi?.[text] || text;
}

export function localizeValue(value, language) {
  if (typeof value === "string") {
    return translateText(value, language);
  }

  if (Array.isArray(value)) {
    return value.map((item) => localizeValue(item, language));
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, nestedValue]) => [key, localizeValue(nestedValue, language)])
    );
  }

  return value;
}
