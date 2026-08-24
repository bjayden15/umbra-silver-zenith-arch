import { useMemo, useState } from "react";
import { money } from "@/lib/game/format";
import { featureQuote, rosterOf } from "@/lib/game/sim";
import { useGame } from "@/lib/game/store";
import type { Song } from "@/lib/game/types";
import { cn } from "@/lib/utils";
import { ArtistAvatar } from "./ArtistAvatar";
import { GhostBtn, PrimaryBtn } from "./bits";

const TIER: Record<string, string> = {
  newcomer: "newcomer",
  rising: "rising",
  established: "established",
  star: "star",
  alist: "A-list",
  mega: "megastar",
};

export function FeaturePicker({
  song,
  tone = "light",
  autoFocus = false,
}: {
  song: Song;
  tone?: "light" | "dark";
  autoFocus?: boolean;
}) {
  const game = useGame((s) => s.game)!;
  const askFeature = useGame((s) => s.askFeature);
  const setOverlay = useGame((s) => s.setOverlay);
  const [q, setQ] = useState("");
  const guest = song.collabArtistId ? game.artists.find((a) => a.id === song.collabArtistId) : null;
  const host = game.artists.find((a) => a.id === song.artistId) ?? null;
  const dark = tone === "dark";
  const list = useMemo(() => {
    const n = q.trim().toLowerCase();
    return game.artists
      .filter((a) => a.id !== song.artistId)
      .filter((a) => !n || a.name.toLowerCase().includes(n) || a.handle.toLowerCase().includes(n))
      .slice()
      .sort((a, b) => b.popularity - a.popularity);
  }, [game.artists, q, song.artistId]);

  if (guest) {
    return (
      <div className={cn("flex items-center gap-3 rounded-lg px-2 py-2", dark ? "bg-white/5" : "bg-subtle")}>
        <ArtistAvatar spec={guest.avatar} size={40} />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium">feat. {guest.name}</p>
          <p className={cn("text-xs", dark ? "text-white/45" : "text-muted")}>
            Locked
            {song.featureFee ? ` · paid ${money(song.featureFee)}` : ""}
            {song.featureSplit ? ` · ${Math.round(song.featureSplit * 100)}% split` : ""}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-2">
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search any artist — Taylor, Drake, a prospect…"
        className={cn(
          "h-11 rounded-md border px-3 text-sm outline-none",
          dark
            ? "border-white/10 bg-white/5 text-white placeholder:text-white/35"
            : "border-border bg-surface focus:border-accent",
        )}
        autoFocus={autoFocus}
        aria-label="Search artists to feature"
      />
      <p className={cn("text-xs", dark ? "text-white/40" : "text-muted")}>
        A-list and megastar verses run $500k–$2M+ and will reject unproven acts. Chart first. Cash is not a shortcut.
      </p>
      <ul className="grid max-h-56 gap-1 overflow-auto">
        {list.slice(0, q.trim() ? 80 : 40).map((g) => {
          const quote = featureQuote(game, g, host);
          const canPay = game.cash >= quote.fee;
          return (
            <li key={g.id}>
              <button
                type="button"
                disabled={!quote.ok}
                className={cn(
                  "flex min-h-12 w-full items-center gap-3 rounded-md px-2 text-left text-sm disabled:opacity-45",
                  dark ? "hover:bg-white/10" : "hover:bg-subtle",
                )}
                onClick={() => quote.ok && askFeature(song.id, g.id)}
                title={quote.ok ? undefined : quote.reason}
              >
                <ArtistAvatar spec={g.avatar} size={36} />
                <span className="min-w-0 flex-1 truncate">
                  {g.name}
                  <span className={cn("text-xs", dark ? "text-white/40" : "text-muted")}>
                    {" "}
                    · {TIER[quote.tier] ?? quote.tier} · pop {Math.round(g.popularity)}
                  </span>
                  {!quote.ok ? (
                    <span className={cn("block truncate text-[11px]", dark ? "text-white/35" : "text-muted")}>{quote.reason}</span>
                  ) : null}
                </span>
                <span className={cn("shrink-0 text-right text-xs tabular-nums", dark ? "text-white/55" : "text-muted")}>
                  {quote.ok ? (canPay ? money(quote.fee) : `${Math.round(quote.split * 100)}% split`) : `won't · ${money(quote.fee)}`}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
      {list.length === 0 ? (
        <p className={cn("text-sm", dark ? "text-white/45" : "text-muted")}>No artists match that search.</p>
      ) : null}
      <GhostBtn
        className={dark ? "border-white/15 text-white" : undefined}
        onClick={() => setOverlay({ type: "x", tab: "messages" })}
      >
        Or DM them on X
      </GhostBtn>
    </div>
  );
}

export function FeatureDesk({ tone = "light" }: { tone?: "light" | "dark" }) {
  const game = useGame((s) => s.game)!;
  const roster = rosterOf(game);
  const mine = game.songs.filter((s) => roster.some((r) => r.id === s.artistId));
  const songs = mine.filter((s) => !s.collabArtistId);
  const [songId, setSongId] = useState(songs[0]?.id ?? "");
  const song = songs.find((s) => s.id === songId) ?? songs[0];
  const dark = tone === "dark";

  return (
    <div className="grid gap-3">
      {mine.length === 0 ? (
        <p className={cn("text-sm", dark ? "text-white/50" : "text-muted")}>
          Book a single below. This search stays at the top of Studio — tap anyone in the world and the verse locks.
        </p>
      ) : songs.length === 0 ? (
        <p className={cn("text-sm", dark ? "text-white/50" : "text-muted")}>
          Every record already has a featured artist. Book another single to add someone new.
        </p>
      ) : (
        <>
          {songs.length > 1 && (
            <label className={cn("block text-xs", dark ? "text-white/45" : "text-muted")}>
              Single
              <select
                className={cn(
                  "mt-1 h-11 w-full rounded-md border px-2 text-sm",
                  dark ? "border-white/10 bg-white/5 text-white" : "border-border bg-surface",
                )}
                value={song.id}
                onChange={(e) => setSongId(e.target.value)}
              >
                {songs.map((s) => (
                  <option key={s.id} value={s.id} className="text-black">
                    {s.title} · {s.status}
                  </option>
                ))}
              </select>
            </label>
          )}
          {song ? <FeaturePicker song={song} tone={tone} /> : null}
        </>
      )}
    </div>
  );
}

export function FeatureOfferRow({
  id,
  hopOn,
  hostName,
  guestName,
  title,
  fee,
}: {
  id: string;
  hopOn?: boolean;
  hostName: string;
  guestName: string;
  title: string;
  fee: number;
}) {
  const replyFeature = useGame((s) => s.replyFeature);
  return (
    <li className="flex flex-wrap items-center justify-between gap-2 rounded-lg bg-subtle px-3 py-2 text-sm">
      <span>
        {hopOn ? `${guestName} wants on “${title}”` : `${hostName} wants you on “${title}”`}
        <span className="text-muted"> · {money(fee)}</span>
      </span>
      <span className="flex gap-2">
        <GhostBtn onClick={() => replyFeature(id, false)}>Pass</GhostBtn>
        <PrimaryBtn onClick={() => replyFeature(id, true)}>{hopOn ? "Put them on it" : "Take the verse"}</PrimaryBtn>
      </span>
    </li>
  );
}
