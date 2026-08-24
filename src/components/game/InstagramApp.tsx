import { useState } from "react";
import { Heart, Home, MessageCircle, PlusSquare, User, X } from "lucide-react";
import { compact } from "@/lib/game/format";
import { profileOf, rosterOf } from "@/lib/game/sim";
import { useGame } from "@/lib/game/store";
import type { GramTab } from "@/lib/game/types";
import { cn } from "@/lib/utils";
import { ArtistAvatar } from "./ArtistAvatar";
import { VerifiedBadge } from "./VerifiedBadge";
import { PrimaryBtn } from "./bits";
import { ProfileEditor } from "./ProfileEditor";

const WASH = [
  "from-[#2a2420] to-[#12110f]",
  "from-[#1c2422] to-[#0e1210]",
  "from-[#242028] to-[#121016]",
  "from-[#202428] to-[#101214]",
];

export function InstagramApp() {
  const overlay = useGame((s) => s.overlay);
  const tab: GramTab = overlay.type === "instagram" ? (overlay.tab ?? "feed") : "feed";
  const setOverlay = useGame((s) => s.setOverlay);

  return (
    <div className="fixed inset-0 z-40 grid place-items-center bg-bg/80 p-0 md:p-6">
      <div className="flex h-dvh w-full max-w-[420px] flex-col bg-black text-white md:h-[min(844px,calc(100dvh-48px))] md:rounded-[2rem] md:border md:border-white/10 phone-bezel">
        <header className="flex items-center justify-between px-4 py-3">
          <button className="min-h-10 text-sm text-white/60" onClick={() => setOverlay({ type: "none" })}>
            Back
          </button>
          <p className="font-display text-xl">Instagram</p>
          <button
            className="grid size-10 place-items-center"
            onClick={() => setOverlay({ type: "none" })}
            aria-label="Close"
          >
            <X className="size-4" />
          </button>
        </header>
        <div className="min-h-0 flex-1 overflow-hidden">
          {tab === "feed" && <Feed />}
          {tab === "reels" && <Feed />}
          {tab === "profile" && <InstagramProfile />}
          {tab === "live" && <InstagramLive />}
          {tab === "settings" && (
            <div className="h-full overflow-auto">
              <ProfileEditor platform="instagram" dark />
            </div>
          )}
        </div>
        <nav className="grid grid-cols-4 border-t border-white/10 pb-[env(safe-area-inset-bottom)]">
          {(
            [
              { id: "feed" as const, label: "Home", icon: Home },
              { id: "reels" as const, label: "Drop", icon: PlusSquare },
              { id: "live" as const, label: "Live", icon: Heart },
              { id: "profile" as const, label: "Profile", icon: User },
            ] as const
          ).map((it) => (
            <button
              key={it.id}
              onClick={() => setOverlay({ type: "instagram", tab: it.id })}
              className={cn(
                "flex min-h-14 flex-col items-center justify-center gap-0.5 text-[10px]",
                tab === it.id ? "text-white" : "text-white/45",
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

function Feed() {
  const game = useGame((s) => s.game)!;
  const gramPost = useGame((s) => s.gramPost);
  const roster = rosterOf(game);
  const [artistId, setArtistId] = useState(roster[0]?.id ?? "");
  const [caption, setCaption] = useState("");
  const overlay = useGame((s) => s.overlay);
  const compose = overlay.type === "instagram" && overlay.tab === "reels";

  return (
    <div className="flex h-full flex-col">
      {compose && (
        <form
          className="border-b border-white/10 p-3"
          onSubmit={(e) => {
            e.preventDefault();
            if (!artistId) return;
            gramPost(artistId, caption);
            setCaption("");
          }}
        >
          {roster.length === 0 ? (
            <p className="text-sm text-white/50">Sign someone first.</p>
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
                      {a.name} · {compact(a.followers.instagram)} followers
                    </option>
                  ))}
                </select>
              )}
              <div className="flex gap-2">
                <input
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="Caption"
                  className="h-11 flex-1 rounded-md border border-white/10 bg-white/5 px-3 text-sm outline-none"
                />
                <PrimaryBtn type="submit">Drop</PrimaryBtn>
              </div>
            </>
          )}
        </form>
      )}
      <div className="min-h-0 flex-1 overflow-auto">
        {game.gram.length === 0 && (
          <p className="px-4 py-8 text-center text-sm text-white/50">No stills yet. Drop one.</p>
        )}
        {game.gram.map((g) => (
          <article key={g.id} className="border-b border-white/10 pb-4">
            <div className="flex items-center gap-2 px-3 py-2">
              <ArtistAvatar spec={g.avatar} size={32} />
              <span className="flex items-center gap-1 text-sm font-medium">
                {g.handle}
                <VerifiedBadge on={g.verified} />
              </span>
            </div>
            <div className={`aspect-square bg-linear-to-br ${WASH[g.visual % WASH.length]} grid place-items-center`}>
              <ArtistAvatar spec={g.avatar} size={96} />
            </div>
            <div className="flex gap-4 px-3 py-2">
              <Heart className="size-6" />
              <MessageCircle className="size-6" />
            </div>
            <p className="px-3 text-sm">
              <span className="font-medium">{compact(g.likes)} likes</span>
            </p>
            <p className="px-3 text-sm text-white/80">
              <span className="font-medium">{g.handle}</span> {g.caption}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}

function InstagramProfile() {
  const game = useGame((s) => s.game)!;
  const roster = rosterOf(game);
  const [artistId, setArtistId] = useState(roster[0]?.id ?? "");
  const a = game.artists.find((x) => x.id === artistId) ?? roster[0];
  const posts = game.gram.filter((g) => g.artistId === a?.id);
  const profile = a ? profileOf(a, "instagram") : null;

  if (!a) return <p className="p-4 text-sm text-white/50">No profile.</p>;

  return (
    <div className="h-full overflow-auto px-4 py-3">
      {roster.length > 1 && (
        <select
          className="mb-3 h-10 w-full rounded-md border border-white/10 bg-white/5 px-2 text-sm"
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
      <div className="flex items-center gap-4">
        <ArtistAvatar spec={profile?.avatar ?? a.avatar} size={72} />
        <div className="grid flex-1 grid-cols-3 text-center text-sm">
          <div>
            <p className="font-medium tabular-nums">{posts.length}</p>
            <p className="text-[11px] text-white/45">posts</p>
          </div>
          <div>
            <p className="font-medium tabular-nums">{compact(a.followers.instagram)}</p>
            <p className="text-[11px] text-white/45">followers</p>
          </div>
          <div>
            <p className="font-medium tabular-nums">{compact(Math.round(a.followingX * 0.6))}</p>
            <p className="text-[11px] text-white/45">following</p>
          </div>
        </div>
      </div>
      <p className="mt-3 flex items-center gap-1 text-sm font-medium">
        {a.name}
        <VerifiedBadge on={a.verified.instagram} />
      </p>
      <p className="text-xs text-white/45">@{profile?.handle ?? a.handle}</p>
      <p className="mt-2 text-sm text-white/70">{profile?.bio ?? a.bio}</p>
      <p className="mt-2 text-xs text-white/40">
        {a.verified.instagram ? "Verified" : `Hit ${compact(100000)} then apply in Settings`}
      </p>
      <button
        type="button"
        className="mt-3 min-h-11 rounded-md border border-white/15 px-3 text-sm"
        onClick={() => useGame.getState().setOverlay({ type: "instagram", tab: "settings" })}
      >
        Settings
      </button>
      <div className="mt-4 grid grid-cols-3 gap-1">
        {posts.map((g) => (
          <div key={g.id} className={`aspect-square bg-linear-to-br ${WASH[g.visual % WASH.length]}`} />
        ))}
      </div>
    </div>
  );
}

function InstagramLive() {
  const game = useGame((s) => s.game)!;
  const live = useGame((s) => s.live);
  const you = rosterOf(game)[0];
  return (
    <div className="grid h-full place-items-center px-6 text-center">
      <div>
        <p className="font-display text-2xl">Go live</p>
        <p className="mt-2 text-sm text-white/50">Last: {compact(game.liveViewers.instagram)} watching.</p>
        <PrimaryBtn className="mt-4" disabled={!you} onClick={() => you && live(you.id, "instagram")}>
          Start
        </PrimaryBtn>
      </div>
    </div>
  );
}
