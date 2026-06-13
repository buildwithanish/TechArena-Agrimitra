import { Info } from "lucide-react";

export default function DashboardTooltip({ text, className = "" }) {
  if (!text) {
    return null;
  }

  return (
    <span className={`group relative inline-flex ${className}`} title={text}>
      <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition group-hover:border-primary-300 group-hover:text-primary-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:group-hover:border-primary-400/40 dark:group-hover:text-primary-200">
        <Info className="h-3.5 w-3.5" />
      </span>
      <span className="pointer-events-none absolute left-1/2 top-full z-10 mt-2 hidden w-52 -translate-x-1/2 rounded-2xl bg-slate-950 px-3 py-2 text-xs font-medium leading-5 text-white shadow-lg group-hover:block dark:bg-slate-900">
        {text}
      </span>
    </span>
  );
}
