import DashboardTooltip from "./DashboardTooltip";

const toneMap = {
  default:
    "from-white via-white to-primary-50/70 border-primary-100 dark:from-white/8 dark:via-white/6 dark:to-primary-500/10 dark:border-white/10",
  success:
    "from-primary-50 via-white to-emerald-50 border-primary-200 dark:from-primary-500/12 dark:via-white/6 dark:to-emerald-500/10 dark:border-white/10",
  accent:
    "from-accent-50 via-white to-primary-50 border-accent-100 dark:from-accent-500/12 dark:via-white/6 dark:to-primary-500/10 dark:border-white/10"
};

export default function DashboardStatCard({
  label,
  value,
  helper,
  delta,
  icon: Icon,
  tone = "default",
  tooltip
}) {
  return (
    <div
      className={`rounded-[28px] border bg-gradient-to-br p-5 shadow-panel ${toneMap[tone] || toneMap.default}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">{label}</p>
            <DashboardTooltip text={tooltip} />
          </div>
          <p className="mt-3 font-display text-4xl font-bold text-slate-950 dark:text-white">{value}</p>
        </div>
        {Icon && (
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-500/10 text-primary-700 dark:text-primary-200">
            <Icon className="h-5 w-5" />
          </div>
        )}
      </div>

      {(helper || delta) && (
        <div className="mt-4 flex flex-wrap items-center gap-2">
          {helper && (
            <span className="rounded-full bg-primary-500/10 px-3 py-1 text-xs font-semibold text-primary-700 dark:text-primary-200">
              {helper}
            </span>
          )}
          {delta && (
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 dark:bg-white/10 dark:text-slate-300">
              {delta}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
