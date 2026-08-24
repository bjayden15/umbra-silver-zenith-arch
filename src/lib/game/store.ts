import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ClipFormat, GameState, Overlay, RegionId, ReleaseFormat, SocialPlatform, SubstanceId, ViewId } from "./types";
import { LEADER_KEY, SAVE_KEY, SAVE_VERSION, SLOTS_KEY } from "./types";
import { mulberry32 } from "./rng";
import {
  acceptDeal,
  addMerch,
  answerFeature,
  applyCheat,
  applyForVerify,
  acceptInvestment,
  bookFestival,
  bookHoliday,
  bookSelectedTour,
  bookTour,
  buildFacility,
  buyCar,
  buyHouse,
  buyPlaylist,
  buyRadio,
  buySongFromMarket,
  coach,
  compileGreatestHits,
  createInitialState,
  dateSomeone,
  declineDeal,
  editPlatformProfile,
  enterEurovision,
  fulfillCheckout,
  goLive,
  haveKid,
  hireGuardsAndMeetup,
  hireSecurity,
  marry,
  migrateSave,
  netWorth,
  openCard,
  pickAudition,
  playerArtist,
  postGram,
  postTikTok,
  postX,
  promoteOn,
  propose,
  refreshScout,
  releaseSong,
  requestFeature,
  restockMerch,
  runAudition,
  runTalentShow,
  sendXDm,
  shootVideo,
  signArtist,
  startSong,
  takeLoan,
  takeSponsor,
  tickWeek,
  toggleMerchSite,
  upgradeStudio,
  skipCeremonyCategory,
  skipCeremonyShow,
  type NewGameInput,
} from "./sim";
import {
  auditionFilm,
  buyJet,
  buyJewelry,
  depositSavings,
  enterRehab,
  goOut,
  hireEntourage,
  hireLawyer,
  postBail,
  privateDay,
  readMail,
  sendGift,
  setArtistPhoto,
  tryUnlockBlackCard,
  useSubstance,
  withdrawSavings,
  writeJournal,
} from "./life";
import {
  bookGig,
  hangWithKid,
  hireJetCrew,
  intimacy,
  parentAct,
  retireToKid,
} from "./family";
import type { Artist, CheckoutDraft, PayPlan, PhotoAsset } from "./types";

type UIState = {
  view: ViewId;
  overlay: Overlay;
  hydrated: boolean;
  selectedArtistId: string | null;
  feedIndex: number;
  moreTab: string;
  toasts: { id: string; text: string; tone: "info" | "good" | "bad" | "viral" }[];
  checkout: CheckoutDraft | null;
};

type Actions = {
  newGame: (input: NewGameInput) => void;
  continueGame: () => boolean;
  saveSlot: (slot: number) => void;
  loadSlot: (slot: number) => boolean;
  listSlots: () => { slot: number; label: string; week: number }[];
  setView: (view: ViewId) => void;
  setOverlay: (overlay: Overlay) => void;
  setFeedIndex: (n: number) => void;
  selectArtist: (id: string | null) => void;
  setMoreTab: (t: string) => void;
  sign: (artistId: string) => void;
  scout: () => void;
  startRecord: (artistId: string, kind?: "single" | "ep" | "album") => void;
  release: (songId: string, format?: ReleaseFormat) => void;
  radio: (songId: string) => void;
  playlist: (songId: string) => void;
  studioUp: () => void;
  tiktokPost: (input: {
    artistId: string;
    songId: string | null;
    soundId: string | null;
    format: ClipFormat;
    hashtags: string[];
    spark: number;
  }) => void;
  xPost: (artistId: string, text: string) => void;
  gramPost: (artistId: string, caption: string) => void;
  live: (artistId: string, platform: "tiktok" | "x" | "instagram" | "youtube") => void;
  video: (artistId: string, songId: string, kind: "traditional" | "lyrics" | "makingOf" | "animation" | "performance" | "general", premium: boolean) => void;
  promo: (songId: string, platform: "tiktok" | "x" | "instagram" | "youtube" | "spotify" | "radio" | "tv" | "press" | "reddit", budget: number, region?: RegionId | "global") => void;
  takeDeal: (dealId: string) => void;
  passDeal: (dealId: string) => void;
  loan: (bankId: string, amount: number, purpose: "personal" | "house" | "car" | "studio" | "label") => void;
  card: (bankId: string) => void;
  openCheckout: (draft: CheckoutDraft) => void;
  closeCheckout: () => void;
  confirmPay: (plan: PayPlan) => void;
  house: (id: string, plan: PayPlan) => void;
  car: (id: string, plan: PayPlan) => void;
  security: (n: number) => void;
  tour: (artistId: string, name: string, venues: number) => void;
  tourStops: (artistId: string, name: string, venueIds: string[]) => void;
  festival: (artistId: string, festId: string) => void;
  train: (artistId: string, skill: keyof Artist["stats"], cost: number, gain: number) => void;
  holiday: (artistId: string, weeks: number) => void;
  startDate: (catalogId?: string) => void;
  doPropose: () => void;
  doMarry: () => void;
  doKid: (opts?: { name?: string; gender?: "girl" | "boy" }) => void;
  doIntimacy: () => void;
  hangKid: (kidId: string) => void;
  retireTo: (kidId: string) => void;
  takeGig: (gigId: string) => void;
  setCrew: (pilots: number, attendants: number) => void;
  parentCall: (role: "mom" | "dad") => void;
  skipCategory: () => void;
  skipShow: () => void;
  toggleAutopay: () => void;
  applyVerify: (artistId: string, platform: SocialPlatform) => void;
  editProfile: (artistId: string, platform: SocialPlatform, patch: { handle?: string; bio?: string; avatar?: Artist["avatar"] }) => void;
  askFeature: (songId: string, guestId: string) => void;
  replyFeature: (id: string, accept: boolean) => void;
  dm: (artistId: string, text: string, songId?: string | null) => void;
  merchSite: () => void;
  newMerch: (name: string, kind: "tee" | "hoodie" | "vinyl" | "poster" | "hat" | "cd", price: number) => void;
  stock: (id: string, n: number) => void;
  meetup: (artistId: string) => void;
  euro: () => void;
  marketBuy: (id: string, artistId: string) => void;
  invest: (amount: number, equity: number, name: string) => void;
  sponsor: (name: string, weekly: number, weeks: number) => void;
  facility: (kind: "studio" | "manufacturing" | "distribution") => void;
  audition: () => void;
  pickFromAudition: (name: string) => void;
  talent: () => void;
  greatest: (artistId: string) => void;
  setDifficulty: (d: "easy" | "normal" | "hard") => void;
  cheat: (kind: string) => void;
  toggleAi: (artistId: string) => void;
  toggleAutosave: () => void;
  nextWeek: () => void;
  dismissToast: (id: string) => void;
  reset: () => void;
  uploadLeaderboard: () => void;
  setPhoto: (artistId: string, photo: PhotoAsset, platform?: SocialPlatform | "all") => void;
  saveBank: (amount: number) => void;
  takeBank: (amount: number) => void;
  black: () => void;
  crew: (role: "driver" | "chef" | "paparazzi", on: boolean) => void;
  jet: (id: string) => void;
  ice: (id: string) => void;
  gift: (id: string) => void;
  luxury: (id: string) => void;
  nightOut: (id: string) => void;
  substance: (id: SubstanceId) => void;
  rehab: () => void;
  journal: () => void;
  lawyer: (caseId: string, lawyerId: string) => void;
  bail: (caseId: string) => void;
  film: (catalogId: string) => void;
  openMail: (id: string) => void;
};

export type GameStore = { game: GameState | null } & UIState & Actions;

function toast(
  set: (fn: (s: GameStore) => Partial<GameStore> | GameStore) => void,
  text: string,
  tone: "info" | "good" | "bad" | "viral" = "info",
) {
  const id = `t_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
  set((s) => ({ toasts: [...s.toasts, { id, text, tone }].slice(-5) }));
  setTimeout(() => {
    useGame.setState((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) }));
  }, 4200);
}

function mutate(game: GameState, fn: (g: GameState) => string | null | void) {
  const next = structuredClone(game);
  const err = fn(next) ?? null;
  return { next, err };
}

function persistSlots(slots: Record<string, GameState | null>) {
  try {
    localStorage.setItem(SLOTS_KEY, JSON.stringify(slots));
  } catch {
    /* quota */
  }
}

function readSlots(): Record<string, GameState | null> {
  try {
    const raw = localStorage.getItem(SLOTS_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as Record<string, GameState | null>;
  } catch {
    return {};
  }
}

function maybeAutosave(game: GameState) {
  if (!game.settings.autosave) return;
  const slots = readSlots();
  slots.auto = game;
  persistSlots(slots);
}

function pushLeader(game: GameState) {
  try {
    const you = playerArtist(game);
    const row = {
      name: you?.name ?? game.labelName,
      score: Math.round(netWorth(game) / 1000 + (you?.fame ?? game.labelRep) * 100),
      week: game.week,
      fame: you?.fame ?? game.labelRep,
      cash: game.cash,
    };
    const raw = localStorage.getItem(LEADER_KEY);
    const list = raw ? (JSON.parse(raw) as typeof row[]) : [];
    list.push(row);
    list.sort((a, b) => b.score - a.score);
    localStorage.setItem(LEADER_KEY, JSON.stringify(list.slice(0, 25)));
  } catch {
    /* ignore */
  }
}

export const useGame = create<GameStore>()(
  persist(
    (set, get) => ({
      game: null,
      view: "hq",
      overlay: { type: "none" },
      hydrated: false,
      selectedArtistId: null,
      feedIndex: 0,
      moreTab: "home",
      toasts: [],
      checkout: null,

      newGame: (input) => {
        const game = createInitialState(input);
        set({
          game,
          view: "hq",
          overlay: { type: "none" },
          selectedArtistId: game.playerArtistId,
          feedIndex: 0,
          toasts: [],
          checkout: null,
        });
        maybeAutosave(game);
        toast(
          set,
          game.career === "artist"
            ? `${game.artists[0]?.name ?? "You"} is independent. Write a record, then own the apps.`
            : `${game.labelName} is open. Scout someone who can survive a 15-second crop.`,
          "good",
        );
      },

      continueGame: () => Boolean(get().game),

      saveSlot: (slot) => {
        const { game } = get();
        if (!game) return;
        const slots = readSlots();
        slots[String(slot)] = game;
        persistSlots(slots);
        pushLeader(game);
        toast(set, `Saved to slot ${slot}. Uploaded to leaderboard.`, "good");
      },

      loadSlot: (slot) => {
        const slots = readSlots();
        const g = slots[String(slot)] ?? (slot === 0 ? slots.auto : null);
        if (!g) {
          toast(set, "Empty slot.", "bad");
          return false;
        }
        set({ game: g, view: "hq", overlay: { type: "none" } });
        toast(set, `Loaded slot ${slot}.`, "good");
        return true;
      },

      listSlots: () => {
        const slots = readSlots();
        return [0, 1, 2, 3, 4].map((slot) => {
          const g = slot === 0 ? (slots.auto ?? slots["0"]) : slots[String(slot)];
          return {
            slot,
            label: g ? (g.career === "artist" ? (g.artists.find((a) => a.id === g.playerArtistId)?.name ?? "Artist") : g.labelName) : "Empty",
            week: g?.week ?? 0,
          };
        });
      },

      setView: (view) => set({ view, overlay: { type: "none" } }),
      setOverlay: (overlay) => set({ overlay }),
      setFeedIndex: (n) => set({ feedIndex: n }),
      selectArtist: (id) => set({ selectedArtistId: id }),
      setMoreTab: (t) => set({ moreTab: t }),

      sign: (artistId) => {
        const { game } = get();
        if (!game) return;
        const { next, err } = mutate(game, (g) => signArtist(g, artistId));
        if (err) return toast(set, err, "bad");
        set({ game: next, overlay: { type: "none" } });
        toast(set, `Signed ${next.artists.find((x) => x.id === artistId)?.name ?? "artist"}.`, "good");
      },

      scout: () => {
        const { game } = get();
        if (!game) return;
        const rng = mulberry32(game.seed + game.week * 97 + game.idSeq);
        const { next, err } = mutate(game, (g) => refreshScout(g, rng));
        if (err) return toast(set, err, "bad");
        set({ game: next });
        toast(set, "A&R brought new names.");
      },

      startRecord: (artistId, kind = "single") => {
        const { game } = get();
        if (!game) return;
        const rng = mulberry32(game.seed + game.idSeq * 13);
        const { next, err } = mutate(game, (g) => startSong(g, artistId, rng, kind));
        if (err) return toast(set, err, "bad");
        set({ game: next, view: "studio" });
        toast(set, kind === "single" ? "Session booked. Add a featured artist on the card — search anyone." : "Session booked.", "good");
      },

      release: (songId, format = "both") => {
        const { game } = get();
        if (!game) return;
        const rng = mulberry32(game.seed + game.week);
        const { next, err } = mutate(game, (g) => releaseSong(g, songId, rng, format));
        if (err) return toast(set, err, "bad");
        set({ game: next });
        toast(set, "It's out. Open TikTok and put the sound on the page.", "good");
      },

      radio: (songId) => {
        const { game } = get();
        if (!game) return;
        const { next, err } = mutate(game, (g) => buyRadio(g, songId));
        if (err) return toast(set, err, "bad");
        set({ game: next });
        toast(set, "Radio campaign is up.");
      },

      playlist: (songId) => {
        const { game } = get();
        if (!game) return;
        const rng = mulberry32(game.seed + game.week * 3);
        const { next, err } = mutate(game, (g) => buyPlaylist(g, songId, rng));
        if (err) return toast(set, err, "bad");
        set({ game: next });
      },

      studioUp: () => {
        const { game } = get();
        if (!game) return;
        const { next, err } = mutate(game, (g) => upgradeStudio(g));
        if (err) return toast(set, err, "bad");
        set({ game: next });
        toast(set, `Studio tier ${next.studioTier}.`, "good");
      },

      tiktokPost: (input) => {
        const { game } = get();
        if (!game) return;
        const rng = mulberry32(game.seed + game.idSeq * 17 + game.week * 9);
        const next = structuredClone(game);
        const { error, rollout } = postTikTok(next, rng, input);
        if (error) return toast(set, error, "bad");
        set({ game: next, overlay: { type: "rollout", clipId: rollout!.clipId }, feedIndex: 0 });
        const tone = rollout!.verdict === "flop" ? "bad" : rollout!.verdict === "solid" ? "info" : "viral";
        toast(
          set,
          `${rollout!.totalViews.toLocaleString("en-US")} views · +${rollout!.followersGained.toLocaleString("en-US")} TikTok`,
          tone,
        );
      },

      xPost: (artistId, text) => {
        const { game } = get();
        if (!game) return;
        const rng = mulberry32(game.seed + game.idSeq);
        const { next, err } = mutate(game, (g) => postX(g, rng, artistId, text));
        if (err) return toast(set, err, "bad");
        set({ game: next });
        toast(set, "Posted to X.", "good");
      },

      gramPost: (artistId, caption) => {
        const { game } = get();
        if (!game) return;
        const rng = mulberry32(game.seed + game.idSeq * 5);
        const { next, err } = mutate(game, (g) => postGram(g, rng, artistId, caption));
        if (err) return toast(set, err, "bad");
        set({ game: next });
        toast(set, "Dropped on Instagram.", "good");
      },

      live: (artistId, platform) => {
        const { game } = get();
        if (!game) return;
        const rng = mulberry32(game.seed + game.idSeq * 11);
        const { next, err } = mutate(game, (g) => goLive(g, rng, artistId, platform));
        if (err) return toast(set, err, "bad");
        set({ game: next });
        toast(set, `Live on ${platform}.`, "viral");
      },

      video: (artistId, songId, kind, premium) => {
        const { game } = get();
        if (!game) return;
        const rng = mulberry32(game.seed + game.idSeq);
        const { next, err } = mutate(game, (g) => shootVideo(g, rng, artistId, songId, kind, premium));
        if (err) return toast(set, err, "bad");
        set({ game: next });
        toast(set, "Video is up on YouTube.", "good");
      },

      promo: (songId, platform, budget, region = "global") => {
        const { game } = get();
        if (!game) return;
        const { next, err } = mutate(game, (g) => promoteOn(g, songId, platform, budget, region));
        if (err) return toast(set, err, "bad");
        set({ game: next });
        toast(set, `Promo running on ${platform}.`, "good");
      },

      takeDeal: (dealId) => {
        const { game } = get();
        if (!game) return;
        const { next, err } = mutate(game, (g) => acceptDeal(g, dealId));
        if (err) return toast(set, err, "bad");
        set({ game: next, overlay: { type: "none" }, view: "career" });
        toast(set, "Signed. Advance is in the account.", "viral");
      },

      passDeal: (dealId) => {
        const { game } = get();
        if (!game) return;
        const { next, err } = mutate(game, (g) => declineDeal(g, dealId));
        if (err) return toast(set, err, "bad");
        set({ game: next });
        toast(set, "Staying independent.");
      },

      loan: (bankId, amount, purpose) => {
        const { game } = get();
        if (!game) return;
        const { next, err } = mutate(game, (g) => takeLoan(g, bankId, amount, purpose));
        if (err) return toast(set, err, "bad");
        set({ game: next });
        toast(set, "Funds landed.", "good");
      },

      card: (bankId) => {
        const { game } = get();
        if (!game) return;
        const { next, err } = mutate(game, (g) => openCard(g, bankId));
        if (err) return toast(set, err, "bad");
        set({ game: next });
        toast(set, "Card approved.");
      },

      openCheckout: (draft) => set({ checkout: draft }),
      closeCheckout: () => set({ checkout: null }),
      confirmPay: (plan) => {
        const { game, checkout } = get();
        if (!game || !checkout) return;
        const rng = mulberry32(game.seed + game.idSeq * 19 + game.week);
        const { next, err } = mutate(game, (g) => fulfillCheckout(g, checkout, plan, rng));
        if (err) return toast(set, err, "bad");
        set({ game: next, checkout: null });
        toast(set, `${checkout.title} · paid.`, "good");
      },

      house: (id, plan) => {
        const { game } = get();
        if (!game) return;
        const { next, err } = mutate(game, (g) => buyHouse(g, id, plan));
        if (err) return toast(set, err, "bad");
        set({ game: next, checkout: null });
        toast(set, "You have keys.", "good");
      },

      car: (id, plan) => {
        const { game } = get();
        if (!game) return;
        const { next, err } = mutate(game, (g) => buyCar(g, id, plan));
        if (err) return toast(set, err, "bad");
        set({ game: next, checkout: null });
        toast(set, "Parked.", "good");
      },

      security: (n) => {
        const { game } = get();
        if (!game) return;
        const { next, err } = mutate(game, (g) => hireSecurity(g, n));
        if (err) return toast(set, err, "bad");
        set({ game: next });
      },

      tour: (artistId, name, venues) => {
        const { game } = get();
        if (!game) return;
        const rng = mulberry32(game.seed + game.idSeq);
        const { next, err } = mutate(game, (g) => bookTour(g, artistId, name, venues, rng));
        if (err) return toast(set, err, "bad");
        set({ game: next });
        toast(set, "Tour booked.", "good");
      },

      tourStops: (artistId, name, venueIds) => {
        const { game } = get();
        if (!game) return;
        const rng = mulberry32(game.seed + game.idSeq);
        const { next, err } = mutate(game, (g) => bookSelectedTour(g, artistId, name, venueIds, rng));
        if (err) return toast(set, err, "bad");
        set({ game: next });
        toast(set, "Tour booked.", "good");
      },

      festival: (artistId, festId) => {
        const { game } = get();
        if (!game) return;
        const { next, err } = mutate(game, (g) => bookFestival(g, artistId, festId));
        if (err) return toast(set, err, "bad");
        set({ game: next });
        toast(set, "Festival booked.", "viral");
      },

      train: (artistId, skill, cost, gain) => {
        const { game } = get();
        if (!game) return;
        const { next, err } = mutate(game, (g) => coach(g, artistId, skill, cost, gain));
        if (err) return toast(set, err, "bad");
        set({ game: next });
        toast(set, "Session done.", "good");
      },

      holiday: (artistId, weeks) => {
        const { game } = get();
        if (!game) return;
        const { next, err } = mutate(game, (g) => bookHoliday(g, artistId, weeks));
        if (err) return toast(set, err, "bad");
        set({ game: next });
      },

      startDate: (catalogId) => {
        const { game } = get();
        if (!game) return;
        const rng = mulberry32(game.seed + game.week);
        const { next, err } = mutate(game, (g) => dateSomeone(g, rng, catalogId));
        if (err) return toast(set, err, "bad");
        set({ game: next });
        toast(set, "You're seeing someone.", "good");
      },

      doPropose: () => {
        const { game } = get();
        if (!game) return;
        const { next, err } = mutate(game, (g) => propose(g));
        if (err) return toast(set, err, "bad");
        set({ game: next });
      },

      doMarry: () => {
        const { game } = get();
        if (!game) return;
        const { next, err } = mutate(game, (g) => marry(g));
        if (err) return toast(set, err, "bad");
        set({ game: next });
        toast(set, "Married.", "viral");
      },

      doKid: (opts) => {
        const { game } = get();
        if (!game) return;
        const rng = mulberry32(game.seed + game.idSeq);
        const { next, err } = mutate(game, (g) => haveKid(g, rng, opts));
        if (err) return toast(set, err, "bad");
        set({ game: next });
      },

      doIntimacy: () => {
        const { game } = get();
        if (!game) return;
        const rng = mulberry32(game.seed + game.idSeq * 29 + game.week);
        const { next, err } = mutate(game, (g) => intimacy(g, rng));
        if (err) return toast(set, err, "bad");
        set({ game: next });
        toast(set, next.notifs[0]?.title ?? "Night in.", next.notifs[0]?.tone === "viral" ? "viral" : "good");
      },

      hangKid: (kidId) => {
        const { game } = get();
        if (!game) return;
        const { next, err } = mutate(game, (g) => hangWithKid(g, kidId));
        if (err) return toast(set, err, "bad");
        set({ game: next });
        toast(set, "Afternoon logged.", "good");
      },

      retireTo: (kidId) => {
        const { game } = get();
        if (!game) return;
        const { next, err } = mutate(game, (g) => retireToKid(g, kidId));
        if (err) return toast(set, err, "bad");
        set({ game: next, view: "hq", selectedArtistId: next.playerArtistId });
        toast(set, `${next.artists.find((a) => a.id === next.playerArtistId)?.name ?? "Heir"} takes the name.`, "viral");
      },

      takeGig: (gigId) => {
        const { game } = get();
        if (!game) return;
        const { next, err } = mutate(game, (g) => bookGig(g, gigId));
        if (err) return toast(set, err, "bad");
        set({ game: next });
        toast(set, "Gig booked. Fee hit checking.", "good");
      },

      setCrew: (pilots, attendants) => {
        const { game } = get();
        if (!game) return;
        const { next, err } = mutate(game, (g) => hireJetCrew(g, pilots, attendants));
        if (err) return toast(set, err, "bad");
        set({ game: next });
      },

      parentCall: (role) => {
        const { game } = get();
        if (!game) return;
        const { next, err } = mutate(game, (g) => parentAct(g, role, "call"));
        if (err) return toast(set, err, "bad");
        set({ game: next });
        toast(set, "Called home.", "good");
      },

      skipCategory: () => {
        const { game } = get();
        if (!game) return;
        const { next, err } = mutate(game, (g) => skipCeremonyCategory(g));
        if (err) return toast(set, err, "bad");
        const done = next.ceremony?.done;
        set({ game: next, overlay: done ? { type: "none" } : { type: "ceremony" } });
      },

      skipShow: () => {
        const { game } = get();
        if (!game) return;
        const { next, err } = mutate(game, (g) => skipCeremonyShow(g));
        if (err) return toast(set, err, "bad");
        set({ game: next, overlay: { type: "none" } });
        toast(set, "Show skipped. Winners still print.", "info");
      },

      toggleAutopay: () => {
        const { game } = get();
        if (!game) return;
        const next = structuredClone(game);
        next.cardAutopay = !next.cardAutopay;
        set({ game: next });
        toast(set, next.cardAutopay ? "Autopay on. Checking covers the statement." : "Autopay off.", "info");
      },

      applyVerify: (artistId, platform) => {
        const { game } = get();
        if (!game) return;
        const { next, err } = mutate(game, (g) => applyForVerify(g, artistId, platform));
        if (err) return toast(set, err, "bad");
        set({ game: next });
        toast(set, "Verified. The mark is on.", "viral");
      },

      editProfile: (artistId, platform, patch) => {
        const { game } = get();
        if (!game) return;
        const { next, err } = mutate(game, (g) => editPlatformProfile(g, artistId, platform, patch));
        if (err) return toast(set, err, "bad");
        set({ game: next });
        toast(set, "Profile saved.");
      },

      askFeature: (songId, guestId) => {
        const { game } = get();
        if (!game) return;
        const { next, err } = mutate(game, (g) => requestFeature(g, songId, guestId));
        if (err) return toast(set, err, "bad");
        set({ game: next });
        const guest = next.artists.find((a) => a.id === guestId);
        const song = next.songs.find((s) => s.id === songId);
        const split = song?.featureSplit ? Math.round(song.featureSplit * 100) : 0;
        toast(
          set,
          guest
            ? split
              ? `${guest.name} is on the record · ${split}% split.`
              : `${guest.name} is on the record.`
            : "Feature locked.",
          "viral",
        );
      },

      replyFeature: (id, accept) => {
        const { game } = get();
        if (!game) return;
        const rng = mulberry32(game.seed + game.idSeq);
        const { next, err } = mutate(game, (g) => answerFeature(g, id, accept, rng));
        if (err) return toast(set, err, "bad");
        set({ game: next });
        toast(set, accept ? "Verse locked." : "Passed.", accept ? "viral" : "info");
      },

      dm: (artistId, text, songId) => {
        const { game } = get();
        if (!game) return;
        const { next, err } = mutate(game, (g) => sendXDm(g, artistId, text, songId));
        if (err) return toast(set, err, "bad");
        set({ game: next, overlay: { type: "x", tab: "messages", threadId: artistId } });
        toast(set, songId ? "Feature locked. Check the thread." : "Sent.", songId ? "viral" : "good");
      },

      merchSite: () => {
        const { game } = get();
        if (!game) return;
        const { next } = mutate(game, (g) => toggleMerchSite(g));
        set({ game: next });
      },

      newMerch: (name, kind, price) => {
        const { game } = get();
        if (!game) return;
        const { next, err } = mutate(game, (g) => addMerch(g, name, kind, price));
        if (err) return toast(set, err, "bad");
        set({ game: next });
        toast(set, "SKU added.", "good");
      },

      stock: (id, n) => {
        const { game } = get();
        if (!game) return;
        const { next, err } = mutate(game, (g) => restockMerch(g, id, n));
        if (err) return toast(set, err, "bad");
        set({ game: next });
      },

      meetup: (artistId) => {
        const { game } = get();
        if (!game) return;
        const { next, err } = mutate(game, (g) => hireGuardsAndMeetup(g, artistId));
        if (err) return toast(set, err, "bad");
        set({ game: next });
        toast(set, "Meetup wrapped.");
      },

      euro: () => {
        const { game } = get();
        if (!game) return;
        const rng = mulberry32(game.seed + game.week);
        const { next, err } = mutate(game, (g) => enterEurovision(g, rng));
        if (err) return toast(set, err, "bad");
        set({ game: next });
      },

      marketBuy: (id, artistId) => {
        const { game } = get();
        if (!game) return;
        const { next, err } = mutate(game, (g) => buySongFromMarket(g, id, artistId));
        if (err) return toast(set, err, "bad");
        set({ game: next });
        toast(set, "Song bought.", "good");
      },

      invest: (amount, equity, name) => {
        const { game } = get();
        if (!game) return;
        const { next, err } = mutate(game, (g) => acceptInvestment(g, amount, equity, name));
        if (err) return toast(set, err, "bad");
        set({ game: next });
        toast(set, `${name} wired funds.`, "good");
      },

      sponsor: (name, weekly, weeks) => {
        const { game } = get();
        if (!game) return;
        const { next, err } = mutate(game, (g) => takeSponsor(g, name, weekly, weeks));
        if (err) return toast(set, err, "bad");
        set({ game: next });
        toast(set, `${name} is on the kit.`, "good");
      },

      facility: (kind) => {
        const { game } = get();
        if (!game) return;
        const { next, err } = mutate(game, (g) => buildFacility(g, kind));
        if (err) return toast(set, err, "bad");
        set({ game: next });
        toast(set, `${kind} is up.`, "good");
      },

      audition: () => {
        const { game } = get();
        if (!game) return;
        const rng = mulberry32(game.seed + game.idSeq);
        const { next, err } = mutate(game, (g) => runAudition(g, rng));
        if (err) return toast(set, err, "bad");
        set({ game: next, overlay: { type: "scout" } });
        toast(set, "Auditions are in.");
      },

      pickFromAudition: (name) => {
        const { game } = get();
        if (!game) return;
        const rng = mulberry32(game.seed + game.idSeq);
        const { next, err } = mutate(game, (g) => pickAudition(g, rng, name));
        if (err) return toast(set, err, "bad");
        set({ game: next, overlay: { type: "none" } });
        toast(set, `Picked ${name}.`, "good");
      },

      talent: () => {
        const { game } = get();
        if (!game) return;
        const rng = mulberry32(game.seed + game.week * 17);
        const { next, err } = mutate(game, (g) => runTalentShow(g, rng));
        if (err) return toast(set, err, "bad");
        set({ game: next });
        toast(set, next.talentShow?.stage === "none" ? "That's a wrap." : `Now: ${next.talentShow?.stage}`, "good");
      },

      greatest: (artistId) => {
        const { game } = get();
        if (!game) return;
        const rng = mulberry32(game.seed + game.idSeq);
        const { next, err } = mutate(game, (g) => compileGreatestHits(g, artistId, rng));
        if (err) return toast(set, err, "bad");
        set({ game: next, view: "studio" });
        toast(set, "Greatest Hits is mastered.", "good");
      },

      setDifficulty: (d) => {
        const { game } = get();
        if (!game) return;
        const next = structuredClone(game);
        next.settings.difficulty = d;
        set({ game: next });
      },

      cheat: (kind) => {
        const { game } = get();
        if (!game) return;
        const rng = mulberry32(game.seed + game.idSeq);
        const { next, err } = mutate(game, (g) => applyCheat(g, kind, rng));
        if (err) return toast(set, err, "bad");
        set({ game: next });
        toast(set, "Cheat applied.", "info");
      },

      toggleAi: (artistId) => {
        const { game } = get();
        if (!game) return;
        const next = structuredClone(game);
        const a = next.artists.find((x) => x.id === artistId);
        if (a) a.aiControl = !a.aiControl;
        set({ game: next });
      },

      toggleAutosave: () => {
        const { game } = get();
        if (!game) return;
        const next = structuredClone(game);
        next.settings.autosave = !next.settings.autosave;
        set({ game: next });
      },

      nextWeek: () => {
        const { game } = get();
        if (!game) return;
        const rng = mulberry32(game.seed + (game.week + 1) * 101);
        const next = structuredClone(game);
        tickWeek(next, rng);
        maybeAutosave(next);
        const liveShow = Boolean(next.ceremony && !next.ceremony.done);
        set({
          game: next,
          view: liveShow ? get().view : "hq",
          overlay: liveShow ? { type: "ceremony" } : { type: "none" },
        });
        const net = next.ledger.net;
        toast(set, `Week closed · ${net >= 0 ? "+" : ""}$${Math.round(net).toLocaleString("en-US")} net`, net >= 0 ? "good" : "bad");
        const top = next.notifs[0];
        if (top && top.tone === "viral") toast(set, top.title, "viral");
      },

      dismissToast: (id) => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
      reset: () => set({ game: null, view: "hq", overlay: { type: "none" }, selectedArtistId: null }),

      setPhoto: (artistId, photo, platform = "all") => {
        const { game } = get();
        if (!game) return;
        const { next, err } = mutate(game, (g) => setArtistPhoto(g, artistId, photo, platform));
        if (err) return toast(set, err, "bad");
        set({ game: next });
        toast(set, "Photo saved. It scales across the wiki and every app.", "good");
      },

      saveBank: (amount) => {
        const { game } = get();
        if (!game) return;
        const { next, err } = mutate(game, (g) => depositSavings(g, amount));
        if (err) return toast(set, err, "bad");
        set({ game: next });
        toast(set, "In savings.", "good");
      },

      takeBank: (amount) => {
        const { game } = get();
        if (!game) return;
        const { next, err } = mutate(game, (g) => withdrawSavings(g, amount));
        if (err) return toast(set, err, "bad");
        set({ game: next });
      },

      black: () => {
        const { game } = get();
        if (!game) return;
        const { next, err } = mutate(game, (g) => tryUnlockBlackCard(g));
        if (err) return toast(set, err, "bad");
        set({ game: next });
        toast(set, "Black card issued.", "viral");
      },

      crew: (role, on) => {
        const { game } = get();
        if (!game) return;
        const { next } = mutate(game, (g) => hireEntourage(g, role, on));
        set({ game: next });
      },

      jet: (id) => {
        const { game } = get();
        if (!game) return;
        const { next, err } = mutate(game, (g) => buyJet(g, id));
        if (err) return toast(set, err, "bad");
        set({ game: next });
        toast(set, "Hangar has a new tail number.", "good");
      },

      ice: (id) => {
        const { game } = get();
        if (!game) return;
        const { next, err } = mutate(game, (g) => buyJewelry(g, id));
        if (err) return toast(set, err, "bad");
        set({ game: next });
        toast(set, "Ice landed.", "good");
      },

      gift: (id) => {
        const { game } = get();
        if (!game) return;
        const { next, err } = mutate(game, (g) => sendGift(g, id));
        if (err) return toast(set, err, "bad");
        set({ game: next });
      },

      luxury: (id) => {
        const { game } = get();
        if (!game) return;
        const { next, err } = mutate(game, (g) => privateDay(g, id));
        if (err) return toast(set, err, "bad");
        set({ game: next });
        toast(set, "The park is yours for the day.", "viral");
      },

      nightOut: (id) => {
        const { game } = get();
        if (!game) return;
        const rng = mulberry32(game.seed + game.idSeq * 23);
        const { next, err } = mutate(game, (g) => goOut(g, rng, id));
        if (err) return toast(set, err, "bad");
        set({ game: next });
        toast(set, "The room took photos.", "good");
      },

      substance: (id) => {
        const { game } = get();
        if (!game) return;
        const rng = mulberry32(game.seed + game.idSeq * 31);
        const { next, err } = mutate(game, (g) => useSubstance(g, rng, id));
        if (err) return toast(set, err, "bad");
        set({ game: next });
      },

      rehab: () => {
        const { game } = get();
        if (!game) return;
        const { next, err } = mutate(game, (g) => enterRehab(g));
        if (err) return toast(set, err, "bad");
        set({ game: next });
        toast(set, "Checked in. Four weeks.", "info");
      },

      journal: () => {
        const { game } = get();
        if (!game) return;
        const { next, err } = mutate(game, (g) => writeJournal(g));
        if (err) return toast(set, err, "bad");
        set({ game: next });
      },

      lawyer: (caseId, lawyerId) => {
        const { game } = get();
        if (!game) return;
        const rng = mulberry32(game.seed + game.idSeq);
        const { next, err } = mutate(game, (g) => hireLawyer(g, rng, caseId, lawyerId));
        if (err) return toast(set, err, "bad");
        set({ game: next });
      },

      bail: (caseId) => {
        const { game } = get();
        if (!game) return;
        const { next, err } = mutate(game, (g) => postBail(g, caseId));
        if (err) return toast(set, err, "bad");
        set({ game: next });
        toast(set, "Out on bail.", "good");
      },

      film: (catalogId) => {
        const { game } = get();
        if (!game) return;
        const rng = mulberry32(game.seed + game.idSeq * 19);
        const { next, err } = mutate(game, (g) => auditionFilm(g, rng, catalogId));
        if (err) return toast(set, err, "bad");
        set({ game: next });
        toast(set, "Hollywood called back.", "viral");
      },

      openMail: (id) => {
        const { game } = get();
        if (!game) return;
        const { next } = mutate(game, (g) => readMail(g, id));
        set({ game: next });
      },

      uploadLeaderboard: () => {
        const { game } = get();
        if (!game) return;
        pushLeader(game);
        toast(set, "Score uploaded.", "good");
      },
    }),
    {
      name: SAVE_KEY,
      partialize: (s) => ({ game: s.game }),
      version: SAVE_VERSION,
      migrate: (persisted) => {
        if (!persisted || typeof persisted !== "object") return persisted as GameStore;
        const p = persisted as { game?: unknown };
        const game = migrateSave(p.game);
        return { ...(persisted as object), game } as GameStore;
      },
      onRehydrateStorage: () => () => {
        const g = useGame.getState().game;
        if (g && g.version !== SAVE_VERSION) useGame.setState({ game: migrateSave(g) });
        useGame.setState({ hydrated: true });
      },
    },
  ),
);
