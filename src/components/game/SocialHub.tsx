import { ArrowUpRight } from "lucide-react";
import { compact } from "@/lib/game/format";
import { rosterOf } from "@/lib/game/sim";
import { useGame } from "@/lib/game/store";
import { Panel, Pill, PrimaryBtn } from "./bits";
import { ArtistAvatar } from "./ArtistAvatar";
import { VerifiedBadge } from "./VerifiedBadge";

export function SocialHub() {
  const game = useGame((s) => s.game)!;
  const setOverlay = useGame((s) => s.setOverlay);
  const live = useGame((s) => s.live);
  const roster = rosterOf(game);
  const ownedViews = game.clips.filter((c) => c.owned).reduce((a, c) => a + c.views, 0);
  const sounds = game.sounds.filter((s) => s.trending).sort((a, b) => (a.trendRank ?? 9) - (b.trendRank ?? 9));
  const xFollowers = roster.reduce((n, a) => n + a.followers.x, 0);
  const igFollowers = roster.reduce((n, a) => n + a.followers.instagram, 0);
  const yt = roster.reduce((n, a) => n + a.followers.youtube, 0);
  const monthly = roster.reduce((n, a) => n + a.monthlyListeners, 0);
  const you = roster[0];

  return (
    <div className="mx-auto grid max-w-6xl gap-4 p-4 md:p-6">
      <div>
        <h1 className="font-display text-3xl tracking-tight">Socials</h1>
        <p className="text-sm text-muted">
          TikTok, X, Instagram, Spotify, YouTube. Hits move together. Apply for verified after 100k per app and
          50k Spotify monthly — it is not automatic.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <AppTile
          name="TikTok"
          kicker="For You"
          stat={`${compact(ownedViews)} views`}
          copy="Short video. Test a clip. Bury it or set the city on fire."
          onClick={() => setOverlay({ type: "tiktok", tab: "home" })}
        />
        <AppTile
          name="X"
          kicker="Home · Alerts · DMs"
          stat={`${compact(xFollowers)} followers`}
          copy="DM any artist for a feature. Attach a single in the thread to lock the verse."
          onClick={() => setOverlay({ type: "x", tab: "messages" })}
        />
        <AppTile
          name="Instagram"
          kicker="Grid"
          stat={`${compact(igFollowers)} followers`}
          copy="Looks and lifestyle. Slow fame."
          onClick={() => setOverlay({ type: "instagram", tab: "feed" })}
        />
        <AppTile
          name="Spotify"
          kicker="Artist channel"
          stat={`${compact(monthly)} monthly`}
          copy="Monthly listeners equal the last four weeks of streams. No promo, they fall."
          onClick={() => setOverlay({ type: "spotify", tab: "home", artistId: roster[0]?.id })}
        />
        <AppTile
          name="YouTube"
          kicker="Channel · Videos · Releases"
          stat={`${compact(yt)} subs`}
          copy="Real channel page — Home, Videos, Shorts, Live, Releases, Playlists, About."
          onClick={() => setOverlay({ type: "youtube", tab: "channel" })}
        />
      </div>

      {you && (
        <Panel title="Profiles">
          <p className="mb-3 text-sm text-muted">
            Each app has its own username, photo, and bio. Hit 100k (50k Spotify monthly) then apply — the mark is not automatic.
          </p>
          <div className="flex flex-wrap gap-2">
            <PrimaryBtn onClick={() => setOverlay({ type: "tiktok", tab: "settings" })}>TikTok settings</PrimaryBtn>
            <PrimaryBtn onClick={() => setOverlay({ type: "x", tab: "settings" })}>X settings</PrimaryBtn>
            <PrimaryBtn onClick={() => setOverlay({ type: "instagram", tab: "settings" })}>Instagram settings</PrimaryBtn>
            <PrimaryBtn onClick={() => setOverlay({ type: "spotify", tab: "settings" })}>Spotify settings</PrimaryBtn>
            <PrimaryBtn onClick={() => setOverlay({ type: "youtube", tab: "settings" })}>YouTube settings</PrimaryBtn>
            <PrimaryBtn onClick={() => setOverlay({ type: "wiki", artistId: you.id })}>Wiki</PrimaryBtn>
          </div>
        </Panel>
      )}

      {you && (
        <Panel title="Go live">
          <p className="mb-3 text-sm text-muted">Viewers scale with followers. Gifts hit the account.</p>
          <div className="flex flex-wrap gap-2">
            {(["tiktok", "x", "instagram", "youtube"] as const).map((p) => (
              <PrimaryBtn key={p} onClick={() => live(you.id, p)}>
                {p === "tiktok" ? "TikTok" : p === "x" ? "X" : p === "instagram" ? "Instagram" : "YouTube"} live
                {game.liveViewers[p] ? ` · ${compact(game.liveViewers[p])}` : ""}
              </PrimaryBtn>
            ))}
          </div>
        </Panel>
      )}

      <Panel title="Trending on TikTok">
        {sounds.length === 0 ? (
          <p className="text-sm text-muted">Trends refresh each week.</p>
        ) : (
          <ol className="grid gap-2">
            {sounds.map((s) => (
              <li key={s.id} className="flex items-center justify-between gap-3 text-sm">
                <span className="flex items-center gap-2">
                  <Pill tone="mint">#{s.trendRank}</Pill>
                  {s.name}
                  <span className="text-muted">· {s.artistName}</span>
                </span>
                <span className="tabular-nums text-muted">{compact(s.uses)} uses</span>
              </li>
            ))}
          </ol>
        )}
      </Panel>

      <Panel title="Artist socials">
        {roster.length === 0 ? (
          <p className="text-sm text-muted">Sign someone to give them a phone.</p>
        ) : (
          <ul className="grid gap-2">
            {roster
              .slice()
              .sort((a, b) => b.followers.tiktok - a.followers.tiktok)
              .map((a) => (
                <li key={a.id} className="flex flex-wrap items-center gap-3">
                  <ArtistAvatar spec={a.avatar} size={36} />
                  <span className="flex min-w-0 flex-1 items-center gap-1 truncate text-sm">
                    {a.name}
                    <VerifiedBadge on={a.verified.x || a.verified.tiktok || a.verified.instagram} />
                  </span>
                  <span className="text-xs text-muted">TT {compact(a.followers.tiktok)}</span>
                  <span className="text-xs text-muted">X {compact(a.followers.x)}</span>
                  <span className="text-xs text-muted">IG {compact(a.followers.instagram)}</span>
                  <span className="text-xs text-muted">YT {compact(a.followers.youtube)}</span>
                  <span className="text-xs text-muted">Spotify {compact(a.monthlyListeners)}</span>
                </li>
              ))}
          </ul>
        )}
      </Panel>
    </div>
  );
}

function AppTile({
  name,
  kicker,
  stat,
  copy,
  onClick,
}: {
  name: string;
  kicker: string;
  stat: string;
  copy: string;
  onClick: () => void;
}) {
  return (
    <button onClick={onClick} className="rounded-xl border border-border bg-surface p-5 text-left transition-colors hover:bg-elevated">
      <p className="text-xs tracking-[0.18em] text-muted uppercase">{kicker}</p>
      <div className="mt-1 flex items-center justify-between">
        <h2 className="font-display text-2xl">{name}</h2>
        <ArrowUpRight className="size-4 text-faint" />
      </div>
      <p className="mt-2 font-display text-xl tabular-nums">{stat}</p>
      <p className="mt-2 text-sm text-muted">{copy}</p>
    </button>
  );
}
