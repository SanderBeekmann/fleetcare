export function LoadingSkeleton() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6">
      <div className="w-full max-w-2xl space-y-6">
        <div className="h-8 w-3/4 animate-pulse rounded bg-neutral-200" />
        <div className="h-4 w-full animate-pulse rounded bg-neutral-200" />
        <div className="h-4 w-5/6 animate-pulse rounded bg-neutral-200" />
        <div className="h-4 w-2/3 animate-pulse rounded bg-neutral-200" />
        <div className="mt-8 h-10 w-40 animate-pulse rounded bg-neutral-200" />
      </div>
    </div>
  );
}
