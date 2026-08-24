import { useEffect, useMemo, useState, type ReactNode } from "react";
import { Ban, CreditCard, Landmark, Wallet, X } from "lucide-react";
import { money } from "@/lib/game/format";
import { bestCard, cardRoom, creditBand, quoteFor, totalCardRoom } from "@/lib/game/finance";
import { useGame } from "@/lib/game/store";
import type { FinanceMode, PayMethod, PayPlan } from "@/lib/game/types";
import { GhostBtn, Pill, PrimaryBtn } from "./bits";
import { cn } from "@/lib/utils";

export function PaySheet() {
  const game = useGame((s) => s.game);
  const draft = useGame((s) => s.checkout);
  const close = useGame((s) => s.closeCheckout);
  const confirm = useGame((s) => s.confirmPay);
  const setView = useGame((s) => s.setView);

  const [mode, setMode] = useState<FinanceMode>(() =>
    draft?.kind === "house" ? "mortgage" : draft?.financeable ? "loan" : "outright",
  );
  const [method, setMethod] = useState<PayMethod>("cash");
  const [cardId, setCardId] = useState<string | null>(null);
  const [cashAmt, setCashAmt] = useState(0);

  const quote = useMemo(() => {
    if (!game || !draft) return null;
    return quoteFor(game, draft, mode);
  }, [game, draft, mode]);

  useEffect(() => {
    if (!game || !draft || !quote) return;
    const due = quote.dueNow;
    const starter = bestCard(game);
    setCardId(starter?.id ?? null);
    const cash = game.cash;
    const room = starter ? cardRoom(starter) : 0;
    if (cash >= due) {
      setMethod("cash");
      setCashAmt(due);
    } else if (room >= due) {
      setMethod("card");
      setCashAmt(0);
    } else {
      setMethod("split");
      setCashAmt(Math.max(0, Math.min(cash, due)));
    }
  }, [draft?.id, draft?.kind, mode, quote?.dueNow, game?.cash]);

  useEffect(() => {
    if (!draft) return;
    setMode(draft.financeable ? (draft.kind === "house" ? "mortgage" : "loan") : "outright");
  }, [draft?.id, draft?.kind, draft?.financeable]);

  if (!game || !draft || !quote) return null;

  const due = quote.dueNow;
  const band = creditBand(game.creditScore);
  const cards = game.cards;
  const picked = cards.find((c) => c.id === cardId) ?? cards[0] ?? null;
  const room = picked ? cardRoom(picked) : 0;
  const cashShare = method === "cash" ? due : method === "card" ? 0 : Math.max(0, Math.min(due, Math.round(cashAmt)));
  const cardShare = due - cashShare;
  const cashOk = cashShare <= game.cash + 0.5;
  const cardOk = cardShare <= 0 || (picked != null && cardShare <= room + 0.5);
  const structureOk = mode === "outright" || quote.allowed;
  const canPay = structureOk && cashOk && cardOk && (method !== "card" && method !== "split" ? true : cards.length > 0);

  const plan: PayPlan = {
    method,
    cardId: picked?.id ?? null,
    cashAmount: cashShare,
    cardAmount: cardShare,
    mode,
  };

  const modes: { id: FinanceMode; label: string; show: boolean }[] = [
    { id: "outright", label: "Pay in full", show: true },
    { id: "mortgage", label: "Mortgage", show: draft.kind === "house" },
    { id: "loan", label: "Finance", show: Boolean(draft.financeable) && draft.kind !== "house" },
    { id: "lease", label: "Lease", show: Boolean(draft.leasable) },
  ];

  return (
    <div className="fixed inset-0 z-40 grid place-items-end bg-bg/70 p-0 sm:place-items-center sm:p-4">
      <div
        role="dialog"
        aria-labelledby="pay-title"
        className="flex max-h-[92dvh] w-full max-w-lg flex-col overflow-hidden rounded-t-2xl border border-border bg-surface shadow-2xl sm:rounded-2xl"
      >
        <header className="flex items-start justify-between gap-3 border-b border-border px-4 py-3">
          <div>
            <p className="text-[11px] uppercase tracking-[0.16em] text-faint">Checkout</p>
            <h2 id="pay-title" className="font-display text-2xl leading-tight">
              {draft.title}
            </h2>
            <p className="text-sm text-muted">
              {money(draft.price)}
              {mode !== "outright" && quote.allowed ? ` · due today ${money(due)}` : null}
            </p>
          </div>
          <button type="button" onClick={close} className="grid size-11 place-items-center rounded-md hover:bg-subtle" aria-label="Close">
            <X className="size-4" />
          </button>
        </header>

        <div className="grid gap-4 overflow-auto px-4 py-4">
          <div className="flex flex-wrap items-center gap-2 rounded-lg bg-subtle px-3 py-2 text-sm">
            <Landmark className="size-4 text-muted" />
            <span>
              FICO {Math.round(game.creditScore)} · {band.label}
            </span>
            <Pill tone={band.tone === "warn" ? "default" : band.tone === "mint" ? "mint" : band.tone}>{band.label}</Pill>
          </div>

          {modes.some((m) => m.show && m.id !== "outright") && (
            <div>
              <p className="mb-2 text-xs text-muted">How do you want to buy it?</p>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {modes
                  .filter((m) => m.show)
                  .map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setMode(m.id)}
                      className={cn(
                        "min-h-11 rounded-md border px-3 text-sm",
                        mode === m.id ? "border-accent bg-accent/15 text-fg" : "border-border text-muted hover:bg-subtle",
                      )}
                    >
                      {m.label}
                    </button>
                  ))}
              </div>
            </div>
          )}

          {mode !== "outright" && !quote.allowed ? (
            <div className="rounded-lg border border-bad/40 bg-bad/10 px-3 py-3 text-sm">
              <p className="flex items-start gap-2">
                <Ban className="mt-0.5 size-4 shrink-0 text-bad" />
                <span>{quote.reason} Pay in full, or rebuild credit and come back with a bigger down payment.</span>
              </p>
            </div>
          ) : (
            <>
              {mode !== "outright" && quote.allowed && (
                <div className="rounded-lg border border-border bg-elevated px-3 py-3 text-sm">
                  <p className="font-medium">
                    {quote.bankName} · {quote.apr.toFixed(2)}% APR
                  </p>
                  <p className="mt-1 text-muted">{quote.reason}</p>
                  <p className="mt-2 tabular-nums text-muted">
                    Down {money(quote.down)} ({Math.round(quote.minDownPct * 100)}%) · financed {money(quote.financed)} ·{" "}
                    {money(quote.weekly)}/wk × {quote.weeks} weeks
                  </p>
                </div>
              )}

          <div>
            <p className="mb-2 text-xs text-muted">Pay {money(due)} due today with</p>
            <div className="grid gap-2">
              <PayChoice
                active={method === "cash"}
                onClick={() => setMethod("cash")}
                icon={<Wallet className="size-4" />}
                title="Debit card"
                hint={`Harbor checking · ${money(game.cash)}`}
              />
              <PayChoice
                active={method === "card"}
                onClick={() => setMethod("card")}
                icon={<CreditCard className="size-4" />}
                title="Credit card"
                hint={
                  cards.length
                    ? `${cards.length} card${cards.length === 1 ? "" : "s"} · ${money(totalCardRoom(game))} available`
                    : "No card on file — apply at Bank"
                }
                disabled={cards.length === 0}
              />
              <PayChoice
                active={method === "split"}
                onClick={() => setMethod("split")}
                icon={<Landmark className="size-4" />}
                title="Debit + credit"
                hint="Split the due amount across checking and a card"
                disabled={cards.length === 0}
              />
            </div>
          </div>

          {(method === "card" || method === "split") && cards.length > 0 && (
            <div>
              <p className="mb-2 text-xs text-muted">Card</p>
              <ul className="grid gap-2">
                {cards.map((c) => (
                  <li key={c.id}>
                    <button
                      type="button"
                      onClick={() => setCardId(c.id)}
                      className={cn(
                        "flex min-h-11 w-full items-center justify-between rounded-md border px-3 text-sm",
                        cardId === c.id ? "border-accent bg-accent/10" : "border-border hover:bg-subtle",
                      )}
                    >
                      <span>
                        {c.name}
                        {c.black ? <Pill className="ml-2" tone="viral">Black</Pill> : null}
                      </span>
                      <span className="tabular-nums text-muted">
                        {money(c.used)} / {c.black ? "no cap" : money(c.limit)}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {method === "split" && (
            <div>
              <div className="mb-1 flex justify-between text-xs text-muted">
                <span>Debit {money(cashShare)}</span>
                <span>Card {money(cardShare)}</span>
              </div>
              <input
                type="range"
                min={0}
                max={due}
                step={Math.max(1, Math.round(due / 40))}
                value={cashShare}
                onChange={(e) => setCashAmt(Number(e.target.value))}
                className="w-full accent-[var(--color-accent)]"
              />
            </div>
          )}

          {!cashOk && <p className="text-sm text-bad">Checking is short {money(cashShare - game.cash)}.</p>}
          {method !== "cash" && cards.length === 0 && (
            <p className="text-sm text-bad">
              Apply for a card in Bank first.{" "}
              <button
                type="button"
                className="underline"
                onClick={() => {
                  close();
                  setView("bank");
                }}
              >
                Open Bank
              </button>
            </p>
          )}
          {cardShare > 0 && picked && !cardOk && (
            <p className="text-sm text-bad">
              {picked.name} only has {money(room)} left. Move more onto debit or pick another card.
            </p>
          )}
            </>
          )}
        </div>

        <footer className="flex gap-2 border-t border-border px-4 py-3">
          <GhostBtn className="flex-1" onClick={close}>
            Cancel
          </GhostBtn>
          <PrimaryBtn className="flex-1" disabled={!canPay} onClick={() => confirm(plan)}>
            Confirm · {money(due)}
          </PrimaryBtn>
        </footer>
      </div>
    </div>
  );
}

function PayChoice({
  active,
  onClick,
  icon,
  title,
  hint,
  disabled,
}: {
  active: boolean;
  onClick: () => void;
  icon: ReactNode;
  title: string;
  hint: string;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "flex min-h-14 items-center gap-3 rounded-md border px-3 text-left",
        active ? "border-accent bg-accent/10" : "border-border hover:bg-subtle",
        disabled && "opacity-40",
      )}
    >
      <span className="text-muted">{icon}</span>
      <span>
        <span className="block text-sm font-medium">{title}</span>
        <span className="block text-xs text-muted">{hint}</span>
      </span>
    </button>
  );
}
