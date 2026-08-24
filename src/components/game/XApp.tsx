import { useMemo, useState } from "react";
import {
  Bell,
  Home,
  Mail,
  Search,
  User,
  Repeat2,
  Heart,
  MessageCircle,
  X,
} from "lucide-react";
import { compact, money } from "@/lib/game/format";
import { creditLine, featureFeeFor, playerSongs, profileOf, rosterOf } from "@/lib/game/sim";
import { useGame } from "@/lib/game/store";
import type { XTab } from "@/lib/game/types";
import { cn } from "@/lib/utils";
import { ArtistAvatar } from "./ArtistAvatar";
import { VerifiedBadge } from "./VerifiedBadge";
import { PrimaryBtn } from "./bits";
import { ProfileEditor } from "./ProfileEditor";

export function XApp() {
  const overlay = useGame((s) => s.overlay);
  const tab: XTab = overlay.type === "x" ? (overlay.tab ?? "home") : "home";
  const setOverlay = useGame((s) => s.setOverlay);

  return (
    <div className="fixed inset-0 z-40 grid place-items-center bg-bg/80 p-0 md:p-6">
      <div className="flex h-dvh w-full max-w-[480px] flex-col bg-[#000] text-[#e7e9ea] md:h-[min(844px,calc(100dvh-48px))] md:rounded-[2rem] md:border md:border-white/10 phone-bezel">
        <header className="flex items-center justify-between border-b border-white/10 px-4 py-3">
          <button className="min-h-10 text-sm text-white/50" onClick={() => setOverlay({ type: "none" })}>
            HQ
          </button>
          <p className="font-display text-lg tracking-tight">X</p>
          <button
            className="grid size-10 place-items-center"
            onClick={() => setOverlay({ type: "none" })}
            aria-label="Close"
          >
            <X className="size-4" />
          </button>
        </header>
        <div className="min-h-0 flex-1 overflow-hidden">
          {tab === "home" && <HomeFeed />}
          {tab === "explore" && <Explore />}
          {tab === "alerts" && <Alerts />}
          {tab === "messages" && <Messages />}
          {tab === "profile" && <Profile />}
          {tab === "live" && <XLive />}
          {tab === "settings" && (
            <div className="h-full overflow-auto">
              <ProfileEditor platform="x" dark />
            </div>
          )}
        </div>
        <XNav tab={tab} />
      </div>
    </div>
  );
}

function XNav({ tab }: { tab: XTab }) {
  const setOverlay = useGame((s) => s.setOverlay);
  const game = useGame((s) => s.game);
  const alerts = game?.xAlerts.length ?? 0;
  const dms = (game?.features ?? []).filter((f) => f.status === "open" && (f.incoming || f.hopOn)).length;
  const items: { id: XTab; label: string; icon: typeof Home }[] = [
    { id: "home", label: "Home", icon: Home },
    { id: "explore", label: "Explore", icon: Search },
    { id: "alerts", label: "Alerts", icon: Bell },
    { id: "messages", label: "Messages", icon: Mail },
    { id: "profile", label: "Profile", icon: User },
  ];
  return (
    <nav className="grid grid-cols-5 border-t border-white/10 pb-[env(safe-area-inset-bottom)]">
      {items.map((it) => (
        <button
          key={it.id}
          onClick={() => setOverlay({ type: "x", tab: it.id })}
          className={cn(
            "relative flex min-h-14 flex-col items-center justify-center gap-0.5 text-[10px]",
            tab === it.id ? "text-white" : "text-white/45",
          )}
        >
          <it.icon className="size-5" />
          {it.label}
          {it.id === "alerts" && alerts > 0 && (
            <span className="absolute top-2 right-5 size-1.5 rounded-full bg-pulse-check" />
          )}
          {it.id === "messages" && dms > 0 && (
            <span className="absolute top-2 right-4 min-w-4 rounded-full bg-pulse-check px-1 text-[9px] text-black">
              {dms}
            </span>
          )}
        </button>
      ))}
    </nav>
  );
}

function HomeFeed() {
  const game = useGame((s) => s.game)!;
  const xPost = useGame((s) => s.xPost);
  const roster = rosterOf(game);
  const [artistId, setArtistId] = useState(roster[0]?.id ?? "");
  const [text, setText] = useState("");
  const feed = useMemo(() => game.xPosts, [game.xPosts]);

  return (
    <div className="flex h-full flex-col">
      <div className="flex border-b border-white/10 text-sm">
        <span className="flex-1 border-b-2 border-white py-3 text-center font-medium">For you</span>
        <span className="flex-1 py-3 text-center text-white/40">Following</span>
      </div>
      <form
        className="border-b border-white/10 p-3"
        onSubmit={(e) => {
          e.preventDefault();
          if (!artistId) return;
          xPost(artistId, text);
          setText("");
        }}
      >
        {roster.length === 0 ? (
          <p className="text-sm text-white/45">Sign someone to post.</p>
        ) : (
          <>
            {roster.length > 1 && (
              <select
                className="mb-2 h-10 w-full rounded-md border border-white/10 bg-white/5 px-2 text-sm"
                value={artistId}
                onChange={(e) => setArtistId(e.target.value)}
              >
                {roster.map((a) => (
                  <option key={a.id} value={a.id} className="text-black">
                    Post as {a.name}
                  </option>
                ))}
              </select>
            )}
            <div className="flex gap-3">
              {roster[0] && <ArtistAvatar spec={roster.find((a) => a.id === artistId)?.avatar ?? roster[0].avatar} size={40} />}
              <div className="min-w-0 flex-1">
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  maxLength={280}
                  placeholder="What's happening"
                  className="h-16 w-full resize-none bg-transparent text-sm outline-none"
                />
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-white/35">{280 - text.length}</span>
                  <PrimaryBtn type="submit" className="h-9 min-h-9 rounded-full px-4">
                    Post
                  </PrimaryBtn>
                </div>
              </div>
            </div>
          </>
        )}
      </form>
      <div className="min-h-0 flex-1 overflow-auto">
        {feed.map((p) => (
          <article key={p.id} className="flex gap-3 border-b border-white/10 px-4 py-3">
            <ArtistAvatar spec={p.avatar} size={40} />
            <div className="min-w-0 flex-1">
              <p className="flex flex-wrap items-center gap-1 text-sm">
                <span className="font-medium">{p.name}</span>
                <VerifiedBadge on={p.verified} />
                <span className="text-white/40">@{p.handle}</span>
                <span className="text-white/30">· w{p.week}</span>
              </p>
              <p className="mt-1 text-sm leading-relaxed">{p.text}</p>
              <div className="mt-2 flex gap-6 text-xs text-white/40">
                <span className="inline-flex items-center gap-1">
                  <MessageCircle className="size-3.5" /> {compact(p.replies)}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Repeat2 className="size-3.5" /> {compact(p.reposts)}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Heart className="size-3.5" /> {compact(p.likes)}
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function Explore() {
  const game = useGame((s) => s.game)!;
  const hot = game.songs
    .filter((s) => s.chart != null)
    .sort((a, b) => (a.chart ?? 99) - (b.chart ?? 99))
    .slice(0, 12);
  const radio = game.songs
    .filter((s) => s.radioChart != null)
    .sort((a, b) => (a.radioChart ?? 99) - (b.radioChart ?? 99))
    .slice(0, 6);

  return (
    <div className="h-full overflow-auto px-4 py-4">
      <div className="rounded-xl bg-white/5 px-3 py-2 text-sm text-white/45">Search X</div>
      <h2 className="mt-5 text-lg font-semibold">Trending</h2>
      <ul className="mt-2 grid gap-1">
        {game.trends.slice(0, 6).map((t, i) => (
          <li key={t.id} className="rounded-lg px-1 py-2">
            <p className="text-[11px] text-white/40">
              {t.kind} · trending #{i + 1}
            </p>
            <p className="font-medium">{t.name}</p>
            <p className="text-xs text-white/40">{t.heat}k talking</p>
          </li>
        ))}
      </ul>
      <h2 className="mt-6 text-lg font-semibold">Billboard 100</h2>
      <ul className="mt-2 grid gap-2">
        {hot.map((s) => {
          return (
            <li key={s.id} className="flex items-center gap-3 text-sm">
              <span className="w-6 tabular-nums text-white/40">#{s.chart}</span>
              <span className="min-w-0 flex-1 truncate">
                {s.title}
                <span className="text-white/40"> · {creditLine(game, s)}</span>
              </span>
            </li>
          );
        })}
      </ul>
      <h2 className="mt-6 text-lg font-semibold">Radio</h2>
      <ul className="mt-2 grid gap-2 pb-6">
        {radio.map((s) => {
          const a = game.artists.find((x) => x.id === s.artistId);
          return (
            <li key={s.id} className="flex items-center gap-3 text-sm">
              <span className="w-6 tabular-nums text-white/40">#{s.radioChart}</span>
              <span className="min-w-0 flex-1 truncate">
                {s.title}
                <span className="text-white/40"> · {a?.name}</span>
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function Alerts() {
  const game = useGame((s) => s.game)!;
  return (
    <div className="h-full overflow-auto">
      <h2 className="px-4 py-3 text-lg font-semibold">Notifications</h2>
      {game.xAlerts.length === 0 ? (
        <p className="px-4 text-sm text-white/45">Quiet. Post, then wait for the timeline to move.</p>
      ) : (
        <ul>
          {game.xAlerts.map((a) => (
            <li key={a.id} className="border-b border-white/10 px-4 py-3">
              <p className="text-[11px] tracking-wide text-white/40 uppercase">{a.kind}</p>
              <p className="mt-1 text-sm">{a.text}</p>
              <p className="mt-1 text-xs text-white/35">@{a.handle} · week {a.week}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Messages() {
  const overlay = useGame((s) => s.overlay);
  const threadId = overlay.type === "x" ? overlay.threadId : undefined;
  if (threadId) return <Thread artistId={threadId} />;
  return <Inbox />;
}

function Inbox() {
  const game = useGame((s) => s.game)!;
  const setOverlay = useGame((s) => s.setOverlay);
  const you = rosterOf(game)[0];
  const [q, setQ] = useState("");
  const n = q.trim().toLowerCase();
  const threads = useMemo(() => {
    const map = new Map<string, (typeof game.xMessages)[number]>();
    for (const m of game.xMessages) {
      const id = m.artistId;
      if (!id || id === you?.id) continue;
      if (!map.has(id)) map.set(id, m);
    }
    return [...map.values()];
  }, [game.xMessages, you?.id]);
  const artists = game.artists
    .filter((a) => a.id !== you?.id)
    .filter((a) => !n || a.name.toLowerCase().includes(n) || a.handle.toLowerCase().includes(n))
    .slice()
    .sort((a, b) => b.popularity - a.popularity);

  return (
    <div className="flex h-full flex-col">
      <h2 className="px-4 py-3 text-lg font-semibold">Messages</h2>
      <p className="px-4 text-xs text-white/40">DM any artist. Open a thread and attach a single to lock the feature.</p>
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search people"
        className="mx-4 mt-2 h-10 rounded-md border border-white/10 bg-white/5 px-3 text-sm outline-none"
      />
      <div className="min-h-0 flex-1 overflow-auto">
        {n && (
          <ul className="border-b border-white/10">
            {artists.slice(0, 12).map((a) => {
              const p = profileOf(a, "x");
              return (
                <li key={a.id}>
                  <button
                    type="button"
                    className="flex w-full items-center gap-3 px-4 py-3 text-left"
                    onClick={() => setOverlay({ type: "x", tab: "messages", threadId: a.id })}
                  >
                    <ArtistAvatar spec={p.avatar} size={40} />
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-medium">{a.name}</span>
                      <span className="text-xs text-white/40">
                        @{p.handle} · pop {Math.round(a.popularity)} · {money(featureFeeFor(a))}
                      </span>
                    </span>
                    <span className="text-xs text-[#6cb3d4]">New chat</span>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
        {threads.length === 0 && !n ? (
          <p className="px-4 py-6 text-sm text-white/45">
            No DMs yet. Search an artist above — stars and prospects both hop on singles from this inbox.
          </p>
        ) : (
          <ul>
            {threads.map((m) => {
              const offer = m.offerId ? game.features.find((f) => f.id === m.offerId) : null;
              const open = offer && offer.status === "open";
              return (
                <li key={m.id}>
                  <button
                    type="button"
                    className="flex w-full items-center gap-3 border-b border-white/10 px-4 py-3 text-left"
                    onClick={() => m.artistId && setOverlay({ type: "x", tab: "messages", threadId: m.artistId })}
                  >
                    <ArtistAvatar spec={m.avatar} size={40} />
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center gap-2 text-sm font-medium">
                        {m.from}
                        {open ? <span className="text-[10px] tracking-wide text-[#6cb3d4] uppercase">collab</span> : null}
                      </span>
                      <span className="line-clamp-1 text-xs text-white/50">{m.text}</span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}

function Thread({ artistId }: { artistId: string }) {
  const game = useGame((s) => s.game)!;
  const setOverlay = useGame((s) => s.setOverlay);
  const dm = useGame((s) => s.dm);
  const replyFeature = useGame((s) => s.replyFeature);
  const askFeature = useGame((s) => s.askFeature);
  const them = game.artists.find((a) => a.id === artistId);
  const you = rosterOf(game)[0];
  const [text, setText] = useState("");
  const [songId, setSongId] = useState("");
  const songs = playerSongs(game).filter((s) => !s.collabArtistId);
  const msgs = game.xMessages.filter((m) => m.artistId === artistId).slice().reverse();
  if (!them) return <p className="p-4 text-sm text-white/45">They left.</p>;
  const p = profileOf(them, "x");

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-2 border-b border-white/10 px-3 py-2">
        <button
          type="button"
          className="min-h-10 px-2 text-sm text-white/50"
          onClick={() => setOverlay({ type: "x", tab: "messages" })}
        >
          Inbox
        </button>
        <ArtistAvatar spec={p.avatar} size={32} />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium">{them.name}</p>
          <p className="text-[11px] text-white/40">@{p.handle} · pop {Math.round(them.popularity)}</p>
        </div>
      </div>
      <div className="min-h-0 flex-1 overflow-auto px-4 py-3">
        {msgs.length === 0 ? (
          <p className="text-sm text-white/45">Start the collab conversation. Attach a single to lock the verse.</p>
        ) : (
          <ul className="grid gap-3">
            {msgs.map((m) => {
              const offer = m.offerId ? game.features.find((f) => f.id === m.offerId) : null;
              return (
                <li key={m.id} className={cn("max-w-[85%] rounded-2xl px-3 py-2 text-sm", m.outgoing ? "ml-auto bg-white/15" : "bg-white/8")}>
                  <p className="text-[11px] text-white/40">{m.outgoing ? "You" : m.from}</p>
                  <p className="mt-0.5 text-white/90">{m.text}</p>
                  {offer && offer.status === "open" && (offer.incoming || offer.hopOn) ? (
                    <div className="mt-2 flex flex-wrap gap-2">
                      <PrimaryBtn onClick={() => replyFeature(offer.id, true)}>
                        {offer.hopOn ? "Put them on it" : `Take the verse · ${money(offer.fee)}`}
                      </PrimaryBtn>
                      <button
                        type="button"
                        className="min-h-11 rounded-md border border-white/15 px-3 text-sm"
                        onClick={() => replyFeature(offer.id, false)}
                      >
                        Pass
                      </button>
                    </div>
                  ) : null}
                </li>
              );
            })}
          </ul>
        )}
      </div>
      <form
        className="border-t border-white/10 px-3 py-3"
        onSubmit={(e) => {
          e.preventDefault();
          if (songId) {
            askFeature(songId, them.id);
            if (text.trim()) dm(them.id, text, null);
            setText("");
            setSongId("");
            return;
          }
          dm(them.id, text, null);
          setText("");
        }}
      >
        <p className="text-[11px] text-white/40">Attach a single to pay or split — the verse locks in this thread.</p>
        <select
          className="mt-2 h-10 w-full rounded-md border border-white/10 bg-white/5 px-2 text-sm"
          value={songId}
          onChange={(e) => setSongId(e.target.value)}
        >
          <option value="" className="text-black">
            Just a message
          </option>
          {songs.map((s) => (
            <option key={s.id} value={s.id} className="text-black">
              Feature on “{s.title}” · {money(featureFeeFor(them))} or split
            </option>
          ))}
        </select>
        {songs.length === 0 ? (
          <p className="mt-2 text-xs text-white/40">Book a single in Studio first, then attach it here.</p>
        ) : null}
        <div className="mt-2 flex gap-2">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={songId ? "Need you on this one" : "Write a DM"}
            className="h-11 flex-1 rounded-md border border-white/10 bg-white/5 px-3 text-sm outline-none"
          />
          <PrimaryBtn type="submit" disabled={!you}>
            {songId ? "Lock verse" : "Send"}
          </PrimaryBtn>
        </div>
      </form>
    </div>
  );
}

function Profile() {
  const game = useGame((s) => s.game)!;
  const roster = rosterOf(game);
  const [artistId, setArtistId] = useState(roster[0]?.id ?? "");
  const a = game.artists.find((x) => x.id === artistId) ?? roster[0];
  const posts = game.xPosts.filter((p) => p.artistId === a?.id);
  const profile = a ? profileOf(a, "x") : null;

  if (!a) {
    return <p className="p-4 text-sm text-white/45">No profile yet.</p>;
  }

  return (
    <div className="h-full overflow-auto">
      {roster.length > 1 && (
        <select
          className="m-3 h-10 w-[calc(100%-1.5rem)] rounded-md border border-white/10 bg-white/5 px-2 text-sm"
          value={a.id}
          onChange={(e) => setArtistId(e.target.value)}
        >
          {roster.map((r) => (
            <option key={r.id} value={r.id} className="text-black">
              {r.name}
            </option>
          ))}
        </select>
      )}
      <div className="h-24 bg-linear-to-r from-white/10 to-white/5" />
      <div className="px-4">
        <div className="-mt-8">
          <ArtistAvatar spec={profile?.avatar ?? a.avatar} size={72} className="ring-4 ring-black" />
        </div>
        <h2 className="mt-3 flex items-center gap-1.5 font-display text-2xl">
          {a.name}
          <VerifiedBadge on={a.verified.x} size={16} />
        </h2>
        <p className="text-sm text-white/45">@{profile?.handle ?? a.handle}</p>
        <p className="mt-2 text-sm text-white/80">{profile?.bio ?? a.bio}</p>
        <p className="mt-3 text-sm">
          <span className="font-medium tabular-nums">{compact(a.followingX)}</span>
          <span className="text-white/45"> Following</span>
          <span className="mx-3 font-medium tabular-nums">{compact(a.followers.x)}</span>
          <span className="text-white/45"> Followers</span>
        </p>
        <p className="mt-1 text-xs text-white/40">
          {a.verified.x ? "Verified" : `Hit ${compact(100000)} then apply in Settings`} · {a.hometown}
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <PrimaryBtn onClick={() => useGame.getState().live(a.id, "x")}>Go live</PrimaryBtn>
          <button
            type="button"
            className="min-h-11 rounded-md border border-white/15 px-3 text-sm"
            onClick={() => useGame.getState().setOverlay({ type: "x", tab: "settings" })}
          >
            Settings
          </button>
        </div>
      </div>
      <div className="mt-4 border-b border-white/10 px-4 pb-2 text-sm font-medium">Posts</div>
      {posts.length === 0 ? (
        <p className="px-4 py-6 text-sm text-white/45">No posts yet. Say something on Home.</p>
      ) : (
        posts.map((p) => (
          <article key={p.id} className="border-b border-white/10 px-4 py-3">
            <p className="text-sm">{p.text}</p>
            <p className="mt-1 text-xs text-white/40">
              {compact(p.likes)} likes · {compact(p.reposts)} reposts
            </p>
          </article>
        ))
      )}
    </div>
  );
}

function XLive() {
  const game = useGame((s) => s.game)!;
  const live = useGame((s) => s.live);
  const you = rosterOf(game)[0];
  return (
    <div className="grid h-full place-items-center px-6 text-center">
      <div>
        <p className="font-display text-2xl">Spaces / Live</p>
        <p className="mt-2 text-sm text-white/50">Last: {compact(game.liveViewers.x)} watching.</p>
        <PrimaryBtn className="mt-4" disabled={!you} onClick={() => you && live(you.id, "x")}>
          Go live
        </PrimaryBtn>
      </div>
    </div>
  );
}
