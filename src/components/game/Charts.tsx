import { useState } from "react";
import { compact, money } from "@/lib/game/format";
import { albumWeekSales, creditLine, isControlled, isStreamingTrack, weekHotPoints, weekPlays } from "@/lib/game/sim";
import { useGame } from "@/lib/game/store";
import { CHART_SIZE, REGIONS, type GameState, type RegionId, type Song } from "@/lib/game/types";
import { cn } from "@/lib/utils";
import { Panel, Pill } from "./bits";

type Board = "hot" | "albums" | "radio" | "spotify" | "box" | "ost";

export function Charts() {
  const game = useGame((s) => s.game)!;
  const setOverlay = useGame((s) => s.setOverlay);
  const [board, setBoard] = useState<Board>("hot");
  const [region, setRegion] = useState<RegionId | "global">("global");

  const tracks = game.songs.filter((s) => isStreamingTrack(s));
  const hot =
    region === "global"
      ? tracks
          .filter((s) => s.chart != null)
          .sort((a, b) => (a.chart ?? 99) - (b.chart ?? 99))
          .map((song) => ({ song, rank: song.chart ?? 0, weekly: song.chartPoints || weekHotPoints(game, song, "global") }))
      : rankBy(tracks, (s) => weekHotPoints(game, s, region), CHART_SIZE.singles);
  const albums = rankAlbums(game, region);
  const radio = game.songs
    .filter((s) => s.radioChart != null && isStreamingTrack(s))
    .sort((a, b) => (a.radioChart ?? 99) - (b.radioChart ?? 99))
    .map((song) => ({ song, rank: song.radioChart ?? 0, weekly: Math.round(song.radioPower) }));
  const spotify = rankBy(tracks, (s) => weekPlays(s, region), CHART_SIZE.spotify);
  const ost = rankBy(
    tracks.filter((s) => s.ost),
    (s) => weekPlays(s, region),
    20,
  );
  const box = [...(game.films ?? [])].filter((f) => f.status === "released").sort((a, b) => (a.boxRank ?? 99) - (b.boxRank ?? 99));
  const songRows = board === "hot" ? hot : board === "radio" ? radio : board === "ost" ? ost : spotify;

  return (
    <div className="mx-auto grid max-w-4xl gap-4 p-4 md:p-6">
      <div>
        <h1 className="font-display text-3xl tracking-tight">Charts</h1>
        <p className="text-sm text-muted">
          Billboard Hot 100 mixes streams, downloads, CD sales, and radio — Global is every region added together.
          Billboard 200 is weekly album sales. Top Spotify 50 is Spotify plays only. Radio is spins.
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
      ) : board === "albums" ? (
        <Panel>
          {albums.length === 0 ? (
            <p className="text-sm text-muted">No albums on the board this week.</p>
          ) : (
            <ol className="grid max-h-[70vh] gap-1 overflow-auto">
              {albums.map((row) => {
                const a = game.artists.find((x) => x.id === row.album.artistId);
                const ours = a ? isControlled(game, a) : false;
                const label =
                  a?.labelId === "player"
                    ? game.labelName
                    : game.rivals.find((r) => r.id === a?.labelId)?.name ?? (a?.signed ? "Indie" : "Independent");
                return (
                  <li key={row.album.id}>
                    <button
                      type="button"
                      onClick={() => setOverlay({ type: "album", id: row.album.id })}
                      className="grid w-full grid-cols-[2.5rem_1fr_auto] items-center gap-3 rounded-md px-2 py-2 text-left text-sm hover:bg-subtle md:grid-cols-[2.5rem_1fr_8rem_auto]"
                    >
                      <span className="tabular-nums text-muted">#{row.rank}</span>
                      <span className="min-w-0">
                        <span className="block truncate font-medium">
                          {row.album.title}
                          <Pill className="ml-2">{row.album.kind === "ep" ? "EP" : row.album.kind === "greatestHits" ? "Hits" : "LP"}</Pill>
                        </span>
                        <span className="text-xs text-muted">
                          {a?.name ?? "Artist"} · {label}
                          {row.album.peakChart ? ` · peak ${row.album.peakChart}` : ""} · {row.album.songIds.length} tracks
                        </span>
                      </span>
                      <span className="hidden text-xs text-muted md:block">{ours ? "You" : ""}</span>
                      <span className="tabular-nums text-xs text-muted">{compact(row.weekly)} sales</span>
                    </button>
                  </li>
                );
              })}
            </ol>
          )}
        </Panel>
      ) : (
        <Panel>
          {songRows.length === 0 ? (
            <p className="text-sm text-muted">The board is all rivals this week.</p>
          ) : (
            <ol className="grid max-h-[70vh] gap-1 overflow-auto">
              {songRows.map((row) => {
                const s = row.song;
                const a = game.artists.find((x) => x.id === s.artistId);
                const ours = a ? isControlled(game, a) : false;
                const guest = s.collabArtistId ? game.artists.find((x) => x.id === s.collabArtistId) : null;
                const label =
                  a?.labelId === "player"
                    ? game.labelName
                    : game.rivals.find((r) => r.id === a?.labelId)?.name ?? (a?.signed ? "Indie" : "Independent");
                const peak = board === "radio" ? s.peakRadio : s.peakChart;
                const metric =
                  board === "spotify" || board === "ost" ? `${compact(row.weekly)} plays` : compact(row.weekly);
                return (
                  <li key={s.id}>
                    <button
                      type="button"
                      onClick={() => setOverlay({ type: "song", id: s.id })}
                      className="grid w-full grid-cols-[2.5rem_1fr_auto] items-center gap-3 rounded-md px-2 py-2 text-left text-sm hover:bg-subtle md:grid-cols-[2.5rem_1fr_8rem_auto]"
                    >
                      <span className="tabular-nums text-muted">#{row.rank}</span>
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
                    </button>
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

function rankBy(songs: Song[], score: (s: Song) => number, size: number) {
  return songs
    .slice()
    .map((song) => ({ song, weekly: score(song) }))
    .sort((a, b) => b.weekly - a.weekly)
    .slice(0, size)
    .map((row, i) => ({ ...row, rank: i + 1 }));
}

function rankAlbums(game: GameState, region: RegionId | "global") {
  const released = (game.albums ?? []).filter((a) => a.status === "released");
  return released
    .map((album) => {
      const tracks = album.songIds.map((id) => game.songs.find((s) => s.id === id)).filter((s): s is Song => !!s);
      const weekly = albumWeekSales(album, tracks, region, game);
      return { album, weekly };
    })
    .sort((a, b) => {
      if (region === "global" && a.album.chart != null && b.album.chart != null) return a.album.chart - b.album.chart;
      return b.weekly - a.weekly;
    })
    .slice(0, CHART_SIZE.albums)
    .map((row, i) => ({
      ...row,
      rank: region === "global" && row.album.chart != null ? row.album.chart : i + 1,
    }));
}
