import { cn } from "@/lib/utils";

export function VerifiedBadge({
  on,
  size = 14,
  className,
  title = "Verified",
}: {
  on?: boolean;
  size?: number;
  className?: string;
  title?: string;
}) {
  if (!on) return null;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      className={cn("inline-block shrink-0 text-pulse-check", className)}
      aria-label={title}
    >
      <path
        fill="currentColor"
        d="M8 1.2 9.7 2l1.9.3.9 1.7 1.7.9.3 1.9L16 8l-.5 1.7-.3 1.9-1.7.9-.9 1.7-1.9.3L8 14.8 6.3 14l-1.9-.3-.9-1.7-1.7-.9-.3-1.9L0 8l.5-1.7.3-1.9 1.7-.9.9-1.7 1.9-.3L8 1.2z"
      />
      <path
        fill="var(--color-bg)"
        d="M7.1 10.4 4.8 8.1l.9-.9 1.4 1.4 3.2-3.2.9.9-4.1 4.1z"
      />
    </svg>
  );
}
