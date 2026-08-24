import {
  CITIES,
  CITY_TO_REGION,
  COMMENTS,
  FORMATS,
  GENRES,
  HANDCRAFTED,
  HASHTAGS,
  NPC_CREATORS,
  RIVAL_LABELS,
  X_TEMPLATES,
  captionFor,
  generateArtist,
  makeAvatar,
  songTitle,
} from "./catalog";
import { handleize } from "./format";
import { isControlled, nid, playerArtist, pushNotif, rosterOf, syncPopularity, unlockAchievement } from "./core";
import {
  albumWeekUnits,
  barsBlock,
  buyJet,
  buyJewelry,
  ensureHealth,
  ensureLifeState,
  enterRehab,
  featureFeeForGuest,
  featureQuote,
  goOut,
  hireLawyer,
  hot100Points,
  isStreamingTrack,
  paintRegionalWeek,
  postBail,
  privateDay,
  pushMail,
  refreshHollywood,
  seedFilms,
  sendGift,
  tickLife,
  useSubstance,
  weekHotPoints,
  weekPlays,
} from "./life";
import {
  ensureFamily,
  fulfillFamily,
  haveChild,
  matchesOrientation,
  tickGigs,
  tickKids,
  tickPregnancy,
} from "./family";
import { clamp, mulberry32, type Rng } from "./rng";
import type {
  Album,
  Artist,
  CheckoutDraft,
  CeremonyCat,
  CeremonyNom,
  ClipFormat,
  DatabaseId,
  Followers,
  GameState,
  GenderId,
  GenreId,
  InboxItem,
  LabelDeal,
  Notif,
  OrientationId,
  PayPlan,
  PlatformProfile,
  RegionId,
  RegionalRep,
  ReleaseFormat,
  SocialPlatform,
  Song,
  Sound,
  SubstanceId,
  TikTokClip,
  TikTokRollout,
  TikTokStage,
  Trend,
  WeekLedger,
  XAlert,
  XMessage,
} from "./types";
import { CHART_SIZE, REGIONS, SAVE_VERSION, VERIFY_AT } from "./types";
import {
  ACHIEVEMENTS,
  AWARDS,
  AWARD_CALENDAR,
  BANKS,
  CARS,
  FESTIVALS,
  HOUSES,
  REAL_ARTISTS,
  SUPERSTAR_FICTIONAL,
  SUITORS,
  VENUES,
  aprForScore,
  suitorGender,
} from "./world";
import {
  autoQuote,
  cardLimitForScore,
  cashPlan,
  describePay,
  issueStarterCard,
  mortgageQuote,
  originateLoan,
  personalLoanMax,
  pushStatement,
  settleDue,
} from "./finance";

export { isControlled, nid, playerArtist, rosterOf, syncPopularity, unlockAchievement };
export { featureQuote, popTier, unreadMail, weekPlays, weekHotPoints, albumWeekSales, isStreamingTrack } from "./life";

const STREAM_RATE = 0.0042;
const EMPTY_REGIONS = (): Record<RegionId, { streams: number; digital: number; physical: number; radio: number }> => {
  const o = {} as Record<RegionId, { streams: number; digital: number; physical: number; radio: number }>;
  for (const r of REGIONS) o[r.id] = { streams: 0, digital: 0, physical: 0, radio: 0 };
  return o;
};

const EMPTY_REP = (): RegionalRep => {
  const o = {} as RegionalRep;
  for (const r of REGIONS) o[r.id] = 8;
  return o;
};

export function emptyLedger(): WeekLedger {
  return {
    streams: 0,
    chartBonus: 0,
    radio: 0,
    shows: 0,
    merch: 0,
    other: 0,
    royalties: 0,
    payroll: 0,
    promo: 0,
    studio: 0,
    living: 0,
    housing: 0,
    cars: 0,
    security: 0,
    interest: 0,
    nightlife: 0,
    legal: 0,
    luxury: 0,
    net: 0,
    gross: 0,
  };
}

function blankVerified() {
  return { tiktok: false, x: false, instagram: false, youtube: false, spotify: false };
}

export function playerSongs(state: GameState) {
  const ids = new Set(rosterOf(state).map((a) => a.id));
  return state.songs.filter((s) => ids.has(s.artistId));
}

export function unsignedProspects(state: GameState) {
  return state.artists.filter((a) => !a.signed && a.id !== state.playerArtistId && !a.superstar && !a.real);
}

export function fypClips(state: GameState) {
  return [...state.clips].sort((a, b) => b.viewsWeek + b.views * 0.02 - (a.viewsWeek + a.views * 0.02));
}

export function fourWeekStreams(artist: Artist) {
  const h = artist.weeklyStreamHistory;
  return h.slice(-4).reduce((n, x) => n + x, 0);
}

/** Spotify monthly listeners === last 4 weeks of streams. Never a phantom number. */
export function syncMonthly(artist: Artist) {
  artist.monthlyListeners = Math.max(0, Math.round(fourWeekStreams(artist)));
}

export function growFollowers(artist: Artist, platform: keyof Followers, amount: number, min = 1) {
  if (amount <= 0) return 0;
  const n = Math.max(min, Math.round(amount));
  artist.followers[platform] += n;
  return n;
}

function pushAlert(state: GameState, a: Omit<XAlert, "id" | "week">) {
  state.xAlerts.unshift({ id: nid(state, "al"), week: state.week, ...a });
  state.xAlerts = state.xAlerts.slice(0, 40);
}

export function applyVerification(state: GameState, artist: Artist, announce = true) {
  // Player must apply after hitting the threshold. NPCs auto-verify.
  if (isControlled(state, artist)) return;
  grantVerify(state, artist, announce);
}

function grantVerify(state: GameState, artist: Artist, announce: boolean) {
  const v = artist.verified;
  const controlled = announce && isControlled(state, artist);
  if (!v.tiktok && artist.followers.tiktok >= VERIFY_AT.tiktok) {
    v.tiktok = true;
    if (controlled) {
      pushNotif(state, {
        tone: "good",
        title: `${artist.name} verified on TikTok`,
        body: "Application approved. 100,000 followers. The badge is live.",
      });
      unlockAchievement(state, "verified-tt");
    }
  }
  if (!v.x && artist.followers.x >= VERIFY_AT.x) {
    v.x = true;
    if (controlled) {
      pushNotif(state, { tone: "good", title: `${artist.name} verified on X`, body: "Blue check. Application cleared." });
      pushAlert(state, { kind: "verify", handle: "x", text: `@${artist.handle} is verified on X.` });
    }
  }
  if (!v.instagram && artist.followers.instagram >= VERIFY_AT.instagram) {
    v.instagram = true;
    if (controlled) {
      pushNotif(state, { tone: "good", title: `${artist.name} verified on Instagram`, body: "The grid got a checkmark." });
    }
  }
  if (!v.youtube && artist.followers.youtube >= VERIFY_AT.youtube) {
    v.youtube = true;
    if (controlled) {
      pushNotif(state, { tone: "good", title: `${artist.name} verified on YouTube`, body: "100k subscribers. Badge on." });
    }
  }
  if (!v.spotify && artist.monthlyListeners >= VERIFY_AT.spotify) {
    v.spotify = true;
    if (controlled) {
      pushNotif(state, {
        tone: "good",
        title: `${artist.name} verified on Spotify`,
        body: "50,000 monthly listeners over four weeks. Official artist channel unlocked.",
      });
      unlockAchievement(state, "spotify-50k");
    }
  }
  if (v.tiktok && v.x && v.instagram && v.youtube && v.spotify) unlockAchievement(state, "verified-all");
}

export function platformReach(artist: Artist, platform: SocialPlatform) {
  return platform === "spotify" ? artist.monthlyListeners : artist.followers[platform];
}

export function applyForVerify(state: GameState, artistId: string, platform: SocialPlatform): string | null {
  const artist = state.artists.find((a) => a.id === artistId);
  if (!artist || !isControlled(state, artist)) return "Not your account.";
  if (artist.verified[platform]) return "Already verified.";
  const need = VERIFY_AT[platform];
  const have = platformReach(artist, platform);
  if (have < need) {
    return platform === "spotify"
      ? `Need ${need.toLocaleString("en-US")} monthly listeners (last 4 weeks).`
      : `Need ${need.toLocaleString("en-US")} followers first.`;
  }
  artist.verified[platform] = true;
  grantVerify(state, artist, true);
  // grantVerify skips already-true flags; force the player announcements
  if (platform === "tiktok") unlockAchievement(state, "verified-tt");
  if (platform === "spotify") unlockAchievement(state, "spotify-50k");
  const label = platform === "x" ? "X" : platform === "tiktok" ? "TikTok" : platform === "instagram" ? "Instagram" : platform === "youtube" ? "YouTube" : "Spotify";
  pushNotif(state, {
    tone: "good",
    title: `Verified on ${label}`,
    body: "You applied. They approved. The mark is on the profile.",
  });
  if (artist.verified.tiktok && artist.verified.x && artist.verified.instagram && artist.verified.youtube && artist.verified.spotify) {
    unlockAchievement(state, "verified-all");
  }
  return null;
}

export function blankProfiles(handle: string, bio: string, avatar: Artist["avatar"]): Record<SocialPlatform, PlatformProfile> {
  const one = (): PlatformProfile => ({ handle, bio, avatar: { ...avatar } });
  return { tiktok: one(), x: one(), instagram: one(), youtube: one(), spotify: one() };
}

export function splitLegalName(name: string): { first: string; last: string } {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return { first: "Jayden", last: "Carter" };
  if (parts.length === 1) return { first: parts[0], last: "" };
  return { first: parts[0], last: parts.slice(1).join(" ") };
}

export function legalNameOf(artist: Artist): string {
  const full = `${artist.legalFirst ?? ""} ${artist.legalLast ?? ""}`.trim();
  return full || artist.name;
}

export function ensureArtistExtras(artist: Artist) {
  if (!artist.profiles) artist.profiles = blankProfiles(artist.handle, artist.bio, artist.avatar);
  if (typeof artist.popularity !== "number") artist.popularity = 0;
  if (typeof artist.wikiViews !== "number") artist.wikiViews = 0;
  for (const p of ["tiktok", "x", "instagram", "youtube", "spotify"] as const) {
    if (!artist.profiles[p]) artist.profiles[p] = { handle: artist.handle, bio: artist.bio, avatar: { ...artist.avatar } };
  }
  if (!artist.legalFirst) {
    const split = splitLegalName(artist.name);
    artist.legalFirst = split.first;
    artist.legalLast = artist.legalLast ?? split.last;
  }
  if (artist.legalLast === undefined) artist.legalLast = "";
  ensureHealth(artist);
  ensureFamily(artist);
}

export function profileOf(artist: Artist, platform: SocialPlatform): PlatformProfile {
  ensureArtistExtras(artist);
  return artist.profiles[platform];
}

export function featureFeeFor(guest: Artist, state?: GameState | null) {
  return featureFeeForGuest(guest, state);
}

export function featureSplitFor(guest: Artist) {
  syncPopularity(guest);
  return clamp(0.14 + guest.popularity / 380, 0.12, 0.4);
}

export function featName(state: GameState, song: Song): string | null {
  if (!song.collabArtistId) return null;
  return state.artists.find((a) => a.id === song.collabArtistId)?.name ?? null;
}

export function creditLine(state: GameState, song: Song) {
  const a = state.artists.find((x) => x.id === song.artistId)?.name ?? "Unknown";
  const g = featName(state, song);
  return g ? `${a} feat. ${g}` : a;
}

export function venueDraw(artist: Artist, capacity: number) {
  const pop = Number(artist.popularity) || 0;
  const fame = Number(artist.fame) || 0;
  const fans = Number(artist.fans) || 0;
  const monthly = Number(artist.monthlyListeners) || 0;
  const social =
    (artist.followers?.tiktok ?? 0) + (artist.followers?.instagram ?? 0) + (artist.followers?.x ?? 0);
  const demand = Math.round(90 + fans * 0.32 + monthly * 0.045 + pop * 38 + fame * 22 + social * 0.09);
  const attendance = Math.max(12, Math.min(capacity, demand));
  const fill = attendance / Math.max(1, capacity);
  const canFill = fill >= 0.7;
  const note = fill >= 0.98 ? "Sold out" : canFill ? "Can fill" : fill >= 0.4 ? "Half room" : "Won't fill";
  return { attendance, fill, canFill, note };
}

export function editPlatformProfile(
  state: GameState,
  artistId: string,
  platform: SocialPlatform,
  patch: { handle?: string; bio?: string; avatar?: Artist["avatar"] },
): string | null {
  const artist = state.artists.find((a) => a.id === artistId);
  if (!artist || !isControlled(state, artist)) return "Not your profile.";
  ensureArtistExtras(artist);
  const p = artist.profiles[platform];
  if (patch.handle) p.handle = handleize(patch.handle) || p.handle;
  if (patch.bio !== undefined) p.bio = patch.bio.slice(0, 160);
  if (patch.avatar) {
    p.avatar = { ...patch.avatar };
    if (patch.avatar.photo) artist.avatar.photo = patch.avatar.photo;
  }
  if (platform === "x" || platform === "tiktok") artist.handle = p.handle;
  return null;
}

function qualityOf(s: { writing: number; production: number; hook: number; mix: number }) {
  return Math.round(s.writing * 0.28 + s.production * 0.22 + s.hook * 0.32 + s.mix * 0.18);
}

function makeSound(state: GameState, name: string, artistName: string, songId: string | null): Sound {
  return {
    id: nid(state, "snd"),
    name,
    songId,
    artistName,
    uses: 0,
    trending: false,
    trendRank: null,
    week: state.week,
  };
}

function fromSeed(state: GameState, seed: ReturnType<typeof generateArtist>, extra: Partial<Artist> = {}): Artist {
  const legal = splitLegalName(seed.name);
  const artist: Artist = {
    id: nid(state, "a"),
    name: seed.name,
    handle: seed.handle,
    legalFirst: seed.kind === "band" ? seed.name : legal.first,
    legalLast: seed.kind === "band" ? "" : legal.last,
    genre: seed.genre,
    kind: seed.kind,
    age: seed.age,
    nationality: seed.nationality,
    hometown: seed.hometown,
    bio: seed.bio,
    history: seed.bio,
    stats: seed.stats,
    potential: seed.potential,
    ability: Math.round((seed.stats.vocals + seed.stats.writing + seed.stats.performance) / 3),
    mood: 70,
    energy: 80,
    fame: seed.fame,
    fans: seed.fans,
    reputation: seed.fame,
    regionalRep: EMPTY_REP(),
    followers: { ...seed.followers },
    monthlyListeners: 0,
    weeklyStreamHistory: [0, 0, 0, 0],
    signed: false,
    labelId: null,
    royalty: 0.22,
    wage: 0,
    advance: 0,
    albumsRemaining: 3,
    signedWeek: null,
    avatar: seed.avatar,
    tiktokPostsThisWeek: 0,
    xPostsThisWeek: 0,
    gramPostsThisWeek: 0,
    lastTikTokWeek: 0,
    verified: blankVerified(),
    followingX: 80 + Math.round(seed.fame * 12),
    relationship: "single",
    partner: null,
    kids: [],
    parents: { mom: "Mom", dad: "Dad", closeness: 70, cards: [] },
    gender: extra.gender ?? "female",
    orientation: extra.orientation ?? "straight",
    pregnancy: null,
    lastIntimacyWeek: 0,
    aiControl: false,
    onHoliday: false,
    holidayWeeks: 0,
    hiatus: false,
    coaching: { vocal: 0, dance: 0, general: 0, band: 0 },
    real: false,
    superstar: false,
    popularity: 0,
    profiles: blankProfiles(seed.handle, seed.bio, seed.avatar),
    wikiViews: 0,
    vocalHealth: 88,
    mental: 74,
    addiction: { alcohol: 0, pills: 0, smoke: 0 },
    rehabWeeks: 0,
    incarceratedWeeks: 0,
    streetCred: extra.superstar || extra.real ? 40 : 8,
    ...extra,
  };
  if (!artist.profiles) artist.profiles = blankProfiles(artist.handle, artist.bio, artist.avatar);
  ensureFamily(artist, mulberry32(state.seed + state.idSeq * 17 + artist.age));
  const homeRegion = CITY_TO_REGION[artist.hometown] ?? "northamerica";
  artist.regionalRep[homeRegion] = Math.min(90, 20 + artist.fame);
  syncPopularity(artist);
  applyVerification(state, artist, false);
  return artist;
}

function writeSong(state: GameState, rng: Rng, artist: Artist, npc = false): Song {
  const studio = 48 + state.studioTier * 14;
  const writing = clamp(Math.round(artist.stats.writing * 0.7 + artist.potential * 0.15 + rng.gauss(0, 8)), 30, 99);
  const hook = clamp(
    Math.round(artist.stats.writing * 0.35 + artist.stats.charisma * 0.25 + artist.potential * 0.2 + rng.gauss(0, 8)),
    28,
    99,
  );
  const production = clamp(Math.round(studio * 0.55 + artist.stats.workEthic * 0.25 + rng.gauss(0, 7)), 30, 99);
  const mix = clamp(Math.round(studio * 0.6 + rng.gauss(0, 6)), 30, 99);
  const s: Song = {
    id: nid(state, "s"),
    artistId: artist.id,
    title: songTitle(rng),
    genre: artist.genre,
    writing,
    production,
    hook,
    mix,
    quality: 0,
    status: npc ? "released" : "writing",
    kind: "single",
    weeksLeft: npc ? 0 : 1,
    releasedWeek: null,
    streams: 0,
    streamsWeek: 0,
    streamsPending: 0,
    weekHistory: [],
    sales: 0,
    salesPhysical: 0,
    salesDigital: 0,
    peakChart: null,
    chart: null,
    albumChart: null,
    peakAlbum: null,
    radioWeeks: 0,
    radioPower: 0,
    radioChart: null,
    peakRadio: null,
    playlist: false,
    soundId: null,
    weekPayout: 0,
    promoHeat: 0,
    lastPromoWeek: 0,
    videoHeat: 0,
    tiktokHeat: 0,
    regional: EMPTY_REGIONS(),
    awards: [],
    cover: rng.int(0, 8),
    collabArtistId: null,
    featureFee: 0,
    featureSplit: 0,
    releaseFormat: "both" as ReleaseFormat,
    bside: false,
    salesDigitalWeek: 0,
    salesPhysicalWeek: 0,
    chartPoints: 0,
    albumUnits: 0,
    ost: false,
    albumId: null,
    regionalWeek: EMPTY_REGIONS(),
  };
  s.quality = qualityOf(s);
  return s;
}

export type NewGameInput = {
  career: "label" | "artist";
  labelName?: string;
  name?: string;
  legalFirst?: string;
  legalLast?: string;
  genre?: GenreId;
  city: string;
  handle?: string;
  age?: number;
  database?: DatabaseId;
  gender?: GenderId;
  orientation?: OrientationId;
};

function defaultSettings(database: DatabaseId): GameState["settings"] {
  return {
    autosave: true,
    database,
    difficulty: "normal",
    reduceMotion: false,
    showAwards: true,
    donationPrompted: false,
  };
}

function blankState(seed: number, city: string, career: GameState["career"], database: DatabaseId): GameState {
  return {
    version: SAVE_VERSION,
    seed,
    week: 1,
    cash: career === "label" ? 185_000 : 16_500,
    career,
    labelName: career === "label" ? "Harbor Records" : "Independent",
    labelRep: career === "label" ? 12 : 4,
    labelOwnedPct: career === "label" ? 100 : 0,
    city: city || "Los Angeles",
    studioTier: 1,
    playerArtistId: null,
    dealKind: career === "label" ? "label" : "independent",
    artists: [],
    songs: [],
    albums: [],
    clips: [],
    sounds: [],
    xPosts: [],
    gram: [],
    videos: [],
    xAlerts: [],
    xMessages: [],
    deals: [],
    trends: [],
    notifs: [],
    inbox: [],
    rivals: RIVAL_LABELS.map((name, i) => ({ id: `riv_${i}`, name })),
    ledger: emptyLedger(),
    idSeq: 1,
    tutorial: 1,
    lastRollout: null,
    creditScore: career === "label" ? 690 : 628,
    loans: [],
    cards: [],
    houses: [],
    cars: [],
    merch: [
      { id: "m_tee", name: "Logo tee", kind: "tee", price: 35, cost: 8, stock: 40, sold: 0, autoStock: true },
      { id: "m_hat", name: "Tour hat", kind: "hat", price: 28, cost: 6, stock: 20, sold: 0, autoStock: false },
    ],
    merchSiteLive: false,
    merchVisitsWeek: 0,
    tours: [],
    awards: [],
    campaigns: [],
    fanEvents: [],
    achievements: [],
    securityGuards: 0,
    facilities: { studio: false, manufacturing: false, distribution: false },
    investors: [],
    sponsors: [],
    ceoSalary: career === "label" ? 2_200 : 0,
    settings: defaultSettings(database),
    liveViewers: { tiktok: 0, x: 0, instagram: 0, youtube: 0 },
    lastLiveWeek: 0,
    songMarket: [],
    pendingAudition: null,
    eurovision: null,
    talentShow: { stage: "none", week: 0 },
    features: [],
    mail: [],
    films: [],
    legal: [],
    savings: career === "label" ? 12_000 : 800,
    savingsApr: 4.35,
    blackCard: false,
    jets: [],
    jewelry: [],
    buses: [],
    entourage: { driver: false, chef: false, paparazzi: false },
    lastNightlifeWeek: 0,
    luxuryLog: [],
    statements: [],
    cardAutopay: false,
    ceremony: null,
    gigs: [],
    lands: [],
    islands: [],
    jetCrew: { pilots: 0, attendants: 0 },
    lastParentWeek: 0,
    updateVersion: "2026.8.24",
  };
}

function seedHit(
  state: GameState,
  rng: Rng,
  artist: Artist,
  title: string,
  weekly: number,
  lifetime: number,
  ageWeeks: number,
  kind: Song["kind"] = "single",
) {
  const song = writeSong(state, rng, artist, true);
  song.title = title;
  song.kind = kind;
  song.status = "released";
  song.releasedWeek = 1 - ageWeeks;
  song.streams = lifetime;
  song.streamsWeek = weekly;
  song.weekHistory = [
    Math.round(weekly * 1.18),
    Math.round(weekly * 1.08),
    Math.round(weekly * 1.02),
    weekly,
  ];
  song.sales = Math.round(lifetime * 0.002);
  song.salesDigital = Math.round(lifetime * 0.0012);
  song.salesPhysical = Math.round(lifetime * (kind === "album" ? 0.0008 : 0.00015));
  song.radioPower = clamp(40 + artist.fame * 0.4, 20, 99);
  song.radioWeeks = rng.int(2, 8);
  song.playlist = true;
  song.promoHeat = 55 + artist.fame * 0.3;
  song.lastPromoWeek = state.week;
  song.quality = clamp(70 + Math.round(artist.fame / 8), 60, 99);
  song.salesDigitalWeek = Math.round(weekly * 0.001);
  song.salesPhysicalWeek = Math.round(weekly * (kind === "album" ? 0.0004 : 0.00005));
  paintRegionalWeek(state, song, weekly, song.salesDigitalWeek, song.salesPhysicalWeek, Math.round(song.radioPower * 4), false);
  const mix = song.regionalWeek;
  for (const r of REGIONS) {
    const w = weekly > 0 ? (mix[r.id]?.streams ?? 0) / weekly : 0;
    song.regional[r.id].streams = Math.round(lifetime * w);
    song.regional[r.id].digital = Math.round(song.salesDigital * w);
    song.regional[r.id].physical = Math.round(song.salesPhysical * w);
    song.regional[r.id].radio = Math.round((mix[r.id]?.radio ?? 0) * 12);
  }
  const sound = makeSound(state, song.title, artist.name, song.id);
  sound.uses = Math.round(weekly * 0.04);
  song.soundId = sound.id;
  state.sounds.push(sound);
  state.songs.push(song);
  const clip = ownedStyleClip(state, rng, artist, song, sound, false);
  clip.owned = false;
  clip.views = Math.round(weekly * (1.8 + rng.next()));
  clip.viewsWeek = Math.round(clip.views * 0.12);
  clip.likes = Math.round(clip.views * 0.08);
  state.clips.push(clip);
  return song;
}

function attachAlbum(
  state: GameState,
  artist: Artist,
  title: string,
  kind: Album["kind"],
  tracks: Song[],
  format: ReleaseFormat,
): Album {
  const streamsWeek = tracks.reduce((n, s) => n + (s.streamsWeek || 0), 0);
  const streams = tracks.reduce((n, s) => n + (s.streams || 0), 0);
  const album: Album = {
    id: nid(state, "lp"),
    artistId: artist.id,
    title,
    kind,
    songIds: tracks.map((t) => t.id),
    status: "released",
    releasedWeek: tracks.reduce((n, s) => Math.min(n, s.releasedWeek ?? state.week), state.week),
    streams,
    streamsWeek,
    salesDigitalWeek: Math.round(streamsWeek * 0.00035 + tracks.length * 12),
    salesPhysicalWeek: Math.round(streamsWeek * 0.00005 * Math.sqrt(tracks.length)),
    salesDigital: Math.round(streams * 0.0004),
    salesPhysical: Math.round(streams * 0.00008),
    albumUnits: 0,
    chart: null,
    peakChart: null,
    cover: tracks[0]?.cover ?? 0,
    producer: "In-house",
    execProducer: artist.signed ? (state.rivals.find((r) => r.id === artist.labelId)?.name ?? state.labelName) : "Independent",
    releaseFormat: format,
  };
  album.albumUnits = albumWeekUnits(album, tracks);
  for (const t of tracks) t.albumId = album.id;
  state.albums.push(album);
  return album;
}

function seedStarAlbum(state: GameState, rng: Rng, artist: Artist, hitTitle: string, weekly: number, lifetime: number) {
  const hit = state.songs.find((s) => s.artistId === artist.id && s.title === hitTitle);
  const tracks: Song[] = hit ? [hit] : [];
  const extra = rng.int(6, 10);
  for (let i = 0; i < extra; i++) {
    const w = Math.round(weekly * (0.08 + rng.next() * 0.22));
    const life = Math.round(lifetime * (0.05 + rng.next() * 0.18));
    tracks.push(seedHit(state, rng, artist, songTitle(rng), w, life, rng.int(2, 18), "single"));
  }
  while (tracks.length < 6) {
    tracks.push(seedHit(state, rng, artist, songTitle(rng), Math.round(weekly * 0.1), Math.round(lifetime * 0.08), rng.int(4, 20), "single"));
  }
  attachAlbum(state, artist, songTitle(rng), "album", tracks.slice(0, 12), "both");
}

function announceCollab(state: GameState, rng: Rng, song: Song) {
  const host = state.artists.find((a) => a.id === song.artistId);
  const guest = featName(state, song);
  if (!host || !guest) return;
  const hp = profileOf(host, "x");
  state.xPosts.unshift({
    id: nid(state, "p"),
    artistId: host.id,
    handle: hp.handle,
    name: host.name,
    text: rng.pick([
      `feat. ${guest} on “${song.title}”. verse is nasty.`,
      `${guest} hopped on “${song.title}”. don’t skip.`,
      `locked ${guest} for “${song.title}”. charts about to eat.`,
      `told you I was getting ${guest} on this one.`,
    ]),
    week: state.week,
    likes: rng.int(80, 12_000),
    reposts: rng.int(10, 1_400),
    replies: rng.int(8, 600),
    owned: isControlled(state, host),
    avatar: hp.avatar,
    verified: host.verified.x,
  });
}

function pairWorldFeatures(state: GameState, rng: Rng) {
  const pool = state.artists.filter((a) => a.superstar || a.real || a.fame > 16);
  if (pool.length < 2) return;
  const singles = state.songs.filter((s) => s.status === "released" && s.kind === "single" && !s.collabArtistId);
  for (const song of singles) {
    const host = state.artists.find((a) => a.id === song.artistId);
    if (!host || isControlled(state, host)) continue;
    const chance = host.superstar || host.real ? 0.78 : 0.46;
    if (!rng.chance(chance)) continue;
    const guests = pool.filter((a) => a.id !== song.artistId);
    if (!guests.length) continue;
    song.collabArtistId = rng.pick(guests).id;
    announceCollab(state, rng, song);
  }
}

function seedOfficialVideo(state: GameState, rng: Rng, artist: Artist, song: Song) {
  if (state.videos.some((v) => v.songId === song.id && v.kind === "traditional")) return;
  const guest = featName(state, song);
  const views = Math.round((song.streams * 0.07 + artist.followers.youtube * 0.35) * (0.55 + rng.next() * 0.7));
  state.videos.push({
    id: nid(state, "yt"),
    artistId: artist.id,
    songId: song.id,
    title: guest ? `${song.title} (feat. ${guest}) (Official Video)` : `${song.title} (Official Video)`,
    kind: "traditional",
    week: song.releasedWeek ?? 1,
    views: Math.max(800, views),
    viewsWeek: Math.round(Math.max(800, views) * 0.09),
    likes: Math.round(Math.max(800, views) * 0.048),
    comments: Math.round(Math.max(800, views) * 0.0035),
    quality: clamp(70 + Math.round(artist.fame / 8), 50, 96),
    cost: 0,
    celebrity: guest,
    location: artist.hometown,
  });
}

function seedWorldVideos(state: GameState, rng: Rng) {
  const released = state.songs
    .filter((s) => s.status === "released")
    .slice()
    .sort((a, b) => b.streamsWeek - a.streamsWeek)
    .slice(0, 48);
  for (const song of released) {
    const artist = state.artists.find((a) => a.id === song.artistId);
    if (!artist) continue;
    seedOfficialVideo(state, rng, artist, song);
    if (rng.chance(0.42) && song.kind === "single") {
      const views = Math.round((song.streams * 0.02 + artist.followers.youtube * 0.08) * (0.4 + rng.next()));
      const guest = featName(state, song);
      state.videos.push({
        id: nid(state, "yt"),
        artistId: artist.id,
        songId: song.id,
        title: guest ? `${song.title} (feat. ${guest}) (Official Audio)` : `${song.title} (Official Audio)`,
        kind: "lyrics",
        week: (song.releasedWeek ?? 1) + 1,
        views: Math.max(400, views),
        viewsWeek: Math.round(Math.max(400, views) * 0.07),
        likes: Math.round(Math.max(400, views) * 0.03),
        comments: Math.round(Math.max(400, views) * 0.002),
        quality: 62,
        cost: 0,
        celebrity: guest,
        location: null,
      });
    }
    if (rng.chance(0.28)) {
      const views = Math.round((artist.followers.youtube * 0.12 + rng.next() * 40_000) * (0.5 + rng.next()));
      state.videos.push({
        id: nid(state, "yt"),
        artistId: artist.id,
        songId: song.id,
        title: rng.pick([
          `${artist.name} — studio vlog`,
          `A week in ${artist.hometown}`,
          `${song.title} (Live)`,
          `Behind “${song.title}”`,
        ]),
        kind: rng.chance(0.45) ? "performance" : rng.chance(0.5) ? "makingOf" : "general",
        week: (song.releasedWeek ?? 1) + rng.int(1, 6),
        views: Math.max(220, views),
        viewsWeek: Math.round(Math.max(220, views) * 0.08),
        likes: Math.round(Math.max(220, views) * 0.05),
        comments: Math.round(Math.max(220, views) * 0.004),
        quality: rng.int(48, 88),
        cost: 0,
        celebrity: null,
        location: artist.hometown,
      });
    }
  }
}

function seedSuperstar(state: GameState, rng: Rng, name: string, genre: GenreId, monthly: number, hit: string, weekly: number, lifetime: number, fame: number, extra?: Partial<Artist>) {
  const seed = generateArtist(rng, { genre, signedFame: fame });
  seed.name = name;
  seed.handle = handleize(name) || "star";
  const rival = rng.pick(state.rivals);
  const artist = fromSeed(state, seed, {
    signed: true,
    labelId: rival.id,
    superstar: true,
    fame,
    fans: monthly * 1.6,
    followers: {
      tiktok: Math.round(monthly * 0.9),
      x: Math.round(monthly * 0.55),
      instagram: Math.round(monthly * 0.8),
      youtube: Math.round(monthly * 0.45),
    },
    royalty: 0.22,
    ...extra,
  });
  // Seed four weeks of history so monthly listeners match.
  const w = Math.round(monthly / 4);
  artist.weeklyStreamHistory = [Math.round(w * 1.05), Math.round(w * 0.98), Math.round(w * 1.02), w];
  syncMonthly(artist);
  applyVerification(state, artist, false);
  state.artists.push(artist);
  seedHit(state, rng, artist, hit, weekly, lifetime, rng.int(2, 10));
  seedStarAlbum(state, rng, artist, hit, weekly, lifetime);
  // Catalog leftover that still trickles
  if (rng.chance(0.7)) {
    const older = writeSong(state, rng, artist, true);
    older.status = "released";
    older.releasedWeek = 1 - rng.int(20, 80);
    older.streams = Math.round(lifetime * (0.4 + rng.next()));
    older.streamsWeek = Math.round(weekly * 0.12);
    older.weekHistory = [older.streamsWeek, older.streamsWeek, older.streamsWeek, older.streamsWeek];
    older.playlist = rng.chance(0.6);
    older.promoHeat = 8;
    older.lastPromoWeek = state.week - 6;
    const snd = makeSound(state, older.title, artist.name, older.id);
    older.soundId = snd.id;
    state.sounds.push(snd);
    state.songs.push(older);
    paintRegionalWeek(state, older, older.streamsWeek, Math.round(older.streamsWeek * 0.001), 0, 0, false);
    const lifeW = older.streamsWeek || 1;
    for (const r of REGIONS) {
      const w = (older.regionalWeek[r.id]?.streams ?? 0) / lifeW;
      older.regional[r.id].streams = Math.round(older.streams * w);
    }
  }
  return artist;
}

function populateWorld(state: GameState, rng: Rng) {
  if (state.settings.database === "real") {
    for (const r of REAL_ARTISTS) {
      const seed = generateArtist(rng, { genre: r.genre, signedFame: r.fame });
      seed.name = r.name;
      seed.handle = r.handle;
      seed.age = r.age;
      seed.hometown = r.hometown;
      seed.nationality = r.nationality;
      seed.bio = r.bio;
      seed.genre = r.genre;
      const rival = rng.pick(state.rivals);
      const artist = fromSeed(state, seed, {
        signed: true,
        labelId: rival.id,
        real: true,
        superstar: true,
        fame: r.fame,
        fans: r.monthly * 1.8,
        followers: {
          tiktok: Math.round(r.monthly * 0.85),
          x: Math.round(r.monthly * 0.5),
          instagram: Math.round(r.monthly * 0.75),
          youtube: Math.round(r.monthly * 0.4),
        },
      });
      const w = Math.round(r.monthly / 4);
      artist.weeklyStreamHistory = [Math.round(w * 1.04), Math.round(w * 0.97), Math.round(w * 1.01), w];
      syncMonthly(artist);
      applyVerification(state, artist, false);
      state.artists.push(artist);
      seedHit(state, rng, artist, r.hit, r.hitWeekly, r.hitLifetime, rng.int(1, 8));
      seedStarAlbum(state, rng, artist, r.hit, r.hitWeekly, r.hitLifetime);
    }
  } else {
    for (const s of SUPERSTAR_FICTIONAL) {
      seedSuperstar(state, rng, s.name, s.genre, s.monthly, s.hit, s.weekly, s.lifetime, s.fame);
    }
  }

  for (const h of HANDCRAFTED) {
    const fame = h.fame;
    const tiktok = Math.round(400 + fame * fame * 28);
    const a = fromSeed(state, {
      ...h,
      handle: handleize(h.name),
      nationality: "US",
      fans: Math.round(tiktok * 1.6),
      followers: {
        tiktok,
        x: Math.round(tiktok * 0.45),
        instagram: Math.round(tiktok * 0.7),
        youtube: Math.round(tiktok * 0.3),
      },
      avatar: makeAvatar(rng),
    });
    state.artists.push(a);
  }
  for (let i = 0; i < 8; i++) state.artists.push(fromSeed(state, generateArtist(rng)));

  for (const riv of state.rivals) {
    const count = rng.int(1, 3);
    for (let i = 0; i < count; i++) {
      const seedA = generateArtist(rng, { signedFame: rng.int(18, 55) });
      const artist = fromSeed(state, seedA, { signed: true, labelId: riv.id, royalty: 0.2 });
      state.artists.push(artist);
      const song = writeSong(state, rng, artist, true);
      song.status = "released";
      song.releasedWeek = 1 - rng.int(1, 10);
      const weekly = Math.round(Math.exp(rng.gauss(11.2, 1.1)));
      song.streams = Math.round(weekly * (8 + rng.next() * 10));
      song.streamsWeek = weekly;
      song.weekHistory = [Math.round(weekly * 1.2), Math.round(weekly * 1.05), Math.round(weekly * 0.95), weekly];
      song.sales = Math.round(song.streams * 0.002);
      song.quality = qualityOf(song);
      song.radioPower = rng.int(10, 70);
      song.radioWeeks = rng.int(0, 6);
      song.lastPromoWeek = state.week - rng.int(0, 3);
      song.promoHeat = rng.int(10, 50);
      const sound = makeSound(state, song.title, artist.name, song.id);
      sound.uses = Math.round(song.streams * 0.0002);
      song.soundId = sound.id;
      state.sounds.push(sound);
      state.songs.push(song);
      artist.weeklyStreamHistory = song.weekHistory.slice();
      syncMonthly(artist);
      const clip = ownedStyleClip(state, rng, artist, song, sound, false);
      clip.owned = false;
      clip.views = Math.round(song.streams * (0.4 + rng.next()));
      clip.likes = Math.round(clip.views * 0.08);
      clip.viewsWeek = Math.round(clip.views * 0.12);
      state.clips.push(clip);
    }
  }

  for (let i = 0; i < 8; i++) {
    const snd = makeSound(state, songTitle(rng), rng.pick(NPC_CREATORS), null);
    snd.uses = rng.int(200, 40000);
    state.sounds.push(snd);
    state.clips.push(npcClip(state, rng, snd, null));
  }

  refreshSongMarket(state, rng);
  refreshTrends(state, rng);
  seedX(state, rng);
  pairWorldFeatures(state, rng);
  seedWorldVideos(state, rng);
  for (const a of state.artists) syncPopularity(a);
  recomputeCharts(state);
  recomputeRadioCharts(state);
  recomputeAlbumCharts(state);
  seedFilms(state, rng);
  ensureLifeState(state);
}

export function createInitialState(input: NewGameInput, seedNum?: number): GameState {
  const seed = seedNum ?? Math.floor(Math.random() * 1e9) + 1;
  const rng = mulberry32(seed);
  const city = input.city || rng.pick(CITIES);
  const database = input.database ?? "normal";
  const state = blankState(seed, city, input.career, database);

  if (input.career === "label") {
    state.labelName = (input.labelName ?? "").trim() || "Harbor Records";
    populateWorld(state, rng);
    pushNotif(state, {
      tone: "info",
      title: "Doors open",
      body: "Scout a roster, cut a record, then break it on TikTok. Songs die without promo — keep feeding the apps.",
    });
    return state;
  }

  populateWorld(state, rng);
  const name = (input.name ?? "").trim() || "Jayden";
  const handle = (input.handle?.trim() || handleize(name) || "jayden").slice(0, 16);
  const split = splitLegalName(name);
  const legalFirst = (input.legalFirst ?? "").trim() || split.first;
  const legalLast = (input.legalLast ?? "").trim() || (input.legalFirst ? "" : split.last || "Carter");
  const you = fromSeed(
    state,
    {
      name,
      handle,
      genre: input.genre ?? "altpop",
      kind: "solo",
      age: input.age ?? rng.int(18, 27),
      hometown: city,
      nationality: "US",
      bio: "Bedroom demos, borrowed mics, and a For You page that doesn't know the name yet.",
      stats: {
        vocals: clamp(Math.round(rng.gauss(68, 8)), 52, 88),
        writing: clamp(Math.round(rng.gauss(70, 8)), 54, 90),
        dance: clamp(Math.round(rng.gauss(64, 8)), 48, 88),
        charisma: clamp(Math.round(rng.gauss(72, 8)), 55, 92),
        looks: clamp(Math.round(rng.gauss(70, 8)), 50, 90),
        workEthic: clamp(Math.round(rng.gauss(74, 7)), 58, 92),
        social: clamp(Math.round(rng.gauss(76, 8)), 58, 94),
        production: clamp(Math.round(rng.gauss(58, 8)), 40, 82),
        performance: clamp(Math.round(rng.gauss(66, 8)), 50, 90),
      },
      potential: clamp(Math.round(rng.gauss(78, 8)), 62, 96),
      fame: 6,
      fans: 900,
      followers: { tiktok: 820, x: 540, instagram: 710, youtube: 240 },
      avatar: makeAvatar(rng),
    },
    {
      signed: false,
      labelId: null,
      royalty: 0.85,
      wage: 0,
      monthlyListeners: 0,
      followingX: 120,
      gender: input.gender ?? "male",
      orientation: input.orientation ?? "straight",
      legalFirst,
      legalLast,
    },
  );
  you.weeklyStreamHistory = [0, 0, 0, 0];
  syncMonthly(you);
  state.artists.unshift(you);
  state.playerArtistId = you.id;
  state.labelName = "Independent";
  state.dealKind = "independent";
  pushNotif(state, {
    tone: "info",
    title: `${you.name} is unsigned`,
    body: "Write a record, post the sound, grow every app. Spotify monthly listeners are the last four weeks of streams — nothing more. Years and weeks both tick.",
  });
  pushMail(state, {
    kind: "press",
    from: "Music Star Career",
    subject: "Inbox is live",
    body: "Label deals, film reads, legal notices, and beat packs land here. Family stays on the toast. Hollywood, Health, and Nightlife live under More.",
  });
  return state;
}

function ownedStyleClip(
  state: GameState,
  rng: Rng,
  artist: Artist,
  song: Song,
  sound: Sound,
  owned: boolean,
): TikTokClip {
  const format = rng.pick(FORMATS).id;
  return {
    id: nid(state, "c"),
    artistId: artist.id,
    creatorName: artist.name,
    creatorHandle: profileOf(artist, "tiktok").handle,
    songId: song.id,
    soundId: sound.id,
    caption: captionFor(rng, song.title, format, profileOf(artist, "tiktok").handle),
    format,
    hashtags: rng.shuffle(HASHTAGS).slice(0, 3),
    week: state.week,
    views: 0,
    viewsWeek: 0,
    likes: 0,
    comments: 0,
    saves: 0,
    shares: 0,
    soundUses: 0,
    watchRate: 0,
    likeRate: 0,
    completion: 0,
    viralStage: 0,
    sparkSpend: 0,
    owned,
    visual: rng.int(0, 8),
    avatar: profileOf(artist, "tiktok").avatar,
  };
}

function npcClip(state: GameState, rng: Rng, sound: Sound, song: Song | null): TikTokClip {
  const handle = rng.pick(NPC_CREATORS);
  const format = rng.pick(FORMATS).id;
  const views = Math.round(Math.exp(rng.gauss(8.2, 1.6)));
  return {
    id: nid(state, "c"),
    artistId: song?.artistId ?? null,
    creatorName: handle,
    creatorHandle: handle,
    songId: song?.id ?? null,
    soundId: sound.id,
    caption: captionFor(rng, sound.name, format, handle),
    format,
    hashtags: rng.shuffle(HASHTAGS).slice(0, rng.int(2, 4)),
    week: state.week - rng.int(0, 4),
    views,
    viewsWeek: Math.round(views * rng.next() * 0.3),
    likes: Math.round(views * (0.04 + rng.next() * 0.08)),
    comments: Math.round(views * 0.004),
    saves: Math.round(views * 0.01),
    shares: Math.round(views * 0.006),
    soundUses: Math.round(views * 0.0004),
    watchRate: clamp(rng.gauss(0.48, 0.1), 0.2, 0.85),
    likeRate: clamp(rng.gauss(0.07, 0.02), 0.02, 0.18),
    completion: clamp(rng.gauss(0.42, 0.1), 0.15, 0.8),
    viralStage: views > 1_000_000 ? 5 : views > 100_000 ? 4 : views > 20_000 ? 3 : 2,
    sparkSpend: 0,
    owned: false,
    visual: rng.int(0, 8),
    avatar: makeAvatar(rng),
  };
}

function refreshTrends(state: GameState, rng: Rng) {
  const sounds = rng.shuffle(state.sounds.filter((s) => s.uses > 50 || s.songId)).slice(0, 5);
  sounds.forEach((s, i) => {
    s.trending = true;
    s.trendRank = i + 1;
  });
  state.sounds.forEach((s) => {
    if (!sounds.includes(s)) {
      s.trending = false;
      s.trendRank = null;
    }
  });
  const trends: Trend[] = sounds.map((s, i) => ({
    id: `t_s_${s.id}`,
    kind: "sound",
    name: s.name,
    heat: 90 - i * 12,
    soundId: s.id,
  }));
  for (const name of rng.shuffle(["first-frame stare", "chorus swap", "hallway walk", "mirror take", "one-take booth"]).slice(0, 3)) {
    trends.push({ id: nid(state, "tr"), kind: "challenge", name, heat: rng.int(40, 88) });
  }
  for (const name of rng.shuffle(["maincharacter", "unreleased", "soundon", "choruscheck"]).slice(0, 3)) {
    trends.push({ id: nid(state, "tr"), kind: "hashtag", name: `#${name}`, heat: rng.int(30, 80) });
  }
  trends.sort((a, b) => b.heat - a.heat);
  state.trends = trends;
}

function seedX(state: GameState, rng: Rng) {
  const signed = state.artists.filter((a) => a.signed || a.superstar);
  const pool = signed.length ? signed : state.artists;
  for (let i = 0; i < 14; i++) {
    const a = rng.pick(pool);
    state.xPosts.push({
      id: nid(state, "p"),
      artistId: a.id,
      handle: a.handle,
      name: a.name,
      text: rng.pick(X_TEMPLATES),
      week: state.week,
      likes: rng.int(20, 4000),
      reposts: rng.int(2, 400),
      replies: rng.int(4, 200),
      owned: false,
      avatar: a.avatar,
      verified: a.verified.x,
    });
  }
}

function refreshSongMarket(state: GameState, rng: Rng) {
  state.songMarket = [];
  for (let i = 0; i < 6; i++) {
    state.songMarket.push({
      id: nid(state, "mkt"),
      title: songTitle(rng),
      genre: rng.pick(GENRES).id,
      quality: rng.int(55, 92),
      price: 4_500 + rng.int(0, 18_000),
      writer: rng.pick(["Room 404", "Harbor writers", "Stockholm camp", "Atlanta rooms", "Topline desk"]),
    });
  }
}

export function signCost(artist: Artist) {
  const advance = Math.round(12_000 + artist.fame * 900 + artist.potential * 280 + artist.followers.tiktok * 0.08);
  const wage = Math.round(400 + artist.fame * 28 + artist.potential * 8);
  const royalty = clamp(0.18 + artist.fame / 400 + artist.potential / 800, 0.16, 0.42);
  return { advance, wage, royalty };
}

export function signArtist(state: GameState, artistId: string): string | null {
  if (state.career !== "label") return "You're the artist, not the A&R.";
  const artist = state.artists.find((a) => a.id === artistId);
  if (!artist || artist.signed) return "Already signed.";
  const { advance, wage, royalty } = signCost(artist);
  if (state.cash < advance) return "Not enough cash for the advance.";
  state.cash -= advance;
  state.ledger.other -= advance;
  artist.signed = true;
  artist.labelId = "player";
  artist.advance = advance;
  artist.wage = wage;
  artist.royalty = royalty;
  artist.signedWeek = state.week;
  artist.albumsRemaining = 3;
  artist.mood = clamp(artist.mood + 12, 0, 100);
  pushNotif(state, {
    tone: "good",
    title: `Signed ${artist.name}`,
    body: `Advance ${Math.round(advance).toLocaleString("en-US")} · ${Math.round(royalty * 100)}% artist share · 3 albums.`,
  });
  if (state.tutorial === 1) state.tutorial = 2;
  return null;
}

export function startSong(state: GameState, artistId: string, rng: Rng, kind: Song["kind"] = "single"): string | null {
  const artist = state.artists.find((a) => a.id === artistId);
  if (!artist || !isControlled(state, artist)) return "That's not your session.";
  if (artist.onHoliday) return `${artist.name} is on holiday.`;
  if (artist.energy < 25) return `${artist.name} is spent. Give them a week.`;
  const busy = state.songs.some((s) => s.artistId === artistId && (s.status === "writing" || s.status === "recording" || s.status === "mixing"));
  if (busy) return "They already have a record in progress.";
  const cost = state.career === "artist" ? 1800 + state.studioTier * 700 : 3500 + state.studioTier * 1500;
  if (state.cash < cost) return "Can't book the room.";
  state.cash -= cost;
  artist.energy -= 18;
  const song = writeSong(state, rng, artist, false);
  song.kind = kind;
  song.status = "writing";
  song.weeksLeft = kind === "album" ? 2 : 1;
  state.songs.push(song);
  pushNotif(state, {
    tone: "info",
    title: `${artist.name} started “${song.title}”`,
    body: `Writing week. Hook look: ${song.hook}. ${kind}.`,
  });
  if (state.tutorial <= 2) state.tutorial = 3;
  return null;
}

export function buySongFromMarket(state: GameState, marketId: string, artistId: string): string | null {
  const item = state.songMarket.find((s) => s.id === marketId);
  const artist = state.artists.find((a) => a.id === artistId);
  if (!item || !artist || !isControlled(state, artist)) return "Can't buy that.";
  if (state.cash < item.price) return "Short on the publishing check.";
  state.cash -= item.price;
  const song: Song = {
    id: nid(state, "s"),
    artistId: artist.id,
    title: item.title,
    genre: item.genre,
    writing: item.quality,
    production: item.quality - 4,
    hook: item.quality + 2,
    mix: item.quality - 2,
    quality: item.quality,
    status: "mastered",
    kind: "single",
    weeksLeft: 0,
    releasedWeek: null,
    streams: 0,
    streamsWeek: 0,
    streamsPending: 0,
    weekHistory: [],
    sales: 0,
    salesPhysical: 0,
    salesDigital: 0,
    peakChart: null,
    chart: null,
    albumChart: null,
    peakAlbum: null,
    radioWeeks: 0,
    radioPower: 0,
    radioChart: null,
    peakRadio: null,
    playlist: false,
    soundId: null,
    weekPayout: 0,
    promoHeat: 0,
    lastPromoWeek: 0,
    videoHeat: 0,
    tiktokHeat: 0,
    regional: EMPTY_REGIONS(),
    awards: [],
    cover: 0,
    collabArtistId: null,
    featureFee: 0,
    featureSplit: 0,
    releaseFormat: "both",
    bside: false,
    salesDigitalWeek: 0,
    salesPhysicalWeek: 0,
    chartPoints: 0,
    albumUnits: 0,
    ost: false,
    albumId: null,
    regionalWeek: EMPTY_REGIONS(),
  };
  state.songs.push(song);
  state.songMarket = state.songMarket.filter((s) => s.id !== marketId);
  pushNotif(state, { tone: "good", title: `Bought “${item.title}”`, body: `From ${item.writer}. Ready to release.` });
  return null;
}

export function releaseSong(state: GameState, songId: string, rng: Rng, format: ReleaseFormat = "both"): string | null {
  const song = state.songs.find((s) => s.id === songId);
  if (!song || song.status !== "mastered") return "Nothing to release.";
  const artist = state.artists.find((a) => a.id === song.artistId);
  if (!artist) return "Missing artist.";
  song.status = "released";
  song.releasedWeek = state.week;
  song.lastPromoWeek = state.week;
  song.promoHeat = 18;
  song.releaseFormat = format;
  const sound = makeSound(state, song.title, artist.name, song.id);
  song.soundId = sound.id;
  state.sounds.push(sound);
  const open = Math.round(1_800 + artist.followers.youtube * 0.08 + song.quality * 70 + artist.fame * 40);
  song.streams += open;
  song.streamsPending += open;
  growFollowers(artist, "youtube", open * 0.01, 8);
  pushNotif(state, {
    tone: "good",
    title: `Released “${song.title}”`,
    body: `It's on ${format === "cd" ? "CD racks" : format === "digital" ? "Spotify" : "Spotify and CD"} · ${open.toLocaleString("en-US")} first-day streams. Cut a TikTok this week or it dies.`,
  });
  if (state.tutorial === 3) state.tutorial = 4;
  unlockAchievement(state, "first-song");
  if (artist.albumsRemaining > 0 && artist.signed) {
    // singles don't burn album commitment
  }
  void rng;
  return null;
}

export function buyRadio(state: GameState, songId: string): string | null {
  const song = state.songs.find((s) => s.id === songId && s.status === "released");
  if (!song) return "Release it first.";
  const cost = state.career === "artist" ? 9_500 + state.labelRep * 120 : 18_000 + state.labelRep * 200;
  if (state.cash < cost) return "Radio still bills like it's 2004.";
  state.cash -= cost;
  song.radioWeeks = Math.max(song.radioWeeks, 5);
  song.radioPower = Math.max(song.radioPower, 48 + state.labelRep * 0.5 + song.quality * 0.2);
  song.promoHeat = Math.min(100, song.promoHeat + 22);
  song.lastPromoWeek = state.week;
  pushNotif(state, { tone: "info", title: `Radio add: “${song.title}”`, body: "Five weeks of spins. Watch Radio." });
  return null;
}

export function buyPlaylist(state: GameState, songId: string, rng: Rng): string | null {
  const song = state.songs.find((s) => s.id === songId && s.status === "released");
  if (!song) return "Release it first.";
  const cost = state.career === "artist" ? 4_800 : 9_500;
  if (state.cash < cost) return "Pitch fee is short.";
  state.cash -= cost;
  const chance = 0.34 + song.quality / 350 + state.labelRep / 350;
  if (rng.chance(chance) || song.playlist) {
    song.playlist = true;
    song.promoHeat = Math.min(100, song.promoHeat + 18);
    song.lastPromoWeek = state.week;
    pushNotif(state, {
      tone: "good",
      title: `Spotify editorial: “${song.title}”`,
      body: "Today's Mix and a city playlist. Four-week listeners will jump — if you keep feeding it.",
    });
  } else {
    pushNotif(state, {
      tone: "bad",
      title: "Pitch passed over",
      body: `“${song.title}” didn't land. Quality and TikTok heat help the next one.`,
    });
  }
  return null;
}

export function promoteOn(
  state: GameState,
  songId: string,
  platform: PromoCampaign["platform"],
  budget: number,
  region: RegionId | "global" = "global",
): string | null {
  const song = state.songs.find((s) => s.id === songId && s.status === "released");
  if (!song) return "Release it first.";
  if (budget < 500) return "Minimum $500.";
  if (state.cash < budget) return "Budget short.";
  state.cash -= budget;
  song.promoHeat = Math.min(100, song.promoHeat + Math.log10(budget) * 8);
  song.lastPromoWeek = state.week;
  if (platform === "tiktok") song.tiktokHeat = Math.min(100, song.tiktokHeat + budget / 400);
  if (platform === "youtube") song.videoHeat = Math.min(100, song.videoHeat + budget / 500);
  if (platform === "radio") song.radioPower = Math.min(100, song.radioPower + budget / 800);
  state.campaigns.push({
    id: nid(state, "pr"),
    songId,
    platform,
    budget,
    weeksLeft: platform === "radio" ? 4 : 2,
    region,
  });
  pushNotif(state, {
    tone: "info",
    title: `Promo on ${platform}`,
    body: `$${budget.toLocaleString("en-US")} behind “${song.title}”. Heat ${Math.round(song.promoHeat)}.`,
  });
  return null;
}

export function upgradeStudio(state: GameState, plan?: PayPlan): string | null {
  if (state.studioTier >= 3) return "The room is already as good as it gets.";
  const cost = state.studioTier === 1 ? 45_000 : 95_000;
  const paid = settleDue(state, cost, plan ?? cashPlan(cost));
  if (paid) return paid;
  state.studioTier += 1;
  pushNotif(state, { tone: "good", title: `Studio tier ${state.studioTier}`, body: "Better converters, better first-second." });
  return null;
}

export function refreshScout(state: GameState, rng: Rng): string | null {
  if (state.career !== "label") return "A&R is a label desk.";
  const cost = 2_500;
  if (state.cash < cost) return "A&R lunch isn't free.";
  state.cash -= cost;
  const n = rng.int(2, 4);
  for (let i = 0; i < n; i++) state.artists.push(fromSeed(state, generateArtist(rng)));
  pushNotif(state, { tone: "info", title: "A&R brought names", body: `${n} new prospects in the building.` });
  return null;
}

function formatBias(format: ClipFormat) {
  return FORMATS.find((f) => f.id === format) ?? FORMATS[0]!;
}

function trendFit(state: GameState, soundId: string, hashtags: string[], format: ClipFormat) {
  let fit = 0;
  const soundTrend = state.trends.find((t) => t.soundId === soundId);
  if (soundTrend) fit += 0.34 + soundTrend.heat / 400;
  if (format === "challenge" && state.trends.some((t) => t.kind === "challenge")) fit += 0.16;
  const tagHit = hashtags.filter((h) =>
    state.trends.some((t) => t.kind === "hashtag" && t.name.replace("#", "") === h),
  ).length;
  fit += tagHit * 0.06;
  return clamp(fit, 0, 0.7);
}

export function runTikTokAlgorithm(
  state: GameState,
  rng: Rng,
  clip: TikTokClip,
  artist: Artist | null,
  song: Song | null,
  spark: number,
): TikTokRollout {
  const fmt = formatBias(clip.format);
  const hook = (song?.hook ?? 48) / 100;
  const prod = (song?.production ?? 50) / 100;
  const quality = (song?.quality ?? 52) / 100;
  const charisma = (artist?.stats.charisma ?? 50) / 100;
  const looks = (artist?.stats.looks ?? 50) / 100;
  const social = (artist?.stats.social ?? 50) / 100;
  const energy = (artist?.energy ?? 60) / 100;
  const overpost = artist ? Math.max(0, artist.tiktokPostsThisWeek - 3) * 0.08 : 0;
  const fit = trendFit(state, clip.soundId, clip.hashtags, clip.format);
  const sparkBoost = Math.min(0.22, Math.log10(1 + spark / 400) * 0.12);

  const watchRate = clamp(0.18 + hook * 0.42 + fmt.hookBias + fit * 0.16 + energy * 0.06 + rng.gauss(0, 0.04) - overpost, 0.12, 0.88);
  const completion = clamp(watchRate * (0.62 + prod * 0.28 + hook * 0.12) + rng.gauss(0, 0.03), 0.1, 0.86);
  const likeRate = clamp(0.018 + charisma * 0.055 + looks * 0.03 + hook * 0.03 + fmt.socialBias * 0.04 + rng.gauss(0, 0.008), 0.01, 0.2);
  const shareRate = clamp(0.0015 + social * 0.01 + fit * 0.012 + hook * 0.006, 0.0008, 0.04);
  const saveRate = clamp(0.004 + hook * 0.02 + quality * 0.01, 0.002, 0.05);

  const followerBase = artist?.followers.tiktok ?? 400;
  const stagesDef = [
    { name: "Test audience", size: 280 + followerBase * 0.08, watchNeed: 0.32, likeNeed: 0.03 },
    { name: "More For You pages", size: 2_400, watchNeed: 0.4, likeNeed: 0.045 },
    { name: "Out of circle", size: 18_000, watchNeed: 0.46, likeNeed: 0.055 },
    { name: "Main feed", size: 140_000, watchNeed: 0.5, likeNeed: 0.062 },
    { name: "Going wide", size: 1_100_000, watchNeed: 0.54, likeNeed: 0.07 },
    { name: "Runaway", size: 7_500_000, watchNeed: 0.58, likeNeed: 0.08 },
  ];

  const stages: TikTokStage[] = [];
  let views = 0;
  let stageIdx = 0;
  for (let i = 0; i < stagesDef.length; i++) {
    const st = stagesDef[i]!;
    const luck = 0.28 + hook * 0.35 + fit * 0.22 + sparkBoost + quality * 0.1;
    const size = st.size * (0.75 + rng.next() * 0.5) * (1 + sparkBoost);
    const passedWatch = completion >= st.watchNeed - sparkBoost * 0.15;
    const passedLike = likeRate >= st.likeNeed - sparkBoost * 0.05;
    const passedLuck = i < 2 || rng.chance(luck);
    const passed = passedWatch && passedLike && passedLuck;
    views += size;
    let reason: string | undefined;
    if (!passedWatch) reason = `Completion ${Math.round(completion * 100)}% missed the ${Math.round(st.watchNeed * 100)}% bar.`;
    else if (!passedLike) reason = `Like rate too thin to keep pushing.`;
    else if (!passedLuck) reason = `The page flinched. Same clip, different hour.`;
    stages.push({ name: st.name, views: Math.round(size), passed, reason: passed ? undefined : reason });
    stageIdx = i;
    if (!passed) break;
  }

  views = Math.round(views);
  const likes = Math.round(views * likeRate);
  const comments = Math.round(views * 0.0045 * (0.7 + social));
  const saves = Math.round(views * saveRate);
  const shares = Math.round(views * shareRate);
  const soundUses = Math.round(views * (0.00035 + hook * 0.0009 + fit * 0.0006));
  const followersGained = Math.max(4, Math.round(views * (0.004 + social * 0.008 + likeRate * 0.45)));
  const released = song?.status === "released";
  const streamsGained = Math.round(views * (released ? 0.14 + hook * 0.12 : 0.03) * (0.75 + quality * 0.45));
  const xGained = Math.max(3, Math.round(followersGained * 0.28 + views * 0.0009));
  const instagramGained = Math.max(3, Math.round(followersGained * 0.34 + views * 0.0011));
  const spotifyGained = Math.max(5, Math.round(followersGained * 0.5 + streamsGained * 0.18));
  const youtubeGained = Math.max(2, Math.round(followersGained * 0.18 + views * 0.0004));

  clip.views += views;
  clip.viewsWeek += views;
  clip.likes += likes;
  clip.comments += comments;
  clip.saves += saves;
  clip.shares += shares;
  clip.soundUses += soundUses;
  clip.watchRate = watchRate;
  clip.likeRate = likeRate;
  clip.completion = completion;
  clip.viralStage = stageIdx;
  clip.sparkSpend += spark;

  const sound = state.sounds.find((s) => s.id === clip.soundId);
  if (sound) sound.uses += soundUses + 1;

  if (artist) {
    growFollowers(artist, "tiktok", followersGained, 4);
    growFollowers(artist, "x", xGained, 3);
    growFollowers(artist, "instagram", instagramGained, 3);
    growFollowers(artist, "youtube", youtubeGained, 2);
    artist.fans += Math.round(followersGained * 0.6);
    artist.fame = clamp(artist.fame + Math.log10(1 + views) * 0.45, 0, 100);
    artist.energy = clamp(artist.energy - (12 + (clip.format === "performance" ? 6 : 0)), 0, 100);
    artist.tiktokPostsThisWeek += 1;
    artist.lastTikTokWeek = state.week;
    artist.mood = clamp(artist.mood + (stageIdx >= 3 ? 8 : stageIdx === 0 ? -4 : 2), 0, 100);
    applyVerification(state, artist);
  }
  if (song) {
    song.streams += streamsGained;
    song.streamsPending += streamsGained;
    song.tiktokHeat = Math.min(100, song.tiktokHeat + Math.log10(1 + views) * 6);
    song.promoHeat = Math.min(100, song.promoHeat + Math.log10(1 + views) * 4);
    song.lastPromoWeek = state.week;
  }
  if (spark > 0) state.cash -= spark;

  let verdict: TikTokRollout["verdict"] = "flop";
  if (stageIdx >= 5) verdict = "runaway";
  else if (stageIdx >= 4) verdict = "viral";
  else if (stageIdx >= 3) verdict = "breakout";
  else if (stageIdx >= 1) verdict = "solid";

  let tip = "Hook in the first second. The test audience does not wait for verse two.";
  if (verdict === "flop" && completion < 0.35) tip = "Completion collapsed. Start on the chorus.";
  else if (verdict === "flop" && likeRate < 0.04) tip = "People watched and did not tap.";
  else if (overpost > 0) tip = "Too many posts this week. The page throttled you.";
  else if (fit < 0.08 && verdict !== "viral") tip = "No trend heat. Hop a challenge or a trending sound.";
  else if (verdict === "solid") tip = "A Spark push or a duet could punch the next stage.";
  else if (verdict === "breakout") tip = "Keep the sound in circulation — NPC creators will do the rest.";
  else if (verdict === "viral" || verdict === "runaway") tip = "The sound is now infrastructure. Every app moved with it.";

  if (verdict === "viral" || verdict === "runaway") {
    pushNotif(state, {
      tone: "viral",
      title: `${clip.creatorName} just broke the page`,
      body: `“${sound?.name ?? "Untitled"}” · ${views.toLocaleString("en-US")} views.`,
    });
    state.labelRep = clamp(state.labelRep + (verdict === "runaway" ? 8 : 4), 0, 100);
    unlockAchievement(state, "viral");
  }

  if (artist && comments > 8) {
    const item: InboxItem = {
      id: nid(state, "in"),
      from: rng.pick(["creator fund", "brand desk", "duet request", "sound notif"]),
      text: rng.pick(COMMENTS),
      week: state.week,
      clipId: clip.id,
    };
    state.inbox.unshift(item);
    state.inbox = state.inbox.slice(0, 30);
  }

  return {
    clipId: clip.id,
    stages,
    totalViews: views,
    followersGained,
    streamsGained,
    xGained,
    instagramGained,
    spotifyGained,
    youtubeGained,
    verdict,
    tip,
  };
}

function dummySong(artist: Artist, sound: Sound, week: number): Song {
  return {
    id: "none",
    artistId: artist.id,
    title: sound.name,
    genre: artist.genre,
    writing: 50,
    production: 50,
    hook: artist.stats.charisma,
    mix: 50,
    quality: 50,
    status: "released",
    kind: "single",
    weeksLeft: 0,
    releasedWeek: week,
    streams: 0,
    streamsWeek: 0,
    streamsPending: 0,
    weekHistory: [],
    sales: 0,
    salesPhysical: 0,
    salesDigital: 0,
    peakChart: null,
    chart: null,
    albumChart: null,
    peakAlbum: null,
    radioWeeks: 0,
    radioPower: 0,
    radioChart: null,
    peakRadio: null,
    playlist: false,
    soundId: sound.id,
    weekPayout: 0,
    promoHeat: 0,
    lastPromoWeek: 0,
    videoHeat: 0,
    tiktokHeat: 0,
    regional: EMPTY_REGIONS(),
    awards: [],
    cover: 0,
    collabArtistId: null,
    featureFee: 0,
    featureSplit: 0,
    releaseFormat: "both" as ReleaseFormat,
    bside: false,
    salesDigitalWeek: 0,
    salesPhysicalWeek: 0,
    chartPoints: 0,
    albumUnits: 0,
    ost: false,
    albumId: null,
    regionalWeek: EMPTY_REGIONS(),
  };
}

export function postTikTok(
  state: GameState,
  rng: Rng,
  input: {
    artistId: string;
    songId: string | null;
    soundId: string | null;
    format: ClipFormat;
    hashtags: string[];
    spark: number;
  },
): { error: string | null; rollout?: TikTokRollout } {
  const artist = state.artists.find((a) => a.id === input.artistId);
  if (!artist || !isControlled(state, artist)) return { error: "Pick someone you control." };
  if (artist.energy < 16) return { error: `${artist.name} has nothing left to give the camera.` };
  if (artist.tiktokPostsThisWeek >= 6) return { error: "Shadowban risk. Sit this one out." };
  if (input.spark > 0 && state.cash < input.spark) return { error: "Spark budget is short." };

  let song = input.songId ? (state.songs.find((s) => s.id === input.songId) ?? null) : null;
  let sound: Sound | undefined;
  if (input.soundId) sound = state.sounds.find((s) => s.id === input.soundId);
  if (song && !sound && song.soundId) sound = state.sounds.find((s) => s.id === song!.soundId);
  if (song && !sound) {
    sound = makeSound(state, song.title, artist.name, song.id);
    song.soundId = sound.id;
    state.sounds.push(sound);
  }
  if (!sound) {
    const title = song?.title ?? `${artist.name} original`;
    sound = makeSound(state, title, artist.name, song?.id ?? null);
    state.sounds.push(sound);
  }

  const clip = ownedStyleClip(state, rng, artist, song ?? dummySong(artist, sound, state.week), sound, true);
  clip.format = input.format;
  clip.hashtags = input.hashtags.slice(0, 5);
  clip.caption = captionFor(rng, sound.name, input.format, profileOf(artist, "tiktok").handle);
  state.clips.unshift(clip);
  state.clips = state.clips.slice(0, 110);

  const rollout = runTikTokAlgorithm(state, rng, clip, artist, song, input.spark);
  state.lastRollout = rollout;
  if (state.tutorial >= 4) state.tutorial = 5;
  unlockAchievement(state, "first-tiktok");
  return { error: null, rollout };
}

export function postX(state: GameState, rng: Rng, artistId: string, text: string): string | null {
  const artist = state.artists.find((a) => a.id === artistId);
  if (!artist || !isControlled(state, artist)) return "Pick someone you control.";
  if (artist.xPostsThisWeek >= 8) return "The timeline is tired of them.";
  const t = text.trim() || rng.pick(X_TEMPLATES);
  const reach = Math.max(220, artist.followers.x * (0.32 + artist.stats.charisma / 180) + artist.followers.tiktok * 0.04);
  const likes = Math.round(reach * (0.06 + rng.next() * 0.1 + artist.stats.charisma / 400));
  const gained = growFollowers(artist, "x", likes * 0.18 + artist.stats.charisma * 0.5, 8);
  growFollowers(artist, "instagram", gained * 0.12, 2);
  growFollowers(artist, "tiktok", gained * 0.08, 2);
  artist.fans += Math.round(gained * 0.4);
  artist.fame = clamp(artist.fame + 0.2, 0, 100);
  const xp = profileOf(artist, "x");
  state.xPosts.unshift({
    id: nid(state, "p"),
    artistId: artist.id,
    handle: xp.handle,
    name: artist.name,
    text: t.slice(0, 280),
    week: state.week,
    likes,
    reposts: Math.round(likes * 0.14),
    replies: Math.round(likes * 0.09),
    owned: true,
    avatar: xp.avatar,
    verified: artist.verified.x,
  });
  state.xPosts = state.xPosts.slice(0, 80);
  artist.xPostsThisWeek += 1;
  artist.energy = clamp(artist.energy - 4, 0, 100);
  applyVerification(state, artist);
  pushAlert(state, {
    kind: "like",
    handle: artist.handle,
    text: `Your post picked up ${likes.toLocaleString("en-US")} likes · +${gained.toLocaleString("en-US")} X followers.`,
  });
  return null;
}

export function postGram(state: GameState, rng: Rng, artistId: string, caption: string): string | null {
  const artist = state.artists.find((a) => a.id === artistId);
  if (!artist || !isControlled(state, artist)) return "Pick someone you control.";
  if (artist.energy < 8) return "No more posing today.";
  const reach = Math.round(
    Math.max(280, artist.followers.instagram * (0.38 + artist.stats.looks / 220) + artist.followers.tiktok * 0.03) *
      (0.85 + rng.next() * 0.4),
  );
  const likes = Math.round(reach * (0.11 + artist.stats.looks / 320));
  const gained = growFollowers(artist, "instagram", likes * 0.14 + artist.stats.looks * 0.45, 10);
  growFollowers(artist, "x", gained * 0.1, 2);
  growFollowers(artist, "youtube", gained * 0.06, 2);
  artist.fans += Math.round(gained * 0.35);
  const gp = profileOf(artist, "instagram");
  state.gram.unshift({
    id: nid(state, "g"),
    artistId: artist.id,
    handle: gp.handle,
    name: artist.name,
    caption: caption.trim() || "on the way.",
    week: state.week,
    likes,
    comments: Math.round(likes * 0.03),
    reach,
    visual: rng.int(0, 8),
    avatar: gp.avatar,
    verified: artist.verified.instagram,
  });
  state.gram = state.gram.slice(0, 40);
  artist.gramPostsThisWeek += 1;
  artist.energy = clamp(artist.energy - 6, 0, 100);
  artist.fame = clamp(artist.fame + 0.25, 0, 100);
  applyVerification(state, artist);
  return null;
}

export function goLive(
  state: GameState,
  rng: Rng,
  artistId: string,
  platform: "tiktok" | "x" | "instagram" | "youtube",
): string | null {
  const blocked = barsBlock(state, "live");
  if (blocked) return blocked;
  const artist = state.artists.find((a) => a.id === artistId);
  if (!artist || !isControlled(state, artist)) return "Not your stream.";
  if (artist.energy < 12) return "Too tired to go live.";
  const base =
    platform === "tiktok"
      ? artist.followers.tiktok
      : platform === "x"
        ? artist.followers.x
        : platform === "instagram"
          ? artist.followers.instagram
          : artist.followers.youtube;
  const viewers = Math.max(12, Math.round(base * (0.012 + rng.next() * 0.05) * (0.7 + artist.stats.charisma / 200)));
  state.liveViewers[platform] = viewers;
  state.lastLiveWeek = state.week;
  artist.energy = clamp(artist.energy - 10, 0, 100);
  const gained = growFollowers(artist, platform === "x" ? "x" : platform === "instagram" ? "instagram" : platform === "youtube" ? "youtube" : "tiktok", viewers * 0.08, 6);
  const gifts = Math.round(viewers * (0.04 + rng.next() * 0.08));
  state.cash += gifts;
  pushNotif(state, {
    tone: "good",
    title: `Live on ${platform === "x" ? "X" : platform === "tiktok" ? "TikTok" : platform === "instagram" ? "Instagram" : "YouTube"}`,
    body: `${viewers.toLocaleString("en-US")} watching · +${gained.toLocaleString("en-US")} follows · $${gifts.toLocaleString("en-US")} in gifts.`,
  });
  return null;
}

export function shootVideo(
  state: GameState,
  rng: Rng,
  artistId: string,
  songId: string,
  kind: YtVideo["kind"],
  premium: boolean,
): string | null {
  const artist = state.artists.find((a) => a.id === artistId);
  const song = state.songs.find((s) => s.id === songId);
  if (!artist || !song || !isControlled(state, artist)) return "Can't book that.";
  const cost = premium ? 28_000 + song.quality * 80 : 4_500;
  if (state.cash < cost) return "Video budget short.";
  state.cash -= cost;
  const quality = clamp(Math.round((premium ? 72 : 48) + artist.stats.looks * 0.15 + rng.gauss(0, 6)), 30, 98);
  const views = Math.round((premium ? 1.8 : 0.6) * (artist.followers.youtube * 0.4 + artist.followers.tiktok * 0.08 + song.quality * 400) * (0.7 + rng.next()));
  const guest = featName(state, song);
  const video: YtVideo = {
    id: nid(state, "yt"),
    artistId,
    songId,
    title: guest
      ? `${song.title} (feat. ${guest}) — ${kind === "lyrics" ? "Official Audio" : kind === "makingOf" ? "Making Of" : kind === "animation" ? "Official Animation" : kind === "performance" ? "Live Performance" : "Official Video"}`
      : `${song.title} — ${kind === "lyrics" ? "Official Audio" : kind === "makingOf" ? "Making Of" : kind === "animation" ? "Official Animation" : kind === "performance" ? "Live Performance" : "Official Video"}`,
    kind,
    week: state.week,
    views,
    viewsWeek: views,
    likes: Math.round(views * 0.06),
    comments: Math.round(views * 0.004),
    quality,
    cost,
    celebrity: premium && rng.chance(0.4) ? "A-list cameo" : null,
    location: premium ? "Desert highway" : "Warehouse night",
  };
  state.videos.unshift(video);
  growFollowers(artist, "youtube", views * 0.02, 10);
  song.videoHeat = Math.min(100, song.videoHeat + (premium ? 28 : 10));
  song.promoHeat = Math.min(100, song.promoHeat + (premium ? 16 : 6));
  song.lastPromoWeek = state.week;
  song.streamsPending += Math.round(views * 0.35);
  pushNotif(state, {
    tone: "good",
    title: `Video online: “${song.title}”`,
    body: `${views.toLocaleString("en-US")} first-week views on YouTube. Promo heat up.`,
  });
  return null;
}

function recomputeCharts(state: GameState) {
  const released = state.songs.filter((s) => isStreamingTrack(s));
  const scored = released.map((s) => {
    const recency = s.releasedWeek == null ? 0.4 : clamp(1.15 - (state.week - s.releasedWeek) * 0.05, 0.12, 1.2);
    const score = hot100Points(state, s);
    s.chartPoints = Math.round(score);
    return { s, score: score * recency };
  });
  scored.sort((a, b) => b.score - a.score);
  released.forEach((s) => {
    s.chart = null;
  });
  scored.slice(0, CHART_SIZE.singles).forEach((row, i) => {
    row.s.chart = i + 1;
    if (row.s.peakChart == null || i + 1 < row.s.peakChart) row.s.peakChart = i + 1;
  });
}

function recomputeRadioCharts(state: GameState) {
  const released = state.songs.filter((s) => s.status === "released");
  const scored = released.map((s) => {
    const recency = s.releasedWeek == null ? 0.3 : clamp(1.05 - (state.week - s.releasedWeek) * 0.04, 0.12, 1.1);
    const spins = s.radioWeeks > 0 ? s.radioPower * (8 + s.radioWeeks) : s.radioPower * 1.4;
    const score = spins * 40 + s.quality * 90 + s.streamsWeek * 0.08 + (s.playlist ? 4000 : 0);
    return { s, score: score * recency };
  });
  scored.sort((a, b) => b.score - a.score);
  released.forEach((s) => {
    s.radioChart = null;
  });
  scored.slice(0, CHART_SIZE.radio).forEach((row, i) => {
    row.s.radioChart = i + 1;
    if (row.s.peakRadio == null || i + 1 < row.s.peakRadio) row.s.peakRadio = i + 1;
  });
}

function recomputeAlbumCharts(state: GameState) {
  if (!Array.isArray(state.albums)) state.albums = [];
  const albums = state.albums.filter((a) => a.status === "released");
  const scored = albums.map((a) => {
    const tracks = a.songIds.map((id) => state.songs.find((s) => s.id === id)).filter((s): s is Song => !!s);
    const recency = a.releasedWeek == null ? 0.4 : clamp(1.1 - (state.week - a.releasedWeek) * 0.04, 0.15, 1.15);
    const units = albumWeekUnits(a, tracks);
    a.albumUnits = units;
    a.streamsWeek = tracks.reduce((n, s) => n + (s.streamsWeek || 0), 0);
    a.streams = tracks.reduce((n, s) => n + (s.streams || 0), 0);
    return { a, score: units * recency, tracks };
  });
  scored.sort((x, y) => y.score - x.score);
  albums.forEach((a) => {
    a.chart = null;
  });
  for (const s of state.songs) s.albumChart = null;
  scored.slice(0, CHART_SIZE.albums).forEach((row, i) => {
    row.a.chart = i + 1;
    if (row.a.peakChart == null || i + 1 < row.a.peakChart) row.a.peakChart = i + 1;
    for (const s of row.tracks) {
      s.albumChart = i + 1;
      s.albumUnits = row.a.albumUnits;
      if (s.peakAlbum == null || i + 1 < s.peakAlbum) s.peakAlbum = i + 1;
    }
  });
}

function chartBonus(chart: number | null) {
  if (chart == null) return 0;
  if (chart === 1) return 58_000;
  if (chart <= 3) return 28_000;
  if (chart <= 5) return 16_000;
  if (chart <= 10) return 8_500;
  if (chart <= 20) return 3_200;
  return 0;
}

function radioBonus(radioChart: number | null, radioPower: number, radioWeeks: number) {
  if (radioChart == null && radioWeeks <= 0) return radioPower * 12;
  let n = radioPower * 90;
  if (radioChart === 1) n += 22_000;
  else if (radioChart && radioChart <= 5) n += 9_000;
  else if (radioChart && radioChart <= 15) n += 3_400;
  return n;
}

export function playerShare(state: GameState, artist: Artist, gross: number) {
  if (state.career === "artist") {
    if (state.playerArtistId !== artist.id) return 0;
    return Math.round(gross * artist.royalty);
  }
  if (artist.labelId === "player") return Math.round(gross * (1 - artist.royalty));
  return 0;
}

/**
 * Weekly streams. Songs die without promo/TikTok/video.
 * Monthly listeners = sum of last 4 weekly totals.
 */
function weeklyOrganic(state: GameState, song: Song, rng: Rng) {
  const artist = state.artists.find((a) => a.id === song.artistId);
  const age = song.releasedWeek == null ? 12 : Math.max(0, state.week - song.releasedWeek);
  const weeksSincePromo = song.lastPromoWeek ? Math.max(0, state.week - song.lastPromoWeek) : age;
  const last = song.weekHistory[song.weekHistory.length - 1] ?? song.streamsWeek ?? 0;

  let decay = age === 0 ? 0.92 : age === 1 ? 0.64 : age === 2 ? 0.5 : age <= 4 ? 0.4 : age <= 8 ? 0.28 : 0.16;
  if (weeksSincePromo >= 2) decay *= 0.55;
  if (weeksSincePromo >= 4) decay *= 0.32;
  if (weeksSincePromo >= 8) decay *= 0.18;
  if (song.promoHeat < 8 && age > 3) decay *= 0.5;

  const fame = artist?.fame ?? 10;
  const tokHeat = state.clips
    .filter((c) => c.songId === song.id)
    .reduce((a, c) => a + c.viewsWeek * 0.18 + c.soundUses * 40, 0);
  const radio = song.radioWeeks > 0 ? song.radioPower * 320 : song.radioPower * 18;
  const pl = song.playlist && weeksSincePromo < 4 ? 12_000 + fame * 80 : song.playlist ? 2_200 : 0;
  const video = song.videoHeat * 180;
  const promo = song.promoHeat * 90;
  const campaign = state.campaigns
    .filter((c) => c.songId === song.id && c.weeksLeft > 0)
    .reduce((n, c) => n + c.budget * 0.35, 0);
  const guest = song.collabArtistId ? state.artists.find((a) => a.id === song.collabArtistId) : null;
  const featureBoost = guest ? guest.popularity * 140 + guest.monthlyListeners * 0.018 : 0;

  const residualFloor = Math.round(fame * 6 + song.quality * 1.4);
  const fromLast = last * decay;
  const injection = tokHeat + radio + pl + video + promo + campaign + featureBoost;
  const wobble = 0.86 + rng.next() * 0.28;
  const gained = Math.max(residualFloor, Math.round((fromLast + injection) * wobble));
  return gained;
}

function maybeDeals(state: GameState, rng: Rng) {
  if (state.career !== "artist") return;
  const artist = playerArtist(state);
  if (!artist || artist.signed) return;
  for (const d of state.deals) {
    if (d.status === "open") {
      d.weeksLeft -= 1;
      if (d.weeksLeft <= 0) d.status = "expired";
    }
  }
  const open = state.deals.filter((d) => d.status === "open");
  if (open.length >= 2) return;
  const charted = state.songs.some((s) => s.artistId === artist.id && s.chart != null);
  const heat = artist.fame >= 16 || artist.followers.tiktok >= 5_000 || artist.monthlyListeners >= 12_000 || charted;
  if (!heat || state.week < 3) return;
  if (!rng.chance(0.42 + artist.fame / 200)) return;
  const used = new Set(open.map((d) => d.labelId));
  const pool = state.rivals.filter((r) => !used.has(r.id));
  if (!pool.length) return;
  const label = rng.pick(pool);
  const heatScore = artist.fame + Math.log10(1 + artist.followers.tiktok) * 8 + (charted ? 18 : 0);
  const advance = Math.round(18_000 + heatScore * 1_400 + artist.monthlyListeners * 0.4);
  const royalty = clamp(0.16 + (100 - heatScore) / 400, 0.14, 0.28);
  const deal: LabelDeal = {
    id: nid(state, "deal"),
    labelId: label.id,
    labelName: label.name,
    advance,
    royalty,
    weeksLeft: 4,
    albums: 3,
    status: "open",
  };
  state.deals.unshift(deal);
  pushNotif(state, {
    tone: "good",
    title: `${label.name} sent a deal`,
    body: `Advance ${advance.toLocaleString("en-US")} · you keep ${Math.round(royalty * 100)}% · 3 albums.`,
  });
  const msg: XMessage = {
    id: nid(state, "pm"),
    week: state.week,
    from: `${label.name} A&R`,
    handle: handleize(label.name),
    text: `We want ${artist.name} on the roster. ${advance.toLocaleString("en-US")} up front.`,
    avatar: makeAvatar(rng),
  };
  state.xMessages.unshift(msg);
}

export function acceptDeal(state: GameState, dealId: string): string | null {
  if (state.career !== "artist") return "That's an artist desk.";
  const artist = playerArtist(state);
  const deal = state.deals.find((d) => d.id === dealId);
  if (!artist || !deal) return "No deal on the table.";
  if (deal.status !== "open") return "That offer is gone.";
  if (artist.signed) return "Already signed.";
  state.cash += deal.advance;
  artist.signed = true;
  artist.labelId = deal.labelId;
  artist.royalty = deal.royalty;
  artist.advance = deal.advance;
  artist.signedWeek = state.week;
  artist.albumsRemaining = deal.albums;
  artist.mood = clamp(artist.mood + 10, 0, 100);
  deal.status = "accepted";
  state.dealKind = "signed";
  state.labelName = deal.labelName;
  for (const d of state.deals) if (d.id !== deal.id && d.status === "open") d.status = "expired";
  pushNotif(state, {
    tone: "viral",
    title: `Signed to ${deal.labelName}`,
    body: `Advance landed. You keep ${Math.round(deal.royalty * 100)}%. They work radio.`,
  });
  unlockAchievement(state, "label-deal");
  return null;
}

export function declineDeal(state: GameState, dealId: string): string | null {
  const deal = state.deals.find((d) => d.id === dealId);
  if (!deal || deal.status !== "open") return "Nothing to decline.";
  deal.status = "declined";
  pushNotif(state, { tone: "info", title: `Passed on ${deal.labelName}`, body: "Independent it is. Keep the masters." });
  return null;
}

export function takeLoan(state: GameState, bankId: string, amount: number, purpose: Loan["purpose"]): string | null {
  const bank = BANKS.find((b) => b.id === bankId);
  if (!bank) return "Unknown bank.";
  if (state.creditScore < bank.minScore) return `${bank.name} wants a ${bank.minScore}+ FICO. You're at ${Math.round(state.creditScore)}.`;
  if (amount < 1_000) return "Minimum $1,000.";
  const max = personalLoanMax(state, bank.id);
  if (amount > max) return `Max unsecured for this score is $${max.toLocaleString("en-US")}. Rebuild FICO or put more cash down.`;
  const loan = originateLoan(state, bank.id, amount, purpose);
  if (typeof loan === "string") return loan;
  state.cash += amount;
  pushNotif(state, {
    tone: "info",
    title: `${bank.name} funded you`,
    body: `$${amount.toLocaleString("en-US")} at ${loan.apr.toFixed(2)}% APR · $${loan.weeklyPayment.toLocaleString("en-US")}/wk · FICO ${Math.round(state.creditScore)}.`,
  });
  return null;
}

export function openCard(state: GameState, bankId: string): string | null {
  const bank = BANKS.find((b) => b.id === bankId);
  if (!bank) return "Unknown bank.";
  if (state.creditScore < bank.minScore) return `${bank.name} wants ${bank.minScore}+. You're at ${Math.round(state.creditScore)}.`;
  if (state.cards.some((c) => c.bankId === bankId)) return "You already hold that card.";
  const limit = cardLimitForScore(state.creditScore, bank.id);
  const apr = aprForScore(bank.cardApr, state.creditScore);
  state.cards.push({ id: nid(state, "cc"), bankId: bank.id, name: `${bank.name} Visa`, limit, used: 0, apr });
  state.creditScore = clamp(state.creditScore - 6, 300, 850);
  pushNotif(state, {
    tone: "info",
    title: `${bank.name} Visa approved`,
    body: `Limit $${limit.toLocaleString("en-US")} · ${apr.toFixed(2)}% APR. Hard pull −6 FICO.`,
  });
  return null;
}

export function buyHouse(state: GameState, catalogId: string, plan: PayPlan): string | null {
  const h = HOUSES.find((x) => x.id === catalogId);
  if (!h) return "Listing gone.";
  const you = playerArtist(state);
  const fame = you?.fame ?? state.labelRep;
  if (fame < h.fameNeed) return "They're not selling to a nobody.";
  if (state.houses.some((x) => x.catalogId === catalogId)) return "You already own that.";
  let mortgageId: string | null = null;
  if (plan.mode === "mortgage") {
    const quote = mortgageQuote(state, h.price);
    if (!quote.allowed) return quote.reason;
    const paid = settleDue(state, quote.dueNow, plan);
    if (paid) return paid;
    const loan = originateLoan(state, quote.bankId, quote.financed, "house", quote.weeks, quote.apr);
    if (typeof loan === "string") return loan;
    mortgageId = loan.id;
    pushNotif(state, {
      tone: "good",
      title: `Keys to ${h.name}`,
      body: `${h.city}. ${h.beds} bed. ${quote.minDownPct * 100}% down at ${quote.apr.toFixed(2)}% · ${describePay(plan, quote.dueNow)}.`,
    });
  } else {
    const paid = settleDue(state, h.price, plan);
    if (paid) return paid;
    pushNotif(state, { tone: "good", title: `Keys to ${h.name}`, body: `${h.city}. ${h.beds} bed. Paid in full.` });
  }
  state.houses.push({ catalogId: h.id, name: h.name, city: h.city, value: h.price, weekBought: state.week, mortgageId });
  unlockAchievement(state, "house");
  return null;
}

export function buyCar(state: GameState, catalogId: string, plan: PayPlan): string | null {
  const c = CARS.find((x) => x.id === catalogId);
  if (!c) return "Lot's empty.";
  const you = playerArtist(state);
  const fame = you?.fame ?? state.labelRep;
  if (fame < c.fameNeed) return "The desk laughed.";
  if (state.cars.some((x) => x.catalogId === catalogId && !x.lease)) return "You already own that.";
  const lease = plan.mode === "lease";
  const finance = plan.mode === "loan" || lease;
  let loanId: string | null = null;
  if (finance) {
    const quote = autoQuote(state, c.price, lease ? "lease" : "loan", c.id);
    if (!quote.allowed) return quote.reason;
    const paid = settleDue(state, quote.dueNow, plan);
    if (paid) return paid;
    const loan = originateLoan(state, quote.bankId, Math.max(quote.financed, quote.weekly * quote.weeks), lease ? "lease" : "car", quote.weeks, quote.apr);
    if (typeof loan === "string") return loan;
    loan.weeklyPayment = quote.weekly;
    loan.remaining = lease ? quote.weekly * quote.weeks : quote.financed;
    loan.principal = loan.remaining;
    loanId = loan.id;
    pushNotif(state, {
      tone: "good",
      title: lease ? `Leased a ${c.name}` : `Parked a ${c.name}`,
      body: `${quote.reason} · ${quote.apr.toFixed(2)}% · $${quote.weekly.toLocaleString("en-US")}/wk · ${describePay(plan, quote.dueNow)}.`,
    });
  } else {
    const paid = settleDue(state, c.price, plan);
    if (paid) return paid;
    pushNotif(state, { tone: "good", title: `Parked a ${c.name}`, body: "Paid in full. It photographs." });
  }
  state.cars.push({
    catalogId: c.id,
    name: c.name,
    value: lease ? 0 : c.price,
    weekBought: state.week,
    loanId,
    lease,
  });
  unlockAchievement(state, "car");
  return null;
}

export function fulfillCheckout(state: GameState, draft: CheckoutDraft, plan: PayPlan, rng: Rng): string | null {
  switch (draft.kind) {
    case "house":
      return buyHouse(state, draft.id, plan);
    case "car":
      return buyCar(state, draft.id, plan);
    case "jet":
      return buyJet(state, draft.id, plan);
    case "jewelry":
      return buyJewelry(state, draft.id, plan);
    case "luxury":
      return privateDay(state, draft.id, plan);
    case "gift":
      return sendGift(state, draft.id, plan);
    case "night":
      return goOut(state, rng, draft.id, plan);
    case "studio":
      return upgradeStudio(state, plan);
    case "stock":
      return restockMerch(state, draft.id, draft.extra?.n ?? 30, plan);
    case "coach":
      if (!draft.extra?.artistId || !draft.extra.skill) return "Missing session.";
      return coach(state, draft.extra.artistId, draft.extra.skill, draft.price, draft.extra.gain ?? 2, plan);
    case "lawyer":
      return hireLawyer(state, rng, draft.extra?.caseId ?? draft.id, draft.extra?.lawyerId ?? draft.id, plan);
    case "bail":
      return postBail(state, draft.id, plan);
    case "propose":
      return propose(state, plan);
    case "marry":
      return marry(state, plan);
    case "facility":
      return buildFacility(state, draft.extra?.facility ?? (draft.id as "studio" | "manufacturing" | "distribution"), plan);
    case "rehab":
      return enterRehab(state, plan);
    case "substance":
      return useSubstance(state, rng, draft.id as SubstanceId, plan);
    default:
      return fulfillFamily(state, draft, plan, rng);
  }
}

export function hireSecurity(state: GameState, n: number): string | null {
  const add = Math.max(0, Math.min(12, n));
  state.securityGuards = add;
  pushNotif(state, { tone: "info", title: `Security detail: ${add}`, body: add ? `$${add * 850}/wk. Fan meet-ups stay civil.` : "Walking alone again." });
  return null;
}

export function bookTour(state: GameState, artistId: string, name: string, venueCount: number, rng: Rng): string | null {
  const blocked = barsBlock(state, "tour");
  if (blocked) return blocked;
  const artist = state.artists.find((a) => a.id === artistId);
  if (!artist || !isControlled(state, artist)) return "Not your act.";
  syncPopularity(artist);
  const ranked = [...VENUES]
    .map((v) => ({ v, draw: venueDraw(artist, v.capacity) }))
    .sort((a, b) => a.v.capacity - b.v.capacity);
  const fillable = ranked.filter((x) => x.draw.canFill);
  const pool = fillable.length >= venueCount ? fillable : ranked;
  return bookStopsFrom(state, artist, name, pool.slice(0, venueCount).map((x) => x.v), rng);
}

export function bookSelectedTour(state: GameState, artistId: string, name: string, venueIds: string[], rng: Rng): string | null {
  const blocked = barsBlock(state, "tour");
  if (blocked) return blocked;
  const artist = state.artists.find((a) => a.id === artistId);
  if (!artist || !isControlled(state, artist)) return "Not your act.";
  if (!venueIds.length) return "Pick at least one room.";
  const venues = venueIds
    .map((id) => VENUES.find((v) => v.id === id))
    .filter((v): v is (typeof VENUES)[number] => Boolean(v));
  if (!venues.length) return "Those rooms aren't on the desk.";
  return bookStopsFrom(state, artist, name, venues, rng);
}

function bookStopsFrom(
  state: GameState,
  artist: Artist,
  name: string,
  venues: { name: string; city: string; capacity: number; ticket: number; region: RegionId }[],
  rng: Rng,
): string | null {
  const cost = 3_200 + venues.length * 1_100;
  if (state.cash < cost) return "Tour float is short.";
  if (artist.monthlyListeners < 1_200 && artist.fame < 8 && artist.popularity < 10) return "Nobody's buying tickets yet.";
  state.cash -= cost;
  const stops = venues.map((v, i) => {
    const draw = venueDraw(artist, v.capacity);
    const wobble = 0.82 + rng.next() * 0.28;
    const attendance = Math.max(8, Math.min(v.capacity, Math.round(draw.attendance * wobble)));
    return {
      id: nid(state, "st"),
      venue: v.name,
      city: v.city,
      region: v.region,
      week: state.week + i + 1,
      capacity: v.capacity,
      attendance,
      ticket: v.ticket,
      gross: attendance * v.ticket,
      festivalId: null,
      done: false,
      canFill: draw.canFill,
    };
  });
  state.tours.push({ id: nid(state, "tour"), artistId: artist.id, name: name || `${artist.name} Tour`, status: "rehearsal", stops });
  artist.energy = clamp(artist.energy - 8, 0, 100);
  pushNotif(state, {
    tone: "good",
    title: `Tour booked: ${name || artist.name}`,
    body: `${stops.length} rooms. ${stops.filter((s) => s.canFill).length} look fillable.`,
  });
  return null;
}

export function bookFestival(state: GameState, artistId: string, festivalId: string): string | null {
  const artist = state.artists.find((a) => a.id === artistId);
  const fest = FESTIVALS.find((f) => f.id === festivalId);
  if (!artist || !fest || !isControlled(state, artist)) return "Can't book that.";
  if (artist.fame < 28 && artist.monthlyListeners < 80_000) return `${fest.name} wants a name.`;
  const fee = fest.fee * (0.4 + artist.fame / 200);
  state.cash += fee;
  const tour = state.tours.find((t) => t.artistId === artistId && t.status !== "done") ?? {
    id: nid(state, "tour"),
    artistId,
    name: `${artist.name} festival run`,
    status: "active" as const,
    stops: [],
  };
  if (!state.tours.includes(tour)) state.tours.push(tour);
  tour.stops.push({
    id: nid(state, "st"),
    venue: fest.name,
    city: fest.city,
    region: fest.region,
    week: state.week + 2,
    capacity: fest.capacity,
    attendance: Math.round(fest.capacity * (0.15 + artist.fame / 200)),
    ticket: 0,
    gross: fee,
    festivalId: fest.id,
    done: false,
    canFill: true,
  });
  unlockAchievement(state, "festival");
  pushNotif(state, { tone: "viral", title: `${fest.name} booked`, body: `Fee $${Math.round(fee).toLocaleString("en-US")}.` });
  return null;
}

export function coach(state: GameState, artistId: string, skill: keyof Artist["stats"], cost: number, gain: number, plan?: PayPlan): string | null {
  const artist = state.artists.find((a) => a.id === artistId);
  if (!artist || !isControlled(state, artist)) return "Not your session.";
  const paid = settleDue(state, cost, plan ?? cashPlan(cost));
  if (paid) return paid;
  artist.stats[skill] = clamp(artist.stats[skill] + gain, 0, 99);
  artist.energy = clamp(artist.energy - 8, 0, 100);
  artist.ability = Math.round((artist.stats.vocals + artist.stats.writing + artist.stats.performance) / 3);
  return null;
}

export function bookHoliday(state: GameState, artistId: string, weeks: number): string | null {
  const artist = state.artists.find((a) => a.id === artistId);
  if (!artist || !isControlled(state, artist)) return "Not them.";
  artist.onHoliday = true;
  artist.holidayWeeks = Math.max(1, weeks);
  pushNotif(state, { tone: "info", title: `${artist.name} booked off`, body: `${weeks} week(s). Energy recovers, the page forgets.` });
  return null;
}

export function dateSomeone(state: GameState, rng: Rng, catalogId?: string): string | null {
  const a = playerArtist(state);
  if (!a) return "Start as an artist.";
  if (a.relationship === "married") return "You're married.";
  ensureFamily(a);
  const pool = SUITORS.filter((s) => matchesOrientation(a, suitorGender(s.id) === "female" ? "female" : "male"));
  const seed = catalogId ? SUITORS.find((s) => s.id === catalogId) : rng.pick(pool.length ? pool : [...SUITORS]);
  if (!seed) return "They're not in town.";
  const gender = suitorGender(seed.id);
  if (!matchesOrientation(a, gender)) return "Not your type.";
  a.partner = {
    catalogId: seed.id,
    name: seed.name,
    job: seed.job,
    famous: seed.famous,
    age: seed.age,
    nationality: seed.nationality,
    hometown: seed.hometown,
    fame: seed.fame,
    netWorth: seed.netWorth,
    looks: seed.looks,
    charisma: seed.charisma,
    social: seed.social,
    avatar: makeAvatar(rng),
    closeness: catalogId ? 35 : 28,
    bio: seed.bio,
    gender,
  };
  a.relationship = "dating";
  a.mood = clamp(a.mood + 8, 0, 100);
  pushNotif(state, {
    tone: "good",
    title: `Seeing ${a.partner.name}`,
    body: `${a.partner.job}${a.partner.famous ? " · famous" : ""} · net worth $${a.partner.netWorth.toLocaleString("en-US")}.`,
  });
  return null;
}

export function propose(state: GameState, plan?: PayPlan): string | null {
  const a = playerArtist(state);
  if (!a?.partner) return "Date someone first.";
  if (a.partner.closeness < 55) return "They said not yet.";
  const ring = 8_500;
  const paid = settleDue(state, ring, plan ?? cashPlan(ring));
  if (paid) return paid;
  a.relationship = "engaged";
  a.partner.closeness = clamp(a.partner.closeness + 15, 0, 100);
  pushNotif(state, { tone: "good", title: `Engaged to ${a.partner.name}`, body: "Set a date when the tour allows." });
  return null;
}

export function marry(state: GameState, plan?: PayPlan): string | null {
  const a = playerArtist(state);
  if (!a?.partner || a.relationship !== "engaged") return "Get engaged first.";
  const cost = 22_000;
  const paid = settleDue(state, cost, plan ?? cashPlan(cost));
  if (paid) return paid;
  a.relationship = "married";
  unlockAchievement(state, "married");
  pushNotif(state, { tone: "viral", title: `Married ${a.partner.name}`, body: "X is unhinged. Instagram is worse." });
  return null;
}

export function haveKid(state: GameState, rng: Rng, opts?: { name?: string; gender?: "girl" | "boy" }): string | null {
  const a = playerArtist(state);
  if (!a) return "Artist career only.";
  if (!a.partner) return "Need a partner.";
  haveChild(state, rng, "natural", opts);
  a.energy = clamp(a.energy - 20, 0, 100);
  return null;
}

export function requestFeature(state: GameState, songId: string, guestId: string): string | null {
  const song = state.songs.find((s) => s.id === songId);
  const guest = state.artists.find((a) => a.id === guestId);
  const host = song ? state.artists.find((a) => a.id === song.artistId) : null;
  if (!song || !guest || !host) return "Can't book that feature.";
  if (!isControlled(state, host)) return "Not your record.";
  if (guest.id === host.id) return "That's you.";
  if (song.collabArtistId) return "Already has a feature.";
  return lockFeature(state, song, guest, host);
}

function lockFeature(state: GameState, song: Song, guest: Artist, host: Artist): string | null {
  syncPopularity(guest);
  const quote = featureQuote(state, guest, host);
  if (!quote.ok) return quote.reason;
  const fee = quote.fee;
  const split = quote.split;
  const paid = state.cash >= fee;
  if (paid) {
    state.cash -= fee;
    song.featureFee = fee;
    song.featureSplit = 0;
  } else {
    song.featureFee = 0;
    song.featureSplit = split;
  }
  song.collabArtistId = guest.id;
  song.promoHeat = Math.min(100, song.promoHeat + 18);
  song.lastPromoWeek = state.week;
  song.quality = clamp(song.quality + 2, 0, 99);
  growFollowers(host, "tiktok", Math.round(guest.popularity * 50), 24);
  growFollowers(host, "instagram", Math.round(guest.popularity * 28), 12);
  host.fame = clamp(host.fame + guest.popularity * 0.05, 0, 100);
  state.features.unshift({
    id: nid(state, "ft"),
    hostArtistId: host.id,
    featureArtistId: guest.id,
    songId: song.id,
    title: song.title,
    fee: paid ? fee : 0,
    status: "accepted",
    weeksLeft: 0,
    incoming: false,
  });
  const gp = profileOf(guest, "x");
  state.xMessages.unshift({
    id: nid(state, "pm"),
    week: state.week,
    from: guest.name,
    handle: gp.handle,
    text: paid
      ? `locked. verse for “${song.title}” is on the way. don’t bury me in the mix.`
      : `i’ll hop on “${song.title}” for ${Math.round(split * 100)}% of the single. send the session.`,
    avatar: gp.avatar,
    artistId: guest.id,
    kind: "collab",
    songId: song.id,
  });
  const rng = mulberry32(state.seed + state.idSeq * 17);
  announceCollab(state, rng, song);
  pushNotif(state, {
    tone: "viral",
    title: `${guest.name} on “${song.title}”`,
    body: paid
      ? `Paid $${fee.toLocaleString("en-US")}. Charts will print feat. ${guest.name}.`
      : `${guest.name} took a ${Math.round(split * 100)}% split. Charts will print feat. ${guest.name}.`,
  });
  return null;
}

export function sendXDm(state: GameState, toId: string, text: string, songId?: string | null): string | null {
  const you = playerArtist(state) ?? rosterOf(state)[0];
  const them = state.artists.find((a) => a.id === toId);
  if (!you || !them) return "No one to message.";
  if (songId) {
    const err = requestFeature(state, songId, toId);
    if (err) return err;
    const yp = profileOf(you, "x");
    const body = text.trim() || `need you on this one. “${state.songs.find((s) => s.id === songId)?.title ?? "the record"}”.`;
    state.xMessages.unshift({
      id: nid(state, "pm"),
      week: state.week,
      from: you.name,
      handle: yp.handle,
      text: body,
      avatar: yp.avatar,
      artistId: them.id,
      kind: "collab",
      songId,
      outgoing: true,
    });
    return null;
  }
  const yp = profileOf(you, "x");
  const tp = profileOf(them, "x");
  const body = text.trim() || `hey ${them.name.split(" ")[0]} — got a record if you want in.`;
  state.xMessages.unshift({
    id: nid(state, "pm"),
    week: state.week,
    from: you.name,
    handle: yp.handle,
    text: body,
    avatar: yp.avatar,
    artistId: them.id,
    kind: "chat",
    outgoing: true,
  });
  const open = playerSongs(state).filter((s) => !s.collabArtistId);
  state.xMessages.unshift({
    id: nid(state, "pm"),
    week: state.week,
    from: them.name,
    handle: tp.handle,
    text:
      them.superstar || them.real
        ? open.length
          ? `manager has this. pick the single in this thread and I’ll hop on — cash or a split.`
          : "cut the single first, then slide the record in this thread. I’ll hop on."
        : open.length
          ? "say less. pick the single below and lock me in."
          : "book a single, then DM me the title. I’ll jump on it.",
    avatar: tp.avatar,
    artistId: them.id,
    kind: "chat",
  });
  return null;
}

export function answerFeature(state: GameState, offerId: string, accept: boolean, rng: Rng): string | null {
  const offer = state.features.find((f) => f.id === offerId);
  if (!offer || offer.status !== "open") return "That offer's gone.";
  if (!accept) {
    offer.status = "declined";
    pushNotif(state, { tone: "info", title: "Feature passed", body: "The verse goes to someone else." });
    return null;
  }
  const host = state.artists.find((a) => a.id === offer.hostArtistId);
  const guest = state.artists.find((a) => a.id === offer.featureArtistId);
  if (!host || !guest) return "Missing artist.";
  const you = playerArtist(state) ?? rosterOf(state)[0];

  if (offer.hopOn) {
    const song = offer.songId
      ? state.songs.find((s) => s.id === offer.songId)
      : playerSongs(state).find((s) => !s.collabArtistId);
    if (!song || !you) return "No single to put them on.";
    if (song.collabArtistId) return "That record already has a feature.";
    const err = lockFeature(state, song, guest, you);
    if (err) return err;
    offer.status = "accepted";
    return null;
  }

  if (offer.incoming) {
    state.cash += offer.fee;
    let song = offer.songId ? state.songs.find((s) => s.id === offer.songId) : null;
    if (!song) {
      song = writeSong(state, rng, host, true);
      song.status = "released";
      song.releasedWeek = state.week;
      song.title = offer.title || `${host.name} feat. ${guest.name}`;
      song.streamsWeek = Math.round((host.monthlyListeners / 4) * 0.18 + guest.popularity * 700);
      song.streams = song.streamsWeek;
      song.weekHistory = [song.streamsWeek];
      song.lastPromoWeek = state.week;
      song.promoHeat = 42;
      state.songs.push(song);
    }
    song.collabArtistId = you?.id ?? guest.id;
    song.featureFee = offer.fee;
    song.promoHeat = Math.min(100, song.promoHeat + 12);
    if (you) {
      growFollowers(you, "tiktok", Math.round(host.popularity * 40), 20);
      growFollowers(you, "instagram", Math.round(host.popularity * 28), 16);
      you.fame = clamp(you.fame + host.popularity * 0.08, 0, 100);
    }
    seedOfficialVideo(state, rng, host, song);
    announceCollab(state, rng, song);
  } else {
    if (state.cash < offer.fee) return "Can't cover the feature check.";
    state.cash -= offer.fee;
    const song = offer.songId ? state.songs.find((s) => s.id === offer.songId) : null;
    if (song) {
      song.collabArtistId = offer.featureArtistId;
      song.featureFee = offer.fee;
      song.promoHeat = Math.min(100, song.promoHeat + 18);
      song.lastPromoWeek = state.week;
      song.quality = clamp(song.quality + 2, 0, 99);
    }
    growFollowers(host, "tiktok", Math.round(guest.popularity * 50), 24);
  }
  offer.status = "accepted";
  pushNotif(state, {
    tone: "viral",
    title: offer.incoming ? `${host.name} featuring you` : `${guest.name} on the record`,
    body: `Fee $${offer.fee.toLocaleString("en-US")}. Popularity priced the verse.`,
  });
  return null;
}

function tickNpcCollabs(state: GameState, rng: Rng) {
  if (!rng.chance(0.4)) return;
  const pool = state.artists.filter((a) => a.superstar || a.real || a.fame > 18);
  const candidates = state.songs.filter(
    (s) => s.status === "released" && s.kind === "single" && !s.collabArtistId,
  );
  const open = candidates.filter((s) => {
    const host = state.artists.find((a) => a.id === s.artistId);
    return host && !isControlled(state, host);
  });
  if (!open.length || pool.length < 2) return;
  const song = rng.pick(open);
  const guests = pool.filter((a) => a.id !== song.artistId);
  if (!guests.length) return;
  song.collabArtistId = rng.pick(guests).id;
  song.promoHeat = Math.min(100, song.promoHeat + 14);
  announceCollab(state, rng, song);
  const host = state.artists.find((a) => a.id === song.artistId);
  if (host) seedOfficialVideo(state, rng, host, song);
}

function tickFeatures(state: GameState, rng: Rng) {
  if (!state.features) state.features = [];
  for (const f of state.features) {
    if (f.status !== "open") continue;
    f.weeksLeft -= 1;
    if (!f.incoming && !f.hopOn && f.weeksLeft <= 0) {
      const guest = state.artists.find((a) => a.id === f.featureArtistId);
      const you = playerArtist(state);
      const chance = guest && you ? clamp(0.22 + you.popularity / 140 - guest.popularity / 220, 0.08, 0.72) : 0.3;
      if (rng.chance(chance)) answerFeature(state, f.id, true, rng);
      else {
        f.status = "declined";
        pushNotif(state, { tone: "bad", title: "Feature declined", body: `${guest?.name ?? "They"} passed. Popularity gap.` });
      }
    }
    if ((f.incoming || f.hopOn) && f.weeksLeft <= 0 && f.status === "open") f.status = "declined";
  }
  const you = playerArtist(state) ?? rosterOf(state)[0];
  if (!you) return;

  const openIncoming = state.features.filter((f) => f.status === "open" && f.incoming).length;
  if (you.popularity >= 8 && openIncoming < 2 && rng.chance(0.28 + you.popularity / 250)) {
    const hosts = state.artists.filter((a) => a.id !== you.id && (a.superstar || a.real || a.fame > 20));
    if (hosts.length) {
      const host = rng.pick(hosts);
      syncPopularity(you);
      const fee = featureFeeFor(you);
      const hostSong = state.songs.find((s) => s.artistId === host.id && s.status === "released");
      state.features.unshift({
        id: nid(state, "ft"),
        hostArtistId: host.id,
        featureArtistId: you.id,
        songId: hostSong?.id ?? null,
        title: hostSong ? `${hostSong.title} (feat. ${you.name})` : `${host.name} feat. ${you.name}`,
        fee,
        status: "open",
        weeksLeft: 3,
        incoming: true,
      });
      const offer = state.features[0]!;
      const hp = profileOf(host, "x");
      state.xMessages.unshift({
        id: nid(state, "pm"),
        week: state.week,
        from: host.name,
        handle: hp.handle,
        text: `hey — we want you on “${offer.title}”. $${fee.toLocaleString("en-US")} for the verse. you in?`,
        avatar: hp.avatar,
        artistId: host.id,
        kind: "collab",
        offerId: offer.id,
        songId: offer.songId,
      });
      pushNotif(state, {
        tone: "good",
        title: `${host.name} DMed you`,
        body: `Feature offer · $${fee.toLocaleString("en-US")} — open X Messages.`,
      });
    }
  }

  const yourOpen = playerSongs(state).filter((s) => !s.collabArtistId);
  const openHop = state.features.filter((f) => f.status === "open" && f.hopOn).length;
  if (yourOpen.length && openHop < 2 && rng.chance(0.32 + you.popularity / 200)) {
    const song = rng.pick(yourOpen);
    const guests = state.artists.filter((a) => a.id !== you.id && !isControlled(state, a));
    if (guests.length) {
      const guest = rng.pick(guests);
      const fee = featureFeeFor(guest);
      state.features.unshift({
        id: nid(state, "ft"),
        hostArtistId: you.id,
        featureArtistId: guest.id,
        songId: song.id,
        title: song.title,
        fee,
        status: "open",
        weeksLeft: 3,
        incoming: false,
        hopOn: true,
      });
      const offer = state.features[0]!;
      const gp = profileOf(guest, "x");
      state.xMessages.unshift({
        id: nid(state, "pm"),
        week: state.week,
        from: guest.name,
        handle: gp.handle,
        text: `put me on “${song.title}”. cash ${fee.toLocaleString("en-US")} or a split — I’ll send the verse tonight.`,
        avatar: gp.avatar,
        artistId: guest.id,
        kind: "collab",
        offerId: offer.id,
        songId: song.id,
      });
      pushNotif(state, {
        tone: "good",
        title: `${guest.name} wants on the record`,
        body: `DMed you about “${song.title}”. Open X Messages or Studio.`,
      });
    }
  }
}

export function toggleMerchSite(state: GameState): string | null {
  state.merchSiteLive = !state.merchSiteLive;
  pushNotif(state, {
    tone: "info",
    title: state.merchSiteLive ? "Merch site is live" : "Merch site paused",
    body: state.merchSiteLive ? "Visits scale with fame and Instagram." : "Warehouse only.",
  });
  return null;
}

export function addMerch(state: GameState, name: string, kind: MerchItem["kind"], price: number): string | null {
  if (!name.trim()) return "Name the drop.";
  state.merch.push({
    id: nid(state, "mer"),
    name: name.trim().slice(0, 28),
    kind,
    price: Math.max(8, price),
    cost: Math.round(Math.max(8, price) * 0.28),
    stock: 30,
    sold: 0,
    autoStock: true,
  });
  return null;
}

export function restockMerch(state: GameState, id: string, n: number, plan?: PayPlan): string | null {
  const item = state.merch.find((m) => m.id === id);
  if (!item) return "Missing SKU.";
  const cost = item.cost * n;
  const paid = settleDue(state, cost, plan ?? cashPlan(cost));
  if (paid) return paid;
  item.stock += n;
  return null;
}

export function hireGuardsAndMeetup(state: GameState, artistId: string): string | null {
  const artist = state.artists.find((a) => a.id === artistId);
  if (!artist || !isControlled(state, artist)) return "Not them.";
  const cost = 1_200 + state.securityGuards * 200;
  if (state.cash < cost) return "Meetup budget short.";
  state.cash -= cost;
  const safe = state.securityGuards >= 2;
  const fans = Math.round(artist.fans * 0.02 + artist.followers.instagram * 0.01);
  growFollowers(artist, "instagram", fans * 0.4, 20);
  artist.mood = clamp(artist.mood + (safe ? 8 : -6), 0, 100);
  state.fanEvents.unshift({
    id: nid(state, "fan"),
    week: state.week,
    kind: "meetup",
    text: safe ? `${fans} fans. Security held the line.` : `Crowd got grabby. Hire more security.`,
    mood: safe ? 8 : -6,
  });
  return null;
}

export function enterEurovision(state: GameState, rng: Rng): string | null {
  const a = playerArtist(state) ?? rosterOf(state)[0];
  if (!a) return "Need an act.";
  if (a.nationality === "US") return "US acts sit this one out.";
  if (state.eurovision?.entered && state.eurovision.year === 2026 + Math.floor((state.week - 1) / 52)) {
    return "Already entered this year.";
  }
  const place = rng.int(1, 18);
  state.eurovision = { entered: true, year: 2026 + Math.floor((state.week - 1) / 52), place };
  a.fame = clamp(a.fame + (place === 1 ? 18 : place <= 5 ? 10 : 4), 0, 100);
  growFollowers(a, "tiktok", place === 1 ? 80_000 : 12_000, 400);
  unlockAchievement(state, "eurovision");
  pushNotif(state, {
    tone: place === 1 ? "viral" : "good",
    title: place === 1 ? "Eurovision winner" : `Eurovision #${place}`,
    body: `${a.name} ${place === 1 ? "takes the trophy." : "survived the televote."}`,
  });
  return null;
}

export function acceptInvestment(state: GameState, amount: number, equity: number, name: string): string | null {
  if (state.career !== "label") return "Investors want a label.";
  if (state.labelOwnedPct - equity < 35) return "You'd lose control of the company.";
  state.cash += amount;
  state.labelOwnedPct -= equity;
  state.investors.push({ name, amount, equity });
  pushNotif(state, {
    tone: "good",
    title: `${name} in`,
    body: `${amount.toLocaleString("en-US")} for ${equity}% · you still own ${state.labelOwnedPct}%.`,
  });
  return null;
}

export function takeSponsor(state: GameState, name: string, weekly: number, weeks: number): string | null {
  const you = playerArtist(state) ?? rosterOf(state)[0];
  const fame = you?.fame ?? state.labelRep;
  if (fame < 18) return "Brands want a name they can google.";
  if (state.sponsors.some((s) => s.weeksLeft > 0 && s.name === name)) return "Already on that roster.";
  state.sponsors.push({ name, weekly, weeksLeft: weeks });
  pushNotif(state, { tone: "good", title: `${name} deal`, body: `${weekly.toLocaleString("en-US")} a week for ${weeks} weeks.` });
  return null;
}

export function buildFacility(state: GameState, kind: "studio" | "manufacturing" | "distribution", plan?: PayPlan): string | null {
  const costs = { studio: 180_000, manufacturing: 240_000, distribution: 160_000 };
  if (state.facilities[kind]) return "Already built.";
  const cost = costs[kind];
  const paid = settleDue(state, cost, plan ?? cashPlan(cost));
  if (paid) return paid;
  state.facilities[kind] = true;
  if (kind === "studio") state.studioTier = Math.max(state.studioTier, 3);
  pushNotif(state, { tone: "good", title: `${kind} facility live`, body: `Cap-ex ${cost.toLocaleString("en-US")}.` });
  return null;
}

export function runAudition(state: GameState, rng: Rng): string | null {
  const cost = 3_500;
  if (state.cash < cost) return "Can't rent the room.";
  state.cash -= cost;
  const names = Array.from({ length: 4 }, () => generateArtist(rng).name);
  state.pendingAudition = { week: state.week, names };
  pushNotif(state, { tone: "info", title: "Auditions booked", body: "X Factor-style. Sign the one with the room." });
  return null;
}

export function pickAudition(state: GameState, rng: Rng, name: string): string | null {
  if (!state.pendingAudition) return "No audition on the board.";
  const seed = generateArtist(rng, { signedFame: rng.int(12, 28) });
  seed.name = name;
  seed.handle = handleize(name) || "act";
  const artist = fromSeed(state, seed, {
    signed: state.career === "label",
    labelId: state.career === "label" ? "player" : null,
    royalty: state.career === "label" ? 0.18 : 0.85,
    wage: state.career === "label" ? 1_400 : 0,
  });
  state.artists.unshift(artist);
  if (state.career === "label") artist.signedWeek = state.week;
  state.pendingAudition = null;
  pushNotif(state, { tone: "good", title: `Signed ${name} from the room`, body: "Potential is a guess. The page is the test." });
  return null;
}

export function runTalentShow(state: GameState, rng: Rng): string | null {
  const a = playerArtist(state) ?? rosterOf(state)[0];
  if (!a) return "Need an act.";
  const stage = state.talentShow?.stage ?? "none";
  if (stage === "none" || stage === "final") {
    if (state.cash < 8_000) return "Entry fee is $8,000.";
    state.cash -= 8_000;
    state.talentShow = { stage: "audition", week: state.week };
    pushNotif(state, { tone: "info", title: "Talent show audition", body: "Four chairs. Don't look down." });
    return null;
  }
  if (stage === "audition") {
    const yes = rng.chance(0.55 + a.stats.vocals / 250 + a.stats.charisma / 300);
    if (!yes) {
      state.talentShow = { stage: "none", week: state.week };
      a.mood = clamp(a.mood - 10, 0, 100);
      return "Three no's. Back to the bedroom.";
    }
    state.talentShow = { stage: "judges", week: state.week };
    growFollowers(a, "tiktok", 4_000, 200);
    pushNotif(state, { tone: "good", title: "Through to judges' houses", body: "The clip is already on TikTok." });
    return null;
  }
  if (stage === "judges") {
    const yes = rng.chance(0.48 + a.stats.performance / 220);
    if (!yes) {
      state.talentShow = { stage: "none", week: state.week };
      return "Cut at judges' houses.";
    }
    state.talentShow = { stage: "final", week: state.week };
    const votes = Math.round(a.followers.tiktok * (0.2 + rng.next() * 0.4) + 12_000);
    const win = rng.chance(0.22 + a.fame / 200);
    growFollowers(a, "tiktok", votes * 0.08, 800);
    growFollowers(a, "instagram", votes * 0.05, 400);
    a.fame = clamp(a.fame + (win ? 14 : 6), 0, 100);
    if (win) {
      state.cash += 75_000;
      pushNotif(state, { tone: "viral", title: "Talent show winner", body: "$75k, a recording week, and a For You bump." });
    } else {
      pushNotif(state, { tone: "good", title: "Finalist", body: "Didn't take the crown. The followers stayed." });
    }
    return null;
  }
  return null;
}

export function compileRelease(
  state: GameState,
  artistId: string,
  title: string,
  kind: Album["kind"],
  songIds: string[],
  format: ReleaseFormat = "both",
): string | null {
  const artist = state.artists.find((a) => a.id === artistId);
  if (!artist || !isControlled(state, artist)) return "Not your catalog.";
  const unique = [...new Set(songIds)];
  if (kind === "ep" && (unique.length < 3 || unique.length > 5)) return "An EP is 3 to 5 songs.";
  if (kind === "album" && (unique.length < 6 || unique.length > 20)) return "An album is 6 to 20 songs.";
  if (kind === "greatestHits" && unique.length < 3) return "Need three singles first.";
  const tracks: Song[] = [];
  for (const id of unique) {
    const s = state.songs.find((x) => x.id === id);
    if (!s || s.artistId !== artistId) return "Every track has to be yours.";
    if (s.status !== "mastered" && s.status !== "released") return `“${s.title}” isn't finished.`;
    if (s.albumId && state.albums.some((a) => a.id === s.albumId && a.status === "released")) {
      return `“${s.title}” is already on a project.`;
    }
    tracks.push(s);
  }
  const cost = kind === "ep" ? 4_500 : kind === "greatestHits" ? 12_000 : 14_000;
  if (state.cash < cost) return `Packaging is ${cost.toLocaleString("en-US")}.`;
  state.cash -= cost;
  const rng = mulberry32(state.seed + state.week * 19 + unique.length);
  for (const s of tracks) {
    if (s.status === "mastered") {
      const err = releaseSong(state, s.id, rng, format);
      if (err) return err;
    }
  }
  const name = title.trim() || `${artist.name} ${kind === "ep" ? "EP" : kind === "greatestHits" ? "Greatest Hits" : "LP"}`;
  attachAlbum(state, artist, name, kind, tracks, format);
  if (kind === "album" && artist.signed && artist.albumsRemaining > 0) artist.albumsRemaining -= 1;
  recomputeAlbumCharts(state);
  pushNotif(state, {
    tone: "good",
    title: `Released ${kind === "ep" ? "EP" : kind === "greatestHits" ? "Greatest Hits" : "album"} “${name}”`,
    body: `${tracks.length} tracks. Billboard 200 is watching first-week sales.`,
  });
  return null;
}

export function compileGreatestHits(state: GameState, artistId: string, rng: Rng): string | null {
  const artist = state.artists.find((a) => a.id === artistId);
  if (!artist || !isControlled(state, artist)) return "Not your catalog.";
  const hits = state.songs
    .filter((s) => s.artistId === artistId && s.status === "released" && isStreamingTrack(s) && !s.albumId)
    .sort((a, b) => b.streams - a.streams)
    .slice(0, 12);
  if (hits.length < 3) {
    const any = state.songs.filter((s) => s.artistId === artistId && s.status === "released" && isStreamingTrack(s)).length;
    if (any < 3) return "Need three singles first.";
    return "Those singles are already on a project. Write more, then compile.";
  }
  void rng;
  return compileRelease(state, artistId, `${artist.name} · Greatest Hits`, "greatestHits", hits.map((s) => s.id), "both");
}

export function applyCheat(state: GameState, kind: string, rng: Rng): string | null {
  const a = playerArtist(state) ?? rosterOf(state)[0];
  if (kind === "money") state.cash += 1_000_000;
  else if (kind === "fans" && a) {
    growFollowers(a, "tiktok", 120_000, 1000);
    growFollowers(a, "x", 120_000, 1000);
    growFollowers(a, "instagram", 120_000, 1000);
    growFollowers(a, "youtube", 120_000, 1000);
    a.weeklyStreamHistory = [20_000, 20_000, 20_000, 40_000];
    syncMonthly(a);
    applyVerification(state, a);
  } else if (kind === "skills" && a) {
    (Object.keys(a.stats) as (keyof Artist["stats"])[]).forEach((k) => {
      a.stats[k] = 95;
    });
  } else if (kind === "hit" && a) {
    const song = writeSong(state, rng, a, true);
    song.status = "released";
    song.releasedWeek = state.week;
    song.streamsWeek = 2_400_000;
    song.streams = 2_400_000;
    song.weekHistory = [0, 0, 0, 2_400_000];
    song.promoHeat = 80;
    song.lastPromoWeek = state.week;
    song.playlist = true;
    const snd = makeSound(state, song.title, a.name, song.id);
    song.soundId = snd.id;
    state.sounds.push(snd);
    state.songs.push(song);
    a.weeklyStreamHistory = [0, 0, 0, 2_400_000];
    syncMonthly(a);
  } else if (kind === "score") state.creditScore = 820;
  else if (kind === "viral" && a) {
    growFollowers(a, "tiktok", 500_000, 1000);
    a.fame = clamp(a.fame + 20, 0, 100);
    const song = state.songs.find((s) => s.artistId === a.id && s.status === "released");
    if (song) {
      song.promoHeat = 100;
      song.lastPromoWeek = state.week;
      song.streamsWeek = Math.max(song.streamsWeek, 1_800_000);
    }
  } else if (kind === "year" && a) {
    a.age += 1;
    state.week += 52;
    for (const k of a.kids) k.age += 1;
  } else if (kind === "fame" && a) {
    a.fame = 92;
    a.popularity = 88;
  } else if (kind === "jail" && a) {
    a.incarceratedWeeks = 4;
    pushNotif(state, { tone: "bad", title: "Inside", body: "Testing the bars. Four weeks." });
  } else return "Unknown cheat.";
  pushNotif(state, { tone: "info", title: "Cheat applied", body: "Testing only. The board still sees you." });
  return null;
}

function weekOfYear(week: number) {
  return ((week - 1) % 52) + 1;
}

function revealCeremonyCat(state: GameState, cat: CeremonyCat, show: string) {
  if (cat.revealed) return;
  cat.revealed = true;
  const win = cat.nominees[cat.winnerIndex];
  if (!win) return;
  const song = win.songId ? state.songs.find((s) => s.id === win.songId) : null;
  const artist = state.artists.find((a) => a.id === win.artistId);
  if (song) song.awards.push(cat.id);
  state.awards.unshift({
    id: nid(state, "aw"),
    awardId: cat.id,
    show,
    category: cat.category,
    week: state.week,
    songId: win.songId,
    artistId: win.artistId,
  });
  if (artist && isControlled(state, artist)) {
    artist.fame = clamp(artist.fame + 6, 0, 100);
    if (show.includes("Grammy")) unlockAchievement(state, "grammy");
    pushNotif(state, {
      tone: "viral",
      title: `${show}`,
      body: `${artist.name} wins ${cat.category}${song ? ` for “${song.title}”` : ""}.`,
    });
  }
}

export function skipCeremonyCategory(state: GameState): string | null {
  const cer = state.ceremony;
  if (!cer || cer.done) return "No telecast.";
  const cat = cer.categories[cer.cursor];
  if (cat) revealCeremonyCat(state, cat, cer.show);
  cer.cursor += 1;
  if (cer.cursor >= cer.categories.length) cer.done = true;
  return null;
}

export function skipCeremonyShow(state: GameState): string | null {
  const cer = state.ceremony;
  if (!cer || cer.done) return "No telecast.";
  while (!cer.done) skipCeremonyCategory(state);
  return null;
}

function tickAwards(state: GameState, rng: Rng) {
  if (state.ceremony && !state.ceremony.done) return;
  const woy = weekOfYear(state.week);
  const cal = AWARD_CALENDAR.find((a) => a.weekOfYear === woy);
  if (!cal) return;
  const cats = AWARDS.filter((a) => a.show === cal.show);
  if (!cats.length) return;
  const pool = state.songs.filter((s) => s.status === "released" && s.streams > 8_000);
  const talent = state.artists.filter((a) => a.fame > 10);
  const categories: CeremonyCat[] = [];
  for (const c of cats) {
    const noms: CeremonyNom[] = [];
    for (const s of rng.shuffle(pool.slice())) {
      if (noms.length >= 4) break;
      const art = state.artists.find((a) => a.id === s.artistId);
      if (!art) continue;
      if (noms.some((n) => n.songId === s.id)) continue;
      noms.push({ songId: s.id, artistId: art.id, name: art.name, title: s.title });
    }
    for (const a of rng.shuffle(talent.slice())) {
      if (noms.length >= 4) break;
      if (noms.some((n) => n.artistId === a.id)) continue;
      noms.push({ songId: null, artistId: a.id, name: a.name, title: a.name });
    }
    if (noms.length < 2) continue;
    let winnerIndex = 0;
    let best = -1;
    noms.forEach((n, i) => {
      const song = n.songId ? state.songs.find((s) => s.id === n.songId) : null;
      const art = state.artists.find((a) => a.id === n.artistId);
      const score = (song?.streams ?? 0) / 1e6 + (art?.fame ?? 0) + rng.gauss(0, 10);
      if (score > best) {
        best = score;
        winnerIndex = i;
      }
    });
    categories.push({ id: c.id, category: c.category, nominees: noms, winnerIndex, revealed: false });
  }
  if (!categories.length) return;
  state.ceremony = {
    id: nid(state, "cer"),
    show: cal.show,
    week: state.week,
    categories,
    cursor: 0,
    done: false,
  };
  pushNotif(state, {
    tone: "viral",
    title: `${cal.show} is live`,
    body: "Skip a category or skip the whole show. Hardware still prints either way.",
  });
}

function tickSuperstars(state: GameState, rng: Rng) {
  const stars = state.artists.filter((a) => a.superstar || a.real);
  for (const a of stars) {
    if (rng.chance(0.22)) {
      const song = writeSong(state, rng, a, true);
      song.status = "released";
      song.releasedWeek = state.week;
      const weekly = Math.round((a.monthlyListeners / 4) * (0.35 + rng.next() * 0.5));
      song.streamsWeek = weekly;
      song.streams = weekly;
      song.weekHistory = [];
      song.promoHeat = 60;
      song.lastPromoWeek = state.week;
      song.playlist = rng.chance(0.7);
      song.radioWeeks = rng.int(2, 6);
      song.radioPower = 50 + a.fame * 0.3;
      const snd = makeSound(state, song.title, a.name, song.id);
      song.soundId = snd.id;
      state.sounds.push(snd);
      state.songs.push(song);
      const clip = ownedStyleClip(state, rng, a, song, snd, false);
      clip.owned = false;
      clip.views = Math.round(weekly * 0.8);
      state.clips.unshift(clip);
      if (rng.chance(0.62)) {
        const guests = stars.filter((x) => x.id !== a.id);
        if (guests.length) {
          song.collabArtistId = rng.pick(guests).id;
          announceCollab(state, rng, song);
        }
      }
      seedOfficialVideo(state, rng, a, song);
    }
    // Superstars keep feeding their current hits
    for (const s of state.songs.filter((x) => x.artistId === a.id && x.status === "released")) {
      if (rng.chance(0.55)) {
        s.lastPromoWeek = state.week;
        s.promoHeat = Math.min(100, s.promoHeat + 8);
      }
    }
  }
}

export function tickWeek(state: GameState, rng: Rng) {
  state.week += 1;
  const ledger = emptyLedger();
  const roster = rosterOf(state);

  if (state.week % 52 === 1 && state.week > 1) {
    for (const a of state.artists) a.age += 1;
    for (const a of roster) {
      for (const k of a.kids) {
        k.age += 1;
        if (k.age >= 5 && k.school === "none yet") k.school = "public";
      }
    }
  }

  if (state.career === "label") {
    let payroll = 2_400 + state.studioTier * 900 + state.ceoSalary;
    for (const a of roster) payroll += a.wage;
    state.cash -= payroll;
    ledger.payroll = payroll;
  } else {
    const living = state.dealKind === "signed" ? 650 : 1_050;
    const overhead = 280 + state.studioTier * 220;
    state.cash -= living + overhead;
    ledger.living = living;
    ledger.payroll = overhead;
  }

  let housing = 0;
  for (const h of state.houses) {
    const cat = HOUSES.find((x) => x.id === h.catalogId);
    if (cat) housing += cat.weekly;
  }
  let cars = 0;
  for (const c of state.cars) {
    const cat = CARS.find((x) => x.id === c.catalogId);
    if (cat) cars += cat.weekly;
  }
  const security = state.securityGuards * 850;
  state.cash -= housing + cars + security;
  ledger.housing = housing;
  ledger.cars = cars;
  ledger.security = security;

  let interest = 0;
  for (const loan of state.loans) {
    if (loan.weeksLeft <= 0) continue;
    const pay = Math.min(loan.weeklyPayment, loan.remaining);
    state.cash -= pay;
    loan.remaining = Math.max(0, loan.remaining - pay);
    loan.weeksLeft -= 1;
    interest += pay;
    if (loan.remaining <= 0) {
      loan.weeksLeft = 0;
      state.creditScore = clamp(state.creditScore + 8, 300, 850);
      if (loan.purpose === "lease") {
        const gone = state.cars.filter((c) => c.loanId === loan.id);
        if (gone.length) {
          state.cars = state.cars.filter((c) => c.loanId !== loan.id);
          pushNotif(state, {
            tone: "info",
            title: "Lease ended",
            body: `${gone.map((c) => c.name).join(", ")} went back to the desk.`,
          });
        }
      }
    }
  }
  for (const card of state.cards) {
    if (card.used <= 0) continue;
    const min = Math.max(25, Math.round(card.used * (card.apr / 100 / 52) + card.used * 0.02));
    const want = state.cardAutopay ? Math.min(card.used, Math.max(0, state.cash)) : Math.min(min, state.cash);
    const pay = Math.max(0, want);
    state.cash -= pay;
    const interestCharge = card.used * (card.apr / 100 / 52);
    card.used = Math.max(0, card.used - pay + interestCharge);
    interest += pay;
    if (state.cardAutopay && pay > 0) {
      pushStatement(state, `${card.name} autopay`, -pay, "auto");
      if (pay >= min) state.creditScore = clamp(state.creditScore + 0.35, 300, 850);
    }
  }
  ledger.interest = interest;
  if (state.cash >= 0 && state.loans.every((l) => l.weeksLeft === 0 || l.remaining > 0)) {
    state.creditScore = clamp(state.creditScore + 0.15, 300, 850);
  }
  if (state.cash < 0) state.creditScore = clamp(state.creditScore - 4, 300, 850);

  for (const a of state.artists) {
    if (!isControlled(state, a) && !a.signed && !a.superstar) continue;
    if (a.onHoliday) {
      a.holidayWeeks -= 1;
      a.energy = clamp(a.energy + 40, 0, 100);
      a.mood = clamp(a.mood + 6, 0, 100);
      if (a.holidayWeeks <= 0) a.onHoliday = false;
    } else {
      a.energy = clamp(a.energy + 28 + a.stats.workEthic * 0.12, 0, 100);
      a.mood = clamp(a.mood + rng.gauss(0, 4), 10, 100);
    }
    a.tiktokPostsThisWeek = 0;
    a.xPostsThisWeek = 0;
    a.gramPostsThisWeek = 0;
    if (a.partner) a.partner.closeness = clamp(a.partner.closeness + rng.gauss(0, 3), 5, 100);
    if (a.aiControl && isControlled(state, a) && rng.chance(0.45) && !a.onHoliday) {
      const mastered = state.songs.find((s) => s.artistId === a.id && s.status === "mastered");
      if (mastered) releaseSong(state, mastered.id, rng);
      else if (!state.songs.some((s) => s.artistId === a.id && (s.status === "writing" || s.status === "recording"))) {
        startSong(state, a.id, rng);
      }
    }
  }

  for (const song of state.songs) {
    song.weekPayout = 0;
    if (song.status === "writing") {
      song.weeksLeft -= 1;
      if (song.weeksLeft <= 0) {
        song.status = "recording";
        song.weeksLeft = 1;
        const artist = state.artists.find((a) => a.id === song.artistId);
        pushNotif(state, { tone: "info", title: `Tracking “${song.title}”`, body: artist ? `${artist.name} is in the booth.` : "In the booth." });
      }
    } else if (song.status === "recording") {
      song.weeksLeft -= 1;
      if (song.weeksLeft <= 0) {
        song.status = "mixing";
        song.weeksLeft = 1;
      }
    } else if (song.status === "mixing") {
      song.weeksLeft -= 1;
      if (song.weeksLeft <= 0) {
        song.status = "mastered";
        song.quality = qualityOf(song);
        pushNotif(state, { tone: "good", title: `Mastered “${song.title}”`, body: `Quality ${song.quality}. Release when you're ready to feed TikTok.` });
      }
    } else if (song.status === "released") {
      const gained = weeklyOrganic(state, song, rng);
      const pending = song.streamsPending;
      song.streams += gained;
      song.streamsWeek = pending + gained;
      song.streamsPending = 0;
      song.weekHistory = [...song.weekHistory, song.streamsWeek].slice(-8);
      song.sales += Math.round(gained * 0.0018);
      const fmt = song.releaseFormat ?? "both";
      const digitalMul = fmt === "cd" ? 0.28 : 1;
      const physicalMul = fmt === "digital" ? 0.12 : fmt === "cd" ? 1.8 : 1;
      const plant = state.facilities.manufacturing ? 1.6 : 1;
      const d = Math.round(gained * 0.001 * digitalMul);
      const p = Math.round(gained * (state.facilities.manufacturing ? 0.00022 : 0.00005) * physicalMul * plant);
      song.salesDigitalWeek = d;
      song.salesPhysicalWeek = p;
      song.salesDigital += d;
      song.salesPhysical += p;
      if (song.radioWeeks > 0) song.radioWeeks -= 1;
      song.promoHeat = Math.max(0, song.promoHeat * 0.72 - 2);
      song.tiktokHeat = Math.max(0, song.tiktokHeat * 0.6);
      song.videoHeat = Math.max(0, song.videoHeat * 0.78);
      paintRegionalWeek(
        state,
        song,
        song.streamsWeek,
        d,
        p,
        song.radioWeeks > 0 ? song.radioPower : Math.round(song.radioPower * 0.2),
        true,
      );
    }
  }

  for (const album of state.albums ?? []) {
    if (album.status !== "released") continue;
    const tracks = album.songIds.map((id) => state.songs.find((s) => s.id === id)).filter((s): s is Song => !!s);
    album.streamsWeek = tracks.reduce((n, s) => n + (s.streamsWeek || 0), 0);
    album.streams = tracks.reduce((n, s) => n + (s.streams || 0), 0);
    album.salesDigitalWeek = Math.round(album.streamsWeek * 0.00032 + tracks.length * 6);
    album.salesPhysicalWeek = Math.round(album.streamsWeek * 0.00004 * Math.max(1, Math.sqrt(tracks.length)));
    album.salesDigital += album.salesDigitalWeek;
    album.salesPhysical += album.salesPhysicalWeek;
    album.albumUnits = albumWeekUnits(album, tracks);
  }

  for (const clip of state.clips) {
    const age = Math.max(0, state.week - clip.week);
    const decay = Math.pow(0.62, age);
    const residual = Math.round(clip.views * 0.08 * decay * (1 + Math.log10(1 + clip.soundUses) * 0.2));
    clip.viewsWeek = residual;
    clip.views += residual;
  }
  state.clips = state.clips.slice(0, 110);

  for (const v of state.videos) {
    v.viewsWeek = Math.round(v.viewsWeek * 0.55);
    v.views += v.viewsWeek;
  }

  for (const c of state.campaigns) c.weeksLeft -= 1;
  state.campaigns = state.campaigns.filter((c) => c.weeksLeft > 0);

  tickSuperstars(state, rng);
  tickNpcCollabs(state, rng);
  tickFeatures(state, rng);

  // Per-artist weekly stream totals → monthly listeners (exactly 4 weeks)
  const weeklyByArtist = new Map<string, number>();
  for (const song of state.songs) {
    if (song.status !== "released") continue;
    weeklyByArtist.set(song.artistId, (weeklyByArtist.get(song.artistId) ?? 0) + song.streamsWeek);
  }
  for (const a of state.artists) {
    const w = weeklyByArtist.get(a.id) ?? 0;
    a.weeklyStreamHistory = [...a.weeklyStreamHistory, w].slice(-4);
    syncMonthly(a);
    syncPopularity(a);
    ensureArtistExtras(a);
    applyVerification(state, a, isControlled(state, a));
  }

  recomputeCharts(state);
  recomputeRadioCharts(state);
  recomputeAlbumCharts(state);

  for (const song of state.songs) {
    if (song.status !== "released") continue;
    const artist = state.artists.find((a) => a.id === song.artistId);
    if (!artist) continue;
    const streamGross = song.streamsWeek * STREAM_RATE;
    const cBonus = isControlled(state, artist) ? chartBonus(song.chart) : 0;
    const rBonus = isControlled(state, artist) ? radioBonus(song.radioChart, song.radioPower, song.radioWeeks) : 0;
    const gross = streamGross + cBonus + rBonus;
    const cut0 = playerShare(state, artist, gross);
    const split = song.featureSplit > 0 && song.collabArtistId ? song.featureSplit : 0;
    const cut = Math.round(cut0 * (1 - split));
    song.weekPayout = cut;
    if (cut > 0) {
      state.cash += cut;
      ledger.streams += playerShare(state, artist, streamGross);
      ledger.chartBonus += playerShare(state, artist, cBonus);
      ledger.radio += playerShare(state, artist, rBonus);
    }
  }

  for (const a of roster) {
    const weeklyStreams = weeklyByArtist.get(a.id) ?? 0;
    const tokViews = state.clips.filter((c) => c.artistId === a.id && c.owned).reduce((n, c) => n + c.viewsWeek, 0);
    growFollowers(a, "x", tokViews * 0.01 + weeklyStreams * 0.004 + a.fame * 2, 4);
    growFollowers(a, "instagram", tokViews * 0.012 + a.stats.looks * 1.4, 4);
    growFollowers(a, "youtube", weeklyStreams * 0.01 + tokViews * 0.002, 3);
    growFollowers(a, "tiktok", tokViews * 0.003 + (weeklyStreams > 10_000 ? 20 : 4), 2);
    applyVerification(state, a);

    const touring = state.tours.some((t) => t.artistId === a.id && t.status !== "done");
    const showGross = touring ? a.monthlyListeners * 0.04 + a.fame * 80 : Math.round(a.monthlyListeners * 0.01);
    const merchGross = state.merchSiteLive
      ? a.followers.instagram * 0.04 + a.followers.tiktok * 0.012 + a.fans * 0.03
      : Math.round((a.followers.instagram + a.followers.tiktok) * 0.004);
    const showCut = playerShare(state, a, showGross);
    const merchCut = playerShare(state, a, merchGross);
    state.cash += showCut + merchCut;
    ledger.shows += showCut;
    ledger.merch += merchCut;

    if (a.albumsRemaining === 1 && a.signed) {
      pushNotif(state, { tone: "bad", title: `1 album remaining · ${a.name}`, body: "The option year is staring." });
    }
  }

  for (const tour of state.tours) {
    if (tour.status === "rehearsal") tour.status = "active";
    for (const stop of tour.stops) {
      if (!stop.done && stop.week <= state.week) {
        stop.done = true;
        const cut = Math.round(stop.gross * 0.7);
        state.cash += cut;
        ledger.shows += cut;
        const art = state.artists.find((x) => x.id === tour.artistId);
        if (art) art.energy = clamp(art.energy - 10, 0, 100);
      }
    }
    if (tour.stops.every((s) => s.done)) {
      tour.status = "done";
      unlockAchievement(state, "tour");
    }
  }

  if (state.merchSiteLive) {
    const you = roster[0];
    const visits = you ? Math.round(you.followers.instagram * 0.04 + you.fame * 40) : 80;
    state.merchVisitsWeek = visits;
    for (const item of state.merch) {
      const sold = Math.min(item.stock, Math.round(visits * 0.02 * (30 / Math.max(12, item.price))));
      item.sold += sold;
      item.stock -= sold;
      const profit = sold * (item.price - item.cost);
      state.cash += profit;
      ledger.merch += profit;
      if (item.autoStock && item.stock < 15) {
        const buy = 30;
        const cost = buy * item.cost;
        if (state.cash > cost) {
          state.cash -= cost;
          item.stock += buy;
        }
      }
    }
  }

  for (const sp of state.sponsors) {
    if (sp.weeksLeft <= 0) continue;
    state.cash += sp.weekly;
    ledger.other += sp.weekly;
    sp.weeksLeft -= 1;
  }

  tickAwards(state, rng);
  tickLife(state, rng, ledger);
  tickPregnancy(state, rng);
  tickKids(state, ledger);
  tickGigs(state, rng);
  refreshHollywood(state, rng);

  if (rng.chance(0.4) && roster.length) {
    const a = rng.pick(roster);
    const roll = rng.next();
    if (roll < 0.2) {
      a.mood = clamp(a.mood - 14, 5, 100);
      const g = growFollowers(a, "x", rng.int(400, 5000), 80);
      pushNotif(state, { tone: "bad", title: `${a.name} in the tabloids`, body: `Mood down. X +${g.toLocaleString("en-US")} anyway.` });
    } else if (roll < 0.45) {
      const pay = state.career === "artist" ? 4_500 : 8_000;
      state.cash += pay;
      ledger.other += pay;
      pushNotif(state, { tone: "good", title: "Brand desk called", body: `${a.name} landed a placement.` });
    } else if (roll < 0.65) {
      a.energy = clamp(a.energy - 20, 0, 100);
      pushNotif(state, { tone: "info", title: `${a.name} wants a week off camera`, body: "Energy is a resource." });
    }
  }

  if (state.career === "artist" && state.dealKind === "signed") {
    const a = playerArtist(state);
    const song = a ? state.songs.find((s) => s.artistId === a.id && s.status === "released" && s.radioWeeks <= 0) : null;
    if (song && rng.chance(0.45)) {
      song.radioWeeks = Math.max(song.radioWeeks, 3);
      song.radioPower = Math.max(song.radioPower, 50 + song.quality * 0.2);
      song.lastPromoWeek = state.week;
      pushNotif(state, { tone: "info", title: `${state.labelName} worked radio`, body: `“${song.title}” is getting spins.` });
    }
  }

  if (state.week % 4 === 0) refreshSongMarket(state, rng);
  seedXWeek(state, rng);
  maybeDeals(state, rng);
  refreshTrends(state, rng);
  state.labelRep = clamp(state.labelRep + (roster.length ? 0.15 : -0.05), 0, 100);

  if (state.career === "artist" && state.dealKind === "independent" && state.week >= 20) unlockAchievement(state, "independent");
  if (state.cash >= 1_000_000) unlockAchievement(state, "millionaire");
  const millionSong = playerSongs(state).find((s) => s.streams >= 1_000_000);
  if (millionSong) unlockAchievement(state, "million");
  const numberOne = state.songs.find((s) => s.chart === 1 && state.artists.find((a) => a.id === s.artistId && isControlled(state, a)));
  if (numberOne) {
    unlockAchievement(state, "number-one");
    unlockAchievement(state, "billboard");
    pushNotif(state, { tone: "viral", title: `#1 Billboard 100 — “${numberOne.title}”`, body: "Streaming crown." });
    state.labelRep = clamp(state.labelRep + 3, 0, 100);
  } else if (playerSongs(state).some((s) => s.chart != null)) unlockAchievement(state, "billboard");

  ledger.gross = ledger.streams + ledger.chartBonus + ledger.radio + ledger.shows + ledger.merch + ledger.other + ledger.royalties;
  ledger.net =
    ledger.gross -
    ledger.payroll -
    ledger.promo -
    ledger.studio -
    ledger.living -
    ledger.housing -
    ledger.cars -
    ledger.security -
    ledger.interest -
    ledger.nightlife -
    ledger.legal -
    ledger.luxury;
  state.ledger = ledger;

  if (ledger.gross > 0) pushStatement(state, "Weekly deposits", Math.round(ledger.gross), "income");

  if (state.cash < 0) {
    pushNotif(state, { tone: "bad", title: "Overdrawn", body: "FICO is watching. Land a clip or take a loan." });
  }

  for (const song of state.songs) if (song.status !== "released") song.streamsWeek = 0;
}

function seedXWeek(state: GameState, rng: Rng) {
  const pool = state.artists.filter((a) => a.signed || a.followers.x > 2000 || a.superstar);
  for (let i = 0; i < 4; i++) {
    if (!pool.length) break;
    const a = rng.pick(pool);
    state.xPosts.unshift({
      id: nid(state, "p"),
      artistId: a.id,
      handle: a.handle,
      name: a.name,
      text: rng.pick(X_TEMPLATES),
      week: state.week,
      likes: rng.int(40, 9000),
      reposts: rng.int(4, 800),
      replies: rng.int(6, 400),
      owned: false,
      avatar: a.avatar,
      verified: a.verified.x,
    });
  }
  state.xPosts = state.xPosts.slice(0, 80);
}

export function weeklyBurn(state: GameState) {
  const roster = rosterOf(state);
  let n = 0;
  if (state.career === "artist") n += (state.dealKind === "signed" ? 650 : 1_050) + 280 + state.studioTier * 220;
  else n += 2400 + state.studioTier * 900 + state.ceoSalary + roster.reduce((a, x) => a + x.wage, 0);
  n += state.securityGuards * 850;
  for (const h of state.houses) n += HOUSES.find((x) => x.id === h.catalogId)?.weekly ?? 0;
  for (const c of state.cars) n += CARS.find((x) => x.id === c.catalogId)?.weekly ?? 0;
  n += state.loans.reduce((a, l) => a + (l.weeksLeft > 0 ? l.weeklyPayment : 0), 0);
  return n;
}

export function migrateSave(raw: unknown): GameState | null {
  if (!raw || typeof raw !== "object") return null;
  try {
    const s = raw as GameState;
    if (typeof s.week !== "number" || !Array.isArray(s.artists)) return null;
    const next = createInitialState(
      s.career === "artist"
        ? { career: "artist", name: "Recovered", city: s.city ?? "Los Angeles", genre: "pop", database: s.settings?.database ?? "normal" }
        : { career: "label", labelName: s.labelName ?? "Harbor", city: s.city ?? "Los Angeles", database: s.settings?.database ?? "normal" },
      s.seed ?? 1,
    );
    // Prefer structured clone of newer saves
    if (s.version >= 3 && Array.isArray(s.songs)) {
      const merged = {
        ...next,
        ...s,
        version: SAVE_VERSION,
        settings: { ...next.settings, ...(s.settings ?? {}) },
        liveViewers: s.liveViewers ?? next.liveViewers,
        features: s.features ?? [],
      } as GameState;
      for (const a of merged.artists) ensureArtistExtras(a);
      for (const song of merged.songs) {
        if (!song.releaseFormat) song.releaseFormat = "both";
        if (typeof song.featureFee !== "number") song.featureFee = 0;
        if (typeof song.featureSplit !== "number") song.featureSplit = 0;
      }
      const collabs = merged.songs.filter((s) => s.collabArtistId).length;
      if (collabs < 12 || (merged.videos?.length ?? 0) < 6) {
        const rng = mulberry32((merged.seed ?? 1) + 17);
        pairWorldFeatures(merged, rng);
        seedWorldVideos(merged, rng);
        for (const v of merged.videos) {
          const song = v.songId ? merged.songs.find((s) => s.id === v.songId) : null;
          const guest = song ? featName(merged, song) : null;
          if (guest && v.kind === "traditional" && !v.title.includes("feat.")) {
            v.title = `${song!.title} (feat. ${guest}) (Official Video)`;
          }
        }
      }
      for (const t of merged.tours) {
        for (const st of t.stops) {
          if (typeof st.canFill !== "boolean") st.canFill = st.attendance / Math.max(1, st.capacity) >= 0.7;
        }
      }
      ensureLifeState(merged);
      issueStarterCard(merged);
      return merged;
    }
    return next;
  } catch {
    return null;
  }
}

export function netWorth(state: GameState) {
  const assets =
    state.houses.reduce((n, h) => n + h.value, 0) +
    state.cars.reduce((n, c) => n + (c.lease ? 0 : c.value), 0) +
    (state.jets ?? []).reduce((n, j) => n + j.value, 0) +
    (state.jewelry ?? []).reduce((n, j) => n + j.value, 0) +
    (state.buses ?? []).reduce((n, b) => n + b.value, 0) +
    (state.lands ?? []).reduce((n, l) => n + l.value, 0) +
    (state.islands ?? []).reduce((n, i) => n + i.value, 0) +
    (state.savings ?? 0);
  const debt = state.loans.reduce((n, l) => n + l.remaining, 0) + state.cards.reduce((n, c) => n + c.used, 0);
  return state.cash + assets - debt;
}

export function ceoScore(state: GameState) {
  const roster = rosterOf(state);
  const fame = roster.reduce((n, a) => n + a.fame, 0);
  const charting = playerSongs(state).filter((s) => s.chart != null).length;
  return Math.round(state.labelRep * 2 + fame + charting * 8 + Math.log10(1 + Math.max(0, state.cash)) * 6);
}

type PromoCampaign = GameState["campaigns"][number];
type Loan = GameState["loans"][number];
type MerchItem = GameState["merch"][number];
type YtVideo = GameState["videos"][number];
