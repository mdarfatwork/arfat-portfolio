export function ContactFormSkeleton() {
  return (
    <div
      className="rounded-2xl border border-border bg-card p-6 md:p-8"
      aria-hidden="true"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <div className="h-4 w-12 rounded bg-muted" />
          <div className="h-12 rounded-xl bg-muted" />
        </div>
        <div className="space-y-2">
          <div className="h-4 w-12 rounded bg-muted" />
          <div className="h-12 rounded-xl bg-muted" />
        </div>
      </div>
      <div className="mt-5 space-y-2">
        <div className="h-4 w-14 rounded bg-muted" />
        <div className="h-12 rounded-xl bg-muted" />
      </div>
      <div className="mt-5 space-y-2">
        <div className="h-4 w-16 rounded bg-muted" />
        <div className="h-[8.75rem] rounded-xl bg-muted" />
      </div>
      <div className="mt-6 h-12 w-40 rounded-full bg-muted" />
    </div>
  );
}
