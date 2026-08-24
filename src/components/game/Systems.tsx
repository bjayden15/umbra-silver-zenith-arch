import { useState } from "react";
import { compact, money } from "@/lib/game/format";
import { playerArtist, playerSongs, rosterOf, syncPopularity, venueDraw } from "@/lib/game/sim";
import { useGame } from "@/lib/game/store";
import { REGIONS, type RegionId } from "@/lib/game/types";
import { ACHIEVEMENTS, AWARDS, AWARD_CALENDAR, BANKS, BUILD_OPTS, CARS, COACHING, FESTIVALS, HOUSES, ISLANDS, LAND, LESSONS, SCHOOLS, SUITORS, VACATIONS, VENUES, aprForScore, suitorGender } from "@/lib/game/world";
import { matchesOrientation } from "@/lib/game/family";
import { autoQuote, cardLimitForScore, creditBand, mortgageQuote, personalLoanMax } from "@/lib/game/finance";
import { GhostBtn, Meter, Panel, Pill, PrimaryBtn } from "./bits";
import { ArtistAvatar } from "./ArtistAvatar";
import { EntourageBlock, GiftRow } from "./CityLife";

export function ToursScreen() {
  const game = useGame((s) => s.game)!;
  const tour = useGame((s) => s.tour);
  const tourStops = useGame((s) => s.tourStops);
  const festival = useGame((s) => s.festival);
  const euro = useGame((s) => s.euro);
  const roster = rosterOf(game);
  const [name, setName] = useState("World run");
  const [n, setN] = useState(4);
  const [picked, setPicked] = useState<string[]>([]);
  const [sort, setSort] = useState<"asc" | "desc">("asc");
  const [region, setRegion] = useState<RegionId | "all">("all");
  const a = roster[0];
  if (a) syncPopularity(a);

  const venues = VENUES.filter((v) => region === "all" || v.region === region).slice().sort((x, y) =>
    sort === "asc" ? x.capacity - y.capacity : y.capacity - x.capacity,
  );

  const toggle = (id: string) => setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));

  return (
    <div className="mx-auto grid max-w-4xl gap-4 p-4 md:p-6">
      <h1 className="font-display text-3xl">Tours</h1>
      <p className="text-sm text-muted">
        Clubs to stadiums. Sorted by how many people fit. Fill estimate uses popularity, monthly listeners, and fame.
      </p>
      {a && (
        <Panel title="Arrange a tour">
          <p className="mb-2 text-xs text-muted">
            {a.name} · popularity {Math.round(a.popularity)} · {compact(a.monthlyListeners)} monthly
          </p>
          <div className="flex flex-wrap gap-2">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-11 min-w-40 flex-1 rounded-md border border-border bg-elevated px-3 text-sm"
            />
            <select value={n} onChange={(e) => setN(Number(e.target.value))} className="h-11 rounded-md border border-border bg-elevated px-2 text-sm">
              {[3, 4, 6, 8, 12].map((x) => (
                <option key={x} value={x}>
                  {x} auto rooms
                </option>
              ))}
            </select>
            <PrimaryBtn onClick={() => tour(a.id, name, n)}>Book fillable rooms</PrimaryBtn>
            <GhostBtn disabled={!picked.length} onClick={() => tourStops(a.id, name, picked)}>
              Book selected ({picked.length})
            </GhostBtn>
          </div>
        </Panel>
      )}
      <Panel title="Rooms">
        <div className="mb-3 flex flex-wrap gap-2">
          <button onClick={() => setSort(sort === "asc" ? "desc" : "asc")} className="min-h-10 rounded-full bg-subtle px-3 text-xs">
            Capacity {sort === "asc" ? "small → large" : "large → small"}
          </button>
          <button onClick={() => setRegion("all")} className={`min-h-10 rounded-full px-3 text-xs ${region === "all" ? "bg-accent text-accent-fg" : "bg-subtle"}`}>
            All regions
          </button>
          {REGIONS.map((r) => (
            <button
              key={r.id}
              onClick={() => setRegion(r.id)}
              className={`min-h-10 rounded-full px-3 text-xs ${region === r.id ? "bg-accent text-accent-fg" : "bg-subtle"}`}
            >
              {r.label}
            </button>
          ))}
        </div>
        <ul className="grid max-h-[28rem] gap-2 overflow-auto">
          {venues.map((v) => {
            const draw = a ? venueDraw(a, v.capacity) : { fill: 0, canFill: false, note: "—", attendance: 0 };
            const on = picked.includes(v.id);
            return (
              <li key={v.id}>
                <button
                  onClick={() => toggle(v.id)}
                  className={`flex w-full flex-wrap items-center justify-between gap-2 rounded-lg px-3 py-2 text-left text-sm ${on ? "bg-accent/15" : "bg-subtle"}`}
                >
                  <span>
                    {v.name}
                    <span className="text-muted">
                      {" "}
                      · {v.city} · {compact(v.capacity)} cap · {money(v.ticket)}
                    </span>
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="tabular-nums text-xs text-muted">{compact(draw.attendance)}</span>
                    <Pill tone={draw.canFill ? "mint" : draw.fill >= 0.4 ? "default" : "bad"}>{draw.note}</Pill>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </Panel>
      <Panel title="Eurovision">
        <p className="text-sm text-muted">Enter if you're not a US act. Auto-sim the televote.</p>
        <PrimaryBtn className="mt-2" onClick={euro}>
          Enter Eurovision
        </PrimaryBtn>
        {game.eurovision?.entered ? (
          <p className="mt-2 text-sm">
            {game.eurovision.year} · {game.eurovision.place === 1 ? "Winner" : `#${game.eurovision.place}`}
          </p>
        ) : null}
      </Panel>
      <Panel title="Festivals">
        <ul className="grid gap-2">
          {FESTIVALS.map((f) => (
            <li key={f.id} className="flex flex-wrap items-center justify-between gap-2 rounded-lg bg-subtle px-3 py-2 text-sm">
              <span>
                {f.name}
                <span className="text-muted">
                  {" "}
                  · {f.city} · {compact(f.capacity)}
                </span>
              </span>
              <GhostBtn onClick={() => a && festival(a.id, f.id)}>Play · fee {money(f.fee)}</GhostBtn>
            </li>
          ))}
        </ul>
      </Panel>
      {game.tours.map((t) => (
        <Panel key={t.id} title={`${t.name} · ${t.status}`}>
          <ul className="grid gap-1 text-sm">
            {t.stops.map((s) => (
              <li key={s.id} className="flex justify-between">
                <span className={s.done ? "text-muted" : ""}>
                  w{s.week} · {s.venue}, {s.city}
                </span>
                <span className="tabular-nums text-muted">
                  {compact(s.attendance)}/{compact(s.capacity)}
                  {s.canFill ? "" : " · short"} · {money(s.gross)}
                </span>
              </li>
            ))}
          </ul>
        </Panel>
      ))}
    </div>
  );
}

export function PromoScreen() {
  const game = useGame((s) => s.game)!;
  const promo = useGame((s) => s.promo);
  const radio = useGame((s) => s.radio);
  const playlist = useGame((s) => s.playlist);
  const songs = playerSongs(game).filter((s) => s.status === "released");
  const [songId, setSongId] = useState(songs[0]?.id ?? "");
  const [platform, setPlatform] = useState<"tiktok" | "x" | "instagram" | "youtube" | "spotify" | "radio" | "tv" | "press" | "reddit">("tiktok");
  const [budget, setBudget] = useState(2500);

  return (
    <div className="mx-auto grid max-w-3xl gap-4 p-4 md:p-6">
      <h1 className="font-display text-3xl">Promotion</h1>
      <p className="text-sm text-muted">Boosting a song on an app adds heat. Without heat, weekly streams collapse.</p>
      <Panel>
        {songs.length === 0 ? (
          <p className="text-sm text-muted">Release first.</p>
        ) : (
          <div className="grid gap-3">
            <select value={songId} onChange={(e) => setSongId(e.target.value)} className="h-11 rounded-md border border-border bg-elevated px-2 text-sm">
              {songs.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.title} · heat {Math.round(s.promoHeat)} · {compact(s.streamsWeek)} /wk
                </option>
              ))}
            </select>
            <div className="flex flex-wrap gap-2">
              {(["tiktok", "x", "instagram", "youtube", "spotify", "radio", "tv", "press", "reddit"] as const).map((p) => (
                <button
                  key={p}
                  onClick={() => setPlatform(p)}
                  className={`rounded-full px-3 py-1.5 text-xs ${platform === p ? "bg-accent text-accent-fg" : "bg-subtle"}`}
                >
                  {p === "tiktok" ? "TikTok" : p === "x" ? "X" : p === "instagram" ? "Instagram" : p === "youtube" ? "YouTube" : p === "spotify" ? "Spotify" : p}
                </button>
              ))}
            </div>
            <label className="text-xs text-muted">
              Budget ${budget.toLocaleString("en-US")}
              <input type="range" min={500} max={50000} step={500} value={budget} onChange={(e) => setBudget(Number(e.target.value))} className="mt-1 w-full" />
            </label>
            <div className="flex flex-wrap gap-2">
              <PrimaryBtn onClick={() => songId && promo(songId, platform, budget)}>Run campaign</PrimaryBtn>
              <GhostBtn onClick={() => songId && radio(songId)}>Radio add</GhostBtn>
              <GhostBtn onClick={() => songId && playlist(songId)}>Spotify pitch</GhostBtn>
            </div>
          </div>
        )}
      </Panel>
      {game.campaigns.length > 0 && (
        <Panel title="Active">
          <ul className="grid gap-2 text-sm">
            {game.campaigns.map((c) => (
              <li key={c.id} className="flex justify-between">
                <span>
                  {c.platform} · {game.songs.find((s) => s.id === c.songId)?.title}
                </span>
                <span className="text-muted">
                  {money(c.budget)} · {c.weeksLeft}w
                </span>
              </li>
            ))}
          </ul>
        </Panel>
      )}
    </div>
  );
}

export function AwardsScreen() {
  const game = useGame((s) => s.game)!;
  const setOverlay = useGame((s) => s.setOverlay);
  const live = game.ceremony && !game.ceremony.done;

  return (
    <div className="mx-auto grid max-w-3xl gap-4 p-4 md:p-6">
      <h1 className="font-display text-3xl">Awards</h1>
      <p className="text-sm text-muted">
        Calendar weeks trigger Grammys, BRITs, Billboard, BET, VMAs. Skip a category or the whole show — hardware still prints.
      </p>
      {live ? (
        <Panel title={`${game.ceremony!.show} is live`}>
          <p className="text-sm text-muted">The envelope is on the table.</p>
          <PrimaryBtn className="mt-3" onClick={() => setOverlay({ type: "ceremony" })}>
            Open telecast
          </PrimaryBtn>
        </Panel>
      ) : null}
      <Panel>
        {game.awards.length === 0 ? (
          <p className="text-sm text-muted">No hardware yet. Chart, then wait for the telecast.</p>
        ) : (
          <ul className="grid gap-3">
            {game.awards.map((a) => (
              <li key={a.id}>
                <p className="font-medium">{a.show}</p>
                <p className="text-sm text-muted">
                  {a.category} · week {a.week} · {game.songs.find((s) => s.id === a.songId)?.title}
                </p>
              </li>
            ))}
          </ul>
        )}
      </Panel>
      <Panel title="Calendar">
        <ul className="grid gap-1 text-sm">
          {AWARD_CALENDAR.map((a) => (
            <li key={a.show} className="flex justify-between">
              <span>{a.show}</span>
              <span className="text-muted">week {a.weekOfYear} of the year</span>
            </li>
          ))}
        </ul>
      </Panel>
      <Panel title="Categories">
        <ul className="grid gap-1 text-sm">
          {AWARDS.map((a) => (
            <li key={a.id} className="flex justify-between">
              <span>{a.show}</span>
              <span className="text-muted">{a.category}</span>
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}

export function BankScreen() {
  const game = useGame((s) => s.game)!;
  const loan = useGame((s) => s.loan);
  const card = useGame((s) => s.card);
  const saveBank = useGame((s) => s.saveBank);
  const takeBank = useGame((s) => s.takeBank);
  const black = useGame((s) => s.black);
  const toggleAutopay = useGame((s) => s.toggleAutopay);
  const [amount, setAmount] = useState(25000);
  const score = Math.round(game.creditScore);
  const band = creditBand(score);
  const houseQ = mortgageQuote(game, 540_000);
  const carQ = autoQuote(game, 41_800, "loan");
  const leaseQ = autoQuote(game, 41_800, "lease");
  const used = game.cards.reduce((n, c) => n + c.used, 0);
  const limits = game.cards.reduce((n, c) => n + (c.black ? 0 : c.limit), 0);

  return (
    <div className="mx-auto grid max-w-4xl gap-4 p-4 md:p-6">
      <div>
        <h1 className="font-display text-3xl">Bank</h1>
        <p className="text-sm text-muted">
          FICO {score} · {band.label}. Debit is checking. Credit limits, mortgages, auto loans and leases all move with the
          score — same as a real desk. Miss payments and it falls. On-time lifts it.
        </p>
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        <Panel>
          <p className="text-xs text-muted">FICO · {band.label}</p>
          <p className="font-display text-3xl tabular-nums">{score}</p>
          <Meter value={((score - 300) / 550) * 100} />
          <p className="mt-2 text-xs text-muted">{band.copy}</p>
        </Panel>
        <Panel>
          <p className="text-xs text-muted">Debit / checking</p>
          <p className="font-display text-3xl tabular-nums">{money(game.cash)}</p>
          <p className="mt-2 text-xs text-muted">HYSA {money(game.savings ?? 0)} · {game.savingsApr}% APY</p>
        </Panel>
        <Panel>
          <p className="text-xs text-muted">Credit used</p>
          <p className="font-display text-3xl tabular-nums">{money(used)}</p>
          <p className="mt-2 text-xs text-muted">
            {game.cards.some((c) => c.black) ? "Black on file · " : ""}limits {money(limits)} · loans{" "}
            {money(game.loans.reduce((n, l) => n + l.remaining, 0))}
          </p>
        </Panel>
      </div>
      <Panel title="What this score can do">
        <ul className="grid gap-2 text-sm">
          <li className="flex justify-between gap-3">
            <span>Mortgage (Midtown condo example)</span>
            <span className="tabular-nums text-muted">
              {houseQ.allowed
                ? `${Math.round(houseQ.minDownPct * 100)}% down · ${houseQ.apr.toFixed(2)}% · ${money(houseQ.weekly)}/wk`
                : houseQ.reason}
            </span>
          </li>
          <li className="flex justify-between gap-3">
            <span>Auto finance (Model 3)</span>
            <span className="tabular-nums text-muted">
              {carQ.allowed
                ? `${Math.round(carQ.minDownPct * 100)}% down · ${carQ.apr.toFixed(2)}%`
                : carQ.reason}
            </span>
          </li>
          <li className="flex justify-between gap-3">
            <span>Auto lease</span>
            <span className="tabular-nums text-muted">{leaseQ.allowed ? `${leaseQ.apr.toFixed(2)}% · ${money(leaseQ.weekly)}/wk` : leaseQ.reason}</span>
          </li>
        </ul>
      </Panel>
      <Panel title="Weekly autopay">
        <p className="text-sm text-muted">
          Pull the statement from checking every week so you never miss a minimum. On-time lifts FICO.
        </p>
        <PrimaryBtn className="mt-3" onClick={toggleAutopay}>
          {game.cardAutopay ? "Autopay on" : "Autopay off"}
        </PrimaryBtn>
      </Panel>
      <Panel title="Savings & Black">
        <p className="text-sm text-muted">
          HYSA {game.savingsApr}% APY · balance {money(game.savings ?? 0)}. Onyx Black needs FICO 760 and either $2M liquid or 80 fame.
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <GhostBtn onClick={() => saveBank(5_000)}>Deposit $5,000</GhostBtn>
          <GhostBtn onClick={() => saveBank(25_000)}>Deposit $25,000</GhostBtn>
          <GhostBtn onClick={() => takeBank(Math.min(game.savings ?? 0, 5_000))}>Withdraw $5,000</GhostBtn>
          <PrimaryBtn disabled={game.blackCard} onClick={black}>
            {game.blackCard ? "Black card live" : "Apply for Black"}
          </PrimaryBtn>
        </div>
      </Panel>
      {BANKS.map((b) => {
        const apr = aprForScore(b.personalApr, score);
        const locked = score < b.minScore;
        const maxLoan = personalLoanMax(game, b.id);
        const limit = cardLimitForScore(score, b.id);
        return (
          <Panel key={b.id} title={b.name}>
            <p className="text-sm text-muted">{b.note}</p>
            <p className="mt-2 text-xs text-muted">
              Personal {b.personalApr[0]}–{b.personalApr[1]}% · Mortgage {b.mortgageApr[0]}–{b.mortgageApr[1]}% · Card{" "}
              {b.cardApr[0]}–{b.cardApr[1]}% · min FICO {b.minScore}
            </p>
            <p className="mt-1 text-sm">
              Your personal APR today: <span className="tabular-nums">{apr.toFixed(2)}%</span>
              {" · "}max unsecured {money(maxLoan)} · card limit {money(limit)}
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <input
                type="number"
                min={1000}
                step={1000}
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="h-11 w-32 rounded-md border border-border bg-elevated px-2 text-sm"
              />
              <PrimaryBtn disabled={locked} onClick={() => loan(b.id, amount, "personal")}>
                Personal loan
              </PrimaryBtn>
              <GhostBtn disabled={locked} onClick={() => card(b.id)}>
                Credit card
              </GhostBtn>
              {locked ? <Pill tone="bad">Need {b.minScore}</Pill> : null}
            </div>
          </Panel>
        );
      })}
      {game.loans.length > 0 && (
        <Panel title="Loans">
          <ul className="grid gap-2 text-sm">
            {game.loans.map((l) => (
              <li key={l.id} className="flex justify-between">
                <span>
                  {l.bankName} · {l.purpose} · {l.apr.toFixed(2)}%
                </span>
                <span className="tabular-nums text-muted">
                  {money(l.remaining)} · {money(l.weeklyPayment)}/wk
                </span>
              </li>
            ))}
          </ul>
        </Panel>
      )}
      {game.cards.length > 0 && (
        <Panel title="Cards">
          <ul className="grid gap-2 text-sm">
            {game.cards.map((c) => (
              <li key={c.id} className="flex justify-between">
                <span>
                  {c.name} · {c.apr.toFixed(2)}%
                </span>
                <span className="tabular-nums">
                  {money(c.used)} / {c.black ? "open" : money(c.limit)}
                </span>
              </li>
            ))}
          </ul>
        </Panel>
      )}
    </div>
  );
}

export function LifeScreen() {
  const game = useGame((s) => s.game)!;
  const openCheckout = useGame((s) => s.openCheckout);
  const security = useGame((s) => s.security);
  const meetup = useGame((s) => s.meetup);
  const you = playerArtist(game) ?? rosterOf(game)[0];
  const fame = you?.fame ?? game.labelRep;
  const score = Math.round(game.creditScore);
  const band = creditBand(score);

  return (
    <div className="mx-auto grid max-w-4xl gap-4 p-4 md:p-6">
      <h1 className="font-display text-3xl">Lifestyle</h1>
      <p className="text-sm text-muted">
        Houses, cars, jets, jewelry. Checkout asks debit, credit, or a split. Mortgages and auto finance/lease need the
        FICO — {score} {band.label} today. Worse credit means a bigger down payment, or cash only.
      </p>
      <Panel title={`Security · ${game.securityGuards} on payroll`}>
        <div className="flex flex-wrap gap-2">
          {[0, 1, 2, 4, 8].map((n) => (
            <GhostBtn key={n} onClick={() => security(n)}>
              {n} guards · {money(n * 850)}/wk
            </GhostBtn>
          ))}
          {you && <PrimaryBtn onClick={() => meetup(you.id)}>Fan meetup</PrimaryBtn>}
        </div>
      </Panel>
      <EntourageBlock />
      <Panel title="Houses">
        <ul className="grid gap-2">
          {HOUSES.map((h) => {
            const owned = game.houses.some((x) => x.catalogId === h.id);
            const mq = mortgageQuote(game, h.price);
            return (
              <li key={h.id} className="flex flex-wrap items-center justify-between gap-2 rounded-lg bg-subtle px-3 py-2 text-sm">
                <span>
                  {h.name}
                  <span className="text-muted">
                    {" "}
                    · {h.city} · {h.beds} bed · {money(h.price)}
                    {!owned && (mq.allowed ? ` · mortgage ${Math.round(mq.minDownPct * 100)}% down` : " · cash only")}
                  </span>
                </span>
                {owned ? (
                  <Pill tone="mint">owned</Pill>
                ) : fame < h.fameNeed ? (
                  <Pill>fame {h.fameNeed}</Pill>
                ) : (
                  <GhostBtn
                    onClick={() =>
                      openCheckout({
                        kind: "house",
                        id: h.id,
                        title: h.name,
                        price: h.price,
                        financeable: true,
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
      <Panel title="Cars">
        <ul className="grid gap-2">
          {CARS.map((c) => {
            const owned = game.cars.some((x) => x.catalogId === c.id && !x.lease);
            const leased = game.cars.some((x) => x.catalogId === c.id && x.lease);
            const aq = autoQuote(game, c.price, "loan", c.id);
            const lq = autoQuote(game, c.price, "lease", c.id);
            return (
              <li key={c.id} className="flex flex-wrap items-center justify-between gap-2 rounded-lg bg-subtle px-3 py-2 text-sm">
                <span>
                  {c.name}
                  <span className="text-muted">
                    {" "}
                    · {money(c.price)}
                    {!owned && (aq.allowed ? ` · finance ${Math.round(aq.minDownPct * 100)}% down` : " · cash only")}
                    {!owned && lq.allowed ? " · lease open" : ""}
                  </span>
                </span>
                {owned ? (
                  <Pill tone="mint">owned</Pill>
                ) : fame < c.fameNeed ? (
                  <Pill>fame {c.fameNeed}</Pill>
                ) : (
                  <span className="flex gap-2">
                    {leased ? <Pill>leased</Pill> : null}
                    <GhostBtn
                      onClick={() =>
                        openCheckout({
                          kind: "car",
                          id: c.id,
                          title: c.name,
                          price: c.price,
                          financeable: true,
                          leasable: c.id !== "tourbus",
                        })
                      }
                    >
                      Buy
                    </GhostBtn>
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      </Panel>
      <Panel title="Land · build from dirt">
        <ul className="grid gap-2">
          {LAND.map((lot) => {
            const owned = (game.lands ?? []).some((x) => x.catalogId === lot.id);
            return (
              <li key={lot.id} className="rounded-lg bg-subtle px-3 py-2 text-sm">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span>
                    {lot.name}
                    <span className="text-muted">
                      {" "}
                      · {lot.city} · {money(lot.price)}
                    </span>
                  </span>
                  {owned ? (
                    <Pill tone="mint">owned</Pill>
                  ) : fame < lot.fameNeed ? (
                    <Pill>fame {lot.fameNeed}</Pill>
                  ) : (
                    <GhostBtn
                      onClick={() =>
                        openCheckout({ kind: "land", id: lot.id, title: lot.name, price: lot.price, financeable: true })
                      }
                    >
                      Buy lot
                    </GhostBtn>
                  )}
                </div>
                {owned ? (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {BUILD_OPTS.map((b) => {
                      const job = (game.lands ?? []).find((x) => x.catalogId === lot.id)!;
                      const on = b.id === "studio" ? job.studioWing : job[b.id];
                      return on ? (
                        <Pill key={b.id} tone="mint">
                          {b.name}
                        </Pill>
                      ) : (
                        <GhostBtn
                          key={b.id}
                          onClick={() =>
                            openCheckout({
                              kind: "build",
                              id: lot.id,
                              title: b.name,
                              price: b.cost,
                              extra: { buildOpt: b.id },
                            })
                          }
                        >
                          {b.name} · {money(b.cost)}
                        </GhostBtn>
                      );
                    })}
                  </div>
                ) : null}
              </li>
            );
          })}
        </ul>
      </Panel>
      <Panel title="Private islands">
        <ul className="grid gap-2">
          {ISLANDS.map((isle) => {
            const owned = (game.islands ?? []).some((x) => x.catalogId === isle.id);
            return (
              <li key={isle.id} className="flex flex-wrap items-center justify-between gap-2 rounded-lg bg-subtle px-3 py-2 text-sm">
                <span>
                  {isle.name}
                  <span className="text-muted">
                    {" "}
                    · {isle.city} · {money(isle.price)} · {money(isle.weekly)}/wk
                  </span>
                </span>
                {owned ? (
                  <Pill tone="mint">owned</Pill>
                ) : fame < isle.fameNeed ? (
                  <Pill>fame {isle.fameNeed}</Pill>
                ) : (
                  <GhostBtn
                    onClick={() =>
                      openCheckout({ kind: "island", id: isle.id, title: isle.name, price: isle.price, financeable: true })
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
    </div>
  );
}

export function MerchScreen() {
  const game = useGame((s) => s.game)!;
  const merchSite = useGame((s) => s.merchSite);
  const newMerch = useGame((s) => s.newMerch);
  const openCheckout = useGame((s) => s.openCheckout);
  const [name, setName] = useState("Tour tee");
  const [price, setPrice] = useState(35);

  return (
    <div className="mx-auto grid max-w-3xl gap-4 p-4 md:p-6">
      <h1 className="font-display text-3xl">Merch site</h1>
      <p className="text-sm text-muted">
        {game.merchSiteLive ? `Live · ${compact(game.merchVisitsWeek)} visits this week` : "Offline. Flip it on to sell."}
      </p>
      <PrimaryBtn onClick={merchSite}>{game.merchSiteLive ? "Pause site" : "Launch site"}</PrimaryBtn>
      <Panel title="Create SKU">
        <div className="flex flex-wrap gap-2">
          <input value={name} onChange={(e) => setName(e.target.value)} className="h-11 flex-1 rounded-md border border-border bg-elevated px-3 text-sm" />
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="h-11 w-24 rounded-md border border-border bg-elevated px-2 text-sm"
          />
          <GhostBtn onClick={() => newMerch(name, "tee", price)}>Tee</GhostBtn>
          <GhostBtn onClick={() => newMerch(name, "hoodie", price)}>Hoodie</GhostBtn>
          <GhostBtn onClick={() => newMerch(name, "vinyl", price)}>Vinyl</GhostBtn>
          <GhostBtn onClick={() => newMerch(name, "cd", price)}>CD</GhostBtn>
        </div>
      </Panel>
      <Panel title="Warehouse">
        <ul className="grid gap-2 text-sm">
          {game.merch.map((m) => (
            <li key={m.id} className="flex items-center justify-between gap-2">
              <span>
                {m.name} · {m.kind} · {money(m.price)}
                <span className="text-muted">
                  {" "}
                  · stock {m.stock} · sold {m.sold}
                </span>
              </span>
              <GhostBtn
                onClick={() =>
                  openCheckout({
                    kind: "stock",
                    id: m.id,
                    title: `Restock ${m.name} × 30`,
                    price: m.cost * 30,
                    extra: { n: 30 },
                  })
                }
              >
                Restock 30
              </GhostBtn>
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}

export function FamilyScreen() {
  const game = useGame((s) => s.game)!;
  const startDate = useGame((s) => s.startDate);
  const openCheckout = useGame((s) => s.openCheckout);
  const doIntimacy = useGame((s) => s.doIntimacy);
  const hangKid = useGame((s) => s.hangKid);
  const retireTo = useGame((s) => s.retireTo);
  const parentCall = useGame((s) => s.parentCall);
  const a = playerArtist(game);

  if (!a) return <p className="p-6 text-sm text-muted">Artist career only.</p>;

  const cards = a.parents.cards?.length ? a.parents.cards : [];
  const sameSex = Boolean(a.partner && a.gender === a.partner.gender);
  const maleCouple = sameSex && a.gender === "male";
  const suit = SUITORS.filter((s) => matchesOrientation(a, suitorGender(s.id)));

  return (
    <div className="mx-auto grid max-w-3xl gap-4 p-4 md:p-6">
      <div>
        <h1 className="font-display text-3xl">Family</h1>
        <p className="text-sm text-muted">
          {a.gender} · {a.orientation} · {a.relationship}
          {a.pregnancy ? ` · ${a.pregnancy.via} · ${a.pregnancy.weeksLeft} weeks left` : ""}
        </p>
      </div>

      <Panel title="Parents">
        <div className="grid gap-3 sm:grid-cols-2">
          {cards.map((c) => (
            <div key={c.role} className="rounded-lg bg-subtle p-3">
              <div className="flex items-start gap-3">
                <ArtistAvatar spec={c.avatar} size={48} />
                <div className="min-w-0 flex-1">
                  <p className="font-medium">
                    {c.name} <span className="text-xs text-muted">· {c.role}</span>
                  </p>
                  <p className="text-xs text-muted">
                    {c.job} · {c.age}
                  </p>
                  <p className="mt-2 text-xs text-muted">Closeness {Math.round(c.closeness)}</p>
                  <Meter value={c.closeness} />
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <GhostBtn onClick={() => parentCall(c.role)}>Call</GhostBtn>
                <GhostBtn
                  onClick={() =>
                    openCheckout({
                      kind: "parent",
                      id: `${c.role}-aid`,
                      title: `Aid · ${c.name}`,
                      price: 5_000,
                      extra: { parentRole: c.role, parentAct: "aid" },
                    })
                  }
                >
                  Aid · $5k
                </GhostBtn>
                <GhostBtn
                  onClick={() =>
                    openCheckout({
                      kind: "parent",
                      id: `${c.role}-gift`,
                      title: `Gift · ${c.name}`,
                      price: 48_000,
                      extra: { parentRole: c.role, parentAct: "gift" },
                    })
                  }
                >
                  Luxury gift
                </GhostBtn>
                <GhostBtn
                  onClick={() =>
                    openCheckout({
                      kind: "parent",
                      id: `${c.role}-vip`,
                      title: `VIP · ${c.name}`,
                      price: 12_000,
                      extra: { parentRole: c.role, parentAct: "vip" },
                    })
                  }
                >
                  VIP show
                </GhostBtn>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-2 text-xs text-muted">Arrests and scandals drop closeness. Call every week or they notice.</p>
      </Panel>

      <Panel>
        {a.partner ? (
          <div className="flex items-start gap-3">
            <ArtistAvatar spec={a.partner.avatar} size={56} />
            <div className="min-w-0 flex-1">
              <p className="font-medium">
                {a.partner.name}
                {a.partner.famous ? <Pill className="ml-2">famous</Pill> : null}
              </p>
              <p className="text-xs text-muted">
                {a.partner.job} · {a.partner.gender} · {a.partner.age} · {a.partner.hometown}
              </p>
              <p className="mt-1 text-sm text-muted">{a.partner.bio}</p>
              <p className="mt-2 text-xs text-muted">Closeness {Math.round(a.partner.closeness)}</p>
              <Meter value={a.partner.closeness} />
              <div className="mt-3 flex flex-wrap gap-2">
                {a.relationship === "dating" && (
                  <GhostBtn onClick={() => openCheckout({ kind: "propose", id: "ring", title: `Ring for ${a.partner?.name}`, price: 8_500 })}>
                    Propose · $8,500
                  </GhostBtn>
                )}
                {a.relationship === "engaged" && (
                  <PrimaryBtn onClick={() => openCheckout({ kind: "marry", id: "wedding", title: `Wedding · ${a.partner?.name}`, price: 22_000 })}>
                    Marry · $22,000
                  </PrimaryBtn>
                )}
                <GhostBtn
                  onClick={() =>
                    openCheckout({ kind: "date-night", id: "date", title: `Date night · ${a.partner?.name}`, price: 2_400 })
                  }
                >
                  Date night · $2,400
                </GhostBtn>
                <GhostBtn onClick={doIntimacy}>Intimacy</GhostBtn>
                {maleCouple && !a.pregnancy ? (
                  <GhostBtn
                    onClick={() =>
                      openCheckout({ kind: "adopt", id: "surrogate", title: "Private surrogate", price: 85_000 })
                    }
                  >
                    Surrogate · $85k
                  </GhostBtn>
                ) : null}
                {(sameSex || a.relationship === "married") && !a.pregnancy ? (
                  <GhostBtn
                    onClick={() => openCheckout({ kind: "adopt", id: "adopt", title: "Agency adoption", price: 45_000 })}
                  >
                    Adopt · $45k
                  </GhostBtn>
                ) : null}
              </div>
              {a.partner ? <GiftRow /> : null}
            </div>
          </div>
        ) : (
          <p className="text-sm text-muted">Pick someone. The list already respects orientation.</p>
        )}
      </Panel>

      {!a.partner && (
        <Panel title="Who's in town">
          <ul className="grid gap-2">
            {suit.map((s) => (
              <li key={s.id} className="flex flex-wrap items-center justify-between gap-2 rounded-lg bg-subtle px-3 py-2 text-sm">
                <span>
                  {s.name}
                  <span className="text-muted">
                    {" "}
                    · {s.job}
                    {s.famous ? " · famous" : ""} · {suitorGender(s.id)} · {s.age} · {money(s.netWorth)}
                  </span>
                </span>
                <GhostBtn onClick={() => startDate(s.id)}>Date</GhostBtn>
              </li>
            ))}
          </ul>
        </Panel>
      )}

      <Panel title="Kids hub">
        {a.kids.length === 0 ? (
          <p className="text-sm text-muted">
            {a.pregnancy
              ? `${a.pregnancy.via} · ${a.pregnancy.weeksLeft} weeks.`
              : "Intimacy can start a pregnancy. Same-sex couples adopt or hire a surrogate."}
          </p>
        ) : (
          <ul className="grid gap-3">
            {a.kids.map((k) => (
              <li key={k.id} className="rounded-lg bg-subtle p-3 text-sm">
                <div className="flex items-start gap-3">
                  <ArtistAvatar spec={k.avatar} size={44} />
                  <div className="min-w-0 flex-1">
                    <p className="font-medium">
                      {k.name} · {k.gender} · age {k.age}
                    </p>
                    <p className="text-xs text-muted">
                      {k.personality} · {k.interests} · talent {k.talent} · {k.school} · {k.custody} custody
                    </p>
                    <p className="mt-2 text-xs text-muted">Closeness {Math.round(k.closeness)}</p>
                    <Meter value={k.closeness} />
                    <p className="mt-2 text-xs text-muted">
                      Vocals {Math.round(k.stats.vocals)} · writing {Math.round(k.stats.writing)} · dance {Math.round(k.stats.dance)} ·
                      production {Math.round(k.stats.production)}
                    </p>
                    <p className="text-xs text-muted">
                      Lessons · vocal {k.lessons.vocal} · dance {k.lessons.dance} · theory {k.lessons.theory} · instrument{" "}
                      {k.lessons.instrument}
                    </p>
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  <GhostBtn onClick={() => hangKid(k.id)}>Hang out</GhostBtn>
                  {LESSONS.map((L) => (
                    <GhostBtn
                      key={L.id}
                      onClick={() =>
                        openCheckout({
                          kind: "lesson",
                          id: `${k.id}-${L.id}`,
                          title: `${k.name} · ${L.label}`,
                          price: L.cost,
                          extra: { kidId: k.id, lesson: L.id },
                        })
                      }
                    >
                      {L.label} · {money(L.cost)}
                    </GhostBtn>
                  ))}
                  {SCHOOLS.map((s) => (
                    <GhostBtn
                      key={s.id}
                      onClick={() =>
                        openCheckout({
                          kind: "school",
                          id: `${k.id}-${s.id}`,
                          title: `${k.name} · ${s.name}`,
                          price: s.yearly ? Math.round(s.yearly / 52) * 4 : 0,
                          extra: { kidId: k.id, track: s.id },
                        })
                      }
                    >
                      {s.name}
                      {s.yearly ? ` · ${money(s.yearly)}/yr` : ""}
                    </GhostBtn>
                  ))}
                  {k.age >= 16 ? (
                    <PrimaryBtn onClick={() => retireTo(k.id)}>Play as {k.name}</PrimaryBtn>
                  ) : (
                    <Pill>legacy at 16</Pill>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </Panel>

      <Panel title="Family vacations">
        <ul className="grid gap-2">
          {VACATIONS.map((v) => (
            <li key={v.id} className="flex flex-wrap items-center justify-between gap-2 rounded-lg bg-subtle px-3 py-2 text-sm">
              <span>
                {v.name}
                <span className="text-muted"> · {v.city} · {money(v.cost)}</span>
              </span>
              <GhostBtn
                onClick={() => openCheckout({ kind: "vacation", id: v.id, title: v.name, price: v.cost })}
              >
                Book
              </GhostBtn>
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}

export function GigsScreen() {
  const game = useGame((s) => s.game)!;
  const takeGig = useGame((s) => s.takeGig);
  const you = playerArtist(game);
  const open = (game.gigs ?? []).filter((g) => g.status === "open");
  const past = (game.gigs ?? []).filter((g) => g.status !== "open").slice(0, 8);

  return (
    <div className="mx-auto grid max-w-3xl gap-4 p-4 md:p-6">
      <h1 className="font-display text-3xl">Paid gigs</h1>
      <p className="text-sm text-muted">
        Clubs, corporates, private festivals, yachts. Fees scale with popularity and Billboard heat. Not a tour.
      </p>
      <Panel title="Offers">
        {open.length === 0 ? (
          <p className="text-sm text-muted">Desk is quiet. Advance a week.</p>
        ) : (
          <ul className="grid gap-2">
            {open.map((g) => {
              const locked = (you?.fame ?? 0) < g.fameNeed;
              return (
                <li key={g.id} className="flex flex-wrap items-center justify-between gap-2 rounded-lg bg-subtle px-3 py-2 text-sm">
                  <span>
                    {g.name}
                    <span className="text-muted">
                      {" "}
                      · {g.city} · {g.kind} · {money(g.fee)}
                    </span>
                  </span>
                  {locked ? <Pill>fame {g.fameNeed}</Pill> : <PrimaryBtn onClick={() => takeGig(g.id)}>Book</PrimaryBtn>}
                </li>
              );
            })}
          </ul>
        )}
      </Panel>
      {past.length > 0 && (
        <Panel title="Log">
          <ul className="grid gap-1 text-sm text-muted">
            {past.map((g) => (
              <li key={g.id} className="flex justify-between">
                <span>{g.name}</span>
                <span>
                  {g.status} · {money(g.fee)}
                </span>
              </li>
            ))}
          </ul>
        </Panel>
      )}
    </div>
  );
}

export function SkillsScreen() {
  const game = useGame((s) => s.game)!;
  const openCheckout = useGame((s) => s.openCheckout);
  const a = playerArtist(game) ?? rosterOf(game)[0];
  if (!a) return <p className="p-6 text-sm text-muted">No artist.</p>;

  return (
    <div className="mx-auto grid max-w-3xl gap-4 p-4 md:p-6">
      <h1 className="font-display text-3xl">Skills</h1>
      <p className="text-sm text-muted">
        Age {a.age} · potential {a.potential} · ability {a.ability}
      </p>
      <Panel>
        <div className="grid gap-3">
          <Meter label="Vocals" value={a.stats.vocals} />
          <Meter label="Songwriting" value={a.stats.writing} />
          <Meter label="Choreography" value={a.stats.dance} />
          <Meter label="Charisma" value={a.stats.charisma} />
          <Meter label="Looks" value={a.stats.looks} />
          <Meter label="Work ethic" value={a.stats.workEthic} />
          <Meter label="Media savvy" value={a.stats.social} />
          <Meter label="Production" value={a.stats.production} />
          <Meter label="Stage presence" value={a.stats.performance} />
        </div>
      </Panel>
      <Panel title="Coaching">
        <div className="flex flex-wrap gap-2">
          {COACHING.map((c) => (
            <GhostBtn
              key={c.id}
              onClick={() =>
                openCheckout({
                  kind: "coach",
                  id: c.id,
                  title: c.label,
                  price: c.cost,
                  extra: { artistId: a.id, skill: c.skill, gain: c.gain },
                })
              }
            >
              {c.label} · {money(c.cost)}
            </GhostBtn>
          ))}
        </div>
      </Panel>
    </div>
  );
}

export { ACHIEVEMENTS };
