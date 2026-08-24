import { useState } from "react";
import { compact } from "@/lib/game/format";
import { ensureArtistExtras, platformReach, rosterOf } from "@/lib/game/sim";
import { useGame } from "@/lib/game/store";
import { VERIFY_AT, type SocialPlatform } from "@/lib/game/types";
import { cn } from "@/lib/utils";
import { ArtistAvatar } from "./ArtistAvatar";
import { GhostBtn, PrimaryBtn } from "./bits";
import { PhotoCrop } from "./PhotoCrop";
import { VerifiedBadge } from "./VerifiedBadge";

const LABELS: Record<SocialPlatform, string> = {
  tiktok: "TikTok",
  x: "X",
  instagram: "Instagram",
  youtube: "YouTube",
  spotify: "Spotify",
};

export function ProfileEditor({
  platform,
  dark,
}: {
  platform: SocialPlatform;
  dark?: boolean;
}) {
  const game = useGame((s) => s.game)!;
  const editProfile = useGame((s) => s.editProfile);
  const applyVerify = useGame((s) => s.applyVerify);
  const setPhoto = useGame((s) => s.setPhoto);
  const roster = rosterOf(game);
  const a = roster[0];
  if (!a) return <p className={cn("p-4 text-sm", dark ? "text-white/50" : "text-muted")}>Sign someone first.</p>;
  ensureArtistExtras(a);
  const p = a.profiles[platform];
  const [handle, setHandle] = useState(p.handle);
  const [bio, setBio] = useState(p.bio);
  const [avatar, setAvatar] = useState({ ...p.avatar });
  const verified = a.verified[platform];
  const reach = platformReach(a, platform);
  const need = VERIFY_AT[platform];
  const eligible = !verified && reach >= need;
  const field = dark
    ? "h-11 w-full rounded-md border border-white/10 bg-white/5 px-3 text-sm text-white outline-none"
    : "h-11 w-full rounded-md border border-border bg-elevated px-3 text-sm outline-none";
  const muted = dark ? "text-white/50" : "text-muted";

  const bump = (key: keyof typeof avatar, max: number) =>
    setAvatar((prev) => ({ ...prev, [key]: ((prev[key] as number) + 1) % (max + 1) }));

  return (
    <div className={cn("grid gap-3 p-4", dark && "text-white")}>
      <div className="flex items-center gap-3">
        <ArtistAvatar spec={avatar} size={72} />
        <div className="min-w-0">
          <p className="flex items-center gap-1 font-medium">
            {LABELS[platform]} settings
            <VerifiedBadge on={verified} />
          </p>
          <p className={cn("text-xs", muted)}>
            {compact(reach)} {platform === "spotify" ? "monthly" : "followers"} · apply at {compact(need)}
          </p>
        </div>
      </div>
      <PhotoCrop
        dark={dark}
        onSave={(photo) => {
          setAvatar((prev) => ({ ...prev, photo }));
          setPhoto(a.id, photo, "all");
        }}
      />
      <div className="flex flex-wrap gap-2">
        {(
          [
            ["skin", 5],
            ["hair", 6],
            ["hairColor", 5],
            ["accent", 5],
            ["shape", 3],
            ["accessory", 4],
          ] as const
        ).map(([k, max]) => (
          <button
            key={k}
            type="button"
            onClick={() => bump(k, max)}
            className={cn(
              "min-h-10 rounded-md px-3 text-xs",
              dark ? "bg-white/10 text-white" : "bg-subtle",
            )}
          >
            {k} {avatar[k]}
          </button>
        ))}
      </div>
      <label className={cn("grid gap-1 text-xs", muted)}>
        Username
        <input value={handle} onChange={(e) => setHandle(e.target.value)} maxLength={16} className={field} />
      </label>
      <label className={cn("grid gap-1 text-xs", muted)}>
        Bio
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          maxLength={160}
          className={cn(field, "h-24 py-2")}
        />
      </label>
      <div className="flex flex-wrap gap-2">
        <PrimaryBtn onClick={() => editProfile(a.id, platform, { handle, bio, avatar })}>Save profile</PrimaryBtn>
        {eligible && <GhostBtn onClick={() => applyVerify(a.id, platform)}>Apply for verified</GhostBtn>}
      </div>
      {!eligible && !verified && (
        <p className={cn("text-xs", muted)}>Hit {compact(need)} then apply. It is not automatic.</p>
      )}
    </div>
  );
}
