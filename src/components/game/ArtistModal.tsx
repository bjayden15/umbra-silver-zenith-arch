import { X } from "lucide-react";
import { genreLabel } from "@/lib/game/catalog";
import { compact, money } from "@/lib/game/format";
import { isControlled } from "@/lib/game/sim";
import { useGame } from "@/lib/game/store";
import { ArtistAvatar } from "./ArtistAvatar";
import { VerifiedBadge } from "./VerifiedBadge";
import { GhostBtn, Meter, Pill, PrimaryBtn } from "./bits";

export function ArtistModal({ id }: { id: string }) {
  const game = useGame((s) => s.game)!;
  const setOverlay = useGame((s) => s.setOverlay);
  const setView = useGame((s) => s.setView);
  const startRecord = useGame((s) => s.startRecord);
  const a = game.artists.find((x) => x.id === id);
  if (!a) return null;
  const songs = game.songs.filter((s) => s.artistId === a.id);
  const mine = isControlled(game, a);

  return (
    <div className="fixed inset-0 z-40 grid place-items-end bg-bg/70 md:place-items-center md:p-6">
      <div className="max-h-[92dvh] w-full max-w-lg overflow-auto rounded-t-xl border border-border bg-surface p-5 md:rounded-xl">
        <div className="flex items-start justify-between gap-3">
          <div className="flex gap-3">
            <ArtistAvatar spec={a.avatar} size={56} />
            <div>
              <h2 className="flex items-center gap-1.5 font-display text-2xl">
                {a.name}
                <VerifiedBadge on={a.verified.x || a.verified.tiktok || a.verified.spotify} />
              </h2>
              <p className="text-sm text-muted">
                @{a.handle} · {genreLabel(a.genre)} · pop {Math.round(a.popularity)}
              </p>
            </div>
          </div>
          <button
            className="grid size-11 place-items-center rounded-md hover:bg-subtle"
            onClick={() => setOverlay({ type: "none" })}
            aria-label="Close"
          >
            <X className="size-5" />
          </button>
        </div>
        <p className="mt-3 text-sm text-muted">{a.bio}</p>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <Meter label="Vocals" value={a.stats.vocals} />
          <Meter label="Writing" value={a.stats.writing} />
          <Meter label="Charisma" value={a.stats.charisma} />
          <Meter label="Looks" value={a.stats.looks} />
          <Meter label="Work ethic" value={a.stats.workEthic} />
          <Meter label="Social instinct" value={a.stats.social} />
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
          <p className="flex items-center gap-1 text-muted">
            TikTok {compact(a.followers.tiktok)}
            <VerifiedBadge on={a.verified.tiktok} size={12} />
          </p>
          <p className="flex items-center gap-1 text-muted">
            X {compact(a.followers.x)}
            <VerifiedBadge on={a.verified.x} size={12} />
          </p>
          <p className="flex items-center gap-1 text-muted">
            Instagram {compact(a.followers.instagram)}
            <VerifiedBadge on={a.verified.instagram} size={12} />
          </p>
          <p className="flex items-center gap-1 text-muted">
            Spotify {compact(a.monthlyListeners)} /mo
            <VerifiedBadge on={a.verified.spotify} size={12} className="text-wave" />
          </p>
        </div>
        {mine && game.career === "label" && (
          <p className="mt-3 text-xs text-muted">
            Wage {money(a.wage)} · {Math.round(a.royalty * 100)}% artist share
          </p>
        )}
        {songs.length > 0 && (
          <ul className="mt-4 grid gap-1 text-sm">
            {songs.map((s) => {
              const guest = s.collabArtistId ? game.artists.find((x) => x.id === s.collabArtistId) : null;
              return (
                <li key={s.id} className="flex justify-between">
                  <span>
                    {s.title}
                    {guest ? <span className="text-muted"> feat. {guest.name}</span> : null}{" "}
                    <Pill className="ml-1">{s.status}</Pill>
                  </span>
                  <span className="tabular-nums text-muted">{compact(s.streams)}</span>
                </li>
              );
            })}
          </ul>
        )}
        {mine && (
          <div className="mt-5 flex flex-wrap gap-2">
            <PrimaryBtn onClick={() => startRecord(a.id)}>Book studio</PrimaryBtn>
            <GhostBtn onClick={() => setOverlay({ type: "wiki", artistId: a.id })}>Wiki</GhostBtn>
            <GhostBtn onClick={() => setOverlay({ type: "tiktok", tab: "create", artistId: a.id })}>
              TikTok
            </GhostBtn>
            <GhostBtn onClick={() => setOverlay({ type: "spotify", tab: "artist", artistId: a.id })}>
              Spotify
            </GhostBtn>
            <GhostBtn onClick={() => setOverlay({ type: "youtube", tab: "channel", artistId: a.id })}>
              YouTube
            </GhostBtn>
          </div>
        )}
        {!mine && (
          <div className="mt-5 flex flex-wrap gap-2">
            <PrimaryBtn onClick={() => setOverlay({ type: "x", tab: "messages", threadId: a.id })}>
              DM for a collab
            </PrimaryBtn>
            <GhostBtn onClick={() => setOverlay({ type: "youtube", tab: "channel", artistId: a.id })}>
              YouTube
            </GhostBtn>
            <GhostBtn onClick={() => setView("studio")}>Feature on a single</GhostBtn>
          </div>
        )}
      </div>
    </div>
  );
}
