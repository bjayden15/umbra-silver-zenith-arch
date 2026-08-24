import type { AvatarSpec } from "@/lib/game/types";
import { cn } from "@/lib/utils";

const SKIN = ["#f3d7c4", "#e8c3a4", "#d4a574", "#b07a4a", "#8a5a32", "#5c3a22"];
const HAIR_C = ["#1c1c1e", "#3a2418", "#6b3b16", "#d8c6a2", "#2a2f38", "#8fd4c1"];
const ACCENT = ["#8fd4c1", "#f3efe6", "#c9b8a6", "#7aa0b8", "#d4a59a", "#b8c4b0"];

export function ArtistAvatar({
  spec,
  size = 40,
  className,
}: {
  spec: AvatarSpec;
  size?: number;
  className?: string;
}) {
  if (spec.photo?.src) {
    return (
      <img
        src={spec.photo.src}
        alt=""
        width={size}
        height={size}
        className={cn("shrink-0 rounded-full object-cover", className)}
        style={{ width: size, height: size }}
      />
    );
  }
  const skin = SKIN[spec.skin % SKIN.length]!;
  const hair = HAIR_C[spec.hairColor % HAIR_C.length]!;
  const acc = ACCENT[spec.accent % ACCENT.length]!;
  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      className={cn("shrink-0 rounded-full", className)}
      aria-hidden
    >
      <rect width="64" height="64" rx="32" fill="#1a1a1c" />
      <ellipse cx="32" cy="40" rx={18 + (spec.shape % 4)} ry="20" fill={skin} />
      {spec.hair % 7 === 0 && <path d="M14 30c2-16 34-18 36 0v6H14z" fill={hair} />}
      {spec.hair % 7 === 1 && (
        <path d="M16 34c0-16 32-18 32 2 0 0-8-10-16-10s-16 10-16 10z" fill={hair} />
      )}
      {spec.hair % 7 === 2 && <rect x="18" y="16" width="28" height="18" rx="8" fill={hair} />}
      {spec.hair % 7 === 3 && <path d="M12 36c4-20 36-22 40 0-8-8-32-8-40 0z" fill={hair} />}
      {spec.hair % 7 === 4 && (
        <>
          <circle cx="20" cy="22" r="7" fill={hair} />
          <circle cx="44" cy="22" r="7" fill={hair} />
          <path d="M16 30c4-12 28-12 32 0v4H16z" fill={hair} />
        </>
      )}
      {spec.hair % 7 === 5 && <path d="M18 22h28v14H18z" fill={hair} />}
      {spec.hair % 7 === 6 && <circle cx="32" cy="24" r="12" fill={hair} />}
      <circle cx="24" cy="38" r="1.6" fill="#1a1a1c" />
      <circle cx="40" cy="38" r="1.6" fill="#1a1a1c" />
      <path
        d="M28 46c2 2 6 2 8 0"
        fill="none"
        stroke="#1a1a1c"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      {spec.accessory % 5 === 1 && (
        <rect x="16" y="36" width="32" height="3" rx="1" fill={acc} opacity="0.85" />
      )}
      {spec.accessory % 5 === 2 && <circle cx="32" cy="20" r="3" fill={acc} />}
      {spec.accessory % 5 === 3 && (
        <path d="M22 50c6 6 14 6 20 0" fill="none" stroke={acc} strokeWidth="2" />
      )}
      <circle cx="32" cy="32" r="31" fill="none" stroke={acc} strokeWidth="1.2" opacity="0.35" />
    </svg>
  );
}
