import { nid, playerArtist, pushNotif, unlockAchievement } from "./core";
import { cashPlan, settleDue } from "./finance";
import { clamp, mulberry32, type Rng } from "./rng";
import type {
  Artist,
  ArtistStats,
  CheckoutDraft,
  GameState,
  GenderId,
  Kid,
  ParentCard,
  PayPlan,
  SchoolTrack,
  WeekLedger,
} from "./types";
import {
  BOTTLES,
  BUILD_OPTS,
  GIG_KINDS,
  ISLANDS,
  KID_TRAITS,
  LAND,
  LESSONS,
  SCHOOLS,
  SUITORS,
  VACATIONS,
  suitorGender,
} from "./world";
import { makeAvatar } from "./catalog";

const MOM_NAMES = ["Diane", "Angela", "Rosa", "Helen", "Priya", "Carol"];
const DAD_NAMES = ["Raymond", "Marcus", "James", "Andre", "Luis", "David"];
const TALENTS = ["voice", "piano", "dance", "writing", "production", "none yet"];

function emptyStats(): ArtistStats {
  return {
    vocals: 28,
    writing: 24,
    dance: 30,
    charisma: 32,
    looks: 40,
    workEthic: 35,
    social: 30,
    production: 18,
    performance: 22,
  };
}

function rngFor(artist: Artist): Rng {
  let n = 2166136261;
  for (let i = 0; i < artist.name.length; i++) n = Math.imul(n ^ artist.name.charCodeAt(i), 16777619);
  return mulberry32((n + artist.age * 997) >>> 0);
}

export function ensureFamily(artist: Artist, rng?: Rng) {
  if (!artist.gender) artist.gender = "female";
  if (!artist.orientation) artist.orientation = "straight";
  if (artist.pregnancy === undefined) artist.pregnancy = null;
  if (typeof artist.lastIntimacyWeek !== "number") artist.lastIntimacyWeek = 0;
  if (!artist.parents) artist.parents = { mom: "Mom", dad: "Dad", closeness: 70, cards: [] };
  if (!artist.parents.cards || artist.parents.cards.length < 2) {
    artist.parents = makeParents(artist.age, rng ?? rngFor(artist));
  }
  if (artist.partner && !artist.partner.gender) {
    artist.partner.gender = suitorGender(artist.partner.catalogId ?? "") === "female" ? "female" : "male";
  }
  if (!Array.isArray(artist.kids)) artist.kids = [];
  for (const k of artist.kids) {
    if (typeof k.closeness !== "number") k.closeness = 70;
    if (!k.stats) k.stats = emptyStats();
    if (!k.lessons) k.lessons = { vocal: 0, dance: 0, theory: 0, instrument: 0 };
    if (!k.schoolTrack) {
      k.schoolTrack = k.school?.includes("arts")
        ? "arts"
        : k.school?.includes("prep") || k.school?.includes("private")
          ? "prep"
          : k.school?.includes("tutor")
            ? "tutor"
            : "public";
    }
    if (!k.talent) k.talent = TALENTS[k.age % TALENTS.length]!;
  }
}

export function makeParents(age: number, rng: Rng): Artist["parents"] {
  const mom: ParentCard = {
    role: "mom",
    name: rng.pick(MOM_NAMES),
    age: age + rng.int(22, 32),
    job: rng.pick(["nurse", "teacher", "bookkeeper", "hair", "retail"]),
    closeness: rng.int(58, 86),
    avatar: makeAvatar(rng),
  };
  const dad: ParentCard = {
    role: "dad",
    name: rng.pick(DAD_NAMES),
    age: age + rng.int(24, 34),
    job: rng.pick(["contractor", "driver", "cook", "mechanic", "pastor"]),
    closeness: rng.int(52, 82),
    avatar: makeAvatar(rng),
  };
  return {
    mom: mom.name,
    dad: dad.name,
    closeness: Math.round((mom.closeness + dad.closeness) / 2),
    cards: [mom, dad],
  };
}

export function matchesOrientation(you: Artist, gender: GenderId) {
  if (you.orientation === "bisexual") return true;
  if (you.orientation === "gay") return gender === you.gender;
  return gender !== you.gender;
}

export function parentAct(
  state: GameState,
  role: "mom" | "dad",
  act: "call" | "aid" | "gift" | "vip",
  plan?: PayPlan,
): string | null {
  const you = playerArtist(state);
  if (!you) return "Artist career.";
  ensureFamily(you);
  const card = you.parents.cards.find((c) => c.role === role);
  if (!card) return "Missing parent.";
  if (state.lastParentWeek === state.week && act === "call") return "Already called this week.";
  const costs = { call: 0, aid: 5_000, gift: 48_000, vip: 12_000 };
  const cost = costs[act];
  if (cost > 0) {
    const paid = settleDue(state, cost, plan ?? cashPlan(cost), `${card.name} · ${act}`);
    if (paid) return paid;
  }
  const gain = act === "call" ? 4 : act === "aid" ? 8 : act === "gift" ? 14 : 10;
  card.closeness = clamp(card.closeness + gain, 0, 100);
  you.parents.closeness = Math.round(you.parents.cards.reduce((n, c) => n + c.closeness, 0) / you.parents.cards.length);
  if (act === "call") state.lastParentWeek = state.week;
  you.mood = clamp(you.mood + 3, 0, 100);
  pushNotif(state, {
    tone: "good",
    title: `${card.name} · ${act === "call" ? "called" : act === "aid" ? "wired aid" : act === "gift" ? "luxury gift" : "VIP invite"}`,
    body: `Closeness ${Math.round(card.closeness)}. They noticed.`,
  });
  return null;
}

export function scandalParents(you: Artist, hit: number) {
  ensureFamily(you);
  for (const c of you.parents.cards) c.closeness = clamp(c.closeness - hit, 0, 100);
  you.parents.closeness = Math.round(
    you.parents.cards.reduce((n, c) => n + c.closeness, 0) / Math.max(1, you.parents.cards.length),
  );
}

export function intimacy(state: GameState, rng: Rng): string | null {
  const you = playerArtist(state);
  if (!you?.partner) return "Need a partner.";
  if (you.relationship !== "dating" && you.relationship !== "engaged" && you.relationship !== "married") {
    return "Not that close yet.";
  }
  you.lastIntimacyWeek = state.week;
  you.partner.closeness = clamp(you.partner.closeness + 6, 0, 100);
  you.mood = clamp(you.mood + 8, 0, 100);
  const hetero = you.gender !== you.partner.gender;
  if (hetero && !you.pregnancy && (you.relationship === "married" || you.relationship === "dating")) {
    const chance = you.relationship === "married" ? 0.18 : 0.08;
    if (rng.next() < chance) {
      you.pregnancy = { weeksLeft: 16, via: "natural" };
      pushNotif(state, {
        tone: "viral",
        title: "Pregnant",
        body: `${you.partner.name} just stared at the test. Sixteen weeks on the clock.`,
      });
      return null;
    }
  }
  pushNotif(state, {
    tone: "good",
    title: "Night in",
    body: `${you.partner.name} stayed. Closeness ${Math.round(you.partner.closeness)}.`,
  });
  return null;
}

export function startSurrogate(state: GameState, plan?: PayPlan): string | null {
  const you = playerArtist(state);
  if (!you?.partner) return "Need a partner.";
  if (you.pregnancy) return "Already expecting.";
  const sameMale = you.gender === "male" && you.partner.gender === "male";
  if (!sameMale) return "Surrogacy desk is for male couples — adoption is on the other form.";
  const cost = 85_000;
  const paid = settleDue(state, cost, plan ?? cashPlan(cost), "Surrogate");
  if (paid) return paid;
  you.pregnancy = { weeksLeft: 16, via: "surrogate" };
  pushNotif(state, { tone: "good", title: "Surrogate retained", body: "Medical and legal are papered. Sixteen weeks." });
  return null;
}

export function startAdoption(state: GameState, rng: Rng, plan?: PayPlan): string | null {
  const you = playerArtist(state);
  if (!you?.partner) return "Need a partner.";
  if (you.pregnancy) return "Already in process.";
  const cost = 45_000;
  const paid = settleDue(state, cost, plan ?? cashPlan(cost), "Adoption agency");
  if (paid) return paid;
  you.pregnancy = { weeksLeft: 6, via: "adoption" };
  pushNotif(state, {
    tone: "good",
    title: "Agency filed",
    body: "Home study starts. A kid in about six weeks if the file holds.",
  });
  return null;
}

export function tickPregnancy(state: GameState, rng: Rng) {
  const you = playerArtist(state);
  if (!you?.pregnancy) return;
  you.pregnancy.weeksLeft -= 1;
  if (you.pregnancy.weeksLeft === 4) {
    pushNotif(state, {
      tone: "info",
      title: you.pregnancy.via === "adoption" ? "Home study wrapping" : "Third trimester",
      body: "Four weeks. The house gets quieter and louder at the same time.",
    });
  }
  if (you.pregnancy.weeksLeft > 0) return;
  const via = you.pregnancy.via;
  you.pregnancy = null;
  haveChild(state, rng, via);
}

export function haveChild(
  state: GameState,
  rng: Rng,
  via: "natural" | "surrogate" | "adoption",
  opts?: { name?: string; gender?: "girl" | "boy" },
) {
  const you = playerArtist(state);
  if (!you) return;
  const gender = opts?.gender ?? (rng.chance(0.5) ? "girl" : "boy");
  const name = (opts?.name ?? "").trim() || rng.pick([...KID_TRAITS.names[gender]]);
  const kid: Kid = {
    id: nid(state, "k"),
    name,
    gender,
    age: via === "adoption" ? rng.int(0, 3) : 0,
    bornWeek: state.week,
    personality: rng.pick([...KID_TRAITS.personality]),
    school: "none yet",
    schoolTrack: "public",
    interests: rng.pick([...KID_TRAITS.interests]),
    talent: rng.pick(TALENTS),
    custody: "joint",
    avatar: makeAvatar(rng),
    closeness: 78,
    stats: emptyStats(),
    lessons: { vocal: 0, dance: 0, theory: 0, instrument: 0 },
  };
  you.kids.push(kid);
  you.mood = clamp(you.mood + 12, 0, 100);
  if (you.partner) you.partner.closeness = clamp(you.partner.closeness + 10, 0, 100);
  unlockAchievement(state, "kid");
  pushNotif(state, {
    tone: "viral",
    title: via === "adoption" ? `Adopted ${kid.name}` : `${kid.name} arrived`,
    body: `${kid.gender}, ${kid.personality}, already into ${kid.interests}.`,
  });
}

export function setSchool(state: GameState, kidId: string, track: SchoolTrack, plan?: PayPlan): string | null {
  const you = playerArtist(state);
  const kid = you?.kids.find((k) => k.id === kidId);
  if (!kid) return "Which kid?";
  const school = SCHOOLS.find((s) => s.id === track);
  if (!school) return "Unknown track.";
  const yearly = school.yearly;
  if (yearly > 0) {
    const first = Math.round(yearly / 52) * 4;
    const paid = settleDue(state, first, plan ?? cashPlan(first), `${kid.name} · ${school.name}`);
    if (paid) return paid;
  }
  kid.schoolTrack = track;
  kid.school = school.name;
  kid.closeness = clamp(kid.closeness + 3, 0, 100);
  pushNotif(state, {
    tone: "info",
    title: `${kid.name} · ${school.name}`,
    body: yearly ? `$${yearly.toLocaleString("en-US")}/yr. First month hit checking.` : "Public. The bus still comes.",
  });
  return null;
}

export function giveLesson(state: GameState, kidId: string, lesson: (typeof LESSONS)[number]["id"], plan?: PayPlan): string | null {
  const you = playerArtist(state);
  const kid = you?.kids.find((k) => k.id === kidId);
  if (!kid) return "Which kid?";
  const L = LESSONS.find((x) => x.id === lesson);
  if (!L) return "Unknown lesson.";
  const paid = settleDue(state, L.cost, plan ?? cashPlan(L.cost), `${kid.name} · ${L.label}`);
  if (paid) return paid;
  kid.lessons[lesson] += 1;
  kid.stats[L.stat] = clamp(kid.stats[L.stat] + 3, 0, 99);
  kid.closeness = clamp(kid.closeness + 2, 0, 100);
  kid.talent = lesson === "vocal" ? "voice" : lesson === "dance" ? "dance" : lesson === "theory" ? "writing" : "production";
  pushNotif(state, {
    tone: "good",
    title: `${kid.name} · ${L.label}`,
    body: `${L.stat} ${Math.round(kid.stats[L.stat])}. The takeover gets less hypothetical.`,
  });
  return null;
}

export function hangWithKid(state: GameState, kidId: string): string | null {
  const you = playerArtist(state);
  const kid = you?.kids.find((k) => k.id === kidId);
  if (!kid) return "Which kid?";
  kid.closeness = clamp(kid.closeness + 6, 0, 100);
  you!.mood = clamp(you!.mood + 4, 0, 100);
  pushNotif(state, { tone: "good", title: `Afternoon with ${kid.name}`, body: `Closeness ${Math.round(kid.closeness)}.` });
  return null;
}

export function dateNight(state: GameState, plan?: PayPlan): string | null {
  const you = playerArtist(state);
  if (!you?.partner) return "No one to take out.";
  const cost = 2_400;
  const paid = settleDue(state, cost, plan ?? cashPlan(cost), `Date night · ${you.partner.name}`);
  if (paid) return paid;
  you.partner.closeness = clamp(you.partner.closeness + 8, 0, 100);
  you.mood = clamp(you.mood + 6, 0, 100);
  pushNotif(state, {
    tone: "good",
    title: `Date night · ${you.partner.name}`,
    body: `Closeness ${Math.round(you.partner.closeness)}.`,
  });
  return null;
}

export function tickKids(state: GameState, ledger?: WeekLedger) {
  const you = playerArtist(state);
  if (!you) return;
  ensureFamily(you);
  let tuition = 0;
  for (const k of you.kids) {
    const school = SCHOOLS.find((s) => s.id === k.schoolTrack);
    if (school) tuition += Math.round(school.yearly / 52);
    if (k.age >= 12 && k.closeness < 30) k.stats.workEthic = clamp(k.stats.workEthic - 0.2, 0, 99);
    if (k.schoolTrack === "arts") k.stats.vocals = clamp(k.stats.vocals + 0.08, 0, 99);
    if (k.schoolTrack === "prep") k.stats.writing = clamp(k.stats.writing + 0.06, 0, 99);
    if (k.schoolTrack === "tutor") {
      k.stats.vocals = clamp(k.stats.vocals + 0.05, 0, 99);
      k.stats.writing = clamp(k.stats.writing + 0.05, 0, 99);
      k.stats.production = clamp(k.stats.production + 0.04, 0, 99);
    }
  }
  if (tuition > 0) {
    state.cash -= tuition;
    if (ledger) ledger.living += tuition;
    else state.ledger.living += tuition;
  }
}

export function canRetireTo(kid: Kid) {
  return kid.age >= 16;
}

export function retireToKid(state: GameState, kidId: string): string | null {
  const you = playerArtist(state);
  const kid = you?.kids.find((k) => k.id === kidId);
  if (!you || !kid) return "No heir.";
  if (kid.age < 16) return `${kid.name} is ${kid.age}. Sixteen is the floor.`;
  you.aiControl = true;
  you.superstar = you.fame >= 70;
  const handle = kid.name.toLowerCase().replace(/[^a-z0-9]+/g, "").slice(0, 14) || "heir";
  const bio = `Child of ${you.name}. ${kid.personality}. Raised on ${kid.school}.`;
  const momCard: ParentCard = {
    role: you.gender === "female" ? "mom" : "dad",
    name: you.name,
    age: you.age,
    job: "artist",
    closeness: kid.closeness,
    avatar: you.avatar,
  };
  const dadCard: ParentCard = {
    role: you.gender === "female" ? "dad" : "mom",
    name: you.partner?.name ?? (you.gender === "female" ? you.parents.dad : you.parents.mom),
    age: you.partner?.age ?? you.age + 1,
    job: you.partner?.job ?? "civilian",
    closeness: kid.closeness,
    avatar: you.partner?.avatar ?? you.avatar,
  };
  const heir: Artist = {
    ...you,
    id: nid(state, "a"),
    name: kid.name,
    handle,
    age: Math.max(16, kid.age),
    bio,
    history: `Took the name after ${you.name} stepped back in year ${Math.floor((state.week - 1) / 52) + 1}.`,
    stats: { ...kid.stats },
    potential: clamp(55 + kid.lessons.vocal + kid.lessons.theory + kid.lessons.instrument, 55, 96),
    ability: Math.round((kid.stats.vocals + kid.stats.writing + kid.stats.performance) / 3),
    mood: 72,
    energy: 88,
    fame: clamp(you.fame * 0.18 + kid.closeness * 0.1, 4, 40),
    fans: 400,
    reputation: clamp(you.reputation * 0.4, 8, 50),
    popularity: clamp(you.popularity * 0.12, 2, 24),
    monthlyListeners: 0,
    weeklyStreamHistory: [0, 0, 0, 0],
    signed: false,
    labelId: null,
    royalty: 0.85,
    wage: 0,
    advance: 0,
    albumsRemaining: 3,
    signedWeek: null,
    avatar: kid.avatar,
    profiles: {
      tiktok: { handle, bio, avatar: { ...kid.avatar } },
      x: { handle, bio, avatar: { ...kid.avatar } },
      instagram: { handle, bio, avatar: { ...kid.avatar } },
      youtube: { handle, bio, avatar: { ...kid.avatar } },
      spotify: { handle, bio, avatar: { ...kid.avatar } },
    },
    verified: { tiktok: false, x: false, instagram: false, youtube: false, spotify: false },
    coaching: { vocal: 0, dance: 0, general: 0, band: 0 },
    relationship: "single",
    partner: null,
    kids: [],
    parents: {
      mom: momCard.role === "mom" ? momCard.name : dadCard.name,
      dad: momCard.role === "dad" ? momCard.name : dadCard.name,
      closeness: kid.closeness,
      cards: [momCard.role === "mom" ? momCard : dadCard, momCard.role === "dad" ? momCard : dadCard],
    },
    gender: kid.gender === "girl" ? "female" : "male",
    orientation: "straight",
    pregnancy: null,
    lastIntimacyWeek: 0,
    aiControl: false,
    onHoliday: false,
    holidayWeeks: 0,
    hiatus: false,
    real: false,
    superstar: false,
    wikiViews: 0,
    vocalHealth: 90,
    mental: 78,
    addiction: { alcohol: 0, pills: 0, smoke: 0 },
    rehabWeeks: 0,
    incarceratedWeeks: 0,
    streetCred: 12,
    tiktokPostsThisWeek: 0,
    xPostsThisWeek: 0,
    gramPostsThisWeek: 0,
    lastTikTokWeek: 0,
    followingX: 80,
  };
  heir.ability = Math.round((heir.stats.vocals + heir.stats.writing + heir.stats.performance) / 3);
  state.artists.unshift(heir);
  state.playerArtistId = heir.id;
  state.dealKind = "independent";
  state.labelName = "Independent";
  pushNotif(state, {
    tone: "viral",
    title: `${kid.name} takes the name`,
    body: `${you.name} stepped back. The catalog still streams. The kid has the lessons.`,
  });
  unlockAchievement(state, "legacy");
  return null;
}

export function buyLand(state: GameState, id: string, plan?: PayPlan): string | null {
  const you = playerArtist(state) ?? state.artists[0];
  const lot = LAND.find((l) => l.id === id);
  if (!lot) return "Lot gone.";
  if (state.lands.some((l) => l.catalogId === id)) return "Already owned.";
  if ((you?.fame ?? 0) < lot.fameNeed) return `Fame ${lot.fameNeed}.`;
  const paid = settleDue(state, lot.price, plan ?? cashPlan(lot.price), lot.name);
  if (paid) return paid;
  state.lands.push({
    catalogId: lot.id,
    name: lot.name,
    city: lot.city,
    value: lot.price,
    weekBought: state.week,
    studioWing: false,
    garage: false,
    theater: false,
    wall: false,
  });
  pushNotif(state, { tone: "good", title: lot.name, body: "Dirt. Now you build." });
  return null;
}

export function addBuild(state: GameState, landId: string, opt: (typeof BUILD_OPTS)[number]["id"], plan?: PayPlan): string | null {
  const job = state.lands.find((l) => l.catalogId === landId);
  if (!job) return "Buy the dirt first.";
  const spec = BUILD_OPTS.find((b) => b.id === opt);
  if (!spec) return "Unknown wing.";
  if (opt === "studio" ? job.studioWing : job[opt]) return "Already built.";
  const paid = settleDue(state, spec.cost, plan ?? cashPlan(spec.cost), spec.name);
  if (paid) return paid;
  if (opt === "studio") job.studioWing = true;
  if (opt === "garage") job.garage = true;
  if (opt === "theater") job.theater = true;
  if (opt === "wall") job.wall = true;
  job.value += spec.cost;
  if (opt === "studio") state.studioTier = Math.max(state.studioTier, 2);
  pushNotif(state, { tone: "good", title: spec.name, body: `On the ${job.name} plot.` });
  return null;
}

export function buyIsland(state: GameState, id: string, plan?: PayPlan): string | null {
  const you = playerArtist(state);
  const isle = ISLANDS.find((i) => i.id === id);
  if (!isle) return "Mapped wrong.";
  if (state.islands.some((i) => i.catalogId === id)) return "Already yours.";
  if ((you?.fame ?? 0) < isle.fameNeed) return `Fame ${isle.fameNeed}.`;
  const paid = settleDue(state, isle.price, plan ?? cashPlan(isle.price), isle.name);
  if (paid) return paid;
  state.islands.push({ catalogId: isle.id, name: isle.name, value: isle.price, weekBought: state.week, weekly: isle.weekly });
  unlockAchievement(state, "island");
  pushNotif(state, { tone: "viral", title: isle.name, body: "Landing strip, villa, dock. No press boat." });
  return null;
}

export function takeVacation(state: GameState, id: string, plan?: PayPlan): string | null {
  const you = playerArtist(state);
  if (!you) return "Artist career.";
  const v = VACATIONS.find((x) => x.id === id);
  if (!v) return "Not a destination.";
  const paid = settleDue(state, v.cost, plan ?? cashPlan(v.cost), v.name);
  if (paid) return paid;
  you.mood = clamp(you.mood + v.mood, 0, 100);
  you.onHoliday = true;
  you.holidayWeeks = Math.max(you.holidayWeeks, 1);
  if (you.partner) you.partner.closeness = clamp(you.partner.closeness + 8, 0, 100);
  for (const k of you.kids) k.closeness = clamp(k.closeness + 5, 0, 100);
  pushNotif(state, { tone: "good", title: v.name, body: `Family in ${v.city}. Phones on do not disturb.` });
  return null;
}

export function hireJetCrew(state: GameState, pilots: number, attendants: number): string | null {
  if (!state.jets.length) return "Buy a jet first.";
  state.jetCrew = { pilots: Math.max(0, Math.min(4, pilots)), attendants: Math.max(0, Math.min(8, attendants)) };
  pushNotif(state, {
    tone: "info",
    title: "Flight dept",
    body: `${state.jetCrew.pilots} pilots · ${state.jetCrew.attendants} attendants · $${(state.jetCrew.pilots * 4_000 + state.jetCrew.attendants * 2_200).toLocaleString("en-US")}/wk.`,
  });
  return null;
}

export function bookGig(state: GameState, gigId: string): string | null {
  const g = state.gigs.find((x) => x.id === gigId);
  if (!g || g.status !== "open") return "Offer gone.";
  const you = playerArtist(state);
  if (you && you.fame < g.fameNeed) return `Fame ${g.fameNeed}.`;
  g.status = "booked";
  state.cash += g.fee;
  state.ledger.shows += g.fee;
  pushNotif(state, { tone: "good", title: g.name, body: `${g.city} · $${g.fee.toLocaleString("en-US")} hits checking.` });
  return null;
}

export function tickGigs(state: GameState, rng: Rng) {
  for (const g of state.gigs) {
    if (g.status === "open" && state.week - g.week > 3) g.status = "expired";
    if (g.status === "booked") g.status = "done";
  }
  const you = playerArtist(state);
  if (!you || rng.next() > 0.45) return;
  const kind = rng.pick([...GIG_KINDS]);
  if (you.fame < kind.fameNeed - 8) return;
  const fee = Math.round(kind.base * (1 + you.popularity / 70) * (1 + you.fame / 90) * (0.85 + rng.next() * 0.4));
  state.gigs.unshift({
    id: nid(state, "gig"),
    name: kind.name,
    city: rng.pick(["Miami", "Las Vegas", "Dubai", "London", "Atlanta", "Los Angeles", "Ibiza"]),
    kind: kind.kind,
    fee,
    fameNeed: kind.fameNeed,
    week: state.week,
    status: "open",
  });
  state.gigs = state.gigs.slice(0, 12);
  pushNotif(state, {
    tone: "info",
    title: `Gig offer · ${kind.name}`,
    body: `$${fee.toLocaleString("en-US")} if you take it this week.`,
  });
}

export function orderBottle(state: GameState, id: string, plan?: PayPlan): string | null {
  const you = playerArtist(state);
  if (!you) return "Artist career.";
  const b = BOTTLES.find((x) => x.id === id);
  if (!b) return "Not on the list.";
  if (you.fame < b.fameNeed) return `Fame ${b.fameNeed} to even see the list.`;
  const paid = settleDue(state, b.cost, plan ?? cashPlan(b.cost), b.name);
  if (paid) return paid;
  you.mood = clamp(you.mood + b.mood, 0, 100);
  you.energy = clamp(you.energy - 10, 0, 100);
  you.addiction.alcohol = clamp(you.addiction.alcohol + 8, 0, 100);
  you.fame = clamp(you.fame + 0.8, 0, 100);
  state.ledger.nightlife += b.cost;
  state.lastNightlifeWeek = state.week;
  pushNotif(state, { tone: "good", title: b.name, body: "The table photographed itself." });
  return null;
}

export function openSuitors(you: Artist) {
  return SUITORS.filter((s) => matchesOrientation(you, suitorGender(s.id)));
}

export function fulfillFamily(state: GameState, draft: CheckoutDraft, plan: PayPlan, rng: Rng): string | null {
  switch (draft.kind) {
    case "land":
      return buyLand(state, draft.id, plan);
    case "island":
      return buyIsland(state, draft.id, plan);
    case "vacation":
      return takeVacation(state, draft.id, plan);
    case "build":
      return addBuild(state, draft.id, draft.extra?.buildOpt ?? "studio", plan);
    case "lesson":
      return giveLesson(state, draft.extra?.kidId ?? "", draft.extra?.lesson ?? "vocal", plan);
    case "school":
      return setSchool(state, draft.extra?.kidId ?? "", draft.extra?.track ?? "public", plan);
    case "parent":
      return parentAct(state, draft.extra?.parentRole ?? "mom", draft.extra?.parentAct ?? "call", plan);
    case "date-night":
      return dateNight(state, plan);
    case "conceive":
      return intimacy(state, rng);
    case "adopt":
      return draft.id === "surrogate" ? startSurrogate(state, plan) : startAdoption(state, rng, plan);
    case "gig":
      return bookGig(state, draft.id);
    case "crew":
      return hireJetCrew(state, Number(draft.extra?.n ?? 1), Number(draft.extra?.gain ?? 1));
    case "bottle":
      return orderBottle(state, draft.id, plan);
    default:
      return "Unknown family desk.";
  }
}
