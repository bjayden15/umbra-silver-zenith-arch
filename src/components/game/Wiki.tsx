import { X } from "lucide-react";
import { genreLabel } from "@/lib/game/catalog";
import { compact, money, weekLabel, weekParts } from "@/lib/game/format";
import { ensureArtistExtras, playerSongs, rosterOf } from "@/lib/game/sim";
import { useGame } from "@/lib/game/store";
import { ArtistAvatar } from "./ArtistAvatar";
import { Pill } from "./bits";
import { VerifiedBadge } from "./VerifiedBadge";

export function WikiPage({ artistId }: { artistId: string }) {
  const game = useGame((s) => s.game)!;
  const setOverlay = useGame((s) => s.setOverlay);
  const a = game.artists.find((x) => x.id === artistId) ?? rosterOf(game)[0];
  if (!a) return null;
  ensureArtistExtras(a);
  const songs = game.songs.filter((s) => s.artistId === a.id && s.status === "released");
  const features = game.songs.filter((s) => s.collabArtistId === a.id);
  const born = weekParts(1);
  const now = weekParts(game.week);
  const yearsActive = `${born.year}–${now.year}`;
  const peak = songs.reduce((n, s) => (s.peakChart != null && (n == null || s.peakChart < n) ? s.peakChart : n), null as number | null);
  const combined = songs.reduce((n, s) => n + s.salesDigital + s.salesPhysical, 0);

  return (
    <div className="fixed inset-0 z-40 grid place-items-end bg-bg/70 md:place-items-center md:p-6">
      <div className="max-h-[92dvh] w-full max-w-3xl overflow-auto rounded-t-xl border border-border bg-surface p-5 md:rounded-xl">
        <div className="flex items-start justify-between gap-3">
          <p className="text-xs tracking-[0.18em] text-muted uppercase">Wiki</p>
          <button className="grid size-11 place-items-center rounded-md hover:bg-subtle" onClick={() => setOverlay({ type: "none" })} aria-label="Close">
            <X className="size-5" />
          </button>
        </div>
        <div className="mt-2 grid gap-5 md:grid-cols-[200px_1fr]">
          <aside className="rounded-lg border border-border bg-elevated p-4">
            <ArtistAvatar spec={a.avatar} size={96} className="mx-auto" />
            <h1 className="mt-3 flex items-center justify-center gap-1 font-display text-2xl">
              {a.name}
              <VerifiedBadge on={a.verified.spotify || a.verified.x} />
            </h1>
            <dl className="mt-3 grid gap-1 text-xs">
              <Row k="Born" v={`${a.age - now.careerYear + 1} (${a.hometown})`} />
              <Row k="Origin" v={`${a.hometown}, ${a.nationality}`} />
              <Row k="Genres" v={genreLabel(a.genre)} />
              <Row k="Occupation" v={a.kind === "band" ? "band" : "singer-songwriter"} />
              <Row k="Years active" v={yearsActive} />
              <Row k="Labels" v={a.signed ? (game.rivals.find((r) => r.id === a.labelId)?.name ?? game.labelName) : "Independent"} />
              <Row k="Popularity" v={String(Math.round(a.popularity))} />
              <Row k="Page views" v={compact(a.wikiViews || Math.round(a.monthlyListeners * 0.04))} />
            </dl>
          </aside>
          <div>
            <h2 className="font-display text-xl">Career</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">{a.bio}</p>
            <p className="mt-2 text-sm text-muted">{a.history}</p>
            <h2 className="mt-5 font-display text-xl">Personal life</h2>
            <p className="mt-2 text-sm text-muted">
              {a.relationship}
              {a.partner
                ? ` · ${a.partner.name} (${a.partner.job}${a.partner.famous ? ", public figure" : ""}), net worth ${money(a.partner.netWorth)}, looks ${a.partner.looks}`
                : " · single"}
              . Parents {a.parents.mom} and {a.parents.dad}.
            </p>
            {a.kids.length > 0 && (
              <ul className="mt-2 grid gap-1 text-sm text-muted">
                {a.kids.map((k) => (
                  <li key={k.id}>
                    {k.name} ({k.gender}, age {k.age}, born {weekLabel(k.bornWeek)}) · {k.personality} · {k.interests} · {k.school} · {k.custody} custody
                  </li>
                ))}
              </ul>
            )}
            <h2 className="mt-5 font-display text-xl">Discography</h2>
            {songs.length === 0 ? (
              <p className="mt-2 text-sm text-muted">No released titles yet.</p>
            ) : (
              <ul className="mt-2 grid gap-1 text-sm">
                {songs
                  .slice()
                  .sort((x, y) => y.streams - x.streams)
                  .map((s) => {
                    const guest = s.collabArtistId ? game.artists.find((x) => x.id === s.collabArtistId) : null;
                    return (
                      <li key={s.id} className="flex justify-between gap-2">
                        <span className="min-w-0 truncate">
                          {s.title}
                          {guest ? <span className="text-muted"> feat. {guest.name}</span> : null}
                          <span className="text-muted"> · {s.releaseFormat}</span>
                          {s.chart ? <Pill className="ml-2">#{s.chart}</Pill> : null}
                        </span>
                        <span className="tabular-nums text-muted">{compact(s.streams)}</span>
                      </li>
                    );
                  })}
              </ul>
            )}
            {features.length > 0 && (
              <>
                <h2 className="mt-5 font-display text-xl">Features</h2>
                <ul className="mt-2 grid gap-1 text-sm text-muted">
                  {features.map((s) => {
                    const host = game.artists.find((x) => x.id === s.artistId);
                    return (
                      <li key={s.id}>
                        {host?.name} — {s.title}
                      </li>
                    );
                  })}
                </ul>
              </>
            )}
            <p className="mt-5 text-xs text-muted">
              Peak Billboard 100: {peak ? `#${peak}` : "—"}. Combined sales (digital + CD): {compact(combined)}. As of{" "}
              {weekLabel(game.week)}.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between gap-2">
      <dt className="text-muted">{k}</dt>
      <dd className="text-right">{v}</dd>
    </div>
  );
}
