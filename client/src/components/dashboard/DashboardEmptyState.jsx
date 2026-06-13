import { DatabaseZap } from "lucide-react";

export default function DashboardEmptyState({
  icon: Icon = DatabaseZap,
  title = "No data available",
  description = "Add data to see this section update."
}) {
  return (
    <div className="flex min-h-[220px] flex-col items-center justify-center rounded-[28px] border border-dashed border-primary-200 bg-primary-50/70 px-6 py-10 text-center dark:border-white/10 dark:bg-white/5">
      <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-white text-primary-700 shadow-sm dark:bg-primary-500/10 dark:text-primary-200">
        <Icon className="h-7 w-7" />
      </div>
      <h4 className="mt-5 text-lg font-bold text-slate-900 dark:text-white">{title}</h4>
      <p className="mt-2 max-w-md text-sm leading-7 text-slate-500 dark:text-slate-400">{description}</p>
    </div>
  );
}
