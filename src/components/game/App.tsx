"use client";

import { useEffect, useState } from "react";
import { useGame } from "@/lib/game/store";
import { GAME_TITLE } from "@/lib/game/types";
import { TitleScreen } from "./TitleScreen";
import { Shell } from "./Shell";

export function GameApp() {
  const hydrated = useGame((s) => s.hydrated);
  const game = useGame((s) => s.game);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => {
      if (!useGame.getState().hydrated) useGame.setState({ hydrated: true });
    }, 80);
    return () => window.clearTimeout(t);
  }, []);

  if (!hydrated) {
    return (
      <div className="grid min-h-dvh place-items-center bg-bg text-muted">
        <p className="font-display text-2xl text-fg">{GAME_TITLE}</p>
      </div>
    );
  }

  if (!entered || !game) {
    return <TitleScreen onPlay={() => setEntered(true)} />;
  }
  return <Shell />;
}
