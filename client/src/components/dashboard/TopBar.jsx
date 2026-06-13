import { Bell, Menu, Search, Sparkles } from "lucide-react";
import ThemeToggle from "../ThemeToggle";
import LanguageMenu from "../LanguageMenu";
import VoiceInputButton from "../VoiceInputButton";

export default function TopBar({
  title,
  subtitle,
  onVoiceInput,
  voiceQuery,
  notificationCount = 0,
  onMenuClick,
  badge = "Live workspace",
  searchPlaceholder = "Try: market trend for tomato"
}) {
  return (
    <div className="sticky top-3 z-30 rounded-[30px] border border-primary-100/90 bg-white/88 p-4 shadow-panel backdrop-blur-xl dark:border-white/10 dark:bg-primary-950/80 lg:top-6 lg:p-5">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex items-start gap-3">
          <button
            type="button"
            onClick={onMenuClick}
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-primary-100 bg-primary-50 text-primary-700 xl:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-primary-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-primary-700 dark:text-primary-300">
            <Sparkles className="h-3.5 w-3.5" />
            {badge}
            </p>
            <h1 className="mt-3 font-display text-3xl font-bold text-slate-950 dark:text-white">{title}</h1>
            <p className="mt-1 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300">{subtitle}</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex min-w-[240px] flex-1 items-center gap-3 rounded-2xl border border-slate-200/80 bg-slate-50 px-4 py-3 text-sm text-slate-500 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 xl:min-w-[360px]">
            <Search className="h-4 w-4 text-primary-600" />
            <span className="truncate">{voiceQuery || searchPlaceholder}</span>
          </div>
          <VoiceInputButton compact onTranscript={onVoiceInput} />
          <LanguageMenu />
          <ThemeToggle />
          <div className="relative inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200/80 bg-slate-50 text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-white">
            <Bell className="h-4 w-4" />
            <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-accent-500 px-1 text-[10px] font-bold text-slate-950">
              {notificationCount}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
