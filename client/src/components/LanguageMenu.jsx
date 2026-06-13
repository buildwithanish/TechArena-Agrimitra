import { useState } from "react";
import { Check, ChevronDown, Languages, LoaderCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../contexts/AuthContext";
import { getLanguageMeta, supportedLanguages } from "../data/languages";

export default function LanguageMenu() {
  const { i18n } = useTranslation();
  const { user, updateProfile } = useAuth();
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const currentLanguage = getLanguageMeta(i18n.language);

  async function selectLanguage(language) {
    setOpen(false);
    setSaving(true);

    try {
      await i18n.changeLanguage(language.code);
      localStorage.setItem("ai-village-brain-language", language.code);

      if (user) {
        await updateProfile({ language: language.code });
      }
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="inline-flex items-center gap-2 rounded-2xl border border-white/40 bg-white/70 px-3 py-2 text-sm font-semibold text-slate-700 shadow-lg shadow-primary-950/5 backdrop-blur-xl transition hover:-translate-y-0.5 dark:border-white/10 dark:bg-white/5 dark:text-slate-100"
      >
        {saving ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Languages className="h-4 w-4" />}
        <span>{currentLanguage.flag}</span>
        <span>{currentLanguage.shortLabel}</span>
        <ChevronDown className={`h-4 w-4 transition ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute right-0 z-50 mt-3 w-64 overflow-hidden rounded-[24px] border border-slate-200 bg-white p-2 shadow-[0_24px_60px_rgba(2,6,23,0.16)] dark:border-white/10 dark:bg-slate-950">
          {supportedLanguages.map((language) => (
            <button
              key={language.code}
              type="button"
              onClick={() => selectLanguage(language)}
              className="flex w-full items-center justify-between rounded-2xl px-3 py-3 text-left text-sm transition hover:bg-primary-500/10"
            >
              <span className="flex items-center gap-3">
                <span className="text-base">{language.flag}</span>
                <span>
                  <span className="block font-semibold text-slate-900 dark:text-white">{language.label}</span>
                  <span className="block text-xs text-slate-500 dark:text-slate-400">{language.nativeLabel}</span>
                </span>
              </span>
              {language.code === currentLanguage.code && <Check className="h-4 w-4 text-primary-600" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
