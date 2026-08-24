import { useState } from "react";
import { CITIES, GENRES } from "@/lib/game/catalog";
import { CREATOR, GAME_SUBTITLE, GAME_TITLE, TAGLINE, type GenreId, type GenderId, type OrientationId } from "@/lib/game/types";
import { useGame } from "@/lib/game/store";
import { GhostBtn, PrimaryBtn } from "./bits";

export function TitleScreen({ onPlay }: { onPlay: () => void }) {
  const game = useGame((s) => s.game);
  const newGame = useGame((s) => s.newGame);
  const reset = useGame((s) => s.reset);
  const loadSlot = useGame((s) => s.loadSlot);
  const listSlots = useGame((s) => s.listSlots);
  const [mode, setMode] = useState<"idle" | "pick" | "label" | "artist" | "load" | "credits">("idle");
  const [labelName, setLabelName] = useState("Harbor Records");
  const [artistName, setArtistName] = useState("Nova Vex");
  const [genre, setGenre] = useState<GenreId>("altpop");
  const [city, setCity] = useState("Atlanta");
  const [age, setAge] = useState(21);
  const [gender, setGender] = useState<GenderId>("female");
  const [orientation, setOrientation] = useState<OrientationId>("straight");
  const [database, setDatabase] = useState<"normal" | "real">("real");
  const slots = mode === "load" ? listSlots() : [];

  return (
    <div className="relative min-h-dvh overflow-hidden bg-bg">
      <div
        className="pointer-events-none absolute inset-0 opacity-80"
        style={{
          background:
            "radial-gradient(ellipse at 20% 10%, color-mix(in oklab, var(--color-accent) 14%, transparent), transparent 50%), radial-gradient(ellipse at 80% 90%, color-mix(in oklab, var(--color-fg) 6%, transparent), transparent 45%)",
        }}
      />
      <Vinyl />
      <div className="relative mx-auto flex min-h-dvh max-w-5xl flex-col justify-between px-5 py-8 md:px-10 md:py-12">
        <p className="text-xs font-medium tracking-[0.22em] text-muted uppercase">
          {GAME_SUBTITLE} · Created by {CREATOR}
        </p>
        <div className="max-w-xl">
          <h1 className="font-display text-5xl leading-[0.95] tracking-[-0.03em] text-fg md:text-7xl">
            Music
            <br />
            Star
          </h1>
          <p className="mt-3 font-display text-xl text-accent md:text-2xl">{TAGLINE}</p>
          <p className="mt-4 max-w-md text-base leading-relaxed text-muted">
            Run a label or be the act. Break songs on TikTok, grow X and Instagram, chart on Billboard 100,
            stream on Spotify. Songs die without promo. Monthly listeners are the last four weeks — nothing
            more. Years and weeks both tick.
          </p>
          {mode === "idle" ? (
            <div className="mt-8 flex flex-wrap gap-3">
              <PrimaryBtn onClick={() => setMode("pick")}>New game</PrimaryBtn>
              {game ? (
                <GhostBtn onClick={onPlay}>
                  Continue{" "}
                  {game.career === "artist"
                    ? game.artists.find((a) => a.id === game.playerArtistId)?.name
                    : game.labelName}
                </GhostBtn>
              ) : null}
              <GhostBtn onClick={() => setMode("load")}>Load</GhostBtn>
              <GhostBtn onClick={() => setMode("credits")}>Credits</GhostBtn>
            </div>
          ) : mode === "credits" ? (
            <div className="mt-8 max-w-md rounded-xl border border-border bg-surface p-5">
              <p className="text-xs tracking-[0.18em] text-muted uppercase">Credits</p>
              <p className="mt-2 font-display text-2xl">{GAME_TITLE}</p>
              <p className="text-sm text-muted">{GAME_SUBTITLE}</p>
              <p className="mt-4 text-sm">
                Created by <span className="text-fg">{CREATOR}</span> only.
              </p>
              <p className="mt-2 text-sm text-muted">
                Billboard Hot 100 · Billboard 200 · Box office · Radio · Top Spotify 50 · TikTok · X · Instagram · Spotify · YouTube
              </p>
              <GhostBtn className="mt-4" onClick={() => setMode("idle")}>
                Back
              </GhostBtn>
            </div>
          ) : mode === "load" ? (
            <div className="mt-8 grid max-w-md gap-2">
              {slots.map((s) => (
                <button
                  key={s.slot}
                  disabled={s.week === 0}
                  onClick={() => {
                    if (loadSlot(s.slot)) onPlay();
                  }}
                  className="flex min-h-12 items-center justify-between rounded-lg border border-border bg-surface px-4 text-left disabled:opacity-40"
                >
                  <span>{s.slot === 0 ? "Autosave" : `Slot ${s.slot}`}</span>
                  <span className="text-sm text-muted">{s.week ? `${s.label} · w${s.week}` : "Empty"}</span>
                </button>
              ))}
              <GhostBtn onClick={() => setMode("idle")}>Back</GhostBtn>
            </div>
          ) : mode === "pick" ? (
            <div className="mt-8 grid max-w-lg gap-3">
              <button
                onClick={() => setMode("artist")}
                className="rounded-xl border border-border bg-surface p-5 text-left transition-colors hover:bg-elevated"
              >
                <p className="text-xs tracking-[0.18em] text-muted uppercase">Play as</p>
                <p className="mt-1 font-display text-2xl">The artist</p>
                <p className="mt-2 text-sm text-muted">
                  Write, post, tour, buy a house. Stay independent or take a deal.
                </p>
              </button>
              <button
                onClick={() => setMode("label")}
                className="rounded-xl border border-border bg-surface p-5 text-left transition-colors hover:bg-elevated"
              >
                <p className="text-xs tracking-[0.18em] text-muted uppercase">Play as</p>
                <p className="mt-1 font-display text-2xl">Label CEO</p>
                <p className="mt-2 text-sm text-muted">Scout a roster, work radio, take the cut when it charts.</p>
              </button>
              <GhostBtn onClick={() => setMode("idle")}>Back</GhostBtn>
            </div>
          ) : (
            <form
              className="mt-8 grid max-w-md gap-3"
              onSubmit={(e) => {
                e.preventDefault();
                if (game) reset();
                if (mode === "label") {
                  newGame({ career: "label", labelName, city, database });
                } else {
                  newGame({ career: "artist", name: artistName, genre, city, age, database, gender, orientation });
                }
                onPlay();
              }}
            >
              {mode === "label" ? (
                <label className="grid gap-1 text-xs text-muted">
                  Label name
                  <input
                    value={labelName}
                    onChange={(e) => setLabelName(e.target.value)}
                    className="h-11 rounded-md border border-border bg-surface px-3 text-sm text-fg outline-none focus:border-accent"
                    maxLength={28}
                  />
                </label>
              ) : (
                <>
                  <label className="grid gap-1 text-xs text-muted">
                    Artist name
                    <input
                      value={artistName}
                      onChange={(e) => setArtistName(e.target.value)}
                      className="h-11 rounded-md border border-border bg-surface px-3 text-sm text-fg outline-none focus:border-accent"
                      maxLength={28}
                    />
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="grid gap-1 text-xs text-muted">
                      Genre
                      <select
                        value={genre}
                        onChange={(e) => setGenre(e.target.value as GenreId)}
                        className="h-11 rounded-md border border-border bg-surface px-3 text-sm text-fg outline-none focus:border-accent"
                      >
                        {GENRES.map((g) => (
                          <option key={g.id} value={g.id}>
                            {g.label}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label className="grid gap-1 text-xs text-muted">
                      Age
                      <input
                        type="number"
                        min={16}
                        max={35}
                        value={age}
                        onChange={(e) => setAge(Number(e.target.value))}
                        className="h-11 rounded-md border border-border bg-surface px-3 text-sm text-fg outline-none focus:border-accent"
                      />
                    </label>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="grid gap-1 text-xs text-muted">
                      Gender
                      <select
                        value={gender}
                        onChange={(e) => setGender(e.target.value as GenderId)}
                        className="h-11 rounded-md border border-border bg-surface px-3 text-sm text-fg outline-none focus:border-accent"
                      >
                        <option value="female">Female</option>
                        <option value="male">Male</option>
                      </select>
                    </label>
                    <label className="grid gap-1 text-xs text-muted">
                      Orientation
                      <select
                        value={orientation}
                        onChange={(e) => setOrientation(e.target.value as OrientationId)}
                        className="h-11 rounded-md border border-border bg-surface px-3 text-sm text-fg outline-none focus:border-accent"
                      >
                        <option value="straight">Straight</option>
                        <option value="gay">Gay</option>
                        <option value="bisexual">Bisexual</option>
                      </select>
                    </label>
                  </div>
                </>
              )}
              <label className="grid gap-1 text-xs text-muted">
                City
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="h-11 rounded-md border border-border bg-surface px-3 text-sm text-fg outline-none focus:border-accent"
                >
                  {CITIES.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </label>
              <label className="grid gap-1 text-xs text-muted">
                Database
                <select
                  value={database}
                  onChange={(e) => setDatabase(e.target.value as "normal" | "real")}
                  className="h-11 rounded-md border border-border bg-surface px-3 text-sm text-fg outline-none focus:border-accent"
                >
                  <option value="normal">Normal.db — fictional stars</option>
                  <option value="real">RealArtists.db — official chart rivals</option>
                </select>
              </label>
              <div className="flex gap-3">
                <PrimaryBtn type="submit">{mode === "label" ? "Open the doors" : "Start unsigned"}</PrimaryBtn>
                <GhostBtn onClick={() => setMode("pick")}>Back</GhostBtn>
              </div>
            </form>
          )}
        </div>
        <ul className="grid max-w-2xl gap-2 text-sm text-muted md:grid-cols-3">
          <li>TikTok · X · Instagram · Spotify · YouTube</li>
          <li>Billboard Hot 100 / Billboard 200 / box office & OST</li>
          <li>Created by {CREATOR}</li>
        </ul>
      </div>
    </div>
  );
}

function Vinyl() {
  return (
    <div className="pointer-events-none absolute -right-24 top-1/2 hidden h-[520px] w-[520px] -translate-y-1/2 md:block">
      <div className="clip-disc absolute inset-0 rounded-full border border-border-strong bg-elevated" />
      <div className="clip-disc absolute inset-10 rounded-full border border-border bg-subtle" />
      <div className="clip-disc absolute inset-[38%] rounded-full bg-accent/80" />
      <div className="absolute inset-[46%] rounded-full bg-bg" />
    </div>
  );
}
