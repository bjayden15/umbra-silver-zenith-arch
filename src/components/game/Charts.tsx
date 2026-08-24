import { useState } from "react";
import { compact, money, weekStreams } from "@/lib/game/format";
import { creditLine, isControlled } from "@/lib/game/sim";
import { useGame } from "@/lib/game/store";
import { CHART_SIZE, REGIONS, type RegionId } from "@/lib/game/types";
import { cn } from "@/lib/utils";
import { Panel, Pill } from "./bits";

type Board = "hot" | "albums" | "radio" | "spotify" | "box" | "ost";

export function Charts() {
  const game = useGame((s) => s.game)!;
  const [board, setBoard] = useState<Board>("hot");
  const [region, setRegion] = useState<RegionId | "global">("global");

  const hot = game.songs
    .filter((s) => s.chart != null)
    .sort((a, b) => (a.chart ?? 99) - (b.chart ?? 99));
  const albums = game.songs
    .filter((s) => s.albumChart != null)
    .sort((a, b) => (a.albumChart ?? 99) - (b.albumChart ?? 99));
  const radio = game.songs
    .filter((s) => s.radioChart != null)
    .sort((a, b) => (a.radioChart ?? 99) - (b.radioChart ?? 99));
  const spotify = game.songs
    .filter((s) => s.status === "released")
    .slice()
    .sort((a, b) => b.streamsWeek - a.streamsWeek)
    .slice(0, CHART_SIZE.spotify)
    .map((s, i) => ({ ...s, waveRank: i + 1 }));
  const ost = game.songs
    .filter((s) => s.ost && s.status === "released")
    .slice()
    .sort((a, b) => b.streamsWeek - a.streamsWeek)
    .slice(0, 20)
    .map((s, i) => ({ ...s, waveRank: i + 1 }));
  const box = [...(game.films ?? [])].filter((f) => f.status === "released").sort((a, b) => (a.boxRank ?? 99) - (b.boxRank ?? 99));

  let rows = board === "hot" ? hot : board === "albums" ? albums : board === "radio" ? radio : board === "ost" ? ost : spotify;
  if (region !== "global" && board !== "box") {
    rows = rows
      .slice()
      .sort((a, b) => b.regional[region].streams - a.regional[region].streams)
      .map((s, i) => ({ ...s, waveRank: (s as { waveRank?: number }).waveRank ?? i + 1 }));
  }

  return (
    <div className="mx-auto grid max-w-4xl gap-4 p-4 md:p-6">
      <div>
        <h1 className="font-display text-3xl tracking-tight">Charts</h1>
        <p className="text-sm text-muted">
          Billboard Hot 100 mixes streams, digital, physical, and radio. Billboard 200 uses album sales + TEA + SEA.
          Radio is spins. Top Spotify 50 is this week's streams. Box office and OST sit beside them. Sort any music
          board by region.
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        {(
          [
            { id: "hot" as const, label: "Billboard Hot 100" },
            { id: "albums" as const, label: "Billboard 200" },
            { id: "radio" as const, label: "Radio" },
            { id: "spotify" as const, label: "Top Spotify 50" },
            { id: "box" as const, label: "Box office" },
            { id: "ost" as const, label: "Soundtracks" },
          ] as const
        ).map((b) => (
          <button
            key={b.id}
            onClick={() => setBoard(b.id)}
            className={cn("min-h-10 rounded-full px-4 text-sm", board === b.id ? "bg-accent text-accent-fg" : "bg-subtle text-muted")}
          >
            {b.label}
          </button>
        ))}
      </div>
      {board !== "box" && (
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setRegion("global")}
            className={cn("min-h-10 rounded-full px-3 text-xs", region === "global" ? "bg-subtle text-fg" : "text-muted")}
          >
            Global
          </button>
          {REGIONS.map((r) => (
            <button
              key={r.id}
              onClick={() => setRegion(r.id)}
              className={cn("min-h-10 rounded-full px-3 text-xs", region === r.id ? "bg-subtle text-fg" : "text-muted")}
            >
              {r.label}
            </button>
          ))}
        </div>
      )}
      {board === "box" ? (
        <Panel>
          {box.length === 0 ? (
            <p className="text-sm text-muted">No pictures in theaters this week.</p>
          ) : (
            <ol className="grid max-h-[70vh] gap-1 overflow-auto">
              {box.map((f) => (
                <li key={f.id} className="grid grid-cols-[2.5rem_1fr_auto] items-center gap-3 rounded-md px-2 py-2 text-sm">
                  <span className="tabular-nums text-muted">#{f.boxRank}</span>
                  <span>
                    {f.title}
                    <span className="text-muted">
                      {" "}
                      · {f.studio}
                      {f.role !== "none" ? ` · ${f.role}` : ""}
                    </span>
                  </span>
                  <span className="tabular-nums text-xs text-muted">
                    {money(f.grossWeek)} wk · {money(f.gross)}
                  </span>
                </li>
              ))}
            </ol>
          )}
        </Panel>
      ) : (
        <Panel>
          {rows.length === 0 ? (
            <p className="text-sm text-muted">The board is all rivals this week.</p>
          ) : (
            <ol className="grid max-h-[70vh] gap-1 overflow-auto">
              {rows.map((s, i) => {
                const a = game.artists.find((x) => x.id === s.artistId);
                const ours = a ? isControlled(game, a) : false;
                const guest = s.collabArtistId ? game.artists.find((x) => x.id === s.collabArtistId) : null;
                const label =
                  a?.labelId === "player"
                    ? game.labelName
                    : game.rivals.find((r) => r.id === a?.labelId)?.name ?? (a?.signed ? "Indie" : "Independent");
                const rank =
                  region !== "global"
                    ? i + 1
                    : board === "hot"
                      ? s.chart
                      : board === "albums"
                        ? s.albumChart
                        : board === "radio"
                          ? s.radioChart
                          : (s as { waveRank?: number }).waveRank;
                const peak = board === "radio" ? s.peakRadio : board === "albums" ? s.peakAlbum : s.peakChart;
                const metric =
                  board === "spotify" || board === "ost"
                    ? compact(s.streamsWeek)
                    : board === "albums"
                      ? `${compact(s.albumUnits || s.salesPhysical + s.salesDigital)} u`
                      : board === "hot"
                        ? compact(s.chartPoints || weekStreams(s))
                        : region !== "global"
                          ? compact(s.regional[region].streams)
                          : compact(weekStreams(s));
                return (
                  <li
                    key={s.id}
                    className="grid grid-cols-[2.5rem_1fr_auto] items-center gap-3 rounded-md px-2 py-2 text-sm md:grid-cols-[2.5rem_1fr_8rem_auto]"
                  >
                    <span className="tabular-nums text-muted">#{rank}</span>
                    <span className="min-w-0">
                      <span className="block truncate font-medium">
                        {s.title}
                        {guest ? <span className="text-muted"> feat. {guest.name}</span> : null}
                        {s.ost ? <Pill className="ml-2">OST</Pill> : null}
                      </span>
                      <span className="text-xs text-muted">
                        {creditLine(game, s)} · {label}
                        {peak ? ` · peak ${peak}` : ""}
                      </span>
                    </span>
                    <span className="hidden text-xs text-muted md:block">{ours ? "You" : ""}</span>
                    <span className="tabular-nums text-xs text-muted">{metric}</span>
                  </li>
                );
              })}
            </ol>
          )}
        </Panel>
      )}
    </div>
  );
}
