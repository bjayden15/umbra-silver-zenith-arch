import type { GenreId, TikTokClip } from "@/lib/game/types";
import { cn } from "@/lib/utils";
import { ArtistAvatar } from "./ArtistAvatar";

const WASH: Record<GenreId, string> = {
  pop: "from-[#2a2430] via-[#1a1a22] to-black",
  hiphop: "from-[#1c1814] via-[#12110f] to-black",
  rnb: "from-[#241820] via-[#140f12] to-black",
  rock: "from-[#1a1c20] via-[#101114] to-black",
  indie: "from-[#1a221c] via-[#101410] to-black",
  electronic: "from-[#101820] via-[#0c1016] to-black",
  latin: "from-[#241c14] via-[#14100c] to-black",
  altpop: "from-[#1c2224] via-[#101416] to-black",
  country: "from-[#221c14] via-[#14110c] to-black",
  drill: "from-[#141416] via-[#0c0c0e] to-black",
  afrobeats: "from-[#1c1810] via-[#14100c] to-black",
};

export function ClipVisual({
  clip,
  genre,
  playing,
  title,
}: {
  clip: TikTokClip;
  genre: GenreId;
  playing: boolean;
  title: string;
}) {
  const bars = 12;
  return (
    <div
      className={cn(
        "clip-visual absolute inset-0 bg-linear-to-b",
        WASH[genre],
        !playing && "is-paused",
      )}
    >
      <div
        className="absolute -top-10 left-1/2 size-72 -translate-x-1/2 rounded-full opacity-30 blur-3xl"
        style={{ background: "var(--color-accent)" }}
      />
      <div className="absolute inset-x-0 top-[30%] flex flex-col items-center gap-4">
        <ArtistAvatar spec={clip.avatar} size={96} className="ring-2 ring-white/20" />
        <p className="max-w-[14rem] text-center font-display text-2xl leading-tight text-white">
          {title}
        </p>
      </div>
      <div className="bars">
        {Array.from({ length: bars }).map((_, i) => (
          <span
            key={i}
            style={{
              height: `${40 + ((clip.visual + i * 17) % 60)}%`,
              animationDelay: `${(i * 0.07) % 0.6}s`,
              opacity: 0.45 + (i % 3) * 0.15,
            }}
          />
        ))}
      </div>
    </div>
  );
}
