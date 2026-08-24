import { X } from "lucide-react";
import { genreLabel } from "@/lib/game/catalog";
import { compact, money } from "@/lib/game/format";
import { signCost, unsignedProspects } from "@/lib/game/sim";
import { useGame } from "@/lib/game/store";
import { ArtistAvatar } from "./ArtistAvatar";
import { GhostBtn, Meter, Pill, PrimaryBtn } from "./bits";

export function Scout() {
  const game = useGame((s) => s.game)!;
  const setOverlay = useGame((s) => s.setOverlay);
  const sign = useGame((s) => s.sign);
  const scout = useGame((s) => s.scout);
  const prospects = unsignedProspects(game).slice(0, 12);

  return (
    <div className="fixed inset-0 z-40 grid place-items-end bg-bg/70 p-0 md:place-items-center md:p-6">
      <div className="flex max-h-[92dvh] w-full max-w-3xl flex-col rounded-t-xl border border-border bg-surface md:rounded-xl">
        <header className="flex items-center justify-between gap-3 border-b border-border px-4 py-3">
          <div>
            <h2 className="font-display text-xl">A&R</h2>
            <p className="text-xs text-muted">Stats you can see. Potential you can miss.</p>
          </div>
          <div className="flex gap-2">
            <GhostBtn onClick={scout}>Refresh · {money(2500)}</GhostBtn>
            <button
              className="grid size-11 place-items-center rounded-md hover:bg-subtle"
              onClick={() => setOverlay({ type: "none" })}
              aria-label="Close"
            >
              <X className="size-5" />
            </button>
          </div>
        </header>
        <div className="overflow-auto p-4">
          {game.pendingAudition && (
            <div className="mb-4 rounded-xl border border-border bg-elevated p-3">
              <p className="text-sm font-medium">Audition room</p>
              <p className="text-xs text-muted">Pick one. The others go home.</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {game.pendingAudition.names.map((n) => (
                  <PrimaryBtn key={n} onClick={() => useGame.getState().pickFromAudition(n)}>
                    {n}
                  </PrimaryBtn>
                ))}
              </div>
            </div>
          )}
          <div className="mb-3">
            <GhostBtn onClick={() => useGame.getState().audition()}>Book auditions · $3,500</GhostBtn>
          </div>
          <ul className="grid gap-3">
            {prospects.map((a) => {
              const cost = signCost(a);
              return (
                <li key={a.id} className="rounded-lg border border-border bg-elevated p-3">
                  <div className="flex gap-3">
                    <ArtistAvatar spec={a.avatar} size={48} />
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-medium">{a.name}</p>
                        <Pill>{genreLabel(a.genre)}</Pill>
                        <Pill>{a.kind}</Pill>
                      </div>
                      <p className="text-xs text-muted">
                        {a.hometown} · TikTok {compact(a.followers.tiktok)} · fame {Math.round(a.fame)}
                      </p>
                    </div>
                    <PrimaryBtn onClick={() => sign(a.id)}>{money(cost.advance)}</PrimaryBtn>
                  </div>
                  <p className="mt-2 text-sm text-muted">{a.bio}</p>
                  <div className="mt-3 grid grid-cols-3 gap-2">
                    <Meter label="Vocals" value={a.stats.vocals} />
                    <Meter label="Writing" value={a.stats.writing} />
                    <Meter label="Social" value={a.stats.social} />
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
