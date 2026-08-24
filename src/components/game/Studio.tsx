import { genreLabel } from "@/lib/game/catalog";
import { compact, money } from "@/lib/game/format";
import { featName, playerSongs, rosterOf } from "@/lib/game/sim";
import { useGame } from "@/lib/game/store";
import type { ReleaseFormat } from "@/lib/game/types";
import { GhostBtn, Meter, Panel, Pill, PrimaryBtn } from "./bits";
import { FeatureDesk, FeatureOfferRow, FeaturePicker } from "./FeaturePicker";

export function Studio() {
  const game = useGame((s) => s.game)!;
  const startRecord = useGame((s) => s.startRecord);
  const release = useGame((s) => s.release);
  const radio = useGame((s) => s.radio);
  const playlist = useGame((s) => s.playlist);
  const openCheckout = useGame((s) => s.openCheckout);
  const setOverlay = useGame((s) => s.setOverlay);
  const setView = useGame((s) => s.setView);
  const marketBuy = useGame((s) => s.marketBuy);
  const greatest = useGame((s) => s.greatest);
  const roster = rosterOf(game);
  const songs = playerSongs(game);
  const upCost = game.studioTier === 1 ? 45_000 : game.studioTier === 2 ? 95_000 : null;
  const radioCost = game.career === "artist" ? 9_500 : 18_000;
  const pitchCost = game.career === "artist" ? 4_800 : 9_500;
  const incoming = (game.features ?? []).filter((f) => f.status === "open" && (f.incoming || f.hopOn));

  return (
    <div className="mx-auto grid max-w-6xl gap-4 p-4 md:p-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl tracking-tight">Studio</h1>
          <p className="text-sm text-muted">
            Book a single, then search any artist in the world as a feature — Taylor, Drake, a prospect. Cash if you
            have it, otherwise they take a split. Same flow lives in X Direct Messages.
          </p>
        </div>
        {upCost ? (
          <GhostBtn
            onClick={() =>
              openCheckout({
                kind: "studio",
                id: "studio",
                title: `Studio upgrade · tier ${game.studioTier + 1}`,
                price: upCost,
              })
            }
          >
            Upgrade · {money(upCost)}
          </GhostBtn>
        ) : (
          <Pill tone="mint">Maxed room</Pill>
        )}
      </div>

      <Panel title="Add a featured artist" className="border-accent/40 bg-accent/5">
        <FeatureDesk />
      </Panel>

      {incoming.length > 0 && (
        <Panel title="They want in" className="border-good/30">
          <p className="mb-3 text-sm text-muted">Same offers land in X Direct Messages.</p>
          <ul className="grid gap-3">
            {incoming.map((f) => {
              const host = game.artists.find((a) => a.id === f.hostArtistId);
              const guest = game.artists.find((a) => a.id === f.featureArtistId);
              return (
                <FeatureOfferRow
                  key={f.id}
                  id={f.id}
                  hopOn={f.hopOn}
                  hostName={host?.name ?? "Artist"}
                  guestName={guest?.name ?? "Artist"}
                  title={f.title}
                  fee={f.fee}
                />
              );
            })}
          </ul>
        </Panel>
      )}

      <Panel title="Book a session">
        {roster.length === 0 ? (
          <p className="text-sm text-muted">Sign someone first.</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {roster.map((a) => (
              <span key={a.id} className="flex flex-wrap gap-1">
                <PrimaryBtn onClick={() => startRecord(a.id, "single")}>{a.name} · single</PrimaryBtn>
                <GhostBtn onClick={() => startRecord(a.id, "ep")}>EP</GhostBtn>
                <GhostBtn onClick={() => startRecord(a.id, "album")}>Album</GhostBtn>
                <GhostBtn onClick={() => greatest(a.id)}>Greatest Hits</GhostBtn>
              </span>
            ))}
          </div>
        )}
      </Panel>

      <Panel title="Song market">
        {game.songMarket.length === 0 ? (
          <p className="text-sm text-muted">Writers refresh every four weeks.</p>
        ) : (
          <ul className="grid gap-2">
            {game.songMarket.map((m) => (
              <li key={m.id} className="flex flex-wrap items-center justify-between gap-2 text-sm">
                <span>
                  {m.title}
                  <span className="text-muted">
                    {" "}
                    · {genreLabel(m.genre)} · Q{m.quality} · {m.writer}
                  </span>
                </span>
                <GhostBtn onClick={() => roster[0] && marketBuy(m.id, roster[0]!.id)}>Buy · {money(m.price)}</GhostBtn>
              </li>
            ))}
          </ul>
        )}
      </Panel>

      <div className="grid gap-3">
        {songs.length === 0 && (
          <Panel>
            <p className="text-sm text-muted">No records in progress. Book a single, then the feature search above lights up.</p>
          </Panel>
        )}
        {songs
          .slice()
          .reverse()
          .map((s) => {
            const a = game.artists.find((x) => x.id === s.artistId);
            const feat = featName(game, s);
            const combined = s.salesDigital + s.salesPhysical;
            return (
              <Panel key={s.id}>
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="font-display text-xl">{s.title}</h2>
                      <Pill>{s.status}</Pill>
                      {s.chart ? <Pill tone="mint">#{s.chart}</Pill> : null}
                      {s.radioChart ? <Pill>radio #{s.radioChart}</Pill> : null}
                      {s.status === "released" ? <Pill>{formatLabel(s.releaseFormat)}</Pill> : null}
                      {feat ? <Pill tone="mint">feat. {feat}</Pill> : null}
                    </div>
                    <p className="text-sm text-muted">
                      {a?.name} · {genreLabel(s.genre)}
                      {feat ? ` · feat. ${feat}` : ""}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="tabular-nums text-sm text-muted">{compact(s.streams)} streams</p>
                    {s.status === "released" && (
                      <p className="text-xs text-muted">
                        {compact(s.streamsWeek + s.streamsPending)} this week · {money(s.weekPayout)} paid
                      </p>
                    )}
                    {s.status === "released" && (
                      <p className="text-xs text-muted">
                        Digital {compact(s.salesDigital)} · CD {compact(s.salesPhysical)} · combined {compact(combined)}
                      </p>
                    )}
                  </div>
                </div>
                <div className="mt-4 rounded-lg border border-accent/40 bg-accent/5 p-3">
                  <p className="mb-2 text-xs tracking-[0.16em] text-accent uppercase">Featured artist</p>
                  <FeaturePicker song={s} />
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
                  <Meter label="Writing" value={s.writing} />
                  <Meter label="Hook" value={s.hook} />
                  <Meter label="Production" value={s.production} />
                  <Meter label="Mix" value={s.mix} />
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {s.status === "mastered" && (
                    <>
                      <PrimaryBtn onClick={() => release(s.id, "both")}>Combined digital + CD</PrimaryBtn>
                      <GhostBtn onClick={() => release(s.id, "digital")}>Digital only</GhostBtn>
                      <GhostBtn onClick={() => release(s.id, "cd")}>CD only</GhostBtn>
                    </>
                  )}
                  {s.status === "released" && (
                    <>
                      <PrimaryBtn
                        onClick={() =>
                          setOverlay({ type: "tiktok", tab: "create", artistId: s.artistId })
                        }
                      >
                        Promote on TikTok
                      </PrimaryBtn>
                      <GhostBtn onClick={() => radio(s.id)}>Radio · {money(radioCost)}</GhostBtn>
                      <GhostBtn onClick={() => playlist(s.id)}>Playlist pitch · {money(pitchCost)}</GhostBtn>
                      <GhostBtn onClick={() => setOverlay({ type: "youtube", tab: "studio" })}>Shoot video</GhostBtn>
                      <GhostBtn onClick={() => setView("promo")}>Promote</GhostBtn>
                    </>
                  )}
                </div>
              </Panel>
            );
          })}
      </div>
    </div>
  );
}

function formatLabel(f: ReleaseFormat) {
  return f === "both" ? "digital + CD" : f === "cd" ? "CD" : "digital";
}
