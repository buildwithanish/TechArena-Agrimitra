export const supportedLanguages = [
  { code: "en", label: "English", nativeLabel: "English", speechCode: "en-IN" },
  { code: "hi", label: "Hindi", nativeLabel: "हिन्दी", speechCode: "hi-IN" },
  { code: "hinglish", label: "Hinglish", nativeLabel: "Hinglish", speechCode: "hi-IN" },
  { code: "mr", label: "Marathi", nativeLabel: "मराठी", speechCode: "mr-IN" },
  { code: "gu", label: "Gujarati", nativeLabel: "ગુજરાતી", speechCode: "gu-IN" },
  { code: "pa", label: "Punjabi", nativeLabel: "ਪੰਜਾਬੀ", speechCode: "pa-IN" },
  { code: "ta", label: "Tamil", nativeLabel: "தமிழ்", speechCode: "ta-IN" },
  { code: "te", label: "Telugu", nativeLabel: "తెలుగు", speechCode: "te-IN" },
  { code: "bn", label: "Bengali", nativeLabel: "বাংলা", speechCode: "bn-IN" },
  { code: "kn", label: "Kannada", nativeLabel: "ಕನ್ನಡ", speechCode: "kn-IN" },
  { code: "ml", label: "Malayalam", nativeLabel: "മലയാളം", speechCode: "ml-IN" }
];

export const supportedLanguageCodes = supportedLanguages.map((item) => item.code);

export function normalizeLanguage(language) {
  return supportedLanguageCodes.includes(language) ? language : "en";
}

export function getSpeechCode(language) {
  return supportedLanguages.find((item) => item.code === normalizeLanguage(language))?.speechCode || "en-IN";
}
