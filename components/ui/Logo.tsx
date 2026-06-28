export function Logo({ className }: { className?: string }) {
  return (
    <a href="#home" className={className} aria-label="Home">
      <span className="font-heading text-xl font-bold tracking-tight text-foreground">
        MMA
      </span>
    </a>
  );
}
