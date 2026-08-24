import { ArrowUpRight, Radio, Sparkles } from "lucide-react";
import { compact, money, signedMoney } from "@/lib/game/format";
import { fourWeekStreams, creditLine, featName, playerArtist, playerSongs, rosterOf, unreadMail } from "@/lib/game/sim";
import { useGame } from "@/lib/game/store";
import { TAGLINE } from "@/lib/game/types";
import { GhostBtn, Panel, Pill, PrimaryBtn } from "./bits";
import { ArtistAvatar } from "./ArtistAvatar";
import { VerifiedBadge } from "./VerifiedBadge";
import { genreLabel } from "@/lib/game/catalog";
import { FeatureOfferRow } from "./FeaturePicker";

export function Dashboard() {
  const game = useGame((s) => s.game)!;
  const setView = useGame((s) => s.setView);
  const setOverlay = useGame((s) => s.setOverlay);
  const roster = rosterOf(game);
  const songs = playerSongs(game);
  const charting = game.songs
    .filter((s) => s.chart != null)
    .sort((a, b) => (a.chart ?? 99) - (b.chart ?? 99));
  const tokViews = game.clips.filter((c) => c.owned).reduce((a, c) => a + c.viewsWeek, 0);
  const tutorial = game.tutorial;
  const you = playerArtist(game);
  const openDeals = game.deals.filter((d) => d.status === "open").length;
  const monthly = you ? you.monthlyListeners : roster.reduce((n, a) => n + a.monthlyListeners, 0);
  const four = you ? fourWeekStreams(you) : monthly;
  const incoming = (game.features ?? []).filter((f) => f.status === "open" && (f.incoming || f.hopOn));
  const mailN = unreadMail(game);
  const jailed = (you?.incarceratedWeeks ?? 0) > 0;

  return (
    <div className="mx-auto grid max-w-6xl gap-4 p-4 md:p-6">
      <div>
        <p className="text-xs tracking-[0.2em] text-accent uppercase">{TAGLINE}</p>
        <h1 className="font-display text-3xl tracking-tight">{game.career === "artist" ? you?.name : game.labelName}</h1>
        {you ? (
          <p className="text-sm text-muted">
            Age {you.age} · {you.hometown} · popularity {Math.round(you.popularity)} · Spotify monthly {compact(monthly)}{" "}
            (last 4 weeks: {compact(four)})
          </p>
        ) : null}
      </div>

      {tutorial < 5 && (
        <Panel className="border-accent/30">
          <p className="text-xs tracking-[0.18em] text-accent uppercase">This week</p>
          <p className="mt-1 font-display text-2xl">
            {game.career === "artist" ? (
              <>
                {tutorial === 1 && "Book the studio. A song needs a hook before TikTok can work."}
                {tutorial === 2 && "Keep writing. Master is coming."}
                {tutorial === 3 && "Master is ready. Release it onto Spotify."}
                {tutorial === 4 && "Open TikTok. Post the sound. Watch every app move."}
              </>
            ) : (
              <>
                {tutorial === 1 && "Scout and sign someone who can live on camera."}
                {tutorial === 2 && "Book the studio. A song needs a hook before TikTok can work."}
                {tutorial === 3 && "Master is ready. Release it onto Spotify."}
                {tutorial === 4 && "Open TikTok. Post the sound. Watch the algorithm decide."}
              </>
            )}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {game.career === "label" && tutorial === 1 && (
              <PrimaryBtn onClick={() => setOverlay({ type: "scout" })}>Open A&R</PrimaryBtn>
            )}
            {((game.career === "artist" && tutorial === 1) || tutorial === 2 || tutorial === 3) && (
              <PrimaryBtn onClick={() => setView("studio")}>Go to studio</PrimaryBtn>
            )}
            {tutorial === 4 && (
              <PrimaryBtn onClick={() => setOverlay({ type: "tiktok", tab: "create" })}>Open TikTok</PrimaryBtn>
            )}
          </div>
        </Panel>
      )}

      {jailed && you && (
        <Panel className="border-bad/40">
          <p className="text-xs tracking-[0.18em] text-bad uppercase">Incarcerated</p>
          <p className="mt-1 font-display text-2xl">{you.incarceratedWeeks} weeks inside</p>
          <p className="mt-1 text-sm text-muted">Write from the booth. Tours, film, and nightlife are closed.</p>
          <GhostBtn className="mt-3" onClick={() => setView("legal")}>
            Open legal
          </GhostBtn>
        </Panel>
      )}

      {mailN > 0 && (
        <Panel className="border-accent/30">
          <p className="text-xs tracking-[0.18em] text-accent uppercase">Inbox</p>
          <p className="mt-1 font-display text-2xl">{mailN} unread</p>
          <PrimaryBtn className="mt-3" onClick={() => setView("mail")}>
            Open mail
          </PrimaryBtn>
        </Panel>
      )}
      {openDeals > 0 && game.career === "artist" && (
        <Panel className="border-good/30">
          <p className="text-xs tracking-[0.18em] text-good uppercase">A&R</p>
          <p className="mt-1 font-display text-2xl">
            {openDeals} label offer{openDeals > 1 ? "s" : ""} on the table
          </p>
          <PrimaryBtn className="mt-3" onClick={() => setView("career")}>
            Read the deal
          </PrimaryBtn>
        </Panel>
      )}

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Checking" value={money(game.cash)} />
        <Stat label="Week net" value={signedMoney(game.ledger.net)} />
        <Stat label="TikTok views / wk" value={compact(tokViews)} />
        <Stat label="Spotify monthly" value={compact(monthly)} />
        <Stat label="Popularity" value={String(Math.round(you?.popularity ?? roster[0]?.popularity ?? 0))} />
      </div>

      {incoming.length > 0 && (
        <Panel className="border-good/30" title="Feature offers">
          <ul className="grid gap-2">
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

      <div className="grid gap-4 lg:grid-cols-3">
        <Panel
          title={game.career === "artist" ? "You" : "Roster"}
          className="lg:col-span-2"
          action={
            game.career === "label" ? (
              <GhostBtn onClick={() => setOverlay({ type: "scout" })}>Scout</GhostBtn>
            ) : (
              <span className="flex gap-2">
                <GhostBtn onClick={() => setView("career")}>Career</GhostBtn>
                {you ? <GhostBtn onClick={() => setOverlay({ type: "wiki", artistId: you.id })}>Wiki</GhostBtn> : null}
              </span>
            )
          }
        >
          {roster.length === 0 ? (
            <p className="text-sm text-muted">Empty building. A&R is waiting.</p>
          ) : (
            <ul className="grid gap-2">
              {roster.map((a) => (
                <li key={a.id}>
                  <button
                    onClick={() => setOverlay({ type: "artist", id: a.id })}
                    className="flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left hover:bg-subtle"
                  >
                    <ArtistAvatar spec={a.avatar} size={40} />
                    <div className="min-w-0 flex-1">
                      <p className="flex items-center gap-1 truncate font-medium">
                        {a.name}
                        <VerifiedBadge on={a.verified.x || a.verified.tiktok} />
                      </p>
                      <p className="text-xs text-muted">
                        {genreLabel(a.genre)} · pop {Math.round(a.popularity)} · TikTok {compact(a.followers.tiktok)} · X{" "}
                        {compact(a.followers.x)} · IG {compact(a.followers.instagram)}
                      </p>
                    </div>
                    <Pill>{Math.round(a.energy)} energy</Pill>
                    <ArrowUpRight className="size-4 text-faint" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </Panel>

        <Panel title="Socials" action={<button className="text-sm text-accent" onClick={() => setView("social")}>Open</button>}>
          <div className="grid gap-2">
            <AppRow name="TikTok" hint="For You is the new radio" onClick={() => setOverlay({ type: "tiktok", tab: "home" })} />
            <AppRow name="X" hint="DMs for collabs" onClick={() => setOverlay({ type: "x", tab: "messages" })} />
            <AppRow name="Instagram" hint="Grid, stills, slow fame" onClick={() => setOverlay({ type: "instagram", tab: "feed" })} />
            <AppRow
              name="Spotify"
              hint={`${compact(monthly)} monthly · last 4 weeks`}
              onClick={() => setOverlay({ type: "spotify", tab: "home", artistId: you?.id })}
            />
            <AppRow name="YouTube" hint="Channel, videos, releases" onClick={() => setOverlay({ type: "youtube", tab: "channel" })} />
          </div>
        </Panel>
      </div>

      <Panel
        title="Your records"
        action={
          <button className="text-sm text-accent" onClick={() => setView("studio")}>
            Studio
          </button>
        }
      >
        {songs.length === 0 ? (
          <p className="text-sm text-muted">Book a single in Studio, then search any artist as a feature on the card.</p>
        ) : (
          <ul className="grid gap-2">
            {songs.slice(-4).reverse().map((s) => {
              const feat = featName(game, s);
              return (
                <li key={s.id} className="flex flex-wrap items-center justify-between gap-2 text-sm">
                  <span className="min-w-0 truncate">
                    {s.title}
                    {feat ? <span className="text-muted"> feat. {feat}</span> : null}
                    <span className="text-muted"> · {s.status}</span>
                  </span>
                  {!feat ? (
                    <PrimaryBtn onClick={() => setView("studio")}>Add a feature</PrimaryBtn>
                  ) : (
                    <Pill tone="mint">feat. {feat}</Pill>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </Panel>

      <Panel title="Billboard 100" action={<button className="text-sm text-accent" onClick={() => setView("charts")}>Full board</button>}>
        {charting.length === 0 ? (
          <p className="text-sm text-muted">Board is empty. That shouldn't happen.</p>
        ) : (
          <ol className="grid gap-2">
            {charting.slice(0, 8).map((s) => {
              const a = game.artists.find((x) => x.id === s.artistId);
              const ours = a ? songs.some((x) => x.id === s.id) : false;
              return (
                <li key={s.id} className="flex items-center gap-3 text-sm">
                  <span className="w-8 tabular-nums text-muted">#{s.chart}</span>
                  <span className="flex-1 truncate">
                    {s.title}
                    <span className="text-muted"> · {creditLine(game, s)}</span>
                    {ours ? <Pill tone="mint" className="ml-2">yours</Pill> : null}
                    {s.radioChart ? <span className="text-muted"> · radio #{s.radioChart}</span> : null}
                  </span>
                  <span className="tabular-nums text-muted">{compact(s.streamsWeek)} /wk</span>
                </li>
              );
            })}
          </ol>
        )}
      </Panel>

      <Panel title="History">
        <ul className="grid gap-3">
          {(game.statements ?? []).slice(0, 4).map((s) => (
            <li key={s.id} className="flex justify-between gap-3 text-sm">
              <span className="truncate">
                {s.title}
                <span className="text-muted"> · {s.channel}</span>
              </span>
              <span className="tabular-nums text-muted">{signedMoney(s.amount)}</span>
            </li>
          ))}
          {game.notifs.slice(0, 4).map((n) => (
            <li key={n.id} className="flex gap-3">
              {n.tone === "viral" ? <Sparkles className="mt-0.5 size-4 text-tok-like" /> : <Radio className="mt-0.5 size-4 text-muted" />}
              <div>
                <p className="text-sm font-medium">{n.title}</p>
                <p className="text-sm text-muted">{n.body}</p>
              </div>
            </li>
          ))}
        </ul>
        <GhostBtn className="mt-3" onClick={() => setView("books")}>
          Open Finances
        </GhostBtn>
      </Panel>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0 rounded-xl border border-border bg-surface px-4 py-3">
      <p className="text-xs text-muted">{label}</p>
      <p className="mt-1 truncate font-display text-2xl leading-none tabular-nums tracking-tight">{value}</p>
    </div>
  );
}

function AppRow({ name, hint, onClick }: { name: string; hint: string; onClick: () => void }) {
  return (
    <button onClick={onClick} className="flex min-h-14 items-center justify-between rounded-lg bg-subtle px-3 text-left">
      <span>
        <span className="block text-sm font-medium">{name}</span>
        <span className="text-xs text-muted">{hint}</span>
      </span>
      <ArrowUpRight className="size-4 text-faint" />
    </button>
  );
}
