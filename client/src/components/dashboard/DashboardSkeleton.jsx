export default function DashboardSkeleton({ cards = 4, panels = 0, className = "" }) {
  return (
    <div className={`space-y-4 ${className}`}>
      {cards > 0 && (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: cards }).map((_, index) => (
            <div
              key={`card-${index}`}
              className="h-36 animate-pulse rounded-[28px] border border-primary-100 bg-white/90 shadow-panel dark:border-white/10 dark:bg-white/5"
            />
          ))}
        </div>
      )}

      {panels > 0 && (
        <div className="grid gap-4 xl:grid-cols-2">
          {Array.from({ length: panels }).map((_, index) => (
            <div
              key={`panel-${index}`}
              className="h-80 animate-pulse rounded-[32px] border border-primary-100 bg-white/90 shadow-panel dark:border-white/10 dark:bg-white/5"
            />
          ))}
        </div>
      )}
    </div>
  );
}
