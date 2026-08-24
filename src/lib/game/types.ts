export type GenreId =
  | "pop"
  | "hiphop"
  | "rnb"
  | "rock"
  | "indie"
  | "electronic"
  | "latin"
  | "altpop"
  | "country"
  | "drill"
  | "afrobeats";

export type CareerId = "label" | "artist";
export type DatabaseId = "normal" | "real";
export type RegionId =
  | "africa"
  | "asia"
  | "europe"
  | "northamerica"
  | "southamerica"
  | "australasia";

export type SocialPlatform = "tiktok" | "x" | "instagram" | "youtube" | "spotify";
export type ReleaseFormat = "digital" | "cd" | "both";
export type PopTier = "newcomer" | "rising" | "established" | "star" | "alist" | "mega";
export type MailKind =
  | "label"
  | "sponsor"
  | "film"
  | "legal"
  | "sample"
  | "tour"
  | "producer"
  | "family"
  | "press"
  | "brand";
export type LegalKind = "fight" | "dui" | "contraband" | "fraud" | "leak";
export type FilmRole = "none" | "cameo" | "supporting" | "lead" | "voice" | "ost";
export type SubstanceId = "alcohol" | "pills" | "smoke";

export type ViewId =
  | "hq"
  | "roster"
  | "studio"
  | "charts"
  | "social"
  | "books"
  | "history"
  | "gigs"
  | "career"
  | "tours"
  | "promo"
  | "awards"
  | "bank"
  | "life"
  | "merch"
  | "family"
  | "skills"
  | "more"
  | "mail"
  | "hollywood"
  | "legal"
  | "health"
  | "nightlife";

export type TikTokTab =
  | "home"
  | "discover"
  | "create"
  | "inbox"
  | "profile"
  | "sound"
  | "analytics"
  | "live"
  | "settings";

export type XTab = "home" | "explore" | "alerts" | "messages" | "profile" | "live" | "settings";
export type GramTab = "feed" | "reels" | "profile" | "live" | "settings";
export type SpotifyTab = "home" | "search" | "library" | "artist" | "settings";
export type YouTubeTab = "home" | "shorts" | "studio" | "channel" | "live" | "settings" | "search";

export type Overlay =
  | { type: "none" }
  | { type: "tiktok"; tab: TikTokTab; clipId?: string; soundId?: string; artistId?: string }
  | { type: "x"; tab?: XTab; threadId?: string }
  | { type: "instagram"; tab?: GramTab }
  | { type: "spotify"; tab?: SpotifyTab; artistId?: string }
  | { type: "youtube"; tab?: YouTubeTab; videoId?: string; artistId?: string }
  | { type: "scout" }
  | { type: "artist"; id: string }
  | { type: "song"; id: string }
  | { type: "rollout"; clipId: string }
  | { type: "deal"; id: string }
  | { type: "wiki"; artistId: string }
  | { type: "mail" }
  | { type: "settings" }
  | { type: "saves" }
  | { type: "cheats" }
  | { type: "credits" }
  | { type: "achievements" }
  | { type: "leaderboards" }
  | { type: "admin" }
  | { type: "editor" }
  | { type: "ceremony" };

export type ClipFormat =
  | "lipsync"
  | "dance"
  | "studio"
  | "story"
  | "challenge"
  | "daylife"
  | "performance";

export type VideoKind =
  | "traditional"
  | "lyrics"
  | "makingOf"
  | "animation"
  | "performance"
  | "general";

export type ReleaseKind = "single" | "ep" | "album" | "greatestHits";

export type PhotoAsset = {
  src: string;
  zoom: number;
  panX: number;
  panY: number;
};

export type AvatarSpec = {
  skin: number;
  hair: number;
  hairColor: number;
  accent: number;
  shape: number;
  accessory: number;
  photo?: PhotoAsset | null;
};

export type Followers = {
  tiktok: number;
  x: number;
  instagram: number;
  youtube: number;
};

export type Verified = {
  tiktok: boolean;
  x: boolean;
  instagram: boolean;
  youtube: boolean;
  spotify: boolean;
};

export type PlatformProfile = {
  handle: string;
  bio: string;
  avatar: AvatarSpec;
};

export type RegionalRep = Record<RegionId, number>;

export type ArtistStats = {
  vocals: number;
  writing: number;
  dance: number;
  charisma: number;
  looks: number;
  workEthic: number;
  social: number;
  production: number;
  performance: number;
};

export type GenderId = "male" | "female";
export type OrientationId = "straight" | "gay" | "bisexual";
export type SchoolTrack = "public" | "arts" | "prep" | "tutor";

export type RelStatus = "single" | "dating" | "engaged" | "married" | "complicated";

export type Partner = {
  catalogId: string | null;
  name: string;
  job: string;
  famous: boolean;
  age: number;
  nationality: string;
  hometown: string;
  fame: number;
  netWorth: number;
  looks: number;
  charisma: number;
  social: number;
  avatar: AvatarSpec;
  closeness: number;
  bio: string;
  gender: GenderId;
};

export type ParentCard = {
  role: "mom" | "dad";
  name: string;
  age: number;
  job: string;
  closeness: number;
  avatar: AvatarSpec;
};

export type Pregnancy = {
  weeksLeft: number;
  via: "natural" | "surrogate" | "adoption";
};

export type Kid = {
  id: string;
  name: string;
  gender: "girl" | "boy";
  age: number;
  bornWeek: number;
  personality: string;
  school: string;
  schoolTrack: SchoolTrack;
  interests: string;
  talent: string;
  custody: "joint" | "yours" | "theirs";
  avatar: AvatarSpec;
  closeness: number;
  stats: ArtistStats;
  lessons: { vocal: number; dance: number; theory: number; instrument: number };
};

export type Artist = {
  id: string;
  name: string;
  handle: string;
  genre: GenreId;
  kind: "solo" | "band";
  age: number;
  nationality: string;
  hometown: string;
  bio: string;
  history: string;
  stats: ArtistStats;
  potential: number;
  ability: number;
  mood: number;
  energy: number;
  fame: number;
  fans: number;
  reputation: number;
  popularity: number;
  regionalRep: RegionalRep;
  followers: Followers;
  monthlyListeners: number;
  weeklyStreamHistory: number[];
  signed: boolean;
  labelId: string | null;
  royalty: number;
  wage: number;
  advance: number;
  albumsRemaining: number;
  signedWeek: number | null;
  avatar: AvatarSpec;
  profiles: Record<SocialPlatform, PlatformProfile>;
  tiktokPostsThisWeek: number;
  xPostsThisWeek: number;
  gramPostsThisWeek: number;
  lastTikTokWeek: number;
  verified: Verified;
  followingX: number;
  relationship: RelStatus;
  partner: Partner | null;
  kids: Kid[];
  parents: { mom: string; dad: string; closeness: number; cards: ParentCard[] };
  gender: GenderId;
  orientation: OrientationId;
  pregnancy: Pregnancy | null;
  lastIntimacyWeek: number;
  aiControl: boolean;
  onHoliday: boolean;
  holidayWeeks: number;
  hiatus: boolean;
  coaching: { vocal: number; dance: number; general: number; band: number };
  real: boolean;
  superstar: boolean;
  wikiViews: number;
  vocalHealth: number;
  mental: number;
  addiction: { alcohol: number; pills: number; smoke: number };
  rehabWeeks: number;
  incarceratedWeeks: number;
  streetCred: number;
};

export type RegionSales = {
  streams: number;
  digital: number;
  physical: number;
  radio: number;
};

export type Song = {
  id: string;
  artistId: string;
  title: string;
  genre: GenreId;
  writing: number;
  production: number;
  hook: number;
  mix: number;
  quality: number;
  status: "writing" | "recording" | "mixing" | "mastered" | "released";
  kind: ReleaseKind;
  weeksLeft: number;
  releasedWeek: number | null;
  streams: number;
  streamsWeek: number;
  streamsPending: number;
  weekHistory: number[];
  sales: number;
  salesPhysical: number;
  salesDigital: number;
  salesDigitalWeek: number;
  salesPhysicalWeek: number;
  peakChart: number | null;
  chart: number | null;
  albumChart: number | null;
  peakAlbum: number | null;
  radioWeeks: number;
  radioPower: number;
  radioChart: number | null;
  peakRadio: number | null;
  playlist: boolean;
  soundId: string | null;
  weekPayout: number;
  promoHeat: number;
  lastPromoWeek: number;
  videoHeat: number;
  tiktokHeat: number;
  regional: Record<RegionId, RegionSales>;
  awards: string[];
  cover: number;
  collabArtistId: string | null;
  featureFee: number;
  featureSplit: number;
  releaseFormat: ReleaseFormat;
  bside: boolean;
  chartPoints: number;
  albumUnits: number;
  ost: boolean;
};

export type Album = {
  id: string;
  artistId: string;
  title: string;
  kind: ReleaseKind;
  songIds: string[];
  status: "planning" | "recording" | "mixing" | "artwork" | "approved" | "released";
  releasedWeek: number | null;
  streams: number;
  streamsWeek: number;
  salesPhysical: number;
  salesDigital: number;
  chart: number | null;
  peakChart: number | null;
  cover: number;
  producer: string;
  execProducer: string;
};

export type TikTokClip = {
  id: string;
  artistId: string | null;
  creatorName: string;
  creatorHandle: string;
  songId: string | null;
  soundId: string;
  caption: string;
  format: ClipFormat;
  hashtags: string[];
  week: number;
  views: number;
  viewsWeek: number;
  likes: number;
  comments: number;
  saves: number;
  shares: number;
  soundUses: number;
  watchRate: number;
  likeRate: number;
  completion: number;
  viralStage: number;
  sparkSpend: number;
  owned: boolean;
  visual: number;
  avatar: AvatarSpec;
};

export type Sound = {
  id: string;
  name: string;
  songId: string | null;
  artistName: string;
  uses: number;
  trending: boolean;
  trendRank: number | null;
  week: number;
};

export type XPost = {
  id: string;
  artistId: string | null;
  handle: string;
  name: string;
  text: string;
  week: number;
  likes: number;
  reposts: number;
  replies: number;
  owned: boolean;
  avatar: AvatarSpec;
  verified: boolean;
};

export type GramPost = {
  id: string;
  artistId: string;
  handle: string;
  name: string;
  caption: string;
  week: number;
  likes: number;
  comments: number;
  reach: number;
  visual: number;
  avatar: AvatarSpec;
  verified: boolean;
};

export type YtVideo = {
  id: string;
  artistId: string;
  songId: string | null;
  title: string;
  kind: VideoKind;
  week: number;
  views: number;
  viewsWeek: number;
  likes: number;
  comments: number;
  quality: number;
  cost: number;
  celebrity: string | null;
  location: string | null;
};

export type Trend = {
  id: string;
  kind: "sound" | "hashtag" | "challenge";
  name: string;
  heat: number;
  soundId?: string;
};

export type Notif = {
  id: string;
  week: number;
  title: string;
  body: string;
  tone: "info" | "good" | "bad" | "viral";
};

export type InboxItem = {
  id: string;
  from: string;
  text: string;
  week: number;
  clipId?: string;
};

export type MailItem = {
  id: string;
  week: number;
  from: string;
  subject: string;
  body: string;
  kind: MailKind;
  read: boolean;
  payload?: string;
};

export type FilmRun = {
  id: string;
  catalogId: string;
  title: string;
  studio: string;
  week: number;
  budget: number;
  gross: number;
  grossWeek: number;
  status: "pre" | "shooting" | "released" | "done";
  role: FilmRole;
  artistId: string | null;
  ostSongId: string | null;
  boxRank: number | null;
  weeksLeft: number;
  pay: number;
  fameNeed?: number;
  ostOffer?: boolean;
};

export type LegalCase = {
  id: string;
  kind: LegalKind;
  week: number;
  status: "open" | "bail" | "trial" | "jailed" | "cleared";
  bail: number;
  fine: number;
  weeksLeft: number;
  lawyerId: string | null;
  note: string;
};

export type OwnedAsset = {
  catalogId: string;
  name: string;
  value: number;
  weekBought: number;
  weekly: number;
};

export type XAlert = {
  id: string;
  week: number;
  kind: "follow" | "like" | "repost" | "mention" | "chart" | "verify";
  text: string;
  handle: string;
};

export type XMessage = {
  id: string;
  week: number;
  from: string;
  handle: string;
  text: string;
  avatar: AvatarSpec;
  artistId?: string | null;
  kind?: "chat" | "collab" | "label";
  offerId?: string;
  songId?: string | null;
  outgoing?: boolean;
};

export type RivalLabel = { id: string; name: string };

export type LabelDeal = {
  id: string;
  labelId: string;
  labelName: string;
  advance: number;
  royalty: number;
  weeksLeft: number;
  albums: number;
  status: "open" | "accepted" | "expired" | "declined";
};

export type FeatureOffer = {
  id: string;
  hostArtistId: string;
  featureArtistId: string;
  songId: string | null;
  title: string;
  fee: number;
  status: "open" | "accepted" | "declined" | "done";
  weeksLeft: number;
  incoming: boolean;
  hopOn?: boolean;
};

export type TikTokStage = { name: string; views: number; passed: boolean; reason?: string };

export type TikTokRollout = {
  clipId: string;
  stages: TikTokStage[];
  totalViews: number;
  followersGained: number;
  streamsGained: number;
  xGained: number;
  instagramGained: number;
  spotifyGained: number;
  youtubeGained: number;
  verdict: "flop" | "solid" | "breakout" | "viral" | "runaway";
  tip: string;
};

export type WeekLedger = {
  streams: number;
  chartBonus: number;
  radio: number;
  shows: number;
  merch: number;
  other: number;
  royalties: number;
  payroll: number;
  promo: number;
  studio: number;
  living: number;
  housing: number;
  cars: number;
  security: number;
  interest: number;
  nightlife: number;
  legal: number;
  luxury: number;
  net: number;
  gross: number;
};

export type PayMethod = "cash" | "card" | "split";
export type FinanceMode = "outright" | "loan" | "lease" | "mortgage";

export type PayPlan = {
  method: PayMethod;
  cardId: string | null;
  cashAmount: number;
  cardAmount: number;
  mode: FinanceMode;
};

export type CheckoutKind =
  | "house"
  | "car"
  | "jet"
  | "jewelry"
  | "luxury"
  | "gift"
  | "night"
  | "studio"
  | "stock"
  | "coach"
  | "lawyer"
  | "bail"
  | "propose"
  | "marry"
  | "facility"
  | "rehab"
  | "substance"
  | "land"
  | "island"
  | "vacation"
  | "gig"
  | "bottle"
  | "lesson"
  | "school"
  | "parent"
  | "crew"
  | "build"
  | "date-night"
  | "conceive"
  | "adopt";

export type CheckoutDraft = {
  kind: CheckoutKind;
  id: string;
  title: string;
  price: number;
  financeable?: boolean;
  leasable?: boolean;
  extra?: {
    artistId?: string;
    skill?: keyof ArtistStats;
    gain?: number;
    n?: number;
    caseId?: string;
    lawyerId?: string;
    facility?: "studio" | "manufacturing" | "distribution";
    parentRole?: "mom" | "dad";
    parentAct?: "call" | "aid" | "gift" | "vip";
    kidId?: string;
    lesson?: "vocal" | "dance" | "theory" | "instrument";
    track?: SchoolTrack;
    buildOpt?: "studio" | "garage" | "theater" | "wall";
  };
};

export type Loan = {
  id: string;
  bankId: string;
  bankName: string;
  principal: number;
  remaining: number;
  apr: number;
  weeklyPayment: number;
  weeksLeft: number;
  purpose: "personal" | "house" | "car" | "studio" | "label" | "lease" | "jet";
};

export type CreditCard = {
  id: string;
  bankId: string;
  name: string;
  limit: number;
  used: number;
  apr: number;
  black?: boolean;
};

export type OwnedHouse = {
  catalogId: string;
  name: string;
  city: string;
  value: number;
  weekBought: number;
  mortgageId: string | null;
};

export type OwnedCar = {
  catalogId: string;
  name: string;
  value: number;
  weekBought: number;
  loanId: string | null;
  lease?: boolean;
};

export type MerchItem = {
  id: string;
  name: string;
  kind: "tee" | "hoodie" | "vinyl" | "poster" | "hat" | "cd";
  price: number;
  cost: number;
  stock: number;
  sold: number;
  autoStock: boolean;
};

export type TourStop = {
  id: string;
  venue: string;
  city: string;
  region: RegionId;
  week: number;
  capacity: number;
  attendance: number;
  ticket: number;
  gross: number;
  festivalId: string | null;
  done: boolean;
  canFill: boolean;
};

export type Tour = {
  id: string;
  artistId: string;
  name: string;
  status: "planning" | "rehearsal" | "active" | "done";
  stops: TourStop[];
};

export type AwardWin = {
  id: string;
  awardId: string;
  show: string;
  category: string;
  week: number;
  songId: string | null;
  artistId: string;
};

export type CeremonyNom = { songId: string | null; artistId: string; name: string; title: string };
export type CeremonyCat = {
  id: string;
  category: string;
  nominees: CeremonyNom[];
  winnerIndex: number;
  revealed: boolean;
};
export type CeremonyState = {
  id: string;
  show: string;
  week: number;
  categories: CeremonyCat[];
  cursor: number;
  done: boolean;
};

export type Statement = {
  id: string;
  week: number;
  title: string;
  amount: number;
  channel: "debit" | "credit" | "split" | "auto" | "income";
};

export type GigOffer = {
  id: string;
  name: string;
  city: string;
  kind: "club" | "corporate" | "private" | "yacht" | "wedding";
  fee: number;
  fameNeed: number;
  week: number;
  status: "open" | "booked" | "done" | "expired";
};

export type BuildJob = {
  catalogId: string;
  name: string;
  city: string;
  value: number;
  weekBought: number;
  studioWing: boolean;
  garage: boolean;
  theater: boolean;
  wall: boolean;
};

export type PromoCampaign = {
  id: string;
  songId: string;
  platform: "tiktok" | "x" | "instagram" | "youtube" | "spotify" | "radio" | "tv" | "press" | "reddit";
  budget: number;
  weeksLeft: number;
  region: RegionId | "global";
};

export type FanEvent = {
  id: string;
  week: number;
  kind: "meetup" | "signing" | "livestream" | "security";
  text: string;
  mood: number;
};

export type AchievementUnlock = { id: string; week: number };

export type LeaderRow = {
  name: string;
  score: number;
  week: number;
  fame: number;
  cash: number;
};

export type Settings = {
  autosave: boolean;
  database: DatabaseId;
  difficulty: "easy" | "normal" | "hard";
  reduceMotion: boolean;
  showAwards: boolean;
  donationPrompted: boolean;
};

export type GameState = {
  version: number;
  seed: number;
  week: number;
  cash: number;
  career: CareerId;
  labelName: string;
  labelRep: number;
  labelOwnedPct: number;
  city: string;
  studioTier: number;
  playerArtistId: string | null;
  dealKind: "independent" | "signed" | "label";
  artists: Artist[];
  songs: Song[];
  albums: Album[];
  clips: TikTokClip[];
  sounds: Sound[];
  xPosts: XPost[];
  gram: GramPost[];
  videos: YtVideo[];
  xAlerts: XAlert[];
  xMessages: XMessage[];
  deals: LabelDeal[];
  features: FeatureOffer[];
  trends: Trend[];
  notifs: Notif[];
  inbox: InboxItem[];
  mail: MailItem[];
  films: FilmRun[];
  legal: LegalCase[];
  rivals: RivalLabel[];
  ledger: WeekLedger;
  idSeq: number;
  tutorial: number;
  lastRollout: TikTokRollout | null;
  creditScore: number;
  savings: number;
  savingsApr: number;
  blackCard: boolean;
  loans: Loan[];
  cards: CreditCard[];
  houses: OwnedHouse[];
  cars: OwnedCar[];
  jets: OwnedAsset[];
  jewelry: OwnedAsset[];
  buses: OwnedAsset[];
  merch: MerchItem[];
  merchSiteLive: boolean;
  merchVisitsWeek: number;
  tours: Tour[];
  awards: AwardWin[];
  campaigns: PromoCampaign[];
  fanEvents: FanEvent[];
  achievements: AchievementUnlock[];
  securityGuards: number;
  entourage: { driver: boolean; chef: boolean; paparazzi: boolean };
  facilities: { studio: boolean; manufacturing: boolean; distribution: boolean };
  investors: { name: string; amount: number; equity: number }[];
  sponsors: { name: string; weekly: number; weeksLeft: number }[];
  ceoSalary: number;
  settings: Settings;
  liveViewers: Record<"tiktok" | "x" | "instagram" | "youtube", number>;
  lastLiveWeek: number;
  lastNightlifeWeek: number;
  luxuryLog: { id: string; week: number; name: string }[];
  statements: Statement[];
  cardAutopay: boolean;
  ceremony: CeremonyState | null;
  gigs: GigOffer[];
  lands: BuildJob[];
  islands: OwnedAsset[];
  jetCrew: { pilots: number; attendants: number };
  lastParentWeek: number;
  songMarket: { id: string; title: string; genre: GenreId; quality: number; price: number; writer: string }[];
  pendingAudition: { week: number; names: string[] } | null;
  eurovision: { entered: boolean; year: number; place: number | null } | null;
  talentShow: { stage: "none" | "audition" | "judges" | "final"; week: number } | null;
  updateVersion: string;
};

export const SAVE_VERSION = 7;
export const SAVE_KEY = "musicstar.save.v7";
export const SLOTS_KEY = "musicstar.slots.v7";
export const LEADER_KEY = "musicstar.leaders.v1";
export const CREATOR = "Jayden Carter";
export const GAME_TITLE = "Music Star Career";
export const GAME_SUBTITLE = "Core Systems & Game Modes";
export const TAGLINE = "Become the Ultimate Star";

export const VERIFY_AT = {
  tiktok: 100_000,
  x: 100_000,
  instagram: 100_000,
  youtube: 100_000,
  spotify: 50_000,
} as const;

export const CHART_SIZE = {
  singles: 100,
  albums: 200,
  radio: 40,
  spotify: 50,
} as const;

export const REGIONS: { id: RegionId; label: string }[] = [
  { id: "africa", label: "Africa" },
  { id: "asia", label: "Asia" },
  { id: "europe", label: "Europe" },
  { id: "northamerica", label: "North America" },
  { id: "southamerica", label: "South America" },
  { id: "australasia", label: "Australasia / Oceania" },
];
