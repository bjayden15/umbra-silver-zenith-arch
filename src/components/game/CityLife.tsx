import { useState } from "react";
import { money, weekLabel } from "@/lib/game/format";
import { playerArtist, unreadMail } from "@/lib/game/sim";
import { useGame } from "@/lib/game/store";
import { ENT_ROLES, FILMS, GIFTS, JETS, JEWELRY, LAWYERS, LUXURY_DAYS, NIGHTLIFE, SUBSTANCES, BOTTLES } from "@/lib/game/world";
import { GhostBtn, Meter, Panel, Pill, PrimaryBtn } from "./bits";

export function MailScreen() {
  const game = useGame((s) => s.game)!;
  const openMail = useGame((s) => s.openMail);
  const [id, setId] = useState<string | null>(game.mail?.[0]?.id ?? null);
  const unread = unreadMail(game);
  const selected = (game.mail ?? []).find((m) => m.id === id) ?? game.mail?.[0];

  return (
    <div className="mx-auto grid max-w-4xl gap-4 p-4 md:p-6">
      <div>
        <h1 className="font-display text-3xl">Inbox</h1>
        <p className="text-sm text-muted">
          {unread} unread. Labels, film reads, legal, beat packs, business only. Family hits a toast.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-[16rem_1fr]">
        <ul className="grid max-h-[70vh] gap-1 overflow-auto">
          {(!game.mail || game.mail.length === 0) ? (
            <p className="text-sm text-muted">Empty. Advance a week.</p>
          ) : (
            game.mail.map((m) => (
              <li key={m.id}>
                <button
                  onClick={() => {
                    setId(m.id);
                    openMail(m.id);
                  }}
                  className={`flex min-h-12 w-full flex-col rounded-lg px-3 py-2 text-left text-sm ${
                    selected?.id === m.id ? "bg-accent/15" : "bg-subtle"
                  }`}
                >
                  <span className="flex items-center justify-between gap-2">
                    <span className={m.read ? "text-muted" : "font-medium"}>{m.from}</span>
                    {!m.read ? <Pill tone="mint">new</Pill> : null}
                  </span>
                  <span className="truncate text-xs text-muted">{m.subject}</span>
                </button>
              </li>
            ))
          )}
        </ul>
        {selected ? (
          <Panel title={selected.subject}>
            <p className="text-xs text-muted">
              {selected.from} · {selected.kind} · {weekLabel(selected.week)}
            </p>
            <p className="mt-3 text-sm leading-relaxed">{selected.body}</p>
          </Panel>
        ) : null}
      </div>
    </div>
  );
}

export function HollywoodScreen() {
  const game = useGame((s) => s.game)!;
  const film = useGame((s) => s.film);
  const you = playerArtist(game);
  const box = [...game.films].filter((f) => f.status === "released").sort((a, b) => (a.boxRank ?? 99) - (b.boxRank ?? 99));
  const ost = game.songs.filter((s) => s.ost && s.status === "released").sort((a, b) => b.streamsWeek - a.streamsWeek);
  const slate = (game.films ?? []).filter((f) => f.status === "pre");

  return (
    <div className="mx-auto grid max-w-4xl gap-4 p-4 md:p-6">
      <div>
        <h1 className="font-display text-3xl">Hollywood</h1>
        <p className="text-sm text-muted">
          Cameos, supporting, leads, voice, OST. The slate refreshes with new titles. Fame gates the room.
        </p>
      </div>
      {slate.length > 0 && (
        <Panel title="This week's slate">
          <ul className="grid gap-2">
            {slate.map((f) => {
              const need = f.fameNeed ?? 16;
              const locked = (you?.fame ?? 0) < need;
              return (
                <li key={f.id} className="flex flex-wrap items-center justify-between gap-2 rounded-lg bg-subtle px-3 py-2 text-sm">
                  <span>
                    {f.title}
                    <span className="text-muted">
                      {" "}
                      · {f.studio} · {f.role}
                      {f.ostOffer ? " · OST" : ""} · {money(f.pay)} · fame {need}
                    </span>
                  </span>
                  {locked ? <Pill>fame {need}</Pill> : <GhostBtn onClick={() => film(f.catalogId)}>Audition</GhostBtn>}
                </li>
              );
            })}
          </ul>
        </Panel>
      )}
      <Panel title="Standing scripts">
        <ul className="grid gap-2">
          {FILMS.map((f) => {
            const locked = (you?.fame ?? 0) < f.fameNeed;
            return (
              <li key={f.id} className="flex flex-wrap items-center justify-between gap-2 rounded-lg bg-subtle px-3 py-2 text-sm">
                <span>
                  {f.title}
                  <span className="text-muted">
                    {" "}
                    · {f.studio} · {f.role}
                    {f.ost ? " · OST" : ""} · {money(f.pay)} · fame {f.fameNeed}
                  </span>
                </span>
                {locked ? <Pill>fame {f.fameNeed}</Pill> : <GhostBtn onClick={() => film(f.id)}>Audition</GhostBtn>}
              </li>
            );
          })}
        </ul>
      </Panel>
      <Panel title="Box office">
        {box.length === 0 ? (
          <p className="text-sm text-muted">No pictures in theaters.</p>
        ) : (
          <ol className="grid gap-1 text-sm">
            {box.map((f) => (
              <li key={f.id} className="flex justify-between gap-2">
                <span>
                  #{f.boxRank} {f.title}
                  {f.role !== "none" ? <span className="text-muted"> · you · {f.role}</span> : null}
                </span>
                <span className="tabular-nums text-muted">
                  {money(f.grossWeek)} wk · {money(f.gross)} cume
                </span>
              </li>
            ))}
          </ol>
        )}
      </Panel>
      <Panel title="Soundtrack chart">
        {ost.length === 0 ? (
          <p className="text-sm text-muted">No OST singles this week.</p>
        ) : (
          <ol className="grid gap-1 text-sm">
            {ost.slice(0, 20).map((s, i) => (
              <li key={s.id} className="flex justify-between">
                <span>
                  #{i + 1} {s.title}
                </span>
                <span className="tabular-nums text-muted">{Math.round(s.streamsWeek).toLocaleString("en-US")} streams</span>
              </li>
            ))}
          </ol>
        )}
      </Panel>
      {game.films.some((f) => f.artistId && f.status === "shooting") && (
        <Panel title="On set">
          <ul className="grid gap-1 text-sm">
            {game.films
              .filter((f) => f.artistId && f.status === "shooting")
              .map((f) => (
                <li key={f.id}>
                  {f.title} · {f.weeksLeft} weeks left · {f.role}
                </li>
              ))}
          </ul>
        </Panel>
      )}
    </div>
  );
}

export function LegalScreen() {
  const game = useGame((s) => s.game)!;
  const openCheckout = useGame((s) => s.openCheckout);
  const journal = useGame((s) => s.journal);
  const you = playerArtist(game);

  return (
    <div className="mx-auto grid max-w-4xl gap-4 p-4 md:p-6">
      <div>
        <h1 className="font-display text-3xl">Legal</h1>
        <p className="text-sm text-muted">
          Fights, DUI, contraband, fraud. Hire counsel, post bail, or sit the weeks and write from inside.
        </p>
      </div>
      {you && you.incarceratedWeeks > 0 && (
        <Panel className="border-bad/30" title={`Inside · ${you.incarceratedWeeks} weeks`}>
          <p className="text-sm text-muted">Street cred {Math.round(you.streetCred)}. The booth still works.</p>
          <PrimaryBtn className="mt-3" onClick={journal}>
            Write a prison journal
          </PrimaryBtn>
        </Panel>
      )}
      {game.legal.length === 0 ? (
        <p className="text-sm text-muted">Clean docket. Don't give them a reason.</p>
      ) : (
        game.legal.map((c) => (
          <Panel key={c.id} title={`${c.kind} · ${c.status}`}>
            <p className="text-sm text-muted">{c.note}</p>
            <p className="mt-2 text-xs text-muted">
              Bail {money(c.bail)} · fine {money(c.fine)} · {c.weeksLeft} weeks on the clock
            </p>
            {c.status !== "cleared" && c.status !== "jailed" && (
              <div className="mt-3 flex flex-wrap gap-2">
                <PrimaryBtn onClick={() => openCheckout({ kind: "bail", id: c.id, title: `Bail · ${c.kind}`, price: c.bail })}>
                  Post bail
                </PrimaryBtn>
                {LAWYERS.map((l) => (
                  <GhostBtn
                    key={l.id}
                    onClick={() =>
                      openCheckout({
                        kind: "lawyer",
                        id: l.id,
                        title: `${l.name} · ${c.kind}`,
                        price: l.cost,
                        extra: { caseId: c.id, lawyerId: l.id },
                      })
                    }
                  >
                    {l.name} · {l.cost ? money(l.cost) : "free"}
                  </GhostBtn>
                ))}
              </div>
            )}
          </Panel>
        ))
      )}
    </div>
  );
}

export function HealthScreen() {
  const game = useGame((s) => s.game)!;
  const openCheckout = useGame((s) => s.openCheckout);
  const you = playerArtist(game);
  if (!you) return <p className="p-6 text-sm text-muted">Artist career.</p>;

  return (
    <div className="mx-auto grid max-w-3xl gap-4 p-4 md:p-6">
      <div>
        <h1 className="font-display text-3xl">Health</h1>
        <p className="text-sm text-muted">
          Energy, vocal, mental. Substances boost the session then bill you in crashes, leaks, and court.
        </p>
      </div>
      <Panel>
        <div className="grid gap-3">
          <Meter label="Energy" value={you.energy} />
          <Meter label="Vocal health" value={you.vocalHealth} />
          <Meter label="Mental" value={you.mental} />
          <Meter label="Alcohol" value={you.addiction.alcohol} />
          <Meter label="Pills" value={you.addiction.pills} />
          <Meter label="Smoke" value={you.addiction.smoke} />
        </div>
      </Panel>
      <Panel title="Use">
        <div className="flex flex-wrap gap-2">
          {SUBSTANCES.map((s) => (
            <GhostBtn
              key={s.id}
              onClick={() => openCheckout({ kind: "substance", id: s.id, title: s.name, price: s.cost })}
            >
              {s.name} · {money(s.cost)}
            </GhostBtn>
          ))}
        </div>
      </Panel>
      <Panel title="Rehab">
        {you.rehabWeeks > 0 ? (
          <p className="text-sm">{you.rehabWeeks} weeks left in the house.</p>
        ) : (
          <PrimaryBtn onClick={() => openCheckout({ kind: "rehab", id: "rehab", title: "Serenity Hills rehab", price: 48_000 })}>
            Check in · $48k · 4 weeks
          </PrimaryBtn>
        )}
      </Panel>
    </div>
  );
}

export function NightlifeScreen() {
  const game = useGame((s) => s.game)!;
  const openCheckout = useGame((s) => s.openCheckout);
  const you = playerArtist(game);

  return (
    <div className="mx-auto grid max-w-4xl gap-4 p-4 md:p-6">
      <div>
        <h1 className="font-display text-3xl">Nightlife</h1>
        <p className="text-sm text-muted">
          Click a room. VIP tables, high-roller suites, afterparties. Bottle service runs $12k–$100k on top.
        </p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {NIGHTLIFE.map((n) => {
          const locked = (you?.fame ?? 0) < n.fameNeed;
          return (
            <button
              key={n.id}
              disabled={locked}
              onClick={() => openCheckout({ kind: "night", id: n.id, title: n.name, price: n.cost })}
              className="min-h-24 rounded-xl border border-border bg-surface p-4 text-left hover:bg-elevated disabled:opacity-40"
            >
              <p className="font-display text-xl">{n.name}</p>
              <p className="mt-1 text-sm text-muted">
                {money(n.cost)} · fame {n.fameNeed}
                {n.city !== "any" ? ` · ${n.city}` : ""}
                {locked ? " · locked" : ""}
              </p>
            </button>
          );
        })}
      </div>
      <Panel title="Bottle service">
        <p className="mb-2 text-sm text-muted">Ace of Spades through six-figure Nebuchadnezzars. The table photographs itself.</p>
        <ul className="grid gap-2">
          {BOTTLES.map((b) => {
            const locked = (you?.fame ?? 0) < b.fameNeed;
            return (
              <li key={b.id} className="flex flex-wrap items-center justify-between gap-2 rounded-lg bg-subtle px-3 py-2 text-sm">
                <span>
                  {b.name}
                  <span className="text-muted"> · {money(b.cost)}</span>
                </span>
                {locked ? (
                  <Pill>fame {b.fameNeed}</Pill>
                ) : (
                  <GhostBtn onClick={() => openCheckout({ kind: "bottle", id: b.id, title: b.name, price: b.cost })}>
                    Order
                  </GhostBtn>
                )}
              </li>
            );
          })}
        </ul>
      </Panel>
      <Panel title="Private buyouts">
        <p className="mb-2 text-sm text-muted">Rent the zoo, the park, the water park. $250k and up. Family only.</p>
        <ul className="grid gap-2">
          {LUXURY_DAYS.map((d) => {
            const locked = (you?.fame ?? 0) < d.fameNeed;
            return (
              <li key={d.id} className="flex flex-wrap items-center justify-between gap-2 rounded-lg bg-subtle px-3 py-2 text-sm">
                <span>
                  {d.name}
                  <span className="text-muted">
                    {" "}
                    · {money(d.cost)} · fame {d.fameNeed}
                  </span>
                </span>
                {locked ? <Pill>fame {d.fameNeed}</Pill> : (
                  <PrimaryBtn onClick={() => openCheckout({ kind: "luxury", id: d.id, title: d.name, price: d.cost })}>
                    Buy the day
                  </PrimaryBtn>
                )}
              </li>
            );
          })}
        </ul>
      </Panel>
    </div>
  );
}

export function EntourageBlock() {
  const game = useGame((s) => s.game)!;
  const crew = useGame((s) => s.crew);
  const setCrew = useGame((s) => s.setCrew);
  const openCheckout = useGame((s) => s.openCheckout);
  const you = playerArtist(game);
  const fame = you?.fame ?? 0;

  return (
    <>
      <Panel title="Entourage">
        <div className="flex flex-wrap gap-2">
          {ENT_ROLES.map((r) => (
            <GhostBtn key={r.id} onClick={() => crew(r.id, !game.entourage?.[r.id])}>
              {r.name} · {game.entourage?.[r.id] ? "on" : "off"} · {money(r.weekly)}/wk
            </GhostBtn>
          ))}
        </div>
      </Panel>
      <Panel title="Jets">
        <ul className="grid gap-2">
          {JETS.map((j) => {
            const owned = game.jets.some((x) => x.catalogId === j.id);
            return (
              <li key={j.id} className="flex flex-wrap items-center justify-between gap-2 rounded-lg bg-subtle px-3 py-2 text-sm">
                <span>
                  {j.name}
                  <span className="text-muted"> · {money(j.price)}</span>
                </span>
                {owned ? <Pill tone="mint">owned</Pill> : fame < j.fameNeed ? <Pill>fame {j.fameNeed}</Pill> : (
                  <GhostBtn
                    onClick={() =>
                      openCheckout({
                        kind: "jet",
                        id: j.id,
                        title: j.name,
                        price: j.price,
                        financeable: true,
                        leasable: true,
                      })
                    }
                  >
                    Buy
                  </GhostBtn>
                )}
              </li>
            );
          })}
        </ul>
      </Panel>
      {game.jets.length > 0 && (
        <Panel title="Flight department">
          <p className="text-sm text-muted">
            {game.jetCrew?.pilots ?? 0} pilots · {game.jetCrew?.attendants ?? 0} attendants ·{" "}
            {money((game.jetCrew?.pilots ?? 0) * 4_000 + (game.jetCrew?.attendants ?? 0) * 2_200)}/wk
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <GhostBtn onClick={() => setCrew(1, 1)}>1 pilot · 1 attendant</GhostBtn>
            <GhostBtn onClick={() => setCrew(2, 2)}>2 · 2</GhostBtn>
            <GhostBtn onClick={() => setCrew(2, 4)}>Long-range crew</GhostBtn>
            <GhostBtn onClick={() => setCrew(0, 0)}>Park it</GhostBtn>
          </div>
        </Panel>
      )}
      <Panel title="Jewelry">
        <ul className="grid gap-2">
          {JEWELRY.map((j) => {
            const owned = game.jewelry.some((x) => x.catalogId === j.id);
            return (
              <li key={j.id} className="flex flex-wrap items-center justify-between gap-2 rounded-lg bg-subtle px-3 py-2 text-sm">
                <span>
                  {j.name}
                  <span className="text-muted"> · {money(j.price)}</span>
                </span>
                {owned ? <Pill tone="mint">owned</Pill> : fame < j.fameNeed ? <Pill>fame {j.fameNeed}</Pill> : (
                  <GhostBtn
                    onClick={() =>
                      openCheckout({
                        kind: "jewelry",
                        id: j.id,
                        title: j.name,
                        price: j.price,
                      })
                    }
                  >
                    Buy
                  </GhostBtn>
                )}
              </li>
            );
          })}
        </ul>
      </Panel>
    </>
  );
}

export function GiftRow() {
  const openCheckout = useGame((s) => s.openCheckout);
  return (
    <div className="mt-3 flex flex-wrap gap-2">
      {GIFTS.map((g) => (
        <GhostBtn
          key={g.id}
          onClick={() => openCheckout({ kind: "gift", id: g.id, title: g.name, price: g.cost })}
        >
          {g.name} · {money(g.cost)}
        </GhostBtn>
      ))}
    </div>
  );
}
