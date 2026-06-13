import { getSpeechCode } from "../config/languages.js";

export function getWeatherSnapshot(location = "Nashik, Maharashtra") {
  return {
    location,
    temperature: 28,
    humidity: 64,
    rainfallChance: 32,
    windSpeed: 12,
    condition: "Clouds with light wind",
    advisory: "Light irrigation is sufficient. Keep scouting for fungal pressure in humid pockets."
  };
}

export function deliverWhatsAppMessage(payload = {}) {
  return {
    delivered: true,
    threadId: `wa-${Date.now()}`,
    phone: payload.phone || "+91 9509868673",
    preview: payload.message || "WhatsApp advisory queued",
    status: "sent"
  };
}

export function generateVoiceAdvisory(payload = {}) {
  return {
    status: "generated",
    language: getSpeechCode(payload.language || "en"),
    transcript: payload.text || "Voice advisory synthesized successfully.",
    audioUrl: payload.audioUrl || null
  };
}

export function queueFirebaseNotification(payload = {}) {
  return {
    status: "queued",
    topic: payload.topic || "farmer-alerts",
    title: payload.title || "AI Village Brain Alert",
    message: payload.message || "Firebase notification queued."
  };
}
