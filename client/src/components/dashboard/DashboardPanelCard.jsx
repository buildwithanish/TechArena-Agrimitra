import DashboardTooltip from "./DashboardTooltip";

export default function DashboardPanelCard({
  id,
  title,
  subtitle,
  icon: Icon,
  action,
  tooltip,
  className = "",
  children
}) {
  return (
    <section
      id={id}
      className={`scroll-mt-24 rounded-[32px] border border-primary-100/90 bg-white/90 p-5 shadow-panel backdrop-blur-xl dark:border-white/10 dark:bg-white/5 ${className}`}
    >
      {(title || subtitle || Icon || action) && (
        <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            {Icon && (
              <div className="mt-0.5 flex h-11 w-11 items-center justify-center rounded-2xl bg-primary-50 text-primary-700 dark:bg-primary-500/10 dark:text-primary-200">
                <Icon className="h-5 w-5" />
              </div>
            )}
            <div>
              {title && (
                <div className="flex items-center gap-2">
                  <h3 className="font-display text-2xl font-bold text-slate-950 dark:text-white">{title}</h3>
                  <DashboardTooltip text={tooltip} />
                </div>
              )}
              {subtitle && <p className="mt-1 text-sm leading-7 text-slate-500 dark:text-slate-400">{subtitle}</p>}
            </div>
          </div>
          {action}
        </div>
      )}
      {children}
    </section>
  );
}
