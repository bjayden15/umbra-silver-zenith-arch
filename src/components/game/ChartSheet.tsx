import { X } from "lucide-react";
import { compact, weekLabel } from "@/lib/game/format";
import { creditLine } from "@/lib/game/sim";
import { useGame } from "@/lib/game/store";
import { REGIONS } from "@/lib/game/types";

export function AlbumSheet({ id }: { id: string }) {
  const game = useGame((s) => s.game)!;
  const setOverlay = useGame((s) => s.setOverlay);
  const album = (game.albums ?? []).find((a) => a.id === id);
  if (!album) return null;
  const artist = game.artists.find((a) => a.id === album.artistId);
  const tracks = album.songIds.map((sid) => game.songs.find((s) => s.id === sid)).filter((s) => !!s);
  const allTime = album.salesDigital + album.salesPhysical;
  const label =
    artist?.labelId === "player"
      ? game.labelName
      : game.rivals.find((r) => r.id === artist?.labelId)?.name ?? "Independent";

  return (
    <div className="fixed inset-0 z-50 grid place-items-end bg-bg/80 md:place-items-center md:p-6">
      <div className="max-h-[92dvh] w-full max-w-lg overflow-auto rounded-t-xl border border-border bg-surface p-5 md:rounded-xl">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs tracking-[0.18em] text-muted uppercase">Billboard 200</p>
            <h2 className="font-display text-2xl">{album.title}</h2>
            <p className="text-sm text-muted">
              {artist?.name} · {label} · {album.kind === "ep" ? "EP" : album.kind === "greatestHits" ? "Greatest Hits" : "Album"} ·{" "}
              {album.songIds.length} tracks
            </p>
          </div>
          <button className="grid size-11 place-items-center rounded-md hover:bg-subtle" onClick={() => setOverlay({ type: "none" })} aria-label="Close">
            <X className="size-5" />
          </button>
        </div>
        <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
          <Stat k="This week" v={`${compact(album.albumUnits)} sales`} />
          <Stat k="All-time sales" v={compact(allTime)} />
          <Stat k="Peak" v={album.peakChart ? `#${album.peakChart}` : "—"} />
          <Stat k="Released" v={album.releasedWeek ? weekLabel(album.releasedWeek) : "—"} />
        </dl>
        <h3 className="mt-5 font-display text-lg">Tracklist</h3>
        <p className="text-xs text-muted">Tap a song for that track's all-time sales. Weekly numbers stay on the board.</p>
        <ol className="mt-2 grid gap-1">
          {tracks.map((s, i) => (
            <li key={s.id}>
              <button
                type="button"
                onClick={() => setOverlay({ type: "song", id: s.id })}
                className="flex w-full items-center justify-between gap-3 rounded-md px-2 py-2 text-left text-sm hover:bg-subtle"
              >
                <span className="min-w-0 truncate">
                  <span className="text-muted">{i + 1}. </span>
                  {s.title}
                </span>
                <span className="shrink-0 tabular-nums text-xs text-muted">
                  {compact(s.salesDigital + s.salesPhysical)} sales
                </span>
              </button>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export function SongSheet({ id }: { id: string }) {
  const game = useGame((s) => s.game)!;
  const setOverlay = useGame((s) => s.setOverlay);
  const s = game.songs.find((x) => x.id === id);
  if (!s) return null;
  const album = s.albumId ? (game.albums ?? []).find((a) => a.id === s.albumId) : null;
  const allTime = s.salesDigital + s.salesPhysical;

  return (
    <div className="fixed inset-0 z-50 grid place-items-end bg-bg/80 md:place-items-center md:p-6">
      <div className="max-h-[92dvh] w-full max-w-lg overflow-auto rounded-t-xl border border-border bg-surface p-5 md:rounded-xl">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs tracking-[0.18em] text-muted uppercase">All-time</p>
            <h2 className="font-display text-2xl">{s.title}</h2>
            <p className="text-sm text-muted">{creditLine(game, s)}</p>
          </div>
          <button
            className="grid size-11 place-items-center rounded-md hover:bg-subtle"
            onClick={() => setOverlay(album ? { type: "album", id: album.id } : { type: "none" })}
            aria-label="Close"
          >
            <X className="size-5" />
          </button>
        </div>
        <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
          <Stat k="All-time sales" v={compact(allTime)} />
          <Stat k="Digital" v={compact(s.salesDigital)} />
          <Stat k="CD / vinyl" v={compact(s.salesPhysical)} />
          <Stat k="Streams" v={compact(s.streams)} />
          <Stat k="Hot 100 peak" v={s.peakChart ? `#${s.peakChart}` : "—"} />
          <Stat k="Spotify this week" v={`${compact(s.streamsWeek)} plays`} />
        </dl>
        {album ? (
          <p className="mt-3 text-sm text-muted">
            On {album.title}
            {album.chart ? ` · Billboard 200 #${album.chart}` : ""}
          </p>
        ) : (
          <p className="mt-3 text-sm text-muted">Released as a single.</p>
        )}
        <h3 className="mt-5 text-xs tracking-[0.16em] text-muted uppercase">This week by region</h3>
        <ul className="mt-2 grid gap-1 text-sm">
          {REGIONS.map((r) => (
            <li key={r.id} className="flex justify-between gap-3">
              <span className="text-muted">{r.label}</span>
              <span className="tabular-nums">{compact(s.regionalWeek?.[r.id]?.streams ?? 0)} plays</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Stat({ k, v }: { k: string; v: string }) {
  return (
    <div className="rounded-lg border border-border bg-elevated px-3 py-2">
      <p className="text-[11px] tracking-[0.14em] text-muted uppercase">{k}</p>
      <p className="mt-0.5 font-medium tabular-nums">{v}</p>
    </div>
  );
}
