export default function DashboardSidebarSection({
  title,
  items,
  activeSection,
  onItemClick
}) {
  return (
    <div className="space-y-2">
      <p className="px-3 text-[11px] font-bold uppercase tracking-[0.22em] text-primary-100/45">
        {title}
      </p>
      <div className="space-y-1">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = (item.matchIds || []).includes(activeSection);

          return (
            <a
              key={item.key}
              href={item.href}
              onClick={() => onItemClick?.(item)}
              className={`group flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-semibold transition ${
                isActive
                  ? "bg-white text-primary-900 shadow-sm"
                  : "text-primary-50/78 hover:bg-white/8 hover:text-white"
              }`}
            >
              <span
                className={`flex h-9 w-9 items-center justify-center rounded-2xl transition ${
                  isActive ? "bg-primary-100 text-primary-800" : "bg-white/6 text-primary-100/80"
                }`}
              >
                <Icon className="h-4 w-4" />
              </span>
              <span className="truncate">{item.label}</span>
            </a>
          );
        })}
      </div>
    </div>
  );
}
