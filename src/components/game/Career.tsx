import { compact, money } from "@/lib/game/format";
import { playerArtist, legalNameOf } from "@/lib/game/sim";
import { useGame } from "@/lib/game/store";
import { GhostBtn, Panel, Pill, PrimaryBtn } from "./bits";
import { ArtistAvatar } from "./ArtistAvatar";
import { VerifiedBadge } from "./VerifiedBadge";

export function Career() {
  const game = useGame((s) => s.game)!;
  const takeDeal = useGame((s) => s.takeDeal);
  const passDeal = useGame((s) => s.passDeal);
  const toggleAi = useGame((s) => s.toggleAi);
  const holiday = useGame((s) => s.holiday);
  const setOverlay = useGame((s) => s.setOverlay);
  const a = playerArtist(game);
  const open = game.deals.filter((d) => d.status === "open");
  const history = game.deals.filter((d) => d.status !== "open");

  if (!a) {
    return <div className="p-6 text-sm text-muted">Start an artist career from the title screen.</div>;
  }

  return (
    <div className="mx-auto grid max-w-3xl gap-4 p-4 md:p-6">
      <div>
        <h1 className="font-display text-3xl tracking-tight">Career</h1>
        <p className="text-sm text-muted">
          Independent keeps 85% after distribution. A label pays an advance and takes a bigger master share — but they
          work radio. Age {a.age}.
        </p>
      </div>

      <Panel>
        <div className="flex gap-3">
          <ArtistAvatar spec={a.avatar} size={64} />
          <div className="min-w-0">
            <h2 className="flex items-center gap-1.5 font-display text-2xl">
              {a.name}
              <VerifiedBadge on={a.verified.x || a.verified.spotify} />
            </h2>
            <p className="text-sm text-muted">Legal name {legalNameOf(a)}</p>
            <p className="text-sm text-muted">
              @{a.handle} · {a.age} · {a.nationality} · {a.hometown}
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              <Pill tone={game.dealKind === "independent" ? "mint" : "good"}>
                {game.dealKind === "independent" ? "Independent" : `Signed · ${game.labelName}`}
              </Pill>
              <Pill>{Math.round(a.royalty * 100)}% your share</Pill>
              <Pill>pop {Math.round(a.popularity)}</Pill>
              {a.onHoliday ? <Pill>holiday</Pill> : null}
            </div>
          </div>
        </div>
        <dl className="mt-4 grid grid-cols-2 gap-3 text-sm sm:grid-cols-5">
          <Stat k="TikTok" v={compact(a.followers.tiktok)} />
          <Stat k="X" v={compact(a.followers.x)} />
          <Stat k="Instagram" v={compact(a.followers.instagram)} />
          <Stat k="YouTube" v={compact(a.followers.youtube)} />
          <Stat k="Spotify 4-wk" v={compact(a.monthlyListeners)} />
        </dl>
        <p className="mt-3 text-xs text-muted">
          Verification is not automatic. Hit 100k on an app (50k Spotify monthly) then apply in that app’s settings.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <GhostBtn onClick={() => setOverlay({ type: "wiki", artistId: a.id })}>Open wiki</GhostBtn>
          <GhostBtn onClick={() => toggleAi(a.id)}>{a.aiControl ? "AI control on" : "Let AI run releases"}</GhostBtn>
          <GhostBtn onClick={() => holiday(a.id, 1)}>Book holiday</GhostBtn>
        </div>
      </Panel>

      <Panel title="Label offers">
        {game.dealKind === "signed" ? (
          <p className="text-sm text-muted">
            You took the {game.labelName} deal. Advance {money(a.advance)}. {a.albumsRemaining} albums remaining.
          </p>
        ) : open.length === 0 ? (
          <p className="text-sm text-muted">No offers this week. Chart, grow X, or land a TikTok run — A&R watches the apps.</p>
        ) : (
          <ul className="grid gap-3">
            {open.map((d) => (
              <li key={d.id} className="rounded-lg border border-border bg-elevated p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-display text-xl">{d.labelName}</p>
                    <p className="text-sm text-muted">
                      Advance {money(d.advance)} · you keep {Math.round(d.royalty * 100)}% · {d.albums} albums · {d.weeksLeft}{" "}
                      weeks to answer
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <GhostBtn onClick={() => passDeal(d.id)}>Pass</GhostBtn>
                    <PrimaryBtn onClick={() => takeDeal(d.id)}>Sign</PrimaryBtn>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Panel>

      {history.length > 0 && (
        <Panel title="Paper trail">
          <ul className="grid gap-2 text-sm">
            {history.map((d) => (
              <li key={d.id} className="flex justify-between text-muted">
                <span>
                  {d.labelName} · {d.status}
                </span>
                <span>{money(d.advance)}</span>
              </li>
            ))}
          </ul>
        </Panel>
      )}
    </div>
  );
}

function Stat({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <dt className="text-xs text-muted">{k}</dt>
      <dd className="font-display text-xl tabular-nums">{v}</dd>
    </div>
  );
}
