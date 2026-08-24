import { X } from "lucide-react";
import type { ReactNode } from "react";
import { genreLabel } from "@/lib/game/catalog";
import { compact, money, weekLabel, weekParts } from "@/lib/game/format";
import { ensureArtistExtras, legalNameOf, rosterOf } from "@/lib/game/sim";
import { useGame } from "@/lib/game/store";
import { ArtistAvatar } from "./ArtistAvatar";
import { VerifiedBadge } from "./VerifiedBadge";

export function WikiPage({ artistId }: { artistId: string }) {
  const game = useGame((s) => s.game)!;
  const setOverlay = useGame((s) => s.setOverlay);
  const a = game.artists.find((x) => x.id === artistId) ?? rosterOf(game)[0];
  if (!a) return null;
  ensureArtistExtras(a);
  const songs = game.songs.filter((s) => s.artistId === a.id && s.status === "released" && s.kind !== "album" && s.kind !== "ep" && s.kind !== "greatestHits");
  const features = game.songs.filter((s) => s.collabArtistId === a.id);
  const albums = (game.albums ?? []).filter((al) => al.artistId === a.id && al.status === "released");
  const films = (game.films ?? []).filter((f) => f.artistId === a.id);
  const awards = (game.awards ?? []).filter((w) => w.artistId === a.id);
  const born = weekParts(1);
  const now = weekParts(game.week);
  const birthYear = now.year - a.age;
  const yearsActive = `${born.year}–${now.year}`;
  const peak = songs.reduce((n, s) => (s.peakChart != null && (n == null || s.peakChart < n) ? s.peakChart : n), null as number | null);
  const peakAlbum = albums.reduce((n, s) => (s.peakChart != null && (n == null || s.peakChart < n) ? s.peakChart : n), null as number | null);
  const combined = songs.reduce((n, s) => n + s.salesDigital + s.salesPhysical, 0) + albums.reduce((n, al) => n + al.salesDigital + al.salesPhysical, 0);
  const legal = legalNameOf(a);
  const occupation = a.kind === "band" ? "band" : "singer-songwriter";
  const label = a.signed ? (game.rivals.find((r) => r.id === a.labelId)?.name ?? game.labelName) : "Independent";
  const children = a.kids.map((k) => k.name).join(", ");

  return (
    <div className="fixed inset-0 z-50 grid place-items-end bg-bg/80 md:place-items-center md:p-6">
      <div className="max-h-[92dvh] w-full max-w-4xl overflow-auto rounded-t-xl border border-border bg-surface md:rounded-xl">
        <div className="flex items-center justify-between border-b border-border px-5 py-3">
          <p className="text-xs tracking-[0.18em] text-muted uppercase">From Music Star Career</p>
          <button className="grid size-11 place-items-center rounded-md hover:bg-subtle" onClick={() => setOverlay({ type: "none" })} aria-label="Close">
            <X className="size-5" />
          </button>
        </div>
        <div className="grid gap-6 p-5 md:grid-cols-[1fr_240px]">
          <article className="min-w-0">
            <h1 className="font-display text-4xl tracking-tight">{a.name}</h1>
            <p className="mt-3 text-sm leading-relaxed text-fg">
              <strong>{a.name}</strong>
              {legal !== a.name ? (
                <>
                  {" "}
                  (born <em>{legal}</em>, {birthYear})
                </>
              ) : (
                <> (born {birthYear})</>
              )}{" "}
              is a {a.nationality} {occupation} from {a.hometown}.{" "}
              {a.bio} {a.history}
            </p>

            <Section title="Early life">
              <p>
                {a.name} was born in {a.hometown} ({a.nationality}) in {birthYear}.{" "}
                {a.kind === "band" ? "The group formed locally before the first recordings." : `${legal} began writing and recording as a teenager.`}{" "}
                Parents {a.parents.mom} and {a.parents.dad} remain {a.parents.closeness >= 70 ? "close" : a.parents.closeness >= 40 ? "in contact" : "distant"}.
              </p>
            </Section>

            <Section title="Career">
              <p>
                Active {yearsActive}. Currently {a.signed ? `signed to ${label}` : "independent"}. Popularity {Math.round(a.popularity)} ·{" "}
                {compact(a.monthlyListeners)} Spotify monthly listeners (last four weeks of streams). Peak Billboard Hot 100:{" "}
                {peak ? `#${peak}` : "—"}. Peak Billboard 200: {peakAlbum ? `#${peakAlbum}` : "—"}. Combined sales {compact(combined)}.
              </p>
              <p className="mt-2">
                Followers — TikTok {compact(a.followers.tiktok)}, X {compact(a.followers.x)}, Instagram {compact(a.followers.instagram)}, YouTube{" "}
                {compact(a.followers.youtube)}.
              </p>
            </Section>

            <Section title="Personal life">
              <p>
                {a.relationship === "single" && "Single."}
                {a.relationship === "dating" && a.partner && `Dating ${a.partner.name}, ${a.partner.job}${a.partner.famous ? " and public figure" : ""}.`}
                {a.relationship === "engaged" && a.partner && `Engaged to ${a.partner.name}.`}
                {a.relationship === "married" && a.partner && `Married to ${a.partner.name} (${a.partner.job}).`}
                {a.relationship === "complicated" && "It's complicated."}{" "}
                {a.kids.length === 0 ? "No children listed." : `Children: ${children}.`}
              </p>
              {a.kids.length > 0 && (
                <ul className="mt-2 list-disc pl-5 text-sm text-muted">
                  {a.kids.map((k) => (
                    <li key={k.id}>
                      {k.name} ({k.gender}, age {k.age}, born {weekLabel(k.bornWeek)}) — {k.school}, {k.custody} custody
                    </li>
                  ))}
                </ul>
              )}
            </Section>

            <Section title="Discography">
              {albums.length === 0 && songs.length === 0 ? (
                <p>No released titles yet.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[520px] border-collapse text-sm">
                    <thead>
                      <tr className="border-b border-border text-left text-xs text-muted">
                        <th className="py-2 pr-3 font-medium">Title</th>
                        <th className="py-2 pr-3 font-medium">Type</th>
                        <th className="py-2 pr-3 font-medium">Peak 100</th>
                        <th className="py-2 pr-3 font-medium">Peak 200</th>
                        <th className="py-2 font-medium">Sales</th>
                      </tr>
                    </thead>
                    <tbody>
                      {albums
                        .slice()
                        .sort((x, y) => (y.releasedWeek ?? 0) - (x.releasedWeek ?? 0))
                        .map((al) => (
                          <tr key={al.id} className="border-b border-border/60">
                            <td className="py-2 pr-3 font-medium">{al.title}</td>
                            <td className="py-2 pr-3 text-muted">{al.kind === "ep" ? "EP" : al.kind === "greatestHits" ? "Compilation" : "Album"}</td>
                            <td className="py-2 pr-3 tabular-nums text-muted">—</td>
                            <td className="py-2 pr-3 tabular-nums">{al.peakChart ? `#${al.peakChart}` : "—"}</td>
                            <td className="py-2 tabular-nums">{compact(al.salesDigital + al.salesPhysical)}</td>
                          </tr>
                        ))}
                      {songs
                        .slice()
                        .sort((x, y) => y.streams - x.streams)
                        .slice(0, 16)
                        .map((s) => {
                          const guest = s.collabArtistId ? game.artists.find((x) => x.id === s.collabArtistId) : null;
                          return (
                            <tr key={s.id} className="border-b border-border/60">
                              <td className="py-2 pr-3">
                                {s.title}
                                {guest ? <span className="text-muted"> feat. {guest.name}</span> : null}
                              </td>
                              <td className="py-2 pr-3 text-muted">{s.albumId ? "Album track" : "Single"}</td>
                              <td className="py-2 pr-3 tabular-nums">{s.peakChart ? `#${s.peakChart}` : "—"}</td>
                              <td className="py-2 pr-3 tabular-nums">{s.peakAlbum ? `#${s.peakAlbum}` : "—"}</td>
                              <td className="py-2 tabular-nums">{compact(s.salesDigital + s.salesPhysical)}</td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              )}
            </Section>

            {features.length > 0 && (
              <Section title="Featured appearances">
                <ul className="grid gap-1 text-sm">
                  {features.map((s) => {
                    const host = game.artists.find((x) => x.id === s.artistId);
                    return (
                      <li key={s.id}>
                        {host?.name} — <em>{s.title}</em>
                        {s.peakChart ? ` (Hot 100 #${s.peakChart})` : ""}
                      </li>
                    );
                  })}
                </ul>
              </Section>
            )}

            {awards.length > 0 && (
              <Section title="Awards">
                <ul className="grid gap-1 text-sm">
                  {awards.map((w) => (
                    <li key={w.id}>
                      {w.show} — {w.category}
                      {w.songId ? ` for “${game.songs.find((s) => s.id === w.songId)?.title ?? "recording"}”` : ""} ({weekLabel(w.week)})
                    </li>
                  ))}
                </ul>
              </Section>
            )}

            {films.length > 0 && (
              <Section title="Filmography">
                <ul className="grid gap-1 text-sm">
                  {films.map((f) => (
                    <li key={f.id}>
                      <em>{f.title}</em> — {f.role === "none" ? "credited" : f.role} ({f.studio})
                      {f.gross ? ` · ${money(f.gross)}` : ""}
                    </li>
                  ))}
                </ul>
              </Section>
            )}

            <p className="mt-8 border-t border-border pt-3 text-xs text-muted">
              Page last updated {weekLabel(game.week)}. {compact(a.wikiViews || Math.round(a.monthlyListeners * 0.04))} page views.
            </p>
          </article>

          <aside className="h-fit overflow-hidden rounded-md border border-border-strong bg-elevated">
            <div className="border-b border-border bg-subtle px-3 py-2 text-center">
              <p className="font-display text-lg leading-tight">{a.name}</p>
            </div>
            <div className="grid place-items-center border-b border-border py-4">
              <ArtistAvatar spec={a.avatar} size={120} />
              <p className="mt-2 text-[11px] text-muted">{a.kind === "band" ? "Press photo" : `${a.name} in ${a.hometown}`}</p>
            </div>
            <table className="w-full text-xs">
              <tbody>
                <Info k="Born" v={`${legal}, ${birthYear} (${a.age})`} />
                <Info k="Birth name" v={legal} />
                <Info k="Origin" v={`${a.hometown}, ${a.nationality}`} />
                <Info k="Genres" v={genreLabel(a.genre)} />
                <Info k="Occupation" v={occupation} />
                <Info k="Years active" v={yearsActive} />
                <Info k="Labels" v={label} />
                <Info k="Partner" v={a.partner ? a.partner.name : "—"} />
                <Info k="Children" v={a.kids.length ? String(a.kids.length) : "—"} />
                <Info k="Instruments" v={a.kind === "band" ? "vocals, performance" : "vocals"} />
                <Info
                  k="Handles"
                  v={
                    <span className="inline-flex items-center gap-1">
                      @{a.handle}
                      <VerifiedBadge on={a.verified.spotify || a.verified.x} />
                    </span>
                  }
                />
              </tbody>
            </table>
          </aside>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-6">
      <h2 className="border-b border-border pb-1 font-display text-xl">{title}</h2>
      <div className="mt-2 text-sm leading-relaxed text-muted">{children}</div>
    </section>
  );
}

function Info({ k, v }: { k: string; v: ReactNode }) {
  return (
    <tr className="border-b border-border/70">
      <th className="w-[42%] bg-subtle px-3 py-1.5 text-left font-medium text-muted">{k}</th>
      <td className="px-3 py-1.5 text-right">{v}</td>
    </tr>
  );
}
