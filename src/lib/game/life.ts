import { nid, playerArtist, pushNotif, rosterOf, syncPopularity, unlockAchievement } from "./core";
import { cashPlan, issueStarterCard, jetQuote, originateLoan, settleDue } from "./finance";
import { ensureFamily, scandalParents } from "./family";
import { clamp, type Rng } from "./rng";
import type {
  Album,
  Artist,
  FilmRun,
  GameState,
  LegalKind,
  MailKind,
  PayPlan,
  PhotoAsset,
  PopTier,
  SocialPlatform,
  Song,
  SubstanceId,
  WeekLedger,
} from "./types";
import { REGIONS, type RegionId } from "./types";
import {
  ENT_ROLES,
  FILMS,
  FILM_STUDIOS,
  FILM_TITLES,
  GIFTS,
  JETS,
  JEWELRY,
  LAWYERS,
  LUXURY_DAYS,
  NIGHTLIFE,
  SUBSTANCES,
} from "./world";
import { CITY_TO_REGION } from "./catalog";

export function popTier(artist: Artist): PopTier {
  const p = artist.popularity;
  if (p >= 92 || (artist.superstar && p >= 86)) return "mega";
  if (p >= 76) return "alist";
  if (p >= 56) return "star";
  if (p >= 36) return "established";
  if (p >= 16) return "rising";
  return "newcomer";
}

export function barsBlock(state: GameState, action: "tour" | "nightlife" | "film" | "live" | "substance"): string | null {
  const a = playerArtist(state);
  if (!a) return null;
  if (a.incarceratedWeeks > 0 && action !== "substance") {
    return `You're in for ${a.incarceratedWeeks} more week${a.incarceratedWeeks === 1 ? "" : "s"}. The booth still works. The red carpet doesn't.`;
  }
  if (a.rehabWeeks > 0 && (action === "nightlife" || action === "substance")) {
    return "Rehab first. The house has a no-visitors rule.";
  }
  return null;
}

export function ensureLifeState(state: GameState) {
  if (!Array.isArray(state.mail)) state.mail = [];
  if (!Array.isArray(state.films)) state.films = [];
  if (!Array.isArray(state.legal)) state.legal = [];
  if (!Array.isArray(state.jets)) state.jets = [];
  if (!Array.isArray(state.jewelry)) state.jewelry = [];
  if (!Array.isArray(state.buses)) state.buses = [];
  if (!Array.isArray(state.cards)) state.cards = [];
  if (state.cards.length === 0) issueStarterCard(state);
  for (const c of state.cars ?? []) {
    if (typeof c.lease !== "boolean") c.lease = false;
  }
  if (!Array.isArray(state.luxuryLog)) state.luxuryLog = [];
  if (typeof state.savings !== "number") state.savings = 0;
  if (typeof state.savingsApr !== "number") state.savingsApr = 4.35;
  if (typeof state.blackCard !== "boolean") state.blackCard = false;
  if (!state.entourage) state.entourage = { driver: false, chef: false, paparazzi: false };
  if (typeof state.lastNightlifeWeek !== "number") state.lastNightlifeWeek = 0;
  if (typeof state.ledger.nightlife !== "number") state.ledger.nightlife = 0;
  if (typeof state.ledger.legal !== "number") state.ledger.legal = 0;
  if (typeof state.ledger.luxury !== "number") state.ledger.luxury = 0;
  if (!Array.isArray(state.statements)) state.statements = [];
  if (typeof state.cardAutopay !== "boolean") state.cardAutopay = false;
  if (state.ceremony === undefined) state.ceremony = null;
  if (!Array.isArray(state.gigs)) state.gigs = [];
  if (!Array.isArray(state.lands)) state.lands = [];
  if (!Array.isArray(state.islands)) state.islands = [];
  if (!state.jetCrew) state.jetCrew = { pilots: 0, attendants: 0 };
  if (typeof state.lastParentWeek !== "number") state.lastParentWeek = 0;
  for (const a of state.artists) {
    ensureHealth(a);
    ensureFamily(a);
  }
  if (!Array.isArray(state.albums)) state.albums = [];
  for (const s of state.songs) {
    if (typeof s.salesDigitalWeek !== "number") s.salesDigitalWeek = 0;
    if (typeof s.salesPhysicalWeek !== "number") s.salesPhysicalWeek = 0;
    if (typeof s.chartPoints !== "number") s.chartPoints = 0;
    if (typeof s.albumUnits !== "number") s.albumUnits = 0;
    if (typeof s.ost !== "boolean") s.ost = false;
    if (s.albumId === undefined) s.albumId = null;
    if (!s.regional) s.regional = emptyRegions();
    if (!s.regionalWeek) s.regionalWeek = emptyRegions();
  }
  wrapLegacyAlbums(state);
}

export function ensureHealth(artist: Artist) {
  if (typeof artist.vocalHealth !== "number") artist.vocalHealth = 88;
  if (typeof artist.mental !== "number") artist.mental = 74;
  if (!artist.addiction) artist.addiction = { alcohol: 0, pills: 0, smoke: 0 };
  if (typeof artist.rehabWeeks !== "number") artist.rehabWeeks = 0;
  if (typeof artist.incarceratedWeeks !== "number") artist.incarceratedWeeks = 0;
  if (typeof artist.streetCred !== "number") artist.streetCred = artist.superstar ? 40 : 8;
}

export function pushMail(
  state: GameState,
  item: { from: string; subject: string; body: string; kind: MailKind; payload?: string },
) {
  if (item.kind === "family") {
    pushNotif(state, { tone: "info", title: item.subject, body: `${item.from} · ${item.body}` });
    return;
  }
  state.mail.unshift({
    id: nid(state, "em"),
    week: state.week,
    read: false,
    ...item,
  });
  state.mail = state.mail.slice(0, 80);
}

export function readMail(state: GameState, id: string): string | null {
  const m = state.mail.find((x) => x.id === id);
  if (!m) return "Missing.";
  m.read = true;
  return null;
}

export function unreadMail(state: GameState) {
  return (state.mail ?? []).filter((m) => !m.read).length;
}

export function setArtistPhoto(
  state: GameState,
  artistId: string,
  photo: PhotoAsset,
  platform?: SocialPlatform | "all",
): string | null {
  const artist = state.artists.find((a) => a.id === artistId);
  if (!artist) return "No artist.";
  artist.avatar.photo = photo;
  const keys: SocialPlatform[] =
    !platform || platform === "all" ? ["tiktok", "x", "instagram", "youtube", "spotify"] : [platform];
  for (const k of keys) {
    if (!artist.profiles?.[k]) continue;
    artist.profiles[k].avatar = { ...artist.profiles[k].avatar, photo };
  }
  return null;
}

export function depositSavings(state: GameState, amount: number): string | null {
  const n = Math.round(amount);
  if (n < 100) return "Minimum $100.";
  if (state.cash < n) return "Not enough in checking.";
  state.cash -= n;
  state.savings += n;
  return null;
}

export function withdrawSavings(state: GameState, amount: number): string | null {
  const n = Math.round(amount);
  if (n < 1) return "Enter an amount.";
  if (state.savings < n) return "Savings is empty.";
  state.savings -= n;
  state.cash += n;
  return null;
}

export function tryUnlockBlackCard(state: GameState): string | null {
  const you = playerArtist(state) ?? rosterOf(state)[0];
  if (state.blackCard) return "Already issued.";
  if (state.creditScore < 760) return "Need FICO 760.";
  if ((you?.fame ?? 0) < 80 && state.cash + state.savings < 2_000_000) {
    return "Need $2M liquid or 80 fame.";
  }
  state.blackCard = true;
  state.cards.unshift({
    id: nid(state, "cc"),
    bankId: "onyx",
    name: "Onyx Black",
    limit: 500_000,
    used: 0,
    apr: 16.99,
    black: true,
  });
  unlockAchievement(state, "black-card");
  pushNotif(state, { tone: "viral", title: "Black card", body: "Onyx sent metal. No limit on the floor." });
  pushMail(state, {
    kind: "brand",
    from: "Onyx Private",
    subject: "Your Black is live",
    body: "Invitation accepted. Concierge is on the other end of the number.",
  });
  return null;
}

export function hireEntourage(state: GameState, role: "driver" | "chef" | "paparazzi", on: boolean): string | null {
  state.entourage[role] = on;
  return null;
}

export function buyJet(state: GameState, catalogId: string, plan?: PayPlan): string | null {
  const you = playerArtist(state) ?? rosterOf(state)[0];
  const item = JETS.find((j) => j.id === catalogId);
  if (!item) return "Not on the tarmac.";
  if (state.jets.some((j) => j.catalogId === item.id)) return "Already owned.";
  if ((you?.fame ?? 0) < item.fameNeed) return `Fame ${item.fameNeed} to even see the hangar.`;
  const mode = plan?.mode ?? "outright";
  if (mode === "loan" || mode === "lease") {
    const quote = jetQuote(state, item.price, mode);
    if (!quote.allowed) return quote.reason;
    const paid = settleDue(state, quote.dueNow, plan ?? cashPlan(quote.dueNow));
    if (paid) return paid;
    const loan = originateLoan(state, quote.bankId, quote.financed, mode === "lease" ? "lease" : "jet", quote.weeks, quote.apr);
    if (typeof loan === "string") return loan;
    loan.weeklyPayment = quote.weekly;
    state.jets.push({
      catalogId: item.id,
      name: item.name,
      value: mode === "lease" ? 0 : item.price,
      weekBought: state.week,
      weekly: item.weekly,
    });
    pushNotif(state, {
      tone: "good",
      title: item.name,
      body: mode === "lease" ? `Fractional lease · $${quote.weekly.toLocaleString("en-US")}/wk.` : `Financed at ${quote.apr.toFixed(2)}%.`,
    });
    return null;
  }
  const paid = settleDue(state, item.price, plan ?? cashPlan(item.price));
  if (paid) return paid;
  state.jets.push({ catalogId: item.id, name: item.name, value: item.price, weekBought: state.week, weekly: item.weekly });
  pushNotif(state, { tone: "good", title: item.name, body: "Wheels up whenever you want." });
  return null;
}

export function buyJewelry(state: GameState, catalogId: string, plan?: PayPlan): string | null {
  const you = playerArtist(state) ?? rosterOf(state)[0];
  const item = JEWELRY.find((j) => j.id === catalogId);
  if (!item) return "Not in the case.";
  if ((you?.fame ?? 0) < item.fameNeed) return `Fame ${item.fameNeed}.`;
  const paid = settleDue(state, item.price, plan ?? cashPlan(item.price));
  if (paid) return paid;
  state.jewelry.push({ catalogId: item.id, name: item.name, value: item.price, weekBought: state.week, weekly: 0 });
  if (you?.partner) you.partner.closeness = clamp(you.partner.closeness + 10, 0, 100);
  pushNotif(state, { tone: "good", title: item.name, body: "Ice photographed well." });
  return null;
}

export function sendGift(state: GameState, giftId: string, plan?: PayPlan): string | null {
  const you = playerArtist(state);
  if (!you?.partner) return "No one to gift.";
  const g = GIFTS.find((x) => x.id === giftId);
  if (!g) return "Unknown gift.";
  const paid = settleDue(state, g.cost, plan ?? cashPlan(g.cost));
  if (paid) return paid;
  you.partner.closeness = clamp(you.partner.closeness + g.mood, 0, 100);
  you.mood = clamp(you.mood + 4, 0, 100);
  pushNotif(state, { tone: "good", title: `Gifted ${g.name}`, body: `${you.partner.name} noticed.` });
  pushMail(state, {
    kind: "family",
    from: you.partner.name,
    subject: g.name,
    body: `got it. closeness is ${Math.round(you.partner.closeness)}. don't make it a headline.`,
  });
  return null;
}

export function privateDay(state: GameState, catalogId: string, plan?: PayPlan): string | null {
  const you = playerArtist(state);
  if (!you) return "Artist career.";
  const blocked = barsBlock(state, "nightlife");
  if (blocked) return blocked;
  const day = LUXURY_DAYS.find((d) => d.id === catalogId);
  if (!day) return "Not on the desk.";
  if (you.fame < day.fameNeed) return `Fame ${day.fameNeed} to close the park.`;
  const paid = settleDue(state, day.cost, plan ?? cashPlan(day.cost));
  if (paid) return paid;
  you.mood = clamp(you.mood + day.mood, 0, 100);
  if (you.partner) you.partner.closeness = clamp(you.partner.closeness + 12, 0, 100);
  state.luxuryLog.unshift({ id: nid(state, "lx"), week: state.week, name: day.name });
  state.luxuryLog = state.luxuryLog.slice(0, 24);
  if (day.id === "island") unlockAchievement(state, "island");
  pushNotif(state, { tone: "viral", title: day.name, body: "The public wasn't invited." });
  pushMail(state, {
    kind: "family",
    from: you.partner?.name ?? "Family office",
    subject: day.name,
    body: `the buyout closed. no press. ${you.kids.length ? "the kids lasted longer than the adults." : "quiet, finally."}`,
  });
  return null;
}

export function goOut(state: GameState, rng: Rng, catalogId: string, plan?: PayPlan): string | null {
  const you = playerArtist(state);
  if (!you) return "Artist career.";
  const blocked = barsBlock(state, "nightlife");
  if (blocked) return blocked;
  const night = NIGHTLIFE.find((n) => n.id === catalogId);
  if (!night) return "Not on the list.";
  if (you.fame < night.fameNeed) return `Fame ${night.fameNeed} to get past the rope.`;
  const paid = settleDue(state, night.cost, plan ?? cashPlan(night.cost));
  if (paid) return paid;
  you.mood = clamp(you.mood + night.mood, 0, 100);
  you.energy = clamp(you.energy - 18, 0, 100);
  you.addiction.alcohol = clamp(you.addiction.alcohol + 6, 0, 100);
  you.fame = clamp(you.fame + 1.2, 0, 100);
  growSocial(you, Math.round(80 + you.fame * 4));
  state.lastNightlifeWeek = state.week;
  if (night.id === "met") unlockAchievement(state, "gala");
  let extra = 0;
  if (night.id === "poker" || night.id === "casino") {
    const swing = Math.round((rng.next() - 0.42) * night.cost * 1.8);
    state.cash += swing;
    extra = swing;
  }
  pushNotif(state, {
    tone: extra >= 0 ? "good" : "info",
    title: night.name,
    body: extra ? `${extra >= 0 ? "Up" : "Down"} ${Math.abs(extra).toLocaleString("en-US")} at the table.` : "The room took photos.",
  });
  if (rng.next() < night.scandal) {
    openCase(state, rng, rng.chance(0.5) ? "fight" : "dui");
  }
  return null;
}

export function useSubstance(state: GameState, rng: Rng, id: SubstanceId, plan?: PayPlan): string | null {
  const you = playerArtist(state);
  if (!you) return "Artist career.";
  const blocked = barsBlock(state, "substance");
  if (blocked) return blocked;
  const s = SUBSTANCES.find((x) => x.id === id);
  if (!s) return "Unknown.";
  const paid = settleDue(state, s.cost, plan ?? cashPlan(s.cost));
  if (paid) return paid;
  you.addiction[id] = clamp(you.addiction[id] + s.addiction, 0, 100);
  you.stats.writing = clamp(you.stats.writing + s.creative * 0.15, 0, 99);
  you.energy = clamp(you.energy + 8 - s.crash * 0.3, 0, 100);
  you.vocalHealth = clamp(you.vocalHealth - (id === "smoke" ? 6 : 2), 0, 100);
  you.mental = clamp(you.mental - 3, 0, 100);
  if (you.addiction[id] > 72 && rng.chance(0.22)) {
    you.energy = clamp(you.energy - 30, 0, 100);
    pushNotif(state, { tone: "bad", title: "Crash", body: "The session died. Vocal health took the hit." });
  }
  if (you.addiction[id] > 88 && rng.chance(0.12)) {
    you.energy = 8;
    you.mental = clamp(you.mental - 20, 0, 100);
    pushNotif(state, { tone: "bad", title: "Overdose scare", body: "ER. The tabloids already have the intake photo." });
    openCase(state, rng, "contraband");
  }
  if (you.addiction[id] > 60 && rng.chance(0.1)) {
    pushNotif(state, { tone: "bad", title: "Tox leak", body: "A panel is talking about your bloodwork." });
    you.reputation = clamp(you.reputation - 8, 0, 100);
  }
  return null;
}

export function enterRehab(state: GameState, plan?: PayPlan): string | null {
  const you = playerArtist(state);
  if (!you) return "Artist career.";
  if (you.rehabWeeks > 0) return "Already checked in.";
  const cost = 48_000;
  const paid = settleDue(state, cost, plan ?? cashPlan(cost));
  if (paid) return paid;
  you.rehabWeeks = 4;
  you.onHoliday = true;
  you.holidayWeeks = Math.max(you.holidayWeeks, 4);
  pushNotif(state, { tone: "info", title: "Checked in", body: "Four weeks. No phone, no sessions, no tables." });
  pushMail(state, {
    kind: "legal",
    from: "Serenity Hills",
    subject: "Admission confirmed",
    body: "The house is closed to press. Four weeks. Family may write.",
  });
  return null;
}

export function writeJournal(state: GameState): string | null {
  const you = playerArtist(state);
  if (!you) return "Artist career.";
  if (you.incarceratedWeeks <= 0) return "You're not inside.";
  you.mental = clamp(you.mental + 8, 0, 100);
  you.stats.writing = clamp(you.stats.writing + 1.2, 0, 99);
  you.streetCred = clamp(you.streetCred + 3, 0, 100);
  pushNotif(state, { tone: "info", title: "Journal page", body: "The verses from in here hit different." });
  return null;
}

export function hireLawyer(state: GameState, rng: Rng, caseId: string, lawyerId: string, plan?: PayPlan): string | null {
  const c = state.legal.find((x) => x.id === caseId);
  if (!c || c.status === "cleared" || c.status === "jailed") return "That docket is closed.";
  const law = LAWYERS.find((l) => l.id === lawyerId);
  if (!law) return "Unknown counsel.";
  if (law.cost > 0) {
    const paid = settleDue(state, law.cost, plan ?? cashPlan(law.cost));
    if (paid) return paid;
  }
  c.lawyerId = law.id;
  const chance = 0.18 + law.skill / 140;
  if (rng.next() < chance) {
    c.status = "cleared";
    c.weeksLeft = 0;
    unlockAchievement(state, "cleared");
    pushNotif(state, { tone: "good", title: "Case dropped", body: `${law.name} walked it.` });
  } else {
    pushNotif(state, { tone: "info", title: "Retainer in", body: `${law.name} is on the file. Trial still sits.` });
  }
  return null;
}

export function postBail(state: GameState, caseId: string, plan?: PayPlan): string | null {
  const c = state.legal.find((x) => x.id === caseId);
  if (!c || (c.status !== "open" && c.status !== "trial")) return "Nothing to post.";
  const paid = settleDue(state, c.bail, plan ?? cashPlan(c.bail));
  if (paid) return paid;
  c.status = "bail";
  const you = playerArtist(state);
  if (you) you.incarceratedWeeks = 0;
  pushNotif(state, { tone: "good", title: "Out on bail", body: "Don't leave the state. Don't post about it." });
  return null;
}

function emptyRegions(): Song["regional"] {
  const o = {} as Song["regional"];
  for (const r of REGIONS) o[r.id] = { streams: 0, digital: 0, physical: 0, radio: 0 };
  return o;
}

function makeOstSong(state: GameState, artist: Artist, title: string): Song {
  return {
    id: nid(state, "s"),
    artistId: artist.id,
    title,
    genre: artist.genre,
    writing: artist.stats.writing,
    production: 78,
    hook: artist.stats.charisma,
    mix: 74,
    quality: 80,
    status: "released",
    kind: "single",
    weeksLeft: 0,
    releasedWeek: state.week,
    streams: 0,
    streamsWeek: 0,
    streamsPending: 0,
    weekHistory: [],
    sales: 0,
    salesPhysical: 0,
    salesDigital: 0,
    salesDigitalWeek: 0,
    salesPhysicalWeek: 0,
    peakChart: null,
    chart: null,
    albumChart: null,
    peakAlbum: null,
    radioWeeks: 2,
    radioPower: 40,
    radioChart: null,
    peakRadio: null,
    playlist: true,
    soundId: null,
    weekPayout: 0,
    promoHeat: 48,
    lastPromoWeek: state.week,
    videoHeat: 0,
    tiktokHeat: 0,
    regional: emptyRegions(),
    awards: [],
    cover: 3,
    collabArtistId: null,
    featureFee: 0,
    featureSplit: 0,
    releaseFormat: "both",
    bside: false,
    chartPoints: 0,
    albumUnits: 0,
    ost: true,
    albumId: null,
    regionalWeek: emptyRegions(),
  };
}

export function auditionFilm(state: GameState, rng: Rng, catalogId: string): string | null {
  const you = playerArtist(state);
  if (!you) return "Artist career.";
  const blocked = barsBlock(state, "film");
  if (blocked) return blocked;
  const catalog = FILMS.find((f) => f.id === catalogId);
  const slate = state.films.find((f) => f.catalogId === catalogId && f.status === "pre");
  const film = catalog
    ? {
        id: catalog.id,
        title: catalog.title,
        studio: catalog.studio,
        budget: catalog.budget,
        fameNeed: catalog.fameNeed,
        pay: catalog.pay,
        weeks: catalog.weeks,
        role: catalog.role,
        ost: catalog.ost,
      }
    : slate
      ? {
          id: slate.catalogId,
          title: slate.title,
          studio: slate.studio,
          budget: slate.budget,
          fameNeed: slate.fameNeed ?? 20,
          pay: slate.pay,
          weeks: slate.weeksLeft || 3,
          role: slate.role === "none" ? "cameo" : slate.role,
          ost: Boolean(slate.ostOffer || slate.ostSongId),
        }
      : null;
  if (!film) return "Script not on the pile.";
  if (state.films.some((f) => f.catalogId === film.id && f.artistId === you.id && f.status !== "done" && f.status !== "pre")) {
    return "You're already on that picture.";
  }
  if (you.fame < film.fameNeed) return `They want fame ${film.fameNeed}. You're ${Math.round(you.fame)}.`;
  const chance = clamp(0.22 + you.fame / 140 + you.stats.charisma / 220 + you.stats.looks / 280, 0.12, 0.88);
  if (rng.next() > chance) {
    pushNotif(state, {
      tone: "info",
      title: `Passed on ${film.title}`,
      body: "Chemistry read didn't land. The tape stays in the room.",
    });
    pushMail(state, {
      kind: "film",
      from: film.studio,
      subject: `Re: ${film.title}`,
      body: "We went another direction. Keep us in mind for the sequel's party scene.",
    });
    return null;
  }
  state.cash += film.pay;
  if (slate) {
    slate.status = "shooting";
    slate.artistId = you.id;
    slate.role = film.role;
    slate.pay = film.pay;
    slate.weeksLeft = film.weeks;
    if (film.ost) {
      const song = makeOstSong(state, you, `${film.title} — Main Title`);
      song.status = "mastered";
      song.releasedWeek = null;
      state.songs.push(song);
      slate.ostSongId = song.id;
      unlockAchievement(state, "oscar-ost");
    }
    you.energy = clamp(you.energy - 16, 0, 100);
    you.fame = clamp(you.fame + (film.role === "lead" ? 8 : film.role === "supporting" ? 4 : 2), 0, 100);
    pushNotif(state, {
      tone: "viral",
      title: `Booked ${film.title}`,
      body: `${film.role} · ${film.studio} · $${film.pay.toLocaleString("en-US")}.`,
    });
    pushMail(state, {
      kind: "film",
      from: film.studio,
      subject: `${film.title} — deal closed`,
      body: `Call time is next week. Role: ${film.role}. ${film.ost ? "Your OST masters with the picture." : "No soundtrack this time."}`,
    });
    return null;
  }
  const run: FilmRun = {
    id: nid(state, "fl"),
    catalogId: film.id,
    title: film.title,
    studio: film.studio,
    week: state.week,
    budget: film.budget,
    gross: 0,
    grossWeek: 0,
    status: "shooting",
    role: film.role,
    artistId: you.id,
    ostSongId: null,
    boxRank: null,
    weeksLeft: film.weeks,
    pay: film.pay,
    fameNeed: film.fameNeed,
    ostOffer: film.ost,
  };
  if (film.ost) {
    const song = makeOstSong(state, you, `${film.title} — Main Title`);
    song.status = "mastered";
    song.releasedWeek = null;
    state.songs.push(song);
    run.ostSongId = song.id;
    unlockAchievement(state, "oscar-ost");
  }
  state.films.unshift(run);
  you.energy = clamp(you.energy - 16, 0, 100);
  you.fame = clamp(you.fame + (film.role === "lead" ? 8 : film.role === "supporting" ? 4 : 2), 0, 100);
  pushNotif(state, {
    tone: "viral",
    title: `Booked ${film.title}`,
    body: `${film.role} · ${film.studio} · $${film.pay.toLocaleString("en-US")}.`,
  });
  pushMail(state, {
    kind: "film",
    from: film.studio,
    subject: `${film.title} — deal closed`,
    body: `Call time is next week. Role: ${film.role}. ${film.ost ? "Your OST masters with the picture." : "No soundtrack this time."}`,
  });
  return null;
}

function growSocial(artist: Artist, n: number) {
  artist.followers.instagram += n;
  artist.followers.x += Math.round(n * 0.6);
  artist.followers.tiktok += Math.round(n * 0.4);
}

function openCase(state: GameState, rng: Rng, kind: LegalKind) {
  const you = playerArtist(state);
  if (!you) return;
  const bail = kind === "fraud" ? 180_000 : kind === "dui" ? 28_000 : kind === "fight" ? 12_000 : 22_000;
  const note =
    kind === "fight"
      ? "Club cameras. Someone swung first. Everyone has a lawyer."
      : kind === "dui"
        ? "Pulled over after the table. Breathalyzer did not lie."
        : kind === "contraband"
          ? "Search after the afterparty. The bag wasn't empty."
          : kind === "fraud"
            ? "Forensic accountants at the label. The advance paper doesn't match."
            : "A leaked tape. The other side wants money and an apology.";
  const weeks = kind === "fraud" ? 12 : kind === "dui" ? 4 : 3;
  state.legal.unshift({
    id: nid(state, "cs"),
    kind,
    week: state.week,
    status: "open",
    bail,
    fine: Math.round(bail * 0.6),
    weeksLeft: weeks,
    lawyerId: null,
    note,
  });
  you.streetCred = clamp(you.streetCred + (kind === "fight" ? 8 : 3), 0, 100);
  you.reputation = clamp(you.reputation - 6, 0, 100);
  you.mood = clamp(you.mood - 10, 0, 100);
  scandalParents(you, kind === "fraud" ? 18 : 12);
  pushNotif(state, { tone: "bad", title: `Charged · ${kind}`, body: note });
  pushMail(state, {
    kind: "legal",
    from: "County Clerk",
    subject: `People v. ${you.name}`,
    body: `${note} Bail ${bail.toLocaleString("en-US")}. Hire counsel or sit the weeks.`,
    payload: state.legal[0]?.id,
  });
}

function rankBoxOffice(state: GameState) {
  const live = state.films.filter((f) => f.status === "released");
  live.sort((a, b) => b.grossWeek - a.grossWeek);
  live.forEach((f, i) => {
    f.boxRank = i + 1;
  });
  state.films.filter((f) => f.status !== "released").forEach((f) => {
    f.boxRank = null;
  });
}

export function refreshHollywood(state: GameState, rng: Rng) {
  if (state.week % 6 !== 1) return;
  state.films = state.films.filter((f) => !f.catalogId.startsWith("slate") || f.artistId || f.status !== "pre");
  const titles = rng.shuffle([...FILM_TITLES]);
  const studios = rng.shuffle([...FILM_STUDIOS]);
  const roles = ["cameo", "cameo", "supporting", "lead", "voice", "cameo"] as const;
  for (let i = 0; i < 6; i++) {
    const role = roles[i]!;
    const ost = role === "voice" || role === "lead" || rng.chance(0.35);
    const budget = Math.round((role === "lead" ? 160 : role === "supporting" ? 80 : 22) * 1_000_000 * (0.7 + rng.next() * 0.8));
    const fameNeed = role === "lead" ? 62 : role === "supporting" ? 38 : role === "voice" ? 28 : 12;
    const pay = Math.round(fameNeed * 2_400 * (0.8 + rng.next()));
    state.films.unshift({
      id: nid(state, "fl"),
      catalogId: `slate-${state.week}-${i}`,
      title: titles[i] ?? `Untitled ${i}`,
      studio: studios[i % studios.length] ?? "Harbor Pictures",
      week: state.week,
      budget,
      gross: 0,
      grossWeek: 0,
      status: "pre",
      role,
      artistId: null,
      ostSongId: null,
      boxRank: null,
      weeksLeft: rng.int(2, 7),
      pay,
      fameNeed,
      ostOffer: ost,
    });
  }
  for (const f of state.films) {
    if (f.artistId || f.status !== "released") continue;
    if (rng.chance(0.35)) {
      f.title = rng.pick([...FILM_TITLES]);
      f.studio = rng.pick([...FILM_STUDIOS]);
    }
  }
  rankBoxOffice(state);
}

export function seedFilms(state: GameState, rng: Rng) {
  if (state.films.length) return;
  for (const f of FILMS) {
    const age = rng.int(0, 8);
    const weekly = Math.round(f.budget * (0.08 + rng.next() * 0.22));
    state.films.push({
      id: nid(state, "fl"),
      catalogId: f.id,
      title: f.title,
      studio: f.studio,
      week: Math.max(1, state.week - age),
      budget: f.budget,
      gross: weekly * (age + 2),
      grossWeek: weekly,
      status: "released",
      role: "none",
      artistId: null,
      ostSongId: null,
      boxRank: null,
      weeksLeft: Math.max(1, 8 - age),
      pay: 0,
    });
  }
  rankBoxOffice(state);
  refreshHollywood(state, rng);
}

function tickMail(state: GameState, rng: Rng) {
  const you = playerArtist(state) ?? rosterOf(state)[0];
  if (!you) return;
  if (rng.chance(0.35)) {
    pushMail(state, {
      kind: "producer",
      from: rng.pick(["Room 404", "Harbor writers", "Stockholm camp", "Atlanta rooms"]),
      subject: "Beat pack",
      body: "six joints, no sample issues. first right of refusal till Friday.",
    });
  }
  if (you.fame > 18 && rng.chance(0.22)) {
    pushMail(state, {
      kind: "sponsor",
      from: rng.pick(["Nike", "Pepsi", "Beats", "Cîroc", "Samsung"]),
      subject: "Partnership deck",
      body: `numbers look like a ${Math.round(8_000 + you.fame * 180).toLocaleString("en-US")}/wk kit if you wear the logo.`,
    });
  }
  if (you.fame > 24 && rng.chance(0.2)) {
    const film = rng.pick([...FILMS]);
    pushMail(state, {
      kind: "film",
      from: film.studio,
      subject: `${film.title} — chemistry read`,
      body: `role ${film.role}. fame bar ${film.fameNeed}. pay $${film.pay.toLocaleString("en-US")}. Hollywood tab has the script.`,
      payload: film.id,
    });
  }
  if (you.popularity > 22 && rng.chance(0.18)) {
    pushMail(state, {
      kind: "tour",
      from: "CAA routing",
      subject: "Offer: rooms that fit",
      body: "promoters want a run. Tours tab already knows which rooms you can fill.",
    });
  }
  if (you.partner && rng.chance(0.25)) {
    pushNotif(state, {
      tone: "info",
      title: rng.pick(["Dinner?", "Don't post that", "Are you coming home"]),
      body: `${you.partner.name} · closeness ${Math.round(you.partner.closeness)}. Fame is a roommate now.`,
    });
  }
  if (state.deals.some((d) => d.status === "open") && rng.chance(0.5)) {
    const d = state.deals.find((x) => x.status === "open")!;
    pushMail(state, {
      kind: "label",
      from: d.labelName,
      subject: "The offer is still on the table",
      body: `Advance $${d.advance.toLocaleString("en-US")} · royalty ${Math.round(d.royalty * 100)}% · ${d.albums} albums.`,
    });
  }
}

function tickHealth(state: GameState, rng: Rng) {
  const you = playerArtist(state);
  if (!you) return;
  ensureHealth(you);
  if (you.rehabWeeks > 0) {
    you.rehabWeeks -= 1;
    you.addiction.alcohol = clamp(you.addiction.alcohol - 12, 0, 100);
    you.addiction.pills = clamp(you.addiction.pills - 14, 0, 100);
    you.addiction.smoke = clamp(you.addiction.smoke - 10, 0, 100);
    you.mental = clamp(you.mental + 8, 0, 100);
    you.vocalHealth = clamp(you.vocalHealth + 4, 0, 100);
    if (you.rehabWeeks <= 0) {
      unlockAchievement(state, "rehab");
      pushNotif(state, { tone: "good", title: "Discharged", body: "Thirty days. The meters are quieter." });
    }
  } else {
    you.addiction.alcohol = clamp(you.addiction.alcohol - 1.2, 0, 100);
    you.addiction.pills = clamp(you.addiction.pills - 1.4, 0, 100);
    you.addiction.smoke = clamp(you.addiction.smoke - 0.8, 0, 100);
    you.vocalHealth = clamp(you.vocalHealth + (you.energy > 50 ? 2 : -1), 20, 100);
    you.mental = clamp(you.mental + rng.gauss(0.4, 3), 8, 100);
  }
  if (you.incarceratedWeeks > 0) {
    you.incarceratedWeeks -= 1;
    you.energy = clamp(you.energy - 8, 10, 100);
    you.mental = clamp(you.mental - 4, 8, 100);
    you.streetCred = clamp(you.streetCred + 2, 0, 100);
    you.stats.writing = clamp(you.stats.writing + 0.4, 0, 99);
    if (you.incarceratedWeeks <= 0) {
      pushNotif(state, { tone: "good", title: "Released", body: "The gate opened. The internet already posted the walk." });
    }
  }
}

function tickLegal(state: GameState, rng: Rng, ledger: WeekLedger) {
  const you = playerArtist(state);
  for (const c of state.legal) {
    if (c.status === "cleared" || c.status === "jailed") continue;
    c.weeksLeft -= 1;
    if (c.weeksLeft > 0) continue;
    const law = LAWYERS.find((l) => l.id === c.lawyerId);
    const chance = 0.12 + (law ? law.skill / 130 : 0);
    if (rng.next() < chance) {
      c.status = "cleared";
      unlockAchievement(state, "cleared");
      pushNotif(state, { tone: "good", title: "Not guilty", body: c.note });
    } else {
      c.status = "jailed";
      const term = c.kind === "fraud" ? 8 : c.kind === "dui" ? 3 : 2;
      if (you) {
        you.incarceratedWeeks = Math.max(you.incarceratedWeeks, term);
        scandalParents(you, 16);
      }
      state.cash -= c.fine;
      ledger.legal += c.fine;
      pushNotif(state, {
        tone: "bad",
        title: `Sentenced · ${term} weeks`,
        body: "You can still write. You cannot tour, film, or go out.",
      });
    }
  }
}

function tickFilms(state: GameState, rng: Rng) {
  for (const f of state.films) {
    if (f.status === "shooting") {
      f.weeksLeft -= 1;
      if (f.weeksLeft <= 0) {
        f.status = "released";
        f.weeksLeft = 6;
        f.grossWeek = Math.round(f.budget * (0.12 + rng.next() * 0.28) * (f.role === "lead" ? 1.35 : 1));
        f.gross = f.grossWeek;
        if (f.artistId) unlockAchievement(state, "box-office");
        if (f.ostSongId) {
          const song = state.songs.find((s) => s.id === f.ostSongId);
          if (song) {
            song.releasedWeek = state.week;
            song.status = "released";
            song.streamsWeek = Math.round(f.grossWeek * 0.012);
            song.streams = song.streamsWeek;
            song.weekHistory = [song.streamsWeek];
            song.promoHeat = 70;
            song.lastPromoWeek = state.week;
            song.ost = true;
          }
        }
        pushNotif(state, {
          tone: "viral",
          title: `${f.title} opens`,
          body: `$${Math.round(f.grossWeek / 1_000_000)}M weekend${f.role !== "none" ? ` · you as ${f.role}` : ""}.`,
        });
      }
    } else if (f.status === "released") {
      f.grossWeek = Math.round(f.grossWeek * (0.52 + rng.next() * 0.16));
      f.gross += f.grossWeek;
      f.weeksLeft -= 1;
      if (f.weeksLeft <= 0 || f.grossWeek < 400_000) f.status = "done";
    }
  }
  rankBoxOffice(state);
}

function tickBankExtras(state: GameState, ledger: WeekLedger) {
  if (state.savings > 0) {
    const interest = Math.round(state.savings * (state.savingsApr / 100 / 52));
    state.savings += interest;
  }
  const you = playerArtist(state) ?? rosterOf(state)[0];
  if (!state.blackCard && you && state.creditScore >= 760 && (you.fame >= 80 || state.cash + state.savings >= 2_000_000)) {
    if (!state.mail.some((m) => m.subject.includes("Black card") && state.week - m.week < 8)) {
      pushMail(state, {
        kind: "brand",
        from: "Onyx Private",
        subject: "Black card invitation",
        body: "FICO and liquidity cleared. Open Bank to accept the metal.",
      });
    }
  }
  let burn = 0;
  for (const role of ENT_ROLES) {
    if (state.entourage[role.id]) burn += role.weekly;
  }
  for (const j of state.jets) burn += j.weekly;
  for (const b of state.buses) burn += b.weekly;
  for (const i of state.islands ?? []) burn += i.weekly;
  const crew = state.jetCrew ?? { pilots: 0, attendants: 0 };
  burn += crew.pilots * 4_000 + crew.attendants * 2_200;
  if (burn > 0) {
    state.cash -= burn;
    ledger.security += burn;
  }
}

export function tickLife(state: GameState, rng: Rng, ledger: WeekLedger) {
  ensureLifeState(state);
  tickHealth(state, rng);
  tickLegal(state, rng, ledger);
  tickFilms(state, rng);
  tickMail(state, rng);
  tickBankExtras(state, ledger);
  const you = playerArtist(state);
  if (you && you.incarceratedWeeks > 0 && rng.chance(0.4)) {
    pushNotif(state, {
      tone: "info",
      title: "Visiting hours",
      body: `${you.partner?.name ?? you.parents.mom} came. They counted the minutes. Write the record anyway.`,
    });
  }
}

export function featureFeeForGuest(guest: Artist, state?: GameState | null) {
  syncPopularity(guest);
  const p = guest.popularity;
  let fee = 2_400 * Math.pow(1.072, p);
  if (state) {
    const peaks = state.songs
      .filter((s) => s.artistId === guest.id || s.collabArtistId === guest.id)
      .map((s) => s.peakChart)
      .filter((n): n is number => typeof n === "number");
    const best = peaks.length ? Math.min(...peaks) : 99;
    if (best === 1) fee *= 2.4;
    else if (best <= 5) fee *= 1.85;
    else if (best <= 10) fee *= 1.5;
    else if (best <= 20) fee *= 1.28;
    else if (best <= 40) fee *= 1.12;
  }
  if (guest.superstar || guest.real) fee *= 1.62;
  const t = popTier(guest);
  if (t === "mega") fee = Math.max(fee, 1_250_000);
  if (t === "alist") fee = Math.max(fee, 520_000);
  return Math.round(Math.min(fee, 4_800_000));
}

export function featureQuote(state: GameState, guest: Artist, host: Artist | null) {
  const fee = featureFeeForGuest(guest, state);
  const split = clamp(0.14 + guest.popularity / 380, 0.12, 0.42);
  const tier = popTier(guest);
  if (!host) return { fee, split, ok: true, reason: "", tier };
  const ht = popTier(host);
  const hostPeak = state.songs
    .filter((s) => s.artistId === host.id && s.peakChart != null)
    .reduce((n, s) => Math.min(n, s.peakChart ?? 99), 99);
  const gap = guest.popularity - host.popularity;
  const aList = tier === "alist" || tier === "mega" || guest.superstar || guest.real || guest.popularity >= 76;
  const proven = hostPeak <= 20 && host.fame >= 40 && host.popularity >= 32;
  if (aList && !proven) {
    return {
      fee,
      split,
      ok: false,
      reason: `${guest.name}'s camp won't take the meeting. Chart a Hot 100 and get famous first — you can't buy the top.`,
      tier,
    };
  }
  if (gap > 38 && host.fame < 42) {
    return {
      fee,
      split,
      ok: false,
      reason: `${guest.name} doesn't hop on unproven records. Build a catalog they can hear.`,
      tier,
    };
  }
  if ((ht === "newcomer" || ht === "rising") && fee >= 80_000) {
    return {
      fee,
      split,
      ok: false,
      reason: `That verse is ${Math.round(fee / 1000)}k. Grind the local rooms until your name clears the door.`,
      tier,
    };
  }
  return { fee, split, ok: true, reason: "", tier };
}

export function hot100Points(state: GameState, song: Song) {
  const tok = state.clips.filter((c) => c.songId === song.id).reduce((n, c) => n + c.viewsWeek, 0);
  return (
    song.streamsWeek +
    song.salesDigitalWeek * 1_250 +
    song.salesPhysicalWeek * 1_500 +
    (song.radioWeeks > 0 ? song.radioPower * 220 : song.radioPower * 18) +
    tok * 0.22 +
    song.promoHeat * 80
  );
}

export function albumUnitsOf(song: Song) {
  const pure = song.salesPhysicalWeek + song.salesDigitalWeek * 0.35;
  const tea = song.salesDigitalWeek / 10;
  const sea = song.streamsWeek / 1_250;
  return pure + tea + sea;
}

const GENRE_REGION: Partial<Record<Song["genre"], RegionId>> = {
  afrobeats: "africa",
  latin: "southamerica",
  drill: "europe",
  country: "northamerica",
  electronic: "europe",
};

function jitter(seed: string, region: RegionId) {
  let n = 2166136261;
  for (let i = 0; i < seed.length; i++) n = Math.imul(n ^ seed.charCodeAt(i), 16777619);
  for (let i = 0; i < region.length; i++) n = Math.imul(n ^ region.charCodeAt(i), 16777619);
  return 0.82 + ((n >>> 0) % 37) / 100;
}

export function regionMix(state: GameState, song: Song, artist?: Artist | null): Record<RegionId, number> {
  const a = artist ?? state.artists.find((x) => x.id === song.artistId);
  const homeR: RegionId = (a && CITY_TO_REGION[a.hometown]) || "northamerica";
  const genreR = GENRE_REGION[song.genre];
  const weights = {} as Record<RegionId, number>;
  for (const r of REGIONS) {
    let w = 0.045 * jitter(song.id, r.id);
    if (r.id === homeR) w += 0.34;
    if (genreR && r.id === genreR) w += 0.2;
    const rep = a?.regionalRep?.[r.id] ?? 8;
    w += (rep / 100) * 0.22;
    const targeted = state.campaigns?.some((c) => c.songId === song.id && c.weeksLeft > 0 && c.region === r.id);
    if (targeted) w += 0.18;
    weights[r.id] = w;
  }
  return weights;
}

export function apportion(total: number, weights: Record<RegionId, number>): Record<RegionId, number> {
  const ids = REGIONS.map((r) => r.id);
  const sumW = ids.reduce((n, id) => n + (weights[id] || 0), 0) || 1;
  const raw = ids.map((id) => (total * (weights[id] || 0)) / sumW);
  const floors = raw.map((x) => Math.floor(x));
  let rem = Math.round(total) - floors.reduce((a, b) => a + b, 0);
  const order = ids
    .map((id, i) => ({ id, frac: raw[i]! - floors[i]! }))
    .sort((a, b) => b.frac - a.frac);
  const out = {} as Record<RegionId, number>;
  ids.forEach((id, i) => {
    out[id] = floors[i]!;
  });
  for (let k = 0; k < Math.abs(rem); k++) {
    const id = order[k % order.length]!.id;
    out[id] += rem > 0 ? 1 : -1;
  }
  return out;
}

export function paintRegionalWeek(
  state: GameState,
  song: Song,
  streamsWeek: number,
  digitalWeek: number,
  physicalWeek: number,
  radioWeek = 0,
  accumulate = true,
) {
  if (!song.regional) song.regional = emptyRegions();
  if (!song.regionalWeek) song.regionalWeek = emptyRegions();
  const mix = regionMix(state, song);
  const streams = apportion(Math.max(0, Math.round(streamsWeek)), mix);
  const digital = apportion(Math.max(0, Math.round(digitalWeek)), mix);
  const physical = apportion(Math.max(0, Math.round(physicalWeek)), mix);
  const radio = apportion(Math.max(0, Math.round(radioWeek)), mix);
  for (const r of REGIONS) {
    const id = r.id;
    song.regionalWeek[id] = {
      streams: streams[id] ?? 0,
      digital: digital[id] ?? 0,
      physical: physical[id] ?? 0,
      radio: radio[id] ?? 0,
    };
    if (accumulate) {
      song.regional[id].streams += streams[id] ?? 0;
      song.regional[id].digital += digital[id] ?? 0;
      song.regional[id].physical += physical[id] ?? 0;
      song.regional[id].radio += radio[id] ?? 0;
    }
  }
}

export function weekPlays(song: Song, region: RegionId | "global"): number {
  if (region === "global") return Math.round(song.streamsWeek || 0);
  return Math.round(song.regionalWeek?.[region]?.streams ?? 0);
}

export function weekHotPoints(state: GameState, song: Song, region: RegionId | "global"): number {
  const global = hot100Points(state, song);
  if (region === "global") return Math.round(global);
  const mix = regionMix(state, song);
  const parts = apportion(Math.max(0, Math.round(global)), mix);
  return parts[region] ?? 0;
}

export function albumWeekUnits(album: Album, tracks: Song[]): number {
  const streams = tracks.reduce((n, s) => n + (s.streamsWeek || 0), 0);
  const trackDigital = tracks.reduce((n, s) => n + (s.salesDigitalWeek || 0), 0);
  const physical = album.salesPhysicalWeek || 0;
  const digital = album.salesDigitalWeek || 0;
  const tea = trackDigital / 10;
  const sea = streams / 1_250;
  return physical + digital * 0.35 + tea + sea;
}

export function albumWeekSales(album: Album, tracks: Song[], region: RegionId | "global", state: GameState): number {
  const units = album.albumUnits || albumWeekUnits(album, tracks);
  if (region === "global") return Math.round(units);
  const lead = tracks[0];
  if (!lead) return Math.round(units / REGIONS.length);
  const mix = regionMix(state, lead);
  return apportion(Math.max(0, Math.round(units)), mix)[region] ?? 0;
}

export function isStreamingTrack(song: Song) {
  return song.status === "released" && song.kind !== "album" && song.kind !== "ep" && song.kind !== "greatestHits";
}

function wrapLegacyAlbums(state: GameState) {
  for (const s of state.songs) {
    if (s.kind !== "album" && s.kind !== "ep" && s.kind !== "greatestHits") continue;
    if (s.status !== "released") continue;
    if (s.albumId && state.albums.some((a) => a.id === s.albumId)) continue;
    const album: Album = {
      id: nid(state, "lp"),
      artistId: s.artistId,
      title: s.title.replace(/\s*\(LP\)$/i, ""),
      kind: s.kind === "ep" ? "ep" : s.kind === "greatestHits" ? "greatestHits" : "album",
      songIds: [s.id],
      status: "released",
      releasedWeek: s.releasedWeek,
      streams: s.streams,
      streamsWeek: s.streamsWeek,
      salesPhysical: s.salesPhysical,
      salesDigital: s.salesDigital,
      salesPhysicalWeek: s.salesPhysicalWeek,
      salesDigitalWeek: s.salesDigitalWeek,
      albumUnits: s.albumUnits || albumUnitsOf(s),
      chart: s.albumChart,
      peakChart: s.peakAlbum,
      cover: s.cover,
      producer: "In-house",
      execProducer: "Independent",
      releaseFormat: s.releaseFormat ?? "both",
    };
    state.albums.push(album);
    s.albumId = album.id;
  }
}

export type { RegionId };
