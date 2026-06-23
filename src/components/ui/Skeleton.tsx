export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={`animate-pulse-soft rounded-2xl bg-stone-200 ${className ?? ''}`}
      aria-hidden="true"
    />
  )
}

export function WorkspaceSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <Skeleton className="h-72" />
        <Skeleton className="h-72" />
      </div>
      <Skeleton className="h-48" />
    </div>
  )
}
