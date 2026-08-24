import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import {
  Bookmark,
  Heart,
  Home,
  MessageCircle,
  Music2,
  Plus,
  Search,
  Send,
  User,
} from "lucide-react";
import { FORMATS, HASHTAGS, genreLabel } from "@/lib/game/catalog";
import { compact, money } from "@/lib/game/format";
import { fypClips, playerSongs, profileOf, rosterOf } from "@/lib/game/sim";
import { useGame } from "@/lib/game/store";
import type { ClipFormat, TikTokClip, TikTokTab } from "@/lib/game/types";
import { cn } from "@/lib/utils";
import { ArtistAvatar } from "./ArtistAvatar";
import { ClipVisual } from "./ClipVisual";
import { Pill, PrimaryBtn } from "./bits";
import { VerifiedBadge } from "./VerifiedBadge";
import { ProfileEditor } from "./ProfileEditor";

export function TikTokApp() {
  const overlay = useGame((s) => s.overlay);
  const tab: TikTokTab = overlay.type === "tiktok" ? overlay.tab : "home";
  const setOverlay = useGame((s) => s.setOverlay);

  return (
    <div className="fixed inset-0 z-40 flex bg-bg/80">
      <button
        className="absolute top-3 left-3 z-50 hidden min-h-11 items-center rounded-md border border-border bg-surface px-3 text-sm md:inline-flex"
        onClick={() => setOverlay({ type: "none" })}
      >
        Back to HQ
      </button>
      <div className="mx-auto flex w-full max-w-6xl items-stretch justify-center gap-6 p-0 md:p-6">
        <Phone>
          {tab === "home" && <FYP />}
          {tab === "discover" && <Discover />}
          {tab === "create" && <Create />}
          {tab === "inbox" && <Inbox />}
          {tab === "profile" && <Profile />}
          {tab === "sound" && overlay.type === "tiktok" && overlay.soundId && (
            <SoundPage soundId={overlay.soundId} />
          )}
          {tab === "analytics" && overlay.type === "tiktok" && overlay.clipId && (
            <Analytics clipId={overlay.clipId} />
          )}
          {tab === "live" && <TikTokLive />}
          {tab === "settings" && (
            <div className="absolute inset-0 overflow-auto pb-20">
              <ProfileEditor platform="tiktok" dark />
            </div>
          )}
          <TikTokNav tab={tab} />
        </Phone>
        <aside className="hidden w-80 shrink-0 flex-col justify-center lg:flex">
          <h2 className="font-display text-3xl tracking-tight">TikTok</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Every clip is tested on a small For You slice. If watch-through and likes
            clear the bar, the page pushes wider. Sounds that get used become
            infrastructure — other creators finish the campaign for you.
          </p>
          <ul className="mt-5 grid gap-2 text-sm text-muted">
            <li>Hook in the first second</li>
            <li>Ride a trending sound or challenge</li>
            <li>Don't overpost — the page throttles spam</li>
            <li>Spark ads buy a luck bump, not a guarantee</li>
          </ul>
        </aside>
      </div>
    </div>
  );
}

function Phone({ children }: { children: ReactNode }) {
  const setOverlay = useGame((s) => s.setOverlay);
  return (
    <div className="relative mx-auto flex h-dvh w-full max-w-[420px] flex-col overflow-hidden bg-tok-bg text-tok-fg md:h-[min(844px,calc(100dvh-48px))] md:rounded-[2rem] md:border md:border-white/10 phone-bezel">
      <div className="flex items-center justify-between px-4 pt-3 pb-1 md:hidden">
        <button className="min-h-10 text-sm text-tok-muted" onClick={() => setOverlay({ type: "none" })}>
          Close
        </button>
        <span className="text-xs tracking-[0.2em] uppercase">TikTok</span>
        <span className="w-10" />
      </div>
      <div className="relative min-h-0 flex-1">{children}</div>
    </div>
  );
}

function TikTokNav({ tab }: { tab: TikTokTab }) {
  const setOverlay = useGame((s) => s.setOverlay);
  const items: { id: TikTokTab; label: string; icon: typeof Home }[] = [
    { id: "home", label: "Home", icon: Home },
    { id: "discover", label: "Discover", icon: Search },
    { id: "create", label: "Create", icon: Plus },
    { id: "inbox", label: "Inbox", icon: MessageCircle },
    { id: "profile", label: "Profile", icon: User },
  ];
  return (
    <nav className="absolute inset-x-0 bottom-0 z-30 flex border-t border-white/10 bg-black pb-[env(safe-area-inset-bottom)]">
      {items.map((it) => (
        <button
          key={it.id}
          onClick={() => setOverlay({ type: "tiktok", tab: it.id })}
          className={cn(
            "flex min-h-14 flex-1 flex-col items-center justify-center gap-0.5 text-[10px]",
            tab === it.id ? "text-white" : "text-tok-muted",
          )}
        >
          <it.icon className={cn("size-5", it.id === "create" && "rounded-md bg-white text-black p-0.5")} />
          {it.label}
        </button>
      ))}
    </nav>
  );
}

function FYP() {
  const game = useGame((s) => s.game)!;
  const clips = useMemo(() => fypClips(game), [game]);
  const feedIndex = useGame((s) => s.feedIndex);
  const setFeedIndex = useGame((s) => s.setFeedIndex);
  const scroller = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    const onScroll = () => {
      const i = Math.round(el.scrollTop / el.clientHeight);
      setFeedIndex(i);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [setFeedIndex]);

  if (clips.length === 0) {
    return <p className="p-6 text-sm text-tok-muted">The page is empty. Post something.</p>;
  }

  return (
    <div ref={scroller} className="fyp-scroller absolute inset-x-0 top-0 bottom-14 z-0">
      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex justify-center gap-4 bg-linear-to-b from-black/80 to-transparent pt-3 pb-10 text-sm font-medium">
        <span className="text-white/50">Following</span>
        <span className="border-b-2 border-white pb-0.5">For You</span>
      </div>
      {clips.slice(0, 18).map((clip, i) => (
        <Slide key={clip.id} clip={clip} active={i === feedIndex} />
      ))}
    </div>
  );
}

function Slide({ clip, active }: { clip: TikTokClip; active: boolean }) {
  const game = useGame((s) => s.game)!;
  const setOverlay = useGame((s) => s.setOverlay);
  const [liked, setLiked] = useState(false);
  const song = game.songs.find((s) => s.id === clip.songId);
  const sound = game.sounds.find((s) => s.id === clip.soundId);
  const artist = game.artists.find((a) => a.id === clip.artistId);
  const genre = song?.genre ?? artist?.genre ?? "pop";

  return (
    <section className="fyp-slide relative">
      <ClipVisual clip={clip} genre={genre} playing={active} title={sound?.name ?? "Original sound"} />
      <div className="absolute inset-x-0 bottom-16 z-10 flex items-end justify-between px-3 pb-2">
        <div className="min-w-0 flex-1 pr-3">
          <p className="font-medium">@{clip.creatorHandle}</p>
          <p className="mt-1 text-sm text-white/90">{clip.caption}</p>
          <p className="mt-1 text-xs text-white/60">
            {clip.hashtags.map((h) => `#${h}`).join(" ")}
          </p>
          <button
            className="mt-2 flex items-center gap-2 text-xs"
            onClick={() => setOverlay({ type: "tiktok", tab: "sound", soundId: clip.soundId })}
          >
            <Music2 className="size-3" />
            <span className="truncate">
              {sound?.name ?? "original"} · {clip.creatorName}
            </span>
          </button>
        </div>
        <div className="flex flex-col items-center gap-4">
          <ArtistAvatar spec={clip.avatar} size={44} className="ring-2 ring-white" />
          <Action
            icon={<Heart className={cn("size-7", liked && "fill-tok-like text-tok-like heart-pop")} />}
            n={clip.likes + (liked ? 1 : 0)}
            onClick={() => setLiked(true)}
          />
          <Action icon={<MessageCircle className="size-7" />} n={clip.comments} />
          <Action icon={<Bookmark className="size-7" />} n={clip.saves} />
          <Action icon={<Send className="size-7" />} n={clip.shares} />
          <div className="size-10 overflow-hidden rounded-full border-2 border-white">
            <div className={cn("clip-disc size-10 bg-linear-to-br from-tok-cyan to-tok-like", !active && "is-paused")} />
          </div>
          {clip.owned && (
            <button
              className="text-[10px] text-tok-cyan"
              onClick={() => setOverlay({ type: "tiktok", tab: "analytics", clipId: clip.id })}
            >
              Stats
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

function Action({ icon, n, onClick }: { icon: ReactNode; n: number; onClick?: () => void }) {
  return (
    <button onClick={onClick} className="flex flex-col items-center text-white">
      {icon}
      <span className="text-[11px] tabular-nums">{compact(n)}</span>
    </button>
  );
}

function Discover() {
  const game = useGame((s) => s.game)!;
  const setOverlay = useGame((s) => s.setOverlay);
  return (
    <div className="absolute inset-0 overflow-auto bg-tok-bg px-4 pt-4 pb-20">
      <h2 className="text-lg font-semibold">Discover</h2>
      <p className="mt-1 text-sm text-tok-muted">Sounds, challenges, hashtags — this week's heat.</p>
      <ul className="mt-4 grid gap-2">
        {game.trends.map((t) => (
          <li key={t.id}>
            <button
              className="flex w-full items-center justify-between rounded-lg bg-white/5 px-3 py-3 text-left"
              onClick={() => {
                if (t.soundId) setOverlay({ type: "tiktok", tab: "sound", soundId: t.soundId });
              }}
            >
              <span>
                <span className="block text-xs text-tok-muted uppercase">{t.kind}</span>
                <span className="font-medium">{t.name}</span>
              </span>
              <span className="tabular-nums text-sm text-tok-muted">{t.heat}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Create() {
  const game = useGame((s) => s.game)!;
  const overlay = useGame((s) => s.overlay);
  const tiktokPost = useGame((s) => s.tiktokPost);
  const roster = rosterOf(game);
  const preset = overlay.type === "tiktok" ? overlay.artistId : undefined;
  const [artistId, setArtistId] = useState(preset ?? roster[0]?.id ?? "");
  const songs = playerSongs(game).filter((s) => s.artistId === artistId);
  const [songId, setSongId] = useState(songs[0]?.id ?? "");
  const [format, setFormat] = useState<ClipFormat>("lipsync");
  const [tags, setTags] = useState<string[]>(["fyp", "newsound"]);
  const [spark, setSpark] = useState(0);
  const [filming, setFilming] = useState(false);

  useEffect(() => {
    const next = playerSongs(game).filter((s) => s.artistId === artistId);
    setSongId(next[0]?.id ?? "");
  }, [artistId, game]);

  const trendingSounds = game.sounds.filter((s) => s.trending);
  const [soundId, setSoundId] = useState<string>("");

  if (roster.length === 0) {
    return (
      <div className="absolute inset-0 grid place-items-center p-6 text-center text-sm text-tok-muted">
        {game.career === "artist" ? "Create a clip once you have a face on camera." : "Sign an artist before you can post."}
      </div>
    );
  }

  return (
    <div className="absolute inset-0 overflow-auto bg-tok-bg px-4 pt-4 pb-24">
      <h2 className="text-lg font-semibold">New clip</h2>
      <p className="text-sm text-tok-muted">Pick a face, a sound, a format. The page does the rest.</p>

      <label className="mt-4 block text-xs text-tok-muted">
        Artist
        <select
          className="mt-1 h-11 w-full rounded-md border border-white/10 bg-white/5 px-2 text-sm text-white"
          value={artistId}
          onChange={(e) => setArtistId(e.target.value)}
        >
          {roster.map((a) => (
            <option key={a.id} value={a.id} className="text-black">
              {a.name} · {genreLabel(a.genre)}
            </option>
          ))}
        </select>
      </label>

      <label className="mt-3 block text-xs text-tok-muted">
        Sound
        <select
          className="mt-1 h-11 w-full rounded-md border border-white/10 bg-white/5 px-2 text-sm text-white"
          value={soundId || songId}
          onChange={(e) => {
            const v = e.target.value;
            if (songs.some((s) => s.id === v)) {
              setSongId(v);
              setSoundId("");
            } else {
              setSoundId(v);
            }
          }}
        >
          {songs.map((s) => (
            <option key={s.id} value={s.id} className="text-black">
              {s.title} {s.status === "released" ? "" : `(${s.status})`}
            </option>
          ))}
          {trendingSounds.map((s) => (
            <option key={s.id} value={s.id} className="text-black">
              Trending · {s.name}
            </option>
          ))}
        </select>
      </label>

      <p className="mt-4 text-xs text-tok-muted">Format</p>
      <div className="mt-1 flex flex-wrap gap-2">
        {FORMATS.map((f) => (
          <button
            key={f.id}
            onClick={() => setFormat(f.id)}
            className={cn(
              "rounded-full px-3 py-1.5 text-xs",
              format === f.id ? "bg-white text-black" : "bg-white/10 text-white",
            )}
          >
            {f.label}
          </button>
        ))}
      </div>
      <p className="mt-2 text-xs text-tok-muted">{FORMATS.find((f) => f.id === format)?.hint}</p>

      <p className="mt-4 text-xs text-tok-muted">Hashtags</p>
      <div className="mt-1 flex flex-wrap gap-2">
        {HASHTAGS.slice(0, 10).map((h) => {
          const on = tags.includes(h);
          return (
            <button
              key={h}
              onClick={() =>
                setTags((t) => (on ? t.filter((x) => x !== h) : [...t, h].slice(0, 5)))
              }
              className={cn(
                "rounded-full px-3 py-1.5 text-xs",
                on ? "bg-white text-black" : "bg-white/10",
              )}
            >
              #{h}
            </button>
          );
        })}
      </div>

      <label className="mt-4 block text-xs text-tok-muted">
        Spark ads · {spark === 0 ? "off" : money(spark)}
        <input
          type="range"
          min={0}
          max={20000}
          step={500}
          value={spark}
          onChange={(e) => setSpark(Number(e.target.value))}
          className="mt-2 w-full"
        />
      </label>

      <PrimaryBtn
        className="mt-5 w-full"
        disabled={filming}
        onClick={() => {
          setFilming(true);
          window.setTimeout(() => {
            tiktokPost({
              artistId,
              songId: soundId ? null : songId || null,
              soundId: soundId || null,
              format,
              hashtags: tags,
              spark,
            });
            setFilming(false);
          }, 900);
        }}
      >
        {filming ? "Recording…" : "Post to For You"}
      </PrimaryBtn>
    </div>
  );
}

function Inbox() {
  const game = useGame((s) => s.game)!;
  return (
    <div className="absolute inset-0 overflow-auto bg-tok-bg px-4 pt-4 pb-20">
      <h2 className="text-lg font-semibold">Inbox</h2>
      {game.inbox.length === 0 ? (
        <p className="mt-4 text-sm text-tok-muted">Quiet. Post a clip.</p>
      ) : (
        <ul className="mt-4 grid gap-3">
          {game.inbox.map((m) => (
            <li key={m.id} className="rounded-lg bg-white/5 px-3 py-3">
              <p className="text-xs text-tok-muted">{m.from} · week {m.week}</p>
              <p className="text-sm">{m.text}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Profile() {
  const game = useGame((s) => s.game)!;
  const roster = rosterOf(game);
  const clips = game.clips.filter((c) => c.owned);
  const setOverlay = useGame((s) => s.setOverlay);
  const face = roster[0];
  const profile = face ? profileOf(face, "tiktok") : null;
  return (
    <div className="absolute inset-0 overflow-auto bg-tok-bg px-4 pt-4 pb-20">
      <div className="flex items-center gap-3">
        {profile ? <ArtistAvatar spec={profile.avatar} size={64} /> : null}
        <div>
          <h2 className="flex items-center gap-1.5 text-lg font-semibold">
            {face?.name ?? game.labelName}
            <VerifiedBadge on={face?.verified.tiktok} />
          </h2>
          <p className="text-sm text-tok-muted">
            {face && profile
              ? `@${profile.handle} · ${compact(face.followers.tiktok)} followers${face.verified.tiktok ? " · verified" : " · apply at 100k"}`
              : `Label account · ${roster.length} artists`}
          </p>
        </div>
      </div>
      {profile ? <p className="mt-2 text-sm text-white/70">{profile.bio}</p> : null}
      <div className="mt-3 flex flex-wrap gap-2">
        {face && (
          <PrimaryBtn onClick={() => useGame.getState().live(face.id, "tiktok")}>
            Go live
          </PrimaryBtn>
        )}
        <button
          type="button"
          className="min-h-11 rounded-md border border-white/15 px-3 text-sm"
          onClick={() => setOverlay({ type: "tiktok", tab: "settings" })}
        >
          Settings
        </button>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-1">
        {clips.map((c) => (
          <button
            key={c.id}
            className="aspect-[3/4] bg-white/5 p-2 text-left"
            onClick={() => setOverlay({ type: "tiktok", tab: "analytics", clipId: c.id })}
          >
            <p className="truncate text-[10px] text-tok-muted">@{c.creatorHandle}</p>
            <p className="text-xs tabular-nums">{compact(c.views)}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

function SoundPage({ soundId }: { soundId: string }) {
  const game = useGame((s) => s.game)!;
  const setOverlay = useGame((s) => s.setOverlay);
  const sound = game.sounds.find((s) => s.id === soundId);
  const clips = game.clips.filter((c) => c.soundId === soundId);
  if (!sound) return null;
  return (
    <div className="absolute inset-0 overflow-auto bg-tok-bg px-4 pt-4 pb-20">
      <button className="text-sm text-tok-muted" onClick={() => setOverlay({ type: "tiktok", tab: "home" })}>
        Back
      </button>
      <div className="mt-4 flex items-center gap-3">
        <div className="size-16 rounded-md bg-linear-to-br from-tok-cyan to-tok-like" />
        <div>
          <h2 className="font-semibold">{sound.name}</h2>
          <p className="text-sm text-tok-muted">
            {sound.artistName} · {compact(sound.uses)} uses
          </p>
          {sound.trending && <Pill tone="viral">Trending #{sound.trendRank}</Pill>}
        </div>
      </div>
      <PrimaryBtn
        className="mt-4 w-full"
        onClick={() => setOverlay({ type: "tiktok", tab: "create" })}
      >
        Use this sound
      </PrimaryBtn>
      <ul className="mt-4 grid gap-2">
        {clips.slice(0, 12).map((c) => (
          <li key={c.id} className="flex justify-between text-sm">
            <span>@{c.creatorHandle}</span>
            <span className="tabular-nums text-tok-muted">{compact(c.views)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Analytics({ clipId }: { clipId: string }) {
  const game = useGame((s) => s.game)!;
  const setOverlay = useGame((s) => s.setOverlay);
  const clip = game.clips.find((c) => c.id === clipId);
  if (!clip) return null;
  const stages = ["Test", "More FYP", "Out of circle", "Main feed", "Wide", "Runaway"];
  return (
    <div className="absolute inset-0 overflow-auto bg-tok-bg px-4 pt-4 pb-20">
      <button className="text-sm text-tok-muted" onClick={() => setOverlay({ type: "tiktok", tab: "home" })}>
        Back
      </button>
      <h2 className="mt-3 text-lg font-semibold">Analytics</h2>
      <p className="text-sm text-tok-muted">@{clip.creatorHandle}</p>
      <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
        <Stat n={compact(clip.views)} l="Views" />
        <Stat n={compact(clip.likes)} l="Likes" />
        <Stat n={`${Math.round(clip.completion * 100)}%`} l="Completion" />
        <Stat n={`${Math.round(clip.likeRate * 1000) / 10}%`} l="Like rate" />
        <Stat n={compact(clip.saves)} l="Saves" />
        <Stat n={compact(clip.soundUses)} l="Sound uses" />
      </div>
      <p className="mt-5 text-xs text-tok-muted">Reached</p>
      <p className="font-medium">{stages[clip.viralStage] ?? "Test"}</p>
      <p className="mt-3 text-sm text-tok-muted">
        The page keeps a clip in circulation when people finish it, tap like, and — for music —
        use the sound. Spark spend this clip: {clip.sparkSpend ? money(clip.sparkSpend) : "none"}.
      </p>
    </div>
  );
}

function Stat({ n, l }: { n: string; l: string }) {
  return (
    <div className="rounded-lg bg-white/5 px-3 py-2">
      <p className="font-display text-xl tabular-nums">{n}</p>
      <p className="text-xs text-tok-muted">{l}</p>
    </div>
  );
}

function TikTokLive() {
  const game = useGame((s) => s.game)!;
  const live = useGame((s) => s.live);
  const you = rosterOf(game)[0];
  return (
    <div className="absolute inset-0 grid place-items-center bg-tok-bg px-6 pb-20 text-center">
      <div>
        <p className="font-display text-3xl">LIVE</p>
        <p className="mt-2 text-sm text-tok-muted">
          Viewers scale with followers. Last: {compact(game.liveViewers.tiktok)} watching.
        </p>
        <PrimaryBtn className="mt-4" disabled={!you} onClick={() => you && live(you.id, "tiktok")}>
          Go live
        </PrimaryBtn>
      </div>
    </div>
  );
}
