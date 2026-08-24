import { useMemo, useState, type ReactNode } from "react";
import {
  Bell,
  Home,
  Play,
  Radio,
  Search,
  Share2,
  ThumbsDown,
  ThumbsUp,
  User,
  Video,
  X,
} from "lucide-react";
import { COMMENTS } from "@/lib/game/catalog";
import { compact } from "@/lib/game/format";
import { creditLine, featName, playerSongs, profileOf, rosterOf } from "@/lib/game/sim";
import { useGame } from "@/lib/game/store";
import type { Song, VideoKind, YtVideo } from "@/lib/game/types";
import { cn } from "@/lib/utils";
import { ArtistAvatar } from "./ArtistAvatar";
import { VerifiedBadge } from "./VerifiedBadge";
import { PrimaryBtn } from "./bits";
import { ProfileEditor } from "./ProfileEditor";

const KINDS: { id: VideoKind; label: string }[] = [
  { id: "traditional", label: "Official Video" },
  { id: "lyrics", label: "Official Audio" },
  { id: "makingOf", label: "Making of" },
  { id: "animation", label: "Animation" },
  { id: "performance", label: "Live / Performance" },
  { id: "general", label: "Vlog" },
];

const THUMBS = [
  "from-[#3a1818] via-[#1a1010] to-[#0f0f0f]",
  "from-[#18203a] via-[#10141a] to-[#0f0f0f]",
  "from-[#183a28] via-[#101a14] to-[#0f0f0f]",
  "from-[#3a2818] via-[#1a1410] to-[#0f0f0f]",
  "from-[#28183a] via-[#14101a] to-[#0f0f0f]",
];

const COVERS = ["#3a1818", "#18203a", "#183a28", "#3a2818", "#28183a", "#1a1a1a", "#3a3a18", "#183a3a"];

function dur(kind: VideoKind) {
  if (kind === "lyrics") return "2:58";
  if (kind === "makingOf") return "8:12";
  if (kind === "animation") return "3:41";
  if (kind === "performance") return "4:26";
  if (kind === "general") return "11:04";
  return "3:24";
}

function weeksAgo(week: number, now: number) {
  const d = Math.max(0, now - week);
  if (d <= 0) return "this week";
  if (d === 1) return "1 week ago";
  if (d < 52) return `${d} weeks ago`;
  return `${Math.floor(d / 52)}y ago`;
}

function kindLabel(kind: VideoKind) {
  return KINDS.find((k) => k.id === kind)?.label ?? "Video";
}

export function YouTubeApp() {
  const overlay = useGame((s) => s.overlay);
  const tab = overlay.type === "youtube" ? (overlay.tab ?? "home") : "home";
  const watching = overlay.type === "youtube" ? overlay.videoId : undefined;
  const setOverlay = useGame((s) => s.setOverlay);

  return (
    <div className="fixed inset-0 z-40 grid place-items-center bg-bg/80 p-0 md:p-6">
      <div className="flex h-dvh w-full max-w-[560px] flex-col bg-[#0f0f0f] text-white md:h-[min(844px,calc(100dvh-48px))] md:rounded-[2rem] md:border md:border-white/10 phone-bezel">
        <header className="flex items-center gap-2 px-3 py-2">
          <button className="min-h-10 shrink-0 text-sm text-white/50" onClick={() => setOverlay({ type: "none" })}>
            HQ
          </button>
          <button
            type="button"
            className="flex min-w-0 flex-1 items-center gap-1"
            onClick={() => setOverlay({ type: "youtube", tab: "home" })}
          >
            <Play className="size-5 fill-[#ff0000] text-[#ff0000]" />
            <p className="font-display text-lg tracking-tight">YouTube</p>
          </button>
          <button
            className="grid size-10 place-items-center text-white/70"
            onClick={() => setOverlay({ type: "youtube", tab: "search" })}
            aria-label="Search"
          >
            <Search className="size-4" />
          </button>
          <button className="grid size-10 place-items-center" onClick={() => setOverlay({ type: "none" })} aria-label="Close">
            <X className="size-4" />
          </button>
        </header>
        <div className="min-h-0 flex-1 overflow-hidden">
          {watching ? (
            <Watch videoId={watching} />
          ) : (
            <>
              {tab === "home" && <HomeFeed />}
              {tab === "search" && <YtSearch />}
              {tab === "shorts" && <Shorts />}
              {tab === "studio" && <Studio />}
              {tab === "channel" && <Channel />}
              {tab === "live" && <Live />}
              {tab === "settings" && (
                <div className="h-full overflow-auto">
                  <ProfileEditor platform="youtube" dark />
                </div>
              )}
            </>
          )}
        </div>
        <nav className="grid grid-cols-4 border-t border-white/10 pb-[env(safe-area-inset-bottom)]">
          {(
            [
              { id: "home" as const, label: "Home", icon: Home },
              { id: "shorts" as const, label: "Shorts", icon: Play },
              { id: "studio" as const, label: "Create", icon: Video },
              { id: "channel" as const, label: "You", icon: User },
            ] as const
          ).map((it) => (
            <button
              key={it.id}
              onClick={() => setOverlay({ type: "youtube", tab: it.id })}
              className={cn(
                "flex min-h-14 flex-col items-center justify-center gap-0.5 text-[10px]",
                tab === it.id && !watching ? "text-white" : "text-white/45",
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

function Thumb({ video, large, compact: mini }: { video: YtVideo; large?: boolean; compact?: boolean }) {
  return (
    <div
      className={cn(
        "relative overflow-hidden bg-linear-to-br",
        THUMBS[video.quality % THUMBS.length],
        large ? "aspect-video w-full" : mini ? "aspect-video w-40 shrink-0 rounded-lg" : "aspect-video w-full rounded-lg",
      )}
    >
      <div className="absolute inset-0 grid place-items-center">
        <span className="grid size-11 place-items-center rounded-full bg-black/55">
          <Play className="size-5 fill-white text-white" />
        </span>
      </div>
      <span className="absolute top-1.5 left-1.5 rounded bg-black/70 px-1.5 py-0.5 text-[10px] text-white/80">
        {kindLabel(video.kind)}
      </span>
      <span className="absolute right-1.5 bottom-1.5 rounded bg-black/80 px-1 text-[10px] tabular-nums">
        {dur(video.kind)}
      </span>
    </div>
  );
}

function Cover({ song, size = 56 }: { song: Song; size?: number }) {
  return (
    <div
      className="grid shrink-0 place-items-center rounded-md text-[10px] font-medium text-white/80"
      style={{ width: size, height: size, background: COVERS[song.cover % COVERS.length] }}
    >
      {song.kind === "album" ? "LP" : song.kind === "ep" ? "EP" : "SGL"}
    </div>
  );
}

function VideoCard({ video, layout = "feed" }: { video: YtVideo; layout?: "feed" | "row" | "grid" }) {
  const game = useGame((s) => s.game)!;
  const setOverlay = useGame((s) => s.setOverlay);
  const artist = game.artists.find((a) => a.id === video.artistId);
  const song = video.songId ? game.songs.find((s) => s.id === video.songId) : null;
  const feat = song ? featName(game, song) : null;
  const open = () => setOverlay({ type: "youtube", tab: "home", videoId: video.id, artistId: video.artistId });

  if (layout === "row") {
    return (
      <button type="button" className="grid w-full grid-cols-[9rem_1fr] gap-3 text-left" onClick={open}>
        <Thumb video={video} />
        <div className="min-w-0 py-0.5">
          <p className="line-clamp-2 text-sm font-medium leading-snug">{video.title}</p>
          <p className="mt-1 truncate text-xs text-white/50">
            {artist?.name}
            {feat ? ` · feat. ${feat}` : ""}
          </p>
          <p className="text-xs text-white/40">
            {compact(video.views)} views · {weeksAgo(video.week, game.week)}
          </p>
        </div>
      </button>
    );
  }

  if (layout === "grid") {
    return (
      <button type="button" className="text-left" onClick={open}>
        <Thumb video={video} />
        <p className="mt-1.5 line-clamp-2 text-xs font-medium leading-snug">{video.title}</p>
        <p className="text-[10px] text-white/40">{compact(video.views)} views</p>
      </button>
    );
  }

  return (
    <button type="button" className="w-full text-left" onClick={open}>
      <Thumb video={video} large />
      <div className="mt-2 flex gap-3">
        {artist && (
          <button
            type="button"
            className="shrink-0"
            onClick={(e) => {
              e.stopPropagation();
              setOverlay({ type: "youtube", tab: "channel", artistId: artist.id });
            }}
          >
            <ArtistAvatar spec={profileOf(artist, "youtube").avatar} size={36} />
          </button>
        )}
        <div className="min-w-0 flex-1">
          <p className="line-clamp-2 text-sm font-medium leading-snug">{video.title}</p>
          <p className="mt-0.5 truncate text-xs text-white/50">
            {artist?.name}
            {artist?.verified.youtube ? " · " : ""}
            {feat ? `feat. ${feat} · ` : ""}
            {compact(video.views)} views · {weeksAgo(video.week, game.week)}
          </p>
        </div>
      </div>
    </button>
  );
}

function HomeFeed() {
  const game = useGame((s) => s.game)!;
  const [chip, setChip] = useState("All");
  const chips = ["All", "Music", "Official Video", "Live", "Vlogs", "Mixes"] as const;
  const videos = useMemo(() => {
    let list = game.videos.slice().sort((a, b) => b.viewsWeek - a.viewsWeek || b.views - a.views);
    if (chip === "Music") list = list.filter((v) => v.songId);
    if (chip === "Official Video") list = list.filter((v) => v.kind === "traditional");
    if (chip === "Live") list = list.filter((v) => v.kind === "performance");
    if (chip === "Vlogs") list = list.filter((v) => v.kind === "general" || v.kind === "makingOf");
    return list;
  }, [game.videos, chip]);

  return (
    <div className="h-full overflow-auto pb-4">
      <div className="flex gap-2 overflow-x-auto px-3 py-2 text-xs">
        {chips.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setChip(c)}
            className={cn(
              "shrink-0 rounded-lg px-3 py-1.5",
              chip === c ? "bg-white text-black" : "bg-white/10 text-white/80",
            )}
          >
            {c}
          </button>
        ))}
      </div>
      {videos.length === 0 ? (
        <p className="mt-6 px-4 text-sm text-white/45">No videos on the platform yet. Create one from You → Create.</p>
      ) : (
        <ul className="grid gap-5">
          {videos.slice(0, 28).map((v) => (
            <li key={v.id}>
              <VideoCard video={v} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function YtSearch() {
  const game = useGame((s) => s.game)!;
  const setOverlay = useGame((s) => s.setOverlay);
  const [q, setQ] = useState("");
  const n = q.trim().toLowerCase();
  const channels = game.artists
    .filter((a) => !n || a.name.toLowerCase().includes(n) || a.handle.toLowerCase().includes(n))
    .slice()
    .sort((a, b) => b.followers.youtube - a.followers.youtube)
    .slice(0, 12);
  const videos = game.videos
    .filter((v) => {
      if (!n) return true;
      const a = game.artists.find((x) => x.id === v.artistId);
      return v.title.toLowerCase().includes(n) || (a?.name.toLowerCase().includes(n) ?? false);
    })
    .slice(0, 16);

  return (
    <div className="h-full overflow-auto px-3 pb-4">
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search YouTube"
        className="mt-2 h-11 w-full rounded-full bg-white/10 px-4 text-sm outline-none placeholder:text-white/35"
        autoFocus
      />
      <h2 className="mt-4 text-sm font-medium text-white/60">Channels</h2>
      <ul className="mt-2 grid gap-1">
        {channels.map((a) => {
          const p = profileOf(a, "youtube");
          const vids = game.videos.filter((v) => v.artistId === a.id).length;
          return (
            <li key={a.id}>
              <button
                type="button"
                className="flex w-full items-center gap-3 rounded-lg px-1 py-2 text-left hover:bg-white/5"
                onClick={() => setOverlay({ type: "youtube", tab: "channel", artistId: a.id })}
              >
                <ArtistAvatar spec={p.avatar} size={48} />
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-1 text-sm font-medium">
                    {a.name}
                    <VerifiedBadge on={a.verified.youtube} />
                  </span>
                  <span className="block text-xs text-white/45">
                    @{p.handle} · {compact(a.followers.youtube)} subscribers · {vids} videos
                  </span>
                </span>
                <span className="rounded-full bg-white px-3 py-1 text-xs text-black">View</span>
              </button>
            </li>
          );
        })}
      </ul>
      <h2 className="mt-5 text-sm font-medium text-white/60">Videos</h2>
      <ul className="mt-2 grid gap-3">
        {videos.map((v) => (
          <li key={v.id}>
            <VideoCard video={v} layout="row" />
          </li>
        ))}
      </ul>
    </div>
  );
}

function Shorts() {
  const game = useGame((s) => s.game)!;
  const clips = game.clips.slice(0, 18);
  return (
    <div className="h-full overflow-auto px-3 pb-4">
      <h2 className="py-2 font-display text-xl">Shorts</h2>
      {clips.length === 0 ? (
        <p className="text-sm text-white/45">No shorts yet. Post on TikTok and they leak here.</p>
      ) : (
        <div className="grid grid-cols-3 gap-1.5">
          {clips.map((c) => (
            <div key={c.id} className="relative aspect-[9/16] overflow-hidden rounded-md bg-linear-to-b from-[#2a1818] to-black">
              <p className="absolute inset-x-1 bottom-1 line-clamp-2 text-[10px] leading-tight">{c.caption}</p>
              <p className="absolute top-1 left-1 text-[10px] text-white/70">{compact(c.views)}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Studio() {
  const game = useGame((s) => s.game)!;
  const video = useGame((s) => s.video);
  const roster = rosterOf(game);
  const songs = playerSongs(game).filter((s) => s.status === "released");
  const [artistId, setArtistId] = useState(roster[0]?.id ?? "");
  const [songId, setSongId] = useState(songs[0]?.id ?? "");
  const [kind, setKind] = useState<VideoKind>("traditional");
  const [premium, setPremium] = useState(true);

  return (
    <div className="h-full overflow-auto px-4 pb-4">
      <h2 className="font-display text-xl">Create</h2>
      <p className="mt-1 text-sm text-white/50">Upload an official video, lyric video, or performance. Premium buys the crew.</p>
      <label className="mt-4 block text-xs text-white/45">
        Channel
        <select
          className="mt-1 h-11 w-full rounded-md border border-white/10 bg-white/5 px-2 text-sm"
          value={artistId}
          onChange={(e) => setArtistId(e.target.value)}
        >
          {roster.map((a) => (
            <option key={a.id} value={a.id} className="text-black">
              {a.name}
            </option>
          ))}
        </select>
      </label>
      <label className="mt-3 block text-xs text-white/45">
        Release
        <select
          className="mt-1 h-11 w-full rounded-md border border-white/10 bg-white/5 px-2 text-sm"
          value={songId}
          onChange={(e) => setSongId(e.target.value)}
        >
          {songs.map((s) => (
            <option key={s.id} value={s.id} className="text-black">
              {s.title}
              {featName(game, s) ? ` feat. ${featName(game, s)}` : ""}
            </option>
          ))}
        </select>
      </label>
      <div className="mt-3 flex flex-wrap gap-2">
        {KINDS.map((k) => (
          <button
            key={k.id}
            onClick={() => setKind(k.id)}
            className={cn("rounded-full px-3 py-1.5 text-xs", kind === k.id ? "bg-white text-black" : "bg-white/10")}
          >
            {k.label}
          </button>
        ))}
      </div>
      <button className="mt-3 text-sm text-white/70" onClick={() => setPremium((p) => !p)}>
        {premium ? "Professional crew · $28k+" : "Cheap hour · $4.5k"}
      </button>
      <PrimaryBtn className="mt-4 w-full" disabled={!artistId || !songId} onClick={() => artistId && songId && video(artistId, songId, kind, premium)}>
        Upload
      </PrimaryBtn>
    </div>
  );
}

function Channel() {
  const game = useGame((s) => s.game)!;
  const overlay = useGame((s) => s.overlay);
  const setOverlay = useGame((s) => s.setOverlay);
  const live = useGame((s) => s.live);
  const roster = rosterOf(game);
  const requested = overlay.type === "youtube" ? overlay.artistId : undefined;
  const you = roster[0];
  const a = game.artists.find((x) => x.id === requested) ?? you;
  const [shelf, setShelf] = useState<"home" | "videos" | "shorts" | "live" | "releases" | "playlists" | "about">("home");
  const [sort, setSort] = useState<"latest" | "popular">("latest");
  if (!a) return <p className="p-4 text-sm text-white/45">No channel.</p>;
  const profile = profileOf(a, "youtube");
  const mine = roster.some((r) => r.id === a.id);
  const videos = game.videos.filter((v) => v.artistId === a.id).sort((x, y) => y.views - x.views);
  const latest = [...videos].sort((x, y) => y.week - x.week)[0] ?? videos[0];
  const releases = game.songs
    .filter((s) => s.artistId === a.id && s.status === "released")
    .sort((x, y) => (y.releasedWeek ?? 0) - (x.releasedWeek ?? 0));
  const featuredOn = game.songs.filter((s) => s.collabArtistId === a.id && s.status === "released");
  const shorts = game.clips.filter((c) => c.artistId === a.id).slice(0, 12);
  const subs = a.followers.youtube;
  const channelViews = videos.reduce((n, v) => n + v.views, 0) || a.wikiViews || a.monthlyListeners;
  const sortedVideos =
    sort === "popular" ? videos : [...videos].sort((x, y) => y.week - x.week || y.views - x.views);

  const tabs = [
    { id: "home" as const, label: "Home" },
    { id: "videos" as const, label: "Videos" },
    { id: "shorts" as const, label: "Shorts" },
    { id: "live" as const, label: "Live" },
    { id: "releases" as const, label: "Releases" },
    { id: "playlists" as const, label: "Playlists" },
    { id: "about" as const, label: "About" },
  ];

  return (
    <div className="h-full overflow-auto pb-4">
      <div className={cn("h-28 bg-linear-to-r", THUMBS[a.avatar.accent % THUMBS.length])} />
      <div className="px-4">
        <div className="-mt-10 flex items-end gap-3">
          <ArtistAvatar spec={profile.avatar} size={88} className="ring-4 ring-[#0f0f0f]" />
          <div className="min-w-0 flex-1 pb-1">
            <p className="flex items-center gap-1 font-display text-2xl leading-none">
              {a.name}
              <VerifiedBadge on={a.verified.youtube} />
            </p>
            <p className="mt-1 text-xs text-white/50">@{profile.handle}</p>
          </div>
        </div>
        <p className="mt-2 text-xs text-white/50">
          {compact(subs)} subscribers · {videos.length} videos · {compact(channelViews)} views
        </p>
        <p className="mt-2 line-clamp-2 text-sm text-white/70">{profile.bio}</p>
        <p className="mt-1 text-xs text-white/40">
          {a.hometown}
          {a.verified.youtube ? " · Official Artist Channel" : ""}
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {mine ? (
            <>
              <button
                type="button"
                className="min-h-10 rounded-full bg-white/10 px-4 text-sm"
                onClick={() => setOverlay({ type: "youtube", tab: "settings" })}
              >
                Customize channel
              </button>
              <button
                type="button"
                className="min-h-10 rounded-full bg-white/10 px-4 text-sm"
                onClick={() => setOverlay({ type: "youtube", tab: "studio" })}
              >
                Manage videos
              </button>
              <button type="button" className="min-h-10 rounded-full bg-white px-4 text-sm text-black" onClick={() => live(a.id, "youtube")}>
                Go live
              </button>
            </>
          ) : (
            <>
              <button type="button" className="inline-flex min-h-10 items-center gap-1 rounded-full bg-white px-4 text-sm text-black">
                <Bell className="size-3.5" /> Subscribed
              </button>
              <button type="button" className="min-h-10 rounded-full bg-white/10 px-4 text-sm">
                Join
              </button>
            </>
          )}
        </div>
        <div className="mt-4 flex gap-1 overflow-x-auto border-b border-white/10">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setShelf(t.id)}
              className={cn(
                "min-h-11 shrink-0 px-3 text-sm",
                shelf === t.id ? "border-b-2 border-white font-medium" : "text-white/50",
              )}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 pt-4">
        {shelf === "home" && (
          <div className="grid gap-6">
            {latest ? (
              <button
                type="button"
                className="text-left"
                onClick={() => setOverlay({ type: "youtube", tab: "channel", videoId: latest.id, artistId: a.id })}
              >
                <Thumb video={latest} large />
                <p className="mt-2 text-sm font-medium">{latest.title}</p>
                <p className="text-xs text-white/45">
                  {compact(latest.views)} views · {weeksAgo(latest.week, game.week)}
                </p>
              </button>
            ) : (
              <p className="text-sm text-white/45">{mine ? "Upload from Create." : "This channel has no videos yet."}</p>
            )}
            {videos.length > 0 && (
              <Shelf title="Videos" onMore={() => setShelf("videos")}>
                {videos.slice(0, 8).map((v) => (
                  <button
                    key={v.id}
                    type="button"
                    className="w-40 shrink-0 text-left"
                    onClick={() => setOverlay({ type: "youtube", tab: "channel", videoId: v.id, artistId: a.id })}
                  >
                    <Thumb video={v} compact />
                    <p className="mt-1 line-clamp-2 text-xs">{v.title}</p>
                  </button>
                ))}
              </Shelf>
            )}
            {shorts.length > 0 && (
              <Shelf title="Shorts" onMore={() => setShelf("shorts")}>
                {shorts.map((c) => (
                  <div key={c.id} className="relative h-44 w-28 shrink-0 overflow-hidden rounded-lg bg-linear-to-b from-[#2a1818] to-black">
                    <p className="absolute inset-x-1 bottom-1 line-clamp-2 text-[10px]">{c.caption}</p>
                  </div>
                ))}
              </Shelf>
            )}
            {releases.length > 0 && (
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-sm font-medium">Releases</p>
                  <button type="button" className="text-xs text-white/45" onClick={() => setShelf("releases")}>
                    View all
                  </button>
                </div>
                <ul className="grid gap-2">
                  {releases.slice(0, 4).map((s) => (
                    <ReleaseRow key={s.id} song={s} artistId={a.id} />
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
        {shelf === "videos" && (
          <div>
            <div className="mb-3 flex gap-2">
              {(["latest", "popular"] as const).map((id) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setSort(id)}
                  className={cn("rounded-full px-3 py-1.5 text-xs capitalize", sort === id ? "bg-white text-black" : "bg-white/10")}
                >
                  {id}
                </button>
              ))}
            </div>
            {sortedVideos.length === 0 ? (
              <p className="text-sm text-white/45">No uploads yet.</p>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                {sortedVideos.map((v) => (
                  <VideoCard key={v.id} video={v} layout="grid" />
                ))}
              </div>
            )}
          </div>
        )}
        {shelf === "shorts" && (
          shorts.length === 0 ? (
            <p className="text-sm text-white/45">No shorts on this channel.</p>
          ) : (
            <div className="grid grid-cols-3 gap-1.5">
              {shorts.map((c) => (
                <div key={c.id} className="relative aspect-[9/16] overflow-hidden rounded-md bg-linear-to-b from-[#2a1818] to-black">
                  <p className="absolute inset-x-1 bottom-1 line-clamp-2 text-[10px]">{c.caption}</p>
                </div>
              ))}
            </div>
          )
        )}
        {shelf === "live" && (
          <div className="grid place-items-center py-10 text-center">
            <Radio className="size-8 text-[#ff0000]" />
            <p className="mt-3 text-sm text-white/60">
              {mine ? `Last stream: ${compact(game.liveViewers.youtube)} watching.` : "No live streams right now."}
            </p>
            {mine ? (
              <PrimaryBtn className="mt-4" onClick={() => live(a.id, "youtube")}>
                Start stream
              </PrimaryBtn>
            ) : null}
          </div>
        )}
        {shelf === "releases" && (
          <div className="grid gap-5">
            <div>
              <p className="mb-2 text-sm font-medium">Singles & albums</p>
              {releases.length === 0 ? (
                <p className="text-sm text-white/45">No official releases yet.</p>
              ) : (
                <ul className="grid gap-2">
                  {releases.map((s) => (
                    <ReleaseRow key={s.id} song={s} artistId={a.id} />
                  ))}
                </ul>
              )}
            </div>
            {featuredOn.length > 0 && (
              <div>
                <p className="mb-2 text-sm font-medium">Appears on</p>
                <ul className="grid gap-2">
                  {featuredOn.map((s) => (
                    <ReleaseRow key={s.id} song={s} artistId={s.artistId} asFeature />
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
        {shelf === "playlists" && (
          <ul className="grid gap-2">
            {[
              { name: "Official Videos", count: videos.filter((v) => v.kind === "traditional").length },
              { name: "Audio", count: videos.filter((v) => v.kind === "lyrics").length },
              { name: "Live", count: videos.filter((v) => v.kind === "performance").length },
              { name: "Uploads", count: videos.length },
            ]
              .filter((p) => p.count > 0)
              .map((p) => (
                <li key={p.name} className="flex items-center justify-between rounded-lg bg-white/5 px-3 py-3 text-sm">
                  <span>{p.name}</span>
                  <span className="text-xs text-white/45">{p.count} videos</span>
                </li>
              ))}
            {videos.length === 0 ? <p className="text-sm text-white/45">Playlists appear after you upload.</p> : null}
          </ul>
        )}
        {shelf === "about" && (
          <div className="grid gap-3 text-sm text-white/70">
            <p>{profile.bio}</p>
            <div className="rounded-lg bg-white/5 px-3 py-3 text-xs text-white/55">
              <p>Joined week 1</p>
              <p className="mt-1">{compact(channelViews)} views</p>
              <p className="mt-1">
                {a.hometown} · {a.nationality}
              </p>
              <p className="mt-1">{compact(subs)} subscribers</p>
            </div>
            {!a.verified.youtube && mine ? (
              <p className="text-xs text-white/40">Hit 100k subscribers, then apply in Customize channel.</p>
            ) : null}
            <button
              type="button"
              className="text-left text-xs text-white/45"
              onClick={() => setOverlay({ type: "wiki", artistId: a.id })}
            >
              Open wiki
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function Shelf({ title, onMore, children }: { title: string; onMore: () => void; children: ReactNode }) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <p className="text-sm font-medium">{title}</p>
        <button type="button" className="text-xs text-white/45" onClick={onMore}>
          View all
        </button>
      </div>
      <div className="flex gap-2 overflow-x-auto pb-1">{children}</div>
    </div>
  );
}

function ReleaseRow({ song, artistId, asFeature }: { song: Song; artistId: string; asFeature?: boolean }) {
  const game = useGame((s) => s.game)!;
  const setOverlay = useGame((s) => s.setOverlay);
  const feat = featName(game, song);
  const clip = game.videos.find((v) => v.songId === song.id);
  const host = game.artists.find((x) => x.id === song.artistId);
  return (
    <button
      type="button"
      disabled={!clip}
      className="flex w-full items-center gap-3 rounded-lg bg-white/5 px-2 py-2 text-left disabled:opacity-50"
      onClick={() => clip && setOverlay({ type: "youtube", tab: "channel", videoId: clip.id, artistId })}
    >
      <Cover song={song} />
      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm">{song.title}</span>
        <span className="text-xs text-white/45">
          {asFeature ? `${host?.name ?? ""} · ` : ""}
          {feat && !asFeature ? `feat. ${feat} · ` : ""}
          {song.kind === "album" ? "Album" : song.kind === "ep" ? "EP" : "Single"}
          {song.chart ? ` · #${song.chart}` : ""} · {compact(song.streams)} streams
        </span>
      </span>
      <Play className="size-4 shrink-0 text-white/50" />
    </button>
  );
}

function Watch({ videoId }: { videoId: string }) {
  const game = useGame((s) => s.game)!;
  const setOverlay = useGame((s) => s.setOverlay);
  const video = game.videos.find((v) => v.id === videoId);
  if (!video) return <p className="p-4 text-sm text-white/45">Video gone.</p>;
  const artist = game.artists.find((a) => a.id === video.artistId);
  const song = video.songId ? game.songs.find((s) => s.id === video.songId) : null;
  const feat = song ? featName(game, song) : null;
  const related = game.videos.filter((v) => v.id !== video.id).slice(0, 8);
  const comments = COMMENTS.slice(0, 5).map((c, i) => ({
    id: `${video.id}_${i}`,
    text: c,
    likes: Math.max(4, Math.round((video.likes / 40) * (0.3 + ((i + 3) % 5) / 8))),
  }));
  return (
    <div className="h-full overflow-auto pb-4">
      <Thumb video={video} large />
      <div className="px-4 pt-3">
        <h2 className="text-base font-medium leading-snug">{video.title}</h2>
        <p className="mt-1 text-xs text-white/45">
          {compact(video.views)} views · {weeksAgo(video.week, game.week)}
        </p>
        <button
          type="button"
          className="mt-3 flex w-full items-center gap-3 text-left"
          onClick={() => artist && setOverlay({ type: "youtube", tab: "channel", artistId: artist.id })}
        >
          {artist && <ArtistAvatar spec={profileOf(artist, "youtube").avatar} size={40} />}
          <span className="min-w-0 flex-1">
            <span className="flex items-center gap-1 text-sm font-medium">
              {artist?.name}
              <VerifiedBadge on={artist?.verified.youtube} />
            </span>
            <span className="text-xs text-white/45">{compact(artist?.followers.youtube ?? 0)} subscribers</span>
          </span>
          <span className="rounded-full bg-white px-3 py-1.5 text-xs text-black">Subscribe</span>
        </button>
        <div className="mt-3 flex gap-2 overflow-x-auto text-xs text-white/70">
          <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1.5">
            <ThumbsUp className="size-3.5" /> {compact(video.likes)}
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1.5">
            <ThumbsDown className="size-3.5" />
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1.5">
            <Share2 className="size-3.5" /> Share
          </span>
          {feat ? <span className="rounded-full bg-white/10 px-3 py-1.5">feat. {feat}</span> : null}
          <span className="rounded-full bg-white/10 px-3 py-1.5">{kindLabel(video.kind)}</span>
        </div>
        <div className="mt-3 rounded-xl bg-white/8 px-3 py-2 text-sm text-white/70">
          {song ? (
            <>
              <p>
                {kindLabel(video.kind)} for “{song.title}” · {creditLine(game, song)}
              </p>
              <p className="mt-1 text-xs text-white/45">
                {compact(song.streams)} streams
                {song.chart ? ` · Billboard #${song.chart}` : ""}
              </p>
            </>
          ) : (
            <p>{artist?.name} on YouTube.</p>
          )}
        </div>
        <p className="mt-4 text-sm font-medium">{compact(video.comments || comments.length)} comments</p>
        <ul className="mt-2 grid gap-3">
          {comments.map((c) => (
            <li key={c.id} className="text-sm">
              <p className="text-white/80">{c.text}</p>
              <p className="mt-0.5 text-[11px] text-white/35">{compact(c.likes)} likes</p>
            </li>
          ))}
        </ul>
        <p className="mt-5 text-sm font-medium">Up next</p>
        <ul className="mt-2 grid gap-3">
          {related.map((v) => (
            <li key={v.id}>
              <VideoCard video={v} layout="row" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Live() {
  const game = useGame((s) => s.game)!;
  const live = useGame((s) => s.live);
  const you = rosterOf(game)[0];
  return (
    <div className="grid h-full place-items-center px-6 text-center">
      <div>
        <Radio className="mx-auto size-8 text-[#ff0000]" />
        <p className="mt-3 font-display text-2xl">Go live</p>
        <p className="mt-2 text-sm text-white/50">
          Viewers ≈ subscribers × 1–6%. Last stream: {compact(game.liveViewers.youtube)} watching.
        </p>
        <PrimaryBtn className="mt-4" disabled={!you} onClick={() => you && live(you.id, "youtube")}>
          Start stream
        </PrimaryBtn>
      </div>
    </div>
  );
}
