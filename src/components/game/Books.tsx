import { compact, money, signedMoney } from "@/lib/game/format";
import { ceoScore, netWorth, playerSongs, rosterOf, weeklyBurn } from "@/lib/game/sim";
import { useGame } from "@/lib/game/store";
import { Panel } from "./bits";

export function Books() {
  const game = useGame((s) => s.game)!;
  const roster = rosterOf(game);
  const payroll = weeklyBurn(game);
  const songs = playerSongs(game).filter((s) => s.status === "released");
  const L = game.ledger;
  const assets =
    game.houses.reduce((n, h) => n + h.value, 0) +
    game.cars.reduce((n, c) => n + (c.lease ? 0 : c.value), 0) +
    (game.lands ?? []).reduce((n, l) => n + l.value, 0) +
    (game.islands ?? []).reduce((n, i) => n + i.value, 0) +
    (game.jets ?? []).reduce((n, j) => n + j.value, 0);
  const debt = game.loans.reduce((n, l) => n + l.remaining, 0) + game.cards.reduce((n, c) => n + c.used, 0);
  const statements = game.statements ?? [];

  return (
    <div className="mx-auto grid max-w-3xl gap-4 p-4 md:p-6">
      <h1 className="font-display text-3xl tracking-tight">Finances</h1>
      <p className="text-sm text-muted">Checking, overhead, royalties. Physical cash does not exist here.</p>
      <div className="grid gap-3 sm:grid-cols-3">
        <Panel>
          <p className="text-xs text-muted">Checking</p>
          <p className="font-display text-3xl tabular-nums">{money(game.cash)}</p>
        </Panel>
        <Panel>
          <p className="text-xs text-muted">Net worth</p>
          <p className="font-display text-3xl tabular-nums">{money(netWorth(game))}</p>
        </Panel>
        <Panel>
          <p className="text-xs text-muted">Last week net</p>
          <p className="font-display text-3xl tabular-nums">{signedMoney(L.net)}</p>
        </Panel>
      </div>
      <Panel title="Balance sheet">
        <ul className="grid gap-2 text-sm">
          <Row k="Checking" v={money(game.cash)} />
          <Row k="Savings" v={money(game.savings ?? 0)} />
          <Row k="Property" v={money(assets)} />
          <Row k="Liabilities" v={money(-debt)} dim />
          <Row k="Equity" v={money(netWorth(game))} />
          {game.career === "label" && (
            <>
              <Row k="CEO salary / wk" v={money(game.ceoSalary)} />
              <Row k="CEO score" v={String(ceoScore(game))} />
              <Row k="Ownership" v={`${game.labelOwnedPct}%`} />
            </>
          )}
        </ul>
      </Panel>
      <Panel title="Income · last week">
        <ul className="grid gap-2 text-sm">
          <Row k="Streaming" v={money(L.streams)} />
          <Row k="Chart bonuses" v={money(L.chartBonus)} />
          <Row k="Radio" v={money(L.radio)} />
          <Row k="Shows" v={money(L.shows)} />
          <Row k="Merch" v={money(L.merch)} />
          {L.other ? <Row k="Other" v={money(L.other)} /> : null}
        </ul>
      </Panel>
      <Panel title="Expenditure · last week">
        <ul className="grid gap-2 text-sm">
          <Row k={game.career === "artist" ? "Living + overhead" : "Payroll"} v={money(-(L.payroll + L.living))} dim />
          <Row k="Housing" v={money(-L.housing)} dim />
          <Row k="Cars" v={money(-L.cars)} dim />
          <Row k="Security" v={money(-L.security)} dim />
          <Row k="Interest / loans" v={money(-L.interest)} dim />
          {L.nightlife ? <Row k="Nightlife" v={money(-L.nightlife)} dim /> : null}
          {L.legal ? <Row k="Legal" v={money(-L.legal)} dim /> : null}
          {L.luxury ? <Row k="Luxury" v={money(-L.luxury)} dim /> : null}
        </ul>
      </Panel>
      <Panel title="History">
        {statements.length === 0 ? (
          <p className="text-sm text-muted">No statements yet. Buy something or close a week.</p>
        ) : (
          <ul className="grid gap-2 text-sm">
            {statements.slice(0, 24).map((s) => (
              <li key={s.id} className="flex justify-between gap-3">
                <span className="truncate">
                  {s.title}
                  <span className="text-muted"> · w{s.week} · {s.channel}</span>
                </span>
                <span className={`tabular-nums ${s.amount < 0 ? "text-muted" : ""}`}>{signedMoney(s.amount)}</span>
              </li>
            ))}
          </ul>
        )}
      </Panel>
      <Panel title="Burn">
        <ul className="grid gap-2 text-sm">
          <li className="flex justify-between">
            <span className="text-muted">Projected weekly burn</span>
            <span className="tabular-nums">{money(payroll)}</span>
          </li>
          {game.career === "label" &&
            roster.map((a) => (
              <li key={a.id} className="flex justify-between">
                <span className="text-muted">
                  {a.name} · {Math.round(a.royalty * 100)}% share
                </span>
                <span className="tabular-nums">{money(a.wage)}</span>
              </li>
            ))}
        </ul>
      </Panel>
      <Panel title="Catalog">
        {songs.length === 0 ? (
          <p className="text-sm text-muted">No released masters.</p>
        ) : (
          <ul className="grid gap-2 text-sm">
            {songs.map((s) => (
              <li key={s.id} className="flex justify-between gap-3">
                <span className="truncate">
                  {s.title}
                  {s.chart ? <span className="text-muted"> · #{s.chart}</span> : null}
                  <span className="text-muted">
                    {" "}
                    · {s.releaseFormat === "both" ? "digital+CD" : s.releaseFormat === "cd" ? "CD" : "digital"}
                  </span>
                </span>
                <span className="tabular-nums text-muted">
                  {compact(s.streams)} · D {compact(s.salesDigital)} · CD {compact(s.salesPhysical)}
                </span>
              </li>
            ))}
          </ul>
        )}
      </Panel>
    </div>
  );
}

function Row({ k, v, dim }: { k: string; v: string; dim?: boolean }) {
  return (
    <li className="flex justify-between">
      <span className="text-muted">{k}</span>
      <span className={`tabular-nums ${dim ? "text-muted" : ""}`}>{v}</span>
    </li>
  );
}
