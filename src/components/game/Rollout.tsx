import { useEffect, useState } from "react";
import { compact } from "@/lib/game/format";
import { useGame } from "@/lib/game/store";
import { Pill, PrimaryBtn } from "./bits";

export function Rollout({ clipId }: { clipId: string }) {
  const game = useGame((s) => s.game)!;
  const setOverlay = useGame((s) => s.setOverlay);
  const rollout = game.lastRollout;
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (!rollout) return;
    setShown(0);
    const t = window.setInterval(() => {
      setShown((n) => {
        if (n >= rollout.stages.length) {
          window.clearInterval(t);
          return n;
        }
        return n + 1;
      });
    }, 420);
    return () => window.clearInterval(t);
  }, [rollout]);

  if (!rollout || rollout.clipId !== clipId) {
    return null;
  }

  const done = shown >= rollout.stages.length;
  const tone =
    rollout.verdict === "flop"
      ? "bad"
      : rollout.verdict === "solid"
        ? "default"
        : "viral";

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-bg/80 p-4">
      <div className="w-full max-w-md rounded-xl border border-border bg-surface p-5">
        <p className="text-xs tracking-[0.18em] text-muted uppercase">For You rollout</p>
        <h2 className="mt-1 font-display text-2xl">The page is testing the clip</h2>
        <ol className="mt-4 grid gap-2">
          {rollout.stages.slice(0, shown).map((st, i) => (
            <li key={i} className="rounded-md bg-subtle px-3 py-2 text-sm">
              <div className="flex justify-between gap-3">
                <span>{st.name}</span>
                <span className="tabular-nums text-muted">{compact(st.views)}</span>
              </div>
              {!st.passed && st.reason ? (
                <p className="mt-1 text-xs text-bad">{st.reason}</p>
              ) : (
                <p className="mt-1 text-xs text-good">Cleared. Pushing wider.</p>
              )}
            </li>
          ))}
        </ol>
        {done && (
          <div className="mt-4 grid gap-2">
            <div className="flex items-center gap-2">
              <Pill tone={tone === "viral" ? "viral" : tone === "bad" ? "bad" : "mint"}>
                {rollout.verdict}
              </Pill>
              <span className="tabular-nums text-sm">{compact(rollout.totalViews)} views</span>
            </div>
            <p className="text-sm text-muted">{rollout.tip}</p>
            <p className="text-xs text-muted">
              +{compact(rollout.followersGained)} TikTok · +{compact(rollout.xGained ?? 0)} X · +
              {compact(rollout.instagramGained ?? 0)} Instagram · +{compact(rollout.spotifyGained ?? 0)} Spotify · +
              {compact(rollout.streamsGained)} streams
            </p>
            <PrimaryBtn
              onClick={() => setOverlay({ type: "tiktok", tab: "home" })}
            >
              Watch it on For You
            </PrimaryBtn>
          </div>
        )}
      </div>
    </div>
  );
}
