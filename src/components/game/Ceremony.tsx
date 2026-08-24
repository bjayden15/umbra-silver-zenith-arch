import { useGame } from "@/lib/game/store";
import { GhostBtn, Panel, Pill, PrimaryBtn } from "./bits";

export function CeremonyOverlay() {
  const game = useGame((s) => s.game)!;
  const skipCategory = useGame((s) => s.skipCategory);
  const skipShow = useGame((s) => s.skipShow);
  const cer = game.ceremony;
  if (!cer || cer.done) return null;
  const cat = cer.categories[cer.cursor];
  const remaining = cer.categories.length - cer.cursor;

  return (
    <div className="fixed inset-0 z-40 grid place-items-end bg-bg/75 p-0 sm:place-items-center sm:p-4">
      <div className="flex max-h-[92dvh] w-full max-w-lg flex-col overflow-hidden rounded-t-2xl border border-border bg-surface shadow-2xl sm:rounded-2xl">
        <header className="border-b border-border px-4 py-3">
          <p className="text-[11px] uppercase tracking-[0.16em] text-faint">Live telecast</p>
          <h2 className="font-display text-2xl leading-tight">{cer.show}</h2>
          <p className="text-sm text-muted">
            Category {Math.min(cer.cursor + 1, cer.categories.length)} of {cer.categories.length}
          </p>
        </header>
        <div className="grid gap-4 overflow-auto px-4 py-4">
          {cat ? (
            <Panel title={cat.category}>
              <ul className="grid gap-2 text-sm">
                {cat.nominees.map((n, i) => (
                  <li key={`${n.artistId}-${n.songId ?? i}`} className="flex justify-between gap-2">
                    <span>
                      {n.name}
                      {n.songId ? <span className="text-muted"> · {n.title}</span> : null}
                    </span>
                    {cat.revealed && i === cat.winnerIndex ? <Pill tone="mint">wins</Pill> : null}
                  </li>
                ))}
              </ul>
            </Panel>
          ) : (
            <p className="text-sm text-muted">Envelope is empty.</p>
          )}
          <p className="text-xs text-muted">{remaining} left. Skipping still records the winners.</p>
          <div className="flex flex-wrap gap-2">
            <PrimaryBtn onClick={skipCategory}>Skip category</PrimaryBtn>
            <GhostBtn onClick={skipShow}>Skip show</GhostBtn>
          </div>
        </div>
      </div>
    </div>
  );
}
