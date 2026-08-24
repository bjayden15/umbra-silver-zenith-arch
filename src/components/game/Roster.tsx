import { genreLabel } from "@/lib/game/catalog";
import { compact } from "@/lib/game/format";
import { rosterOf } from "@/lib/game/sim";
import { useGame } from "@/lib/game/store";
import { ArtistAvatar } from "./ArtistAvatar";
import { VerifiedBadge } from "./VerifiedBadge";
import { GhostBtn, Meter, Panel, Pill, PrimaryBtn } from "./bits";

export function Roster() {
  const game = useGame((s) => s.game)!;
  const setOverlay = useGame((s) => s.setOverlay);
  const startRecord = useGame((s) => s.startRecord);
  const roster = rosterOf(game);

  return (
    <div className="mx-auto grid max-w-6xl gap-4 p-4 md:p-6">
      <div className="flex items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl tracking-tight">Roster</h1>
          <p className="text-sm text-muted">Micro-manage the people. The page manages the rest.</p>
        </div>
        <PrimaryBtn onClick={() => setOverlay({ type: "scout" })}>A&R / Scout</PrimaryBtn>
      </div>
      {roster.length === 0 ? (
        <Panel>
          <p className="text-sm text-muted">No one is signed. Scout the building.</p>
        </Panel>
      ) : (
        <div className="grid gap-3 md:grid-cols-2">
          {roster.map((a) => (
            <Panel key={a.id}>
              <div className="flex gap-3">
                <ArtistAvatar spec={a.avatar} size={56} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h2 className="flex items-center gap-1 truncate font-display text-xl">
                      {a.name}
                      <VerifiedBadge on={a.verified.x || a.verified.tiktok} />
                    </h2>
                    <Pill>{genreLabel(a.genre)}</Pill>
                  </div>
                  <p className="text-xs text-muted">
                    @{a.handle} · {a.hometown}
                  </p>
                </div>
              </div>
              <p className="mt-3 text-sm text-muted">{a.bio}</p>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <Meter label="Vocals" value={a.stats.vocals} />
                <Meter label="Writing" value={a.stats.writing} />
                <Meter label="Charisma" value={a.stats.charisma} />
                <Meter label="Social" value={a.stats.social} />
                <Meter label="Energy" value={a.energy} />
                <Meter label="Mood" value={a.mood} />
              </div>
              <div className="mt-4 flex flex-wrap gap-3 text-xs text-muted">
                <span>TikTok {compact(a.followers.tiktok)}</span>
                <span>X {compact(a.followers.x)}</span>
                <span>Instagram {compact(a.followers.instagram)}</span>
                <span>Spotify {compact(a.monthlyListeners)} mo</span>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <PrimaryBtn onClick={() => startRecord(a.id)}>Book studio</PrimaryBtn>
                <GhostBtn onClick={() => setOverlay({ type: "tiktok", tab: "create", artistId: a.id })}>
                  Post TikTok
                </GhostBtn>
                <GhostBtn onClick={() => setOverlay({ type: "artist", id: a.id })}>File</GhostBtn>
              </div>
            </Panel>
          ))}
        </div>
      )}
    </div>
  );
}
