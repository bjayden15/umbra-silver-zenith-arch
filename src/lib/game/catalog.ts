import type { AvatarSpec, ClipFormat, GenreId } from "./types";
import type { Rng } from "./rng";
import { clamp } from "./rng";
import { handleize } from "./format";

export const GENRES: { id: GenreId; label: string; hook: string }[] = [
  { id: "pop", label: "Pop", hook: "chorus-first, radio-ready" },
  { id: "hiphop", label: "Hip-Hop", hook: "bars + a pocket you can loop" },
  { id: "rnb", label: "R&B", hook: "late-night vocal runs" },
  { id: "rock", label: "Rock", hook: "guitars that punch through a phone speaker" },
  { id: "indie", label: "Indie", hook: "diary lyrics, stubborn melodies" },
  { id: "electronic", label: "Electronic", hook: "drops built for 15 seconds" },
  { id: "latin", label: "Latin", hook: "body-first rhythm" },
  { id: "altpop", label: "Alt-Pop", hook: "pretty and a little mean" },
  { id: "country", label: "Country", hook: "story in a pickup truck" },
  { id: "drill", label: "Drill", hook: "cold slides, colder captions" },
  { id: "afrobeats", label: "Afrobeats", hook: "log drums, global body" },
];

export const CITIES = [
  "Atlanta",
  "London",
  "Seoul",
  "Mexico City",
  "Toronto",
  "Lagos",
  "Stockholm",
  "Los Angeles",
  "Brooklyn",
  "Manchester",
  "São Paulo",
  "Berlin",
  "Nashville",
  "Paris",
  "Auckland",
  "Dublin",
  "Chicago",
  "Miami",
  "Osaka",
  "Lisbon",
  "Detroit",
  "Melbourne",
];

export const NATIONALITIES = [
  "US",
  "UK",
  "NG",
  "KR",
  "MX",
  "BR",
  "CA",
  "SE",
  "AU",
  "FR",
  "JP",
  "ZA",
  "IE",
  "DE",
  "PR",
];

export const RIVAL_LABELS = [
  "Apex Records",
  "Nightshade",
  "Goldline",
  "Northstar",
  "Velvet Room",
  "808 Worldwide",
  "Harbor & Co.",
  "Redline Music",
  "Republic-style",
  "Interscope desk",
];

const FIRST = [
  "Nova", "Jett", "Mila", "Cruz", "Sable", "Rio", "Eden", "Vesper", "Ash", "Luna",
  "Kai", "Maren", "Sol", "Nico", "Ivy", "Rex", "Wren", "Dax", "Pilar", "Onyx",
  "True", "Asha", "Leo", "Quinn", "Zia", "Hart", "Nia", "Cole", "Faye", "Ari",
];
const LAST = [
  "Vex", "Marlowe", "Rae", "Del Mar", "Quinn", "Vale", "Hart", "Cross", "Noel",
  "Park", "Okoye", "Silva", "Kane", "Brooks", "Cho", "Diaz", "Frost", "Lane",
  "West", "Young", "Saint", "Hollow", "Grey", "Moon", "Wilder",
];
const BAND = [
  "The Hollow Saints", "Brick Lane", "Kite & Co.", "Low Battery",
  "Night Mileage", "Velvet Static", "Afterlight", "Room 404", "Cold Chorus",
  "Paper Crowns", "Second Sky", "The Cutouts", "False Idol", "Motor Hymns",
];

const TITLE_A = [
  "Glass", "Midnight", "Slow", "Velvet", "Low", "Gold", "After", "No", "Don't",
  "3AM", "Static", "Empty", "Pretty", "Quiet", "Wild", "Blue", "Last", "First",
];
const TITLE_B = [
  "Heart", "Mileage", "Burn", "Static", "Battery", "Teeth", "Light", "Witnesses",
  "Wait", "Color", "City", "Rooms", "Lies", "Crown", "Hours", "Heaven", "Call",
];
const TITLE_SOLO = [
  "Don't Wait Up", "No Witnesses", "Low Battery", "Glass Heart", "Midnight Mileage",
  "Slow Burn City", "3AM in Color", "Velvet Static", "Gold Teeth", "Afterlight",
  "Room 404", "Pretty Problems", "Stay Gone", "On Repeat", "Unlisted",
  "Last Chorus", "Body Language", "For You Page", "Shadowban", "Main Character",
];

export const FORMATS: { id: ClipFormat; label: string; hint: string; hookBias: number; socialBias: number }[] = [
  { id: "lipsync", label: "Lip-sync", hint: "Sell the hook with your face", hookBias: 0.15, socialBias: 0.1 },
  { id: "dance", label: "Dance", hint: "If the beat moves, people stay", hookBias: 0.2, socialBias: 0.05 },
  { id: "studio", label: "Studio clip", hint: "Process as content. Fans love the booth.", hookBias: 0.05, socialBias: 0.05 },
  { id: "story", label: "Storytime", hint: "Talk to camera over the sound", hookBias: -0.05, socialBias: 0.2 },
  { id: "challenge", label: "Challenge", hint: "Ride a trend, don't invent one", hookBias: 0.1, socialBias: 0.15 },
  { id: "daylife", label: "Day in the life", hint: "Soft fame. Slow follow growth.", hookBias: -0.1, socialBias: 0.12 },
  { id: "performance", label: "Live take", hint: "Vocals on the table. High-risk, high-rewatch.", hookBias: 0.12, socialBias: 0 },
];

export const HASHTAGS = [
  "fyp", "viral", "newsound", "unsigned", "label", "studio", "chorus", "hook",
  "relatable", "night", "city", "heartbreak", "flex", "demo", "session",
];

export const NPC_CREATORS = [
  "mira.moves", "loopkid", "afterhours", "cityghost", "thecut", "nightscript",
  "editbay", "softlaunch", "mainpage", "roomtone", "clipfarm", "duetme",
  "soundhunter", "chorusgirl", "beatmath", "unlisted", "firstframe",
];

export const COMMENTS = [
  "the hook is criminal",
  "who is this",
  "label about to eat",
  "sound on repeat",
  "this is a radio record pretending to be a clip",
  "algorithm is going to be so annoying with this",
  "need a 10 hour version",
  "the first second already had me",
  "okay the mix is actually expensive",
  "putting this on the story",
  "unsigned?? be serious",
  "this sound is going to ruin my week",
  "duet incoming",
  "the caption did as much work as the song",
  "for you page knows me too well",
];

export const X_TEMPLATES = [
  "in the booth. no notes.",
  "if you know, you know.",
  "dropping something I shouldn't preview",
  "the comments are unhinged and I love it",
  "chart talk later. sleep first.",
  "new sound. don't skip.",
  "studio until the mix stops lying",
  "thank you for riding with this one",
  "radio called. I let it ring twice.",
  "Spotify numbers looking less hypothetical",
  "don't ask me about the rollout. ask the page.",
  "independent until the check is rude",
  "this chorus has a body count",
  "instagram later. tiktok first.",
];

const BIOS = [
  "Wrote hooks in a bedroom and treated the algorithm like a second instrument.",
  "Touring the small rooms until a clip made the rooms bigger.",
  "A&R found them through a sound page, not a demo.",
  "More charisma than takes. The takes are catching up.",
  "Treats every chorus like it has to survive a 15-second crop.",
  "Band that sounds like a night drive with the GPS off.",
  "Voice first, brand second — until the brand started printing.",
];

export function genreLabel(id: GenreId) {
  return GENRES.find((g) => g.id === id)?.label ?? id;
}

export function makeAvatar(rng: Rng): AvatarSpec {
  return {
    skin: rng.int(0, 5),
    hair: rng.int(0, 6),
    hairColor: rng.int(0, 5),
    accent: rng.int(0, 5),
    shape: rng.int(0, 3),
    accessory: rng.int(0, 4),
  };
}

export function songTitle(rng: Rng) {
  if (rng.chance(0.45)) return rng.pick(TITLE_SOLO);
  return `${rng.pick(TITLE_A)} ${rng.pick(TITLE_B)}`;
}

export function artistName(rng: Rng, kind: "solo" | "band") {
  if (kind === "band") {
    const raw = rng.pick(BAND);
    return rng.chance(0.5) ? raw : `${rng.pick(["The", "The", ""])} ${rng.pick(LAST)} ${rng.pick(["Saints", "Club", "Hours", "Notes"])}`.trim();
  }
  return `${rng.pick(FIRST)} ${rng.pick(LAST)}`;
}

export type ArtistSeed = {
  name: string;
  handle: string;
  genre: GenreId;
  kind: "solo" | "band";
  age: number;
  hometown: string;
  nationality: string;
  bio: string;
  stats: {
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
  potential: number;
  fame: number;
  fans: number;
  followers: { tiktok: number; x: number; instagram: number; youtube: number };
  avatar: AvatarSpec;
};

function stat(rng: Rng, bias: number) {
  return clamp(Math.round(rng.gauss(bias, 14)), 28, 96);
}

export function generateArtist(rng: Rng, opts?: { genre?: GenreId; signedFame?: number }): ArtistSeed {
  const kind: "solo" | "band" = rng.chance(0.22) ? "band" : "solo";
  const genre = opts?.genre ?? rng.pick(GENRES).id;
  const name = artistName(rng, kind);
  const socialBias = rng.chance(0.3) ? 72 : 54;
  const vocalBias = genre === "rnb" || genre === "pop" ? 70 : 58;
  const writeBias = genre === "hiphop" || genre === "indie" ? 70 : 56;
  const fame = opts?.signedFame ?? clamp(Math.round(rng.gauss(12, 10)), 1, 55);
  const tiktok = Math.round(200 + fame * fame * 40 * (0.6 + rng.next()));
  return {
    name,
    handle: handleize(name) || "artist",
    genre,
    kind,
    age: kind === "band" ? rng.int(19, 32) : rng.int(17, 34),
    hometown: rng.pick(CITIES),
    nationality: rng.pick(NATIONALITIES),
    bio: rng.pick(BIOS),
    stats: {
      vocals: stat(rng, vocalBias),
      writing: stat(rng, writeBias),
      dance: stat(rng, 58),
      charisma: stat(rng, 60),
      looks: stat(rng, kind === "band" ? 55 : 62),
      workEthic: stat(rng, 58),
      social: stat(rng, socialBias),
      production: stat(rng, 52),
      performance: stat(rng, 60),
    },
    potential: clamp(Math.round(rng.gauss(62, 16)), 30, 99),
    fame,
    fans: Math.round(tiktok * (1.4 + rng.next())),
    followers: {
      tiktok,
      x: Math.round(tiktok * (0.4 + rng.next() * 0.4)),
      instagram: Math.round(tiktok * (0.6 + rng.next() * 0.5)),
      youtube: Math.round(tiktok * (0.25 + rng.next() * 0.35)),
    },
    avatar: makeAvatar(rng),
  };
}

export const HANDCRAFTED: Omit<ArtistSeed, "avatar" | "handle" | "followers" | "fans" | "nationality">[] = [
  {
    name: "Nova Vex",
    genre: "altpop",
    kind: "solo",
    age: 22,
    hometown: "London",
    bio: "Writes like a private story, performs like she already knows the clip will crop her at the chorus.",
    stats: { vocals: 78, writing: 84, dance: 70, charisma: 88, looks: 82, workEthic: 70, social: 91, production: 64, performance: 80 },
    potential: 94,
    fame: 18,
  },
  {
    name: "Jett Marlowe",
    genre: "hiphop",
    kind: "solo",
    age: 24,
    hometown: "Atlanta",
    bio: "Pocket first. The algorithm likes his first bar more than his second verse — for now.",
    stats: { vocals: 70, writing: 88, dance: 62, charisma: 80, looks: 74, workEthic: 76, social: 72, production: 78, performance: 74 },
    potential: 90,
    fame: 22,
  },
  {
    name: "Mila Rae",
    genre: "pop",
    kind: "solo",
    age: 21,
    hometown: "Stockholm",
    bio: "A chorus you can hum from a muted phone. Dangerous in the right mix.",
    stats: { vocals: 86, writing: 74, dance: 80, charisma: 83, looks: 90, workEthic: 68, social: 85, production: 60, performance: 82 },
    potential: 92,
    fame: 16,
  },
  {
    name: "The Hollow Saints",
    genre: "rock",
    kind: "band",
    age: 26,
    hometown: "Manchester",
    bio: "Sweaty rooms, bigger riffs. Clips of the drop keep outperforming the single.",
    stats: { vocals: 72, writing: 80, dance: 48, charisma: 76, looks: 64, workEthic: 84, social: 58, production: 70, performance: 88 },
    potential: 86,
    fame: 14,
  },
  {
    name: "Sable Quinn",
    genre: "rnb",
    kind: "solo",
    age: 27,
    hometown: "Chicago",
    bio: "Late-night voice. Doesn't chase trends — trends eventually sit still for her.",
    stats: { vocals: 92, writing: 81, dance: 66, charisma: 74, looks: 80, workEthic: 72, social: 64, production: 68, performance: 78 },
    potential: 89,
    fame: 20,
  },
  {
    name: "Cruz Del Mar",
    genre: "latin",
    kind: "solo",
    age: 23,
    hometown: "Mexico City",
    bio: "Dance floors found him before playlists did. TikTok is just a smaller dance floor.",
    stats: { vocals: 76, writing: 70, dance: 90, charisma: 86, looks: 84, workEthic: 75, social: 88, production: 62, performance: 85 },
    potential: 91,
    fame: 19,
  },
  {
    name: "Brick Lane",
    genre: "drill",
    kind: "solo",
    age: 20,
    hometown: "London",
    bio: "Cold slides, colder captions. One sound away from a city-wide loop.",
    stats: { vocals: 68, writing: 82, dance: 58, charisma: 77, looks: 70, workEthic: 64, social: 80, production: 74, performance: 70 },
    potential: 87,
    fame: 11,
  },
  {
    name: "Kite & Co.",
    genre: "indie",
    kind: "band",
    age: 25,
    hometown: "Melbourne",
    bio: "Diary lyrics that somehow slap in a 12-second crop. Unlikely, and that's the point.",
    stats: { vocals: 74, writing: 90, dance: 44, charisma: 66, looks: 60, workEthic: 80, social: 54, production: 72, performance: 76 },
    potential: 84,
    fame: 9,
  },
];

export function captionFor(rng: Rng, title: string, format: ClipFormat, handle: string) {
  const lines: Record<ClipFormat, string[]> = {
    lipsync: [`${title} on loop. don't say I didn't warn you.`, `this chorus is a problem`, `wait for it.`],
    dance: [`if you know the step, you know`, `sound on. floor optional.`, `${title} made me late`],
    studio: [`booth. one take. maybe.`, `the mix is lying less tonight`, `writing ${title} in real time`],
    story: [`the story behind ${title}`, `nobody asked but`, `how this one actually happened`],
    challenge: [`okay I'll do the thing`, `required by the sound`, `joining before it's embarrassing`],
    daylife: [`a quiet day that wasn't`, `call time was a suggestion`, `in transit with ${title}`],
    performance: [`live, no net`, `${title} with the room in it`, `this is the one I'd play you first`],
  };
  const tag = rng.chance(0.5) ? ` @${handle}` : "";
  return `${rng.pick(lines[format])}${tag}`;
}

export const TREND_CHALLENGES = [
  "first-frame stare",
  "chorus swap",
  "hallway walk",
  "carpark lights",
  "mirror take",
  "caption the lie",
  "one-take booth",
  "silent second verse",
];

export const TREND_TAGS = [
  "maincharacter",
  "unreleased",
  "soundon",
  "labelife",
  "choruscheck",
  "nightshift",
  "softlaunch",
  "hookcheck",
];

export const CITY_TO_REGION: Record<string, "africa" | "asia" | "europe" | "northamerica" | "southamerica" | "australasia"> = {
  Atlanta: "northamerica",
  London: "europe",
  Seoul: "asia",
  "Mexico City": "southamerica",
  Toronto: "northamerica",
  Lagos: "africa",
  Stockholm: "europe",
  "Los Angeles": "northamerica",
  Brooklyn: "northamerica",
  Manchester: "europe",
  "São Paulo": "southamerica",
  Berlin: "europe",
  Nashville: "northamerica",
  Paris: "europe",
  Auckland: "australasia",
  Dublin: "europe",
  Chicago: "northamerica",
  Miami: "northamerica",
  Osaka: "asia",
  Lisbon: "europe",
  Detroit: "northamerica",
  Melbourne: "australasia",
};
