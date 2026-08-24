import { nid, playerArtist } from "./core";
import { clamp } from "./rng";
import type { CheckoutDraft, CreditCard, FinanceMode, GameState, Loan, PayPlan } from "./types";
import { BANKS, aprForScore } from "./world";

export type CreditBandId = "poor" | "fair" | "good" | "verygood" | "excellent";

export type CreditBand = {
  id: CreditBandId;
  label: string;
  min: number;
  tone: "bad" | "warn" | "good" | "mint";
  copy: string;
};

export const CREDIT_BANDS: CreditBand[] = [
  { id: "poor", label: "Poor", min: 300, tone: "bad", copy: "Cash only, or a 35%+ down subprime desk if they'll take you." },
  { id: "fair", label: "Fair", min: 580, tone: "warn", copy: "Mortgages need a fat down. Auto loans go through. No leases." },
  { id: "good", label: "Good", min: 670, tone: "good", copy: "Conventional mortgages, auto finance, and leases all open." },
  { id: "verygood", label: "Very good", min: 740, tone: "good", copy: "Low down, best APRs, leases and jumbo mortgages." },
  { id: "excellent", label: "Excellent", min: 800, tone: "mint", copy: "3% down houses, 0% down cars, private-bank pricing." },
];

export function creditBand(score: number): CreditBand {
  let band = CREDIT_BANDS[0]!;
  for (const b of CREDIT_BANDS) if (score >= b.min) band = b;
  return band;
}

export function weeklyPayment(principal: number, apr: number, weeks: number) {
  const r = apr / 100 / 52;
  if (weeks <= 0) return principal;
  if (r <= 0) return Math.round(principal / weeks);
  return Math.max(1, Math.round((principal * r) / (1 - Math.pow(1 + r, -weeks))));
}

export type AssetQuote = {
  allowed: boolean;
  reason: string;
  minDownPct: number;
  down: number;
  financed: number;
  apr: number;
  weeks: number;
  weekly: number;
  bankId: string;
  bankName: string;
  dueNow: number;
};

function emptyQuote(reason: string, price: number): AssetQuote {
  return {
    allowed: false,
    reason,
    minDownPct: 1,
    down: price,
    financed: 0,
    apr: 0,
    weeks: 0,
    weekly: 0,
    bankId: "",
    bankName: "",
    dueNow: price,
  };
}

export function eligibleBanks(state: GameState) {
  return BANKS.filter((b) => {
    if (state.creditScore < b.minScore) return false;
    if (b.id === "onyx") {
      const you = playerArtist(state);
      return state.creditScore >= 760 && ((you?.fame ?? 0) >= 80 || state.cash + (state.savings ?? 0) >= 2_000_000 || state.blackCard);
    }
    return true;
  });
}

export function pickBank(state: GameState, kind: "personal" | "mortgage" | "auto" | "card") {
  const pool = eligibleBanks(state);
  if (!pool.length) return BANKS[BANKS.length - 1]!;
  const score = state.creditScore;
  const key = kind === "mortgage" ? "mortgageApr" : kind === "card" ? "cardApr" : "personalApr";
  return [...pool].sort((a, b) => aprForScore(a[key], score) - aprForScore(b[key], score))[0]!;
}

function mortgageFloor(score: number) {
  if (score >= 800) return { pct: 0.03, ok: true, note: "Excellent. 3% conventional." };
  if (score >= 740) return { pct: 0.05, ok: true, note: "Very good. 5% down." };
  if (score >= 700) return { pct: 0.1, ok: true, note: "Good. 10% down." };
  if (score >= 670) return { pct: 0.15, ok: true, note: "Good. 15% down." };
  if (score >= 640) return { pct: 0.2, ok: true, note: "Fair-plus. 20% down." };
  if (score >= 620) return { pct: 0.25, ok: true, note: "Thin file. 25% down, fewer banks." };
  if (score >= 580) return { pct: 0.35, ok: true, note: "Subprime. 35% down." };
  return { pct: 1, ok: false, note: "FICO under 580. Lenders will not mortgage this." };
}

function autoFloor(score: number, mode: "loan" | "lease") {
  if (mode === "lease") {
    if (score >= 740) return { pct: 0.08, ok: true, note: "Lease approved. Drive-off ~8%." };
    if (score >= 700) return { pct: 0.1, ok: true, note: "Lease approved. 10% drive-off." };
    if (score >= 670) return { pct: 0.12, ok: true, note: "Lease approved on a shorter term. 12% down." };
    return { pct: 1, ok: false, note: "Need 670+ FICO to lease. Finance or pay cash." };
  }
  if (score >= 740) return { pct: 0, ok: true, note: "0% down at a prime desk." };
  if (score >= 700) return { pct: 0.05, ok: true, note: "5% down." };
  if (score >= 670) return { pct: 0.1, ok: true, note: "10% down." };
  if (score >= 640) return { pct: 0.15, ok: true, note: "15% down." };
  if (score >= 620) return { pct: 0.2, ok: true, note: "20% down. Rate is ugly." };
  if (score >= 580) return { pct: 0.3, ok: true, note: "Subprime auto. 30% down." };
  return { pct: 1, ok: false, note: "FICO under 580. Dealers want cash." };
}

function jetFloor(score: number, mode: "loan" | "lease") {
  if (mode === "lease") {
    if (score >= 760) return { pct: 0.15, ok: true, note: "Fractional lease. 15% up front." };
    return { pct: 1, ok: false, note: "Need 760+ FICO to lease a jet." };
  }
  if (score >= 740) return { pct: 0.2, ok: true, note: "20% down, private aviation desk." };
  if (score >= 700) return { pct: 0.3, ok: true, note: "30% down." };
  if (score >= 670) return { pct: 0.4, ok: true, note: "40% down. They still hesitate." };
  return { pct: 1, ok: false, note: "Need 670+ FICO to finance a jet. Wire cash." };
}

export function mortgageQuote(state: GameState, price: number): AssetQuote {
  const score = Math.round(state.creditScore);
  const floor = mortgageFloor(score);
  if (!floor.ok) return emptyQuote(floor.note, price);
  const banks = eligibleBanks(state);
  if (!banks.length) return emptyQuote(`No bank will touch a ${score} FICO.`, price);
  const bank = pickBank(state, "mortgage");
  const apr = aprForScore(bank.mortgageApr, score);
  const down = Math.round(price * floor.pct);
  const financed = Math.max(0, price - down);
  const weeks = 1560;
  return {
    allowed: true,
    reason: floor.note,
    minDownPct: floor.pct,
    down,
    financed,
    apr,
    weeks,
    weekly: weeklyPayment(financed, apr, weeks),
    bankId: bank.id,
    bankName: bank.name,
    dueNow: down,
  };
}

export function autoQuote(state: GameState, price: number, mode: "loan" | "lease", catalogId?: string): AssetQuote {
  const score = Math.round(state.creditScore);
  if (mode === "lease" && catalogId === "tourbus") {
    return emptyQuote("A custom tour bus isn't a lease. Finance or cash.", price);
  }
  const floor = autoFloor(score, mode);
  if (!floor.ok) return emptyQuote(floor.note, price);
  const banks = eligibleBanks(state);
  if (!banks.length) return emptyQuote(`No lender for a ${score} FICO.`, price);
  const bank = pickBank(state, "auto");
  const apr = aprForScore(bank.personalApr, score) + (mode === "lease" ? -1.4 : 1.1);
  const down = Math.round(price * floor.pct);
  if (mode === "lease") {
    const residual = Math.round(price * 0.58);
    const dep = Math.max(0, price - residual - down);
    const weeks = 156;
    const mf = Math.max(0.001, apr / 2400);
    const monthly = dep / 36 + (price - down + residual) * mf;
    const weekly = Math.max(40, Math.round((monthly * 12) / 52));
    return {
      allowed: true,
      reason: floor.note,
      minDownPct: floor.pct,
      down,
      financed: dep,
      apr: +apr.toFixed(2),
      weeks,
      weekly,
      bankId: bank.id,
      bankName: bank.name,
      dueNow: down,
    };
  }
  const financed = Math.max(0, price - down);
  const weeks = 260;
  return {
    allowed: true,
    reason: floor.note,
    minDownPct: floor.pct,
    down,
    financed,
    apr: +apr.toFixed(2),
    weeks,
    weekly: weeklyPayment(financed, +apr.toFixed(2), weeks),
    bankId: bank.id,
    bankName: bank.name,
    dueNow: down,
  };
}

export function jetQuote(state: GameState, price: number, mode: "loan" | "lease"): AssetQuote {
  const score = Math.round(state.creditScore);
  const floor = jetFloor(score, mode);
  if (!floor.ok) return emptyQuote(floor.note, price);
  const banks = eligibleBanks(state);
  if (!banks.length) return emptyQuote("Private aviation wants a real FICO.", price);
  const bank = pickBank(state, "mortgage");
  const apr = aprForScore(bank.personalApr, score) + 1.6;
  const down = Math.round(price * floor.pct);
  const financed = Math.max(0, price - down);
  const weeks = mode === "lease" ? 260 : 520;
  return {
    allowed: true,
    reason: floor.note,
    minDownPct: floor.pct,
    down,
    financed,
    apr: +apr.toFixed(2),
    weeks,
    weekly: weeklyPayment(financed, +apr.toFixed(2), weeks),
    bankId: bank.id,
    bankName: bank.name,
    dueNow: down,
  };
}

export function quoteFor(state: GameState, draft: CheckoutDraft, mode: FinanceMode): AssetQuote {
  if (mode === "outright" || !draft.financeable) {
    return {
      allowed: true,
      reason: "Pay in full today.",
      minDownPct: 1,
      down: draft.price,
      financed: 0,
      apr: 0,
      weeks: 0,
      weekly: 0,
      bankId: "",
      bankName: "",
      dueNow: draft.price,
    };
  }
  if (draft.kind === "house" && mode === "mortgage") return mortgageQuote(state, draft.price);
  if (draft.kind === "car" && (mode === "loan" || mode === "lease")) return autoQuote(state, draft.price, mode, draft.id);
  if (draft.kind === "jet" && (mode === "loan" || mode === "lease")) return jetQuote(state, draft.price, mode);
  return emptyQuote("That structure isn't on this desk.", draft.price);
}

export function cardLimitForScore(score: number, bankId: string) {
  const s = clamp(score, 300, 850);
  let base = 400;
  if (s < 580) base = 300 + (s - 300) * 4;
  else if (s < 670) base = 1_500 + (s - 580) * 70;
  else if (s < 740) base = 8_000 + (s - 670) * 140;
  else if (s < 800) base = 18_000 + (s - 740) * 280;
  else base = 35_000 + (s - 800) * 900;
  const boost = bankId === "onyx" ? 2.4 : bankId === "unionfed" ? 1.35 : bankId === "harbor" ? 1.2 : bankId === "crest" ? 0.85 : 1;
  return Math.max(250, Math.round(base * boost / 50) * 50);
}

export function personalLoanMax(state: GameState, bankId: string) {
  const score = state.creditScore;
  const bank = BANKS.find((b) => b.id === bankId);
  if (!bank || score < bank.minScore) return 0;
  if (score < 580) return 0;
  const income = estimatedAnnual(state);
  const t = clamp((score - 580) / 270, 0, 1);
  const cap = 4_000 + t * 72_000 + income * (0.08 + t * 0.22) + state.cash * 0.08;
  const bankCap = bank.id === "crest" ? 0.7 : bank.id === "onyx" ? 1.8 : 1;
  return Math.round(cap * bankCap / 500) * 500;
}

export function estimatedAnnual(state: GameState) {
  const g = Math.max(0, state.ledger.gross);
  if (g > 0) return g * 52;
  const you = playerArtist(state);
  const fame = you?.fame ?? state.labelRep;
  return state.career === "label" ? 48_000 + fame * 2_400 : 12_000 + fame * 1_800;
}

export function cardRoom(card: CreditCard) {
  if (card.black) return Number.POSITIVE_INFINITY;
  return Math.max(0, Math.round(card.limit - card.used));
}

export function totalCardRoom(state: GameState) {
  return state.cards.reduce((n, c) => n + (c.black ? 1_000_000_000 : cardRoom(c)), 0);
}

export function bestCard(state: GameState) {
  if (!state.cards.length) return null;
  return [...state.cards].sort((a, b) => cardRoom(b) - cardRoom(a))[0]!;
}

export function issueStarterCard(state: GameState) {
  if (state.cards.length > 0) return;
  const bank = pickBank(state, "card");
  const limit = cardLimitForScore(state.creditScore, bank.id);
  state.cards.push({
    id: nid(state, "cc"),
    bankId: bank.id,
    name: `${bank.name} Visa`,
    limit,
    used: 0,
    apr: aprForScore(bank.cardApr, state.creditScore),
  });
}

export function originateLoan(
  state: GameState,
  bankId: string,
  amount: number,
  purpose: Loan["purpose"],
  weeks?: number,
  forcedApr?: number,
): Loan | string {
  const bank = BANKS.find((b) => b.id === bankId);
  if (!bank) return "Unknown bank.";
  if (state.creditScore < bank.minScore) {
    return `${bank.name} wants a ${bank.minScore}+ FICO. You're at ${Math.round(state.creditScore)}.`;
  }
  if (amount < 500) return "Amount is too small to paper.";
  const range = purpose === "house" ? bank.mortgageApr : purpose === "lease" ? bank.personalApr : bank.personalApr;
  const apr = forcedApr ?? aprForScore(range, state.creditScore);
  const term = weeks ?? (purpose === "house" ? 1560 : purpose === "car" || purpose === "jet" ? 260 : purpose === "lease" ? 156 : 52);
  const payment = weeklyPayment(amount, apr, term);
  const loan: Loan = {
    id: nid(state, "ln"),
    bankId: bank.id,
    bankName: bank.name,
    principal: amount,
    remaining: amount,
    apr,
    weeklyPayment: payment,
    weeksLeft: term,
    purpose,
  };
  state.loans.push(loan);
  return loan;
}

export function pushStatement(
  state: GameState,
  title: string,
  amount: number,
  channel: "debit" | "credit" | "split" | "auto" | "income",
) {
  if (!Array.isArray(state.statements)) state.statements = [];
  state.statements.unshift({
    id: nid(state, "stt"),
    week: state.week,
    title,
    amount,
    channel,
  });
  state.statements = state.statements.slice(0, 80);
}

export function settleDue(state: GameState, due: number, plan: PayPlan, title?: string): string | null {
  const need = Math.max(0, Math.round(due));
  if (need === 0) return null;
  let cashAmt = 0;
  let cardAmt = 0;
  if (plan.method === "cash") cashAmt = need;
  else if (plan.method === "card") cardAmt = need;
  else {
    cashAmt = Math.max(0, Math.round(plan.cashAmount));
    cardAmt = Math.max(0, need - cashAmt);
  }
  if (cashAmt + cardAmt !== need) {
    cardAmt = need - cashAmt;
  }
  if (cashAmt > state.cash + 0.5) {
    return `Debit is short. Checking has $${Math.round(state.cash).toLocaleString("en-US")}. Need $${cashAmt.toLocaleString("en-US")}.`;
  }
  if (cardAmt > 0) {
    const card = state.cards.find((c) => c.id === plan.cardId) ?? bestCard(state);
    if (!card) return "No credit card on file. Apply at Bank, or pay debit.";
    const room = cardRoom(card);
    if (cardAmt > room + 0.5) {
      return `${card.name} only has $${Math.round(room).toLocaleString("en-US")} left. Split with cash or pick another card.`;
    }
    card.used += cardAmt;
    const util = card.black ? 0 : card.used / Math.max(1, card.limit);
    if (util > 0.7) state.creditScore = clamp(state.creditScore - 5, 300, 850);
    else if (util > 0.5) state.creditScore = clamp(state.creditScore - 2, 300, 850);
  }
  state.cash -= cashAmt;
  pushStatement(
    state,
    title ?? "Purchase",
    -need,
    plan.method === "card" ? "credit" : plan.method === "split" ? "split" : "debit",
  );
  return null;
}

export function cashPlan(amount: number): PayPlan {
  return { method: "cash", cardId: null, cashAmount: amount, cardAmount: 0, mode: "outright" };
}

export function describePay(plan: PayPlan, due: number) {
  if (plan.method === "cash") return `Debit card · $${Math.round(due).toLocaleString("en-US")}`;
  if (plan.method === "card") return `Credit card · $${Math.round(due).toLocaleString("en-US")}`;
  return `Debit + credit · $${Math.round(plan.cashAmount).toLocaleString("en-US")} debit + $${Math.round(due - plan.cashAmount).toLocaleString("en-US")} card`;
}
