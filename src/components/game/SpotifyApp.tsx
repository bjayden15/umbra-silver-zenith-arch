import { useMemo, useState } from "react";
import { Home, Library, Search, User, X } from "lucide-react";
import { compact } from "@/lib/game/format";
import { creditLine, featName, playerSongs, profileOf, rosterOf } from "@/lib/game/sim";
import { useGame } from "@/lib/game/store";
import { CHART_SIZE, type SpotifyTab } from "@/lib/game/types";
import { cn } from "@/lib/utils";
import { ArtistAvatar } from "./ArtistAvatar";
import { VerifiedBadge } from "./VerifiedBadge";
import { ProfileEditor } from "./ProfileEditor";

export function SpotifyApp() {
  const overlay = useGame((s) => s.overlay);
  const tab: SpotifyTab = overlay.type === "spotify" ? (overlay.tab ?? "home") : "home";
  const artistId = overlay.type === "spotify" ? overlay.artistId : undefined;
  const setOverlay = useGame((s) => s.setOverlay);

  return (
    <div className="fixed inset-0 z-40 grid place-items-center bg-bg/80 p-0 md:p-6">
      <div className="flex h-dvh w-full max-w-[480px] flex-col bg-[#121212] text-white md:h-[min(844px,calc(100dvh-48px))] md:rounded-[2rem] md:border md:border-white/10 phone-bezel">
        <header className="flex items-center justify-between px-4 py-3">
          <button className="min-h-10 text-sm text-white/50" onClick={() => setOverlay({ type: "none" })}>
            HQ
          </button>
          <p className="font-display text-lg text-wave">Spotify</p>
          <button
            className="grid size-10 place-items-center"
            onClick={() => setOverlay({ type: "none" })}
            aria-label="Close"
          >
            <X className="size-4" />
          </button>
        </header>
        <div className="min-h-0 flex-1 overflow-hidden">
          {tab === "home" && <SpotifyHome />}
          {tab === "search" && <SpotifySearch />}
          {tab === "library" && <SpotifyLibrary />}
          {tab === "artist" && <ArtistChannel artistId={artistId} />}
          {tab === "settings" && (
            <div className="h-full overflow-auto">
              <ProfileEditor platform="spotify" dark />
            </div>
          )}
        </div>
        <nav className="grid grid-cols-4 border-t border-white/10 pb-[env(safe-area-inset-bottom)]">
          {(
            [
              { id: "home" as const, label: "Home", icon: Home },
              { id: "search" as const, label: "Search", icon: Search },
              { id: "library" as const, label: "Library", icon: Library },
              { id: "settings" as const, label: "You", icon: User },
            ] as const
          ).map((it) => (
            <button
              key={it.id}
              onClick={() => setOverlay({ type: "spotify", tab: it.id })}
              className={cn(
                "flex min-h-14 flex-col items-center justify-center gap-0.5 text-[10px]",
                tab === it.id || (tab === "artist" && it.id === "library") ? "text-white" : "text-white/45",
              )}
            >
              <it.icon className="size-5" />
              {it.label}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}

function SpotifyHome() {
  const game = useGame((s) => s.game)!;
  const setOverlay = useGame((s) => s.setOverlay);
  const roster = rosterOf(game);
  const hot = game.songs
    .filter((s) => s.status === "released")
    .slice()
    .sort((a, b) => b.streamsWeek - a.streamsWeek)
    .slice(0, CHART_SIZE.spotify);
  const yours = playerSongs(game).filter((s) => s.status === "released");

  return (
    <div className="h-full overflow-auto px-4 pb-4">
      <h2 className="font-display text-2xl">Good evening</h2>
      {roster[0] && (
        <button
          onClick={() => setOverlay({ type: "spotify", tab: "artist", artistId: roster[0]!.id })}
          className="mt-4 flex w-full items-center gap-3 rounded-lg bg-white/8 p-3 text-left"
        >
          <ArtistAvatar spec={roster[0].avatar} size={56} />
          <div className="min-w-0">
            <p className="text-xs text-white/45">Your channel</p>
            <p className="flex items-center gap-1 font-medium">
              {roster[0].name}
              <VerifiedBadge on={roster[0].verified.spotify} className="text-wave" />
            </p>
            <p className="text-xs text-white/50">{compact(roster[0].monthlyListeners)} monthly listeners</p>
          </div>
        </button>
      )}
      <h3 className="mt-6 text-sm font-medium text-white/70">Top Spotify 50</h3>
      <ol className="mt-2 grid gap-2">
        {hot.map((s, i) => {
          const a = game.artists.find((x) => x.id === s.artistId);
          return (
            <li key={s.id}>
              <button
                className="flex w-full items-center gap-3 rounded-md px-1 py-1.5 text-left hover:bg-white/5"
                onClick={() => a && setOverlay({ type: "spotify", tab: "artist", artistId: a.id })}
              >
                <span className="w-5 text-xs tabular-nums text-white/40">{i + 1}</span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm">{s.title}</span>
                  <span className="truncate text-xs text-white/45">{creditLine(game, s)}</span>
                </span>
                <span className="text-xs tabular-nums text-white/40">{compact(s.streamsWeek)}</span>
              </button>
            </li>
          );
        })}
      </ol>
      {yours.length > 0 && (
        <>
          <h3 className="mt-6 text-sm font-medium text-white/70">Your catalog</h3>
          <ul className="mt-2 grid gap-2">
            {yours.map((s) => (
              <li key={s.id} className="flex justify-between text-sm">
                <span className="truncate">{s.title}</span>
                <span className="tabular-nums text-white/40">{compact(s.streams)}</span>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

function SpotifySearch() {
  const game = useGame((s) => s.game)!;
  const setOverlay = useGame((s) => s.setOverlay);
  const [q, setQ] = useState("");
  const hits = useMemo(() => {
    const n = q.trim().toLowerCase();
    const artists = game.artists
      .filter((a) => !n || a.name.toLowerCase().includes(n) || a.handle.includes(n))
      .slice()
      .sort((a, b) => b.monthlyListeners - a.monthlyListeners)
      .slice(0, 12);
    return artists;
  }, [game.artists, q]);

  return (
    <div className="h-full overflow-auto px-4 pb-4">
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Artists, songs"
        className="h-11 w-full rounded-md bg-white/10 px-3 text-sm outline-none"
      />
      <ul className="mt-4 grid gap-2">
        {hits.map((a) => (
          <li key={a.id}>
            <button
              className="flex w-full items-center gap-3 rounded-md py-1 text-left"
              onClick={() => setOverlay({ type: "spotify", tab: "artist", artistId: a.id })}
            >
              <ArtistAvatar spec={a.avatar} size={48} />
              <span className="min-w-0">
                <span className="flex items-center gap-1 text-sm font-medium">
                  {a.name}
                  <VerifiedBadge on={a.verified.spotify} className="text-wave" />
                </span>
                <span className="block text-xs text-white/45">
                  Artist · {compact(a.monthlyListeners)} monthly listeners
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SpotifyLibrary() {
  const game = useGame((s) => s.game)!;
  const setOverlay = useGame((s) => s.setOverlay);
  const roster = rosterOf(game);
  const songs = playerSongs(game).filter((s) => s.status === "released");
  return (
    <div className="h-full overflow-auto px-4 pb-4">
      <h2 className="font-display text-2xl">Library</h2>
      <p className="mt-1 text-sm text-white/45">Saved from your catalog.</p>
      {roster.map((a) => (
        <button
          key={a.id}
          onClick={() => setOverlay({ type: "spotify", tab: "artist", artistId: a.id })}
          className="mt-4 flex w-full items-center gap-3 text-left"
        >
          <ArtistAvatar spec={a.avatar} size={48} />
          <span>
            <span className="block text-sm font-medium">{a.name}</span>
            <span className="text-xs text-white/45">{compact(a.monthlyListeners)} monthly listeners</span>
          </span>
        </button>
      ))}
      <ul className="mt-5 grid gap-2">
        {songs.map((s) => (
          <li key={s.id} className="flex justify-between text-sm">
            <span>{s.title}</span>
            <span className="tabular-nums text-white/40">{compact(s.streams)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ArtistChannel({ artistId }: { artistId?: string }) {
  const game = useGame((s) => s.game)!;
  const setOverlay = useGame((s) => s.setOverlay);
  const roster = rosterOf(game);
  const a = game.artists.find((x) => x.id === artistId) ?? roster[0];
  if (!a) return <p className="p-4 text-sm text-white/45">No artist channel.</p>;
  const profile = profileOf(a, "spotify");
  const songs = game.songs
    .filter((s) => s.artistId === a.id && s.status === "released")
    .sort((x, y) => y.streams - x.streams);

  return (
    <div className="h-full overflow-auto pb-4">
      <button className="px-4 text-sm text-white/45" onClick={() => setOverlay({ type: "spotify", tab: "home" })}>
        Back
      </button>
      <div className="mt-2 flex items-end gap-4 bg-linear-to-b from-white/15 to-transparent px-4 pb-4 pt-6">
        <ArtistAvatar spec={profile.avatar} size={96} />
        <div className="min-w-0 pb-1">
          {a.verified.spotify && (
            <p className="flex items-center gap-1 text-[11px] tracking-wide text-wave uppercase">
              <VerifiedBadge on className="text-wave" /> Verified artist
            </p>
          )}
          <h2 className="font-display text-3xl leading-none">{a.name}</h2>
        </div>
      </div>
      <div className="px-4">
        <p className="text-sm text-white/70">
          <span className="font-medium tabular-nums text-white">{compact(a.monthlyListeners)}</span> monthly listeners
          <span className="text-white/40"> · last 4 weeks of streams</span>
        </p>
        <p className="mt-1 text-xs text-white/40">
          @{profile.handle} · {compact(a.followers.youtube)} Spotify followers · {a.hometown}
        </p>
        <p className="mt-3 text-sm text-white/60">{profile.bio}</p>
        {!a.verified.spotify && roster.some((r) => r.id === a.id) ? (
          <p className="mt-2 text-xs text-white/40">Hit {compact(50000)} monthly, then apply in You / Settings.</p>
        ) : null}
        {roster.some((r) => r.id === a.id) ? (
          <button
            type="button"
            className="mt-3 min-h-11 rounded-md border border-white/15 px-3 text-sm"
            onClick={() => setOverlay({ type: "spotify", tab: "settings" })}
          >
            Settings
          </button>
        ) : null}
        <h3 className="mt-6 text-lg font-semibold">Popular</h3>
        {songs.length === 0 ? (
          <p className="mt-2 text-sm text-white/45">No releases on Spotify yet.</p>
        ) : (
          <ol className="mt-2 grid gap-2">
            {songs.slice(0, 8).map((s, i) => (
              <li key={s.id} className="flex items-center gap-3 text-sm">
                <span className="w-5 tabular-nums text-white/40">{i + 1}</span>
                <span className="min-w-0 flex-1 truncate">
                  {s.title}
                  {featName(game, s) ? <span className="text-white/45"> feat. {featName(game, s)}</span> : null}
                </span>
                <span className="tabular-nums text-white/40">{compact(s.streams)}</span>
              </li>
            ))}
          </ol>
        )}
        <h3 className="mt-6 text-lg font-semibold">Discography</h3>
        <ul className="mt-2 grid gap-2">
          {songs.map((s) => (
            <li key={s.id} className="flex items-center justify-between text-sm">
              <span>
                {s.title}
                {featName(game, s) ? <span className="text-white/45"> feat. {featName(game, s)}</span> : null}
                {s.chart ? <span className="ml-2 text-xs text-wave">#{s.chart}</span> : null}
              </span>
              <span className="text-xs text-white/40">{compact(s.streamsWeek)} /wk</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
