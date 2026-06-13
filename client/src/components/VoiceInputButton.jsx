import { Mic, MicOff } from "lucide-react";
import { getLanguageMeta } from "../data/languages";

export default function VoiceInputButton({ onTranscript, compact = false, label = "Voice input" }) {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  function startVoiceInput() {
    if (!SpeechRecognition) {
      onTranscript?.("Voice recognition not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = getLanguageMeta(localStorage.getItem("ai-village-brain-language")).speechCode;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.start();
    recognition.onresult = (event) => {
      onTranscript?.(event.results[0][0].transcript);
    };
  }

  return (
    <button
      type="button"
      onClick={startVoiceInput}
      className={`inline-flex items-center gap-2 rounded-2xl border border-primary-500/20 bg-primary-500/10 font-semibold text-primary-700 transition hover:-translate-y-0.5 hover:bg-primary-500/15 dark:text-primary-200 ${
        compact ? "px-3 py-2 text-sm" : "px-4 py-3 text-sm"
      }`}
    >
      {SpeechRecognition ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
      {label}
    </button>
  );
}
