import { i as __toESM } from "../_runtime.mjs";
import { L as require_react, v as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { A as Briefcase, C as LayoutDashboard, D as CreditCard, E as Heart, M as Bell, N as Ban, O as Clapperboard, P as ArrowUpRight, S as Library, T as House, _ as Plus, a as User, b as MessageCircle, c as ThumbsDown, d as Share2, f as Settings, g as Radio, h as Repeat2, i as Video, j as Bookmark, k as ChartLine, l as SquarePlus, m as Search, n as Wrench, p as Send, r as Wallet, s as ThumbsUp, t as X, u as Sparkles, v as Play, w as Landmark, x as Mail, y as Music2 } from "../_libs/lucide-react.mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-B_ctZjlW.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var SAVE_KEY = "musicstar.save.v7";
var SLOTS_KEY = "musicstar.slots.v7";
var LEADER_KEY = "musicstar.leaders.v1";
var CREATOR = "Jayden Carter";
var GAME_TITLE = "Music Star Career";
var GAME_SUBTITLE = "Core Systems & Game Modes";
var TAGLINE = "Become the Ultimate Star";
var VERIFY_AT = {
	tiktok: 1e5,
	x: 1e5,
	instagram: 1e5,
	youtube: 1e5,
	spotify: 5e4
};
var CHART_SIZE = {
	singles: 100,
	albums: 200,
	radio: 40,
	spotify: 50
};
var REGIONS = [
	{
		id: "africa",
		label: "Africa"
	},
	{
		id: "asia",
		label: "Asia"
	},
	{
		id: "europe",
		label: "Europe"
	},
	{
		id: "northamerica",
		label: "North America"
	},
	{
		id: "southamerica",
		label: "South America"
	},
	{
		id: "australasia",
		label: "Australasia / Oceania"
	}
];
function mulberry32(seed) {
	let a = seed >>> 0;
	const next = () => {
		a |= 0;
		a = a + 1831565813 | 0;
		let t = Math.imul(a ^ a >>> 15, 1 | a);
		t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
		return ((t ^ t >>> 14) >>> 0) / 4294967296;
	};
	return {
		next,
		int: (min, max) => min + Math.floor(next() * (max - min + 1)),
		pick: (arr) => arr[Math.floor(next() * arr.length)],
		chance: (p) => next() < p,
		gauss: (mean = 0, std = 1) => {
			const u = Math.max(next(), 1e-9);
			const v = next();
			return mean + Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v) * std;
		},
		shuffle: (arr) => {
			const out = arr.slice();
			for (let i = out.length - 1; i > 0; i--) {
				const j = Math.floor(next() * (i + 1));
				[out[i], out[j]] = [out[j], out[i]];
			}
			return out;
		}
	};
}
function clamp$1(n, lo, hi) {
	return Math.max(lo, Math.min(hi, n));
}
function money(n) {
	const sign = n < 0 ? "-" : "";
	const v = Math.abs(Math.round(n));
	if (v >= 1e9) return `${sign}$${(v / 1e9).toFixed(2)}B`;
	if (v >= 1e6) return `${sign}$${(v / 1e6).toFixed(2)}M`;
	return `${sign}$${v.toLocaleString("en-US")}`;
}
function signedMoney(n) {
	const v = Math.round(n);
	if (v >= 0) return `+${money(v)}`;
	return money(v);
}
function compact(n) {
	const v = Math.max(0, Math.round(n));
	if (v >= 1e9) return `${(v / 1e9).toFixed(1)}B`;
	if (v >= 1e6) return `${(v / 1e6).toFixed(1)}M`;
	if (v >= 1e4) return `${(v / 1e3).toFixed(1)}K`;
	if (v >= 1e3) return `${(v / 1e3).toFixed(1)}K`;
	return v.toLocaleString("en-US");
}
function weekParts(week) {
	const careerYear = Math.floor((week - 1) / 52) + 1;
	const year = 2025 + careerYear;
	const w = (week - 1) % 52 + 1;
	return {
		careerYear,
		year,
		weekOfYear: w,
		season: [
			"Winter",
			"Spring",
			"Summer",
			"Fall"
		][Math.floor((w - 1) % 52 / 13)] ?? "Winter"
	};
}
function weekLabel(week) {
	const p = weekParts(week);
	return `Year ${p.careerYear} · Week ${p.weekOfYear} · ${p.season} ${p.year}`;
}
function handleize(name) {
	return name.toLowerCase().replace(/[^a-z0-9]+/g, "").slice(0, 16);
}
function weekStreams(s) {
	return s.streamsWeek + (s.streamsPending ?? 0);
}
var GENRES = [
	{
		id: "pop",
		label: "Pop",
		hook: "chorus-first, radio-ready"
	},
	{
		id: "hiphop",
		label: "Hip-Hop",
		hook: "bars + a pocket you can loop"
	},
	{
		id: "rnb",
		label: "R&B",
		hook: "late-night vocal runs"
	},
	{
		id: "rock",
		label: "Rock",
		hook: "guitars that punch through a phone speaker"
	},
	{
		id: "indie",
		label: "Indie",
		hook: "diary lyrics, stubborn melodies"
	},
	{
		id: "electronic",
		label: "Electronic",
		hook: "drops built for 15 seconds"
	},
	{
		id: "latin",
		label: "Latin",
		hook: "body-first rhythm"
	},
	{
		id: "altpop",
		label: "Alt-Pop",
		hook: "pretty and a little mean"
	},
	{
		id: "country",
		label: "Country",
		hook: "story in a pickup truck"
	},
	{
		id: "drill",
		label: "Drill",
		hook: "cold slides, colder captions"
	},
	{
		id: "afrobeats",
		label: "Afrobeats",
		hook: "log drums, global body"
	}
];
var CITIES = [
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
	"Melbourne"
];
var NATIONALITIES = [
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
	"PR"
];
var RIVAL_LABELS = [
	"Apex Records",
	"Nightshade",
	"Goldline",
	"Northstar",
	"Velvet Room",
	"808 Worldwide",
	"Harbor & Co.",
	"Redline Music",
	"Republic-style",
	"Interscope desk"
];
var FIRST = [
	"Nova",
	"Jett",
	"Mila",
	"Cruz",
	"Sable",
	"Rio",
	"Eden",
	"Vesper",
	"Ash",
	"Luna",
	"Kai",
	"Maren",
	"Sol",
	"Nico",
	"Ivy",
	"Rex",
	"Wren",
	"Dax",
	"Pilar",
	"Onyx",
	"True",
	"Asha",
	"Leo",
	"Quinn",
	"Zia",
	"Hart",
	"Nia",
	"Cole",
	"Faye",
	"Ari"
];
var LAST = [
	"Vex",
	"Marlowe",
	"Rae",
	"Del Mar",
	"Quinn",
	"Vale",
	"Hart",
	"Cross",
	"Noel",
	"Park",
	"Okoye",
	"Silva",
	"Kane",
	"Brooks",
	"Cho",
	"Diaz",
	"Frost",
	"Lane",
	"West",
	"Young",
	"Saint",
	"Hollow",
	"Grey",
	"Moon",
	"Wilder"
];
var BAND = [
	"The Hollow Saints",
	"Brick Lane",
	"Kite & Co.",
	"Low Battery",
	"Night Mileage",
	"Velvet Static",
	"Afterlight",
	"Room 404",
	"Cold Chorus",
	"Paper Crowns",
	"Second Sky",
	"The Cutouts",
	"False Idol",
	"Motor Hymns"
];
var TITLE_A = [
	"Glass",
	"Midnight",
	"Slow",
	"Velvet",
	"Low",
	"Gold",
	"After",
	"No",
	"Don't",
	"3AM",
	"Static",
	"Empty",
	"Pretty",
	"Quiet",
	"Wild",
	"Blue",
	"Last",
	"First"
];
var TITLE_B = [
	"Heart",
	"Mileage",
	"Burn",
	"Static",
	"Battery",
	"Teeth",
	"Light",
	"Witnesses",
	"Wait",
	"Color",
	"City",
	"Rooms",
	"Lies",
	"Crown",
	"Hours",
	"Heaven",
	"Call"
];
var TITLE_SOLO = [
	"Don't Wait Up",
	"No Witnesses",
	"Low Battery",
	"Glass Heart",
	"Midnight Mileage",
	"Slow Burn City",
	"3AM in Color",
	"Velvet Static",
	"Gold Teeth",
	"Afterlight",
	"Room 404",
	"Pretty Problems",
	"Stay Gone",
	"On Repeat",
	"Unlisted",
	"Last Chorus",
	"Body Language",
	"For You Page",
	"Shadowban",
	"Main Character"
];
var FORMATS = [
	{
		id: "lipsync",
		label: "Lip-sync",
		hint: "Sell the hook with your face",
		hookBias: .15,
		socialBias: .1
	},
	{
		id: "dance",
		label: "Dance",
		hint: "If the beat moves, people stay",
		hookBias: .2,
		socialBias: .05
	},
	{
		id: "studio",
		label: "Studio clip",
		hint: "Process as content. Fans love the booth.",
		hookBias: .05,
		socialBias: .05
	},
	{
		id: "story",
		label: "Storytime",
		hint: "Talk to camera over the sound",
		hookBias: -.05,
		socialBias: .2
	},
	{
		id: "challenge",
		label: "Challenge",
		hint: "Ride a trend, don't invent one",
		hookBias: .1,
		socialBias: .15
	},
	{
		id: "daylife",
		label: "Day in the life",
		hint: "Soft fame. Slow follow growth.",
		hookBias: -.1,
		socialBias: .12
	},
	{
		id: "performance",
		label: "Live take",
		hint: "Vocals on the table. High-risk, high-rewatch.",
		hookBias: .12,
		socialBias: 0
	}
];
var HASHTAGS = [
	"fyp",
	"viral",
	"newsound",
	"unsigned",
	"label",
	"studio",
	"chorus",
	"hook",
	"relatable",
	"night",
	"city",
	"heartbreak",
	"flex",
	"demo",
	"session"
];
var NPC_CREATORS = [
	"mira.moves",
	"loopkid",
	"afterhours",
	"cityghost",
	"thecut",
	"nightscript",
	"editbay",
	"softlaunch",
	"mainpage",
	"roomtone",
	"clipfarm",
	"duetme",
	"soundhunter",
	"chorusgirl",
	"beatmath",
	"unlisted",
	"firstframe"
];
var COMMENTS = [
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
	"for you page knows me too well"
];
var X_TEMPLATES = [
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
	"instagram later. tiktok first."
];
var BIOS = [
	"Wrote hooks in a bedroom and treated the algorithm like a second instrument.",
	"Touring the small rooms until a clip made the rooms bigger.",
	"A&R found them through a sound page, not a demo.",
	"More charisma than takes. The takes are catching up.",
	"Treats every chorus like it has to survive a 15-second crop.",
	"Band that sounds like a night drive with the GPS off.",
	"Voice first, brand second — until the brand started printing."
];
function genreLabel(id) {
	return GENRES.find((g) => g.id === id)?.label ?? id;
}
function makeAvatar(rng) {
	return {
		skin: rng.int(0, 5),
		hair: rng.int(0, 6),
		hairColor: rng.int(0, 5),
		accent: rng.int(0, 5),
		shape: rng.int(0, 3),
		accessory: rng.int(0, 4)
	};
}
function songTitle(rng) {
	if (rng.chance(.45)) return rng.pick(TITLE_SOLO);
	return `${rng.pick(TITLE_A)} ${rng.pick(TITLE_B)}`;
}
function artistName(rng, kind) {
	if (kind === "band") {
		const raw = rng.pick(BAND);
		return rng.chance(.5) ? raw : `${rng.pick([
			"The",
			"The",
			""
		])} ${rng.pick(LAST)} ${rng.pick([
			"Saints",
			"Club",
			"Hours",
			"Notes"
		])}`.trim();
	}
	return `${rng.pick(FIRST)} ${rng.pick(LAST)}`;
}
function stat(rng, bias) {
	return clamp$1(Math.round(rng.gauss(bias, 14)), 28, 96);
}
function generateArtist(rng, opts) {
	const kind = rng.chance(.22) ? "band" : "solo";
	const genre = opts?.genre ?? rng.pick(GENRES).id;
	const name = artistName(rng, kind);
	const socialBias = rng.chance(.3) ? 72 : 54;
	const vocalBias = genre === "rnb" || genre === "pop" ? 70 : 58;
	const writeBias = genre === "hiphop" || genre === "indie" ? 70 : 56;
	const fame = opts?.signedFame ?? clamp$1(Math.round(rng.gauss(12, 10)), 1, 55);
	const tiktok = Math.round(200 + fame * fame * 40 * (.6 + rng.next()));
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
			performance: stat(rng, 60)
		},
		potential: clamp$1(Math.round(rng.gauss(62, 16)), 30, 99),
		fame,
		fans: Math.round(tiktok * (1.4 + rng.next())),
		followers: {
			tiktok,
			x: Math.round(tiktok * (.4 + rng.next() * .4)),
			instagram: Math.round(tiktok * (.6 + rng.next() * .5)),
			youtube: Math.round(tiktok * (.25 + rng.next() * .35))
		},
		avatar: makeAvatar(rng)
	};
}
var HANDCRAFTED = [
	{
		name: "Nova Vex",
		genre: "altpop",
		kind: "solo",
		age: 22,
		hometown: "London",
		bio: "Writes like a private story, performs like she already knows the clip will crop her at the chorus.",
		stats: {
			vocals: 78,
			writing: 84,
			dance: 70,
			charisma: 88,
			looks: 82,
			workEthic: 70,
			social: 91,
			production: 64,
			performance: 80
		},
		potential: 94,
		fame: 18
	},
	{
		name: "Jett Marlowe",
		genre: "hiphop",
		kind: "solo",
		age: 24,
		hometown: "Atlanta",
		bio: "Pocket first. The algorithm likes his first bar more than his second verse — for now.",
		stats: {
			vocals: 70,
			writing: 88,
			dance: 62,
			charisma: 80,
			looks: 74,
			workEthic: 76,
			social: 72,
			production: 78,
			performance: 74
		},
		potential: 90,
		fame: 22
	},
	{
		name: "Mila Rae",
		genre: "pop",
		kind: "solo",
		age: 21,
		hometown: "Stockholm",
		bio: "A chorus you can hum from a muted phone. Dangerous in the right mix.",
		stats: {
			vocals: 86,
			writing: 74,
			dance: 80,
			charisma: 83,
			looks: 90,
			workEthic: 68,
			social: 85,
			production: 60,
			performance: 82
		},
		potential: 92,
		fame: 16
	},
	{
		name: "The Hollow Saints",
		genre: "rock",
		kind: "band",
		age: 26,
		hometown: "Manchester",
		bio: "Sweaty rooms, bigger riffs. Clips of the drop keep outperforming the single.",
		stats: {
			vocals: 72,
			writing: 80,
			dance: 48,
			charisma: 76,
			looks: 64,
			workEthic: 84,
			social: 58,
			production: 70,
			performance: 88
		},
		potential: 86,
		fame: 14
	},
	{
		name: "Sable Quinn",
		genre: "rnb",
		kind: "solo",
		age: 27,
		hometown: "Chicago",
		bio: "Late-night voice. Doesn't chase trends — trends eventually sit still for her.",
		stats: {
			vocals: 92,
			writing: 81,
			dance: 66,
			charisma: 74,
			looks: 80,
			workEthic: 72,
			social: 64,
			production: 68,
			performance: 78
		},
		potential: 89,
		fame: 20
	},
	{
		name: "Cruz Del Mar",
		genre: "latin",
		kind: "solo",
		age: 23,
		hometown: "Mexico City",
		bio: "Dance floors found him before playlists did. TikTok is just a smaller dance floor.",
		stats: {
			vocals: 76,
			writing: 70,
			dance: 90,
			charisma: 86,
			looks: 84,
			workEthic: 75,
			social: 88,
			production: 62,
			performance: 85
		},
		potential: 91,
		fame: 19
	},
	{
		name: "Brick Lane",
		genre: "drill",
		kind: "solo",
		age: 20,
		hometown: "London",
		bio: "Cold slides, colder captions. One sound away from a city-wide loop.",
		stats: {
			vocals: 68,
			writing: 82,
			dance: 58,
			charisma: 77,
			looks: 70,
			workEthic: 64,
			social: 80,
			production: 74,
			performance: 70
		},
		potential: 87,
		fame: 11
	},
	{
		name: "Kite & Co.",
		genre: "indie",
		kind: "band",
		age: 25,
		hometown: "Melbourne",
		bio: "Diary lyrics that somehow slap in a 12-second crop. Unlikely, and that's the point.",
		stats: {
			vocals: 74,
			writing: 90,
			dance: 44,
			charisma: 66,
			looks: 60,
			workEthic: 80,
			social: 54,
			production: 72,
			performance: 76
		},
		potential: 84,
		fame: 9
	}
];
function captionFor(rng, title, format, handle) {
	const lines = {
		lipsync: [
			`${title} on loop. don't say I didn't warn you.`,
			`this chorus is a problem`,
			`wait for it.`
		],
		dance: [
			`if you know the step, you know`,
			`sound on. floor optional.`,
			`${title} made me late`
		],
		studio: [
			`booth. one take. maybe.`,
			`the mix is lying less tonight`,
			`writing ${title} in real time`
		],
		story: [
			`the story behind ${title}`,
			`nobody asked but`,
			`how this one actually happened`
		],
		challenge: [
			`okay I'll do the thing`,
			`required by the sound`,
			`joining before it's embarrassing`
		],
		daylife: [
			`a quiet day that wasn't`,
			`call time was a suggestion`,
			`in transit with ${title}`
		],
		performance: [
			`live, no net`,
			`${title} with the room in it`,
			`this is the one I'd play you first`
		]
	};
	const tag = rng.chance(.5) ? ` @${handle}` : "";
	return `${rng.pick(lines[format])}${tag}`;
}
var CITY_TO_REGION = {
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
	Melbourne: "australasia"
};
var BANKS = [
	{
		id: "harbor",
		name: "Harbor National",
		kind: "national",
		personalApr: [10.49, 18.99],
		mortgageApr: [6.49, 7.89],
		cardApr: [19.99, 27.99],
		minScore: 640,
		note: "Prime national. Best rates if FICO is 720+."
	},
	{
		id: "southtrust",
		name: "SouthTrust",
		kind: "regional",
		personalApr: [11.99, 22.49],
		mortgageApr: [6.75, 8.15],
		cardApr: [21.99, 28.99],
		minScore: 600,
		note: "Atlanta-based. Friendlier underwriting, slightly wider spread."
	},
	{
		id: "unionfed",
		name: "Union Federal",
		kind: "national",
		personalApr: [9.99, 17.49],
		mortgageApr: [6.25, 7.49],
		cardApr: [18.99, 26.99],
		minScore: 700,
		note: "Relationship bank. Wants 700+ and a clean book."
	},
	{
		id: "crest",
		name: "Crest Credit Union",
		kind: "creditunion",
		personalApr: [8.49, 14.99],
		mortgageApr: [5.99, 7.15],
		cardApr: [14.99, 21.99],
		minScore: 620,
		note: "Member-owned. Lowest APR, smaller limits."
	},
	{
		id: "onyx",
		name: "Onyx Private",
		kind: "private",
		personalApr: [7.99, 12.99],
		mortgageApr: [5.75, 6.89],
		cardApr: [16.99, 22.99],
		minScore: 760,
		note: "Private bank for high net-worth acts. Invitation after $2M cash or 80 fame."
	}
];
function aprForScore(range, score) {
	const t = Math.max(0, Math.min(1, (850 - score) / 350));
	return +(range[0] + (range[1] - range[0]) * t).toFixed(2);
}
var HOUSES = [
	{
		id: "studio-atl",
		name: "Castleberry loft",
		city: "Atlanta",
		price: 285e3,
		weekly: 420,
		fameNeed: 0,
		beds: 1
	},
	{
		id: "midtown",
		name: "Midtown condo",
		city: "Atlanta",
		price: 54e4,
		weekly: 780,
		fameNeed: 12,
		beds: 2
	},
	{
		id: "buckhead",
		name: "Buckhead house",
		city: "Atlanta",
		price: 115e4,
		weekly: 1600,
		fameNeed: 28,
		beds: 4
	},
	{
		id: "atl-mansion",
		name: "Cascade mansion",
		city: "Atlanta",
		price: 285e4,
		weekly: 3400,
		fameNeed: 48,
		beds: 7
	},
	{
		id: "la-apt",
		name: "East Hollywood walk-up",
		city: "Los Angeles",
		price: 62e4,
		weekly: 1050,
		fameNeed: 8,
		beds: 1
	},
	{
		id: "la-hills",
		name: "Los Feliz hills house",
		city: "Los Angeles",
		price: 24e5,
		weekly: 3200,
		fameNeed: 40,
		beds: 4
	},
	{
		id: "malibu",
		name: "Malibu canyon",
		city: "Los Angeles",
		price: 78e5,
		weekly: 8900,
		fameNeed: 70,
		beds: 6
	},
	{
		id: "nyc-studio",
		name: "Bushwick studio",
		city: "New York",
		price: 49e4,
		weekly: 980,
		fameNeed: 6,
		beds: 1
	},
	{
		id: "nyc-soho",
		name: "SoHo loft",
		city: "New York",
		price: 36e5,
		weekly: 4800,
		fameNeed: 55,
		beds: 3
	},
	{
		id: "miami",
		name: "Edgewater glass",
		city: "Miami",
		price: 185e4,
		weekly: 2400,
		fameNeed: 35,
		beds: 3
	},
	{
		id: "london",
		name: "Hackney terrace",
		city: "London",
		price: 98e4,
		weekly: 1400,
		fameNeed: 18,
		beds: 2
	},
	{
		id: "nashville",
		name: "East Nashville bungalow",
		city: "Nashville",
		price: 61e4,
		weekly: 720,
		fameNeed: 10,
		beds: 3
	},
	{
		id: "nyc-pent",
		name: "Central Park penthouse",
		city: "New York",
		price: 22e6,
		weekly: 16500,
		fameNeed: 82,
		beds: 5
	},
	{
		id: "bh-estate",
		name: "Beverly Hills estate",
		city: "Los Angeles",
		price: 185e5,
		weekly: 14200,
		fameNeed: 78,
		beds: 10
	},
	{
		id: "compound",
		name: "Malibu recording compound",
		city: "Los Angeles",
		price: 122e5,
		weekly: 9800,
		fameNeed: 72,
		beds: 8
	}
];
var CARS = [
	{
		id: "civic",
		name: "Used Civic",
		price: 16500,
		weekly: 40,
		fameNeed: 0,
		speed: 40
	},
	{
		id: "camry",
		name: "Camry",
		price: 28400,
		weekly: 55,
		fameNeed: 0,
		speed: 45
	},
	{
		id: "model3",
		name: "Model 3",
		price: 41800,
		weekly: 90,
		fameNeed: 8,
		speed: 70
	},
	{
		id: "x5",
		name: "X5",
		price: 68e3,
		weekly: 140,
		fameNeed: 16,
		speed: 62
	},
	{
		id: "g-wagon",
		name: "G-Wagon",
		price: 148e3,
		weekly: 280,
		fameNeed: 32,
		speed: 58
	},
	{
		id: "range",
		name: "Range Rover",
		price: 118e3,
		weekly: 240,
		fameNeed: 28,
		speed: 60
	},
	{
		id: "lambo",
		name: "Huracán",
		price: 248e3,
		weekly: 520,
		fameNeed: 50,
		speed: 96
	},
	{
		id: "ferrari",
		name: "Roma",
		price: 272e3,
		weekly: 560,
		fameNeed: 55,
		speed: 94
	},
	{
		id: "rolls",
		name: "Ghost",
		price: 355e3,
		weekly: 780,
		fameNeed: 65,
		speed: 72
	},
	{
		id: "maybach",
		name: "S 680",
		price: 229e3,
		weekly: 490,
		fameNeed: 48,
		speed: 78
	},
	{
		id: "tourbus",
		name: "Custom tour bus",
		price: 185e4,
		weekly: 2400,
		fameNeed: 58,
		speed: 55
	}
];
var AWARDS = [
	{
		id: "grammy-record",
		show: "Grammy Awards",
		category: "Record of the Year",
		region: "northamerica"
	},
	{
		id: "grammy-song",
		show: "Grammy Awards",
		category: "Song of the Year",
		region: "northamerica"
	},
	{
		id: "grammy-album",
		show: "Grammy Awards",
		category: "Album of the Year",
		region: "northamerica"
	},
	{
		id: "grammy-new",
		show: "Grammy Awards",
		category: "Best New Artist",
		region: "northamerica"
	},
	{
		id: "bbma-top",
		show: "Billboard Music Awards",
		category: "Top Hot 100 Song",
		region: "northamerica"
	},
	{
		id: "bbma-artist",
		show: "Billboard Music Awards",
		category: "Top Artist",
		region: "northamerica"
	},
	{
		id: "brit-single",
		show: "BRIT Awards",
		category: "British Single",
		region: "europe"
	},
	{
		id: "brit-album",
		show: "BRIT Awards",
		category: "British Album",
		region: "europe"
	},
	{
		id: "mtv-vma",
		show: "MTV Video Music Awards",
		category: "Video of the Year",
		region: "northamerica"
	},
	{
		id: "mtv-ema",
		show: "MTV Europe Music Awards",
		category: "Best Song",
		region: "europe"
	},
	{
		id: "bet",
		show: "BET Awards",
		category: "Best New Artist",
		region: "northamerica"
	},
	{
		id: "iheart",
		show: "iHeartRadio Music Awards",
		category: "Song of the Year",
		region: "northamerica"
	},
	{
		id: "teen",
		show: "Teen Choice",
		category: "Choice Song",
		region: "northamerica"
	},
	{
		id: "ama",
		show: "African Music Awards",
		category: "Best International",
		region: "africa"
	},
	{
		id: "melody",
		show: "Golden Melody Awards",
		category: "Best Vocal",
		region: "asia"
	},
	{
		id: "apra",
		show: "APRA Awards",
		category: "Song of the Year",
		region: "australasia"
	},
	{
		id: "latin",
		show: "Latin Grammy",
		category: "Record of the Year",
		region: "southamerica"
	}
];
var FESTIVALS = [
	{
		id: "glasto",
		name: "Glastonbury",
		city: "Pilton",
		region: "europe",
		capacity: 21e4,
		fee: 18e4
	},
	{
		id: "coachella",
		name: "Coachella",
		city: "Indio",
		region: "northamerica",
		capacity: 125e3,
		fee: 22e4
	},
	{
		id: "bonnaroo",
		name: "Bonnaroo",
		city: "Manchester, TN",
		region: "northamerica",
		capacity: 8e4,
		fee: 95e3
	},
	{
		id: "lolla",
		name: "Lollapalooza",
		city: "Chicago",
		region: "northamerica",
		capacity: 1e5,
		fee: 14e4
	},
	{
		id: "reading",
		name: "Reading",
		city: "Reading",
		region: "europe",
		capacity: 9e4,
		fee: 11e4
	},
	{
		id: "leeds",
		name: "Leeds",
		city: "Leeds",
		region: "europe",
		capacity: 75e3,
		fee: 95e3
	},
	{
		id: "fuji",
		name: "Fuji Rock",
		city: "Naeba",
		region: "asia",
		capacity: 5e4,
		fee: 85e3
	},
	{
		id: "werchter",
		name: "Rock Werchter",
		city: "Werchter",
		region: "europe",
		capacity: 88e3,
		fee: 1e5
	},
	{
		id: "primavera",
		name: "Primavera Sound",
		city: "Barcelona",
		region: "europe",
		capacity: 7e4,
		fee: 9e4
	},
	{
		id: "sonic",
		name: "Summer Sonic",
		city: "Tokyo / Osaka",
		region: "asia",
		capacity: 6e4,
		fee: 88e3
	},
	{
		id: "afro",
		name: "Afro Nation",
		city: "Accra",
		region: "africa",
		capacity: 4e4,
		fee: 7e4
	},
	{
		id: "lolla-br",
		name: "Lollapalooza Brasil",
		city: "São Paulo",
		region: "southamerica",
		capacity: 8e4,
		fee: 95e3
	},
	{
		id: "splendour",
		name: "Splendour in the Grass",
		city: "Byron Bay",
		region: "australasia",
		capacity: 5e4,
		fee: 72e3
	},
	{
		id: "rio",
		name: "Rock in Rio",
		city: "Rio de Janeiro",
		region: "southamerica",
		capacity: 1e5,
		fee: 16e4
	}
];
var VENUES = [
	{
		id: "earl",
		name: "The Earl",
		city: "Atlanta",
		capacity: 400,
		ticket: 25,
		region: "northamerica"
	},
	{
		id: "echo",
		name: "The Echo",
		city: "Los Angeles",
		capacity: 350,
		ticket: 22,
		region: "northamerica"
	},
	{
		id: "bowery",
		name: "Bowery Ballroom",
		city: "New York",
		capacity: 575,
		ticket: 35,
		region: "northamerica"
	},
	{
		id: "terminal",
		name: "Terminal West",
		city: "Atlanta",
		capacity: 750,
		ticket: 32,
		region: "northamerica"
	},
	{
		id: "masq",
		name: "The Masquerade",
		city: "Atlanta",
		capacity: 1e3,
		ticket: 28,
		region: "northamerica"
	},
	{
		id: "variety",
		name: "Variety Playhouse",
		city: "Atlanta",
		capacity: 1050,
		ticket: 34,
		region: "northamerica"
	},
	{
		id: "fonda",
		name: "The Fonda",
		city: "Los Angeles",
		capacity: 1200,
		ticket: 40,
		region: "northamerica"
	},
	{
		id: "cape-hall",
		name: "City Hall",
		city: "Cape Town",
		capacity: 1400,
		ticket: 28,
		region: "africa"
	},
	{
		id: "fillmore",
		name: "The Fillmore",
		city: "San Francisco",
		capacity: 1315,
		ticket: 45,
		region: "northamerica"
	},
	{
		id: "webster",
		name: "Webster Hall",
		city: "New York",
		capacity: 1500,
		ticket: 42,
		region: "northamerica"
	},
	{
		id: "roundhouse",
		name: "Roundhouse",
		city: "London",
		capacity: 1700,
		ticket: 48,
		region: "europe"
	},
	{
		id: "hob",
		name: "House of Blues",
		city: "Chicago",
		capacity: 1800,
		ticket: 44,
		region: "northamerica"
	},
	{
		id: "olympia",
		name: "Olympia",
		city: "Paris",
		capacity: 2e3,
		ticket: 52,
		region: "europe"
	},
	{
		id: "tabernacle",
		name: "Tabernacle",
		city: "Atlanta",
		capacity: 2600,
		ticket: 45,
		region: "northamerica"
	},
	{
		id: "palladium",
		name: "Hollywood Palladium",
		city: "Los Angeles",
		capacity: 3750,
		ticket: 55,
		region: "northamerica"
	},
	{
		id: "brixton",
		name: "Brixton Academy",
		city: "London",
		capacity: 4921,
		ticket: 58,
		region: "europe"
	},
	{
		id: "redrocks",
		name: "Red Rocks",
		city: "Morrison",
		capacity: 9525,
		ticket: 85,
		region: "northamerica"
	},
	{
		id: "3arena",
		name: "3Arena",
		city: "Dublin",
		capacity: 13e3,
		ticket: 78,
		region: "europe"
	},
	{
		id: "budokan",
		name: "Nippon Budokan",
		city: "Tokyo",
		capacity: 14171,
		ticket: 95,
		region: "asia"
	},
	{
		id: "rodlaver",
		name: "Rod Laver Arena",
		city: "Melbourne",
		capacity: 15e3,
		ticket: 88,
		region: "australasia"
	},
	{
		id: "sfa",
		name: "State Farm Arena",
		city: "Atlanta",
		capacity: 16800,
		ticket: 95,
		region: "northamerica"
	},
	{
		id: "forum",
		name: "The Forum",
		city: "Inglewood",
		capacity: 17500,
		ticket: 110,
		region: "northamerica"
	},
	{
		id: "barclays",
		name: "Barclays Center",
		city: "Brooklyn",
		capacity: 19e3,
		ticket: 115,
		region: "northamerica"
	},
	{
		id: "scotia",
		name: "Scotiabank Arena",
		city: "Toronto",
		capacity: 19800,
		ticket: 108,
		region: "northamerica"
	},
	{
		id: "o2",
		name: "O2 Arena",
		city: "London",
		capacity: 2e4,
		ticket: 95,
		region: "europe"
	},
	{
		id: "lanxess",
		name: "Lanxess Arena",
		city: "Cologne",
		capacity: 2e4,
		ticket: 90,
		region: "europe"
	},
	{
		id: "accor",
		name: "Accor Arena",
		city: "Paris",
		capacity: 20300,
		ticket: 90,
		region: "europe"
	},
	{
		id: "msg",
		name: "Madison Square Garden",
		city: "New York",
		capacity: 20789,
		ticket: 130,
		region: "northamerica"
	},
	{
		id: "man-arena",
		name: "AO Arena",
		city: "Manchester",
		capacity: 21e3,
		ticket: 85,
		region: "europe"
	},
	{
		id: "qudos",
		name: "Qudos Bank Arena",
		city: "Sydney",
		capacity: 21e3,
		ticket: 100,
		region: "australasia"
	},
	{
		id: "united",
		name: "United Center",
		city: "Chicago",
		capacity: 23500,
		ticket: 105,
		region: "northamerica"
	},
	{
		id: "mb-stad",
		name: "Mercedes-Benz Stadium",
		city: "Atlanta",
		capacity: 42e3,
		ticket: 140,
		region: "northamerica"
	},
	{
		id: "tokyo-dome",
		name: "Tokyo Dome",
		city: "Tokyo",
		capacity: 55e3,
		ticket: 150,
		region: "asia"
	},
	{
		id: "morumbi",
		name: "Morumbi",
		city: "São Paulo",
		capacity: 67e3,
		ticket: 70,
		region: "southamerica"
	},
	{
		id: "sofi",
		name: "SoFi Stadium",
		city: "Inglewood",
		capacity: 7e4,
		ticket: 175,
		region: "northamerica"
	},
	{
		id: "metlife",
		name: "MetLife Stadium",
		city: "East Rutherford",
		capacity: 82500,
		ticket: 165,
		region: "northamerica"
	},
	{
		id: "wembley",
		name: "Wembley Stadium",
		city: "London",
		capacity: 9e4,
		ticket: 160,
		region: "europe"
	},
	{
		id: "fnb",
		name: "FNB Stadium",
		city: "Johannesburg",
		capacity: 94736,
		ticket: 55,
		region: "africa"
	}
];
var REAL_ARTISTS = [
	{
		name: "Taylor Swift",
		handle: "taylorswift",
		genre: "pop",
		kind: "solo",
		age: 36,
		hometown: "Nashville",
		nationality: "US",
		bio: "Catalog gravity. Every re-record and stadium run still moves Billboard.",
		fame: 99,
		monthly: 84e6,
		hit: "Fortnight",
		hitWeekly: 184e5,
		hitLifetime: 112e7
	},
	{
		name: "Drake",
		handle: "champagnepapi",
		genre: "hiphop",
		kind: "solo",
		age: 39,
		hometown: "Toronto",
		nationality: "CA",
		bio: "Playlist king. Features and album dumps still own North America.",
		fame: 98,
		monthly: 72e6,
		hit: "Nokia",
		hitWeekly: 142e5,
		hitLifetime: 89e7
	},
	{
		name: "The Weeknd",
		handle: "theweeknd",
		genre: "rnb",
		kind: "solo",
		age: 36,
		hometown: "Toronto",
		nationality: "CA",
		bio: "Cinema R&B. Blinding-era catalog refuses to die.",
		fame: 97,
		monthly: 91e6,
		hit: "Timeless",
		hitWeekly: 128e5,
		hitLifetime: 24e8
	},
	{
		name: "Sabrina Carpenter",
		handle: "sabrinacarpenter",
		genre: "pop",
		kind: "solo",
		age: 27,
		hometown: "Quakertown",
		nationality: "US",
		bio: "Espresso-era pop. TikTok still treats her choruses like infrastructure.",
		fame: 92,
		monthly: 68e6,
		hit: "Espresso",
		hitWeekly: 161e5,
		hitLifetime: 205e7
	},
	{
		name: "Kendrick Lamar",
		handle: "kendricklamar",
		genre: "hiphop",
		kind: "solo",
		age: 39,
		hometown: "Compton",
		nationality: "US",
		bio: "Pulitzer bars. Super Bowl hangover still printing streams.",
		fame: 96,
		monthly: 55e6,
		hit: "Not Like Us",
		hitWeekly: 94e5,
		hitLifetime: 148e7
	},
	{
		name: "Billie Eilish",
		handle: "billieeilish",
		genre: "altpop",
		kind: "solo",
		age: 24,
		hometown: "Los Angeles",
		nationality: "US",
		bio: "Whisper-pop that still clears stadiums.",
		fame: 95,
		monthly: 74e6,
		hit: "Birds of a Feather",
		hitWeekly: 156e5,
		hitLifetime: 172e7
	},
	{
		name: "Bad Bunny",
		handle: "badbunnypr",
		genre: "latin",
		kind: "solo",
		age: 32,
		hometown: "Vega Baja",
		nationality: "PR",
		bio: "Spanish-language gravity. Global, not a crossover.",
		fame: 97,
		monthly: 69e6,
		hit: "DtMF",
		hitWeekly: 132e5,
		hitLifetime: 98e7
	},
	{
		name: "SZA",
		handle: "sza",
		genre: "rnb",
		kind: "solo",
		age: 36,
		hometown: "St. Louis",
		nationality: "US",
		bio: "SOS-era catalog that still charts on vibes alone.",
		fame: 90,
		monthly: 48e6,
		hit: "Saturn",
		hitWeekly: 78e5,
		hitLifetime: 64e7
	},
	{
		name: "Tyler, the Creator",
		handle: "feliciathegoat",
		genre: "hiphop",
		kind: "solo",
		age: 35,
		hometown: "Hawthorne",
		nationality: "US",
		bio: "Chromakopia run. Festival closer, not a playlist ghost.",
		fame: 88,
		monthly: 42e6,
		hit: "Noid",
		hitWeekly: 64e5,
		hitLifetime: 41e7
	},
	{
		name: "Chappell Roan",
		handle: "chappellroan",
		genre: "altpop",
		kind: "solo",
		age: 28,
		hometown: "Willard",
		nationality: "US",
		bio: "Midwest princess. Radio finally caught the rest of the internet.",
		fame: 86,
		monthly: 39e6,
		hit: "Good Luck, Babe!",
		hitWeekly: 89e5,
		hitLifetime: 105e7
	},
	{
		name: "Morgan Wallen",
		handle: "morganwallen",
		genre: "country",
		kind: "solo",
		age: 33,
		hometown: "Sneedville",
		nationality: "US",
		bio: "Country radio still belongs to him. Billboard too.",
		fame: 91,
		monthly: 33e6,
		hit: "Love Somebody",
		hitWeekly: 112e5,
		hitLifetime: 52e7
	},
	{
		name: "Olivia Rodrigo",
		handle: "oliviarodrigo",
		genre: "pop",
		kind: "solo",
		age: 23,
		hometown: "Temecula",
		nationality: "US",
		bio: "Sour hangover plus GUTS touring heat.",
		fame: 90,
		monthly: 46e6,
		hit: "vampire",
		hitWeekly: 71e5,
		hitLifetime: 133e7
	},
	{
		name: "Bruno Mars",
		handle: "brunomars",
		genre: "pop",
		kind: "solo",
		age: 40,
		hometown: "Honolulu",
		nationality: "US",
		bio: "APT. with Rosé proved the catalog still prints.",
		fame: 94,
		monthly: 88e6,
		hit: "APT.",
		hitWeekly: 198e5,
		hitLifetime: 22e8
	},
	{
		name: "SZA & Kendrick",
		handle: "szaxkdot",
		genre: "hiphop",
		kind: "band",
		age: 37,
		hometown: "Los Angeles",
		nationality: "US",
		bio: "Collab gravity — All the Stars still loops.",
		fame: 84,
		monthly: 18e6,
		hit: "All the Stars",
		hitWeekly: 32e5,
		hitLifetime: 19e8
	},
	{
		name: "Burna Boy",
		handle: "burnaboy",
		genre: "afrobeats",
		kind: "solo",
		age: 35,
		hometown: "Port Harcourt",
		nationality: "NG",
		bio: "African giant. Stadiums on three continents.",
		fame: 87,
		monthly: 28e6,
		hit: "Last Last",
		hitWeekly: 46e5,
		hitLifetime: 78e7
	},
	...[
		[
			"Central Cee",
			"centralcee",
			"drill",
			26,
			"London",
			"UK",
			"UK drill that crossed the Atlantic.",
			82,
			28e6,
			"BAND4BAND",
			62e5
		],
		[
			"Ice Spice",
			"icespice",
			"drill",
			25,
			"Bronx",
			"US",
			"Bronx drill / pop rap. The munch era never fully left.",
			78,
			18e6,
			"Think U The Shit",
			41e5
		],
		[
			"Ken Carson",
			"kencarson",
			"hiphop",
			24,
			"Atlanta",
			"US",
			"Rage / trap. Opium nights, industrial 808s.",
			80,
			16e6,
			"Fighting My Spirit",
			38e5
		],
		[
			"Destroy Lonely",
			"destroylonely",
			"hiphop",
			23,
			"Atlanta",
			"US",
			"Experimental trap / cloud rap. Fashion first.",
			74,
			11e6,
			"if looks could kill",
			29e5
		],
		[
			"Yeat",
			"yeat",
			"hiphop",
			26,
			"Portland",
			"US",
			"Hyper-trap / industrial. The ad-libs are the hook.",
			81,
			19e6,
			"Breathe",
			44e5
		],
		[
			"Latto",
			"latto",
			"hiphop",
			27,
			"Atlanta",
			"US",
			"Southern rap / pop rap. Big energy, bigger features.",
			76,
			14e6,
			"Put It On Da Floor",
			32e5
		],
		[
			"GloRilla",
			"glorilla",
			"hiphop",
			26,
			"Memphis",
			"US",
			"Memphis trap that radio finally understood.",
			79,
			15e6,
			"TGIF",
			51e5
		],
		[
			"Doechii",
			"doechii",
			"hiphop",
			27,
			"Tampa",
			"US",
			"Alternative rap. Swamp princess, Grammy heat.",
			83,
			22e6,
			"Anxiety",
			74e5
		],
		[
			"Bia",
			"bia",
			"hiphop",
			33,
			"Boston",
			"US",
			"Trap / hip-hop. Independent and loud.",
			70,
			84e5,
			"London",
			18e5
		],
		[
			"Key Glock",
			"keyglock",
			"hiphop",
			28,
			"Memphis",
			"US",
			"Memphis trap. Yellow tape energy.",
			72,
			92e5,
			"Let's Go",
			21e5
		],
		[
			"BossMan Dlow",
			"bossmandlow",
			"hiphop",
			25,
			"Port Salerno",
			"US",
			"Florida trap. Crowd chant first.",
			68,
			78e5,
			"Get in With Me",
			24e5
		],
		[
			"NLE Choppa",
			"nlechoppa",
			"hiphop",
			24,
			"Memphis",
			"US",
			"Trap / hip-hop. Unpredictable and still charting.",
			75,
			13e6,
			"SLUT ME OUT",
			3e6
		],
		[
			"Lil Yachty",
			"lilyachty",
			"hiphop",
			28,
			"Atlanta",
			"US",
			"Alternative hip-hop / psych rock. Let's Start Here hangover.",
			80,
			17e6,
			"Poland",
			36e5
		],
		[
			"Fivio Foreign",
			"fivioforeign",
			"drill",
			31,
			"Brooklyn",
			"US",
			"Brooklyn drill. Big rooms, bigger slides.",
			71,
			81e5,
			"City of Gods",
			19e5
		],
		[
			"ScHoolboy Q",
			"schoolboyq",
			"hiphop",
			39,
			"Los Angeles",
			"US",
			"West Coast hip-hop. Blue Lips still moving.",
			77,
			12e6,
			"CrasH",
			26e5
		],
		[
			"Tems",
			"tems",
			"afrobeats",
			30,
			"Lagos",
			"NG",
			"Afrobeats / contemporary R&B. Voice of a continent.",
			84,
			21e6,
			"Love Me JeJe",
			48e5
		],
		[
			"Asake",
			"asake",
			"afrobeats",
			30,
			"Lagos",
			"NG",
			"Amapiano / afro-fusion. The log drums don't quit.",
			85,
			24e6,
			"Lonely at the Top",
			52e5
		],
		[
			"Ayra Starr",
			"ayrastarr",
			"afrobeats",
			23,
			"Lagos",
			"NG",
			"Afropop / R&B. 21 already a headliner.",
			80,
			18e6,
			"Rush",
			39e5
		],
		[
			"Muni Long",
			"munilong",
			"rnb",
			37,
			"Lakeland",
			"US",
			"Contemporary R&B / soul. Hrs and hrs still loops.",
			74,
			95e5,
			"Made For Me",
			27e5
		],
		[
			"Victoria Monét",
			"victoriamonet",
			"rnb",
			36,
			"Atlanta",
			"US",
			"R&B / soul. Jaguar era, Grammy hardware.",
			78,
			11e6,
			"On My Mama",
			24e5
		],
		[
			"Fridayy",
			"fridayy",
			"rnb",
			24,
			"Philadelphia",
			"US",
			"R&B / gospel rap. Church in the 808.",
			73,
			88e5,
			"Don't Give Up On Me",
			22e5
		],
		[
			"Leon Thomas",
			"leonthomas",
			"rnb",
			31,
			"Brooklyn",
			"US",
			"Progressive R&B / soul. MUTT still won't sit down.",
			72,
			102e5,
			"MUTT",
			34e5
		],
		[
			"Coco Jones",
			"cocojones",
			"rnb",
			27,
			"Lebanon",
			"US",
			"Contemporary R&B. ICU hangover plus new heat.",
			75,
			98e5,
			"ICU",
			28e5
		],
		[
			"Giveon",
			"giveon",
			"rnb",
			31,
			"Long Beach",
			"US",
			"Baritone R&B / soul. Heartbreak in a low register.",
			82,
			2e7,
			"Heartbreak Anniversary",
			41e5
		],
		[
			"Brent Faiyaz",
			"brenfaiyaz",
			"rnb",
			30,
			"Columbia",
			"US",
			"Alternative R&B / neo-soul. Always almost too cool.",
			81,
			16e6,
			"Best Time",
			33e5
		],
		[
			"Cleo Sol",
			"cleosol",
			"rnb",
			34,
			"London",
			"UK",
			"Neo-soul / UK R&B. Quiet rooms, huge feelings.",
			70,
			64e5,
			"There Too",
			12e5
		],
		[
			"Raye",
			"raye",
			"rnb",
			27,
			"London",
			"UK",
			"Jazz-pop / contemporary R&B. The BRITs finally paid the bill.",
			86,
			23e6,
			"Escapism.",
			68e5
		],
		[
			"Teddy Swims",
			"teddyswims",
			"pop",
			33,
			"Conyers",
			"US",
			"Soul pop / blue-eyed soul. Lose Control still won't lose.",
			84,
			32e6,
			"Lose Control",
			94e5
		],
		[
			"Djo",
			"djo",
			"indie",
			33,
			"Newtown Square",
			"US",
			"Joe Keery's indie psych-pop. End of Beginning is a second career.",
			76,
			14e6,
			"End of Beginning",
			56e5
		],
		[
			"Gracie Abrams",
			"gracieabrams",
			"pop",
			26,
			"Los Angeles",
			"US",
			"Bedroom pop that grew into arenas.",
			85,
			27e6,
			"That's So True",
			82e5
		],
		[
			"Reneé Rapp",
			"reneerapp",
			"pop",
			25,
			"Huntersville",
			"US",
			"Vocal pop. Mean Girls alumni, Mean Girls energy.",
			78,
			12e6,
			"Snow Angel",
			29e5
		],
		[
			"The Last Dinner Party",
			"tldp",
			"rock",
			25,
			"London",
			"UK",
			"Indie rock / art pop. Nothing Matters still opens rooms.",
			72,
			68e5,
			"Nothing Matters",
			17e5
		],
		[
			"Dominic Fike",
			"dominicfike",
			"indie",
			26,
			"Naples",
			"US",
			"Alternative pop / indie rock. 3 Nights never left the gym.",
			77,
			13e6,
			"Mona Lisa",
			25e5
		],
		[
			"Stephen Sanchez",
			"stephensanchez",
			"pop",
			23,
			"San Diego",
			"US",
			"Retro pop / doo-wop. Until I Found You is still a first dance.",
			74,
			11e6,
			"Until I Found You",
			46e5
		],
		[
			"Laufey",
			"laufey",
			"pop",
			26,
			"Reykjavík",
			"IS",
			"Traditional pop / jazz vocal. Gen Z's standards singer.",
			80,
			15e6,
			"From The Start",
			37e5
		],
		[
			"Remi Wolf",
			"remiwolf",
			"indie",
			29,
			"Palo Alto",
			"US",
			"Funky indie pop. Disco that sweats.",
			71,
			59e5,
			"Disco Man",
			11e5
		],
		[
			"Faye Webster",
			"fayewebster",
			"indie",
			28,
			"Atlanta",
			"US",
			"Indie folk / R&B fusion. Kingston weekend energy.",
			69,
			52e5,
			"But Not Kiss",
			9e5
		],
		[
			"Beabadoobee",
			"beabadoobee",
			"indie",
			26,
			"London",
			"UK",
			"Alt-rock / 90s grunge pop. Coffee, then a festival.",
			73,
			86e5,
			"the perfect pair",
			18e5
		],
		[
			"David Kushner",
			"davidkushner",
			"indie",
			25,
			"Chicago",
			"US",
			"Dark folk / indie pop. Daylight still owns youth group TikTok.",
			75,
			12e6,
			"Daylight",
			42e5
		],
		[
			"Xavi",
			"xavi",
			"latin",
			21,
			"Phoenix",
			"US",
			"Tumbados románticos. The corrido kids' heartbreak guy.",
			82,
			19e6,
			"La Diabla",
			61e5
		],
		[
			"Young Miko",
			"youngmiko",
			"latin",
			28,
			"María Antonia",
			"PR",
			"Latin trap / reggaeton. ATE that verse.",
			79,
			14e6,
			"CLASSY 101",
			35e5
		],
		[
			"Feid",
			"feid",
			"latin",
			32,
			"Medellín",
			"CO",
			"Colombian reggaeton. Ferxxo is a brand now.",
			86,
			26e6,
			"LUNA",
			58e5
		],
		[
			"Myke Towers",
			"myketowers",
			"latin",
			32,
			"Río Piedras",
			"PR",
			"Urban Latin / reggaeton. Playlist gravity.",
			83,
			22e6,
			"LALA",
			49e5
		],
		[
			"Junior H",
			"juniorh",
			"latin",
			24,
			"Guanajuato",
			"MX",
			"Corridos tumbados. Sad guitar, packed rooms.",
			80,
			17e6,
			"El Azul",
			38e5
		],
		[
			"Natanael Cano",
			"natanaelcano",
			"latin",
			24,
			"Hermosillo",
			"MX",
			"Corridos tumbados. He wrote the template.",
			84,
			2e7,
			"AMG",
			44e5
		],
		[
			"Mariah Angeliq",
			"mariahangeliq",
			"latin",
			27,
			"Bronx",
			"US",
			"Latin pop / trap. Urban bilingual.",
			68,
			54e5,
			"Mala",
			8e5
		],
		[
			"Bailey Zimmerman",
			"baileyzimmerman",
			"country",
			26,
			"Belleville",
			"US",
			"Country rock. Fall In Love still owns the bar.",
			79,
			14e6,
			"Rock and A Hard Place",
			31e5
		],
		[
			"Jelly Roll",
			"jellyroll",
			"country",
			41,
			"Nashville",
			"US",
			"Country rock / southern hip-hop. The redemption arc charts.",
			85,
			21e6,
			"I Am Not Okay",
			54e5
		],
		[
			"Kacey Musgraves",
			"kaceymusgraves",
			"country",
			37,
			"Golden",
			"US",
			"Cosmic country / folk pop. Golden Hour never dimmed.",
			83,
			16e6,
			"Slow Burn",
			22e5
		],
		[
			"Shaboozey",
			"shaboozey",
			"country",
			30,
			"Woodbridge",
			"US",
			"Country hip-hop / Americana. A Bar Song ate 2024-25.",
			82,
			25e6,
			"A Bar Song (Tipsy)",
			88e5
		]
	].map(([name, handle, genre, age, hometown, nationality, bio, fame, monthly, hit, hitWeekly]) => ({
		name,
		handle,
		genre,
		kind: "solo",
		age,
		hometown,
		nationality,
		bio,
		fame,
		monthly,
		hit,
		hitWeekly,
		hitLifetime: Math.round(hitWeekly * 48)
	}))
];
var SUPERSTAR_FICTIONAL = [
	{
		name: "LUNA PARK",
		genre: "pop",
		monthly: 42e6,
		hit: "Midnight Mileage",
		weekly: 92e5,
		lifetime: 64e7,
		fame: 88
	},
	{
		name: "Jett Marlowe",
		genre: "hiphop",
		monthly: 31e6,
		hit: "No Witnesses",
		weekly: 74e5,
		lifetime: 41e7,
		fame: 84
	},
	{
		name: "Mila Rae",
		genre: "pop",
		monthly: 28e6,
		hit: "Don't Wait Up",
		weekly: 81e5,
		lifetime: 52e7,
		fame: 82
	},
	{
		name: "Cruz Del Mar",
		genre: "latin",
		monthly: 24e6,
		hit: "Body Language",
		weekly: 68e5,
		lifetime: 38e7,
		fame: 80
	},
	{
		name: "Sable Quinn",
		genre: "rnb",
		monthly: 19e6,
		hit: "3AM in Color",
		weekly: 49e5,
		lifetime: 29e7,
		fame: 76
	},
	{
		name: "The Hollow Saints",
		genre: "rock",
		monthly: 11e6,
		hit: "Glass Heart",
		weekly: 32e5,
		lifetime: 18e7,
		fame: 70
	},
	{
		name: "NOVA VEX",
		genre: "altpop",
		monthly: 16e6,
		hit: "Velvet Static",
		weekly: 54e5,
		lifetime: 24e7,
		fame: 74
	},
	{
		name: "Brick Lane",
		genre: "drill",
		monthly: 94e5,
		hit: "Low Battery",
		weekly: 28e5,
		lifetime: 12e7,
		fame: 66
	}
];
var ACHIEVEMENTS = [
	{
		id: "first-song",
		name: "First master",
		hint: "Release a song"
	},
	{
		id: "first-tiktok",
		name: "Posted",
		hint: "Post a TikTok"
	},
	{
		id: "viral",
		name: "For You",
		hint: "Go viral on TikTok"
	},
	{
		id: "billboard",
		name: "On the board",
		hint: "Chart on the Billboard 100"
	},
	{
		id: "number-one",
		name: "Hot 100 crown",
		hint: "Hit #1 on Billboard 100"
	},
	{
		id: "verified-tt",
		name: "TikTok check",
		hint: "100k TikTok followers"
	},
	{
		id: "verified-all",
		name: "Known",
		hint: "Verified on every app"
	},
	{
		id: "spotify-50k",
		name: "Official artist",
		hint: "50k Spotify monthly"
	},
	{
		id: "million",
		name: "Gold-ish",
		hint: "1M streams on one song"
	},
	{
		id: "house",
		name: "Keys",
		hint: "Buy a house"
	},
	{
		id: "car",
		name: "Whip",
		hint: "Buy a car"
	},
	{
		id: "grammy",
		name: "The gramophone",
		hint: "Win a Grammy"
	},
	{
		id: "festival",
		name: "Main stage",
		hint: "Play a major festival"
	},
	{
		id: "married",
		name: "Plus one",
		hint: "Get married"
	},
	{
		id: "kid",
		name: "Next generation",
		hint: "Have a kid"
	},
	{
		id: "millionaire",
		name: "Liquid",
		hint: "Hold $1M cash"
	},
	{
		id: "tour",
		name: "On the road",
		hint: "Finish a tour"
	},
	{
		id: "label-deal",
		name: "The check",
		hint: "Sign a label deal"
	},
	{
		id: "independent",
		name: "Masters",
		hint: "Stay independent past week 20"
	},
	{
		id: "eurovision",
		name: "Twelve points",
		hint: "Enter Eurovision"
	},
	{
		id: "oscar-ost",
		name: "Cue the titles",
		hint: "Land an original soundtrack"
	},
	{
		id: "box-office",
		name: "Opening weekend",
		hint: "Appear in a released film"
	},
	{
		id: "cleared",
		name: "Walked",
		hint: "Beat a legal case"
	},
	{
		id: "rehab",
		name: "Thirty days",
		hint: "Finish rehab"
	},
	{
		id: "gala",
		name: "The room",
		hint: "Hit a Met Gala afterparty"
	},
	{
		id: "legacy",
		name: "The name continues",
		hint: "Retire and play as your kid"
	},
	{
		id: "island",
		name: "Buy the map",
		hint: "Rent a private island"
	},
	{
		id: "black-card",
		name: "No limit",
		hint: "Unlock a black card"
	}
];
var COACHING = [
	{
		id: "vocal",
		label: "Vocal coach",
		skill: "vocals",
		cost: 2400,
		gain: 3
	},
	{
		id: "dance",
		label: "Dance coach",
		skill: "dance",
		cost: 1800,
		gain: 3
	},
	{
		id: "general",
		label: "Performance coach",
		skill: "performance",
		cost: 2200,
		gain: 3
	},
	{
		id: "band",
		label: "Band rehearsal",
		skill: "workEthic",
		cost: 1500,
		gain: 2
	},
	{
		id: "write",
		label: "Writing camp",
		skill: "writing",
		cost: 3200,
		gain: 4
	},
	{
		id: "media",
		label: "Media training",
		skill: "social",
		cost: 1600,
		gain: 3
	},
	{
		id: "charisma",
		label: "Charisma coach",
		skill: "charisma",
		cost: 2100,
		gain: 3
	},
	{
		id: "looks",
		label: "Styling week",
		skill: "looks",
		cost: 2800,
		gain: 2
	}
];
var SUITORS = [
	{
		id: "lina",
		name: "Lina Voss",
		job: "actor",
		famous: true,
		age: 29,
		nationality: "US",
		hometown: "Los Angeles",
		fame: 72,
		netWorth: 184e5,
		looks: 88,
		charisma: 82,
		social: 79,
		bio: "Prestige-TV lead. Paparazzi already know the restaurant."
	},
	{
		id: "marcus",
		name: "Marcus Hale",
		job: "musician",
		famous: true,
		age: 31,
		nationality: "US",
		hometown: "Chicago",
		fame: 64,
		netWorth: 92e5,
		looks: 76,
		charisma: 84,
		social: 70,
		bio: "Grammy-nominated R&B. Wants a verse more than a headline."
	},
	{
		id: "aria",
		name: "Aria Chen",
		job: "model",
		famous: true,
		age: 26,
		nationality: "CN",
		hometown: "Shanghai",
		fame: 58,
		netWorth: 68e5,
		looks: 94,
		charisma: 71,
		social: 88,
		bio: "Campaign face. The grid treats her like infrastructure."
	},
	{
		id: "devon",
		name: "Devon Blake",
		job: "athlete",
		famous: true,
		age: 28,
		nationality: "US",
		hometown: "Atlanta",
		fame: 80,
		netWorth: 42e6,
		looks: 74,
		charisma: 68,
		social: 62,
		bio: "All-star. Jersey sales, charity galas, very public instagram."
	},
	{
		id: "sasha",
		name: "Sasha Quinn",
		job: "actor",
		famous: true,
		age: 34,
		nationality: "GB",
		hometown: "London",
		fame: 69,
		netWorth: 22e6,
		looks: 81,
		charisma: 90,
		social: 66,
		bio: "West End then Marvel. Dry, famous, never late."
	},
	{
		id: "noa",
		name: "Noa Vex",
		job: "musician",
		famous: true,
		age: 24,
		nationality: "SE",
		hometown: "Stockholm",
		fame: 51,
		netWorth: 34e5,
		looks: 79,
		charisma: 86,
		social: 91,
		bio: "Bedroom-pop that leaked into arenas. Writes in the notes app."
	},
	{
		id: "pilar",
		name: "Pilar West",
		job: "producer",
		famous: true,
		age: 36,
		nationality: "US",
		hometown: "Miami",
		fame: 44,
		netWorth: 11e6,
		looks: 70,
		charisma: 77,
		social: 55,
		bio: "Hitmaker. The room goes quiet when they open the session."
	},
	{
		id: "eden",
		name: "Eden Cruz",
		job: "chef",
		famous: false,
		age: 32,
		nationality: "MX",
		hometown: "Mexico City",
		fame: 12,
		netWorth: 42e4,
		looks: 73,
		charisma: 80,
		social: 48,
		bio: "One restaurant, no cameras. The calm option."
	},
	{
		id: "rowan",
		name: "Rowan Hale",
		job: "photographer",
		famous: false,
		age: 27,
		nationality: "US",
		hometown: "Brooklyn",
		fame: 18,
		netWorth: 21e4,
		looks: 71,
		charisma: 75,
		social: 64,
		bio: "Shoots the covers you actually like."
	},
	{
		id: "milo",
		name: "Milo Park",
		job: "stylist",
		famous: false,
		age: 25,
		nationality: "KR",
		hometown: "Seoul",
		fame: 22,
		netWorth: 38e4,
		looks: 84,
		charisma: 78,
		social: 85,
		bio: "The look is the point. Already knows your measurements."
	},
	{
		id: "true",
		name: "True Santos",
		job: "athlete",
		famous: true,
		age: 23,
		nationality: "BR",
		hometown: "São Paulo",
		fame: 61,
		netWorth: 28e6,
		looks: 82,
		charisma: 74,
		social: 77,
		bio: "National team. Endorsements, parades, very public dating."
	},
	{
		id: "wren",
		name: "Wren Adler",
		job: "actor",
		famous: true,
		age: 38,
		nationality: "US",
		hometown: "New York",
		fame: 77,
		netWorth: 31e6,
		looks: 75,
		charisma: 88,
		social: 52,
		bio: "Oscar adjacent. Wants privacy and a plus-one who can survive a premiere."
	}
];
var KID_TRAITS = {
	personality: [
		"shy",
		"loud",
		"curious",
		"stubborn",
		"sunny",
		"watchful"
	],
	school: [
		"public",
		"private",
		"tutors",
		"homeschool"
	],
	interests: [
		"piano",
		"soccer",
		"dance",
		"drawing",
		"coding",
		"horses",
		"chess"
	],
	names: {
		girl: [
			"River",
			"Noa",
			"True",
			"Sol",
			"Wren",
			"Lila",
			"Eden"
		],
		boy: [
			"Ash",
			"Cruz",
			"Miles",
			"Kit",
			"Leo",
			"Jude",
			"Onyx"
		]
	}
};
var GIFTS = [
	{
		id: "flowers",
		name: "Flowers",
		cost: 80,
		mood: 4
	},
	{
		id: "jewelry",
		name: "Jewelry",
		cost: 4800,
		mood: 12
	},
	{
		id: "car-key",
		name: "Weekend car",
		cost: 12e3,
		mood: 18
	},
	{
		id: "studio",
		name: "Home booth",
		cost: 18e3,
		mood: 10
	},
	{
		id: "vacation",
		name: "Quiet week away",
		cost: 7500,
		mood: 16
	}
];
var JETS = [
	{
		id: "citation",
		name: "Citation CJ4",
		price: 98e5,
		weekly: 12e3,
		fameNeed: 68
	},
	{
		id: "g650",
		name: "Gulfstream G650",
		price: 54e6,
		weekly: 48e3,
		fameNeed: 88
	},
	{
		id: "global",
		name: "Global 7500",
		price: 72e6,
		weekly: 58e3,
		fameNeed: 92
	}
];
var JEWELRY = [
	{
		id: "cuban",
		name: "Cuban link",
		price: 28e3,
		fameNeed: 18
	},
	{
		id: "watch",
		name: "Day-Date",
		price: 62e3,
		fameNeed: 32
	},
	{
		id: "ice",
		name: "Custom iced chain",
		price: 24e4,
		fameNeed: 55
	},
	{
		id: "pink",
		name: "Pink diamond studs",
		price: 11e5,
		fameNeed: 74
	}
];
var FILMS = [
	{
		id: "neon-hour",
		title: "The Neon Hour",
		studio: "Harbor Pictures",
		budget: 42e6,
		fameNeed: 22,
		pay: 85e3,
		weeks: 3,
		role: "cameo",
		ost: false
	},
	{
		id: "after-hours",
		title: "After Hours Drive",
		studio: "Silverline",
		budget: 18e6,
		fameNeed: 14,
		pay: 42e3,
		weeks: 2,
		role: "cameo",
		ost: false
	},
	{
		id: "glass-city",
		title: "Glass City",
		studio: "Paramount-style",
		budget: 16e7,
		fameNeed: 48,
		pay: 62e4,
		weeks: 6,
		role: "supporting",
		ost: true
	},
	{
		id: "empire-run",
		title: "Empire Run",
		studio: "Summit North",
		budget: 95e6,
		fameNeed: 40,
		pay: 28e4,
		weeks: 5,
		role: "supporting",
		ost: true
	},
	{
		id: "lullaby",
		title: "Lullaby Protocol",
		studio: "A24-desk",
		budget: 12e6,
		fameNeed: 28,
		pay: 11e4,
		weeks: 4,
		role: "voice",
		ost: true
	},
	{
		id: "red-carpet",
		title: "Red Carpet War",
		studio: "Warner-desk",
		budget: 21e7,
		fameNeed: 70,
		pay: 24e5,
		weeks: 8,
		role: "lead",
		ost: true
	},
	{
		id: "saturday",
		title: "Saturday Static",
		studio: "Indie Row",
		budget: 42e5,
		fameNeed: 8,
		pay: 18e3,
		weeks: 2,
		role: "cameo",
		ost: false
	},
	{
		id: "orbit",
		title: "Orbit Kids",
		studio: "Pixar-desk",
		budget: 14e7,
		fameNeed: 36,
		pay: 19e4,
		weeks: 4,
		role: "voice",
		ost: true
	},
	{
		id: "night-bus",
		title: "Night Bus",
		studio: "Focus",
		budget: 28e6,
		fameNeed: 18,
		pay: 64e3,
		weeks: 3,
		role: "cameo",
		ost: true
	},
	{
		id: "crown",
		title: "Crown Season",
		studio: "StreamCo",
		budget: 8e6,
		fameNeed: 16,
		pay: 55e3,
		weeks: 1,
		role: "cameo",
		ost: false
	}
];
var NIGHTLIFE = [
	{
		id: "vip",
		name: "VIP table",
		cost: 12e3,
		fameNeed: 0,
		mood: 12,
		scandal: .1,
		city: "any"
	},
	{
		id: "rooftop",
		name: "Rooftop residency",
		cost: 9500,
		fameNeed: 4,
		mood: 10,
		scandal: .08,
		city: "any"
	},
	{
		id: "casino",
		name: "High-roller suite",
		cost: 64e3,
		fameNeed: 35,
		mood: 10,
		scandal: .18,
		city: "Las Vegas"
	},
	{
		id: "poker",
		name: "Invite-only poker",
		cost: 28e3,
		fameNeed: 28,
		mood: 8,
		scandal: .14,
		city: "any"
	},
	{
		id: "after",
		name: "Invite-only afterparty",
		cost: 22e3,
		fameNeed: 24,
		mood: 16,
		scandal: .16,
		city: "any"
	},
	{
		id: "fashion",
		name: "Fashion Week booth",
		cost: 42e3,
		fameNeed: 40,
		mood: 16,
		scandal: .1,
		city: "Paris"
	},
	{
		id: "met",
		name: "Met Gala afterparty",
		cost: 85e3,
		fameNeed: 62,
		mood: 22,
		scandal: .08,
		city: "New York"
	}
];
var LUXURY_DAYS = [
	{
		id: "zoo",
		name: "Private zoo buyout",
		cost: 25e4,
		fameNeed: 30,
		mood: 22,
		kids: true
	},
	{
		id: "theme",
		name: "Theme park after hours",
		cost: 42e4,
		fameNeed: 45,
		mood: 28,
		kids: true
	},
	{
		id: "water",
		name: "Water park takeover",
		cost: 28e4,
		fameNeed: 28,
		mood: 20,
		kids: true
	},
	{
		id: "island",
		name: "Private island weekend",
		cost: 12e5,
		fameNeed: 70,
		mood: 36,
		kids: true
	}
];
var LAWYERS = [
	{
		id: "public",
		name: "Public defender",
		cost: 0,
		skill: 28
	},
	{
		id: "mid",
		name: "Rivers & Cole",
		cost: 45e3,
		skill: 62
	},
	{
		id: "star",
		name: "Blackwood Criminal",
		cost: 18e4,
		skill: 84
	},
	{
		id: "legend",
		name: "The Fixer",
		cost: 62e4,
		skill: 96
	}
];
var SUBSTANCES = [
	{
		id: "alcohol",
		name: "Bottle service night",
		cost: 2400,
		creative: 6,
		crash: 8,
		addiction: 7
	},
	{
		id: "pills",
		name: "Studio pills",
		cost: 1800,
		creative: 12,
		crash: 14,
		addiction: 11
	},
	{
		id: "smoke",
		name: "Session smoke",
		cost: 420,
		creative: 4,
		crash: 5,
		addiction: 5
	}
];
var ENT_ROLES = [
	{
		id: "driver",
		name: "Personal driver",
		weekly: 1200
	},
	{
		id: "chef",
		name: "Private chef",
		weekly: 1800
	},
	{
		id: "paparazzi",
		name: "Anti-paparazzi detail",
		weekly: 2400
	}
];
var BOTTLES = [
	{
		id: "ace",
		name: "Ace of Spades · table",
		cost: 12e3,
		mood: 10,
		fameNeed: 0
	},
	{
		id: "magnum",
		name: "Ace magnum",
		cost: 28e3,
		mood: 14,
		fameNeed: 18
	},
	{
		id: "nebula",
		name: "Custom Nebuchadnezzar",
		cost: 64e3,
		mood: 18,
		fameNeed: 32
	},
	{
		id: "methuselah",
		name: "Methuselah buyout",
		cost: 95e3,
		mood: 22,
		fameNeed: 44
	},
	{
		id: "million",
		name: "Six-figure bottle service",
		cost: 1e5,
		mood: 26,
		fameNeed: 55
	}
];
var LAND = [
	{
		id: "bh-lot",
		name: "Beverly Hills lot",
		city: "Los Angeles",
		price: 42e5,
		fameNeed: 48
	},
	{
		id: "miami-lot",
		name: "Miami Beach lot",
		city: "Miami",
		price: 31e5,
		fameNeed: 40
	},
	{
		id: "calabasas",
		name: "Calabasas ridge",
		city: "Calabasas",
		price: 24e5,
		fameNeed: 36
	},
	{
		id: "london-lot",
		name: "Surrey acreage",
		city: "London",
		price: 18e5,
		fameNeed: 32
	}
];
var BUILD_OPTS = [
	{
		id: "studio",
		name: "Private studio wing",
		cost: 12e5
	},
	{
		id: "garage",
		name: "Underground garage",
		cost: 68e4
	},
	{
		id: "theater",
		name: "Theater room",
		cost: 42e4
	},
	{
		id: "wall",
		name: "Security wall",
		cost: 89e4
	}
];
var ISLANDS = [
	{
		id: "exuma",
		name: "Exuma cay",
		city: "Bahamas",
		price: 185e5,
		fameNeed: 78,
		weekly: 22e3
	},
	{
		id: "bali",
		name: "Nusa private",
		city: "Bali",
		price: 122e5,
		fameNeed: 70,
		weekly: 16e3
	},
	{
		id: "aegean",
		name: "Aegean islet",
		city: "Greece",
		price: 22e6,
		fameNeed: 82,
		weekly: 26e3
	}
];
var VACATIONS = [
	{
		id: "paris",
		name: "Paris week",
		city: "Paris",
		cost: 28e3,
		mood: 16
	},
	{
		id: "tokyo",
		name: "Tokyo week",
		city: "Tokyo",
		cost: 32e3,
		mood: 18
	},
	{
		id: "dubai",
		name: "Dubai week",
		city: "Dubai",
		cost: 45e3,
		mood: 14
	},
	{
		id: "caribbean",
		name: "Caribbean week",
		city: "St. Barts",
		cost: 22e3,
		mood: 20
	},
	{
		id: "alps",
		name: "Swiss Alps week",
		city: "Zermatt",
		cost: 38e3,
		mood: 17
	}
];
var GIG_KINDS = [
	{
		id: "club",
		name: "Club appearance",
		kind: "club",
		base: 8e3,
		fameNeed: 10
	},
	{
		id: "corporate",
		name: "Corporate ball",
		kind: "corporate",
		base: 45e3,
		fameNeed: 28
	},
	{
		id: "private",
		name: "Private festival",
		kind: "private",
		base: 12e4,
		fameNeed: 48
	},
	{
		id: "yacht",
		name: "Yacht set",
		kind: "yacht",
		base: 85e3,
		fameNeed: 40
	},
	{
		id: "wedding",
		name: "Billionaire wedding",
		kind: "wedding",
		base: 25e4,
		fameNeed: 62
	}
];
var SCHOOLS = [
	{
		id: "public",
		name: "Public school",
		yearly: 0
	},
	{
		id: "arts",
		name: "Arts academy",
		yearly: 25e3
	},
	{
		id: "prep",
		name: "Elite private prep",
		yearly: 5e4
	},
	{
		id: "tutor",
		name: "In-house tutors",
		yearly: 1e5
	}
];
var LESSONS = [
	{
		id: "vocal",
		label: "Vocal lessons",
		cost: 1800,
		stat: "vocals"
	},
	{
		id: "dance",
		label: "Dance class",
		cost: 1400,
		stat: "dance"
	},
	{
		id: "theory",
		label: "Music theory",
		cost: 1600,
		stat: "writing"
	},
	{
		id: "instrument",
		label: "Instrument",
		cost: 1500,
		stat: "production"
	}
];
var AWARD_CALENDAR = [
	{
		weekOfYear: 6,
		show: "Grammy Awards"
	},
	{
		weekOfYear: 8,
		show: "BRIT Awards"
	},
	{
		weekOfYear: 18,
		show: "iHeartRadio Music Awards"
	},
	{
		weekOfYear: 22,
		show: "Billboard Music Awards"
	},
	{
		weekOfYear: 28,
		show: "BET Awards"
	},
	{
		weekOfYear: 35,
		show: "MTV Video Music Awards"
	},
	{
		weekOfYear: 46,
		show: "MTV Europe Music Awards"
	}
];
var FILM_TITLES = [
	"Neon Hour",
	"Glass Protocol",
	"After Static",
	"Crown Season",
	"Lullaby Drive",
	"Red Carpet War",
	"Orbit Kids",
	"Night Bus",
	"Empire Run",
	"Saturday Static",
	"Velvet Voltage",
	"Harbor Lights",
	"The Quiet Hook",
	"Midnight Mileage",
	"Body Language",
	"3AM in Color"
];
var FILM_STUDIOS = [
	"Harbor Pictures",
	"Silverline",
	"Summit North",
	"A24-desk",
	"Warner-desk",
	"Focus",
	"StreamCo",
	"Indie Row"
];
function suitorGender(id) {
	return (/* @__PURE__ */ new Set([
		"lina",
		"aria",
		"sasha",
		"noa",
		"pilar",
		"true"
	])).has(id) ? "female" : "male";
}
function nid(state, p) {
	state.idSeq += 1;
	return `${p}_${state.idSeq.toString(36)}`;
}
function playerArtist(state) {
	if (!state.playerArtistId) return null;
	return state.artists.find((a) => a.id === state.playerArtistId) ?? null;
}
function rosterOf(state) {
	if (state.career === "artist") {
		const a = playerArtist(state);
		return a ? [a] : [];
	}
	return state.artists.filter((a) => a.labelId === "player");
}
function isControlled(state, artist) {
	if (state.career === "artist") return artist.id === state.playerArtistId;
	return artist.labelId === "player";
}
function pushNotif(state, n) {
	state.notifs.unshift({
		id: nid(state, "n"),
		week: state.week,
		...n
	});
	state.notifs = state.notifs.slice(0, 48);
}
function unlockAchievement(state, id) {
	if (state.achievements.some((a) => a.id === id)) return;
	if (!ACHIEVEMENTS.some((a) => a.id === id)) return;
	state.achievements.push({
		id,
		week: state.week
	});
	const meta = ACHIEVEMENTS.find((a) => a.id === id);
	pushNotif(state, {
		tone: "good",
		title: `Achievement · ${meta?.name ?? id}`,
		body: meta?.hint ?? ""
	});
}
function syncPopularity(artist) {
	const social = artist.followers.tiktok + artist.followers.instagram + artist.followers.x + artist.followers.youtube;
	artist.popularity = clamp$1(Math.round(artist.fame * .4 + Math.log10(1 + artist.monthlyListeners) * 7.2 + Math.log10(1 + social) * 4.4 + (artist.verified.spotify ? 3 : 0) + (artist.superstar ? 8 : 0)), 0, 100);
}
var CREDIT_BANDS = [
	{
		id: "poor",
		label: "Poor",
		min: 300,
		tone: "bad",
		copy: "Cash only, or a 35%+ down subprime desk if they'll take you."
	},
	{
		id: "fair",
		label: "Fair",
		min: 580,
		tone: "warn",
		copy: "Mortgages need a fat down. Auto loans go through. No leases."
	},
	{
		id: "good",
		label: "Good",
		min: 670,
		tone: "good",
		copy: "Conventional mortgages, auto finance, and leases all open."
	},
	{
		id: "verygood",
		label: "Very good",
		min: 740,
		tone: "good",
		copy: "Low down, best APRs, leases and jumbo mortgages."
	},
	{
		id: "excellent",
		label: "Excellent",
		min: 800,
		tone: "mint",
		copy: "3% down houses, 0% down cars, private-bank pricing."
	}
];
function creditBand(score) {
	let band = CREDIT_BANDS[0];
	for (const b of CREDIT_BANDS) if (score >= b.min) band = b;
	return band;
}
function weeklyPayment(principal, apr, weeks) {
	const r = apr / 100 / 52;
	if (weeks <= 0) return principal;
	if (r <= 0) return Math.round(principal / weeks);
	return Math.max(1, Math.round(principal * r / (1 - Math.pow(1 + r, -weeks))));
}
function emptyQuote(reason, price) {
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
		dueNow: price
	};
}
function eligibleBanks(state) {
	return BANKS.filter((b) => {
		if (state.creditScore < b.minScore) return false;
		if (b.id === "onyx") {
			const you = playerArtist(state);
			return state.creditScore >= 760 && ((you?.fame ?? 0) >= 80 || state.cash + (state.savings ?? 0) >= 2e6 || state.blackCard);
		}
		return true;
	});
}
function pickBank(state, kind) {
	const pool = eligibleBanks(state);
	if (!pool.length) return BANKS[BANKS.length - 1];
	const score = state.creditScore;
	const key = kind === "mortgage" ? "mortgageApr" : kind === "card" ? "cardApr" : "personalApr";
	return [...pool].sort((a, b) => aprForScore(a[key], score) - aprForScore(b[key], score))[0];
}
function mortgageFloor(score) {
	if (score >= 800) return {
		pct: .03,
		ok: true,
		note: "Excellent. 3% conventional."
	};
	if (score >= 740) return {
		pct: .05,
		ok: true,
		note: "Very good. 5% down."
	};
	if (score >= 700) return {
		pct: .1,
		ok: true,
		note: "Good. 10% down."
	};
	if (score >= 670) return {
		pct: .15,
		ok: true,
		note: "Good. 15% down."
	};
	if (score >= 640) return {
		pct: .2,
		ok: true,
		note: "Fair-plus. 20% down."
	};
	if (score >= 620) return {
		pct: .25,
		ok: true,
		note: "Thin file. 25% down, fewer banks."
	};
	if (score >= 580) return {
		pct: .35,
		ok: true,
		note: "Subprime. 35% down."
	};
	return {
		pct: 1,
		ok: false,
		note: "FICO under 580. Lenders will not mortgage this."
	};
}
function autoFloor(score, mode) {
	if (mode === "lease") {
		if (score >= 740) return {
			pct: .08,
			ok: true,
			note: "Lease approved. Drive-off ~8%."
		};
		if (score >= 700) return {
			pct: .1,
			ok: true,
			note: "Lease approved. 10% drive-off."
		};
		if (score >= 670) return {
			pct: .12,
			ok: true,
			note: "Lease approved on a shorter term. 12% down."
		};
		return {
			pct: 1,
			ok: false,
			note: "Need 670+ FICO to lease. Finance or pay cash."
		};
	}
	if (score >= 740) return {
		pct: 0,
		ok: true,
		note: "0% down at a prime desk."
	};
	if (score >= 700) return {
		pct: .05,
		ok: true,
		note: "5% down."
	};
	if (score >= 670) return {
		pct: .1,
		ok: true,
		note: "10% down."
	};
	if (score >= 640) return {
		pct: .15,
		ok: true,
		note: "15% down."
	};
	if (score >= 620) return {
		pct: .2,
		ok: true,
		note: "20% down. Rate is ugly."
	};
	if (score >= 580) return {
		pct: .3,
		ok: true,
		note: "Subprime auto. 30% down."
	};
	return {
		pct: 1,
		ok: false,
		note: "FICO under 580. Dealers want cash."
	};
}
function jetFloor(score, mode) {
	if (mode === "lease") {
		if (score >= 760) return {
			pct: .15,
			ok: true,
			note: "Fractional lease. 15% up front."
		};
		return {
			pct: 1,
			ok: false,
			note: "Need 760+ FICO to lease a jet."
		};
	}
	if (score >= 740) return {
		pct: .2,
		ok: true,
		note: "20% down, private aviation desk."
	};
	if (score >= 700) return {
		pct: .3,
		ok: true,
		note: "30% down."
	};
	if (score >= 670) return {
		pct: .4,
		ok: true,
		note: "40% down. They still hesitate."
	};
	return {
		pct: 1,
		ok: false,
		note: "Need 670+ FICO to finance a jet. Wire cash."
	};
}
function mortgageQuote(state, price) {
	const score = Math.round(state.creditScore);
	const floor = mortgageFloor(score);
	if (!floor.ok) return emptyQuote(floor.note, price);
	if (!eligibleBanks(state).length) return emptyQuote(`No bank will touch a ${score} FICO.`, price);
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
		dueNow: down
	};
}
function autoQuote(state, price, mode, catalogId) {
	const score = Math.round(state.creditScore);
	if (mode === "lease" && catalogId === "tourbus") return emptyQuote("A custom tour bus isn't a lease. Finance or cash.", price);
	const floor = autoFloor(score, mode);
	if (!floor.ok) return emptyQuote(floor.note, price);
	if (!eligibleBanks(state).length) return emptyQuote(`No lender for a ${score} FICO.`, price);
	const bank = pickBank(state, "auto");
	const apr = aprForScore(bank.personalApr, score) + (mode === "lease" ? -1.4 : 1.1);
	const down = Math.round(price * floor.pct);
	if (mode === "lease") {
		const residual = Math.round(price * .58);
		const dep = Math.max(0, price - residual - down);
		const weeks = 156;
		const mf = Math.max(.001, apr / 2400);
		const monthly = dep / 36 + (price - down + residual) * mf;
		const weekly = Math.max(40, Math.round(monthly * 12 / 52));
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
			dueNow: down
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
		dueNow: down
	};
}
function jetQuote(state, price, mode) {
	const score = Math.round(state.creditScore);
	const floor = jetFloor(score, mode);
	if (!floor.ok) return emptyQuote(floor.note, price);
	if (!eligibleBanks(state).length) return emptyQuote("Private aviation wants a real FICO.", price);
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
		dueNow: down
	};
}
function quoteFor(state, draft, mode) {
	if (mode === "outright" || !draft.financeable) return {
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
		dueNow: draft.price
	};
	if (draft.kind === "house" && mode === "mortgage") return mortgageQuote(state, draft.price);
	if (draft.kind === "car" && (mode === "loan" || mode === "lease")) return autoQuote(state, draft.price, mode, draft.id);
	if (draft.kind === "jet" && (mode === "loan" || mode === "lease")) return jetQuote(state, draft.price, mode);
	return emptyQuote("That structure isn't on this desk.", draft.price);
}
function cardLimitForScore(score, bankId) {
	const s = clamp$1(score, 300, 850);
	let base = 400;
	if (s < 580) base = 300 + (s - 300) * 4;
	else if (s < 670) base = 1500 + (s - 580) * 70;
	else if (s < 740) base = 8e3 + (s - 670) * 140;
	else if (s < 800) base = 18e3 + (s - 740) * 280;
	else base = 35e3 + (s - 800) * 900;
	return Math.max(250, Math.round(base * (bankId === "onyx" ? 2.4 : bankId === "unionfed" ? 1.35 : bankId === "harbor" ? 1.2 : bankId === "crest" ? .85 : 1) / 50) * 50);
}
function personalLoanMax(state, bankId) {
	const score = state.creditScore;
	const bank = BANKS.find((b) => b.id === bankId);
	if (!bank || score < bank.minScore) return 0;
	if (score < 580) return 0;
	const income = estimatedAnnual(state);
	const t = clamp$1((score - 580) / 270, 0, 1);
	const cap = 4e3 + t * 72e3 + income * (.08 + t * .22) + state.cash * .08;
	const bankCap = bank.id === "crest" ? .7 : bank.id === "onyx" ? 1.8 : 1;
	return Math.round(cap * bankCap / 500) * 500;
}
function estimatedAnnual(state) {
	const g = Math.max(0, state.ledger.gross);
	if (g > 0) return g * 52;
	const fame = playerArtist(state)?.fame ?? state.labelRep;
	return state.career === "label" ? 48e3 + fame * 2400 : 12e3 + fame * 1800;
}
function cardRoom(card) {
	if (card.black) return Number.POSITIVE_INFINITY;
	return Math.max(0, Math.round(card.limit - card.used));
}
function totalCardRoom(state) {
	return state.cards.reduce((n, c) => n + (c.black ? 1e9 : cardRoom(c)), 0);
}
function bestCard(state) {
	if (!state.cards.length) return null;
	return [...state.cards].sort((a, b) => cardRoom(b) - cardRoom(a))[0];
}
function issueStarterCard(state) {
	if (state.cards.length > 0) return;
	const bank = pickBank(state, "card");
	const limit = cardLimitForScore(state.creditScore, bank.id);
	state.cards.push({
		id: nid(state, "cc"),
		bankId: bank.id,
		name: `${bank.name} Visa`,
		limit,
		used: 0,
		apr: aprForScore(bank.cardApr, state.creditScore)
	});
}
function originateLoan(state, bankId, amount, purpose, weeks, forcedApr) {
	const bank = BANKS.find((b) => b.id === bankId);
	if (!bank) return "Unknown bank.";
	if (state.creditScore < bank.minScore) return `${bank.name} wants a ${bank.minScore}+ FICO. You're at ${Math.round(state.creditScore)}.`;
	if (amount < 500) return "Amount is too small to paper.";
	const range = purpose === "house" ? bank.mortgageApr : purpose === "lease" ? bank.personalApr : bank.personalApr;
	const apr = forcedApr ?? aprForScore(range, state.creditScore);
	const term = weeks ?? (purpose === "house" ? 1560 : purpose === "car" || purpose === "jet" ? 260 : purpose === "lease" ? 156 : 52);
	const payment = weeklyPayment(amount, apr, term);
	const loan = {
		id: nid(state, "ln"),
		bankId: bank.id,
		bankName: bank.name,
		principal: amount,
		remaining: amount,
		apr,
		weeklyPayment: payment,
		weeksLeft: term,
		purpose
	};
	state.loans.push(loan);
	return loan;
}
function pushStatement(state, title, amount, channel) {
	if (!Array.isArray(state.statements)) state.statements = [];
	state.statements.unshift({
		id: nid(state, "stt"),
		week: state.week,
		title,
		amount,
		channel
	});
	state.statements = state.statements.slice(0, 80);
}
function settleDue(state, due, plan, title) {
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
	if (cashAmt + cardAmt !== need) cardAmt = need - cashAmt;
	if (cashAmt > state.cash + .5) return `Debit is short. Checking has $${Math.round(state.cash).toLocaleString("en-US")}. Need $${cashAmt.toLocaleString("en-US")}.`;
	if (cardAmt > 0) {
		const card = state.cards.find((c) => c.id === plan.cardId) ?? bestCard(state);
		if (!card) return "No credit card on file. Apply at Bank, or pay debit.";
		const room = cardRoom(card);
		if (cardAmt > room + .5) return `${card.name} only has $${Math.round(room).toLocaleString("en-US")} left. Split with cash or pick another card.`;
		card.used += cardAmt;
		const util = card.black ? 0 : card.used / Math.max(1, card.limit);
		if (util > .7) state.creditScore = clamp$1(state.creditScore - 5, 300, 850);
		else if (util > .5) state.creditScore = clamp$1(state.creditScore - 2, 300, 850);
	}
	state.cash -= cashAmt;
	pushStatement(state, title ?? "Purchase", -need, plan.method === "card" ? "credit" : plan.method === "split" ? "split" : "debit");
	return null;
}
function cashPlan(amount) {
	return {
		method: "cash",
		cardId: null,
		cashAmount: amount,
		cardAmount: 0,
		mode: "outright"
	};
}
function describePay(plan, due) {
	if (plan.method === "cash") return `Debit card · $${Math.round(due).toLocaleString("en-US")}`;
	if (plan.method === "card") return `Credit card · $${Math.round(due).toLocaleString("en-US")}`;
	return `Debit + credit · $${Math.round(plan.cashAmount).toLocaleString("en-US")} debit + $${Math.round(due - plan.cashAmount).toLocaleString("en-US")} card`;
}
var MOM_NAMES = [
	"Diane",
	"Angela",
	"Rosa",
	"Helen",
	"Priya",
	"Carol"
];
var DAD_NAMES = [
	"Raymond",
	"Marcus",
	"James",
	"Andre",
	"Luis",
	"David"
];
var TALENTS = [
	"voice",
	"piano",
	"dance",
	"writing",
	"production",
	"none yet"
];
function emptyStats() {
	return {
		vocals: 28,
		writing: 24,
		dance: 30,
		charisma: 32,
		looks: 40,
		workEthic: 35,
		social: 30,
		production: 18,
		performance: 22
	};
}
function rngFor(artist) {
	let n = 2166136261;
	for (let i = 0; i < artist.name.length; i++) n = Math.imul(n ^ artist.name.charCodeAt(i), 16777619);
	return mulberry32(n + artist.age * 997 >>> 0);
}
function ensureFamily(artist, rng) {
	if (!artist.gender) artist.gender = "female";
	if (!artist.orientation) artist.orientation = "straight";
	if (artist.pregnancy === void 0) artist.pregnancy = null;
	if (typeof artist.lastIntimacyWeek !== "number") artist.lastIntimacyWeek = 0;
	if (!artist.parents) artist.parents = {
		mom: "Mom",
		dad: "Dad",
		closeness: 70,
		cards: []
	};
	if (!artist.parents.cards || artist.parents.cards.length < 2) artist.parents = makeParents(artist.age, rng ?? rngFor(artist));
	if (artist.partner && !artist.partner.gender) artist.partner.gender = suitorGender(artist.partner.catalogId ?? "") === "female" ? "female" : "male";
	if (!Array.isArray(artist.kids)) artist.kids = [];
	for (const k of artist.kids) {
		if (typeof k.closeness !== "number") k.closeness = 70;
		if (!k.stats) k.stats = emptyStats();
		if (!k.lessons) k.lessons = {
			vocal: 0,
			dance: 0,
			theory: 0,
			instrument: 0
		};
		if (!k.schoolTrack) k.schoolTrack = k.school?.includes("arts") ? "arts" : k.school?.includes("prep") || k.school?.includes("private") ? "prep" : k.school?.includes("tutor") ? "tutor" : "public";
		if (!k.talent) k.talent = TALENTS[k.age % TALENTS.length];
	}
}
function makeParents(age, rng) {
	const mom = {
		role: "mom",
		name: rng.pick(MOM_NAMES),
		age: age + rng.int(22, 32),
		job: rng.pick([
			"nurse",
			"teacher",
			"bookkeeper",
			"hair",
			"retail"
		]),
		closeness: rng.int(58, 86),
		avatar: makeAvatar(rng)
	};
	const dad = {
		role: "dad",
		name: rng.pick(DAD_NAMES),
		age: age + rng.int(24, 34),
		job: rng.pick([
			"contractor",
			"driver",
			"cook",
			"mechanic",
			"pastor"
		]),
		closeness: rng.int(52, 82),
		avatar: makeAvatar(rng)
	};
	return {
		mom: mom.name,
		dad: dad.name,
		closeness: Math.round((mom.closeness + dad.closeness) / 2),
		cards: [mom, dad]
	};
}
function matchesOrientation(you, gender) {
	if (you.orientation === "bisexual") return true;
	if (you.orientation === "gay") return gender === you.gender;
	return gender !== you.gender;
}
function parentAct(state, role, act, plan) {
	const you = playerArtist(state);
	if (!you) return "Artist career.";
	ensureFamily(you);
	const card = you.parents.cards.find((c) => c.role === role);
	if (!card) return "Missing parent.";
	if (state.lastParentWeek === state.week && act === "call") return "Already called this week.";
	const cost = {
		call: 0,
		aid: 5e3,
		gift: 48e3,
		vip: 12e3
	}[act];
	if (cost > 0) {
		const paid = settleDue(state, cost, plan ?? cashPlan(cost), `${card.name} · ${act}`);
		if (paid) return paid;
	}
	const gain = act === "call" ? 4 : act === "aid" ? 8 : act === "gift" ? 14 : 10;
	card.closeness = clamp$1(card.closeness + gain, 0, 100);
	you.parents.closeness = Math.round(you.parents.cards.reduce((n, c) => n + c.closeness, 0) / you.parents.cards.length);
	if (act === "call") state.lastParentWeek = state.week;
	you.mood = clamp$1(you.mood + 3, 0, 100);
	pushNotif(state, {
		tone: "good",
		title: `${card.name} · ${act === "call" ? "called" : act === "aid" ? "wired aid" : act === "gift" ? "luxury gift" : "VIP invite"}`,
		body: `Closeness ${Math.round(card.closeness)}. They noticed.`
	});
	return null;
}
function scandalParents(you, hit) {
	ensureFamily(you);
	for (const c of you.parents.cards) c.closeness = clamp$1(c.closeness - hit, 0, 100);
	you.parents.closeness = Math.round(you.parents.cards.reduce((n, c) => n + c.closeness, 0) / Math.max(1, you.parents.cards.length));
}
function intimacy(state, rng) {
	const you = playerArtist(state);
	if (!you?.partner) return "Need a partner.";
	if (you.relationship !== "dating" && you.relationship !== "engaged" && you.relationship !== "married") return "Not that close yet.";
	you.lastIntimacyWeek = state.week;
	you.partner.closeness = clamp$1(you.partner.closeness + 6, 0, 100);
	you.mood = clamp$1(you.mood + 8, 0, 100);
	if (you.gender !== you.partner.gender && !you.pregnancy && (you.relationship === "married" || you.relationship === "dating")) {
		const chance = you.relationship === "married" ? .18 : .08;
		if (rng.next() < chance) {
			you.pregnancy = {
				weeksLeft: 16,
				via: "natural"
			};
			pushNotif(state, {
				tone: "viral",
				title: "Pregnant",
				body: `${you.partner.name} just stared at the test. Sixteen weeks on the clock.`
			});
			return null;
		}
	}
	pushNotif(state, {
		tone: "good",
		title: "Night in",
		body: `${you.partner.name} stayed. Closeness ${Math.round(you.partner.closeness)}.`
	});
	return null;
}
function startSurrogate(state, plan) {
	const you = playerArtist(state);
	if (!you?.partner) return "Need a partner.";
	if (you.pregnancy) return "Already expecting.";
	if (!(you.gender === "male" && you.partner.gender === "male")) return "Surrogacy desk is for male couples — adoption is on the other form.";
	const cost = 85e3;
	const paid = settleDue(state, cost, plan ?? cashPlan(cost), "Surrogate");
	if (paid) return paid;
	you.pregnancy = {
		weeksLeft: 16,
		via: "surrogate"
	};
	pushNotif(state, {
		tone: "good",
		title: "Surrogate retained",
		body: "Medical and legal are papered. Sixteen weeks."
	});
	return null;
}
function startAdoption(state, rng, plan) {
	const you = playerArtist(state);
	if (!you?.partner) return "Need a partner.";
	if (you.pregnancy) return "Already in process.";
	const cost = 45e3;
	const paid = settleDue(state, cost, plan ?? cashPlan(cost), "Adoption agency");
	if (paid) return paid;
	you.pregnancy = {
		weeksLeft: 6,
		via: "adoption"
	};
	pushNotif(state, {
		tone: "good",
		title: "Agency filed",
		body: "Home study starts. A kid in about six weeks if the file holds."
	});
	return null;
}
function tickPregnancy(state, rng) {
	const you = playerArtist(state);
	if (!you?.pregnancy) return;
	you.pregnancy.weeksLeft -= 1;
	if (you.pregnancy.weeksLeft === 4) pushNotif(state, {
		tone: "info",
		title: you.pregnancy.via === "adoption" ? "Home study wrapping" : "Third trimester",
		body: "Four weeks. The house gets quieter and louder at the same time."
	});
	if (you.pregnancy.weeksLeft > 0) return;
	const via = you.pregnancy.via;
	you.pregnancy = null;
	haveChild(state, rng, via);
}
function haveChild(state, rng, via, opts) {
	const you = playerArtist(state);
	if (!you) return;
	const gender = opts?.gender ?? (rng.chance(.5) ? "girl" : "boy");
	const name = (opts?.name ?? "").trim() || rng.pick([...KID_TRAITS.names[gender]]);
	const kid = {
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
		lessons: {
			vocal: 0,
			dance: 0,
			theory: 0,
			instrument: 0
		}
	};
	you.kids.push(kid);
	you.mood = clamp$1(you.mood + 12, 0, 100);
	if (you.partner) you.partner.closeness = clamp$1(you.partner.closeness + 10, 0, 100);
	unlockAchievement(state, "kid");
	pushNotif(state, {
		tone: "viral",
		title: via === "adoption" ? `Adopted ${kid.name}` : `${kid.name} arrived`,
		body: `${kid.gender}, ${kid.personality}, already into ${kid.interests}.`
	});
}
function setSchool(state, kidId, track, plan) {
	const kid = playerArtist(state)?.kids.find((k) => k.id === kidId);
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
	kid.closeness = clamp$1(kid.closeness + 3, 0, 100);
	pushNotif(state, {
		tone: "info",
		title: `${kid.name} · ${school.name}`,
		body: yearly ? `$${yearly.toLocaleString("en-US")}/yr. First month hit checking.` : "Public. The bus still comes."
	});
	return null;
}
function giveLesson(state, kidId, lesson, plan) {
	const kid = playerArtist(state)?.kids.find((k) => k.id === kidId);
	if (!kid) return "Which kid?";
	const L = LESSONS.find((x) => x.id === lesson);
	if (!L) return "Unknown lesson.";
	const paid = settleDue(state, L.cost, plan ?? cashPlan(L.cost), `${kid.name} · ${L.label}`);
	if (paid) return paid;
	kid.lessons[lesson] += 1;
	kid.stats[L.stat] = clamp$1(kid.stats[L.stat] + 3, 0, 99);
	kid.closeness = clamp$1(kid.closeness + 2, 0, 100);
	kid.talent = lesson === "vocal" ? "voice" : lesson === "dance" ? "dance" : lesson === "theory" ? "writing" : "production";
	pushNotif(state, {
		tone: "good",
		title: `${kid.name} · ${L.label}`,
		body: `${L.stat} ${Math.round(kid.stats[L.stat])}. The takeover gets less hypothetical.`
	});
	return null;
}
function hangWithKid(state, kidId) {
	const you = playerArtist(state);
	const kid = you?.kids.find((k) => k.id === kidId);
	if (!kid) return "Which kid?";
	kid.closeness = clamp$1(kid.closeness + 6, 0, 100);
	you.mood = clamp$1(you.mood + 4, 0, 100);
	pushNotif(state, {
		tone: "good",
		title: `Afternoon with ${kid.name}`,
		body: `Closeness ${Math.round(kid.closeness)}.`
	});
	return null;
}
function dateNight(state, plan) {
	const you = playerArtist(state);
	if (!you?.partner) return "No one to take out.";
	const cost = 2400;
	const paid = settleDue(state, cost, plan ?? cashPlan(cost), `Date night · ${you.partner.name}`);
	if (paid) return paid;
	you.partner.closeness = clamp$1(you.partner.closeness + 8, 0, 100);
	you.mood = clamp$1(you.mood + 6, 0, 100);
	pushNotif(state, {
		tone: "good",
		title: `Date night · ${you.partner.name}`,
		body: `Closeness ${Math.round(you.partner.closeness)}.`
	});
	return null;
}
function tickKids(state, ledger) {
	const you = playerArtist(state);
	if (!you) return;
	ensureFamily(you);
	let tuition = 0;
	for (const k of you.kids) {
		const school = SCHOOLS.find((s) => s.id === k.schoolTrack);
		if (school) tuition += Math.round(school.yearly / 52);
		if (k.age >= 12 && k.closeness < 30) k.stats.workEthic = clamp$1(k.stats.workEthic - .2, 0, 99);
		if (k.schoolTrack === "arts") k.stats.vocals = clamp$1(k.stats.vocals + .08, 0, 99);
		if (k.schoolTrack === "prep") k.stats.writing = clamp$1(k.stats.writing + .06, 0, 99);
		if (k.schoolTrack === "tutor") {
			k.stats.vocals = clamp$1(k.stats.vocals + .05, 0, 99);
			k.stats.writing = clamp$1(k.stats.writing + .05, 0, 99);
			k.stats.production = clamp$1(k.stats.production + .04, 0, 99);
		}
	}
	if (tuition > 0) {
		state.cash -= tuition;
		if (ledger) ledger.living += tuition;
		else state.ledger.living += tuition;
	}
}
function retireToKid(state, kidId) {
	const you = playerArtist(state);
	const kid = you?.kids.find((k) => k.id === kidId);
	if (!you || !kid) return "No heir.";
	if (kid.age < 16) return `${kid.name} is ${kid.age}. Sixteen is the floor.`;
	you.aiControl = true;
	you.superstar = you.fame >= 70;
	const handle = kid.name.toLowerCase().replace(/[^a-z0-9]+/g, "").slice(0, 14) || "heir";
	const bio = `Child of ${you.name}. ${kid.personality}. Raised on ${kid.school}.`;
	const momCard = {
		role: you.gender === "female" ? "mom" : "dad",
		name: you.name,
		age: you.age,
		job: "artist",
		closeness: kid.closeness,
		avatar: you.avatar
	};
	const dadCard = {
		role: you.gender === "female" ? "dad" : "mom",
		name: you.partner?.name ?? (you.gender === "female" ? you.parents.dad : you.parents.mom),
		age: you.partner?.age ?? you.age + 1,
		job: you.partner?.job ?? "civilian",
		closeness: kid.closeness,
		avatar: you.partner?.avatar ?? you.avatar
	};
	const heir = {
		...you,
		id: nid(state, "a"),
		name: kid.name,
		handle,
		age: Math.max(16, kid.age),
		bio,
		history: `Took the name after ${you.name} stepped back in year ${Math.floor((state.week - 1) / 52) + 1}.`,
		stats: { ...kid.stats },
		potential: clamp$1(55 + kid.lessons.vocal + kid.lessons.theory + kid.lessons.instrument, 55, 96),
		ability: Math.round((kid.stats.vocals + kid.stats.writing + kid.stats.performance) / 3),
		mood: 72,
		energy: 88,
		fame: clamp$1(you.fame * .18 + kid.closeness * .1, 4, 40),
		fans: 400,
		reputation: clamp$1(you.reputation * .4, 8, 50),
		popularity: clamp$1(you.popularity * .12, 2, 24),
		monthlyListeners: 0,
		weeklyStreamHistory: [
			0,
			0,
			0,
			0
		],
		signed: false,
		labelId: null,
		royalty: .85,
		wage: 0,
		advance: 0,
		albumsRemaining: 3,
		signedWeek: null,
		avatar: kid.avatar,
		profiles: {
			tiktok: {
				handle,
				bio,
				avatar: { ...kid.avatar }
			},
			x: {
				handle,
				bio,
				avatar: { ...kid.avatar }
			},
			instagram: {
				handle,
				bio,
				avatar: { ...kid.avatar }
			},
			youtube: {
				handle,
				bio,
				avatar: { ...kid.avatar }
			},
			spotify: {
				handle,
				bio,
				avatar: { ...kid.avatar }
			}
		},
		verified: {
			tiktok: false,
			x: false,
			instagram: false,
			youtube: false,
			spotify: false
		},
		coaching: {
			vocal: 0,
			dance: 0,
			general: 0,
			band: 0
		},
		relationship: "single",
		partner: null,
		kids: [],
		parents: {
			mom: momCard.role === "mom" ? momCard.name : dadCard.name,
			dad: momCard.role === "dad" ? momCard.name : dadCard.name,
			closeness: kid.closeness,
			cards: [momCard.role === "mom" ? momCard : dadCard, momCard.role === "dad" ? momCard : dadCard]
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
		addiction: {
			alcohol: 0,
			pills: 0,
			smoke: 0
		},
		rehabWeeks: 0,
		incarceratedWeeks: 0,
		streetCred: 12,
		tiktokPostsThisWeek: 0,
		xPostsThisWeek: 0,
		gramPostsThisWeek: 0,
		lastTikTokWeek: 0,
		followingX: 80
	};
	heir.ability = Math.round((heir.stats.vocals + heir.stats.writing + heir.stats.performance) / 3);
	state.artists.unshift(heir);
	state.playerArtistId = heir.id;
	state.dealKind = "independent";
	state.labelName = "Independent";
	pushNotif(state, {
		tone: "viral",
		title: `${kid.name} takes the name`,
		body: `${you.name} stepped back. The catalog still streams. The kid has the lessons.`
	});
	unlockAchievement(state, "legacy");
	return null;
}
function buyLand(state, id, plan) {
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
		wall: false
	});
	pushNotif(state, {
		tone: "good",
		title: lot.name,
		body: "Dirt. Now you build."
	});
	return null;
}
function addBuild(state, landId, opt, plan) {
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
	pushNotif(state, {
		tone: "good",
		title: spec.name,
		body: `On the ${job.name} plot.`
	});
	return null;
}
function buyIsland(state, id, plan) {
	const you = playerArtist(state);
	const isle = ISLANDS.find((i) => i.id === id);
	if (!isle) return "Mapped wrong.";
	if (state.islands.some((i) => i.catalogId === id)) return "Already yours.";
	if ((you?.fame ?? 0) < isle.fameNeed) return `Fame ${isle.fameNeed}.`;
	const paid = settleDue(state, isle.price, plan ?? cashPlan(isle.price), isle.name);
	if (paid) return paid;
	state.islands.push({
		catalogId: isle.id,
		name: isle.name,
		value: isle.price,
		weekBought: state.week,
		weekly: isle.weekly
	});
	unlockAchievement(state, "island");
	pushNotif(state, {
		tone: "viral",
		title: isle.name,
		body: "Landing strip, villa, dock. No press boat."
	});
	return null;
}
function takeVacation(state, id, plan) {
	const you = playerArtist(state);
	if (!you) return "Artist career.";
	const v = VACATIONS.find((x) => x.id === id);
	if (!v) return "Not a destination.";
	const paid = settleDue(state, v.cost, plan ?? cashPlan(v.cost), v.name);
	if (paid) return paid;
	you.mood = clamp$1(you.mood + v.mood, 0, 100);
	you.onHoliday = true;
	you.holidayWeeks = Math.max(you.holidayWeeks, 1);
	if (you.partner) you.partner.closeness = clamp$1(you.partner.closeness + 8, 0, 100);
	for (const k of you.kids) k.closeness = clamp$1(k.closeness + 5, 0, 100);
	pushNotif(state, {
		tone: "good",
		title: v.name,
		body: `Family in ${v.city}. Phones on do not disturb.`
	});
	return null;
}
function hireJetCrew(state, pilots, attendants) {
	if (!state.jets.length) return "Buy a jet first.";
	state.jetCrew = {
		pilots: Math.max(0, Math.min(4, pilots)),
		attendants: Math.max(0, Math.min(8, attendants))
	};
	pushNotif(state, {
		tone: "info",
		title: "Flight dept",
		body: `${state.jetCrew.pilots} pilots · ${state.jetCrew.attendants} attendants · $${(state.jetCrew.pilots * 4e3 + state.jetCrew.attendants * 2200).toLocaleString("en-US")}/wk.`
	});
	return null;
}
function bookGig(state, gigId) {
	const g = state.gigs.find((x) => x.id === gigId);
	if (!g || g.status !== "open") return "Offer gone.";
	const you = playerArtist(state);
	if (you && you.fame < g.fameNeed) return `Fame ${g.fameNeed}.`;
	g.status = "booked";
	state.cash += g.fee;
	state.ledger.shows += g.fee;
	pushNotif(state, {
		tone: "good",
		title: g.name,
		body: `${g.city} · $${g.fee.toLocaleString("en-US")} hits checking.`
	});
	return null;
}
function tickGigs(state, rng) {
	for (const g of state.gigs) {
		if (g.status === "open" && state.week - g.week > 3) g.status = "expired";
		if (g.status === "booked") g.status = "done";
	}
	const you = playerArtist(state);
	if (!you || rng.next() > .45) return;
	const kind = rng.pick([...GIG_KINDS]);
	if (you.fame < kind.fameNeed - 8) return;
	const fee = Math.round(kind.base * (1 + you.popularity / 70) * (1 + you.fame / 90) * (.85 + rng.next() * .4));
	state.gigs.unshift({
		id: nid(state, "gig"),
		name: kind.name,
		city: rng.pick([
			"Miami",
			"Las Vegas",
			"Dubai",
			"London",
			"Atlanta",
			"Los Angeles",
			"Ibiza"
		]),
		kind: kind.kind,
		fee,
		fameNeed: kind.fameNeed,
		week: state.week,
		status: "open"
	});
	state.gigs = state.gigs.slice(0, 12);
	pushNotif(state, {
		tone: "info",
		title: `Gig offer · ${kind.name}`,
		body: `$${fee.toLocaleString("en-US")} if you take it this week.`
	});
}
function orderBottle(state, id, plan) {
	const you = playerArtist(state);
	if (!you) return "Artist career.";
	const b = BOTTLES.find((x) => x.id === id);
	if (!b) return "Not on the list.";
	if (you.fame < b.fameNeed) return `Fame ${b.fameNeed} to even see the list.`;
	const paid = settleDue(state, b.cost, plan ?? cashPlan(b.cost), b.name);
	if (paid) return paid;
	you.mood = clamp$1(you.mood + b.mood, 0, 100);
	you.energy = clamp$1(you.energy - 10, 0, 100);
	you.addiction.alcohol = clamp$1(you.addiction.alcohol + 8, 0, 100);
	you.fame = clamp$1(you.fame + .8, 0, 100);
	state.ledger.nightlife += b.cost;
	state.lastNightlifeWeek = state.week;
	pushNotif(state, {
		tone: "good",
		title: b.name,
		body: "The table photographed itself."
	});
	return null;
}
function fulfillFamily(state, draft, plan, rng) {
	switch (draft.kind) {
		case "land": return buyLand(state, draft.id, plan);
		case "island": return buyIsland(state, draft.id, plan);
		case "vacation": return takeVacation(state, draft.id, plan);
		case "build": return addBuild(state, draft.id, draft.extra?.buildOpt ?? "studio", plan);
		case "lesson": return giveLesson(state, draft.extra?.kidId ?? "", draft.extra?.lesson ?? "vocal", plan);
		case "school": return setSchool(state, draft.extra?.kidId ?? "", draft.extra?.track ?? "public", plan);
		case "parent": return parentAct(state, draft.extra?.parentRole ?? "mom", draft.extra?.parentAct ?? "call", plan);
		case "date-night": return dateNight(state, plan);
		case "conceive": return intimacy(state, rng);
		case "adopt": return draft.id === "surrogate" ? startSurrogate(state, plan) : startAdoption(state, rng, plan);
		case "gig": return bookGig(state, draft.id);
		case "crew": return hireJetCrew(state, Number(draft.extra?.n ?? 1), Number(draft.extra?.gain ?? 1));
		case "bottle": return orderBottle(state, draft.id, plan);
		default: return "Unknown family desk.";
	}
}
function popTier(artist) {
	const p = artist.popularity;
	if (p >= 92 || artist.superstar && p >= 86) return "mega";
	if (p >= 76) return "alist";
	if (p >= 56) return "star";
	if (p >= 36) return "established";
	if (p >= 16) return "rising";
	return "newcomer";
}
function barsBlock(state, action) {
	const a = playerArtist(state);
	if (!a) return null;
	if (a.incarceratedWeeks > 0 && action !== "substance") return `You're in for ${a.incarceratedWeeks} more week${a.incarceratedWeeks === 1 ? "" : "s"}. The booth still works. The red carpet doesn't.`;
	if (a.rehabWeeks > 0 && (action === "nightlife" || action === "substance")) return "Rehab first. The house has a no-visitors rule.";
	return null;
}
function ensureLifeState(state) {
	if (!Array.isArray(state.mail)) state.mail = [];
	if (!Array.isArray(state.films)) state.films = [];
	if (!Array.isArray(state.legal)) state.legal = [];
	if (!Array.isArray(state.jets)) state.jets = [];
	if (!Array.isArray(state.jewelry)) state.jewelry = [];
	if (!Array.isArray(state.buses)) state.buses = [];
	if (!Array.isArray(state.cards)) state.cards = [];
	if (state.cards.length === 0) issueStarterCard(state);
	for (const c of state.cars ?? []) if (typeof c.lease !== "boolean") c.lease = false;
	if (!Array.isArray(state.luxuryLog)) state.luxuryLog = [];
	if (typeof state.savings !== "number") state.savings = 0;
	if (typeof state.savingsApr !== "number") state.savingsApr = 4.35;
	if (typeof state.blackCard !== "boolean") state.blackCard = false;
	if (!state.entourage) state.entourage = {
		driver: false,
		chef: false,
		paparazzi: false
	};
	if (typeof state.lastNightlifeWeek !== "number") state.lastNightlifeWeek = 0;
	if (typeof state.ledger.nightlife !== "number") state.ledger.nightlife = 0;
	if (typeof state.ledger.legal !== "number") state.ledger.legal = 0;
	if (typeof state.ledger.luxury !== "number") state.ledger.luxury = 0;
	if (!Array.isArray(state.statements)) state.statements = [];
	if (typeof state.cardAutopay !== "boolean") state.cardAutopay = false;
	if (state.ceremony === void 0) state.ceremony = null;
	if (!Array.isArray(state.gigs)) state.gigs = [];
	if (!Array.isArray(state.lands)) state.lands = [];
	if (!Array.isArray(state.islands)) state.islands = [];
	if (!state.jetCrew) state.jetCrew = {
		pilots: 0,
		attendants: 0
	};
	if (typeof state.lastParentWeek !== "number") state.lastParentWeek = 0;
	for (const a of state.artists) {
		ensureHealth(a);
		ensureFamily(a);
	}
	for (const s of state.songs) {
		if (typeof s.salesDigitalWeek !== "number") s.salesDigitalWeek = 0;
		if (typeof s.salesPhysicalWeek !== "number") s.salesPhysicalWeek = 0;
		if (typeof s.chartPoints !== "number") s.chartPoints = 0;
		if (typeof s.albumUnits !== "number") s.albumUnits = 0;
		if (typeof s.ost !== "boolean") s.ost = false;
	}
}
function ensureHealth(artist) {
	if (typeof artist.vocalHealth !== "number") artist.vocalHealth = 88;
	if (typeof artist.mental !== "number") artist.mental = 74;
	if (!artist.addiction) artist.addiction = {
		alcohol: 0,
		pills: 0,
		smoke: 0
	};
	if (typeof artist.rehabWeeks !== "number") artist.rehabWeeks = 0;
	if (typeof artist.incarceratedWeeks !== "number") artist.incarceratedWeeks = 0;
	if (typeof artist.streetCred !== "number") artist.streetCred = artist.superstar ? 40 : 8;
}
function pushMail(state, item) {
	if (item.kind === "family") {
		pushNotif(state, {
			tone: "info",
			title: item.subject,
			body: `${item.from} · ${item.body}`
		});
		return;
	}
	state.mail.unshift({
		id: nid(state, "em"),
		week: state.week,
		read: false,
		...item
	});
	state.mail = state.mail.slice(0, 80);
}
function readMail(state, id) {
	const m = state.mail.find((x) => x.id === id);
	if (!m) return "Missing.";
	m.read = true;
	return null;
}
function unreadMail(state) {
	return (state.mail ?? []).filter((m) => !m.read).length;
}
function setArtistPhoto(state, artistId, photo, platform) {
	const artist = state.artists.find((a) => a.id === artistId);
	if (!artist) return "No artist.";
	artist.avatar.photo = photo;
	const keys = !platform || platform === "all" ? [
		"tiktok",
		"x",
		"instagram",
		"youtube",
		"spotify"
	] : [platform];
	for (const k of keys) {
		if (!artist.profiles?.[k]) continue;
		artist.profiles[k].avatar = {
			...artist.profiles[k].avatar,
			photo
		};
	}
	return null;
}
function depositSavings(state, amount) {
	const n = Math.round(amount);
	if (n < 100) return "Minimum $100.";
	if (state.cash < n) return "Not enough in checking.";
	state.cash -= n;
	state.savings += n;
	return null;
}
function withdrawSavings(state, amount) {
	const n = Math.round(amount);
	if (n < 1) return "Enter an amount.";
	if (state.savings < n) return "Savings is empty.";
	state.savings -= n;
	state.cash += n;
	return null;
}
function tryUnlockBlackCard(state) {
	const you = playerArtist(state) ?? rosterOf(state)[0];
	if (state.blackCard) return "Already issued.";
	if (state.creditScore < 760) return "Need FICO 760.";
	if ((you?.fame ?? 0) < 80 && state.cash + state.savings < 2e6) return "Need $2M liquid or 80 fame.";
	state.blackCard = true;
	state.cards.unshift({
		id: nid(state, "cc"),
		bankId: "onyx",
		name: "Onyx Black",
		limit: 5e5,
		used: 0,
		apr: 16.99,
		black: true
	});
	unlockAchievement(state, "black-card");
	pushNotif(state, {
		tone: "viral",
		title: "Black card",
		body: "Onyx sent metal. No limit on the floor."
	});
	pushMail(state, {
		kind: "brand",
		from: "Onyx Private",
		subject: "Your Black is live",
		body: "Invitation accepted. Concierge is on the other end of the number."
	});
	return null;
}
function hireEntourage(state, role, on) {
	state.entourage[role] = on;
	return null;
}
function buyJet(state, catalogId, plan) {
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
			weekly: item.weekly
		});
		pushNotif(state, {
			tone: "good",
			title: item.name,
			body: mode === "lease" ? `Fractional lease · $${quote.weekly.toLocaleString("en-US")}/wk.` : `Financed at ${quote.apr.toFixed(2)}%.`
		});
		return null;
	}
	const paid = settleDue(state, item.price, plan ?? cashPlan(item.price));
	if (paid) return paid;
	state.jets.push({
		catalogId: item.id,
		name: item.name,
		value: item.price,
		weekBought: state.week,
		weekly: item.weekly
	});
	pushNotif(state, {
		tone: "good",
		title: item.name,
		body: "Wheels up whenever you want."
	});
	return null;
}
function buyJewelry(state, catalogId, plan) {
	const you = playerArtist(state) ?? rosterOf(state)[0];
	const item = JEWELRY.find((j) => j.id === catalogId);
	if (!item) return "Not in the case.";
	if ((you?.fame ?? 0) < item.fameNeed) return `Fame ${item.fameNeed}.`;
	const paid = settleDue(state, item.price, plan ?? cashPlan(item.price));
	if (paid) return paid;
	state.jewelry.push({
		catalogId: item.id,
		name: item.name,
		value: item.price,
		weekBought: state.week,
		weekly: 0
	});
	if (you?.partner) you.partner.closeness = clamp$1(you.partner.closeness + 10, 0, 100);
	pushNotif(state, {
		tone: "good",
		title: item.name,
		body: "Ice photographed well."
	});
	return null;
}
function sendGift(state, giftId, plan) {
	const you = playerArtist(state);
	if (!you?.partner) return "No one to gift.";
	const g = GIFTS.find((x) => x.id === giftId);
	if (!g) return "Unknown gift.";
	const paid = settleDue(state, g.cost, plan ?? cashPlan(g.cost));
	if (paid) return paid;
	you.partner.closeness = clamp$1(you.partner.closeness + g.mood, 0, 100);
	you.mood = clamp$1(you.mood + 4, 0, 100);
	pushNotif(state, {
		tone: "good",
		title: `Gifted ${g.name}`,
		body: `${you.partner.name} noticed.`
	});
	pushMail(state, {
		kind: "family",
		from: you.partner.name,
		subject: g.name,
		body: `got it. closeness is ${Math.round(you.partner.closeness)}. don't make it a headline.`
	});
	return null;
}
function privateDay(state, catalogId, plan) {
	const you = playerArtist(state);
	if (!you) return "Artist career.";
	const blocked = barsBlock(state, "nightlife");
	if (blocked) return blocked;
	const day = LUXURY_DAYS.find((d) => d.id === catalogId);
	if (!day) return "Not on the desk.";
	if (you.fame < day.fameNeed) return `Fame ${day.fameNeed} to close the park.`;
	const paid = settleDue(state, day.cost, plan ?? cashPlan(day.cost));
	if (paid) return paid;
	you.mood = clamp$1(you.mood + day.mood, 0, 100);
	if (you.partner) you.partner.closeness = clamp$1(you.partner.closeness + 12, 0, 100);
	state.luxuryLog.unshift({
		id: nid(state, "lx"),
		week: state.week,
		name: day.name
	});
	state.luxuryLog = state.luxuryLog.slice(0, 24);
	if (day.id === "island") unlockAchievement(state, "island");
	pushNotif(state, {
		tone: "viral",
		title: day.name,
		body: "The public wasn't invited."
	});
	pushMail(state, {
		kind: "family",
		from: you.partner?.name ?? "Family office",
		subject: day.name,
		body: `the buyout closed. no press. ${you.kids.length ? "the kids lasted longer than the adults." : "quiet, finally."}`
	});
	return null;
}
function goOut(state, rng, catalogId, plan) {
	const you = playerArtist(state);
	if (!you) return "Artist career.";
	const blocked = barsBlock(state, "nightlife");
	if (blocked) return blocked;
	const night = NIGHTLIFE.find((n) => n.id === catalogId);
	if (!night) return "Not on the list.";
	if (you.fame < night.fameNeed) return `Fame ${night.fameNeed} to get past the rope.`;
	const paid = settleDue(state, night.cost, plan ?? cashPlan(night.cost));
	if (paid) return paid;
	you.mood = clamp$1(you.mood + night.mood, 0, 100);
	you.energy = clamp$1(you.energy - 18, 0, 100);
	you.addiction.alcohol = clamp$1(you.addiction.alcohol + 6, 0, 100);
	you.fame = clamp$1(you.fame + 1.2, 0, 100);
	growSocial(you, Math.round(80 + you.fame * 4));
	state.lastNightlifeWeek = state.week;
	if (night.id === "met") unlockAchievement(state, "gala");
	let extra = 0;
	if (night.id === "poker" || night.id === "casino") {
		const swing = Math.round((rng.next() - .42) * night.cost * 1.8);
		state.cash += swing;
		extra = swing;
	}
	pushNotif(state, {
		tone: extra >= 0 ? "good" : "info",
		title: night.name,
		body: extra ? `${extra >= 0 ? "Up" : "Down"} ${Math.abs(extra).toLocaleString("en-US")} at the table.` : "The room took photos."
	});
	if (rng.next() < night.scandal) openCase(state, rng, rng.chance(.5) ? "fight" : "dui");
	return null;
}
function useSubstance(state, rng, id, plan) {
	const you = playerArtist(state);
	if (!you) return "Artist career.";
	const blocked = barsBlock(state, "substance");
	if (blocked) return blocked;
	const s = SUBSTANCES.find((x) => x.id === id);
	if (!s) return "Unknown.";
	const paid = settleDue(state, s.cost, plan ?? cashPlan(s.cost));
	if (paid) return paid;
	you.addiction[id] = clamp$1(you.addiction[id] + s.addiction, 0, 100);
	you.stats.writing = clamp$1(you.stats.writing + s.creative * .15, 0, 99);
	you.energy = clamp$1(you.energy + 8 - s.crash * .3, 0, 100);
	you.vocalHealth = clamp$1(you.vocalHealth - (id === "smoke" ? 6 : 2), 0, 100);
	you.mental = clamp$1(you.mental - 3, 0, 100);
	if (you.addiction[id] > 72 && rng.chance(.22)) {
		you.energy = clamp$1(you.energy - 30, 0, 100);
		pushNotif(state, {
			tone: "bad",
			title: "Crash",
			body: "The session died. Vocal health took the hit."
		});
	}
	if (you.addiction[id] > 88 && rng.chance(.12)) {
		you.energy = 8;
		you.mental = clamp$1(you.mental - 20, 0, 100);
		pushNotif(state, {
			tone: "bad",
			title: "Overdose scare",
			body: "ER. The tabloids already have the intake photo."
		});
		openCase(state, rng, "contraband");
	}
	if (you.addiction[id] > 60 && rng.chance(.1)) {
		pushNotif(state, {
			tone: "bad",
			title: "Tox leak",
			body: "A panel is talking about your bloodwork."
		});
		you.reputation = clamp$1(you.reputation - 8, 0, 100);
	}
	return null;
}
function enterRehab(state, plan) {
	const you = playerArtist(state);
	if (!you) return "Artist career.";
	if (you.rehabWeeks > 0) return "Already checked in.";
	const cost = 48e3;
	const paid = settleDue(state, cost, plan ?? cashPlan(cost));
	if (paid) return paid;
	you.rehabWeeks = 4;
	you.onHoliday = true;
	you.holidayWeeks = Math.max(you.holidayWeeks, 4);
	pushNotif(state, {
		tone: "info",
		title: "Checked in",
		body: "Four weeks. No phone, no sessions, no tables."
	});
	pushMail(state, {
		kind: "legal",
		from: "Serenity Hills",
		subject: "Admission confirmed",
		body: "The house is closed to press. Four weeks. Family may write."
	});
	return null;
}
function writeJournal(state) {
	const you = playerArtist(state);
	if (!you) return "Artist career.";
	if (you.incarceratedWeeks <= 0) return "You're not inside.";
	you.mental = clamp$1(you.mental + 8, 0, 100);
	you.stats.writing = clamp$1(you.stats.writing + 1.2, 0, 99);
	you.streetCred = clamp$1(you.streetCred + 3, 0, 100);
	pushNotif(state, {
		tone: "info",
		title: "Journal page",
		body: "The verses from in here hit different."
	});
	return null;
}
function hireLawyer(state, rng, caseId, lawyerId, plan) {
	const c = state.legal.find((x) => x.id === caseId);
	if (!c || c.status === "cleared" || c.status === "jailed") return "That docket is closed.";
	const law = LAWYERS.find((l) => l.id === lawyerId);
	if (!law) return "Unknown counsel.";
	if (law.cost > 0) {
		const paid = settleDue(state, law.cost, plan ?? cashPlan(law.cost));
		if (paid) return paid;
	}
	c.lawyerId = law.id;
	const chance = .18 + law.skill / 140;
	if (rng.next() < chance) {
		c.status = "cleared";
		c.weeksLeft = 0;
		unlockAchievement(state, "cleared");
		pushNotif(state, {
			tone: "good",
			title: "Case dropped",
			body: `${law.name} walked it.`
		});
	} else pushNotif(state, {
		tone: "info",
		title: "Retainer in",
		body: `${law.name} is on the file. Trial still sits.`
	});
	return null;
}
function postBail(state, caseId, plan) {
	const c = state.legal.find((x) => x.id === caseId);
	if (!c || c.status !== "open" && c.status !== "trial") return "Nothing to post.";
	const paid = settleDue(state, c.bail, plan ?? cashPlan(c.bail));
	if (paid) return paid;
	c.status = "bail";
	const you = playerArtist(state);
	if (you) you.incarceratedWeeks = 0;
	pushNotif(state, {
		tone: "good",
		title: "Out on bail",
		body: "Don't leave the state. Don't post about it."
	});
	return null;
}
function emptyRegions() {
	const o = {};
	for (const r of REGIONS) o[r.id] = {
		streams: 0,
		digital: 0,
		physical: 0,
		radio: 0
	};
	return o;
}
function makeOstSong(state, artist, title) {
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
		ost: true
	};
}
function auditionFilm(state, rng, catalogId) {
	const you = playerArtist(state);
	if (!you) return "Artist career.";
	const blocked = barsBlock(state, "film");
	if (blocked) return blocked;
	const catalog = FILMS.find((f) => f.id === catalogId);
	const slate = state.films.find((f) => f.catalogId === catalogId && f.status === "pre");
	const film = catalog ? {
		id: catalog.id,
		title: catalog.title,
		studio: catalog.studio,
		budget: catalog.budget,
		fameNeed: catalog.fameNeed,
		pay: catalog.pay,
		weeks: catalog.weeks,
		role: catalog.role,
		ost: catalog.ost
	} : slate ? {
		id: slate.catalogId,
		title: slate.title,
		studio: slate.studio,
		budget: slate.budget,
		fameNeed: slate.fameNeed ?? 20,
		pay: slate.pay,
		weeks: slate.weeksLeft || 3,
		role: slate.role === "none" ? "cameo" : slate.role,
		ost: Boolean(slate.ostOffer || slate.ostSongId)
	} : null;
	if (!film) return "Script not on the pile.";
	if (state.films.some((f) => f.catalogId === film.id && f.artistId === you.id && f.status !== "done" && f.status !== "pre")) return "You're already on that picture.";
	if (you.fame < film.fameNeed) return `They want fame ${film.fameNeed}. You're ${Math.round(you.fame)}.`;
	const chance = clamp$1(.22 + you.fame / 140 + you.stats.charisma / 220 + you.stats.looks / 280, .12, .88);
	if (rng.next() > chance) {
		pushNotif(state, {
			tone: "info",
			title: `Passed on ${film.title}`,
			body: "Chemistry read didn't land. The tape stays in the room."
		});
		pushMail(state, {
			kind: "film",
			from: film.studio,
			subject: `Re: ${film.title}`,
			body: "We went another direction. Keep us in mind for the sequel's party scene."
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
		you.energy = clamp$1(you.energy - 16, 0, 100);
		you.fame = clamp$1(you.fame + (film.role === "lead" ? 8 : film.role === "supporting" ? 4 : 2), 0, 100);
		pushNotif(state, {
			tone: "viral",
			title: `Booked ${film.title}`,
			body: `${film.role} · ${film.studio} · $${film.pay.toLocaleString("en-US")}.`
		});
		pushMail(state, {
			kind: "film",
			from: film.studio,
			subject: `${film.title} — deal closed`,
			body: `Call time is next week. Role: ${film.role}. ${film.ost ? "Your OST masters with the picture." : "No soundtrack this time."}`
		});
		return null;
	}
	const run = {
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
		ostOffer: film.ost
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
	you.energy = clamp$1(you.energy - 16, 0, 100);
	you.fame = clamp$1(you.fame + (film.role === "lead" ? 8 : film.role === "supporting" ? 4 : 2), 0, 100);
	pushNotif(state, {
		tone: "viral",
		title: `Booked ${film.title}`,
		body: `${film.role} · ${film.studio} · $${film.pay.toLocaleString("en-US")}.`
	});
	pushMail(state, {
		kind: "film",
		from: film.studio,
		subject: `${film.title} — deal closed`,
		body: `Call time is next week. Role: ${film.role}. ${film.ost ? "Your OST masters with the picture." : "No soundtrack this time."}`
	});
	return null;
}
function growSocial(artist, n) {
	artist.followers.instagram += n;
	artist.followers.x += Math.round(n * .6);
	artist.followers.tiktok += Math.round(n * .4);
}
function openCase(state, rng, kind) {
	const you = playerArtist(state);
	if (!you) return;
	const bail = kind === "fraud" ? 18e4 : kind === "dui" ? 28e3 : kind === "fight" ? 12e3 : 22e3;
	const note = kind === "fight" ? "Club cameras. Someone swung first. Everyone has a lawyer." : kind === "dui" ? "Pulled over after the table. Breathalyzer did not lie." : kind === "contraband" ? "Search after the afterparty. The bag wasn't empty." : kind === "fraud" ? "Forensic accountants at the label. The advance paper doesn't match." : "A leaked tape. The other side wants money and an apology.";
	const weeks = kind === "fraud" ? 12 : kind === "dui" ? 4 : 3;
	state.legal.unshift({
		id: nid(state, "cs"),
		kind,
		week: state.week,
		status: "open",
		bail,
		fine: Math.round(bail * .6),
		weeksLeft: weeks,
		lawyerId: null,
		note
	});
	you.streetCred = clamp$1(you.streetCred + (kind === "fight" ? 8 : 3), 0, 100);
	you.reputation = clamp$1(you.reputation - 6, 0, 100);
	you.mood = clamp$1(you.mood - 10, 0, 100);
	scandalParents(you, kind === "fraud" ? 18 : 12);
	pushNotif(state, {
		tone: "bad",
		title: `Charged · ${kind}`,
		body: note
	});
	pushMail(state, {
		kind: "legal",
		from: "County Clerk",
		subject: `People v. ${you.name}`,
		body: `${note} Bail ${bail.toLocaleString("en-US")}. Hire counsel or sit the weeks.`,
		payload: state.legal[0]?.id
	});
}
function rankBoxOffice(state) {
	const live = state.films.filter((f) => f.status === "released");
	live.sort((a, b) => b.grossWeek - a.grossWeek);
	live.forEach((f, i) => {
		f.boxRank = i + 1;
	});
	state.films.filter((f) => f.status !== "released").forEach((f) => {
		f.boxRank = null;
	});
}
function refreshHollywood(state, rng) {
	if (state.week % 6 !== 1) return;
	state.films = state.films.filter((f) => !f.catalogId.startsWith("slate") || f.artistId || f.status !== "pre");
	const titles = rng.shuffle([...FILM_TITLES]);
	const studios = rng.shuffle([...FILM_STUDIOS]);
	const roles = [
		"cameo",
		"cameo",
		"supporting",
		"lead",
		"voice",
		"cameo"
	];
	for (let i = 0; i < 6; i++) {
		const role = roles[i];
		const ost = role === "voice" || role === "lead" || rng.chance(.35);
		const budget = Math.round((role === "lead" ? 160 : role === "supporting" ? 80 : 22) * 1e6 * (.7 + rng.next() * .8));
		const fameNeed = role === "lead" ? 62 : role === "supporting" ? 38 : role === "voice" ? 28 : 12;
		const pay = Math.round(fameNeed * 2400 * (.8 + rng.next()));
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
			ostOffer: ost
		});
	}
	for (const f of state.films) {
		if (f.artistId || f.status !== "released") continue;
		if (rng.chance(.35)) {
			f.title = rng.pick([...FILM_TITLES]);
			f.studio = rng.pick([...FILM_STUDIOS]);
		}
	}
	rankBoxOffice(state);
}
function seedFilms(state, rng) {
	if (state.films.length) return;
	for (const f of FILMS) {
		const age = rng.int(0, 8);
		const weekly = Math.round(f.budget * (.08 + rng.next() * .22));
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
			pay: 0
		});
	}
	rankBoxOffice(state);
	refreshHollywood(state, rng);
}
function tickMail(state, rng) {
	const you = playerArtist(state) ?? rosterOf(state)[0];
	if (!you) return;
	if (rng.chance(.35)) pushMail(state, {
		kind: "producer",
		from: rng.pick([
			"Room 404",
			"Harbor writers",
			"Stockholm camp",
			"Atlanta rooms"
		]),
		subject: "Beat pack",
		body: "six joints, no sample issues. first right of refusal till Friday."
	});
	if (you.fame > 18 && rng.chance(.22)) pushMail(state, {
		kind: "sponsor",
		from: rng.pick([
			"Nike",
			"Pepsi",
			"Beats",
			"Cîroc",
			"Samsung"
		]),
		subject: "Partnership deck",
		body: `numbers look like a ${Math.round(8e3 + you.fame * 180).toLocaleString("en-US")}/wk kit if you wear the logo.`
	});
	if (you.fame > 24 && rng.chance(.2)) {
		const film = rng.pick([...FILMS]);
		pushMail(state, {
			kind: "film",
			from: film.studio,
			subject: `${film.title} — chemistry read`,
			body: `role ${film.role}. fame bar ${film.fameNeed}. pay $${film.pay.toLocaleString("en-US")}. Hollywood tab has the script.`,
			payload: film.id
		});
	}
	if (you.popularity > 22 && rng.chance(.18)) pushMail(state, {
		kind: "tour",
		from: "CAA routing",
		subject: "Offer: rooms that fit",
		body: "promoters want a run. Tours tab already knows which rooms you can fill."
	});
	if (you.partner && rng.chance(.25)) pushNotif(state, {
		tone: "info",
		title: rng.pick([
			"Dinner?",
			"Don't post that",
			"Are you coming home"
		]),
		body: `${you.partner.name} · closeness ${Math.round(you.partner.closeness)}. Fame is a roommate now.`
	});
	if (state.deals.some((d) => d.status === "open") && rng.chance(.5)) {
		const d = state.deals.find((x) => x.status === "open");
		pushMail(state, {
			kind: "label",
			from: d.labelName,
			subject: "The offer is still on the table",
			body: `Advance $${d.advance.toLocaleString("en-US")} · royalty ${Math.round(d.royalty * 100)}% · ${d.albums} albums.`
		});
	}
}
function tickHealth(state, rng) {
	const you = playerArtist(state);
	if (!you) return;
	ensureHealth(you);
	if (you.rehabWeeks > 0) {
		you.rehabWeeks -= 1;
		you.addiction.alcohol = clamp$1(you.addiction.alcohol - 12, 0, 100);
		you.addiction.pills = clamp$1(you.addiction.pills - 14, 0, 100);
		you.addiction.smoke = clamp$1(you.addiction.smoke - 10, 0, 100);
		you.mental = clamp$1(you.mental + 8, 0, 100);
		you.vocalHealth = clamp$1(you.vocalHealth + 4, 0, 100);
		if (you.rehabWeeks <= 0) {
			unlockAchievement(state, "rehab");
			pushNotif(state, {
				tone: "good",
				title: "Discharged",
				body: "Thirty days. The meters are quieter."
			});
		}
	} else {
		you.addiction.alcohol = clamp$1(you.addiction.alcohol - 1.2, 0, 100);
		you.addiction.pills = clamp$1(you.addiction.pills - 1.4, 0, 100);
		you.addiction.smoke = clamp$1(you.addiction.smoke - .8, 0, 100);
		you.vocalHealth = clamp$1(you.vocalHealth + (you.energy > 50 ? 2 : -1), 20, 100);
		you.mental = clamp$1(you.mental + rng.gauss(.4, 3), 8, 100);
	}
	if (you.incarceratedWeeks > 0) {
		you.incarceratedWeeks -= 1;
		you.energy = clamp$1(you.energy - 8, 10, 100);
		you.mental = clamp$1(you.mental - 4, 8, 100);
		you.streetCred = clamp$1(you.streetCred + 2, 0, 100);
		you.stats.writing = clamp$1(you.stats.writing + .4, 0, 99);
		if (you.incarceratedWeeks <= 0) pushNotif(state, {
			tone: "good",
			title: "Released",
			body: "The gate opened. The internet already posted the walk."
		});
	}
}
function tickLegal(state, rng, ledger) {
	const you = playerArtist(state);
	for (const c of state.legal) {
		if (c.status === "cleared" || c.status === "jailed") continue;
		c.weeksLeft -= 1;
		if (c.weeksLeft > 0) continue;
		const law = LAWYERS.find((l) => l.id === c.lawyerId);
		const chance = .12 + (law ? law.skill / 130 : 0);
		if (rng.next() < chance) {
			c.status = "cleared";
			unlockAchievement(state, "cleared");
			pushNotif(state, {
				tone: "good",
				title: "Not guilty",
				body: c.note
			});
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
				body: "You can still write. You cannot tour, film, or go out."
			});
		}
	}
}
function tickFilms(state, rng) {
	for (const f of state.films) if (f.status === "shooting") {
		f.weeksLeft -= 1;
		if (f.weeksLeft <= 0) {
			f.status = "released";
			f.weeksLeft = 6;
			f.grossWeek = Math.round(f.budget * (.12 + rng.next() * .28) * (f.role === "lead" ? 1.35 : 1));
			f.gross = f.grossWeek;
			if (f.artistId) unlockAchievement(state, "box-office");
			if (f.ostSongId) {
				const song = state.songs.find((s) => s.id === f.ostSongId);
				if (song) {
					song.releasedWeek = state.week;
					song.status = "released";
					song.streamsWeek = Math.round(f.grossWeek * .012);
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
				body: `$${Math.round(f.grossWeek / 1e6)}M weekend${f.role !== "none" ? ` · you as ${f.role}` : ""}.`
			});
		}
	} else if (f.status === "released") {
		f.grossWeek = Math.round(f.grossWeek * (.52 + rng.next() * .16));
		f.gross += f.grossWeek;
		f.weeksLeft -= 1;
		if (f.weeksLeft <= 0 || f.grossWeek < 4e5) f.status = "done";
	}
	rankBoxOffice(state);
}
function tickBankExtras(state, ledger) {
	if (state.savings > 0) {
		const interest = Math.round(state.savings * (state.savingsApr / 100 / 52));
		state.savings += interest;
	}
	const you = playerArtist(state) ?? rosterOf(state)[0];
	if (!state.blackCard && you && state.creditScore >= 760 && (you.fame >= 80 || state.cash + state.savings >= 2e6)) {
		if (!state.mail.some((m) => m.subject.includes("Black card") && state.week - m.week < 8)) pushMail(state, {
			kind: "brand",
			from: "Onyx Private",
			subject: "Black card invitation",
			body: "FICO and liquidity cleared. Open Bank to accept the metal."
		});
	}
	let burn = 0;
	for (const role of ENT_ROLES) if (state.entourage[role.id]) burn += role.weekly;
	for (const j of state.jets) burn += j.weekly;
	for (const b of state.buses) burn += b.weekly;
	for (const i of state.islands ?? []) burn += i.weekly;
	const crew = state.jetCrew ?? {
		pilots: 0,
		attendants: 0
	};
	burn += crew.pilots * 4e3 + crew.attendants * 2200;
	if (burn > 0) {
		state.cash -= burn;
		ledger.security += burn;
	}
}
function tickLife(state, rng, ledger) {
	ensureLifeState(state);
	tickHealth(state, rng);
	tickLegal(state, rng, ledger);
	tickFilms(state, rng);
	tickMail(state, rng);
	tickBankExtras(state, ledger);
	const you = playerArtist(state);
	if (you && you.incarceratedWeeks > 0 && rng.chance(.4)) pushNotif(state, {
		tone: "info",
		title: "Visiting hours",
		body: `${you.partner?.name ?? you.parents.mom} came. They counted the minutes. Write the record anyway.`
	});
}
function featureFeeForGuest(guest, state) {
	syncPopularity(guest);
	const p = guest.popularity;
	let fee = 2400 * Math.pow(1.072, p);
	if (state) {
		const peaks = state.songs.filter((s) => s.artistId === guest.id || s.collabArtistId === guest.id).map((s) => s.peakChart).filter((n) => typeof n === "number");
		const best = peaks.length ? Math.min(...peaks) : 99;
		if (best === 1) fee *= 2.4;
		else if (best <= 5) fee *= 1.85;
		else if (best <= 10) fee *= 1.5;
		else if (best <= 20) fee *= 1.28;
		else if (best <= 40) fee *= 1.12;
	}
	if (guest.superstar || guest.real) fee *= 1.62;
	const t = popTier(guest);
	if (t === "mega") fee = Math.max(fee, 125e4);
	if (t === "alist") fee = Math.max(fee, 52e4);
	return Math.round(Math.min(fee, 48e5));
}
function featureQuote(state, guest, host) {
	const fee = featureFeeForGuest(guest, state);
	const split = clamp$1(.14 + guest.popularity / 380, .12, .42);
	const tier = popTier(guest);
	if (!host) return {
		fee,
		split,
		ok: true,
		reason: "",
		tier
	};
	const ht = popTier(host);
	const hostPeak = state.songs.filter((s) => s.artistId === host.id && s.peakChart != null).reduce((n, s) => Math.min(n, s.peakChart ?? 99), 99);
	const gap = guest.popularity - host.popularity;
	const aList = tier === "alist" || tier === "mega" || guest.superstar || guest.real || guest.popularity >= 76;
	const proven = hostPeak <= 20 && host.fame >= 40 && host.popularity >= 32;
	if (aList && !proven) return {
		fee,
		split,
		ok: false,
		reason: `${guest.name}'s camp won't take the meeting. Chart a Hot 100 and get famous first — you can't buy the top.`,
		tier
	};
	if (gap > 38 && host.fame < 42) return {
		fee,
		split,
		ok: false,
		reason: `${guest.name} doesn't hop on unproven records. Build a catalog they can hear.`,
		tier
	};
	if ((ht === "newcomer" || ht === "rising") && fee >= 8e4) return {
		fee,
		split,
		ok: false,
		reason: `That verse is ${Math.round(fee / 1e3)}k. Grind the local rooms until your name clears the door.`,
		tier
	};
	return {
		fee,
		split,
		ok: true,
		reason: "",
		tier
	};
}
function hot100Points(state, song) {
	const tok = state.clips.filter((c) => c.songId === song.id).reduce((n, c) => n + c.viewsWeek, 0);
	return song.streamsWeek + song.salesDigitalWeek * 1250 + song.salesPhysicalWeek * 1500 + (song.radioWeeks > 0 ? song.radioPower * 220 : song.radioPower * 18) + tok * .22 + song.promoHeat * 80;
}
function albumUnitsOf(song) {
	const pure = song.salesPhysicalWeek + song.salesDigitalWeek * .35;
	const tea = song.salesDigitalWeek / 10;
	const sea = song.streamsWeek / 1250;
	return pure + tea + sea;
}
var STREAM_RATE = .0042;
var EMPTY_REGIONS = () => {
	const o = {};
	for (const r of REGIONS) o[r.id] = {
		streams: 0,
		digital: 0,
		physical: 0,
		radio: 0
	};
	return o;
};
var EMPTY_REP = () => {
	const o = {};
	for (const r of REGIONS) o[r.id] = 8;
	return o;
};
function emptyLedger() {
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
		gross: 0
	};
}
function blankVerified() {
	return {
		tiktok: false,
		x: false,
		instagram: false,
		youtube: false,
		spotify: false
	};
}
function playerSongs(state) {
	const ids = new Set(rosterOf(state).map((a) => a.id));
	return state.songs.filter((s) => ids.has(s.artistId));
}
function unsignedProspects(state) {
	return state.artists.filter((a) => !a.signed && a.id !== state.playerArtistId && !a.superstar && !a.real);
}
function fypClips(state) {
	return [...state.clips].sort((a, b) => b.viewsWeek + b.views * .02 - (a.viewsWeek + a.views * .02));
}
function fourWeekStreams(artist) {
	return artist.weeklyStreamHistory.slice(-4).reduce((n, x) => n + x, 0);
}
/** Spotify monthly listeners === last 4 weeks of streams. Never a phantom number. */
function syncMonthly(artist) {
	artist.monthlyListeners = Math.max(0, Math.round(fourWeekStreams(artist)));
}
function growFollowers(artist, platform, amount, min = 1) {
	if (amount <= 0) return 0;
	const n = Math.max(min, Math.round(amount));
	artist.followers[platform] += n;
	return n;
}
function pushAlert(state, a) {
	state.xAlerts.unshift({
		id: nid(state, "al"),
		week: state.week,
		...a
	});
	state.xAlerts = state.xAlerts.slice(0, 40);
}
function applyVerification(state, artist, announce = true) {
	if (isControlled(state, artist)) return;
	grantVerify(state, artist, announce);
}
function grantVerify(state, artist, announce) {
	const v = artist.verified;
	const controlled = announce && isControlled(state, artist);
	if (!v.tiktok && artist.followers.tiktok >= VERIFY_AT.tiktok) {
		v.tiktok = true;
		if (controlled) {
			pushNotif(state, {
				tone: "good",
				title: `${artist.name} verified on TikTok`,
				body: "Application approved. 100,000 followers. The badge is live."
			});
			unlockAchievement(state, "verified-tt");
		}
	}
	if (!v.x && artist.followers.x >= VERIFY_AT.x) {
		v.x = true;
		if (controlled) {
			pushNotif(state, {
				tone: "good",
				title: `${artist.name} verified on X`,
				body: "Blue check. Application cleared."
			});
			pushAlert(state, {
				kind: "verify",
				handle: "x",
				text: `@${artist.handle} is verified on X.`
			});
		}
	}
	if (!v.instagram && artist.followers.instagram >= VERIFY_AT.instagram) {
		v.instagram = true;
		if (controlled) pushNotif(state, {
			tone: "good",
			title: `${artist.name} verified on Instagram`,
			body: "The grid got a checkmark."
		});
	}
	if (!v.youtube && artist.followers.youtube >= VERIFY_AT.youtube) {
		v.youtube = true;
		if (controlled) pushNotif(state, {
			tone: "good",
			title: `${artist.name} verified on YouTube`,
			body: "100k subscribers. Badge on."
		});
	}
	if (!v.spotify && artist.monthlyListeners >= VERIFY_AT.spotify) {
		v.spotify = true;
		if (controlled) {
			pushNotif(state, {
				tone: "good",
				title: `${artist.name} verified on Spotify`,
				body: "50,000 monthly listeners over four weeks. Official artist channel unlocked."
			});
			unlockAchievement(state, "spotify-50k");
		}
	}
	if (v.tiktok && v.x && v.instagram && v.youtube && v.spotify) unlockAchievement(state, "verified-all");
}
function platformReach(artist, platform) {
	return platform === "spotify" ? artist.monthlyListeners : artist.followers[platform];
}
function applyForVerify(state, artistId, platform) {
	const artist = state.artists.find((a) => a.id === artistId);
	if (!artist || !isControlled(state, artist)) return "Not your account.";
	if (artist.verified[platform]) return "Already verified.";
	const need = VERIFY_AT[platform];
	if (platformReach(artist, platform) < need) return platform === "spotify" ? `Need ${need.toLocaleString("en-US")} monthly listeners (last 4 weeks).` : `Need ${need.toLocaleString("en-US")} followers first.`;
	artist.verified[platform] = true;
	grantVerify(state, artist, true);
	if (platform === "tiktok") unlockAchievement(state, "verified-tt");
	if (platform === "spotify") unlockAchievement(state, "spotify-50k");
	pushNotif(state, {
		tone: "good",
		title: `Verified on ${platform === "x" ? "X" : platform === "tiktok" ? "TikTok" : platform === "instagram" ? "Instagram" : platform === "youtube" ? "YouTube" : "Spotify"}`,
		body: "You applied. They approved. The mark is on the profile."
	});
	if (artist.verified.tiktok && artist.verified.x && artist.verified.instagram && artist.verified.youtube && artist.verified.spotify) unlockAchievement(state, "verified-all");
	return null;
}
function blankProfiles(handle, bio, avatar) {
	const one = () => ({
		handle,
		bio,
		avatar: { ...avatar }
	});
	return {
		tiktok: one(),
		x: one(),
		instagram: one(),
		youtube: one(),
		spotify: one()
	};
}
function ensureArtistExtras(artist) {
	if (!artist.profiles) artist.profiles = blankProfiles(artist.handle, artist.bio, artist.avatar);
	if (typeof artist.popularity !== "number") artist.popularity = 0;
	if (typeof artist.wikiViews !== "number") artist.wikiViews = 0;
	for (const p of [
		"tiktok",
		"x",
		"instagram",
		"youtube",
		"spotify"
	]) if (!artist.profiles[p]) artist.profiles[p] = {
		handle: artist.handle,
		bio: artist.bio,
		avatar: { ...artist.avatar }
	};
	ensureHealth(artist);
	ensureFamily(artist);
}
function profileOf(artist, platform) {
	ensureArtistExtras(artist);
	return artist.profiles[platform];
}
function featureFeeFor(guest, state) {
	return featureFeeForGuest(guest, state);
}
function featName(state, song) {
	if (!song.collabArtistId) return null;
	return state.artists.find((a) => a.id === song.collabArtistId)?.name ?? null;
}
function creditLine(state, song) {
	const a = state.artists.find((x) => x.id === song.artistId)?.name ?? "Unknown";
	const g = featName(state, song);
	return g ? `${a} feat. ${g}` : a;
}
function venueDraw(artist, capacity) {
	const pop = Number(artist.popularity) || 0;
	const fame = Number(artist.fame) || 0;
	const fans = Number(artist.fans) || 0;
	const monthly = Number(artist.monthlyListeners) || 0;
	const social = (artist.followers?.tiktok ?? 0) + (artist.followers?.instagram ?? 0) + (artist.followers?.x ?? 0);
	const demand = Math.round(90 + fans * .32 + monthly * .045 + pop * 38 + fame * 22 + social * .09);
	const attendance = Math.max(12, Math.min(capacity, demand));
	const fill = attendance / Math.max(1, capacity);
	const canFill = fill >= .7;
	return {
		attendance,
		fill,
		canFill,
		note: fill >= .98 ? "Sold out" : canFill ? "Can fill" : fill >= .4 ? "Half room" : "Won't fill"
	};
}
function editPlatformProfile(state, artistId, platform, patch) {
	const artist = state.artists.find((a) => a.id === artistId);
	if (!artist || !isControlled(state, artist)) return "Not your profile.";
	ensureArtistExtras(artist);
	const p = artist.profiles[platform];
	if (patch.handle) p.handle = handleize(patch.handle) || p.handle;
	if (patch.bio !== void 0) p.bio = patch.bio.slice(0, 160);
	if (patch.avatar) {
		p.avatar = { ...patch.avatar };
		if (patch.avatar.photo) artist.avatar.photo = patch.avatar.photo;
	}
	if (platform === "x" || platform === "tiktok") artist.handle = p.handle;
	return null;
}
function qualityOf(s) {
	return Math.round(s.writing * .28 + s.production * .22 + s.hook * .32 + s.mix * .18);
}
function makeSound(state, name, artistName, songId) {
	return {
		id: nid(state, "snd"),
		name,
		songId,
		artistName,
		uses: 0,
		trending: false,
		trendRank: null,
		week: state.week
	};
}
function fromSeed(state, seed, extra = {}) {
	const artist = {
		id: nid(state, "a"),
		name: seed.name,
		handle: seed.handle,
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
		weeklyStreamHistory: [
			0,
			0,
			0,
			0
		],
		signed: false,
		labelId: null,
		royalty: .22,
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
		parents: {
			mom: "Mom",
			dad: "Dad",
			closeness: 70,
			cards: []
		},
		gender: extra.gender ?? "female",
		orientation: extra.orientation ?? "straight",
		pregnancy: null,
		lastIntimacyWeek: 0,
		aiControl: false,
		onHoliday: false,
		holidayWeeks: 0,
		hiatus: false,
		coaching: {
			vocal: 0,
			dance: 0,
			general: 0,
			band: 0
		},
		real: false,
		superstar: false,
		popularity: 0,
		profiles: blankProfiles(seed.handle, seed.bio, seed.avatar),
		wikiViews: 0,
		vocalHealth: 88,
		mental: 74,
		addiction: {
			alcohol: 0,
			pills: 0,
			smoke: 0
		},
		rehabWeeks: 0,
		incarceratedWeeks: 0,
		streetCred: extra.superstar || extra.real ? 40 : 8,
		...extra
	};
	if (!artist.profiles) artist.profiles = blankProfiles(artist.handle, artist.bio, artist.avatar);
	ensureFamily(artist, mulberry32(state.seed + state.idSeq * 17 + artist.age));
	const homeRegion = CITY_TO_REGION[artist.hometown] ?? "northamerica";
	artist.regionalRep[homeRegion] = Math.min(90, 20 + artist.fame);
	syncPopularity(artist);
	applyVerification(state, artist, false);
	return artist;
}
function writeSong(state, rng, artist, npc = false) {
	const studio = 48 + state.studioTier * 14;
	const writing = clamp$1(Math.round(artist.stats.writing * .7 + artist.potential * .15 + rng.gauss(0, 8)), 30, 99);
	const hook = clamp$1(Math.round(artist.stats.writing * .35 + artist.stats.charisma * .25 + artist.potential * .2 + rng.gauss(0, 8)), 28, 99);
	const production = clamp$1(Math.round(studio * .55 + artist.stats.workEthic * .25 + rng.gauss(0, 7)), 30, 99);
	const mix = clamp$1(Math.round(studio * .6 + rng.gauss(0, 6)), 30, 99);
	const s = {
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
		releaseFormat: "both",
		bside: false,
		salesDigitalWeek: 0,
		salesPhysicalWeek: 0,
		chartPoints: 0,
		albumUnits: 0,
		ost: false
	};
	s.quality = qualityOf(s);
	return s;
}
function defaultSettings(database) {
	return {
		autosave: true,
		database,
		difficulty: "normal",
		reduceMotion: false,
		showAwards: true,
		donationPrompted: false
	};
}
function blankState(seed, city, career, database) {
	return {
		version: 7,
		seed,
		week: 1,
		cash: career === "label" ? 185e3 : 16500,
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
		rivals: RIVAL_LABELS.map((name, i) => ({
			id: `riv_${i}`,
			name
		})),
		ledger: emptyLedger(),
		idSeq: 1,
		tutorial: 1,
		lastRollout: null,
		creditScore: career === "label" ? 690 : 628,
		loans: [],
		cards: [],
		houses: [],
		cars: [],
		merch: [{
			id: "m_tee",
			name: "Logo tee",
			kind: "tee",
			price: 35,
			cost: 8,
			stock: 40,
			sold: 0,
			autoStock: true
		}, {
			id: "m_hat",
			name: "Tour hat",
			kind: "hat",
			price: 28,
			cost: 6,
			stock: 20,
			sold: 0,
			autoStock: false
		}],
		merchSiteLive: false,
		merchVisitsWeek: 0,
		tours: [],
		awards: [],
		campaigns: [],
		fanEvents: [],
		achievements: [],
		securityGuards: 0,
		facilities: {
			studio: false,
			manufacturing: false,
			distribution: false
		},
		investors: [],
		sponsors: [],
		ceoSalary: career === "label" ? 2200 : 0,
		settings: defaultSettings(database),
		liveViewers: {
			tiktok: 0,
			x: 0,
			instagram: 0,
			youtube: 0
		},
		lastLiveWeek: 0,
		songMarket: [],
		pendingAudition: null,
		eurovision: null,
		talentShow: {
			stage: "none",
			week: 0
		},
		features: [],
		mail: [],
		films: [],
		legal: [],
		savings: career === "label" ? 12e3 : 800,
		savingsApr: 4.35,
		blackCard: false,
		jets: [],
		jewelry: [],
		buses: [],
		entourage: {
			driver: false,
			chef: false,
			paparazzi: false
		},
		lastNightlifeWeek: 0,
		luxuryLog: [],
		statements: [],
		cardAutopay: false,
		ceremony: null,
		gigs: [],
		lands: [],
		islands: [],
		jetCrew: {
			pilots: 0,
			attendants: 0
		},
		lastParentWeek: 0,
		updateVersion: "2026.8.24"
	};
}
function seedHit(state, rng, artist, title, weekly, lifetime, ageWeeks, kind = "single") {
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
		weekly
	];
	song.sales = Math.round(lifetime * .002);
	song.salesDigital = Math.round(lifetime * .0012);
	song.salesPhysical = Math.round(lifetime * (kind === "album" ? 8e-4 : 15e-5));
	song.radioPower = clamp$1(40 + artist.fame * .4, 20, 99);
	song.radioWeeks = rng.int(2, 8);
	song.playlist = true;
	song.promoHeat = 55 + artist.fame * .3;
	song.lastPromoWeek = state.week;
	song.quality = clamp$1(70 + Math.round(artist.fame / 8), 60, 99);
	const home = CITY_TO_REGION[artist.hometown] ?? "northamerica";
	song.regional[home].streams = Math.round(lifetime * .48);
	song.regional[home].digital = Math.round(lifetime * .001);
	const sound = makeSound(state, song.title, artist.name, song.id);
	sound.uses = Math.round(weekly * .04);
	song.soundId = sound.id;
	state.sounds.push(sound);
	state.songs.push(song);
	const clip = ownedStyleClip(state, rng, artist, song, sound, false);
	clip.owned = false;
	clip.views = Math.round(weekly * (1.8 + rng.next()));
	clip.viewsWeek = Math.round(clip.views * .12);
	clip.likes = Math.round(clip.views * .08);
	state.clips.push(clip);
	return song;
}
function announceCollab(state, rng, song) {
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
			`told you I was getting ${guest} on this one.`
		]),
		week: state.week,
		likes: rng.int(80, 12e3),
		reposts: rng.int(10, 1400),
		replies: rng.int(8, 600),
		owned: isControlled(state, host),
		avatar: hp.avatar,
		verified: host.verified.x
	});
}
function pairWorldFeatures(state, rng) {
	const pool = state.artists.filter((a) => a.superstar || a.real || a.fame > 16);
	if (pool.length < 2) return;
	const singles = state.songs.filter((s) => s.status === "released" && s.kind === "single" && !s.collabArtistId);
	for (const song of singles) {
		const host = state.artists.find((a) => a.id === song.artistId);
		if (!host || isControlled(state, host)) continue;
		const chance = host.superstar || host.real ? .78 : .46;
		if (!rng.chance(chance)) continue;
		const guests = pool.filter((a) => a.id !== song.artistId);
		if (!guests.length) continue;
		song.collabArtistId = rng.pick(guests).id;
		announceCollab(state, rng, song);
	}
}
function seedOfficialVideo(state, rng, artist, song) {
	if (state.videos.some((v) => v.songId === song.id && v.kind === "traditional")) return;
	const guest = featName(state, song);
	const views = Math.round((song.streams * .07 + artist.followers.youtube * .35) * (.55 + rng.next() * .7));
	state.videos.push({
		id: nid(state, "yt"),
		artistId: artist.id,
		songId: song.id,
		title: guest ? `${song.title} (feat. ${guest}) (Official Video)` : `${song.title} (Official Video)`,
		kind: "traditional",
		week: song.releasedWeek ?? 1,
		views: Math.max(800, views),
		viewsWeek: Math.round(Math.max(800, views) * .09),
		likes: Math.round(Math.max(800, views) * .048),
		comments: Math.round(Math.max(800, views) * .0035),
		quality: clamp$1(70 + Math.round(artist.fame / 8), 50, 96),
		cost: 0,
		celebrity: guest,
		location: artist.hometown
	});
}
function seedWorldVideos(state, rng) {
	const released = state.songs.filter((s) => s.status === "released").slice().sort((a, b) => b.streamsWeek - a.streamsWeek).slice(0, 48);
	for (const song of released) {
		const artist = state.artists.find((a) => a.id === song.artistId);
		if (!artist) continue;
		seedOfficialVideo(state, rng, artist, song);
		if (rng.chance(.42) && song.kind === "single") {
			const views = Math.round((song.streams * .02 + artist.followers.youtube * .08) * (.4 + rng.next()));
			const guest = featName(state, song);
			state.videos.push({
				id: nid(state, "yt"),
				artistId: artist.id,
				songId: song.id,
				title: guest ? `${song.title} (feat. ${guest}) (Official Audio)` : `${song.title} (Official Audio)`,
				kind: "lyrics",
				week: (song.releasedWeek ?? 1) + 1,
				views: Math.max(400, views),
				viewsWeek: Math.round(Math.max(400, views) * .07),
				likes: Math.round(Math.max(400, views) * .03),
				comments: Math.round(Math.max(400, views) * .002),
				quality: 62,
				cost: 0,
				celebrity: guest,
				location: null
			});
		}
		if (rng.chance(.28)) {
			const views = Math.round((artist.followers.youtube * .12 + rng.next() * 4e4) * (.5 + rng.next()));
			state.videos.push({
				id: nid(state, "yt"),
				artistId: artist.id,
				songId: song.id,
				title: rng.pick([
					`${artist.name} — studio vlog`,
					`A week in ${artist.hometown}`,
					`${song.title} (Live)`,
					`Behind “${song.title}”`
				]),
				kind: rng.chance(.45) ? "performance" : rng.chance(.5) ? "makingOf" : "general",
				week: (song.releasedWeek ?? 1) + rng.int(1, 6),
				views: Math.max(220, views),
				viewsWeek: Math.round(Math.max(220, views) * .08),
				likes: Math.round(Math.max(220, views) * .05),
				comments: Math.round(Math.max(220, views) * .004),
				quality: rng.int(48, 88),
				cost: 0,
				celebrity: null,
				location: artist.hometown
			});
		}
	}
}
function seedSuperstar(state, rng, name, genre, monthly, hit, weekly, lifetime, fame, extra) {
	const seed = generateArtist(rng, {
		genre,
		signedFame: fame
	});
	seed.name = name;
	seed.handle = handleize(name) || "star";
	const artist = fromSeed(state, seed, {
		signed: true,
		labelId: rng.pick(state.rivals).id,
		superstar: true,
		fame,
		fans: monthly * 1.6,
		followers: {
			tiktok: Math.round(monthly * .9),
			x: Math.round(monthly * .55),
			instagram: Math.round(monthly * .8),
			youtube: Math.round(monthly * .45)
		},
		royalty: .22,
		...extra
	});
	const w = Math.round(monthly / 4);
	artist.weeklyStreamHistory = [
		Math.round(w * 1.05),
		Math.round(w * .98),
		Math.round(w * 1.02),
		w
	];
	syncMonthly(artist);
	applyVerification(state, artist, false);
	state.artists.push(artist);
	seedHit(state, rng, artist, hit, weekly, lifetime, rng.int(2, 10));
	seedHit(state, rng, artist, `${hit} (LP)`, Math.round(weekly * .55), Math.round(lifetime * 1.7), rng.int(4, 14), "album");
	if (rng.chance(.7)) {
		const older = writeSong(state, rng, artist, true);
		older.status = "released";
		older.releasedWeek = 1 - rng.int(20, 80);
		older.streams = Math.round(lifetime * (.4 + rng.next()));
		older.streamsWeek = Math.round(weekly * .12);
		older.weekHistory = [
			older.streamsWeek,
			older.streamsWeek,
			older.streamsWeek,
			older.streamsWeek
		];
		older.playlist = rng.chance(.6);
		older.promoHeat = 8;
		older.lastPromoWeek = state.week - 6;
		const snd = makeSound(state, older.title, artist.name, older.id);
		older.soundId = snd.id;
		state.sounds.push(snd);
		state.songs.push(older);
	}
	return artist;
}
function populateWorld(state, rng) {
	if (state.settings.database === "real") for (const r of REAL_ARTISTS) {
		const seed = generateArtist(rng, {
			genre: r.genre,
			signedFame: r.fame
		});
		seed.name = r.name;
		seed.handle = r.handle;
		seed.age = r.age;
		seed.hometown = r.hometown;
		seed.nationality = r.nationality;
		seed.bio = r.bio;
		seed.genre = r.genre;
		const artist = fromSeed(state, seed, {
			signed: true,
			labelId: rng.pick(state.rivals).id,
			real: true,
			superstar: true,
			fame: r.fame,
			fans: r.monthly * 1.8,
			followers: {
				tiktok: Math.round(r.monthly * .85),
				x: Math.round(r.monthly * .5),
				instagram: Math.round(r.monthly * .75),
				youtube: Math.round(r.monthly * .4)
			}
		});
		const w = Math.round(r.monthly / 4);
		artist.weeklyStreamHistory = [
			Math.round(w * 1.04),
			Math.round(w * .97),
			Math.round(w * 1.01),
			w
		];
		syncMonthly(artist);
		applyVerification(state, artist, false);
		state.artists.push(artist);
		seedHit(state, rng, artist, r.hit, r.hitWeekly, r.hitLifetime, rng.int(1, 8));
		seedHit(state, rng, artist, `${r.hit.split(" ")[0]} Era`, Math.round(r.hitWeekly * .52), Math.round(r.hitLifetime * 1.6), rng.int(3, 12), "album");
	}
	else for (const s of SUPERSTAR_FICTIONAL) seedSuperstar(state, rng, s.name, s.genre, s.monthly, s.hit, s.weekly, s.lifetime, s.fame);
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
				x: Math.round(tiktok * .45),
				instagram: Math.round(tiktok * .7),
				youtube: Math.round(tiktok * .3)
			},
			avatar: makeAvatar(rng)
		});
		state.artists.push(a);
	}
	for (let i = 0; i < 8; i++) state.artists.push(fromSeed(state, generateArtist(rng)));
	for (const riv of state.rivals) {
		const count = rng.int(1, 3);
		for (let i = 0; i < count; i++) {
			const artist = fromSeed(state, generateArtist(rng, { signedFame: rng.int(18, 55) }), {
				signed: true,
				labelId: riv.id,
				royalty: .2
			});
			state.artists.push(artist);
			const song = writeSong(state, rng, artist, true);
			song.status = "released";
			song.releasedWeek = 1 - rng.int(1, 10);
			const weekly = Math.round(Math.exp(rng.gauss(11.2, 1.1)));
			song.streams = Math.round(weekly * (8 + rng.next() * 10));
			song.streamsWeek = weekly;
			song.weekHistory = [
				Math.round(weekly * 1.2),
				Math.round(weekly * 1.05),
				Math.round(weekly * .95),
				weekly
			];
			song.sales = Math.round(song.streams * .002);
			song.quality = qualityOf(song);
			song.radioPower = rng.int(10, 70);
			song.radioWeeks = rng.int(0, 6);
			song.lastPromoWeek = state.week - rng.int(0, 3);
			song.promoHeat = rng.int(10, 50);
			const sound = makeSound(state, song.title, artist.name, song.id);
			sound.uses = Math.round(song.streams * 2e-4);
			song.soundId = sound.id;
			state.sounds.push(sound);
			state.songs.push(song);
			artist.weeklyStreamHistory = song.weekHistory.slice();
			syncMonthly(artist);
			const clip = ownedStyleClip(state, rng, artist, song, sound, false);
			clip.owned = false;
			clip.views = Math.round(song.streams * (.4 + rng.next()));
			clip.likes = Math.round(clip.views * .08);
			clip.viewsWeek = Math.round(clip.views * .12);
			state.clips.push(clip);
		}
	}
	for (let i = 0; i < 8; i++) {
		const snd = makeSound(state, songTitle(rng), rng.pick(NPC_CREATORS), null);
		snd.uses = rng.int(200, 4e4);
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
function createInitialState(input, seedNum) {
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
			body: "Scout a roster, cut a record, then break it on TikTok. Songs die without promo — keep feeding the apps."
		});
		return state;
	}
	populateWorld(state, rng);
	const name = (input.name ?? "").trim() || "New Act";
	const you = fromSeed(state, {
		name,
		handle: (input.handle?.trim() || handleize(name) || "artist").slice(0, 16),
		genre: input.genre ?? "altpop",
		kind: "solo",
		age: input.age ?? rng.int(18, 27),
		hometown: city,
		nationality: "US",
		bio: "Bedroom demos, borrowed mics, and a For You page that doesn't know the name yet.",
		stats: {
			vocals: clamp$1(Math.round(rng.gauss(68, 8)), 52, 88),
			writing: clamp$1(Math.round(rng.gauss(70, 8)), 54, 90),
			dance: clamp$1(Math.round(rng.gauss(64, 8)), 48, 88),
			charisma: clamp$1(Math.round(rng.gauss(72, 8)), 55, 92),
			looks: clamp$1(Math.round(rng.gauss(70, 8)), 50, 90),
			workEthic: clamp$1(Math.round(rng.gauss(74, 7)), 58, 92),
			social: clamp$1(Math.round(rng.gauss(76, 8)), 58, 94),
			production: clamp$1(Math.round(rng.gauss(58, 8)), 40, 82),
			performance: clamp$1(Math.round(rng.gauss(66, 8)), 50, 90)
		},
		potential: clamp$1(Math.round(rng.gauss(78, 8)), 62, 96),
		fame: 6,
		fans: 900,
		followers: {
			tiktok: 820,
			x: 540,
			instagram: 710,
			youtube: 240
		},
		avatar: makeAvatar(rng)
	}, {
		signed: false,
		labelId: null,
		royalty: .85,
		wage: 0,
		monthlyListeners: 0,
		followingX: 120,
		gender: input.gender ?? "female",
		orientation: input.orientation ?? "straight"
	});
	you.weeklyStreamHistory = [
		0,
		0,
		0,
		0
	];
	syncMonthly(you);
	state.artists.unshift(you);
	state.playerArtistId = you.id;
	state.labelName = "Independent";
	state.dealKind = "independent";
	pushNotif(state, {
		tone: "info",
		title: `${you.name} is unsigned`,
		body: "Write a record, post the sound, grow every app. Spotify monthly is the last four weeks of streams — no promo, no numbers."
	});
	pushMail(state, {
		kind: "press",
		from: "Music Star Career",
		subject: "Inbox is live",
		body: "Label deals, film reads, legal notices, and beat packs land here. Family stays on the toast. Hollywood, Health, and Nightlife live under More."
	});
	return state;
}
function ownedStyleClip(state, rng, artist, song, sound, owned) {
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
		avatar: profileOf(artist, "tiktok").avatar
	};
}
function npcClip(state, rng, sound, song) {
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
		viewsWeek: Math.round(views * rng.next() * .3),
		likes: Math.round(views * (.04 + rng.next() * .08)),
		comments: Math.round(views * .004),
		saves: Math.round(views * .01),
		shares: Math.round(views * .006),
		soundUses: Math.round(views * 4e-4),
		watchRate: clamp$1(rng.gauss(.48, .1), .2, .85),
		likeRate: clamp$1(rng.gauss(.07, .02), .02, .18),
		completion: clamp$1(rng.gauss(.42, .1), .15, .8),
		viralStage: views > 1e6 ? 5 : views > 1e5 ? 4 : views > 2e4 ? 3 : 2,
		sparkSpend: 0,
		owned: false,
		visual: rng.int(0, 8),
		avatar: makeAvatar(rng)
	};
}
function refreshTrends(state, rng) {
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
	const trends = sounds.map((s, i) => ({
		id: `t_s_${s.id}`,
		kind: "sound",
		name: s.name,
		heat: 90 - i * 12,
		soundId: s.id
	}));
	for (const name of rng.shuffle([
		"first-frame stare",
		"chorus swap",
		"hallway walk",
		"mirror take",
		"one-take booth"
	]).slice(0, 3)) trends.push({
		id: nid(state, "tr"),
		kind: "challenge",
		name,
		heat: rng.int(40, 88)
	});
	for (const name of rng.shuffle([
		"maincharacter",
		"unreleased",
		"soundon",
		"choruscheck"
	]).slice(0, 3)) trends.push({
		id: nid(state, "tr"),
		kind: "hashtag",
		name: `#${name}`,
		heat: rng.int(30, 80)
	});
	trends.sort((a, b) => b.heat - a.heat);
	state.trends = trends;
}
function seedX(state, rng) {
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
			likes: rng.int(20, 4e3),
			reposts: rng.int(2, 400),
			replies: rng.int(4, 200),
			owned: false,
			avatar: a.avatar,
			verified: a.verified.x
		});
	}
}
function refreshSongMarket(state, rng) {
	state.songMarket = [];
	for (let i = 0; i < 6; i++) state.songMarket.push({
		id: nid(state, "mkt"),
		title: songTitle(rng),
		genre: rng.pick(GENRES).id,
		quality: rng.int(55, 92),
		price: 4500 + rng.int(0, 18e3),
		writer: rng.pick([
			"Room 404",
			"Harbor writers",
			"Stockholm camp",
			"Atlanta rooms",
			"Topline desk"
		])
	});
}
function signCost(artist) {
	return {
		advance: Math.round(12e3 + artist.fame * 900 + artist.potential * 280 + artist.followers.tiktok * .08),
		wage: Math.round(400 + artist.fame * 28 + artist.potential * 8),
		royalty: clamp$1(.18 + artist.fame / 400 + artist.potential / 800, .16, .42)
	};
}
function signArtist(state, artistId) {
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
	artist.mood = clamp$1(artist.mood + 12, 0, 100);
	pushNotif(state, {
		tone: "good",
		title: `Signed ${artist.name}`,
		body: `Advance ${Math.round(advance).toLocaleString("en-US")} · ${Math.round(royalty * 100)}% artist share · 3 albums.`
	});
	if (state.tutorial === 1) state.tutorial = 2;
	return null;
}
function startSong(state, artistId, rng, kind = "single") {
	const artist = state.artists.find((a) => a.id === artistId);
	if (!artist || !isControlled(state, artist)) return "That's not your session.";
	if (artist.onHoliday) return `${artist.name} is on holiday.`;
	if (artist.energy < 25) return `${artist.name} is spent. Give them a week.`;
	if (state.songs.some((s) => s.artistId === artistId && (s.status === "writing" || s.status === "recording" || s.status === "mixing"))) return "They already have a record in progress.";
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
		body: `Writing week. Hook look: ${song.hook}. ${kind}.`
	});
	if (state.tutorial <= 2) state.tutorial = 3;
	return null;
}
function buySongFromMarket(state, marketId, artistId) {
	const item = state.songMarket.find((s) => s.id === marketId);
	const artist = state.artists.find((a) => a.id === artistId);
	if (!item || !artist || !isControlled(state, artist)) return "Can't buy that.";
	if (state.cash < item.price) return "Short on the publishing check.";
	state.cash -= item.price;
	const song = {
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
		ost: false
	};
	state.songs.push(song);
	state.songMarket = state.songMarket.filter((s) => s.id !== marketId);
	pushNotif(state, {
		tone: "good",
		title: `Bought “${item.title}”`,
		body: `From ${item.writer}. Ready to release.`
	});
	return null;
}
function releaseSong(state, songId, rng, format = "both") {
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
	const open = Math.round(1800 + artist.followers.youtube * .08 + song.quality * 70 + artist.fame * 40);
	song.streams += open;
	song.streamsPending += open;
	growFollowers(artist, "youtube", open * .01, 8);
	pushNotif(state, {
		tone: "good",
		title: `Released “${song.title}”`,
		body: `It's on ${format === "cd" ? "CD racks" : format === "digital" ? "Spotify" : "Spotify and CD"} · ${open.toLocaleString("en-US")} first-day streams. Cut a TikTok this week or it dies.`
	});
	if (state.tutorial === 3) state.tutorial = 4;
	unlockAchievement(state, "first-song");
	if (artist.albumsRemaining > 0 && artist.signed) {}
	return null;
}
function buyRadio(state, songId) {
	const song = state.songs.find((s) => s.id === songId && s.status === "released");
	if (!song) return "Release it first.";
	const cost = state.career === "artist" ? 9500 + state.labelRep * 120 : 18e3 + state.labelRep * 200;
	if (state.cash < cost) return "Radio still bills like it's 2004.";
	state.cash -= cost;
	song.radioWeeks = Math.max(song.radioWeeks, 5);
	song.radioPower = Math.max(song.radioPower, 48 + state.labelRep * .5 + song.quality * .2);
	song.promoHeat = Math.min(100, song.promoHeat + 22);
	song.lastPromoWeek = state.week;
	pushNotif(state, {
		tone: "info",
		title: `Radio add: “${song.title}”`,
		body: "Five weeks of spins. Watch Radio."
	});
	return null;
}
function buyPlaylist(state, songId, rng) {
	const song = state.songs.find((s) => s.id === songId && s.status === "released");
	if (!song) return "Release it first.";
	const cost = state.career === "artist" ? 4800 : 9500;
	if (state.cash < cost) return "Pitch fee is short.";
	state.cash -= cost;
	const chance = .34 + song.quality / 350 + state.labelRep / 350;
	if (rng.chance(chance) || song.playlist) {
		song.playlist = true;
		song.promoHeat = Math.min(100, song.promoHeat + 18);
		song.lastPromoWeek = state.week;
		pushNotif(state, {
			tone: "good",
			title: `Spotify editorial: “${song.title}”`,
			body: "Today's Mix and a city playlist. Four-week listeners will jump — if you keep feeding it."
		});
	} else pushNotif(state, {
		tone: "bad",
		title: "Pitch passed over",
		body: `“${song.title}” didn't land. Quality and TikTok heat help the next one.`
	});
	return null;
}
function promoteOn(state, songId, platform, budget, region = "global") {
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
		region
	});
	pushNotif(state, {
		tone: "info",
		title: `Promo on ${platform}`,
		body: `$${budget.toLocaleString("en-US")} behind “${song.title}”. Heat ${Math.round(song.promoHeat)}.`
	});
	return null;
}
function upgradeStudio(state, plan) {
	if (state.studioTier >= 3) return "The room is already as good as it gets.";
	const cost = state.studioTier === 1 ? 45e3 : 95e3;
	const paid = settleDue(state, cost, plan ?? cashPlan(cost));
	if (paid) return paid;
	state.studioTier += 1;
	pushNotif(state, {
		tone: "good",
		title: `Studio tier ${state.studioTier}`,
		body: "Better converters, better first-second."
	});
	return null;
}
function refreshScout(state, rng) {
	if (state.career !== "label") return "A&R is a label desk.";
	const cost = 2500;
	if (state.cash < cost) return "A&R lunch isn't free.";
	state.cash -= cost;
	const n = rng.int(2, 4);
	for (let i = 0; i < n; i++) state.artists.push(fromSeed(state, generateArtist(rng)));
	pushNotif(state, {
		tone: "info",
		title: "A&R brought names",
		body: `${n} new prospects in the building.`
	});
	return null;
}
function formatBias(format) {
	return FORMATS.find((f) => f.id === format) ?? FORMATS[0];
}
function trendFit(state, soundId, hashtags, format) {
	let fit = 0;
	const soundTrend = state.trends.find((t) => t.soundId === soundId);
	if (soundTrend) fit += .34 + soundTrend.heat / 400;
	if (format === "challenge" && state.trends.some((t) => t.kind === "challenge")) fit += .16;
	const tagHit = hashtags.filter((h) => state.trends.some((t) => t.kind === "hashtag" && t.name.replace("#", "") === h)).length;
	fit += tagHit * .06;
	return clamp$1(fit, 0, .7);
}
function runTikTokAlgorithm(state, rng, clip, artist, song, spark) {
	const fmt = formatBias(clip.format);
	const hook = (song?.hook ?? 48) / 100;
	const prod = (song?.production ?? 50) / 100;
	const quality = (song?.quality ?? 52) / 100;
	const charisma = (artist?.stats.charisma ?? 50) / 100;
	const looks = (artist?.stats.looks ?? 50) / 100;
	const social = (artist?.stats.social ?? 50) / 100;
	const energy = (artist?.energy ?? 60) / 100;
	const overpost = artist ? Math.max(0, artist.tiktokPostsThisWeek - 3) * .08 : 0;
	const fit = trendFit(state, clip.soundId, clip.hashtags, clip.format);
	const sparkBoost = Math.min(.22, Math.log10(1 + spark / 400) * .12);
	const watchRate = clamp$1(.18 + hook * .42 + fmt.hookBias + fit * .16 + energy * .06 + rng.gauss(0, .04) - overpost, .12, .88);
	const completion = clamp$1(watchRate * (.62 + prod * .28 + hook * .12) + rng.gauss(0, .03), .1, .86);
	const likeRate = clamp$1(.018 + charisma * .055 + looks * .03 + hook * .03 + fmt.socialBias * .04 + rng.gauss(0, .008), .01, .2);
	const shareRate = clamp$1(.0015 + social * .01 + fit * .012 + hook * .006, 8e-4, .04);
	const saveRate = clamp$1(.004 + hook * .02 + quality * .01, .002, .05);
	const stagesDef = [
		{
			name: "Test audience",
			size: 280 + (artist?.followers.tiktok ?? 400) * .08,
			watchNeed: .32,
			likeNeed: .03
		},
		{
			name: "More For You pages",
			size: 2400,
			watchNeed: .4,
			likeNeed: .045
		},
		{
			name: "Out of circle",
			size: 18e3,
			watchNeed: .46,
			likeNeed: .055
		},
		{
			name: "Main feed",
			size: 14e4,
			watchNeed: .5,
			likeNeed: .062
		},
		{
			name: "Going wide",
			size: 11e5,
			watchNeed: .54,
			likeNeed: .07
		},
		{
			name: "Runaway",
			size: 75e5,
			watchNeed: .58,
			likeNeed: .08
		}
	];
	const stages = [];
	let views = 0;
	let stageIdx = 0;
	for (let i = 0; i < stagesDef.length; i++) {
		const st = stagesDef[i];
		const luck = .28 + hook * .35 + fit * .22 + sparkBoost + quality * .1;
		const size = st.size * (.75 + rng.next() * .5) * (1 + sparkBoost);
		const passedWatch = completion >= st.watchNeed - sparkBoost * .15;
		const passedLike = likeRate >= st.likeNeed - sparkBoost * .05;
		const passedLuck = i < 2 || rng.chance(luck);
		const passed = passedWatch && passedLike && passedLuck;
		views += size;
		let reason;
		if (!passedWatch) reason = `Completion ${Math.round(completion * 100)}% missed the ${Math.round(st.watchNeed * 100)}% bar.`;
		else if (!passedLike) reason = `Like rate too thin to keep pushing.`;
		else if (!passedLuck) reason = `The page flinched. Same clip, different hour.`;
		stages.push({
			name: st.name,
			views: Math.round(size),
			passed,
			reason: passed ? void 0 : reason
		});
		stageIdx = i;
		if (!passed) break;
	}
	views = Math.round(views);
	const likes = Math.round(views * likeRate);
	const comments = Math.round(views * .0045 * (.7 + social));
	const saves = Math.round(views * saveRate);
	const shares = Math.round(views * shareRate);
	const soundUses = Math.round(views * (35e-5 + hook * 9e-4 + fit * 6e-4));
	const followersGained = Math.max(4, Math.round(views * (.004 + social * .008 + likeRate * .45)));
	const released = song?.status === "released";
	const streamsGained = Math.round(views * (released ? .14 + hook * .12 : .03) * (.75 + quality * .45));
	const xGained = Math.max(3, Math.round(followersGained * .28 + views * 9e-4));
	const instagramGained = Math.max(3, Math.round(followersGained * .34 + views * .0011));
	const spotifyGained = Math.max(5, Math.round(followersGained * .5 + streamsGained * .18));
	const youtubeGained = Math.max(2, Math.round(followersGained * .18 + views * 4e-4));
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
		artist.fans += Math.round(followersGained * .6);
		artist.fame = clamp$1(artist.fame + Math.log10(1 + views) * .45, 0, 100);
		artist.energy = clamp$1(artist.energy - (12 + (clip.format === "performance" ? 6 : 0)), 0, 100);
		artist.tiktokPostsThisWeek += 1;
		artist.lastTikTokWeek = state.week;
		artist.mood = clamp$1(artist.mood + (stageIdx >= 3 ? 8 : stageIdx === 0 ? -4 : 2), 0, 100);
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
	let verdict = "flop";
	if (stageIdx >= 5) verdict = "runaway";
	else if (stageIdx >= 4) verdict = "viral";
	else if (stageIdx >= 3) verdict = "breakout";
	else if (stageIdx >= 1) verdict = "solid";
	let tip = "Hook in the first second. The test audience does not wait for verse two.";
	if (verdict === "flop" && completion < .35) tip = "Completion collapsed. Start on the chorus.";
	else if (verdict === "flop" && likeRate < .04) tip = "People watched and did not tap.";
	else if (overpost > 0) tip = "Too many posts this week. The page throttled you.";
	else if (fit < .08 && verdict !== "viral") tip = "No trend heat. Hop a challenge or a trending sound.";
	else if (verdict === "solid") tip = "A Spark push or a duet could punch the next stage.";
	else if (verdict === "breakout") tip = "Keep the sound in circulation — NPC creators will do the rest.";
	else if (verdict === "viral" || verdict === "runaway") tip = "The sound is now infrastructure. Every app moved with it.";
	if (verdict === "viral" || verdict === "runaway") {
		pushNotif(state, {
			tone: "viral",
			title: `${clip.creatorName} just broke the page`,
			body: `“${sound?.name ?? "Untitled"}” · ${views.toLocaleString("en-US")} views.`
		});
		state.labelRep = clamp$1(state.labelRep + (verdict === "runaway" ? 8 : 4), 0, 100);
		unlockAchievement(state, "viral");
	}
	if (artist && comments > 8) {
		const item = {
			id: nid(state, "in"),
			from: rng.pick([
				"creator fund",
				"brand desk",
				"duet request",
				"sound notif"
			]),
			text: rng.pick(COMMENTS),
			week: state.week,
			clipId: clip.id
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
		tip
	};
}
function dummySong(artist, sound, week) {
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
		releaseFormat: "both",
		bside: false,
		salesDigitalWeek: 0,
		salesPhysicalWeek: 0,
		chartPoints: 0,
		albumUnits: 0,
		ost: false
	};
}
function postTikTok(state, rng, input) {
	const artist = state.artists.find((a) => a.id === input.artistId);
	if (!artist || !isControlled(state, artist)) return { error: "Pick someone you control." };
	if (artist.energy < 16) return { error: `${artist.name} has nothing left to give the camera.` };
	if (artist.tiktokPostsThisWeek >= 6) return { error: "Shadowban risk. Sit this one out." };
	if (input.spark > 0 && state.cash < input.spark) return { error: "Spark budget is short." };
	let song = input.songId ? state.songs.find((s) => s.id === input.songId) ?? null : null;
	let sound;
	if (input.soundId) sound = state.sounds.find((s) => s.id === input.soundId);
	if (song && !sound && song.soundId) sound = state.sounds.find((s) => s.id === song.soundId);
	if (song && !sound) {
		sound = makeSound(state, song.title, artist.name, song.id);
		song.soundId = sound.id;
		state.sounds.push(sound);
	}
	if (!sound) {
		sound = makeSound(state, song?.title ?? `${artist.name} original`, artist.name, song?.id ?? null);
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
	return {
		error: null,
		rollout
	};
}
function postX(state, rng, artistId, text) {
	const artist = state.artists.find((a) => a.id === artistId);
	if (!artist || !isControlled(state, artist)) return "Pick someone you control.";
	if (artist.xPostsThisWeek >= 8) return "The timeline is tired of them.";
	const t = text.trim() || rng.pick(X_TEMPLATES);
	const reach = Math.max(220, artist.followers.x * (.32 + artist.stats.charisma / 180) + artist.followers.tiktok * .04);
	const likes = Math.round(reach * (.06 + rng.next() * .1 + artist.stats.charisma / 400));
	const gained = growFollowers(artist, "x", likes * .18 + artist.stats.charisma * .5, 8);
	growFollowers(artist, "instagram", gained * .12, 2);
	growFollowers(artist, "tiktok", gained * .08, 2);
	artist.fans += Math.round(gained * .4);
	artist.fame = clamp$1(artist.fame + .2, 0, 100);
	const xp = profileOf(artist, "x");
	state.xPosts.unshift({
		id: nid(state, "p"),
		artistId: artist.id,
		handle: xp.handle,
		name: artist.name,
		text: t.slice(0, 280),
		week: state.week,
		likes,
		reposts: Math.round(likes * .14),
		replies: Math.round(likes * .09),
		owned: true,
		avatar: xp.avatar,
		verified: artist.verified.x
	});
	state.xPosts = state.xPosts.slice(0, 80);
	artist.xPostsThisWeek += 1;
	artist.energy = clamp$1(artist.energy - 4, 0, 100);
	applyVerification(state, artist);
	pushAlert(state, {
		kind: "like",
		handle: artist.handle,
		text: `Your post picked up ${likes.toLocaleString("en-US")} likes · +${gained.toLocaleString("en-US")} X followers.`
	});
	return null;
}
function postGram(state, rng, artistId, caption) {
	const artist = state.artists.find((a) => a.id === artistId);
	if (!artist || !isControlled(state, artist)) return "Pick someone you control.";
	if (artist.energy < 8) return "No more posing today.";
	const reach = Math.round(Math.max(280, artist.followers.instagram * (.38 + artist.stats.looks / 220) + artist.followers.tiktok * .03) * (.85 + rng.next() * .4));
	const likes = Math.round(reach * (.11 + artist.stats.looks / 320));
	const gained = growFollowers(artist, "instagram", likes * .14 + artist.stats.looks * .45, 10);
	growFollowers(artist, "x", gained * .1, 2);
	growFollowers(artist, "youtube", gained * .06, 2);
	artist.fans += Math.round(gained * .35);
	const gp = profileOf(artist, "instagram");
	state.gram.unshift({
		id: nid(state, "g"),
		artistId: artist.id,
		handle: gp.handle,
		name: artist.name,
		caption: caption.trim() || "on the way.",
		week: state.week,
		likes,
		comments: Math.round(likes * .03),
		reach,
		visual: rng.int(0, 8),
		avatar: gp.avatar,
		verified: artist.verified.instagram
	});
	state.gram = state.gram.slice(0, 40);
	artist.gramPostsThisWeek += 1;
	artist.energy = clamp$1(artist.energy - 6, 0, 100);
	artist.fame = clamp$1(artist.fame + .25, 0, 100);
	applyVerification(state, artist);
	return null;
}
function goLive(state, rng, artistId, platform) {
	const blocked = barsBlock(state, "live");
	if (blocked) return blocked;
	const artist = state.artists.find((a) => a.id === artistId);
	if (!artist || !isControlled(state, artist)) return "Not your stream.";
	if (artist.energy < 12) return "Too tired to go live.";
	const base = platform === "tiktok" ? artist.followers.tiktok : platform === "x" ? artist.followers.x : platform === "instagram" ? artist.followers.instagram : artist.followers.youtube;
	const viewers = Math.max(12, Math.round(base * (.012 + rng.next() * .05) * (.7 + artist.stats.charisma / 200)));
	state.liveViewers[platform] = viewers;
	state.lastLiveWeek = state.week;
	artist.energy = clamp$1(artist.energy - 10, 0, 100);
	const gained = growFollowers(artist, platform === "x" ? "x" : platform === "instagram" ? "instagram" : platform === "youtube" ? "youtube" : "tiktok", viewers * .08, 6);
	const gifts = Math.round(viewers * (.04 + rng.next() * .08));
	state.cash += gifts;
	pushNotif(state, {
		tone: "good",
		title: `Live on ${platform === "x" ? "X" : platform === "tiktok" ? "TikTok" : platform === "instagram" ? "Instagram" : "YouTube"}`,
		body: `${viewers.toLocaleString("en-US")} watching · +${gained.toLocaleString("en-US")} follows · $${gifts.toLocaleString("en-US")} in gifts.`
	});
	return null;
}
function shootVideo(state, rng, artistId, songId, kind, premium) {
	const artist = state.artists.find((a) => a.id === artistId);
	const song = state.songs.find((s) => s.id === songId);
	if (!artist || !song || !isControlled(state, artist)) return "Can't book that.";
	const cost = premium ? 28e3 + song.quality * 80 : 4500;
	if (state.cash < cost) return "Video budget short.";
	state.cash -= cost;
	const quality = clamp$1(Math.round((premium ? 72 : 48) + artist.stats.looks * .15 + rng.gauss(0, 6)), 30, 98);
	const views = Math.round((premium ? 1.8 : .6) * (artist.followers.youtube * .4 + artist.followers.tiktok * .08 + song.quality * 400) * (.7 + rng.next()));
	const guest = featName(state, song);
	const video = {
		id: nid(state, "yt"),
		artistId,
		songId,
		title: guest ? `${song.title} (feat. ${guest}) — ${kind === "lyrics" ? "Official Audio" : kind === "makingOf" ? "Making Of" : kind === "animation" ? "Official Animation" : kind === "performance" ? "Live Performance" : "Official Video"}` : `${song.title} — ${kind === "lyrics" ? "Official Audio" : kind === "makingOf" ? "Making Of" : kind === "animation" ? "Official Animation" : kind === "performance" ? "Live Performance" : "Official Video"}`,
		kind,
		week: state.week,
		views,
		viewsWeek: views,
		likes: Math.round(views * .06),
		comments: Math.round(views * .004),
		quality,
		cost,
		celebrity: premium && rng.chance(.4) ? "A-list cameo" : null,
		location: premium ? "Desert highway" : "Warehouse night"
	};
	state.videos.unshift(video);
	growFollowers(artist, "youtube", views * .02, 10);
	song.videoHeat = Math.min(100, song.videoHeat + (premium ? 28 : 10));
	song.promoHeat = Math.min(100, song.promoHeat + (premium ? 16 : 6));
	song.lastPromoWeek = state.week;
	song.streamsPending += Math.round(views * .35);
	pushNotif(state, {
		tone: "good",
		title: `Video online: “${song.title}”`,
		body: `${views.toLocaleString("en-US")} first-week views on YouTube. Promo heat up.`
	});
	return null;
}
function recomputeCharts(state) {
	const released = state.songs.filter((s) => s.status === "released" && s.kind !== "album" && s.kind !== "ep" && s.kind !== "greatestHits");
	const scored = released.map((s) => {
		const recency = s.releasedWeek == null ? .4 : clamp$1(1.15 - (state.week - s.releasedWeek) * .05, .12, 1.2);
		const score = hot100Points(state, s);
		s.chartPoints = Math.round(score);
		return {
			s,
			score: score * recency
		};
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
function recomputeRadioCharts(state) {
	const released = state.songs.filter((s) => s.status === "released");
	const scored = released.map((s) => {
		const recency = s.releasedWeek == null ? .3 : clamp$1(1.05 - (state.week - s.releasedWeek) * .04, .12, 1.1);
		return {
			s,
			score: ((s.radioWeeks > 0 ? s.radioPower * (8 + s.radioWeeks) : s.radioPower * 1.4) * 40 + s.quality * 90 + s.streamsWeek * .08 + (s.playlist ? 4e3 : 0)) * recency
		};
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
function recomputeAlbumCharts(state) {
	const albums = state.songs.filter((s) => s.status === "released" && (s.kind === "album" || s.kind === "ep" || s.kind === "greatestHits"));
	const scored = albums.map((s) => {
		const recency = s.releasedWeek == null ? .4 : clamp$1(1.1 - (state.week - s.releasedWeek) * .04, .15, 1.15);
		const units = albumUnitsOf(s);
		s.albumUnits = units;
		return {
			s,
			score: units * recency
		};
	});
	scored.sort((a, b) => b.score - a.score);
	albums.forEach((s) => {
		s.albumChart = null;
	});
	scored.slice(0, CHART_SIZE.albums).forEach((row, i) => {
		row.s.albumChart = i + 1;
		if (row.s.peakAlbum == null || i + 1 < row.s.peakAlbum) row.s.peakAlbum = i + 1;
	});
}
function chartBonus(chart) {
	if (chart == null) return 0;
	if (chart === 1) return 58e3;
	if (chart <= 3) return 28e3;
	if (chart <= 5) return 16e3;
	if (chart <= 10) return 8500;
	if (chart <= 20) return 3200;
	return 0;
}
function radioBonus(radioChart, radioPower, radioWeeks) {
	if (radioChart == null && radioWeeks <= 0) return radioPower * 12;
	let n = radioPower * 90;
	if (radioChart === 1) n += 22e3;
	else if (radioChart && radioChart <= 5) n += 9e3;
	else if (radioChart && radioChart <= 15) n += 3400;
	return n;
}
function playerShare(state, artist, gross) {
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
function weeklyOrganic(state, song, rng) {
	const artist = state.artists.find((a) => a.id === song.artistId);
	const age = song.releasedWeek == null ? 12 : Math.max(0, state.week - song.releasedWeek);
	const weeksSincePromo = song.lastPromoWeek ? Math.max(0, state.week - song.lastPromoWeek) : age;
	const last = song.weekHistory[song.weekHistory.length - 1] ?? song.streamsWeek ?? 0;
	let decay = age === 0 ? .92 : age === 1 ? .64 : age === 2 ? .5 : age <= 4 ? .4 : age <= 8 ? .28 : .16;
	if (weeksSincePromo >= 2) decay *= .55;
	if (weeksSincePromo >= 4) decay *= .32;
	if (weeksSincePromo >= 8) decay *= .18;
	if (song.promoHeat < 8 && age > 3) decay *= .5;
	const fame = artist?.fame ?? 10;
	const tokHeat = state.clips.filter((c) => c.songId === song.id).reduce((a, c) => a + c.viewsWeek * .18 + c.soundUses * 40, 0);
	const radio = song.radioWeeks > 0 ? song.radioPower * 320 : song.radioPower * 18;
	const pl = song.playlist && weeksSincePromo < 4 ? 12e3 + fame * 80 : song.playlist ? 2200 : 0;
	const video = song.videoHeat * 180;
	const promo = song.promoHeat * 90;
	const campaign = state.campaigns.filter((c) => c.songId === song.id && c.weeksLeft > 0).reduce((n, c) => n + c.budget * .35, 0);
	const guest = song.collabArtistId ? state.artists.find((a) => a.id === song.collabArtistId) : null;
	const featureBoost = guest ? guest.popularity * 140 + guest.monthlyListeners * .018 : 0;
	const residualFloor = Math.round(fame * 6 + song.quality * 1.4);
	const fromLast = last * decay;
	const injection = tokHeat + radio + pl + video + promo + campaign + featureBoost;
	const wobble = .86 + rng.next() * .28;
	return Math.max(residualFloor, Math.round((fromLast + injection) * wobble));
}
function maybeDeals(state, rng) {
	if (state.career !== "artist") return;
	const artist = playerArtist(state);
	if (!artist || artist.signed) return;
	for (const d of state.deals) if (d.status === "open") {
		d.weeksLeft -= 1;
		if (d.weeksLeft <= 0) d.status = "expired";
	}
	const open = state.deals.filter((d) => d.status === "open");
	if (open.length >= 2) return;
	const charted = state.songs.some((s) => s.artistId === artist.id && s.chart != null);
	if (!(artist.fame >= 16 || artist.followers.tiktok >= 5e3 || artist.monthlyListeners >= 12e3 || charted) || state.week < 3) return;
	if (!rng.chance(.42 + artist.fame / 200)) return;
	const used = new Set(open.map((d) => d.labelId));
	const pool = state.rivals.filter((r) => !used.has(r.id));
	if (!pool.length) return;
	const label = rng.pick(pool);
	const heatScore = artist.fame + Math.log10(1 + artist.followers.tiktok) * 8 + (charted ? 18 : 0);
	const advance = Math.round(18e3 + heatScore * 1400 + artist.monthlyListeners * .4);
	const royalty = clamp$1(.16 + (100 - heatScore) / 400, .14, .28);
	const deal = {
		id: nid(state, "deal"),
		labelId: label.id,
		labelName: label.name,
		advance,
		royalty,
		weeksLeft: 4,
		albums: 3,
		status: "open"
	};
	state.deals.unshift(deal);
	pushNotif(state, {
		tone: "good",
		title: `${label.name} sent a deal`,
		body: `Advance ${advance.toLocaleString("en-US")} · you keep ${Math.round(royalty * 100)}% · 3 albums.`
	});
	const msg = {
		id: nid(state, "pm"),
		week: state.week,
		from: `${label.name} A&R`,
		handle: handleize(label.name),
		text: `We want ${artist.name} on the roster. ${advance.toLocaleString("en-US")} up front.`,
		avatar: makeAvatar(rng)
	};
	state.xMessages.unshift(msg);
}
function acceptDeal(state, dealId) {
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
	artist.mood = clamp$1(artist.mood + 10, 0, 100);
	deal.status = "accepted";
	state.dealKind = "signed";
	state.labelName = deal.labelName;
	for (const d of state.deals) if (d.id !== deal.id && d.status === "open") d.status = "expired";
	pushNotif(state, {
		tone: "viral",
		title: `Signed to ${deal.labelName}`,
		body: `Advance landed. You keep ${Math.round(deal.royalty * 100)}%. They work radio.`
	});
	unlockAchievement(state, "label-deal");
	return null;
}
function declineDeal(state, dealId) {
	const deal = state.deals.find((d) => d.id === dealId);
	if (!deal || deal.status !== "open") return "Nothing to decline.";
	deal.status = "declined";
	pushNotif(state, {
		tone: "info",
		title: `Passed on ${deal.labelName}`,
		body: "Independent it is. Keep the masters."
	});
	return null;
}
function takeLoan(state, bankId, amount, purpose) {
	const bank = BANKS.find((b) => b.id === bankId);
	if (!bank) return "Unknown bank.";
	if (state.creditScore < bank.minScore) return `${bank.name} wants a ${bank.minScore}+ FICO. You're at ${Math.round(state.creditScore)}.`;
	if (amount < 1e3) return "Minimum $1,000.";
	const max = personalLoanMax(state, bank.id);
	if (amount > max) return `Max unsecured for this score is $${max.toLocaleString("en-US")}. Rebuild FICO or put more cash down.`;
	const loan = originateLoan(state, bank.id, amount, purpose);
	if (typeof loan === "string") return loan;
	state.cash += amount;
	pushNotif(state, {
		tone: "info",
		title: `${bank.name} funded you`,
		body: `$${amount.toLocaleString("en-US")} at ${loan.apr.toFixed(2)}% APR · $${loan.weeklyPayment.toLocaleString("en-US")}/wk · FICO ${Math.round(state.creditScore)}.`
	});
	return null;
}
function openCard(state, bankId) {
	const bank = BANKS.find((b) => b.id === bankId);
	if (!bank) return "Unknown bank.";
	if (state.creditScore < bank.minScore) return `${bank.name} wants ${bank.minScore}+. You're at ${Math.round(state.creditScore)}.`;
	if (state.cards.some((c) => c.bankId === bankId)) return "You already hold that card.";
	const limit = cardLimitForScore(state.creditScore, bank.id);
	const apr = aprForScore(bank.cardApr, state.creditScore);
	state.cards.push({
		id: nid(state, "cc"),
		bankId: bank.id,
		name: `${bank.name} Visa`,
		limit,
		used: 0,
		apr
	});
	state.creditScore = clamp$1(state.creditScore - 6, 300, 850);
	pushNotif(state, {
		tone: "info",
		title: `${bank.name} Visa approved`,
		body: `Limit $${limit.toLocaleString("en-US")} · ${apr.toFixed(2)}% APR. Hard pull −6 FICO.`
	});
	return null;
}
function buyHouse(state, catalogId, plan) {
	const h = HOUSES.find((x) => x.id === catalogId);
	if (!h) return "Listing gone.";
	if ((playerArtist(state)?.fame ?? state.labelRep) < h.fameNeed) return "They're not selling to a nobody.";
	if (state.houses.some((x) => x.catalogId === catalogId)) return "You already own that.";
	let mortgageId = null;
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
			body: `${h.city}. ${h.beds} bed. ${quote.minDownPct * 100}% down at ${quote.apr.toFixed(2)}% · ${describePay(plan, quote.dueNow)}.`
		});
	} else {
		const paid = settleDue(state, h.price, plan);
		if (paid) return paid;
		pushNotif(state, {
			tone: "good",
			title: `Keys to ${h.name}`,
			body: `${h.city}. ${h.beds} bed. Paid in full.`
		});
	}
	state.houses.push({
		catalogId: h.id,
		name: h.name,
		city: h.city,
		value: h.price,
		weekBought: state.week,
		mortgageId
	});
	unlockAchievement(state, "house");
	return null;
}
function buyCar(state, catalogId, plan) {
	const c = CARS.find((x) => x.id === catalogId);
	if (!c) return "Lot's empty.";
	if ((playerArtist(state)?.fame ?? state.labelRep) < c.fameNeed) return "The desk laughed.";
	if (state.cars.some((x) => x.catalogId === catalogId && !x.lease)) return "You already own that.";
	const lease = plan.mode === "lease";
	const finance = plan.mode === "loan" || lease;
	let loanId = null;
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
			body: `${quote.reason} · ${quote.apr.toFixed(2)}% · $${quote.weekly.toLocaleString("en-US")}/wk · ${describePay(plan, quote.dueNow)}.`
		});
	} else {
		const paid = settleDue(state, c.price, plan);
		if (paid) return paid;
		pushNotif(state, {
			tone: "good",
			title: `Parked a ${c.name}`,
			body: "Paid in full. It photographs."
		});
	}
	state.cars.push({
		catalogId: c.id,
		name: c.name,
		value: lease ? 0 : c.price,
		weekBought: state.week,
		loanId,
		lease
	});
	unlockAchievement(state, "car");
	return null;
}
function fulfillCheckout(state, draft, plan, rng) {
	switch (draft.kind) {
		case "house": return buyHouse(state, draft.id, plan);
		case "car": return buyCar(state, draft.id, plan);
		case "jet": return buyJet(state, draft.id, plan);
		case "jewelry": return buyJewelry(state, draft.id, plan);
		case "luxury": return privateDay(state, draft.id, plan);
		case "gift": return sendGift(state, draft.id, plan);
		case "night": return goOut(state, rng, draft.id, plan);
		case "studio": return upgradeStudio(state, plan);
		case "stock": return restockMerch(state, draft.id, draft.extra?.n ?? 30, plan);
		case "coach":
			if (!draft.extra?.artistId || !draft.extra.skill) return "Missing session.";
			return coach(state, draft.extra.artistId, draft.extra.skill, draft.price, draft.extra.gain ?? 2, plan);
		case "lawyer": return hireLawyer(state, rng, draft.extra?.caseId ?? draft.id, draft.extra?.lawyerId ?? draft.id, plan);
		case "bail": return postBail(state, draft.id, plan);
		case "propose": return propose(state, plan);
		case "marry": return marry(state, plan);
		case "facility": return buildFacility(state, draft.extra?.facility ?? draft.id, plan);
		case "rehab": return enterRehab(state, plan);
		case "substance": return useSubstance(state, rng, draft.id, plan);
		default: return fulfillFamily(state, draft, plan, rng);
	}
}
function hireSecurity(state, n) {
	const add = Math.max(0, Math.min(12, n));
	state.securityGuards = add;
	pushNotif(state, {
		tone: "info",
		title: `Security detail: ${add}`,
		body: add ? `$${add * 850}/wk. Fan meet-ups stay civil.` : "Walking alone again."
	});
	return null;
}
function bookTour(state, artistId, name, venueCount, rng) {
	const blocked = barsBlock(state, "tour");
	if (blocked) return blocked;
	const artist = state.artists.find((a) => a.id === artistId);
	if (!artist || !isControlled(state, artist)) return "Not your act.";
	syncPopularity(artist);
	const ranked = [...VENUES].map((v) => ({
		v,
		draw: venueDraw(artist, v.capacity)
	})).sort((a, b) => a.v.capacity - b.v.capacity);
	const fillable = ranked.filter((x) => x.draw.canFill);
	return bookStopsFrom(state, artist, name, (fillable.length >= venueCount ? fillable : ranked).slice(0, venueCount).map((x) => x.v), rng);
}
function bookSelectedTour(state, artistId, name, venueIds, rng) {
	const blocked = barsBlock(state, "tour");
	if (blocked) return blocked;
	const artist = state.artists.find((a) => a.id === artistId);
	if (!artist || !isControlled(state, artist)) return "Not your act.";
	if (!venueIds.length) return "Pick at least one room.";
	const venues = venueIds.map((id) => VENUES.find((v) => v.id === id)).filter((v) => Boolean(v));
	if (!venues.length) return "Those rooms aren't on the desk.";
	return bookStopsFrom(state, artist, name, venues, rng);
}
function bookStopsFrom(state, artist, name, venues, rng) {
	const cost = 3200 + venues.length * 1100;
	if (state.cash < cost) return "Tour float is short.";
	if (artist.monthlyListeners < 1200 && artist.fame < 8 && artist.popularity < 10) return "Nobody's buying tickets yet.";
	state.cash -= cost;
	const stops = venues.map((v, i) => {
		const draw = venueDraw(artist, v.capacity);
		const wobble = .82 + rng.next() * .28;
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
			canFill: draw.canFill
		};
	});
	state.tours.push({
		id: nid(state, "tour"),
		artistId: artist.id,
		name: name || `${artist.name} Tour`,
		status: "rehearsal",
		stops
	});
	artist.energy = clamp$1(artist.energy - 8, 0, 100);
	pushNotif(state, {
		tone: "good",
		title: `Tour booked: ${name || artist.name}`,
		body: `${stops.length} rooms. ${stops.filter((s) => s.canFill).length} look fillable.`
	});
	return null;
}
function bookFestival(state, artistId, festivalId) {
	const artist = state.artists.find((a) => a.id === artistId);
	const fest = FESTIVALS.find((f) => f.id === festivalId);
	if (!artist || !fest || !isControlled(state, artist)) return "Can't book that.";
	if (artist.fame < 28 && artist.monthlyListeners < 8e4) return `${fest.name} wants a name.`;
	const fee = fest.fee * (.4 + artist.fame / 200);
	state.cash += fee;
	const tour = state.tours.find((t) => t.artistId === artistId && t.status !== "done") ?? {
		id: nid(state, "tour"),
		artistId,
		name: `${artist.name} festival run`,
		status: "active",
		stops: []
	};
	if (!state.tours.includes(tour)) state.tours.push(tour);
	tour.stops.push({
		id: nid(state, "st"),
		venue: fest.name,
		city: fest.city,
		region: fest.region,
		week: state.week + 2,
		capacity: fest.capacity,
		attendance: Math.round(fest.capacity * (.15 + artist.fame / 200)),
		ticket: 0,
		gross: fee,
		festivalId: fest.id,
		done: false,
		canFill: true
	});
	unlockAchievement(state, "festival");
	pushNotif(state, {
		tone: "viral",
		title: `${fest.name} booked`,
		body: `Fee $${Math.round(fee).toLocaleString("en-US")}.`
	});
	return null;
}
function coach(state, artistId, skill, cost, gain, plan) {
	const artist = state.artists.find((a) => a.id === artistId);
	if (!artist || !isControlled(state, artist)) return "Not your session.";
	const paid = settleDue(state, cost, plan ?? cashPlan(cost));
	if (paid) return paid;
	artist.stats[skill] = clamp$1(artist.stats[skill] + gain, 0, 99);
	artist.energy = clamp$1(artist.energy - 8, 0, 100);
	artist.ability = Math.round((artist.stats.vocals + artist.stats.writing + artist.stats.performance) / 3);
	return null;
}
function bookHoliday(state, artistId, weeks) {
	const artist = state.artists.find((a) => a.id === artistId);
	if (!artist || !isControlled(state, artist)) return "Not them.";
	artist.onHoliday = true;
	artist.holidayWeeks = Math.max(1, weeks);
	pushNotif(state, {
		tone: "info",
		title: `${artist.name} booked off`,
		body: `${weeks} week(s). Energy recovers, the page forgets.`
	});
	return null;
}
function dateSomeone(state, rng, catalogId) {
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
		gender
	};
	a.relationship = "dating";
	a.mood = clamp$1(a.mood + 8, 0, 100);
	pushNotif(state, {
		tone: "good",
		title: `Seeing ${a.partner.name}`,
		body: `${a.partner.job}${a.partner.famous ? " · famous" : ""} · net worth $${a.partner.netWorth.toLocaleString("en-US")}.`
	});
	return null;
}
function propose(state, plan) {
	const a = playerArtist(state);
	if (!a?.partner) return "Date someone first.";
	if (a.partner.closeness < 55) return "They said not yet.";
	const ring = 8500;
	const paid = settleDue(state, ring, plan ?? cashPlan(ring));
	if (paid) return paid;
	a.relationship = "engaged";
	a.partner.closeness = clamp$1(a.partner.closeness + 15, 0, 100);
	pushNotif(state, {
		tone: "good",
		title: `Engaged to ${a.partner.name}`,
		body: "Set a date when the tour allows."
	});
	return null;
}
function marry(state, plan) {
	const a = playerArtist(state);
	if (!a?.partner || a.relationship !== "engaged") return "Get engaged first.";
	const cost = 22e3;
	const paid = settleDue(state, cost, plan ?? cashPlan(cost));
	if (paid) return paid;
	a.relationship = "married";
	unlockAchievement(state, "married");
	pushNotif(state, {
		tone: "viral",
		title: `Married ${a.partner.name}`,
		body: "X is unhinged. Instagram is worse."
	});
	return null;
}
function haveKid(state, rng, opts) {
	const a = playerArtist(state);
	if (!a) return "Artist career only.";
	if (!a.partner) return "Need a partner.";
	haveChild(state, rng, "natural", opts);
	a.energy = clamp$1(a.energy - 20, 0, 100);
	return null;
}
function requestFeature(state, songId, guestId) {
	const song = state.songs.find((s) => s.id === songId);
	const guest = state.artists.find((a) => a.id === guestId);
	const host = song ? state.artists.find((a) => a.id === song.artistId) : null;
	if (!song || !guest || !host) return "Can't book that feature.";
	if (!isControlled(state, host)) return "Not your record.";
	if (guest.id === host.id) return "That's you.";
	if (song.collabArtistId) return "Already has a feature.";
	return lockFeature(state, song, guest, host);
}
function lockFeature(state, song, guest, host) {
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
	song.quality = clamp$1(song.quality + 2, 0, 99);
	growFollowers(host, "tiktok", Math.round(guest.popularity * 50), 24);
	growFollowers(host, "instagram", Math.round(guest.popularity * 28), 12);
	host.fame = clamp$1(host.fame + guest.popularity * .05, 0, 100);
	state.features.unshift({
		id: nid(state, "ft"),
		hostArtistId: host.id,
		featureArtistId: guest.id,
		songId: song.id,
		title: song.title,
		fee: paid ? fee : 0,
		status: "accepted",
		weeksLeft: 0,
		incoming: false
	});
	const gp = profileOf(guest, "x");
	state.xMessages.unshift({
		id: nid(state, "pm"),
		week: state.week,
		from: guest.name,
		handle: gp.handle,
		text: paid ? `locked. verse for “${song.title}” is on the way. don’t bury me in the mix.` : `i’ll hop on “${song.title}” for ${Math.round(split * 100)}% of the single. send the session.`,
		avatar: gp.avatar,
		artistId: guest.id,
		kind: "collab",
		songId: song.id
	});
	announceCollab(state, mulberry32(state.seed + state.idSeq * 17), song);
	pushNotif(state, {
		tone: "viral",
		title: `${guest.name} on “${song.title}”`,
		body: paid ? `Paid $${fee.toLocaleString("en-US")}. Charts will print feat. ${guest.name}.` : `${guest.name} took a ${Math.round(split * 100)}% split. Charts will print feat. ${guest.name}.`
	});
	return null;
}
function sendXDm(state, toId, text, songId) {
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
			outgoing: true
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
		outgoing: true
	});
	const open = playerSongs(state).filter((s) => !s.collabArtistId);
	state.xMessages.unshift({
		id: nid(state, "pm"),
		week: state.week,
		from: them.name,
		handle: tp.handle,
		text: them.superstar || them.real ? open.length ? `manager has this. pick the single in this thread and I’ll hop on — cash or a split.` : "cut the single first, then slide the record in this thread. I’ll hop on." : open.length ? "say less. pick the single below and lock me in." : "book a single, then DM me the title. I’ll jump on it.",
		avatar: tp.avatar,
		artistId: them.id,
		kind: "chat"
	});
	return null;
}
function answerFeature(state, offerId, accept, rng) {
	const offer = state.features.find((f) => f.id === offerId);
	if (!offer || offer.status !== "open") return "That offer's gone.";
	if (!accept) {
		offer.status = "declined";
		pushNotif(state, {
			tone: "info",
			title: "Feature passed",
			body: "The verse goes to someone else."
		});
		return null;
	}
	const host = state.artists.find((a) => a.id === offer.hostArtistId);
	const guest = state.artists.find((a) => a.id === offer.featureArtistId);
	if (!host || !guest) return "Missing artist.";
	const you = playerArtist(state) ?? rosterOf(state)[0];
	if (offer.hopOn) {
		const song = offer.songId ? state.songs.find((s) => s.id === offer.songId) : playerSongs(state).find((s) => !s.collabArtistId);
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
			song.streamsWeek = Math.round(host.monthlyListeners / 4 * .18 + guest.popularity * 700);
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
			you.fame = clamp$1(you.fame + host.popularity * .08, 0, 100);
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
			song.quality = clamp$1(song.quality + 2, 0, 99);
		}
		growFollowers(host, "tiktok", Math.round(guest.popularity * 50), 24);
	}
	offer.status = "accepted";
	pushNotif(state, {
		tone: "viral",
		title: offer.incoming ? `${host.name} featuring you` : `${guest.name} on the record`,
		body: `Fee $${offer.fee.toLocaleString("en-US")}. Popularity priced the verse.`
	});
	return null;
}
function tickNpcCollabs(state, rng) {
	if (!rng.chance(.4)) return;
	const pool = state.artists.filter((a) => a.superstar || a.real || a.fame > 18);
	const open = state.songs.filter((s) => s.status === "released" && s.kind === "single" && !s.collabArtistId).filter((s) => {
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
function tickFeatures(state, rng) {
	if (!state.features) state.features = [];
	for (const f of state.features) {
		if (f.status !== "open") continue;
		f.weeksLeft -= 1;
		if (!f.incoming && !f.hopOn && f.weeksLeft <= 0) {
			const guest = state.artists.find((a) => a.id === f.featureArtistId);
			const you = playerArtist(state);
			const chance = guest && you ? clamp$1(.22 + you.popularity / 140 - guest.popularity / 220, .08, .72) : .3;
			if (rng.chance(chance)) answerFeature(state, f.id, true, rng);
			else {
				f.status = "declined";
				pushNotif(state, {
					tone: "bad",
					title: "Feature declined",
					body: `${guest?.name ?? "They"} passed. Popularity gap.`
				});
			}
		}
		if ((f.incoming || f.hopOn) && f.weeksLeft <= 0 && f.status === "open") f.status = "declined";
	}
	const you = playerArtist(state) ?? rosterOf(state)[0];
	if (!you) return;
	const openIncoming = state.features.filter((f) => f.status === "open" && f.incoming).length;
	if (you.popularity >= 8 && openIncoming < 2 && rng.chance(.28 + you.popularity / 250)) {
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
				incoming: true
			});
			const offer = state.features[0];
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
				songId: offer.songId
			});
			pushNotif(state, {
				tone: "good",
				title: `${host.name} DMed you`,
				body: `Feature offer · $${fee.toLocaleString("en-US")} — open X Messages.`
			});
		}
	}
	const yourOpen = playerSongs(state).filter((s) => !s.collabArtistId);
	const openHop = state.features.filter((f) => f.status === "open" && f.hopOn).length;
	if (yourOpen.length && openHop < 2 && rng.chance(.32 + you.popularity / 200)) {
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
				hopOn: true
			});
			const offer = state.features[0];
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
				songId: song.id
			});
			pushNotif(state, {
				tone: "good",
				title: `${guest.name} wants on the record`,
				body: `DMed you about “${song.title}”. Open X Messages or Studio.`
			});
		}
	}
}
function toggleMerchSite(state) {
	state.merchSiteLive = !state.merchSiteLive;
	pushNotif(state, {
		tone: "info",
		title: state.merchSiteLive ? "Merch site is live" : "Merch site paused",
		body: state.merchSiteLive ? "Visits scale with fame and Instagram." : "Warehouse only."
	});
	return null;
}
function addMerch(state, name, kind, price) {
	if (!name.trim()) return "Name the drop.";
	state.merch.push({
		id: nid(state, "mer"),
		name: name.trim().slice(0, 28),
		kind,
		price: Math.max(8, price),
		cost: Math.round(Math.max(8, price) * .28),
		stock: 30,
		sold: 0,
		autoStock: true
	});
	return null;
}
function restockMerch(state, id, n, plan) {
	const item = state.merch.find((m) => m.id === id);
	if (!item) return "Missing SKU.";
	const cost = item.cost * n;
	const paid = settleDue(state, cost, plan ?? cashPlan(cost));
	if (paid) return paid;
	item.stock += n;
	return null;
}
function hireGuardsAndMeetup(state, artistId) {
	const artist = state.artists.find((a) => a.id === artistId);
	if (!artist || !isControlled(state, artist)) return "Not them.";
	const cost = 1200 + state.securityGuards * 200;
	if (state.cash < cost) return "Meetup budget short.";
	state.cash -= cost;
	const safe = state.securityGuards >= 2;
	const fans = Math.round(artist.fans * .02 + artist.followers.instagram * .01);
	growFollowers(artist, "instagram", fans * .4, 20);
	artist.mood = clamp$1(artist.mood + (safe ? 8 : -6), 0, 100);
	state.fanEvents.unshift({
		id: nid(state, "fan"),
		week: state.week,
		kind: "meetup",
		text: safe ? `${fans} fans. Security held the line.` : `Crowd got grabby. Hire more security.`,
		mood: safe ? 8 : -6
	});
	return null;
}
function enterEurovision(state, rng) {
	const a = playerArtist(state) ?? rosterOf(state)[0];
	if (!a) return "Need an act.";
	if (a.nationality === "US") return "US acts sit this one out.";
	if (state.eurovision?.entered && state.eurovision.year === 2026 + Math.floor((state.week - 1) / 52)) return "Already entered this year.";
	const place = rng.int(1, 18);
	state.eurovision = {
		entered: true,
		year: 2026 + Math.floor((state.week - 1) / 52),
		place
	};
	a.fame = clamp$1(a.fame + (place === 1 ? 18 : place <= 5 ? 10 : 4), 0, 100);
	growFollowers(a, "tiktok", place === 1 ? 8e4 : 12e3, 400);
	unlockAchievement(state, "eurovision");
	pushNotif(state, {
		tone: place === 1 ? "viral" : "good",
		title: place === 1 ? "Eurovision winner" : `Eurovision #${place}`,
		body: `${a.name} ${place === 1 ? "takes the trophy." : "survived the televote."}`
	});
	return null;
}
function acceptInvestment(state, amount, equity, name) {
	if (state.career !== "label") return "Investors want a label.";
	if (state.labelOwnedPct - equity < 35) return "You'd lose control of the company.";
	state.cash += amount;
	state.labelOwnedPct -= equity;
	state.investors.push({
		name,
		amount,
		equity
	});
	pushNotif(state, {
		tone: "good",
		title: `${name} in`,
		body: `${amount.toLocaleString("en-US")} for ${equity}% · you still own ${state.labelOwnedPct}%.`
	});
	return null;
}
function takeSponsor(state, name, weekly, weeks) {
	if (((playerArtist(state) ?? rosterOf(state)[0])?.fame ?? state.labelRep) < 18) return "Brands want a name they can google.";
	if (state.sponsors.some((s) => s.weeksLeft > 0 && s.name === name)) return "Already on that roster.";
	state.sponsors.push({
		name,
		weekly,
		weeksLeft: weeks
	});
	pushNotif(state, {
		tone: "good",
		title: `${name} deal`,
		body: `${weekly.toLocaleString("en-US")} a week for ${weeks} weeks.`
	});
	return null;
}
function buildFacility(state, kind, plan) {
	const costs = {
		studio: 18e4,
		manufacturing: 24e4,
		distribution: 16e4
	};
	if (state.facilities[kind]) return "Already built.";
	const cost = costs[kind];
	const paid = settleDue(state, cost, plan ?? cashPlan(cost));
	if (paid) return paid;
	state.facilities[kind] = true;
	if (kind === "studio") state.studioTier = Math.max(state.studioTier, 3);
	pushNotif(state, {
		tone: "good",
		title: `${kind} facility live`,
		body: `Cap-ex ${cost.toLocaleString("en-US")}.`
	});
	return null;
}
function runAudition(state, rng) {
	const cost = 3500;
	if (state.cash < cost) return "Can't rent the room.";
	state.cash -= cost;
	const names = Array.from({ length: 4 }, () => generateArtist(rng).name);
	state.pendingAudition = {
		week: state.week,
		names
	};
	pushNotif(state, {
		tone: "info",
		title: "Auditions booked",
		body: "X Factor-style. Sign the one with the room."
	});
	return null;
}
function pickAudition(state, rng, name) {
	if (!state.pendingAudition) return "No audition on the board.";
	const seed = generateArtist(rng, { signedFame: rng.int(12, 28) });
	seed.name = name;
	seed.handle = handleize(name) || "act";
	const artist = fromSeed(state, seed, {
		signed: state.career === "label",
		labelId: state.career === "label" ? "player" : null,
		royalty: state.career === "label" ? .18 : .85,
		wage: state.career === "label" ? 1400 : 0
	});
	state.artists.unshift(artist);
	if (state.career === "label") artist.signedWeek = state.week;
	state.pendingAudition = null;
	pushNotif(state, {
		tone: "good",
		title: `Signed ${name} from the room`,
		body: "Potential is a guess. The page is the test."
	});
	return null;
}
function runTalentShow(state, rng) {
	const a = playerArtist(state) ?? rosterOf(state)[0];
	if (!a) return "Need an act.";
	const stage = state.talentShow?.stage ?? "none";
	if (stage === "none" || stage === "final") {
		if (state.cash < 8e3) return "Entry fee is $8,000.";
		state.cash -= 8e3;
		state.talentShow = {
			stage: "audition",
			week: state.week
		};
		pushNotif(state, {
			tone: "info",
			title: "Talent show audition",
			body: "Four chairs. Don't look down."
		});
		return null;
	}
	if (stage === "audition") {
		if (!rng.chance(.55 + a.stats.vocals / 250 + a.stats.charisma / 300)) {
			state.talentShow = {
				stage: "none",
				week: state.week
			};
			a.mood = clamp$1(a.mood - 10, 0, 100);
			return "Three no's. Back to the bedroom.";
		}
		state.talentShow = {
			stage: "judges",
			week: state.week
		};
		growFollowers(a, "tiktok", 4e3, 200);
		pushNotif(state, {
			tone: "good",
			title: "Through to judges' houses",
			body: "The clip is already on TikTok."
		});
		return null;
	}
	if (stage === "judges") {
		if (!rng.chance(.48 + a.stats.performance / 220)) {
			state.talentShow = {
				stage: "none",
				week: state.week
			};
			return "Cut at judges' houses.";
		}
		state.talentShow = {
			stage: "final",
			week: state.week
		};
		const votes = Math.round(a.followers.tiktok * (.2 + rng.next() * .4) + 12e3);
		const win = rng.chance(.22 + a.fame / 200);
		growFollowers(a, "tiktok", votes * .08, 800);
		growFollowers(a, "instagram", votes * .05, 400);
		a.fame = clamp$1(a.fame + (win ? 14 : 6), 0, 100);
		if (win) {
			state.cash += 75e3;
			pushNotif(state, {
				tone: "viral",
				title: "Talent show winner",
				body: "$75k, a recording week, and a For You bump."
			});
		} else pushNotif(state, {
			tone: "good",
			title: "Finalist",
			body: "Didn't take the crown. The followers stayed."
		});
		return null;
	}
	return null;
}
function compileGreatestHits(state, artistId, rng) {
	const artist = state.artists.find((a) => a.id === artistId);
	if (!artist || !isControlled(state, artist)) return "Not your catalog.";
	const hits = state.songs.filter((s) => s.artistId === artistId && s.status === "released" && s.kind === "single");
	if (hits.length < 3) return "Need three singles first.";
	if (state.cash < 12e3) return "Compilation costs $12,000.";
	state.cash -= 12e3;
	const song = writeSong(state, rng, artist, false);
	song.kind = "greatestHits";
	song.title = `${artist.name} · Greatest Hits`;
	song.status = "mastered";
	song.weeksLeft = 0;
	song.quality = clamp$1(Math.round(hits.reduce((n, s) => n + s.quality, 0) / hits.length) + 4, 40, 96);
	state.songs.push(song);
	pushNotif(state, {
		tone: "good",
		title: "Greatest Hits mastered",
		body: "Release when you want the catalog to work again."
	});
	return null;
}
function applyCheat(state, kind, rng) {
	const a = playerArtist(state) ?? rosterOf(state)[0];
	if (kind === "money") state.cash += 1e6;
	else if (kind === "fans" && a) {
		growFollowers(a, "tiktok", 12e4, 1e3);
		growFollowers(a, "x", 12e4, 1e3);
		growFollowers(a, "instagram", 12e4, 1e3);
		growFollowers(a, "youtube", 12e4, 1e3);
		a.weeklyStreamHistory = [
			2e4,
			2e4,
			2e4,
			4e4
		];
		syncMonthly(a);
		applyVerification(state, a);
	} else if (kind === "skills" && a) Object.keys(a.stats).forEach((k) => {
		a.stats[k] = 95;
	});
	else if (kind === "hit" && a) {
		const song = writeSong(state, rng, a, true);
		song.status = "released";
		song.releasedWeek = state.week;
		song.streamsWeek = 24e5;
		song.streams = 24e5;
		song.weekHistory = [
			0,
			0,
			0,
			24e5
		];
		song.promoHeat = 80;
		song.lastPromoWeek = state.week;
		song.playlist = true;
		const snd = makeSound(state, song.title, a.name, song.id);
		song.soundId = snd.id;
		state.sounds.push(snd);
		state.songs.push(song);
		a.weeklyStreamHistory = [
			0,
			0,
			0,
			24e5
		];
		syncMonthly(a);
	} else if (kind === "score") state.creditScore = 820;
	else if (kind === "viral" && a) {
		growFollowers(a, "tiktok", 5e5, 1e3);
		a.fame = clamp$1(a.fame + 20, 0, 100);
		const song = state.songs.find((s) => s.artistId === a.id && s.status === "released");
		if (song) {
			song.promoHeat = 100;
			song.lastPromoWeek = state.week;
			song.streamsWeek = Math.max(song.streamsWeek, 18e5);
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
		pushNotif(state, {
			tone: "bad",
			title: "Inside",
			body: "Testing the bars. Four weeks."
		});
	} else return "Unknown cheat.";
	pushNotif(state, {
		tone: "info",
		title: "Cheat applied",
		body: "Testing only. The board still sees you."
	});
	return null;
}
function weekOfYear(week) {
	return (week - 1) % 52 + 1;
}
function revealCeremonyCat(state, cat, show) {
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
		artistId: win.artistId
	});
	if (artist && isControlled(state, artist)) {
		artist.fame = clamp$1(artist.fame + 6, 0, 100);
		if (show.includes("Grammy")) unlockAchievement(state, "grammy");
		pushNotif(state, {
			tone: "viral",
			title: `${show}`,
			body: `${artist.name} wins ${cat.category}${song ? ` for “${song.title}”` : ""}.`
		});
	}
}
function skipCeremonyCategory(state) {
	const cer = state.ceremony;
	if (!cer || cer.done) return "No telecast.";
	const cat = cer.categories[cer.cursor];
	if (cat) revealCeremonyCat(state, cat, cer.show);
	cer.cursor += 1;
	if (cer.cursor >= cer.categories.length) cer.done = true;
	return null;
}
function skipCeremonyShow(state) {
	const cer = state.ceremony;
	if (!cer || cer.done) return "No telecast.";
	while (!cer.done) skipCeremonyCategory(state);
	return null;
}
function tickAwards(state, rng) {
	if (state.ceremony && !state.ceremony.done) return;
	const woy = weekOfYear(state.week);
	const cal = AWARD_CALENDAR.find((a) => a.weekOfYear === woy);
	if (!cal) return;
	const cats = AWARDS.filter((a) => a.show === cal.show);
	if (!cats.length) return;
	const pool = state.songs.filter((s) => s.status === "released" && s.streams > 8e3);
	const talent = state.artists.filter((a) => a.fame > 10);
	const categories = [];
	for (const c of cats) {
		const noms = [];
		for (const s of rng.shuffle(pool.slice())) {
			if (noms.length >= 4) break;
			const art = state.artists.find((a) => a.id === s.artistId);
			if (!art) continue;
			if (noms.some((n) => n.songId === s.id)) continue;
			noms.push({
				songId: s.id,
				artistId: art.id,
				name: art.name,
				title: s.title
			});
		}
		for (const a of rng.shuffle(talent.slice())) {
			if (noms.length >= 4) break;
			if (noms.some((n) => n.artistId === a.id)) continue;
			noms.push({
				songId: null,
				artistId: a.id,
				name: a.name,
				title: a.name
			});
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
		categories.push({
			id: c.id,
			category: c.category,
			nominees: noms,
			winnerIndex,
			revealed: false
		});
	}
	if (!categories.length) return;
	state.ceremony = {
		id: nid(state, "cer"),
		show: cal.show,
		week: state.week,
		categories,
		cursor: 0,
		done: false
	};
	pushNotif(state, {
		tone: "viral",
		title: `${cal.show} is live`,
		body: "Skip a category or skip the whole show. Hardware still prints either way."
	});
}
function tickSuperstars(state, rng) {
	const stars = state.artists.filter((a) => a.superstar || a.real);
	for (const a of stars) {
		if (rng.chance(.22)) {
			const song = writeSong(state, rng, a, true);
			song.status = "released";
			song.releasedWeek = state.week;
			const weekly = Math.round(a.monthlyListeners / 4 * (.35 + rng.next() * .5));
			song.streamsWeek = weekly;
			song.streams = weekly;
			song.weekHistory = [];
			song.promoHeat = 60;
			song.lastPromoWeek = state.week;
			song.playlist = rng.chance(.7);
			song.radioWeeks = rng.int(2, 6);
			song.radioPower = 50 + a.fame * .3;
			const snd = makeSound(state, song.title, a.name, song.id);
			song.soundId = snd.id;
			state.sounds.push(snd);
			state.songs.push(song);
			const clip = ownedStyleClip(state, rng, a, song, snd, false);
			clip.owned = false;
			clip.views = Math.round(weekly * .8);
			state.clips.unshift(clip);
			if (rng.chance(.62)) {
				const guests = stars.filter((x) => x.id !== a.id);
				if (guests.length) {
					song.collabArtistId = rng.pick(guests).id;
					announceCollab(state, rng, song);
				}
			}
			seedOfficialVideo(state, rng, a, song);
		}
		for (const s of state.songs.filter((x) => x.artistId === a.id && x.status === "released")) if (rng.chance(.55)) {
			s.lastPromoWeek = state.week;
			s.promoHeat = Math.min(100, s.promoHeat + 8);
		}
	}
}
function tickWeek(state, rng) {
	state.week += 1;
	const ledger = emptyLedger();
	const roster = rosterOf(state);
	if (state.week % 52 === 1 && state.week > 1) {
		for (const a of state.artists) a.age += 1;
		for (const a of roster) for (const k of a.kids) {
			k.age += 1;
			if (k.age >= 5 && k.school === "none yet") k.school = "public";
		}
	}
	if (state.career === "label") {
		let payroll = 2400 + state.studioTier * 900 + state.ceoSalary;
		for (const a of roster) payroll += a.wage;
		state.cash -= payroll;
		ledger.payroll = payroll;
	} else {
		const living = state.dealKind === "signed" ? 650 : 1050;
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
			state.creditScore = clamp$1(state.creditScore + 8, 300, 850);
			if (loan.purpose === "lease") {
				const gone = state.cars.filter((c) => c.loanId === loan.id);
				if (gone.length) {
					state.cars = state.cars.filter((c) => c.loanId !== loan.id);
					pushNotif(state, {
						tone: "info",
						title: "Lease ended",
						body: `${gone.map((c) => c.name).join(", ")} went back to the desk.`
					});
				}
			}
		}
	}
	for (const card of state.cards) {
		if (card.used <= 0) continue;
		const min = Math.max(25, Math.round(card.used * (card.apr / 100 / 52) + card.used * .02));
		const want = state.cardAutopay ? Math.min(card.used, Math.max(0, state.cash)) : Math.min(min, state.cash);
		const pay = Math.max(0, want);
		state.cash -= pay;
		const interestCharge = card.used * (card.apr / 100 / 52);
		card.used = Math.max(0, card.used - pay + interestCharge);
		interest += pay;
		if (state.cardAutopay && pay > 0) {
			pushStatement(state, `${card.name} autopay`, -pay, "auto");
			if (pay >= min) state.creditScore = clamp$1(state.creditScore + .35, 300, 850);
		}
	}
	ledger.interest = interest;
	if (state.cash >= 0 && state.loans.every((l) => l.weeksLeft === 0 || l.remaining > 0)) state.creditScore = clamp$1(state.creditScore + .15, 300, 850);
	if (state.cash < 0) state.creditScore = clamp$1(state.creditScore - 4, 300, 850);
	for (const a of state.artists) {
		if (!isControlled(state, a) && !a.signed && !a.superstar) continue;
		if (a.onHoliday) {
			a.holidayWeeks -= 1;
			a.energy = clamp$1(a.energy + 40, 0, 100);
			a.mood = clamp$1(a.mood + 6, 0, 100);
			if (a.holidayWeeks <= 0) a.onHoliday = false;
		} else {
			a.energy = clamp$1(a.energy + 28 + a.stats.workEthic * .12, 0, 100);
			a.mood = clamp$1(a.mood + rng.gauss(0, 4), 10, 100);
		}
		a.tiktokPostsThisWeek = 0;
		a.xPostsThisWeek = 0;
		a.gramPostsThisWeek = 0;
		if (a.partner) a.partner.closeness = clamp$1(a.partner.closeness + rng.gauss(0, 3), 5, 100);
		if (a.aiControl && isControlled(state, a) && rng.chance(.45) && !a.onHoliday) {
			const mastered = state.songs.find((s) => s.artistId === a.id && s.status === "mastered");
			if (mastered) releaseSong(state, mastered.id, rng);
			else if (!state.songs.some((s) => s.artistId === a.id && (s.status === "writing" || s.status === "recording"))) startSong(state, a.id, rng);
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
				pushNotif(state, {
					tone: "info",
					title: `Tracking “${song.title}”`,
					body: artist ? `${artist.name} is in the booth.` : "In the booth."
				});
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
				pushNotif(state, {
					tone: "good",
					title: `Mastered “${song.title}”`,
					body: `Quality ${song.quality}. Release when you're ready to feed TikTok.`
				});
			}
		} else if (song.status === "released") {
			const gained = weeklyOrganic(state, song, rng);
			const pending = song.streamsPending;
			song.streams += gained;
			song.streamsWeek = pending + gained;
			song.streamsPending = 0;
			song.weekHistory = [...song.weekHistory, song.streamsWeek].slice(-8);
			song.sales += Math.round(gained * .0018);
			const fmt = song.releaseFormat ?? "both";
			const digitalMul = fmt === "cd" ? .28 : 1;
			const physicalMul = fmt === "digital" ? .12 : fmt === "cd" ? 1.8 : 1;
			const plant = state.facilities.manufacturing ? 1.6 : 1;
			const d = Math.round(gained * .001 * digitalMul);
			const p = Math.round(gained * (state.facilities.manufacturing ? 22e-5 : 5e-5) * physicalMul * plant);
			song.salesDigitalWeek = d;
			song.salesPhysicalWeek = p;
			song.salesDigital += d;
			song.salesPhysical += p;
			if (song.radioWeeks > 0) song.radioWeeks -= 1;
			song.promoHeat = Math.max(0, song.promoHeat * .72 - 2);
			song.tiktokHeat = Math.max(0, song.tiktokHeat * .6);
			song.videoHeat = Math.max(0, song.videoHeat * .78);
			const home = CITY_TO_REGION[state.artists.find((a) => a.id === song.artistId)?.hometown ?? ""] ?? "northamerica";
			song.regional[home].streams += Math.round(song.streamsWeek * .45);
		}
	}
	for (const clip of state.clips) {
		const age = Math.max(0, state.week - clip.week);
		const decay = Math.pow(.62, age);
		const residual = Math.round(clip.views * .08 * decay * (1 + Math.log10(1 + clip.soundUses) * .2));
		clip.viewsWeek = residual;
		clip.views += residual;
	}
	state.clips = state.clips.slice(0, 110);
	for (const v of state.videos) {
		v.viewsWeek = Math.round(v.viewsWeek * .55);
		v.views += v.viewsWeek;
	}
	for (const c of state.campaigns) c.weeksLeft -= 1;
	state.campaigns = state.campaigns.filter((c) => c.weeksLeft > 0);
	tickSuperstars(state, rng);
	tickNpcCollabs(state, rng);
	tickFeatures(state, rng);
	const weeklyByArtist = /* @__PURE__ */ new Map();
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
		const cut0 = playerShare(state, artist, streamGross + cBonus + rBonus);
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
		growFollowers(a, "x", tokViews * .01 + weeklyStreams * .004 + a.fame * 2, 4);
		growFollowers(a, "instagram", tokViews * .012 + a.stats.looks * 1.4, 4);
		growFollowers(a, "youtube", weeklyStreams * .01 + tokViews * .002, 3);
		growFollowers(a, "tiktok", tokViews * .003 + (weeklyStreams > 1e4 ? 20 : 4), 2);
		applyVerification(state, a);
		const showGross = state.tours.some((t) => t.artistId === a.id && t.status !== "done") ? a.monthlyListeners * .04 + a.fame * 80 : Math.round(a.monthlyListeners * .01);
		const merchGross = state.merchSiteLive ? a.followers.instagram * .04 + a.followers.tiktok * .012 + a.fans * .03 : Math.round((a.followers.instagram + a.followers.tiktok) * .004);
		const showCut = playerShare(state, a, showGross);
		const merchCut = playerShare(state, a, merchGross);
		state.cash += showCut + merchCut;
		ledger.shows += showCut;
		ledger.merch += merchCut;
		if (a.albumsRemaining === 1 && a.signed) pushNotif(state, {
			tone: "bad",
			title: `1 album remaining · ${a.name}`,
			body: "The option year is staring."
		});
	}
	for (const tour of state.tours) {
		if (tour.status === "rehearsal") tour.status = "active";
		for (const stop of tour.stops) if (!stop.done && stop.week <= state.week) {
			stop.done = true;
			const cut = Math.round(stop.gross * .7);
			state.cash += cut;
			ledger.shows += cut;
			const art = state.artists.find((x) => x.id === tour.artistId);
			if (art) art.energy = clamp$1(art.energy - 10, 0, 100);
		}
		if (tour.stops.every((s) => s.done)) {
			tour.status = "done";
			unlockAchievement(state, "tour");
		}
	}
	if (state.merchSiteLive) {
		const you = roster[0];
		const visits = you ? Math.round(you.followers.instagram * .04 + you.fame * 40) : 80;
		state.merchVisitsWeek = visits;
		for (const item of state.merch) {
			const sold = Math.min(item.stock, Math.round(visits * .02 * (30 / Math.max(12, item.price))));
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
	if (rng.chance(.4) && roster.length) {
		const a = rng.pick(roster);
		const roll = rng.next();
		if (roll < .2) {
			a.mood = clamp$1(a.mood - 14, 5, 100);
			const g = growFollowers(a, "x", rng.int(400, 5e3), 80);
			pushNotif(state, {
				tone: "bad",
				title: `${a.name} in the tabloids`,
				body: `Mood down. X +${g.toLocaleString("en-US")} anyway.`
			});
		} else if (roll < .45) {
			const pay = state.career === "artist" ? 4500 : 8e3;
			state.cash += pay;
			ledger.other += pay;
			pushNotif(state, {
				tone: "good",
				title: "Brand desk called",
				body: `${a.name} landed a placement.`
			});
		} else if (roll < .65) {
			a.energy = clamp$1(a.energy - 20, 0, 100);
			pushNotif(state, {
				tone: "info",
				title: `${a.name} wants a week off camera`,
				body: "Energy is a resource."
			});
		}
	}
	if (state.career === "artist" && state.dealKind === "signed") {
		const a = playerArtist(state);
		const song = a ? state.songs.find((s) => s.artistId === a.id && s.status === "released" && s.radioWeeks <= 0) : null;
		if (song && rng.chance(.45)) {
			song.radioWeeks = Math.max(song.radioWeeks, 3);
			song.radioPower = Math.max(song.radioPower, 50 + song.quality * .2);
			song.lastPromoWeek = state.week;
			pushNotif(state, {
				tone: "info",
				title: `${state.labelName} worked radio`,
				body: `“${song.title}” is getting spins.`
			});
		}
	}
	if (state.week % 4 === 0) refreshSongMarket(state, rng);
	seedXWeek(state, rng);
	maybeDeals(state, rng);
	refreshTrends(state, rng);
	state.labelRep = clamp$1(state.labelRep + (roster.length ? .15 : -.05), 0, 100);
	if (state.career === "artist" && state.dealKind === "independent" && state.week >= 20) unlockAchievement(state, "independent");
	if (state.cash >= 1e6) unlockAchievement(state, "millionaire");
	if (playerSongs(state).find((s) => s.streams >= 1e6)) unlockAchievement(state, "million");
	const numberOne = state.songs.find((s) => s.chart === 1 && state.artists.find((a) => a.id === s.artistId && isControlled(state, a)));
	if (numberOne) {
		unlockAchievement(state, "number-one");
		unlockAchievement(state, "billboard");
		pushNotif(state, {
			tone: "viral",
			title: `#1 Billboard 100 — “${numberOne.title}”`,
			body: "Streaming crown."
		});
		state.labelRep = clamp$1(state.labelRep + 3, 0, 100);
	} else if (playerSongs(state).some((s) => s.chart != null)) unlockAchievement(state, "billboard");
	ledger.gross = ledger.streams + ledger.chartBonus + ledger.radio + ledger.shows + ledger.merch + ledger.other + ledger.royalties;
	ledger.net = ledger.gross - ledger.payroll - ledger.promo - ledger.studio - ledger.living - ledger.housing - ledger.cars - ledger.security - ledger.interest - ledger.nightlife - ledger.legal - ledger.luxury;
	state.ledger = ledger;
	if (ledger.gross > 0) pushStatement(state, "Weekly deposits", Math.round(ledger.gross), "income");
	if (state.cash < 0) pushNotif(state, {
		tone: "bad",
		title: "Overdrawn",
		body: "FICO is watching. Land a clip or take a loan."
	});
	for (const song of state.songs) if (song.status !== "released") song.streamsWeek = 0;
}
function seedXWeek(state, rng) {
	const pool = state.artists.filter((a) => a.signed || a.followers.x > 2e3 || a.superstar);
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
			likes: rng.int(40, 9e3),
			reposts: rng.int(4, 800),
			replies: rng.int(6, 400),
			owned: false,
			avatar: a.avatar,
			verified: a.verified.x
		});
	}
	state.xPosts = state.xPosts.slice(0, 80);
}
function weeklyBurn(state) {
	const roster = rosterOf(state);
	let n = 0;
	if (state.career === "artist") n += (state.dealKind === "signed" ? 650 : 1050) + 280 + state.studioTier * 220;
	else n += 2400 + state.studioTier * 900 + state.ceoSalary + roster.reduce((a, x) => a + x.wage, 0);
	n += state.securityGuards * 850;
	for (const h of state.houses) n += HOUSES.find((x) => x.id === h.catalogId)?.weekly ?? 0;
	for (const c of state.cars) n += CARS.find((x) => x.id === c.catalogId)?.weekly ?? 0;
	n += state.loans.reduce((a, l) => a + (l.weeksLeft > 0 ? l.weeklyPayment : 0), 0);
	return n;
}
function migrateSave(raw) {
	if (!raw || typeof raw !== "object") return null;
	try {
		const s = raw;
		if (typeof s.week !== "number" || !Array.isArray(s.artists)) return null;
		const next = createInitialState(s.career === "artist" ? {
			career: "artist",
			name: "Recovered",
			city: s.city ?? "Los Angeles",
			genre: "pop",
			database: s.settings?.database ?? "normal"
		} : {
			career: "label",
			labelName: s.labelName ?? "Harbor",
			city: s.city ?? "Los Angeles",
			database: s.settings?.database ?? "normal"
		}, s.seed ?? 1);
		if (s.version >= 3 && Array.isArray(s.songs)) {
			const merged = {
				...next,
				...s,
				version: 7,
				settings: {
					...next.settings,
					...s.settings ?? {}
				},
				liveViewers: s.liveViewers ?? next.liveViewers,
				features: s.features ?? []
			};
			for (const a of merged.artists) ensureArtistExtras(a);
			for (const song of merged.songs) {
				if (!song.releaseFormat) song.releaseFormat = "both";
				if (typeof song.featureFee !== "number") song.featureFee = 0;
				if (typeof song.featureSplit !== "number") song.featureSplit = 0;
			}
			if (merged.songs.filter((s) => s.collabArtistId).length < 12 || (merged.videos?.length ?? 0) < 6) {
				const rng = mulberry32((merged.seed ?? 1) + 17);
				pairWorldFeatures(merged, rng);
				seedWorldVideos(merged, rng);
				for (const v of merged.videos) {
					const song = v.songId ? merged.songs.find((s) => s.id === v.songId) : null;
					const guest = song ? featName(merged, song) : null;
					if (guest && v.kind === "traditional" && !v.title.includes("feat.")) v.title = `${song.title} (feat. ${guest}) (Official Video)`;
				}
			}
			for (const t of merged.tours) for (const st of t.stops) if (typeof st.canFill !== "boolean") st.canFill = st.attendance / Math.max(1, st.capacity) >= .7;
			ensureLifeState(merged);
			issueStarterCard(merged);
			return merged;
		}
		return next;
	} catch {
		return null;
	}
}
function netWorth(state) {
	const assets = state.houses.reduce((n, h) => n + h.value, 0) + state.cars.reduce((n, c) => n + (c.lease ? 0 : c.value), 0) + (state.jets ?? []).reduce((n, j) => n + j.value, 0) + (state.jewelry ?? []).reduce((n, j) => n + j.value, 0) + (state.buses ?? []).reduce((n, b) => n + b.value, 0) + (state.lands ?? []).reduce((n, l) => n + l.value, 0) + (state.islands ?? []).reduce((n, i) => n + i.value, 0) + (state.savings ?? 0);
	const debt = state.loans.reduce((n, l) => n + l.remaining, 0) + state.cards.reduce((n, c) => n + c.used, 0);
	return state.cash + assets - debt;
}
function ceoScore(state) {
	const fame = rosterOf(state).reduce((n, a) => n + a.fame, 0);
	const charting = playerSongs(state).filter((s) => s.chart != null).length;
	return Math.round(state.labelRep * 2 + fame + charting * 8 + Math.log10(1 + Math.max(0, state.cash)) * 6);
}
function toast(set, text, tone = "info") {
	const id = `t_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
	set((s) => ({ toasts: [...s.toasts, {
		id,
		text,
		tone
	}].slice(-5) }));
	setTimeout(() => {
		useGame.setState((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) }));
	}, 4200);
}
function mutate(game, fn) {
	const next = structuredClone(game);
	return {
		next,
		err: fn(next) ?? null
	};
}
function persistSlots(slots) {
	try {
		localStorage.setItem(SLOTS_KEY, JSON.stringify(slots));
	} catch {}
}
function readSlots() {
	try {
		const raw = localStorage.getItem(SLOTS_KEY);
		if (!raw) return {};
		return JSON.parse(raw);
	} catch {
		return {};
	}
}
function maybeAutosave(game) {
	if (!game.settings.autosave) return;
	const slots = readSlots();
	slots.auto = game;
	persistSlots(slots);
}
function pushLeader(game) {
	try {
		const you = playerArtist(game);
		const row = {
			name: you?.name ?? game.labelName,
			score: Math.round(netWorth(game) / 1e3 + (you?.fame ?? game.labelRep) * 100),
			week: game.week,
			fame: you?.fame ?? game.labelRep,
			cash: game.cash
		};
		const raw = localStorage.getItem(LEADER_KEY);
		const list = raw ? JSON.parse(raw) : [];
		list.push(row);
		list.sort((a, b) => b.score - a.score);
		localStorage.setItem(LEADER_KEY, JSON.stringify(list.slice(0, 25)));
	} catch {}
}
var useGame = create()(persist((set, get) => ({
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
			checkout: null
		});
		maybeAutosave(game);
		toast(set, game.career === "artist" ? `${game.artists[0]?.name ?? "You"} is independent. Write a record, then own the apps.` : `${game.labelName} is open. Scout someone who can survive a 15-second crop.`, "good");
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
		set({
			game: g,
			view: "hq",
			overlay: { type: "none" }
		});
		toast(set, `Loaded slot ${slot}.`, "good");
		return true;
	},
	listSlots: () => {
		const slots = readSlots();
		return [
			0,
			1,
			2,
			3,
			4
		].map((slot) => {
			const g = slot === 0 ? slots.auto ?? slots["0"] : slots[String(slot)];
			return {
				slot,
				label: g ? g.career === "artist" ? g.artists.find((a) => a.id === g.playerArtistId)?.name ?? "Artist" : g.labelName : "Empty",
				week: g?.week ?? 0
			};
		});
	},
	setView: (view) => set({
		view,
		overlay: { type: "none" }
	}),
	setOverlay: (overlay) => set({ overlay }),
	setFeedIndex: (n) => set({ feedIndex: n }),
	selectArtist: (id) => set({ selectedArtistId: id }),
	setMoreTab: (t) => set({ moreTab: t }),
	sign: (artistId) => {
		const { game } = get();
		if (!game) return;
		const { next, err } = mutate(game, (g) => signArtist(g, artistId));
		if (err) return toast(set, err, "bad");
		set({
			game: next,
			overlay: { type: "none" }
		});
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
		set({
			game: next,
			view: "studio"
		});
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
		set({
			game: next,
			overlay: {
				type: "rollout",
				clipId: rollout.clipId
			},
			feedIndex: 0
		});
		const tone = rollout.verdict === "flop" ? "bad" : rollout.verdict === "solid" ? "info" : "viral";
		toast(set, `${rollout.totalViews.toLocaleString("en-US")} views · +${rollout.followersGained.toLocaleString("en-US")} TikTok`, tone);
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
		set({
			game: next,
			overlay: { type: "none" },
			view: "career"
		});
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
		set({
			game: next,
			checkout: null
		});
		toast(set, `${checkout.title} · paid.`, "good");
	},
	house: (id, plan) => {
		const { game } = get();
		if (!game) return;
		const { next, err } = mutate(game, (g) => buyHouse(g, id, plan));
		if (err) return toast(set, err, "bad");
		set({
			game: next,
			checkout: null
		});
		toast(set, "You have keys.", "good");
	},
	car: (id, plan) => {
		const { game } = get();
		if (!game) return;
		const { next, err } = mutate(game, (g) => buyCar(g, id, plan));
		if (err) return toast(set, err, "bad");
		set({
			game: next,
			checkout: null
		});
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
		set({
			game: next,
			view: "hq",
			selectedArtistId: next.playerArtistId
		});
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
		set({
			game: next,
			overlay: done ? { type: "none" } : { type: "ceremony" }
		});
	},
	skipShow: () => {
		const { game } = get();
		if (!game) return;
		const { next, err } = mutate(game, (g) => skipCeremonyShow(g));
		if (err) return toast(set, err, "bad");
		set({
			game: next,
			overlay: { type: "none" }
		});
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
		toast(set, guest ? split ? `${guest.name} is on the record · ${split}% split.` : `${guest.name} is on the record.` : "Feature locked.", "viral");
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
		set({
			game: next,
			overlay: {
				type: "x",
				tab: "messages",
				threadId: artistId
			}
		});
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
		set({
			game: next,
			overlay: { type: "scout" }
		});
		toast(set, "Auditions are in.");
	},
	pickFromAudition: (name) => {
		const { game } = get();
		if (!game) return;
		const rng = mulberry32(game.seed + game.idSeq);
		const { next, err } = mutate(game, (g) => pickAudition(g, rng, name));
		if (err) return toast(set, err, "bad");
		set({
			game: next,
			overlay: { type: "none" }
		});
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
		set({
			game: next,
			view: "studio"
		});
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
			overlay: liveShow ? { type: "ceremony" } : { type: "none" }
		});
		const net = next.ledger.net;
		toast(set, `Week closed · ${net >= 0 ? "+" : ""}$${Math.round(net).toLocaleString("en-US")} net`, net >= 0 ? "good" : "bad");
		const top = next.notifs[0];
		if (top && top.tone === "viral") toast(set, top.title, "viral");
	},
	dismissToast: (id) => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
	reset: () => set({
		game: null,
		view: "hq",
		overlay: { type: "none" },
		selectedArtistId: null
	}),
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
	}
}), {
	name: SAVE_KEY,
	partialize: (s) => ({ game: s.game }),
	version: 7,
	migrate: (persisted) => {
		if (!persisted || typeof persisted !== "object") return persisted;
		const game = migrateSave(persisted.game);
		return {
			...persisted,
			game
		};
	},
	onRehydrateStorage: () => () => {
		const g = useGame.getState().game;
		if (g && g.version !== 7) useGame.setState({ game: migrateSave(g) });
		useGame.setState({ hydrated: true });
	}
}));
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function Meter({ value, label, className }) {
	const v = Math.max(0, Math.min(100, value));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("grid gap-1", className),
		children: [label ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex justify-between text-xs text-muted",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "tabular-nums text-fg",
				children: Math.round(v)
			})]
		}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "h-1.5 overflow-hidden rounded-full bg-subtle",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "h-full rounded-full bg-accent transition-[width] duration-[var(--motion-fast)] ease-[var(--ease-smooth-out)]",
				style: { width: `${v}%` }
			})
		})]
	});
}
function Pill({ children, tone = "default", className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium tracking-wide", tone === "default" && "bg-subtle text-muted", tone === "good" && "bg-good/15 text-good", tone === "bad" && "bg-bad/15 text-bad", tone === "viral" && "bg-tok-like/15 text-tok-like", tone === "mint" && "bg-accent/15 text-accent", className),
		children
	});
}
function Panel({ children, className, title, action }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: cn("rounded-xl border border-border bg-surface p-4 md:p-5", className),
		children: [(title || action) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "mb-3 flex items-center justify-between gap-3",
			children: [title ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-lg font-medium tracking-tight text-fg",
				children: title
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {}), action]
		}), children]
	});
}
function PrimaryBtn({ children, onClick, disabled, className, type = "button" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type,
		disabled,
		onClick,
		className: cn("inline-flex min-h-11 items-center justify-center rounded-md bg-accent px-4 text-sm font-medium text-accent-fg", "transition-transform duration-[var(--motion-quick)] ease-[var(--ease-out)]", "hover:brightness-110 active:scale-[0.98] disabled:opacity-40", className),
		children
	});
}
function GhostBtn({ children, onClick, disabled, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		disabled,
		onClick,
		className: cn("inline-flex min-h-11 items-center justify-center rounded-md border border-border bg-transparent px-4 text-sm font-medium text-fg", "transition-colors duration-[var(--motion-quick)] hover:bg-subtle disabled:opacity-40", className),
		children
	});
}
function DeskTabs({ items }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "sticky top-0 z-10 border-b border-border bg-bg/90 px-3 py-2 backdrop-blur md:px-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto flex max-w-6xl gap-1 overflow-x-auto",
			children: items.map((it) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: it.onClick,
				className: cn("min-h-10 shrink-0 rounded-full px-3 text-sm", it.active ? "bg-accent text-accent-fg" : "text-muted hover:bg-subtle hover:text-fg"),
				children: it.label
			}, it.id))
		})
	});
}
function TitleScreen({ onPlay }) {
	const game = useGame((s) => s.game);
	const newGame = useGame((s) => s.newGame);
	const reset = useGame((s) => s.reset);
	const loadSlot = useGame((s) => s.loadSlot);
	const listSlots = useGame((s) => s.listSlots);
	const [mode, setMode] = (0, import_react.useState)("idle");
	const [labelName, setLabelName] = (0, import_react.useState)("Harbor Records");
	const [artistName, setArtistName] = (0, import_react.useState)("Nova Vex");
	const [genre, setGenre] = (0, import_react.useState)("altpop");
	const [city, setCity] = (0, import_react.useState)("Atlanta");
	const [age, setAge] = (0, import_react.useState)(21);
	const [gender, setGender] = (0, import_react.useState)("female");
	const [orientation, setOrientation] = (0, import_react.useState)("straight");
	const [database, setDatabase] = (0, import_react.useState)("real");
	const slots = mode === "load" ? listSlots() : [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative min-h-dvh overflow-hidden bg-bg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pointer-events-none absolute inset-0 opacity-80",
				style: { background: "radial-gradient(ellipse at 20% 10%, color-mix(in oklab, var(--color-accent) 14%, transparent), transparent 50%), radial-gradient(ellipse at 80% 90%, color-mix(in oklab, var(--color-fg) 6%, transparent), transparent 45%)" }
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Vinyl, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mx-auto flex min-h-dvh max-w-5xl flex-col justify-between px-5 py-8 md:px-10 md:py-12",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs font-medium tracking-[0.22em] text-muted uppercase",
						children: [
							GAME_SUBTITLE,
							" · Created by ",
							CREATOR
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "max-w-xl",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
								className: "font-display text-5xl leading-[0.95] tracking-[-0.03em] text-fg md:text-7xl",
								children: [
									"Music",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
									"Star"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 font-display text-xl text-accent md:text-2xl",
								children: TAGLINE
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 max-w-md text-base leading-relaxed text-muted",
								children: "Run a label or be the act. Break songs on TikTok, grow X and Instagram, chart on Billboard 100, stream on Spotify. Songs die without promo. Monthly listeners are the last four weeks — nothing more. Years and weeks both tick."
							}),
							mode === "idle" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-8 flex flex-wrap gap-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrimaryBtn, {
										onClick: () => setMode("pick"),
										children: "New game"
									}),
									game ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GhostBtn, {
										onClick: onPlay,
										children: [
											"Continue",
											" ",
											game.career === "artist" ? game.artists.find((a) => a.id === game.playerArtistId)?.name : game.labelName
										]
									}) : null,
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GhostBtn, {
										onClick: () => setMode("load"),
										children: "Load"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GhostBtn, {
										onClick: () => setMode("credits"),
										children: "Credits"
									})
								]
							}) : mode === "credits" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-8 max-w-md rounded-xl border border-border bg-surface p-5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs tracking-[0.18em] text-muted uppercase",
										children: "Credits"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 font-display text-2xl",
										children: GAME_TITLE
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-muted",
										children: GAME_SUBTITLE
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-4 text-sm",
										children: [
											"Created by ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-fg",
												children: CREATOR
											}),
											" only."
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 text-sm text-muted",
										children: "Billboard Hot 100 · Billboard 200 · Box office · Radio · Top Spotify 50 · TikTok · X · Instagram · Spotify · YouTube"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GhostBtn, {
										className: "mt-4",
										onClick: () => setMode("idle"),
										children: "Back"
									})
								]
							}) : mode === "load" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-8 grid max-w-md gap-2",
								children: [slots.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									disabled: s.week === 0,
									onClick: () => {
										if (loadSlot(s.slot)) onPlay();
									},
									className: "flex min-h-12 items-center justify-between rounded-lg border border-border bg-surface px-4 text-left disabled:opacity-40",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: s.slot === 0 ? "Autosave" : `Slot ${s.slot}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-sm text-muted",
										children: s.week ? `${s.label} · w${s.week}` : "Empty"
									})]
								}, s.slot)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GhostBtn, {
									onClick: () => setMode("idle"),
									children: "Back"
								})]
							}) : mode === "pick" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-8 grid max-w-lg gap-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: () => setMode("artist"),
										className: "rounded-xl border border-border bg-surface p-5 text-left transition-colors hover:bg-elevated",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs tracking-[0.18em] text-muted uppercase",
												children: "Play as"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-1 font-display text-2xl",
												children: "The artist"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-2 text-sm text-muted",
												children: "Write, post, tour, buy a house. Stay independent or take a deal."
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: () => setMode("label"),
										className: "rounded-xl border border-border bg-surface p-5 text-left transition-colors hover:bg-elevated",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs tracking-[0.18em] text-muted uppercase",
												children: "Play as"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-1 font-display text-2xl",
												children: "Label CEO"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-2 text-sm text-muted",
												children: "Scout a roster, work radio, take the cut when it charts."
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GhostBtn, {
										onClick: () => setMode("idle"),
										children: "Back"
									})
								]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
								className: "mt-8 grid max-w-md gap-3",
								onSubmit: (e) => {
									e.preventDefault();
									if (game) reset();
									if (mode === "label") newGame({
										career: "label",
										labelName,
										city,
										database
									});
									else newGame({
										career: "artist",
										name: artistName,
										genre,
										city,
										age,
										database,
										gender,
										orientation
									});
									onPlay();
								},
								children: [
									mode === "label" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "grid gap-1 text-xs text-muted",
										children: ["Label name", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											value: labelName,
											onChange: (e) => setLabelName(e.target.value),
											className: "h-11 rounded-md border border-border bg-surface px-3 text-sm text-fg outline-none focus:border-accent",
											maxLength: 28
										})]
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
											className: "grid gap-1 text-xs text-muted",
											children: ["Artist name", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												value: artistName,
												onChange: (e) => setArtistName(e.target.value),
												className: "h-11 rounded-md border border-border bg-surface px-3 text-sm text-fg outline-none focus:border-accent",
												maxLength: 28
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "grid grid-cols-2 gap-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
												className: "grid gap-1 text-xs text-muted",
												children: ["Genre", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
													value: genre,
													onChange: (e) => setGenre(e.target.value),
													className: "h-11 rounded-md border border-border bg-surface px-3 text-sm text-fg outline-none focus:border-accent",
													children: GENRES.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: g.id,
														children: g.label
													}, g.id))
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
												className: "grid gap-1 text-xs text-muted",
												children: ["Age", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													type: "number",
													min: 16,
													max: 35,
													value: age,
													onChange: (e) => setAge(Number(e.target.value)),
													className: "h-11 rounded-md border border-border bg-surface px-3 text-sm text-fg outline-none focus:border-accent"
												})]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "grid grid-cols-2 gap-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
												className: "grid gap-1 text-xs text-muted",
												children: ["Gender", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
													value: gender,
													onChange: (e) => setGender(e.target.value),
													className: "h-11 rounded-md border border-border bg-surface px-3 text-sm text-fg outline-none focus:border-accent",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: "female",
														children: "Female"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: "male",
														children: "Male"
													})]
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
												className: "grid gap-1 text-xs text-muted",
												children: ["Orientation", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
													value: orientation,
													onChange: (e) => setOrientation(e.target.value),
													className: "h-11 rounded-md border border-border bg-surface px-3 text-sm text-fg outline-none focus:border-accent",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
															value: "straight",
															children: "Straight"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
															value: "gay",
															children: "Gay"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
															value: "bisexual",
															children: "Bisexual"
														})
													]
												})]
											})]
										})
									] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "grid gap-1 text-xs text-muted",
										children: ["City", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
											value: city,
											onChange: (e) => setCity(e.target.value),
											className: "h-11 rounded-md border border-border bg-surface px-3 text-sm text-fg outline-none focus:border-accent",
											children: CITIES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: c }, c))
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "grid gap-1 text-xs text-muted",
										children: ["Database", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
											value: database,
											onChange: (e) => setDatabase(e.target.value),
											className: "h-11 rounded-md border border-border bg-surface px-3 text-sm text-fg outline-none focus:border-accent",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "normal",
												children: "Normal.db — fictional stars"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "real",
												children: "RealArtists.db — official chart rivals"
											})]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrimaryBtn, {
											type: "submit",
											children: mode === "label" ? "Open the doors" : "Start unsigned"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GhostBtn, {
											onClick: () => setMode("pick"),
											children: "Back"
										})]
									})
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "grid max-w-2xl gap-2 text-sm text-muted md:grid-cols-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "TikTok · X · Instagram · Spotify · YouTube" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Billboard Hot 100 / Billboard 200 / box office & OST" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: ["Created by ", CREATOR] })
						]
					})
				]
			})
		]
	});
}
function Vinyl() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "pointer-events-none absolute -right-24 top-1/2 hidden h-[520px] w-[520px] -translate-y-1/2 md:block",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "clip-disc absolute inset-0 rounded-full border border-border-strong bg-elevated" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "clip-disc absolute inset-10 rounded-full border border-border bg-subtle" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "clip-disc absolute inset-[38%] rounded-full bg-accent/80" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-[46%] rounded-full bg-bg" })
		]
	});
}
var SKIN = [
	"#f3d7c4",
	"#e8c3a4",
	"#d4a574",
	"#b07a4a",
	"#8a5a32",
	"#5c3a22"
];
var HAIR_C = [
	"#1c1c1e",
	"#3a2418",
	"#6b3b16",
	"#d8c6a2",
	"#2a2f38",
	"#8fd4c1"
];
var ACCENT = [
	"#8fd4c1",
	"#f3efe6",
	"#c9b8a6",
	"#7aa0b8",
	"#d4a59a",
	"#b8c4b0"
];
function ArtistAvatar({ spec, size = 40, className }) {
	if (spec.photo?.src) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		src: spec.photo.src,
		alt: "",
		width: size,
		height: size,
		className: cn("shrink-0 rounded-full object-cover", className),
		style: {
			width: size,
			height: size
		}
	});
	const skin = SKIN[spec.skin % SKIN.length];
	const hair = HAIR_C[spec.hairColor % HAIR_C.length];
	const acc = ACCENT[spec.accent % ACCENT.length];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 64 64",
		width: size,
		height: size,
		className: cn("shrink-0 rounded-full", className),
		"aria-hidden": true,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				width: "64",
				height: "64",
				rx: "32",
				fill: "#1a1a1c"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
				cx: "32",
				cy: "40",
				rx: 18 + spec.shape % 4,
				ry: "20",
				fill: skin
			}),
			spec.hair % 7 === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M14 30c2-16 34-18 36 0v6H14z",
				fill: hair
			}),
			spec.hair % 7 === 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M16 34c0-16 32-18 32 2 0 0-8-10-16-10s-16 10-16 10z",
				fill: hair
			}),
			spec.hair % 7 === 2 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "18",
				y: "16",
				width: "28",
				height: "18",
				rx: "8",
				fill: hair
			}),
			spec.hair % 7 === 3 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M12 36c4-20 36-22 40 0-8-8-32-8-40 0z",
				fill: hair
			}),
			spec.hair % 7 === 4 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "20",
					cy: "22",
					r: "7",
					fill: hair
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "44",
					cy: "22",
					r: "7",
					fill: hair
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M16 30c4-12 28-12 32 0v4H16z",
					fill: hair
				})
			] }),
			spec.hair % 7 === 5 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M18 22h28v14H18z",
				fill: hair
			}),
			spec.hair % 7 === 6 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "32",
				cy: "24",
				r: "12",
				fill: hair
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "24",
				cy: "38",
				r: "1.6",
				fill: "#1a1a1c"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "40",
				cy: "38",
				r: "1.6",
				fill: "#1a1a1c"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M28 46c2 2 6 2 8 0",
				fill: "none",
				stroke: "#1a1a1c",
				strokeWidth: "1.2",
				strokeLinecap: "round"
			}),
			spec.accessory % 5 === 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "16",
				y: "36",
				width: "32",
				height: "3",
				rx: "1",
				fill: acc,
				opacity: "0.85"
			}),
			spec.accessory % 5 === 2 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "32",
				cy: "20",
				r: "3",
				fill: acc
			}),
			spec.accessory % 5 === 3 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M22 50c6 6 14 6 20 0",
				fill: "none",
				stroke: acc,
				strokeWidth: "2"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "32",
				cy: "32",
				r: "31",
				fill: "none",
				stroke: acc,
				strokeWidth: "1.2",
				opacity: "0.35"
			})
		]
	});
}
function VerifiedBadge({ on, size = 14, className, title = "Verified" }) {
	if (!on) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		width: size,
		height: size,
		viewBox: "0 0 16 16",
		className: cn("inline-block shrink-0 text-pulse-check", className),
		"aria-label": title,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			fill: "currentColor",
			d: "M8 1.2 9.7 2l1.9.3.9 1.7 1.7.9.3 1.9L16 8l-.5 1.7-.3 1.9-1.7.9-.9 1.7-1.9.3L8 14.8 6.3 14l-1.9-.3-.9-1.7-1.7-.9-.3-1.9L0 8l.5-1.7.3-1.9 1.7-.9.9-1.7 1.9-.3L8 1.2z"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			fill: "var(--color-bg)",
			d: "M7.1 10.4 4.8 8.1l.9-.9 1.4 1.4 3.2-3.2.9.9-4.1 4.1z"
		})]
	});
}
var TIER = {
	newcomer: "newcomer",
	rising: "rising",
	established: "established",
	star: "star",
	alist: "A-list",
	mega: "megastar"
};
function FeaturePicker({ song, tone = "light", autoFocus = false }) {
	const game = useGame((s) => s.game);
	const askFeature = useGame((s) => s.askFeature);
	const setOverlay = useGame((s) => s.setOverlay);
	const [q, setQ] = (0, import_react.useState)("");
	const guest = song.collabArtistId ? game.artists.find((a) => a.id === song.collabArtistId) : null;
	const host = game.artists.find((a) => a.id === song.artistId) ?? null;
	const dark = tone === "dark";
	const list = (0, import_react.useMemo)(() => {
		const n = q.trim().toLowerCase();
		return game.artists.filter((a) => a.id !== song.artistId).filter((a) => !n || a.name.toLowerCase().includes(n) || a.handle.toLowerCase().includes(n)).slice().sort((a, b) => b.popularity - a.popularity);
	}, [
		game.artists,
		q,
		song.artistId
	]);
	if (guest) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("flex items-center gap-3 rounded-lg px-2 py-2", dark ? "bg-white/5" : "bg-subtle"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArtistAvatar, {
			spec: guest.avatar,
			size: 40
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0 flex-1",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "truncate text-sm font-medium",
				children: ["feat. ", guest.name]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: cn("text-xs", dark ? "text-white/45" : "text-muted"),
				children: [
					"Locked",
					song.featureFee ? ` · paid ${money(song.featureFee)}` : "",
					song.featureSplit ? ` · ${Math.round(song.featureSplit * 100)}% split` : ""
				]
			})]
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				value: q,
				onChange: (e) => setQ(e.target.value),
				placeholder: "Search any artist — Taylor, Drake, a prospect…",
				className: cn("h-11 rounded-md border px-3 text-sm outline-none", dark ? "border-white/10 bg-white/5 text-white placeholder:text-white/35" : "border-border bg-surface focus:border-accent"),
				autoFocus,
				"aria-label": "Search artists to feature"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: cn("text-xs", dark ? "text-white/40" : "text-muted"),
				children: "A-list and megastar verses run $500k–$2M+ and will reject unproven acts. Chart first. Cash is not a shortcut."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "grid max-h-56 gap-1 overflow-auto",
				children: list.slice(0, q.trim() ? 80 : 40).map((g) => {
					const quote = featureQuote(game, g, host);
					const canPay = game.cash >= quote.fee;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						disabled: !quote.ok,
						className: cn("flex min-h-12 w-full items-center gap-3 rounded-md px-2 text-left text-sm disabled:opacity-45", dark ? "hover:bg-white/10" : "hover:bg-subtle"),
						onClick: () => quote.ok && askFeature(song.id, g.id),
						title: quote.ok ? void 0 : quote.reason,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArtistAvatar, {
								spec: g.avatar,
								size: 36
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "min-w-0 flex-1 truncate",
								children: [
									g.name,
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: cn("text-xs", dark ? "text-white/40" : "text-muted"),
										children: [
											" ",
											"· ",
											TIER[quote.tier] ?? quote.tier,
											" · pop ",
											Math.round(g.popularity)
										]
									}),
									!quote.ok ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: cn("block truncate text-[11px]", dark ? "text-white/35" : "text-muted"),
										children: quote.reason
									}) : null
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: cn("shrink-0 text-right text-xs tabular-nums", dark ? "text-white/55" : "text-muted"),
								children: quote.ok ? canPay ? money(quote.fee) : `${Math.round(quote.split * 100)}% split` : `won't · ${money(quote.fee)}`
							})
						]
					}) }, g.id);
				})
			}),
			list.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: cn("text-sm", dark ? "text-white/45" : "text-muted"),
				children: "No artists match that search."
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GhostBtn, {
				className: dark ? "border-white/15 text-white" : void 0,
				onClick: () => setOverlay({
					type: "x",
					tab: "messages"
				}),
				children: "Or DM them on X"
			})
		]
	});
}
function FeatureDesk({ tone = "light" }) {
	const game = useGame((s) => s.game);
	const roster = rosterOf(game);
	const mine = game.songs.filter((s) => roster.some((r) => r.id === s.artistId));
	const songs = mine.filter((s) => !s.collabArtistId);
	const [songId, setSongId] = (0, import_react.useState)(songs[0]?.id ?? "");
	const song = songs.find((s) => s.id === songId) ?? songs[0];
	const dark = tone === "dark";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid gap-3",
		children: mine.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: cn("text-sm", dark ? "text-white/50" : "text-muted"),
			children: "Book a single below. This search stays at the top of Studio — tap anyone in the world and the verse locks."
		}) : songs.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: cn("text-sm", dark ? "text-white/50" : "text-muted"),
			children: "Every record already has a featured artist. Book another single to add someone new."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [songs.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
			className: cn("block text-xs", dark ? "text-white/45" : "text-muted"),
			children: ["Single", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
				className: cn("mt-1 h-11 w-full rounded-md border px-2 text-sm", dark ? "border-white/10 bg-white/5 text-white" : "border-border bg-surface"),
				value: song.id,
				onChange: (e) => setSongId(e.target.value),
				children: songs.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
					value: s.id,
					className: "text-black",
					children: [
						s.title,
						" · ",
						s.status
					]
				}, s.id))
			})]
		}), song ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeaturePicker, {
			song,
			tone
		}) : null] })
	});
}
function FeatureOfferRow({ id, hopOn, hostName, guestName, title, fee }) {
	const replyFeature = useGame((s) => s.replyFeature);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
		className: "flex flex-wrap items-center justify-between gap-2 rounded-lg bg-subtle px-3 py-2 text-sm",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [hopOn ? `${guestName} wants on “${title}”` : `${hostName} wants you on “${title}”`, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "text-muted",
			children: [" · ", money(fee)]
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "flex gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GhostBtn, {
				onClick: () => replyFeature(id, false),
				children: "Pass"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrimaryBtn, {
				onClick: () => replyFeature(id, true),
				children: hopOn ? "Put them on it" : "Take the verse"
			})]
		})]
	});
}
function Dashboard() {
	const game = useGame((s) => s.game);
	const setView = useGame((s) => s.setView);
	const setOverlay = useGame((s) => s.setOverlay);
	const roster = rosterOf(game);
	const songs = playerSongs(game);
	const charting = game.songs.filter((s) => s.chart != null).sort((a, b) => (a.chart ?? 99) - (b.chart ?? 99));
	const tokViews = game.clips.filter((c) => c.owned).reduce((a, c) => a + c.viewsWeek, 0);
	const tutorial = game.tutorial;
	const you = playerArtist(game);
	const openDeals = game.deals.filter((d) => d.status === "open").length;
	const monthly = you ? you.monthlyListeners : roster.reduce((n, a) => n + a.monthlyListeners, 0);
	const four = you ? fourWeekStreams(you) : monthly;
	const incoming = (game.features ?? []).filter((f) => f.status === "open" && (f.incoming || f.hopOn));
	const mailN = unreadMail(game);
	const jailed = (you?.incarceratedWeeks ?? 0) > 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto grid max-w-6xl gap-4 p-4 md:p-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs tracking-[0.2em] text-accent uppercase",
					children: TAGLINE
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-3xl tracking-tight",
					children: game.career === "artist" ? you?.name : game.labelName
				}),
				you ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-muted",
					children: [
						"Age ",
						you.age,
						" · ",
						you.hometown,
						" · popularity ",
						Math.round(you.popularity),
						" · Spotify monthly ",
						compact(monthly),
						" ",
						"(last 4 weeks: ",
						compact(four),
						")"
					]
				}) : null
			] }),
			tutorial < 5 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
				className: "border-accent/30",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs tracking-[0.18em] text-accent uppercase",
						children: "This week"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 font-display text-2xl",
						children: game.career === "artist" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							tutorial === 1 && "Book the studio. A song needs a hook before TikTok can work.",
							tutorial === 2 && "Keep writing. Master is coming.",
							tutorial === 3 && "Master is ready. Release it onto Spotify.",
							tutorial === 4 && "Open TikTok. Post the sound. Watch every app move."
						] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							tutorial === 1 && "Scout and sign someone who can live on camera.",
							tutorial === 2 && "Book the studio. A song needs a hook before TikTok can work.",
							tutorial === 3 && "Master is ready. Release it onto Spotify.",
							tutorial === 4 && "Open TikTok. Post the sound. Watch the algorithm decide."
						] })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 flex flex-wrap gap-2",
						children: [
							game.career === "label" && tutorial === 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrimaryBtn, {
								onClick: () => setOverlay({ type: "scout" }),
								children: "Open A&R"
							}),
							(game.career === "artist" && tutorial === 1 || tutorial === 2 || tutorial === 3) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrimaryBtn, {
								onClick: () => setView("studio"),
								children: "Go to studio"
							}),
							tutorial === 4 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrimaryBtn, {
								onClick: () => setOverlay({
									type: "tiktok",
									tab: "create"
								}),
								children: "Open TikTok"
							})
						]
					})
				]
			}),
			jailed && you && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
				className: "border-bad/40",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs tracking-[0.18em] text-bad uppercase",
						children: "Incarcerated"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 font-display text-2xl",
						children: [you.incarceratedWeeks, " weeks inside"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted",
						children: "Write from the booth. Tours, film, and nightlife are closed."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GhostBtn, {
						className: "mt-3",
						onClick: () => setView("legal"),
						children: "Open legal"
					})
				]
			}),
			mailN > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
				className: "border-accent/30",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs tracking-[0.18em] text-accent uppercase",
						children: "Inbox"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 font-display text-2xl",
						children: [mailN, " unread"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrimaryBtn, {
						className: "mt-3",
						onClick: () => setView("mail"),
						children: "Open mail"
					})
				]
			}),
			openDeals > 0 && game.career === "artist" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
				className: "border-good/30",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs tracking-[0.18em] text-good uppercase",
						children: "A&R"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 font-display text-2xl",
						children: [
							openDeals,
							" label offer",
							openDeals > 1 ? "s" : "",
							" on the table"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrimaryBtn, {
						className: "mt-3",
						onClick: () => setView("career"),
						children: "Read the deal"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat$2, {
						label: "Checking",
						value: money(game.cash)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat$2, {
						label: "Week net",
						value: signedMoney(game.ledger.net)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat$2, {
						label: "TikTok views / wk",
						value: compact(tokViews)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat$2, {
						label: "Spotify monthly",
						value: compact(monthly)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat$2, {
						label: "Popularity",
						value: String(Math.round(you?.popularity ?? roster[0]?.popularity ?? 0))
					})
				]
			}),
			incoming.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				className: "border-good/30",
				title: "Feature offers",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "grid gap-2",
					children: incoming.map((f) => {
						const host = game.artists.find((a) => a.id === f.hostArtistId);
						const guest = game.artists.find((a) => a.id === f.featureArtistId);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeatureOfferRow, {
							id: f.id,
							hopOn: f.hopOn,
							hostName: host?.name ?? "Artist",
							guestName: guest?.name ?? "Artist",
							title: f.title,
							fee: f.fee
						}, f.id);
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 lg:grid-cols-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
					title: game.career === "artist" ? "You" : "Roster",
					className: "lg:col-span-2",
					action: game.career === "label" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GhostBtn, {
						onClick: () => setOverlay({ type: "scout" }),
						children: "Scout"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GhostBtn, {
							onClick: () => setView("career"),
							children: "Career"
						}), you ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GhostBtn, {
							onClick: () => setOverlay({
								type: "wiki",
								artistId: you.id
							}),
							children: "Wiki"
						}) : null]
					}),
					children: roster.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: "Empty building. A&R is waiting."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "grid gap-2",
						children: roster.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setOverlay({
								type: "artist",
								id: a.id
							}),
							className: "flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left hover:bg-subtle",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArtistAvatar, {
									spec: a.avatar,
									size: 40
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0 flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "flex items-center gap-1 truncate font-medium",
										children: [a.name, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VerifiedBadge, { on: a.verified.x || a.verified.tiktok })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xs text-muted",
										children: [
											genreLabel(a.genre),
											" · pop ",
											Math.round(a.popularity),
											" · TikTok ",
											compact(a.followers.tiktok),
											" · X",
											" ",
											compact(a.followers.x),
											" · IG ",
											compact(a.followers.instagram)
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Pill, { children: [Math.round(a.energy), " energy"] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "size-4 text-faint" })
							]
						}) }, a.id))
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
					title: "Socials",
					action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "text-sm text-accent",
						onClick: () => setView("social"),
						children: "Open"
					}),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppRow, {
								name: "TikTok",
								hint: "For You is the new radio",
								onClick: () => setOverlay({
									type: "tiktok",
									tab: "home"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppRow, {
								name: "X",
								hint: "DMs for collabs",
								onClick: () => setOverlay({
									type: "x",
									tab: "messages"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppRow, {
								name: "Instagram",
								hint: "Grid, stills, slow fame",
								onClick: () => setOverlay({
									type: "instagram",
									tab: "feed"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppRow, {
								name: "Spotify",
								hint: `${compact(monthly)} monthly · last 4 weeks`,
								onClick: () => setOverlay({
									type: "spotify",
									tab: "home",
									artistId: you?.id
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppRow, {
								name: "YouTube",
								hint: "Channel, videos, releases",
								onClick: () => setOverlay({
									type: "youtube",
									tab: "channel"
								})
							})
						]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: "Your records",
				action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "text-sm text-accent",
					onClick: () => setView("studio"),
					children: "Studio"
				}),
				children: songs.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "Book a single in Studio, then search any artist as a feature on the card."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "grid gap-2",
					children: songs.slice(-4).reverse().map((s) => {
						const feat = featName(game, s);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex flex-wrap items-center justify-between gap-2 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "min-w-0 truncate",
								children: [
									s.title,
									feat ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-muted",
										children: [" feat. ", feat]
									}) : null,
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-muted",
										children: [" · ", s.status]
									})
								]
							}), !feat ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrimaryBtn, {
								onClick: () => setView("studio"),
								children: "Add a feature"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Pill, {
								tone: "mint",
								children: ["feat. ", feat]
							})]
						}, s.id);
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: "Billboard 100",
				action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "text-sm text-accent",
					onClick: () => setView("charts"),
					children: "Full board"
				}),
				children: charting.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "Board is empty. That shouldn't happen."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "grid gap-2",
					children: charting.slice(0, 8).map((s) => {
						const ours = game.artists.find((x) => x.id === s.artistId) ? songs.some((x) => x.id === s.id) : false;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center gap-3 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "w-8 tabular-nums text-muted",
									children: ["#", s.chart]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex-1 truncate",
									children: [
										s.title,
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-muted",
											children: [" · ", creditLine(game, s)]
										}),
										ours ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
											tone: "mint",
											className: "ml-2",
											children: "yours"
										}) : null,
										s.radioChart ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-muted",
											children: [" · radio #", s.radioChart]
										}) : null
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "tabular-nums text-muted",
									children: [compact(s.streamsWeek), " /wk"]
								})
							]
						}, s.id);
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
				title: "History",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "grid gap-3",
					children: [(game.statements ?? []).slice(0, 4).map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex justify-between gap-3 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "truncate",
							children: [s.title, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-muted",
								children: [" · ", s.channel]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "tabular-nums text-muted",
							children: signedMoney(s.amount)
						})]
					}, s.id)), game.notifs.slice(0, 4).map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex gap-3",
						children: [n.tone === "viral" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "mt-0.5 size-4 text-tok-like" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radio, { className: "mt-0.5 size-4 text-muted" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-medium",
							children: n.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: n.body
						})] })]
					}, n.id))]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GhostBtn, {
					className: "mt-3",
					onClick: () => setView("books"),
					children: "Open Finances"
				})]
			})
		]
	});
}
function Stat$2({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-w-0 rounded-xl border border-border bg-surface px-4 py-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs text-muted",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 truncate font-display text-2xl leading-none tabular-nums tracking-tight",
			children: value
		})]
	});
}
function AppRow({ name, hint, onClick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		onClick,
		className: "flex min-h-14 items-center justify-between rounded-lg bg-subtle px-3 text-left",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "block text-sm font-medium",
			children: name
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-xs text-muted",
			children: hint
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "size-4 text-faint" })]
	});
}
function Roster() {
	const game = useGame((s) => s.game);
	const setOverlay = useGame((s) => s.setOverlay);
	const startRecord = useGame((s) => s.startRecord);
	const roster = rosterOf(game);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto grid max-w-6xl gap-4 p-4 md:p-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-end justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl tracking-tight",
				children: "Roster"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "Micro-manage the people. The page manages the rest."
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrimaryBtn, {
				onClick: () => setOverlay({ type: "scout" }),
				children: "A&R / Scout"
			})]
		}), roster.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted",
			children: "No one is signed. Scout the building."
		}) }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-3 md:grid-cols-2",
			children: roster.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArtistAvatar, {
						spec: a.avatar,
						size: 56
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
								className: "flex items-center gap-1 truncate font-display text-xl",
								children: [a.name, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VerifiedBadge, { on: a.verified.x || a.verified.tiktok })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, { children: genreLabel(a.genre) })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted",
							children: [
								"@",
								a.handle,
								" · ",
								a.hometown
							]
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm text-muted",
					children: a.bio
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 grid grid-cols-2 gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meter, {
							label: "Vocals",
							value: a.stats.vocals
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meter, {
							label: "Writing",
							value: a.stats.writing
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meter, {
							label: "Charisma",
							value: a.stats.charisma
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meter, {
							label: "Social",
							value: a.stats.social
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meter, {
							label: "Energy",
							value: a.energy
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meter, {
							label: "Mood",
							value: a.mood
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex flex-wrap gap-3 text-xs text-muted",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["TikTok ", compact(a.followers.tiktok)] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["X ", compact(a.followers.x)] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Instagram ", compact(a.followers.instagram)] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							"Spotify ",
							compact(a.monthlyListeners),
							" mo"
						] })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex flex-wrap gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrimaryBtn, {
							onClick: () => startRecord(a.id),
							children: "Book studio"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GhostBtn, {
							onClick: () => setOverlay({
								type: "tiktok",
								tab: "create",
								artistId: a.id
							}),
							children: "Post TikTok"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GhostBtn, {
							onClick: () => setOverlay({
								type: "artist",
								id: a.id
							}),
							children: "File"
						})
					]
				})
			] }, a.id))
		})]
	});
}
function Studio$1() {
	const game = useGame((s) => s.game);
	const startRecord = useGame((s) => s.startRecord);
	const release = useGame((s) => s.release);
	const radio = useGame((s) => s.radio);
	const playlist = useGame((s) => s.playlist);
	const openCheckout = useGame((s) => s.openCheckout);
	const setOverlay = useGame((s) => s.setOverlay);
	const setView = useGame((s) => s.setView);
	const marketBuy = useGame((s) => s.marketBuy);
	const greatest = useGame((s) => s.greatest);
	const roster = rosterOf(game);
	const songs = playerSongs(game);
	const upCost = game.studioTier === 1 ? 45e3 : game.studioTier === 2 ? 95e3 : null;
	const radioCost = game.career === "artist" ? 9500 : 18e3;
	const pitchCost = game.career === "artist" ? 4800 : 9500;
	const incoming = (game.features ?? []).filter((f) => f.status === "open" && (f.incoming || f.hopOn));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto grid max-w-6xl gap-4 p-4 md:p-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-end justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-3xl tracking-tight",
					children: "Studio"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "Book a single, then search any artist in the world as a feature — Taylor, Drake, a prospect. Cash if you have it, otherwise they take a split. Same flow lives in X Direct Messages."
				})] }), upCost ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GhostBtn, {
					onClick: () => openCheckout({
						kind: "studio",
						id: "studio",
						title: `Studio upgrade · tier ${game.studioTier + 1}`,
						price: upCost
					}),
					children: ["Upgrade · ", money(upCost)]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
					tone: "mint",
					children: "Maxed room"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: "Add a featured artist",
				className: "border-accent/40 bg-accent/5",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeatureDesk, {})
			}),
			incoming.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
				title: "They want in",
				className: "border-good/30",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-3 text-sm text-muted",
					children: "Same offers land in X Direct Messages."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "grid gap-3",
					children: incoming.map((f) => {
						const host = game.artists.find((a) => a.id === f.hostArtistId);
						const guest = game.artists.find((a) => a.id === f.featureArtistId);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeatureOfferRow, {
							id: f.id,
							hopOn: f.hopOn,
							hostName: host?.name ?? "Artist",
							guestName: guest?.name ?? "Artist",
							title: f.title,
							fee: f.fee
						}, f.id);
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: "Book a session",
				children: roster.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "Sign someone first."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-2",
					children: roster.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex flex-wrap gap-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PrimaryBtn, {
								onClick: () => startRecord(a.id, "single"),
								children: [a.name, " · single"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GhostBtn, {
								onClick: () => startRecord(a.id, "ep"),
								children: "EP"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GhostBtn, {
								onClick: () => startRecord(a.id, "album"),
								children: "Album"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GhostBtn, {
								onClick: () => greatest(a.id),
								children: "Greatest Hits"
							})
						]
					}, a.id))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: "Song market",
				children: game.songMarket.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "Writers refresh every four weeks."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "grid gap-2",
					children: game.songMarket.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex flex-wrap items-center justify-between gap-2 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [m.title, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-muted",
							children: [
								" ",
								"· ",
								genreLabel(m.genre),
								" · Q",
								m.quality,
								" · ",
								m.writer
							]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GhostBtn, {
							onClick: () => roster[0] && marketBuy(m.id, roster[0].id),
							children: ["Buy · ", money(m.price)]
						})]
					}, m.id))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3",
				children: [songs.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "No records in progress. Book a single, then the feature search above lights up."
				}) }), songs.slice().reverse().map((s) => {
					const a = game.artists.find((x) => x.id === s.artistId);
					const feat = featName(game, s);
					const combined = s.salesDigital + s.salesPhysical;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-start justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "font-display text-xl",
										children: s.title
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, { children: s.status }),
									s.chart ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Pill, {
										tone: "mint",
										children: ["#", s.chart]
									}) : null,
									s.radioChart ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Pill, { children: ["radio #", s.radioChart] }) : null,
									s.status === "released" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, { children: formatLabel(s.releaseFormat) }) : null,
									feat ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Pill, {
										tone: "mint",
										children: ["feat. ", feat]
									}) : null
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm text-muted",
								children: [
									a?.name,
									" · ",
									genreLabel(s.genre),
									feat ? ` · feat. ${feat}` : ""
								]
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-right",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "tabular-nums text-sm text-muted",
										children: [compact(s.streams), " streams"]
									}),
									s.status === "released" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xs text-muted",
										children: [
											compact(s.streamsWeek + s.streamsPending),
											" this week · ",
											money(s.weekPayout),
											" paid"
										]
									}),
									s.status === "released" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xs text-muted",
										children: [
											"Digital ",
											compact(s.salesDigital),
											" · CD ",
											compact(s.salesPhysical),
											" · combined ",
											compact(combined)
										]
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 rounded-lg border border-accent/40 bg-accent/5 p-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mb-2 text-xs tracking-[0.16em] text-accent uppercase",
								children: "Featured artist"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeaturePicker, { song: s })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 grid grid-cols-2 gap-3 md:grid-cols-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meter, {
									label: "Writing",
									value: s.writing
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meter, {
									label: "Hook",
									value: s.hook
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meter, {
									label: "Production",
									value: s.production
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meter, {
									label: "Mix",
									value: s.mix
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 flex flex-wrap gap-2",
							children: [s.status === "mastered" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrimaryBtn, {
									onClick: () => release(s.id, "both"),
									children: "Combined digital + CD"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GhostBtn, {
									onClick: () => release(s.id, "digital"),
									children: "Digital only"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GhostBtn, {
									onClick: () => release(s.id, "cd"),
									children: "CD only"
								})
							] }), s.status === "released" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrimaryBtn, {
									onClick: () => setOverlay({
										type: "tiktok",
										tab: "create",
										artistId: s.artistId
									}),
									children: "Promote on TikTok"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GhostBtn, {
									onClick: () => radio(s.id),
									children: ["Radio · ", money(radioCost)]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GhostBtn, {
									onClick: () => playlist(s.id),
									children: ["Playlist pitch · ", money(pitchCost)]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GhostBtn, {
									onClick: () => setOverlay({
										type: "youtube",
										tab: "studio"
									}),
									children: "Shoot video"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GhostBtn, {
									onClick: () => setView("promo"),
									children: "Promote"
								})
							] })]
						})
					] }, s.id);
				})]
			})
		]
	});
}
function formatLabel(f) {
	return f === "both" ? "digital + CD" : f === "cd" ? "CD" : "digital";
}
function Charts() {
	const game = useGame((s) => s.game);
	const [board, setBoard] = (0, import_react.useState)("hot");
	const [region, setRegion] = (0, import_react.useState)("global");
	const hot = game.songs.filter((s) => s.chart != null).sort((a, b) => (a.chart ?? 99) - (b.chart ?? 99));
	const albums = game.songs.filter((s) => s.albumChart != null).sort((a, b) => (a.albumChart ?? 99) - (b.albumChart ?? 99));
	const radio = game.songs.filter((s) => s.radioChart != null).sort((a, b) => (a.radioChart ?? 99) - (b.radioChart ?? 99));
	const spotify = game.songs.filter((s) => s.status === "released").slice().sort((a, b) => b.streamsWeek - a.streamsWeek).slice(0, CHART_SIZE.spotify).map((s, i) => ({
		...s,
		waveRank: i + 1
	}));
	const ost = game.songs.filter((s) => s.ost && s.status === "released").slice().sort((a, b) => b.streamsWeek - a.streamsWeek).slice(0, 20).map((s, i) => ({
		...s,
		waveRank: i + 1
	}));
	const box = [...game.films ?? []].filter((f) => f.status === "released").sort((a, b) => (a.boxRank ?? 99) - (b.boxRank ?? 99));
	let rows = board === "hot" ? hot : board === "albums" ? albums : board === "radio" ? radio : board === "ost" ? ost : spotify;
	if (region !== "global" && board !== "box") rows = rows.slice().sort((a, b) => b.regional[region].streams - a.regional[region].streams).map((s, i) => ({
		...s,
		waveRank: s.waveRank ?? i + 1
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto grid max-w-4xl gap-4 p-4 md:p-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl tracking-tight",
				children: "Charts"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "Billboard Hot 100 mixes streams, digital, physical, and radio. Billboard 200 uses album sales + TEA + SEA. Radio is spins. Top Spotify 50 is this week's streams. Box office and OST sit beside them. Sort any music board by region."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-2",
				children: [
					{
						id: "hot",
						label: "Billboard Hot 100"
					},
					{
						id: "albums",
						label: "Billboard 200"
					},
					{
						id: "radio",
						label: "Radio"
					},
					{
						id: "spotify",
						label: "Top Spotify 50"
					},
					{
						id: "box",
						label: "Box office"
					},
					{
						id: "ost",
						label: "Soundtracks"
					}
				].map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setBoard(b.id),
					className: cn("min-h-10 rounded-full px-4 text-sm", board === b.id ? "bg-accent text-accent-fg" : "bg-subtle text-muted"),
					children: b.label
				}, b.id))
			}),
			board !== "box" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setRegion("global"),
					className: cn("min-h-10 rounded-full px-3 text-xs", region === "global" ? "bg-subtle text-fg" : "text-muted"),
					children: "Global"
				}), REGIONS.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setRegion(r.id),
					className: cn("min-h-10 rounded-full px-3 text-xs", region === r.id ? "bg-subtle text-fg" : "text-muted"),
					children: r.label
				}, r.id))]
			}),
			board === "box" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, { children: box.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "No pictures in theaters this week."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "grid max-h-[70vh] gap-1 overflow-auto",
				children: box.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "grid grid-cols-[2.5rem_1fr_auto] items-center gap-3 rounded-md px-2 py-2 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "tabular-nums text-muted",
							children: ["#", f.boxRank]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [f.title, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-muted",
							children: [
								" ",
								"· ",
								f.studio,
								f.role !== "none" ? ` · ${f.role}` : ""
							]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "tabular-nums text-xs text-muted",
							children: [
								money(f.grossWeek),
								" wk · ",
								money(f.gross)
							]
						})
					]
				}, f.id))
			}) }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, { children: rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "The board is all rivals this week."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "grid max-h-[70vh] gap-1 overflow-auto",
				children: rows.map((s, i) => {
					const a = game.artists.find((x) => x.id === s.artistId);
					const ours = a ? isControlled(game, a) : false;
					const guest = s.collabArtistId ? game.artists.find((x) => x.id === s.collabArtistId) : null;
					const label = a?.labelId === "player" ? game.labelName : game.rivals.find((r) => r.id === a?.labelId)?.name ?? (a?.signed ? "Indie" : "Independent");
					const rank = region !== "global" ? i + 1 : board === "hot" ? s.chart : board === "albums" ? s.albumChart : board === "radio" ? s.radioChart : s.waveRank;
					const peak = board === "radio" ? s.peakRadio : board === "albums" ? s.peakAlbum : s.peakChart;
					const metric = board === "spotify" || board === "ost" ? compact(s.streamsWeek) : board === "albums" ? `${compact(s.albumUnits || s.salesPhysical + s.salesDigital)} u` : board === "hot" ? compact(s.chartPoints || weekStreams(s)) : region !== "global" ? compact(s.regional[region].streams) : compact(weekStreams(s));
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "grid grid-cols-[2.5rem_1fr_auto] items-center gap-3 rounded-md px-2 py-2 text-sm md:grid-cols-[2.5rem_1fr_8rem_auto]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "tabular-nums text-muted",
								children: ["#", rank]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "block truncate font-medium",
									children: [
										s.title,
										guest ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-muted",
											children: [" feat. ", guest.name]
										}) : null,
										s.ost ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
											className: "ml-2",
											children: "OST"
										}) : null
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-xs text-muted",
									children: [
										creditLine(game, s),
										" · ",
										label,
										peak ? ` · peak ${peak}` : ""
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "hidden text-xs text-muted md:block",
								children: ours ? "You" : ""
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "tabular-nums text-xs text-muted",
								children: metric
							})
						]
					}, s.id);
				})
			}) })
		]
	});
}
function SocialHub() {
	const game = useGame((s) => s.game);
	const setOverlay = useGame((s) => s.setOverlay);
	const setView = useGame((s) => s.setView);
	const live = useGame((s) => s.live);
	const roster = rosterOf(game);
	const ownedViews = game.clips.filter((c) => c.owned).reduce((a, c) => a + c.views, 0);
	const sounds = game.sounds.filter((s) => s.trending).sort((a, b) => (a.trendRank ?? 9) - (b.trendRank ?? 9));
	const xFollowers = roster.reduce((n, a) => n + a.followers.x, 0);
	const igFollowers = roster.reduce((n, a) => n + a.followers.instagram, 0);
	const yt = roster.reduce((n, a) => n + a.followers.youtube, 0);
	const monthly = roster.reduce((n, a) => n + a.monthlyListeners, 0);
	const you = roster[0];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto grid max-w-6xl gap-4 p-4 md:p-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl tracking-tight",
				children: "Socials & Media"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "TikTok, X, Instagram, Spotify, YouTube, live, press. Hits move together. Apply for verified after 100k per app and 50k Spotify monthly — it is not automatic."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppTile, {
						name: "TikTok",
						kicker: "For You",
						stat: `${compact(ownedViews)} views`,
						copy: "Short video. Test a clip. Bury it or set the city on fire.",
						onClick: () => setOverlay({
							type: "tiktok",
							tab: "home"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppTile, {
						name: "X",
						kicker: "Home · Alerts · DMs",
						stat: `${compact(xFollowers)} followers`,
						copy: "DM any artist for a feature. Attach a single in the thread to lock the verse.",
						onClick: () => setOverlay({
							type: "x",
							tab: "messages"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppTile, {
						name: "Instagram",
						kicker: "Grid",
						stat: `${compact(igFollowers)} followers`,
						copy: "Looks and lifestyle. Slow fame.",
						onClick: () => setOverlay({
							type: "instagram",
							tab: "feed"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppTile, {
						name: "Spotify",
						kicker: "Artist channel",
						stat: `${compact(monthly)} monthly`,
						copy: "Monthly listeners equal the last four weeks of streams. No promo, they fall.",
						onClick: () => setOverlay({
							type: "spotify",
							tab: "home",
							artistId: roster[0]?.id
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppTile, {
						name: "YouTube",
						kicker: "Channel · Videos · Releases",
						stat: `${compact(yt)} subs`,
						copy: "Real channel page — Home, Videos, Shorts, Live, Releases, Playlists, About.",
						onClick: () => setOverlay({
							type: "youtube",
							tab: "channel"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppTile, {
						name: "Press / PR",
						kicker: "Campaigns",
						stat: `${game.campaigns.length} live`,
						copy: "TV, press, Reddit, radio. Heat is the only thing that keeps a single alive.",
						onClick: () => setView("promo")
					})
				]
			}),
			you && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
				title: "Profiles",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-3 text-sm text-muted",
					children: "Each app has its own username, photo, and bio. Hit 100k (50k Spotify monthly) then apply — the mark is not automatic."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrimaryBtn, {
							onClick: () => setOverlay({
								type: "tiktok",
								tab: "settings"
							}),
							children: "TikTok settings"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrimaryBtn, {
							onClick: () => setOverlay({
								type: "x",
								tab: "settings"
							}),
							children: "X settings"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrimaryBtn, {
							onClick: () => setOverlay({
								type: "instagram",
								tab: "settings"
							}),
							children: "Instagram settings"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrimaryBtn, {
							onClick: () => setOverlay({
								type: "spotify",
								tab: "settings"
							}),
							children: "Spotify settings"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrimaryBtn, {
							onClick: () => setOverlay({
								type: "youtube",
								tab: "settings"
							}),
							children: "YouTube settings"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrimaryBtn, {
							onClick: () => setOverlay({
								type: "wiki",
								artistId: you.id
							}),
							children: "Wiki"
						})
					]
				})]
			}),
			you && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
				title: "Go live",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-3 text-sm text-muted",
					children: "Viewers scale with followers. Gifts hit the account."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-2",
					children: [
						"tiktok",
						"x",
						"instagram",
						"youtube"
					].map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PrimaryBtn, {
						onClick: () => live(you.id, p),
						children: [
							p === "tiktok" ? "TikTok" : p === "x" ? "X" : p === "instagram" ? "Instagram" : "YouTube",
							" live",
							game.liveViewers[p] ? ` · ${compact(game.liveViewers[p])}` : ""
						]
					}, p))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: "Trending on TikTok",
				children: sounds.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "Trends refresh each week."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "grid gap-2",
					children: sounds.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-center justify-between gap-3 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Pill, {
									tone: "mint",
									children: ["#", s.trendRank]
								}),
								s.name,
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-muted",
									children: ["· ", s.artistName]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "tabular-nums text-muted",
							children: [compact(s.uses), " uses"]
						})]
					}, s.id))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: "Artist socials",
				children: roster.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "Sign someone to give them a phone."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "grid gap-2",
					children: roster.slice().sort((a, b) => b.followers.tiktok - a.followers.tiktok).map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex flex-wrap items-center gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArtistAvatar, {
								spec: a.avatar,
								size: 36
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex min-w-0 flex-1 items-center gap-1 truncate text-sm",
								children: [a.name, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VerifiedBadge, { on: a.verified.x || a.verified.tiktok || a.verified.instagram })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-xs text-muted",
								children: ["TT ", compact(a.followers.tiktok)]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-xs text-muted",
								children: ["X ", compact(a.followers.x)]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-xs text-muted",
								children: ["IG ", compact(a.followers.instagram)]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-xs text-muted",
								children: ["YT ", compact(a.followers.youtube)]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-xs text-muted",
								children: ["Spotify ", compact(a.monthlyListeners)]
							})
						]
					}, a.id))
				})
			})
		]
	});
}
function AppTile({ name, kicker, stat, copy, onClick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		onClick,
		className: "rounded-xl border border-border bg-surface p-5 text-left transition-colors hover:bg-elevated",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs tracking-[0.18em] text-muted uppercase",
				children: kicker
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-1 flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl",
					children: name
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "size-4 text-faint" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 font-display text-xl tabular-nums",
				children: stat
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted",
				children: copy
			})
		]
	});
}
function Books() {
	const game = useGame((s) => s.game);
	const roster = rosterOf(game);
	const payroll = weeklyBurn(game);
	const songs = playerSongs(game).filter((s) => s.status === "released");
	const L = game.ledger;
	const assets = game.houses.reduce((n, h) => n + h.value, 0) + game.cars.reduce((n, c) => n + (c.lease ? 0 : c.value), 0) + (game.lands ?? []).reduce((n, l) => n + l.value, 0) + (game.islands ?? []).reduce((n, i) => n + i.value, 0) + (game.jets ?? []).reduce((n, j) => n + j.value, 0);
	const debt = game.loans.reduce((n, l) => n + l.remaining, 0) + game.cards.reduce((n, c) => n + c.used, 0);
	const statements = game.statements ?? [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto grid max-w-3xl gap-4 p-4 md:p-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl tracking-tight",
				children: "Finances"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "Checking, overhead, royalties. Physical cash does not exist here."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 sm:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted",
						children: "Checking"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-3xl tabular-nums",
						children: money(game.cash)
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted",
						children: "Net worth"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-3xl tabular-nums",
						children: money(netWorth(game))
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted",
						children: "Last week net"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-3xl tabular-nums",
						children: signedMoney(L.net)
					})] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: "Balance sheet",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "grid gap-2 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row$1, {
							k: "Checking",
							v: money(game.cash)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row$1, {
							k: "Savings",
							v: money(game.savings ?? 0)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row$1, {
							k: "Property",
							v: money(assets)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row$1, {
							k: "Liabilities",
							v: money(-debt),
							dim: true
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row$1, {
							k: "Equity",
							v: money(netWorth(game))
						}),
						game.career === "label" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row$1, {
								k: "CEO salary / wk",
								v: money(game.ceoSalary)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row$1, {
								k: "CEO score",
								v: String(ceoScore(game))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row$1, {
								k: "Ownership",
								v: `${game.labelOwnedPct}%`
							})
						] })
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: "Income · last week",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "grid gap-2 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row$1, {
							k: "Streaming",
							v: money(L.streams)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row$1, {
							k: "Chart bonuses",
							v: money(L.chartBonus)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row$1, {
							k: "Radio",
							v: money(L.radio)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row$1, {
							k: "Shows",
							v: money(L.shows)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row$1, {
							k: "Merch",
							v: money(L.merch)
						}),
						L.other ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row$1, {
							k: "Other",
							v: money(L.other)
						}) : null
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: "Expenditure · last week",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "grid gap-2 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row$1, {
							k: game.career === "artist" ? "Living + overhead" : "Payroll",
							v: money(-(L.payroll + L.living)),
							dim: true
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row$1, {
							k: "Housing",
							v: money(-L.housing),
							dim: true
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row$1, {
							k: "Cars",
							v: money(-L.cars),
							dim: true
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row$1, {
							k: "Security",
							v: money(-L.security),
							dim: true
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row$1, {
							k: "Interest / loans",
							v: money(-L.interest),
							dim: true
						}),
						L.nightlife ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row$1, {
							k: "Nightlife",
							v: money(-L.nightlife),
							dim: true
						}) : null,
						L.legal ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row$1, {
							k: "Legal",
							v: money(-L.legal),
							dim: true
						}) : null,
						L.luxury ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row$1, {
							k: "Luxury",
							v: money(-L.luxury),
							dim: true
						}) : null
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: "History",
				children: statements.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "No statements yet. Buy something or close a week."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "grid gap-2 text-sm",
					children: statements.slice(0, 24).map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "truncate",
							children: [s.title, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-muted",
								children: [
									" · w",
									s.week,
									" · ",
									s.channel
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: `tabular-nums ${s.amount < 0 ? "text-muted" : ""}`,
							children: signedMoney(s.amount)
						})]
					}, s.id))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: "Burn",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "grid gap-2 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted",
							children: "Projected weekly burn"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "tabular-nums",
							children: money(payroll)
						})]
					}), game.career === "label" && roster.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-muted",
							children: [
								a.name,
								" · ",
								Math.round(a.royalty * 100),
								"% share"
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "tabular-nums",
							children: money(a.wage)
						})]
					}, a.id))]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: "Catalog",
				children: songs.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "No released masters."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "grid gap-2 text-sm",
					children: songs.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "truncate",
							children: [
								s.title,
								s.chart ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-muted",
									children: [" · #", s.chart]
								}) : null,
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-muted",
									children: [
										" ",
										"· ",
										s.releaseFormat === "both" ? "digital+CD" : s.releaseFormat === "cd" ? "CD" : "digital"
									]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "tabular-nums text-muted",
							children: [
								compact(s.streams),
								" · D ",
								compact(s.salesDigital),
								" · CD ",
								compact(s.salesPhysical)
							]
						})]
					}, s.id))
				})
			})
		]
	});
}
function Row$1({ k, v, dim }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
		className: "flex justify-between",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-muted",
			children: k
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: `tabular-nums ${dim ? "text-muted" : ""}`,
			children: v
		})]
	});
}
function Career() {
	const game = useGame((s) => s.game);
	const takeDeal = useGame((s) => s.takeDeal);
	const passDeal = useGame((s) => s.passDeal);
	const toggleAi = useGame((s) => s.toggleAi);
	const holiday = useGame((s) => s.holiday);
	const setOverlay = useGame((s) => s.setOverlay);
	const a = playerArtist(game);
	const open = game.deals.filter((d) => d.status === "open");
	const history = game.deals.filter((d) => d.status !== "open");
	if (!a) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "p-6 text-sm text-muted",
		children: "Start an artist career from the title screen."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto grid max-w-3xl gap-4 p-4 md:p-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl tracking-tight",
				children: "Career"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-muted",
				children: [
					"Independent keeps 85% after distribution. A label pays an advance and takes a bigger master share — but they work radio. Age ",
					a.age,
					"."
				]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArtistAvatar, {
						spec: a.avatar,
						size: 64
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
								className: "flex items-center gap-1.5 font-display text-2xl",
								children: [a.name, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VerifiedBadge, { on: a.verified.x || a.verified.spotify })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm text-muted",
								children: [
									"@",
									a.handle,
									" · ",
									a.age,
									" · ",
									a.nationality,
									" · ",
									a.hometown
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-2 flex flex-wrap gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
										tone: game.dealKind === "independent" ? "mint" : "good",
										children: game.dealKind === "independent" ? "Independent" : `Signed · ${game.labelName}`
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Pill, { children: [Math.round(a.royalty * 100), "% your share"] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Pill, { children: ["pop ", Math.round(a.popularity)] }),
									a.onHoliday ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, { children: "holiday" }) : null
								]
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
					className: "mt-4 grid grid-cols-2 gap-3 text-sm sm:grid-cols-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat$1, {
							k: "TikTok",
							v: compact(a.followers.tiktok)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat$1, {
							k: "X",
							v: compact(a.followers.x)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat$1, {
							k: "Instagram",
							v: compact(a.followers.instagram)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat$1, {
							k: "YouTube",
							v: compact(a.followers.youtube)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat$1, {
							k: "Spotify 4-wk",
							v: compact(a.monthlyListeners)
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-xs text-muted",
					children: "Verification is not automatic. Hit 100k on an app (50k Spotify monthly) then apply in that app’s settings."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex flex-wrap gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GhostBtn, {
							onClick: () => setOverlay({
								type: "wiki",
								artistId: a.id
							}),
							children: "Open wiki"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GhostBtn, {
							onClick: () => toggleAi(a.id),
							children: a.aiControl ? "AI control on" : "Let AI run releases"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GhostBtn, {
							onClick: () => holiday(a.id, 1),
							children: "Book holiday"
						})
					]
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: "Label offers",
				children: game.dealKind === "signed" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-muted",
					children: [
						"You took the ",
						game.labelName,
						" deal. Advance ",
						money(a.advance),
						". ",
						a.albumsRemaining,
						" albums remaining."
					]
				}) : open.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "No offers this week. Chart, grow X, or land a TikTok run — A&R watches the apps."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "grid gap-3",
					children: open.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "rounded-lg border border-border bg-elevated p-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-start justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-xl",
								children: d.labelName
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm text-muted",
								children: [
									"Advance ",
									money(d.advance),
									" · you keep ",
									Math.round(d.royalty * 100),
									"% · ",
									d.albums,
									" albums · ",
									d.weeksLeft,
									" ",
									"weeks to answer"
								]
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GhostBtn, {
									onClick: () => passDeal(d.id),
									children: "Pass"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrimaryBtn, {
									onClick: () => takeDeal(d.id),
									children: "Sign"
								})]
							})]
						})
					}, d.id))
				})
			}),
			history.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: "Paper trail",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "grid gap-2 text-sm",
					children: history.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex justify-between text-muted",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							d.labelName,
							" · ",
							d.status
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: money(d.advance) })]
					}, d.id))
				})
			})
		]
	});
}
function Stat$1({ k, v }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
		className: "text-xs text-muted",
		children: k
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
		className: "font-display text-xl tabular-nums",
		children: v
	})] });
}
var WASH$1 = {
	pop: "from-[#2a2430] via-[#1a1a22] to-black",
	hiphop: "from-[#1c1814] via-[#12110f] to-black",
	rnb: "from-[#241820] via-[#140f12] to-black",
	rock: "from-[#1a1c20] via-[#101114] to-black",
	indie: "from-[#1a221c] via-[#101410] to-black",
	electronic: "from-[#101820] via-[#0c1016] to-black",
	latin: "from-[#241c14] via-[#14100c] to-black",
	altpop: "from-[#1c2224] via-[#101416] to-black",
	country: "from-[#221c14] via-[#14110c] to-black",
	drill: "from-[#141416] via-[#0c0c0e] to-black",
	afrobeats: "from-[#1c1810] via-[#14100c] to-black"
};
function ClipVisual({ clip, genre, playing, title }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("clip-visual absolute inset-0 bg-linear-to-b", WASH$1[genre], !playing && "is-paused"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute -top-10 left-1/2 size-72 -translate-x-1/2 rounded-full opacity-30 blur-3xl",
				style: { background: "var(--color-accent)" }
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute inset-x-0 top-[30%] flex flex-col items-center gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArtistAvatar, {
					spec: clip.avatar,
					size: 96,
					className: "ring-2 ring-white/20"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "max-w-[14rem] text-center font-display text-2xl leading-tight text-white",
					children: title
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "bars",
				children: Array.from({ length: 12 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: {
					height: `${40 + (clip.visual + i * 17) % 60}%`,
					animationDelay: `${i * .07 % .6}s`,
					opacity: .45 + i % 3 * .15
				} }, i))
			})
		]
	});
}
function PhotoCrop({ dark, onSave }) {
	const [src, setSrc] = (0, import_react.useState)(null);
	const [zoom, setZoom] = (0, import_react.useState)(1);
	const [pan, setPan] = (0, import_react.useState)({
		x: 0,
		y: 0
	});
	const drag = (0, import_react.useRef)(null);
	const imgRef = (0, import_react.useRef)(null);
	const onFile = (file) => {
		if (!file) return;
		if (!([
			"image/png",
			"image/jpeg",
			"image/jpg"
		].includes(file.type) || /\.(png|jpe?g)$/i.test(file.name))) return;
		if (file.size > 6e6) return;
		const reader = new FileReader();
		reader.onload = () => setSrc(String(reader.result ?? ""));
		reader.readAsDataURL(file);
	};
	const crop = () => {
		if (!src) return;
		const img = imgRef.current;
		if (!img || !img.naturalWidth) return;
		const size = 256;
		const canvas = document.createElement("canvas");
		canvas.width = size;
		canvas.height = size;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;
		const dw = Math.min(img.naturalWidth, img.naturalHeight) / zoom;
		const cx = img.naturalWidth / 2 + pan.x / 100 * img.naturalWidth;
		const cy = img.naturalHeight / 2 + pan.y / 100 * img.naturalHeight;
		const sx = clamp(cx - dw / 2, 0, img.naturalWidth - dw);
		const sy = clamp(cy - dw / 2, 0, img.naturalHeight - dw);
		ctx.drawImage(img, sx, sy, dw, dw, 0, 0, size, size);
		onSave({
			src: canvas.toDataURL("image/jpeg", .82),
			zoom,
			panX: pan.x,
			panY: pan.y
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
			className: cn("text-xs", dark ? "text-white/50" : "text-muted"),
			children: ["Upload PNG or JPG", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				type: "file",
				accept: "image/png,image/jpeg,.png,.jpg,.jpeg",
				className: "mt-1 block w-full text-sm",
				onChange: (e) => onFile(e.target.files?.[0])
			})]
		}), src ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative mx-auto size-44 overflow-hidden rounded-full border border-border bg-elevated",
				onPointerDown: (e) => {
					drag.current = {
						x: e.clientX,
						y: e.clientY,
						px: pan.x,
						py: pan.y
					};
					e.currentTarget.setPointerCapture(e.pointerId);
				},
				onPointerMove: (e) => {
					if (!drag.current) return;
					const dx = (e.clientX - drag.current.x) / 1.6;
					const dy = (e.clientY - drag.current.y) / 1.6;
					setPan({
						x: clamp(drag.current.px + dx, -40, 40),
						y: clamp(drag.current.py + dy, -40, 40)
					});
				},
				onPointerUp: () => {
					drag.current = null;
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					ref: imgRef,
					src,
					alt: "",
					crossOrigin: "anonymous",
					className: "pointer-events-none absolute inset-0 size-full object-cover",
					style: { transform: `scale(${zoom}) translate(${pan.x}%, ${pan.y}%)` }
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: cn("grid gap-1 text-xs", dark ? "text-white/50" : "text-muted"),
				children: ["Zoom", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "range",
					min: 1,
					max: 3,
					step: .05,
					value: zoom,
					onChange: (e) => setZoom(Number(e.target.value))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrimaryBtn, {
					onClick: crop,
					children: "Crop & save"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GhostBtn, {
					onClick: () => {
						setSrc(null);
						setZoom(1);
						setPan({
							x: 0,
							y: 0
						});
					},
					children: "Clear"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: cn("text-xs", dark ? "text-white/40" : "text-muted"),
				children: "Drag to pan. Crops square and scales across wiki, magazine covers, and every app header."
			})
		] }) : null]
	});
}
function clamp(n, a, b) {
	return Math.max(a, Math.min(b, n));
}
var LABELS = {
	tiktok: "TikTok",
	x: "X",
	instagram: "Instagram",
	youtube: "YouTube",
	spotify: "Spotify"
};
function ProfileEditor({ platform, dark }) {
	const game = useGame((s) => s.game);
	const editProfile = useGame((s) => s.editProfile);
	const applyVerify = useGame((s) => s.applyVerify);
	const setPhoto = useGame((s) => s.setPhoto);
	const a = rosterOf(game)[0];
	if (!a) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: cn("p-4 text-sm", dark ? "text-white/50" : "text-muted"),
		children: "Sign someone first."
	});
	ensureArtistExtras(a);
	const p = a.profiles[platform];
	const [handle, setHandle] = (0, import_react.useState)(p.handle);
	const [bio, setBio] = (0, import_react.useState)(p.bio);
	const [avatar, setAvatar] = (0, import_react.useState)({ ...p.avatar });
	const verified = a.verified[platform];
	const reach = platformReach(a, platform);
	const need = VERIFY_AT[platform];
	const eligible = !verified && reach >= need;
	const field = dark ? "h-11 w-full rounded-md border border-white/10 bg-white/5 px-3 text-sm text-white outline-none" : "h-11 w-full rounded-md border border-border bg-elevated px-3 text-sm outline-none";
	const muted = dark ? "text-white/50" : "text-muted";
	const bump = (key, max) => setAvatar((prev) => ({
		...prev,
		[key]: (prev[key] + 1) % (max + 1)
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("grid gap-3 p-4", dark && "text-white"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArtistAvatar, {
					spec: avatar,
					size: 72
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "flex items-center gap-1 font-medium",
						children: [
							LABELS[platform],
							" settings",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VerifiedBadge, { on: verified })
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: cn("text-xs", muted),
						children: [
							compact(reach),
							" ",
							platform === "spotify" ? "monthly" : "followers",
							" · apply at ",
							compact(need)
						]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhotoCrop, {
				dark,
				onSave: (photo) => {
					setAvatar((prev) => ({
						...prev,
						photo
					}));
					setPhoto(a.id, photo, "all");
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-2",
				children: [
					["skin", 5],
					["hair", 6],
					["hairColor", 5],
					["accent", 5],
					["shape", 3],
					["accessory", 4]
				].map(([k, max]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => bump(k, max),
					className: cn("min-h-10 rounded-md px-3 text-xs", dark ? "bg-white/10 text-white" : "bg-subtle"),
					children: [
						k,
						" ",
						avatar[k]
					]
				}, k))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: cn("grid gap-1 text-xs", muted),
				children: ["Username", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: handle,
					onChange: (e) => setHandle(e.target.value),
					maxLength: 16,
					className: field
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: cn("grid gap-1 text-xs", muted),
				children: ["Bio", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					value: bio,
					onChange: (e) => setBio(e.target.value),
					maxLength: 160,
					className: cn(field, "h-24 py-2")
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrimaryBtn, {
					onClick: () => editProfile(a.id, platform, {
						handle,
						bio,
						avatar
					}),
					children: "Save profile"
				}), eligible && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GhostBtn, {
					onClick: () => applyVerify(a.id, platform),
					children: "Apply for verified"
				})]
			}),
			!eligible && !verified && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: cn("text-xs", muted),
				children: [
					"Hit ",
					compact(need),
					" then apply. It is not automatic."
				]
			})
		]
	});
}
function TikTokApp() {
	const overlay = useGame((s) => s.overlay);
	const tab = overlay.type === "tiktok" ? overlay.tab : "home";
	const setOverlay = useGame((s) => s.setOverlay);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-0 z-40 flex bg-bg/80",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			className: "absolute top-3 left-3 z-50 hidden min-h-11 items-center rounded-md border border-border bg-surface px-3 text-sm md:inline-flex",
			onClick: () => setOverlay({ type: "none" }),
			children: "Back to HQ"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex w-full max-w-6xl items-stretch justify-center gap-6 p-0 md:p-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Phone, { children: [
				tab === "home" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FYP, {}),
				tab === "discover" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Discover, {}),
				tab === "create" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Create, {}),
				tab === "inbox" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Inbox$1, {}),
				tab === "profile" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Profile$1, {}),
				tab === "sound" && overlay.type === "tiktok" && overlay.soundId && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SoundPage, { soundId: overlay.soundId }),
				tab === "analytics" && overlay.type === "tiktok" && overlay.clipId && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Analytics, { clipId: overlay.clipId }),
				tab === "live" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TikTokLive, {}),
				tab === "settings" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute inset-0 overflow-auto pb-20",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfileEditor, {
						platform: "tiktok",
						dark: true
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TikTokNav, { tab })
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "hidden w-80 shrink-0 flex-col justify-center lg:flex",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-3xl tracking-tight",
						children: "TikTok"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm leading-relaxed text-muted",
						children: "Every clip is tested on a small For You slice. If watch-through and likes clear the bar, the page pushes wider. Sounds that get used become infrastructure — other creators finish the campaign for you."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "mt-5 grid gap-2 text-sm text-muted",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Hook in the first second" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Ride a trending sound or challenge" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Don't overpost — the page throttles spam" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Spark ads buy a luck bump, not a guarantee" })
						]
					})
				]
			})]
		})]
	});
}
function Phone({ children }) {
	const setOverlay = useGame((s) => s.setOverlay);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative mx-auto flex h-dvh w-full max-w-[420px] flex-col overflow-hidden bg-tok-bg text-tok-fg md:h-[min(844px,calc(100dvh-48px))] md:rounded-[2rem] md:border md:border-white/10 phone-bezel",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between px-4 pt-3 pb-1 md:hidden",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "min-h-10 text-sm text-tok-muted",
					onClick: () => setOverlay({ type: "none" }),
					children: "Close"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs tracking-[0.2em] uppercase",
					children: "TikTok"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-10" })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "relative min-h-0 flex-1",
			children
		})]
	});
}
function TikTokNav({ tab }) {
	const setOverlay = useGame((s) => s.setOverlay);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
		className: "absolute inset-x-0 bottom-0 z-30 flex border-t border-white/10 bg-black pb-[env(safe-area-inset-bottom)]",
		children: [
			{
				id: "home",
				label: "Home",
				icon: House
			},
			{
				id: "discover",
				label: "Discover",
				icon: Search
			},
			{
				id: "create",
				label: "Create",
				icon: Plus
			},
			{
				id: "inbox",
				label: "Inbox",
				icon: MessageCircle
			},
			{
				id: "profile",
				label: "Profile",
				icon: User
			}
		].map((it) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			onClick: () => setOverlay({
				type: "tiktok",
				tab: it.id
			}),
			className: cn("flex min-h-14 flex-1 flex-col items-center justify-center gap-0.5 text-[10px]", tab === it.id ? "text-white" : "text-tok-muted"),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(it.icon, { className: cn("size-5", it.id === "create" && "rounded-md bg-white text-black p-0.5") }), it.label]
		}, it.id))
	});
}
function FYP() {
	const game = useGame((s) => s.game);
	const clips = (0, import_react.useMemo)(() => fypClips(game), [game]);
	const feedIndex = useGame((s) => s.feedIndex);
	const setFeedIndex = useGame((s) => s.setFeedIndex);
	const scroller = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const el = scroller.current;
		if (!el) return;
		const onScroll = () => {
			const i = Math.round(el.scrollTop / el.clientHeight);
			setFeedIndex(i);
		};
		el.addEventListener("scroll", onScroll, { passive: true });
		return () => el.removeEventListener("scroll", onScroll);
	}, [setFeedIndex]);
	if (clips.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "p-6 text-sm text-tok-muted",
		children: "The page is empty. Post something."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref: scroller,
		className: "fyp-scroller absolute inset-x-0 top-0 bottom-14 z-0",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "pointer-events-none absolute inset-x-0 top-0 z-20 flex justify-center gap-4 bg-linear-to-b from-black/80 to-transparent pt-3 pb-10 text-sm font-medium",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-white/50",
				children: "Following"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "border-b-2 border-white pb-0.5",
				children: "For You"
			})]
		}), clips.slice(0, 18).map((clip, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slide, {
			clip,
			active: i === feedIndex
		}, clip.id))]
	});
}
function Slide({ clip, active }) {
	const game = useGame((s) => s.game);
	const setOverlay = useGame((s) => s.setOverlay);
	const [liked, setLiked] = (0, import_react.useState)(false);
	const song = game.songs.find((s) => s.id === clip.songId);
	const sound = game.sounds.find((s) => s.id === clip.soundId);
	const artist = game.artists.find((a) => a.id === clip.artistId);
	const genre = song?.genre ?? artist?.genre ?? "pop";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "fyp-slide relative",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClipVisual, {
			clip,
			genre,
			playing: active,
			title: sound?.name ?? "Original sound"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "absolute inset-x-0 bottom-16 z-10 flex items-end justify-between px-3 pb-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0 flex-1 pr-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-medium",
						children: ["@", clip.creatorHandle]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-white/90",
						children: clip.caption
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs text-white/60",
						children: clip.hashtags.map((h) => `#${h}`).join(" ")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "mt-2 flex items-center gap-2 text-xs",
						onClick: () => setOverlay({
							type: "tiktok",
							tab: "sound",
							soundId: clip.soundId
						}),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Music2, { className: "size-3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "truncate",
							children: [
								sound?.name ?? "original",
								" · ",
								clip.creatorName
							]
						})]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col items-center gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArtistAvatar, {
						spec: clip.avatar,
						size: 44,
						className: "ring-2 ring-white"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Action, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: cn("size-7", liked && "fill-tok-like text-tok-like heart-pop") }),
						n: clip.likes + (liked ? 1 : 0),
						onClick: () => setLiked(true)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Action, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "size-7" }),
						n: clip.comments
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Action, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bookmark, { className: "size-7" }),
						n: clip.saves
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Action, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "size-7" }),
						n: clip.shares
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "size-10 overflow-hidden rounded-full border-2 border-white",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: cn("clip-disc size-10 bg-linear-to-br from-tok-cyan to-tok-like", !active && "is-paused") })
					}),
					clip.owned && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "text-[10px] text-tok-cyan",
						onClick: () => setOverlay({
							type: "tiktok",
							tab: "analytics",
							clipId: clip.id
						}),
						children: "Stats"
					})
				]
			})]
		})]
	});
}
function Action({ icon, n, onClick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		onClick,
		className: "flex flex-col items-center text-white",
		children: [icon, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-[11px] tabular-nums",
			children: compact(n)
		})]
	});
}
function Discover() {
	const game = useGame((s) => s.game);
	const setOverlay = useGame((s) => s.setOverlay);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "absolute inset-0 overflow-auto bg-tok-bg px-4 pt-4 pb-20",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-lg font-semibold",
				children: "Discover"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-tok-muted",
				children: "Sounds, challenges, hashtags — this week's heat."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-4 grid gap-2",
				children: game.trends.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					className: "flex w-full items-center justify-between rounded-lg bg-white/5 px-3 py-3 text-left",
					onClick: () => {
						if (t.soundId) setOverlay({
							type: "tiktok",
							tab: "sound",
							soundId: t.soundId
						});
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block text-xs text-tok-muted uppercase",
						children: t.kind
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-medium",
						children: t.name
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "tabular-nums text-sm text-tok-muted",
						children: t.heat
					})]
				}) }, t.id))
			})
		]
	});
}
function Create() {
	const game = useGame((s) => s.game);
	const overlay = useGame((s) => s.overlay);
	const tiktokPost = useGame((s) => s.tiktokPost);
	const roster = rosterOf(game);
	const preset = overlay.type === "tiktok" ? overlay.artistId : void 0;
	const [artistId, setArtistId] = (0, import_react.useState)(preset ?? roster[0]?.id ?? "");
	const songs = playerSongs(game).filter((s) => s.artistId === artistId);
	const [songId, setSongId] = (0, import_react.useState)(songs[0]?.id ?? "");
	const [format, setFormat] = (0, import_react.useState)("lipsync");
	const [tags, setTags] = (0, import_react.useState)(["fyp", "newsound"]);
	const [spark, setSpark] = (0, import_react.useState)(0);
	const [filming, setFilming] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const next = playerSongs(game).filter((s) => s.artistId === artistId);
		setSongId(next[0]?.id ?? "");
	}, [artistId, game]);
	const trendingSounds = game.sounds.filter((s) => s.trending);
	const [soundId, setSoundId] = (0, import_react.useState)("");
	if (roster.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "absolute inset-0 grid place-items-center p-6 text-center text-sm text-tok-muted",
		children: game.career === "artist" ? "Create a clip once you have a face on camera." : "Sign an artist before you can post."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "absolute inset-0 overflow-auto bg-tok-bg px-4 pt-4 pb-24",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-lg font-semibold",
				children: "New clip"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-tok-muted",
				children: "Pick a face, a sound, a format. The page does the rest."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "mt-4 block text-xs text-tok-muted",
				children: ["Artist", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
					className: "mt-1 h-11 w-full rounded-md border border-white/10 bg-white/5 px-2 text-sm text-white",
					value: artistId,
					onChange: (e) => setArtistId(e.target.value),
					children: roster.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
						value: a.id,
						className: "text-black",
						children: [
							a.name,
							" · ",
							genreLabel(a.genre)
						]
					}, a.id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "mt-3 block text-xs text-tok-muted",
				children: ["Sound", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
					className: "mt-1 h-11 w-full rounded-md border border-white/10 bg-white/5 px-2 text-sm text-white",
					value: soundId || songId,
					onChange: (e) => {
						const v = e.target.value;
						if (songs.some((s) => s.id === v)) {
							setSongId(v);
							setSoundId("");
						} else setSoundId(v);
					},
					children: [songs.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
						value: s.id,
						className: "text-black",
						children: [
							s.title,
							" ",
							s.status === "released" ? "" : `(${s.status})`
						]
					}, s.id)), trendingSounds.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
						value: s.id,
						className: "text-black",
						children: ["Trending · ", s.name]
					}, s.id))]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-xs text-tok-muted",
				children: "Format"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-1 flex flex-wrap gap-2",
				children: FORMATS.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setFormat(f.id),
					className: cn("rounded-full px-3 py-1.5 text-xs", format === f.id ? "bg-white text-black" : "bg-white/10 text-white"),
					children: f.label
				}, f.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-xs text-tok-muted",
				children: FORMATS.find((f) => f.id === format)?.hint
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-xs text-tok-muted",
				children: "Hashtags"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-1 flex flex-wrap gap-2",
				children: HASHTAGS.slice(0, 10).map((h) => {
					const on = tags.includes(h);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setTags((t) => on ? t.filter((x) => x !== h) : [...t, h].slice(0, 5)),
						className: cn("rounded-full px-3 py-1.5 text-xs", on ? "bg-white text-black" : "bg-white/10"),
						children: ["#", h]
					}, h);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "mt-4 block text-xs text-tok-muted",
				children: [
					"Spark ads · ",
					spark === 0 ? "off" : money(spark),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "range",
						min: 0,
						max: 2e4,
						step: 500,
						value: spark,
						onChange: (e) => setSpark(Number(e.target.value)),
						className: "mt-2 w-full"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrimaryBtn, {
				className: "mt-5 w-full",
				disabled: filming,
				onClick: () => {
					setFilming(true);
					window.setTimeout(() => {
						tiktokPost({
							artistId,
							songId: soundId ? null : songId || null,
							soundId: soundId || null,
							format,
							hashtags: tags,
							spark
						});
						setFilming(false);
					}, 900);
				},
				children: filming ? "Recording…" : "Post to For You"
			})
		]
	});
}
function Inbox$1() {
	const game = useGame((s) => s.game);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "absolute inset-0 overflow-auto bg-tok-bg px-4 pt-4 pb-20",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "text-lg font-semibold",
			children: "Inbox"
		}), game.inbox.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-4 text-sm text-tok-muted",
			children: "Quiet. Post a clip."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-4 grid gap-3",
			children: game.inbox.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "rounded-lg bg-white/5 px-3 py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs text-tok-muted",
					children: [
						m.from,
						" · week ",
						m.week
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm",
					children: m.text
				})]
			}, m.id))
		})]
	});
}
function Profile$1() {
	const game = useGame((s) => s.game);
	const roster = rosterOf(game);
	const clips = game.clips.filter((c) => c.owned);
	const setOverlay = useGame((s) => s.setOverlay);
	const face = roster[0];
	const profile = face ? profileOf(face, "tiktok") : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "absolute inset-0 overflow-auto bg-tok-bg px-4 pt-4 pb-20",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3",
				children: [profile ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArtistAvatar, {
					spec: profile.avatar,
					size: 64
				}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "flex items-center gap-1.5 text-lg font-semibold",
					children: [face?.name ?? game.labelName, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VerifiedBadge, { on: face?.verified.tiktok })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-tok-muted",
					children: face && profile ? `@${profile.handle} · ${compact(face.followers.tiktok)} followers${face.verified.tiktok ? " · verified" : " · apply at 100k"}` : `Label account · ${roster.length} artists`
				})] })]
			}),
			profile ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-white/70",
				children: profile.bio
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 flex flex-wrap gap-2",
				children: [face && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrimaryBtn, {
					onClick: () => useGame.getState().live(face.id, "tiktok"),
					children: "Go live"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "min-h-11 rounded-md border border-white/15 px-3 text-sm",
					onClick: () => setOverlay({
						type: "tiktok",
						tab: "settings"
					}),
					children: "Settings"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 grid grid-cols-3 gap-1",
				children: clips.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					className: "aspect-[3/4] bg-white/5 p-2 text-left",
					onClick: () => setOverlay({
						type: "tiktok",
						tab: "analytics",
						clipId: c.id
					}),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "truncate text-[10px] text-tok-muted",
						children: ["@", c.creatorHandle]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs tabular-nums",
						children: compact(c.views)
					})]
				}, c.id))
			})
		]
	});
}
function SoundPage({ soundId }) {
	const game = useGame((s) => s.game);
	const setOverlay = useGame((s) => s.setOverlay);
	const sound = game.sounds.find((s) => s.id === soundId);
	const clips = game.clips.filter((c) => c.soundId === soundId);
	if (!sound) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "absolute inset-0 overflow-auto bg-tok-bg px-4 pt-4 pb-20",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				className: "text-sm text-tok-muted",
				onClick: () => setOverlay({
					type: "tiktok",
					tab: "home"
				}),
				children: "Back"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "size-16 rounded-md bg-linear-to-br from-tok-cyan to-tok-like" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-semibold",
						children: sound.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-tok-muted",
						children: [
							sound.artistName,
							" · ",
							compact(sound.uses),
							" uses"
						]
					}),
					sound.trending && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Pill, {
						tone: "viral",
						children: ["Trending #", sound.trendRank]
					})
				] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrimaryBtn, {
				className: "mt-4 w-full",
				onClick: () => setOverlay({
					type: "tiktok",
					tab: "create"
				}),
				children: "Use this sound"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-4 grid gap-2",
				children: clips.slice(0, 12).map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex justify-between text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["@", c.creatorHandle] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "tabular-nums text-tok-muted",
						children: compact(c.views)
					})]
				}, c.id))
			})
		]
	});
}
function Analytics({ clipId }) {
	const game = useGame((s) => s.game);
	const setOverlay = useGame((s) => s.setOverlay);
	const clip = game.clips.find((c) => c.id === clipId);
	if (!clip) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "absolute inset-0 overflow-auto bg-tok-bg px-4 pt-4 pb-20",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				className: "text-sm text-tok-muted",
				onClick: () => setOverlay({
					type: "tiktok",
					tab: "home"
				}),
				children: "Back"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-3 text-lg font-semibold",
				children: "Analytics"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-tok-muted",
				children: ["@", clip.creatorHandle]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 grid grid-cols-2 gap-3 text-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						n: compact(clip.views),
						l: "Views"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						n: compact(clip.likes),
						l: "Likes"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						n: `${Math.round(clip.completion * 100)}%`,
						l: "Completion"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						n: `${Math.round(clip.likeRate * 1e3) / 10}%`,
						l: "Like rate"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						n: compact(clip.saves),
						l: "Saves"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						n: compact(clip.soundUses),
						l: "Sound uses"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-5 text-xs text-tok-muted",
				children: "Reached"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-medium",
				children: [
					"Test",
					"More FYP",
					"Out of circle",
					"Main feed",
					"Wide",
					"Runaway"
				][clip.viralStage] ?? "Test"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-3 text-sm text-tok-muted",
				children: [
					"The page keeps a clip in circulation when people finish it, tap like, and — for music — use the sound. Spark spend this clip: ",
					clip.sparkSpend ? money(clip.sparkSpend) : "none",
					"."
				]
			})
		]
	});
}
function Stat({ n, l }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-lg bg-white/5 px-3 py-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-display text-xl tabular-nums",
			children: n
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs text-tok-muted",
			children: l
		})]
	});
}
function TikTokLive() {
	const game = useGame((s) => s.game);
	const live = useGame((s) => s.live);
	const you = rosterOf(game)[0];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "absolute inset-0 grid place-items-center bg-tok-bg px-6 pb-20 text-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-3xl",
				children: "LIVE"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 text-sm text-tok-muted",
				children: [
					"Viewers scale with followers. Last: ",
					compact(game.liveViewers.tiktok),
					" watching."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrimaryBtn, {
				className: "mt-4",
				disabled: !you,
				onClick: () => you && live(you.id, "tiktok"),
				children: "Go live"
			})
		] })
	});
}
function XApp() {
	const overlay = useGame((s) => s.overlay);
	const tab = overlay.type === "x" ? overlay.tab ?? "home" : "home";
	const setOverlay = useGame((s) => s.setOverlay);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-40 grid place-items-center bg-bg/80 p-0 md:p-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex h-dvh w-full max-w-[480px] flex-col bg-[#000] text-[#e7e9ea] md:h-[min(844px,calc(100dvh-48px))] md:rounded-[2rem] md:border md:border-white/10 phone-bezel",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "flex items-center justify-between border-b border-white/10 px-4 py-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "min-h-10 text-sm text-white/50",
							onClick: () => setOverlay({ type: "none" }),
							children: "HQ"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-lg tracking-tight",
							children: "X"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "grid size-10 place-items-center",
							onClick: () => setOverlay({ type: "none" }),
							"aria-label": "Close",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-h-0 flex-1 overflow-hidden",
					children: [
						tab === "home" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HomeFeed$1, {}),
						tab === "explore" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Explore, {}),
						tab === "alerts" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Alerts, {}),
						tab === "messages" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Messages, {}),
						tab === "profile" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Profile, {}),
						tab === "live" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(XLive, {}),
						tab === "settings" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-full overflow-auto",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfileEditor, {
								platform: "x",
								dark: true
							})
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XNav, { tab })
			]
		})
	});
}
function XNav({ tab }) {
	const setOverlay = useGame((s) => s.setOverlay);
	const game = useGame((s) => s.game);
	const alerts = game?.xAlerts.length ?? 0;
	const dms = (game?.features ?? []).filter((f) => f.status === "open" && (f.incoming || f.hopOn)).length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
		className: "grid grid-cols-5 border-t border-white/10 pb-[env(safe-area-inset-bottom)]",
		children: [
			{
				id: "home",
				label: "Home",
				icon: House
			},
			{
				id: "explore",
				label: "Explore",
				icon: Search
			},
			{
				id: "alerts",
				label: "Alerts",
				icon: Bell
			},
			{
				id: "messages",
				label: "Messages",
				icon: Mail
			},
			{
				id: "profile",
				label: "Profile",
				icon: User
			}
		].map((it) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			onClick: () => setOverlay({
				type: "x",
				tab: it.id
			}),
			className: cn("relative flex min-h-14 flex-col items-center justify-center gap-0.5 text-[10px]", tab === it.id ? "text-white" : "text-white/45"),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(it.icon, { className: "size-5" }),
				it.label,
				it.id === "alerts" && alerts > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute top-2 right-5 size-1.5 rounded-full bg-pulse-check" }),
				it.id === "messages" && dms > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "absolute top-2 right-4 min-w-4 rounded-full bg-pulse-check px-1 text-[9px] text-black",
					children: dms
				})
			]
		}, it.id))
	});
}
function HomeFeed$1() {
	const game = useGame((s) => s.game);
	const xPost = useGame((s) => s.xPost);
	const roster = rosterOf(game);
	const [artistId, setArtistId] = (0, import_react.useState)(roster[0]?.id ?? "");
	const [text, setText] = (0, import_react.useState)("");
	const feed = (0, import_react.useMemo)(() => game.xPosts, [game.xPosts]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex border-b border-white/10 text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "flex-1 border-b-2 border-white py-3 text-center font-medium",
					children: "For you"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "flex-1 py-3 text-center text-white/40",
					children: "Following"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("form", {
				className: "border-b border-white/10 p-3",
				onSubmit: (e) => {
					e.preventDefault();
					if (!artistId) return;
					xPost(artistId, text);
					setText("");
				},
				children: roster.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-white/45",
					children: "Sign someone to post."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [roster.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
					className: "mb-2 h-10 w-full rounded-md border border-white/10 bg-white/5 px-2 text-sm",
					value: artistId,
					onChange: (e) => setArtistId(e.target.value),
					children: roster.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
						value: a.id,
						className: "text-black",
						children: ["Post as ", a.name]
					}, a.id))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-3",
					children: [roster[0] && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArtistAvatar, {
						spec: roster.find((a) => a.id === artistId)?.avatar ?? roster[0].avatar,
						size: 40
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							value: text,
							onChange: (e) => setText(e.target.value),
							maxLength: 280,
							placeholder: "What's happening",
							className: "h-16 w-full resize-none bg-transparent text-sm outline-none"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[11px] text-white/35",
								children: 280 - text.length
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrimaryBtn, {
								type: "submit",
								className: "h-9 min-h-9 rounded-full px-4",
								children: "Post"
							})]
						})]
					})]
				})] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "min-h-0 flex-1 overflow-auto",
				children: feed.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "flex gap-3 border-b border-white/10 px-4 py-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArtistAvatar, {
						spec: p.avatar,
						size: 40
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "flex flex-wrap items-center gap-1 text-sm",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-medium",
										children: p.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VerifiedBadge, { on: p.verified }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-white/40",
										children: ["@", p.handle]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-white/30",
										children: ["· w", p.week]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm leading-relaxed",
								children: p.text
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-2 flex gap-6 text-xs text-white/40",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "inline-flex items-center gap-1",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "size-3.5" }),
											" ",
											compact(p.replies)
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "inline-flex items-center gap-1",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Repeat2, { className: "size-3.5" }),
											" ",
											compact(p.reposts)
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "inline-flex items-center gap-1",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "size-3.5" }),
											" ",
											compact(p.likes)
										]
									})
								]
							})
						]
					})]
				}, p.id))
			})
		]
	});
}
function Explore() {
	const game = useGame((s) => s.game);
	const hot = game.songs.filter((s) => s.chart != null).sort((a, b) => (a.chart ?? 99) - (b.chart ?? 99)).slice(0, 12);
	const radio = game.songs.filter((s) => s.radioChart != null).sort((a, b) => (a.radioChart ?? 99) - (b.radioChart ?? 99)).slice(0, 6);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "h-full overflow-auto px-4 py-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rounded-xl bg-white/5 px-3 py-2 text-sm text-white/45",
				children: "Search X"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-5 text-lg font-semibold",
				children: "Trending"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-2 grid gap-1",
				children: game.trends.slice(0, 6).map((t, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "rounded-lg px-1 py-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-[11px] text-white/40",
							children: [
								t.kind,
								" · trending #",
								i + 1
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-medium",
							children: t.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-white/40",
							children: [t.heat, "k talking"]
						})
					]
				}, t.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-6 text-lg font-semibold",
				children: "Billboard 100"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-2 grid gap-2",
				children: hot.map((s) => {
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-center gap-3 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "w-6 tabular-nums text-white/40",
							children: ["#", s.chart]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "min-w-0 flex-1 truncate",
							children: [s.title, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-white/40",
								children: [" · ", creditLine(game, s)]
							})]
						})]
					}, s.id);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-6 text-lg font-semibold",
				children: "Radio"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-2 grid gap-2 pb-6",
				children: radio.map((s) => {
					const a = game.artists.find((x) => x.id === s.artistId);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-center gap-3 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "w-6 tabular-nums text-white/40",
							children: ["#", s.radioChart]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "min-w-0 flex-1 truncate",
							children: [s.title, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-white/40",
								children: [" · ", a?.name]
							})]
						})]
					}, s.id);
				})
			})
		]
	});
}
function Alerts() {
	const game = useGame((s) => s.game);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "h-full overflow-auto",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "px-4 py-3 text-lg font-semibold",
			children: "Notifications"
		}), game.xAlerts.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "px-4 text-sm text-white/45",
			children: "Quiet. Post, then wait for the timeline to move."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: game.xAlerts.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
			className: "border-b border-white/10 px-4 py-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] tracking-wide text-white/40 uppercase",
					children: a.kind
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm",
					children: a.text
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-xs text-white/35",
					children: [
						"@",
						a.handle,
						" · week ",
						a.week
					]
				})
			]
		}, a.id)) })]
	});
}
function Messages() {
	const overlay = useGame((s) => s.overlay);
	const threadId = overlay.type === "x" ? overlay.threadId : void 0;
	if (threadId) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Thread, { artistId: threadId });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Inbox, {});
}
function Inbox() {
	const game = useGame((s) => s.game);
	const setOverlay = useGame((s) => s.setOverlay);
	const you = rosterOf(game)[0];
	const [q, setQ] = (0, import_react.useState)("");
	const n = q.trim().toLowerCase();
	const threads = (0, import_react.useMemo)(() => {
		const map = /* @__PURE__ */ new Map();
		for (const m of game.xMessages) {
			const id = m.artistId;
			if (!id || id === you?.id) continue;
			if (!map.has(id)) map.set(id, m);
		}
		return [...map.values()];
	}, [game.xMessages, you?.id]);
	const artists = game.artists.filter((a) => a.id !== you?.id).filter((a) => !n || a.name.toLowerCase().includes(n) || a.handle.toLowerCase().includes(n)).slice().sort((a, b) => b.popularity - a.popularity);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "px-4 py-3 text-lg font-semibold",
				children: "Messages"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "px-4 text-xs text-white/40",
				children: "DM any artist. Open a thread and attach a single to lock the feature."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				value: q,
				onChange: (e) => setQ(e.target.value),
				placeholder: "Search people",
				className: "mx-4 mt-2 h-10 rounded-md border border-white/10 bg-white/5 px-3 text-sm outline-none"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-h-0 flex-1 overflow-auto",
				children: [n && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "border-b border-white/10",
					children: artists.slice(0, 12).map((a) => {
						const p = profileOf(a, "x");
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: "flex w-full items-center gap-3 px-4 py-3 text-left",
							onClick: () => setOverlay({
								type: "x",
								tab: "messages",
								threadId: a.id
							}),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArtistAvatar, {
									spec: p.avatar,
									size: 40
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "min-w-0 flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "block text-sm font-medium",
										children: a.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-xs text-white/40",
										children: [
											"@",
											p.handle,
											" · pop ",
											Math.round(a.popularity),
											" · ",
											money(featureFeeFor(a))
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs text-[#6cb3d4]",
									children: "New chat"
								})
							]
						}) }, a.id);
					})
				}), threads.length === 0 && !n ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "px-4 py-6 text-sm text-white/45",
					children: "No DMs yet. Search an artist above — stars and prospects both hop on singles from this inbox."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: threads.map((m) => {
					const offer = m.offerId ? game.features.find((f) => f.id === m.offerId) : null;
					const open = offer && offer.status === "open";
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: "flex w-full items-center gap-3 border-b border-white/10 px-4 py-3 text-left",
						onClick: () => m.artistId && setOverlay({
							type: "x",
							tab: "messages",
							threadId: m.artistId
						}),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArtistAvatar, {
							spec: m.avatar,
							size: 40
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-center gap-2 text-sm font-medium",
								children: [m.from, open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] tracking-wide text-[#6cb3d4] uppercase",
									children: "collab"
								}) : null]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "line-clamp-1 text-xs text-white/50",
								children: m.text
							})]
						})]
					}) }, m.id);
				}) })]
			})
		]
	});
}
function Thread({ artistId }) {
	const game = useGame((s) => s.game);
	const setOverlay = useGame((s) => s.setOverlay);
	const dm = useGame((s) => s.dm);
	const replyFeature = useGame((s) => s.replyFeature);
	const askFeature = useGame((s) => s.askFeature);
	const them = game.artists.find((a) => a.id === artistId);
	const you = rosterOf(game)[0];
	const [text, setText] = (0, import_react.useState)("");
	const [songId, setSongId] = (0, import_react.useState)("");
	const songs = playerSongs(game).filter((s) => !s.collabArtistId);
	const msgs = game.xMessages.filter((m) => m.artistId === artistId).slice().reverse();
	if (!them) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "p-4 text-sm text-white/45",
		children: "They left."
	});
	const p = profileOf(them, "x");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 border-b border-white/10 px-3 py-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "min-h-10 px-2 text-sm text-white/50",
						onClick: () => setOverlay({
							type: "x",
							tab: "messages"
						}),
						children: "Inbox"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArtistAvatar, {
						spec: p.avatar,
						size: 32
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "truncate text-sm font-medium",
							children: them.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-[11px] text-white/40",
							children: [
								"@",
								p.handle,
								" · pop ",
								Math.round(them.popularity)
							]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "min-h-0 flex-1 overflow-auto px-4 py-3",
				children: msgs.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-white/45",
					children: "Start the collab conversation. Attach a single to lock the verse."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "grid gap-3",
					children: msgs.map((m) => {
						const offer = m.offerId ? game.features.find((f) => f.id === m.offerId) : null;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: cn("max-w-[85%] rounded-2xl px-3 py-2 text-sm", m.outgoing ? "ml-auto bg-white/15" : "bg-white/8"),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11px] text-white/40",
									children: m.outgoing ? "You" : m.from
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-0.5 text-white/90",
									children: m.text
								}),
								offer && offer.status === "open" && (offer.incoming || offer.hopOn) ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-2 flex flex-wrap gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrimaryBtn, {
										onClick: () => replyFeature(offer.id, true),
										children: offer.hopOn ? "Put them on it" : `Take the verse · ${money(offer.fee)}`
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										className: "min-h-11 rounded-md border border-white/15 px-3 text-sm",
										onClick: () => replyFeature(offer.id, false),
										children: "Pass"
									})]
								}) : null
							]
						}, m.id);
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "border-t border-white/10 px-3 py-3",
				onSubmit: (e) => {
					e.preventDefault();
					if (songId) {
						askFeature(songId, them.id);
						if (text.trim()) dm(them.id, text, null);
						setText("");
						setSongId("");
						return;
					}
					dm(them.id, text, null);
					setText("");
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] text-white/40",
						children: "Attach a single to pay or split — the verse locks in this thread."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						className: "mt-2 h-10 w-full rounded-md border border-white/10 bg-white/5 px-2 text-sm",
						value: songId,
						onChange: (e) => setSongId(e.target.value),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "",
							className: "text-black",
							children: "Just a message"
						}), songs.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
							value: s.id,
							className: "text-black",
							children: [
								"Feature on “",
								s.title,
								"” · ",
								money(featureFeeFor(them)),
								" or split"
							]
						}, s.id))]
					}),
					songs.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-xs text-white/40",
						children: "Book a single in Studio first, then attach it here."
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-2 flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: text,
							onChange: (e) => setText(e.target.value),
							placeholder: songId ? "Need you on this one" : "Write a DM",
							className: "h-11 flex-1 rounded-md border border-white/10 bg-white/5 px-3 text-sm outline-none"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrimaryBtn, {
							type: "submit",
							disabled: !you,
							children: songId ? "Lock verse" : "Send"
						})]
					})
				]
			})
		]
	});
}
function Profile() {
	const game = useGame((s) => s.game);
	const roster = rosterOf(game);
	const [artistId, setArtistId] = (0, import_react.useState)(roster[0]?.id ?? "");
	const a = game.artists.find((x) => x.id === artistId) ?? roster[0];
	const posts = game.xPosts.filter((p) => p.artistId === a?.id);
	const profile = a ? profileOf(a, "x") : null;
	if (!a) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "p-4 text-sm text-white/45",
		children: "No profile yet."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "h-full overflow-auto",
		children: [
			roster.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
				className: "m-3 h-10 w-[calc(100%-1.5rem)] rounded-md border border-white/10 bg-white/5 px-2 text-sm",
				value: a.id,
				onChange: (e) => setArtistId(e.target.value),
				children: roster.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: r.id,
					className: "text-black",
					children: r.name
				}, r.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-24 bg-linear-to-r from-white/10 to-white/5" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "px-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "-mt-8",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArtistAvatar, {
							spec: profile?.avatar ?? a.avatar,
							size: 72,
							className: "ring-4 ring-black"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "mt-3 flex items-center gap-1.5 font-display text-2xl",
						children: [a.name, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VerifiedBadge, {
							on: a.verified.x,
							size: 16
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-white/45",
						children: ["@", profile?.handle ?? a.handle]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-white/80",
						children: profile?.bio ?? a.bio
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium tabular-nums",
								children: compact(a.followingX)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-white/45",
								children: " Following"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mx-3 font-medium tabular-nums",
								children: compact(a.followers.x)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-white/45",
								children: " Followers"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-xs text-white/40",
						children: [
							a.verified.x ? "Verified" : `Hit ${compact(1e5)} then apply in Settings`,
							" · ",
							a.hometown
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 flex flex-wrap gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrimaryBtn, {
							onClick: () => useGame.getState().live(a.id, "x"),
							children: "Go live"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "min-h-11 rounded-md border border-white/15 px-3 text-sm",
							onClick: () => useGame.getState().setOverlay({
								type: "x",
								tab: "settings"
							}),
							children: "Settings"
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 border-b border-white/10 px-4 pb-2 text-sm font-medium",
				children: "Posts"
			}),
			posts.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "px-4 py-6 text-sm text-white/45",
				children: "No posts yet. Say something on Home."
			}) : posts.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "border-b border-white/10 px-4 py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm",
					children: p.text
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-xs text-white/40",
					children: [
						compact(p.likes),
						" likes · ",
						compact(p.reposts),
						" reposts"
					]
				})]
			}, p.id))
		]
	});
}
function XLive() {
	const game = useGame((s) => s.game);
	const live = useGame((s) => s.live);
	const you = rosterOf(game)[0];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid h-full place-items-center px-6 text-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-2xl",
				children: "Spaces / Live"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 text-sm text-white/50",
				children: [
					"Last: ",
					compact(game.liveViewers.x),
					" watching."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrimaryBtn, {
				className: "mt-4",
				disabled: !you,
				onClick: () => you && live(you.id, "x"),
				children: "Go live"
			})
		] })
	});
}
var WASH = [
	"from-[#2a2420] to-[#12110f]",
	"from-[#1c2422] to-[#0e1210]",
	"from-[#242028] to-[#121016]",
	"from-[#202428] to-[#101214]"
];
function InstagramApp() {
	const overlay = useGame((s) => s.overlay);
	const tab = overlay.type === "instagram" ? overlay.tab ?? "feed" : "feed";
	const setOverlay = useGame((s) => s.setOverlay);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-40 grid place-items-center bg-bg/80 p-0 md:p-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex h-dvh w-full max-w-[420px] flex-col bg-black text-white md:h-[min(844px,calc(100dvh-48px))] md:rounded-[2rem] md:border md:border-white/10 phone-bezel",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "flex items-center justify-between px-4 py-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "min-h-10 text-sm text-white/60",
							onClick: () => setOverlay({ type: "none" }),
							children: "HQ"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-xl",
							children: "Instagram"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "grid size-10 place-items-center",
							onClick: () => setOverlay({ type: "none" }),
							"aria-label": "Close",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-h-0 flex-1 overflow-hidden",
					children: [
						tab === "feed" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Feed, {}),
						tab === "reels" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Feed, {}),
						tab === "profile" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InstagramProfile, {}),
						tab === "live" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InstagramLive, {}),
						tab === "settings" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-full overflow-auto",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfileEditor, {
								platform: "instagram",
								dark: true
							})
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "grid grid-cols-4 border-t border-white/10 pb-[env(safe-area-inset-bottom)]",
					children: [
						{
							id: "feed",
							label: "Home",
							icon: House
						},
						{
							id: "reels",
							label: "Drop",
							icon: SquarePlus
						},
						{
							id: "live",
							label: "Live",
							icon: Heart
						},
						{
							id: "profile",
							label: "Profile",
							icon: User
						}
					].map((it) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setOverlay({
							type: "instagram",
							tab: it.id
						}),
						className: cn("flex min-h-14 flex-col items-center justify-center gap-0.5 text-[10px]", tab === it.id ? "text-white" : "text-white/45"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(it.icon, { className: "size-5" }), it.label]
					}, it.id))
				})
			]
		})
	});
}
function Feed() {
	const game = useGame((s) => s.game);
	const gramPost = useGame((s) => s.gramPost);
	const roster = rosterOf(game);
	const [artistId, setArtistId] = (0, import_react.useState)(roster[0]?.id ?? "");
	const [caption, setCaption] = (0, import_react.useState)("");
	const overlay = useGame((s) => s.overlay);
	const compose = overlay.type === "instagram" && overlay.tab === "reels";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full flex-col",
		children: [compose && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("form", {
			className: "border-b border-white/10 p-3",
			onSubmit: (e) => {
				e.preventDefault();
				if (!artistId) return;
				gramPost(artistId, caption);
				setCaption("");
			},
			children: roster.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-white/50",
				children: "Sign someone first."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [roster.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
				className: "mb-2 h-10 w-full rounded-md border border-white/10 bg-white/5 px-2 text-sm",
				value: artistId,
				onChange: (e) => setArtistId(e.target.value),
				children: roster.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
					value: a.id,
					className: "text-black",
					children: [
						a.name,
						" · ",
						compact(a.followers.instagram),
						" followers"
					]
				}, a.id))
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: caption,
					onChange: (e) => setCaption(e.target.value),
					placeholder: "Caption",
					className: "h-11 flex-1 rounded-md border border-white/10 bg-white/5 px-3 text-sm outline-none"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrimaryBtn, {
					type: "submit",
					children: "Drop"
				})]
			})] })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-h-0 flex-1 overflow-auto",
			children: [game.gram.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "px-4 py-8 text-center text-sm text-white/50",
				children: "No stills yet. Drop one."
			}), game.gram.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "border-b border-white/10 pb-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 px-3 py-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArtistAvatar, {
							spec: g.avatar,
							size: 32
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-1 text-sm font-medium",
							children: [g.handle, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VerifiedBadge, { on: g.verified })]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: `aspect-square bg-linear-to-br ${WASH[g.visual % WASH.length]} grid place-items-center`,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArtistAvatar, {
							spec: g.avatar,
							size: 96
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-4 px-3 py-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "size-6" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "size-6" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "px-3 text-sm",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-medium",
							children: [compact(g.likes), " likes"]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "px-3 text-sm text-white/80",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium",
								children: g.handle
							}),
							" ",
							g.caption
						]
					})
				]
			}, g.id))]
		})]
	});
}
function InstagramProfile() {
	const game = useGame((s) => s.game);
	const roster = rosterOf(game);
	const [artistId, setArtistId] = (0, import_react.useState)(roster[0]?.id ?? "");
	const a = game.artists.find((x) => x.id === artistId) ?? roster[0];
	const posts = game.gram.filter((g) => g.artistId === a?.id);
	const profile = a ? profileOf(a, "instagram") : null;
	if (!a) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "p-4 text-sm text-white/50",
		children: "No profile."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "h-full overflow-auto px-4 py-3",
		children: [
			roster.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
				className: "mb-3 h-10 w-full rounded-md border border-white/10 bg-white/5 px-2 text-sm",
				value: a.id,
				onChange: (e) => setArtistId(e.target.value),
				children: roster.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: r.id,
					className: "text-black",
					children: r.name
				}, r.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArtistAvatar, {
					spec: profile?.avatar ?? a.avatar,
					size: 72
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid flex-1 grid-cols-3 text-center text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-medium tabular-nums",
							children: posts.length
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] text-white/45",
							children: "posts"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-medium tabular-nums",
							children: compact(a.followers.instagram)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] text-white/45",
							children: "followers"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-medium tabular-nums",
							children: compact(Math.round(a.followingX * .6))
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] text-white/45",
							children: "following"
						})] })
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-3 flex items-center gap-1 text-sm font-medium",
				children: [a.name, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VerifiedBadge, { on: a.verified.instagram })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-xs text-white/45",
				children: ["@", profile?.handle ?? a.handle]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-white/70",
				children: profile?.bio ?? a.bio
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-xs text-white/40",
				children: a.verified.instagram ? "Verified" : `Hit ${compact(1e5)} then apply in Settings`
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "mt-3 min-h-11 rounded-md border border-white/15 px-3 text-sm",
				onClick: () => useGame.getState().setOverlay({
					type: "instagram",
					tab: "settings"
				}),
				children: "Settings"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 grid grid-cols-3 gap-1",
				children: posts.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `aspect-square bg-linear-to-br ${WASH[g.visual % WASH.length]}` }, g.id))
			})
		]
	});
}
function InstagramLive() {
	const game = useGame((s) => s.game);
	const live = useGame((s) => s.live);
	const you = rosterOf(game)[0];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid h-full place-items-center px-6 text-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-2xl",
				children: "Go live"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 text-sm text-white/50",
				children: [
					"Last: ",
					compact(game.liveViewers.instagram),
					" watching."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrimaryBtn, {
				className: "mt-4",
				disabled: !you,
				onClick: () => you && live(you.id, "instagram"),
				children: "Start"
			})
		] })
	});
}
function SpotifyApp() {
	const overlay = useGame((s) => s.overlay);
	const tab = overlay.type === "spotify" ? overlay.tab ?? "home" : "home";
	const artistId = overlay.type === "spotify" ? overlay.artistId : void 0;
	const setOverlay = useGame((s) => s.setOverlay);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-40 grid place-items-center bg-bg/80 p-0 md:p-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex h-dvh w-full max-w-[480px] flex-col bg-[#121212] text-white md:h-[min(844px,calc(100dvh-48px))] md:rounded-[2rem] md:border md:border-white/10 phone-bezel",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "flex items-center justify-between px-4 py-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "min-h-10 text-sm text-white/50",
							onClick: () => setOverlay({ type: "none" }),
							children: "HQ"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-lg text-wave",
							children: "Spotify"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "grid size-10 place-items-center",
							onClick: () => setOverlay({ type: "none" }),
							"aria-label": "Close",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-h-0 flex-1 overflow-hidden",
					children: [
						tab === "home" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpotifyHome, {}),
						tab === "search" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpotifySearch, {}),
						tab === "library" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpotifyLibrary, {}),
						tab === "artist" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArtistChannel, { artistId }),
						tab === "settings" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-full overflow-auto",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfileEditor, {
								platform: "spotify",
								dark: true
							})
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "grid grid-cols-4 border-t border-white/10 pb-[env(safe-area-inset-bottom)]",
					children: [
						{
							id: "home",
							label: "Home",
							icon: House
						},
						{
							id: "search",
							label: "Search",
							icon: Search
						},
						{
							id: "library",
							label: "Library",
							icon: Library
						},
						{
							id: "settings",
							label: "You",
							icon: User
						}
					].map((it) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setOverlay({
							type: "spotify",
							tab: it.id
						}),
						className: cn("flex min-h-14 flex-col items-center justify-center gap-0.5 text-[10px]", tab === it.id || tab === "artist" && it.id === "library" ? "text-white" : "text-white/45"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(it.icon, { className: "size-5" }), it.label]
					}, it.id))
				})
			]
		})
	});
}
function SpotifyHome() {
	const game = useGame((s) => s.game);
	const setOverlay = useGame((s) => s.setOverlay);
	const roster = rosterOf(game);
	const hot = game.songs.filter((s) => s.status === "released").slice().sort((a, b) => b.streamsWeek - a.streamsWeek).slice(0, CHART_SIZE.spotify);
	const yours = playerSongs(game).filter((s) => s.status === "released");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "h-full overflow-auto px-4 pb-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-2xl",
				children: "Good evening"
			}),
			roster[0] && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				onClick: () => setOverlay({
					type: "spotify",
					tab: "artist",
					artistId: roster[0].id
				}),
				className: "mt-4 flex w-full items-center gap-3 rounded-lg bg-white/8 p-3 text-left",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArtistAvatar, {
					spec: roster[0].avatar,
					size: 56
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-white/45",
							children: "Your channel"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "flex items-center gap-1 font-medium",
							children: [roster[0].name, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VerifiedBadge, {
								on: roster[0].verified.spotify,
								className: "text-wave"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-white/50",
							children: [compact(roster[0].monthlyListeners), " monthly listeners"]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "mt-6 text-sm font-medium text-white/70",
				children: "Top Spotify 50"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "mt-2 grid gap-2",
				children: hot.map((s, i) => {
					const a = game.artists.find((x) => x.id === s.artistId);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "flex w-full items-center gap-3 rounded-md px-1 py-1.5 text-left hover:bg-white/5",
						onClick: () => a && setOverlay({
							type: "spotify",
							tab: "artist",
							artistId: a.id
						}),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "w-5 text-xs tabular-nums text-white/40",
								children: i + 1
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block truncate text-sm",
									children: s.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "truncate text-xs text-white/45",
									children: creditLine(game, s)
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs tabular-nums text-white/40",
								children: compact(s.streamsWeek)
							})
						]
					}) }, s.id);
				})
			}),
			yours.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "mt-6 text-sm font-medium text-white/70",
				children: "Your catalog"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-2 grid gap-2",
				children: yours.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex justify-between text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "truncate",
						children: s.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "tabular-nums text-white/40",
						children: compact(s.streams)
					})]
				}, s.id))
			})] })
		]
	});
}
function SpotifySearch() {
	const game = useGame((s) => s.game);
	const setOverlay = useGame((s) => s.setOverlay);
	const [q, setQ] = (0, import_react.useState)("");
	const hits = (0, import_react.useMemo)(() => {
		const n = q.trim().toLowerCase();
		return game.artists.filter((a) => !n || a.name.toLowerCase().includes(n) || a.handle.includes(n)).slice().sort((a, b) => b.monthlyListeners - a.monthlyListeners).slice(0, 12);
	}, [game.artists, q]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "h-full overflow-auto px-4 pb-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			value: q,
			onChange: (e) => setQ(e.target.value),
			placeholder: "Artists, songs",
			className: "h-11 w-full rounded-md bg-white/10 px-3 text-sm outline-none"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-4 grid gap-2",
			children: hits.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				className: "flex w-full items-center gap-3 rounded-md py-1 text-left",
				onClick: () => setOverlay({
					type: "spotify",
					tab: "artist",
					artistId: a.id
				}),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArtistAvatar, {
					spec: a.avatar,
					size: 48
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-1 text-sm font-medium",
						children: [a.name, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VerifiedBadge, {
							on: a.verified.spotify,
							className: "text-wave"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "block text-xs text-white/45",
						children: [
							"Artist · ",
							compact(a.monthlyListeners),
							" monthly listeners"
						]
					})]
				})]
			}) }, a.id))
		})]
	});
}
function SpotifyLibrary() {
	const game = useGame((s) => s.game);
	const setOverlay = useGame((s) => s.setOverlay);
	const roster = rosterOf(game);
	const songs = playerSongs(game).filter((s) => s.status === "released");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "h-full overflow-auto px-4 pb-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-2xl",
				children: "Library"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-white/45",
				children: "Saved from your catalog."
			}),
			roster.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				onClick: () => setOverlay({
					type: "spotify",
					tab: "artist",
					artistId: a.id
				}),
				className: "mt-4 flex w-full items-center gap-3 text-left",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArtistAvatar, {
					spec: a.avatar,
					size: 48
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "block text-sm font-medium",
					children: a.name
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-xs text-white/45",
					children: [compact(a.monthlyListeners), " monthly listeners"]
				})] })]
			}, a.id)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-5 grid gap-2",
				children: songs.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex justify-between text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: s.title }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "tabular-nums text-white/40",
						children: compact(s.streams)
					})]
				}, s.id))
			})
		]
	});
}
function ArtistChannel({ artistId }) {
	const game = useGame((s) => s.game);
	const setOverlay = useGame((s) => s.setOverlay);
	const roster = rosterOf(game);
	const a = game.artists.find((x) => x.id === artistId) ?? roster[0];
	if (!a) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "p-4 text-sm text-white/45",
		children: "No artist channel."
	});
	const profile = profileOf(a, "spotify");
	const songs = game.songs.filter((s) => s.artistId === a.id && s.status === "released").sort((x, y) => y.streams - x.streams);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "h-full overflow-auto pb-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				className: "px-4 text-sm text-white/45",
				onClick: () => setOverlay({
					type: "spotify",
					tab: "home"
				}),
				children: "Back"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-2 flex items-end gap-4 bg-linear-to-b from-white/15 to-transparent px-4 pb-4 pt-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArtistAvatar, {
					spec: profile.avatar,
					size: 96
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 pb-1",
					children: [a.verified.spotify && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "flex items-center gap-1 text-[11px] tracking-wide text-wave uppercase",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VerifiedBadge, {
							on: true,
							className: "text-wave"
						}), " Verified artist"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-3xl leading-none",
						children: a.name
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "px-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-white/70",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium tabular-nums text-white",
								children: compact(a.monthlyListeners)
							}),
							" monthly listeners",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-white/40",
								children: " · last 4 weeks of streams"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-xs text-white/40",
						children: [
							"@",
							profile.handle,
							" · ",
							compact(a.followers.youtube),
							" Spotify followers · ",
							a.hometown
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm text-white/60",
						children: profile.bio
					}),
					!a.verified.spotify && roster.some((r) => r.id === a.id) ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-xs text-white/40",
						children: [
							"Hit ",
							compact(5e4),
							" monthly, then apply in You / Settings."
						]
					}) : null,
					roster.some((r) => r.id === a.id) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "mt-3 min-h-11 rounded-md border border-white/15 px-3 text-sm",
						onClick: () => setOverlay({
							type: "spotify",
							tab: "settings"
						}),
						children: "Settings"
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "mt-6 text-lg font-semibold",
						children: "Popular"
					}),
					songs.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-white/45",
						children: "No releases on Spotify yet."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
						className: "mt-2 grid gap-2",
						children: songs.slice(0, 8).map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center gap-3 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "w-5 tabular-nums text-white/40",
									children: i + 1
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "min-w-0 flex-1 truncate",
									children: [s.title, featName(game, s) ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-white/45",
										children: [" feat. ", featName(game, s)]
									}) : null]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "tabular-nums text-white/40",
									children: compact(s.streams)
								})
							]
						}, s.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "mt-6 text-lg font-semibold",
						children: "Discography"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-2 grid gap-2",
						children: songs.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center justify-between text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								s.title,
								featName(game, s) ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-white/45",
									children: [" feat. ", featName(game, s)]
								}) : null,
								s.chart ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "ml-2 text-xs text-wave",
									children: ["#", s.chart]
								}) : null
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-xs text-white/40",
								children: [compact(s.streamsWeek), " /wk"]
							})]
						}, s.id))
					})
				]
			})
		]
	});
}
var KINDS = [
	{
		id: "traditional",
		label: "Official Video"
	},
	{
		id: "lyrics",
		label: "Official Audio"
	},
	{
		id: "makingOf",
		label: "Making of"
	},
	{
		id: "animation",
		label: "Animation"
	},
	{
		id: "performance",
		label: "Live / Performance"
	},
	{
		id: "general",
		label: "Vlog"
	}
];
var THUMBS = [
	"from-[#3a1818] via-[#1a1010] to-[#0f0f0f]",
	"from-[#18203a] via-[#10141a] to-[#0f0f0f]",
	"from-[#183a28] via-[#101a14] to-[#0f0f0f]",
	"from-[#3a2818] via-[#1a1410] to-[#0f0f0f]",
	"from-[#28183a] via-[#14101a] to-[#0f0f0f]"
];
var COVERS = [
	"#3a1818",
	"#18203a",
	"#183a28",
	"#3a2818",
	"#28183a",
	"#1a1a1a",
	"#3a3a18",
	"#183a3a"
];
function dur(kind) {
	if (kind === "lyrics") return "2:58";
	if (kind === "makingOf") return "8:12";
	if (kind === "animation") return "3:41";
	if (kind === "performance") return "4:26";
	if (kind === "general") return "11:04";
	return "3:24";
}
function weeksAgo(week, now) {
	const d = Math.max(0, now - week);
	if (d <= 0) return "this week";
	if (d === 1) return "1 week ago";
	if (d < 52) return `${d} weeks ago`;
	return `${Math.floor(d / 52)}y ago`;
}
function kindLabel(kind) {
	return KINDS.find((k) => k.id === kind)?.label ?? "Video";
}
function YouTubeApp() {
	const overlay = useGame((s) => s.overlay);
	const tab = overlay.type === "youtube" ? overlay.tab ?? "home" : "home";
	const watching = overlay.type === "youtube" ? overlay.videoId : void 0;
	const setOverlay = useGame((s) => s.setOverlay);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-40 grid place-items-center bg-bg/80 p-0 md:p-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex h-dvh w-full max-w-[560px] flex-col bg-[#0f0f0f] text-white md:h-[min(844px,calc(100dvh-48px))] md:rounded-[2rem] md:border md:border-white/10 phone-bezel",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "flex items-center gap-2 px-3 py-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "min-h-10 shrink-0 text-sm text-white/50",
							onClick: () => setOverlay({ type: "none" }),
							children: "HQ"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: "flex min-w-0 flex-1 items-center gap-1",
							onClick: () => setOverlay({
								type: "youtube",
								tab: "home"
							}),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "size-5 fill-[#ff0000] text-[#ff0000]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-lg tracking-tight",
								children: "YouTube"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "grid size-10 place-items-center text-white/70",
							onClick: () => setOverlay({
								type: "youtube",
								tab: "search"
							}),
							"aria-label": "Search",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "size-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "grid size-10 place-items-center",
							onClick: () => setOverlay({ type: "none" }),
							"aria-label": "Close",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "min-h-0 flex-1 overflow-hidden",
					children: watching ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Watch, { videoId: watching }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						tab === "home" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HomeFeed, {}),
						tab === "search" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(YtSearch, {}),
						tab === "shorts" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shorts, {}),
						tab === "studio" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Studio, {}),
						tab === "channel" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Channel, {}),
						tab === "live" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Live, {}),
						tab === "settings" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-full overflow-auto",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfileEditor, {
								platform: "youtube",
								dark: true
							})
						})
					] })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "grid grid-cols-4 border-t border-white/10 pb-[env(safe-area-inset-bottom)]",
					children: [
						{
							id: "home",
							label: "Home",
							icon: House
						},
						{
							id: "shorts",
							label: "Shorts",
							icon: Play
						},
						{
							id: "studio",
							label: "Create",
							icon: Video
						},
						{
							id: "channel",
							label: "You",
							icon: User
						}
					].map((it) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setOverlay({
							type: "youtube",
							tab: it.id
						}),
						className: cn("flex min-h-14 flex-col items-center justify-center gap-0.5 text-[10px]", tab === it.id && !watching ? "text-white" : "text-white/45"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(it.icon, { className: "size-5" }), it.label]
					}, it.id))
				})
			]
		})
	});
}
function Thumb({ video, large, compact: mini }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("relative overflow-hidden bg-linear-to-br", THUMBS[video.quality % THUMBS.length], large ? "aspect-video w-full" : mini ? "aspect-video w-40 shrink-0 rounded-lg" : "aspect-video w-full rounded-lg"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0 grid place-items-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "grid size-11 place-items-center rounded-full bg-black/55",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "size-5 fill-white text-white" })
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "absolute top-1.5 left-1.5 rounded bg-black/70 px-1.5 py-0.5 text-[10px] text-white/80",
				children: kindLabel(video.kind)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "absolute right-1.5 bottom-1.5 rounded bg-black/80 px-1 text-[10px] tabular-nums",
				children: dur(video.kind)
			})
		]
	});
}
function Cover({ song, size = 56 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid shrink-0 place-items-center rounded-md text-[10px] font-medium text-white/80",
		style: {
			width: size,
			height: size,
			background: COVERS[song.cover % COVERS.length]
		},
		children: song.kind === "album" ? "LP" : song.kind === "ep" ? "EP" : "SGL"
	});
}
function VideoCard({ video, layout = "feed" }) {
	const game = useGame((s) => s.game);
	const setOverlay = useGame((s) => s.setOverlay);
	const artist = game.artists.find((a) => a.id === video.artistId);
	const song = video.songId ? game.songs.find((s) => s.id === video.songId) : null;
	const feat = song ? featName(game, song) : null;
	const open = () => setOverlay({
		type: "youtube",
		tab: "home",
		videoId: video.id,
		artistId: video.artistId
	});
	if (layout === "row") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		className: "grid w-full grid-cols-[9rem_1fr] gap-3 text-left",
		onClick: open,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Thumb, { video }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0 py-0.5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "line-clamp-2 text-sm font-medium leading-snug",
					children: video.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 truncate text-xs text-white/50",
					children: [artist?.name, feat ? ` · feat. ${feat}` : ""]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs text-white/40",
					children: [
						compact(video.views),
						" views · ",
						weeksAgo(video.week, game.week)
					]
				})
			]
		})]
	});
	if (layout === "grid") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		className: "text-left",
		onClick: open,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Thumb, { video }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1.5 line-clamp-2 text-xs font-medium leading-snug",
				children: video.title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-[10px] text-white/40",
				children: [compact(video.views), " views"]
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		className: "w-full text-left",
		onClick: open,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Thumb, {
			video,
			large: true
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-2 flex gap-3",
			children: [artist && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "shrink-0",
				onClick: (e) => {
					e.stopPropagation();
					setOverlay({
						type: "youtube",
						tab: "channel",
						artistId: artist.id
					});
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArtistAvatar, {
					spec: profileOf(artist, "youtube").avatar,
					size: 36
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0 flex-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "line-clamp-2 text-sm font-medium leading-snug",
					children: video.title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-0.5 truncate text-xs text-white/50",
					children: [
						artist?.name,
						artist?.verified.youtube ? " · " : "",
						feat ? `feat. ${feat} · ` : "",
						compact(video.views),
						" views · ",
						weeksAgo(video.week, game.week)
					]
				})]
			})]
		})]
	});
}
function HomeFeed() {
	const game = useGame((s) => s.game);
	const [chip, setChip] = (0, import_react.useState)("All");
	const chips = [
		"All",
		"Music",
		"Official Video",
		"Live",
		"Vlogs",
		"Mixes"
	];
	const videos = (0, import_react.useMemo)(() => {
		let list = game.videos.slice().sort((a, b) => b.viewsWeek - a.viewsWeek || b.views - a.views);
		if (chip === "Music") list = list.filter((v) => v.songId);
		if (chip === "Official Video") list = list.filter((v) => v.kind === "traditional");
		if (chip === "Live") list = list.filter((v) => v.kind === "performance");
		if (chip === "Vlogs") list = list.filter((v) => v.kind === "general" || v.kind === "makingOf");
		return list;
	}, [game.videos, chip]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "h-full overflow-auto pb-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex gap-2 overflow-x-auto px-3 py-2 text-xs",
			children: chips.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => setChip(c),
				className: cn("shrink-0 rounded-lg px-3 py-1.5", chip === c ? "bg-white text-black" : "bg-white/10 text-white/80"),
				children: c
			}, c))
		}), videos.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-6 px-4 text-sm text-white/45",
			children: "No videos on the platform yet. Create one from You → Create."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "grid gap-5",
			children: videos.slice(0, 28).map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VideoCard, { video: v }) }, v.id))
		})]
	});
}
function YtSearch() {
	const game = useGame((s) => s.game);
	const setOverlay = useGame((s) => s.setOverlay);
	const [q, setQ] = (0, import_react.useState)("");
	const n = q.trim().toLowerCase();
	const channels = game.artists.filter((a) => !n || a.name.toLowerCase().includes(n) || a.handle.toLowerCase().includes(n)).slice().sort((a, b) => b.followers.youtube - a.followers.youtube).slice(0, 12);
	const videos = game.videos.filter((v) => {
		if (!n) return true;
		const a = game.artists.find((x) => x.id === v.artistId);
		return v.title.toLowerCase().includes(n) || (a?.name.toLowerCase().includes(n) ?? false);
	}).slice(0, 16);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "h-full overflow-auto px-3 pb-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				value: q,
				onChange: (e) => setQ(e.target.value),
				placeholder: "Search YouTube",
				className: "mt-2 h-11 w-full rounded-full bg-white/10 px-4 text-sm outline-none placeholder:text-white/35",
				autoFocus: true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-4 text-sm font-medium text-white/60",
				children: "Channels"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-2 grid gap-1",
				children: channels.map((a) => {
					const p = profileOf(a, "youtube");
					const vids = game.videos.filter((v) => v.artistId === a.id).length;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: "flex w-full items-center gap-3 rounded-lg px-1 py-2 text-left hover:bg-white/5",
						onClick: () => setOverlay({
							type: "youtube",
							tab: "channel",
							artistId: a.id
						}),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArtistAvatar, {
								spec: p.avatar,
								size: 48
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-1 text-sm font-medium",
									children: [a.name, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VerifiedBadge, { on: a.verified.youtube })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "block text-xs text-white/45",
									children: [
										"@",
										p.handle,
										" · ",
										compact(a.followers.youtube),
										" subscribers · ",
										vids,
										" videos"
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "rounded-full bg-white px-3 py-1 text-xs text-black",
								children: "View"
							})
						]
					}) }, a.id);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-5 text-sm font-medium text-white/60",
				children: "Videos"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-2 grid gap-3",
				children: videos.map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VideoCard, {
					video: v,
					layout: "row"
				}) }, v.id))
			})
		]
	});
}
function Shorts() {
	const clips = useGame((s) => s.game).clips.slice(0, 18);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "h-full overflow-auto px-3 pb-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "py-2 font-display text-xl",
			children: "Shorts"
		}), clips.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-white/45",
			children: "No shorts yet. Post on TikTok and they leak here."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-3 gap-1.5",
			children: clips.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative aspect-[9/16] overflow-hidden rounded-md bg-linear-to-b from-[#2a1818] to-black",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "absolute inset-x-1 bottom-1 line-clamp-2 text-[10px] leading-tight",
					children: c.caption
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "absolute top-1 left-1 text-[10px] text-white/70",
					children: compact(c.views)
				})]
			}, c.id))
		})]
	});
}
function Studio() {
	const game = useGame((s) => s.game);
	const video = useGame((s) => s.video);
	const roster = rosterOf(game);
	const songs = playerSongs(game).filter((s) => s.status === "released");
	const [artistId, setArtistId] = (0, import_react.useState)(roster[0]?.id ?? "");
	const [songId, setSongId] = (0, import_react.useState)(songs[0]?.id ?? "");
	const [kind, setKind] = (0, import_react.useState)("traditional");
	const [premium, setPremium] = (0, import_react.useState)(true);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "h-full overflow-auto px-4 pb-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-xl",
				children: "Create"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-white/50",
				children: "Upload an official video, lyric video, or performance. Premium buys the crew."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "mt-4 block text-xs text-white/45",
				children: ["Channel", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
					className: "mt-1 h-11 w-full rounded-md border border-white/10 bg-white/5 px-2 text-sm",
					value: artistId,
					onChange: (e) => setArtistId(e.target.value),
					children: roster.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: a.id,
						className: "text-black",
						children: a.name
					}, a.id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "mt-3 block text-xs text-white/45",
				children: ["Release", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
					className: "mt-1 h-11 w-full rounded-md border border-white/10 bg-white/5 px-2 text-sm",
					value: songId,
					onChange: (e) => setSongId(e.target.value),
					children: songs.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
						value: s.id,
						className: "text-black",
						children: [s.title, featName(game, s) ? ` feat. ${featName(game, s)}` : ""]
					}, s.id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 flex flex-wrap gap-2",
				children: KINDS.map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setKind(k.id),
					className: cn("rounded-full px-3 py-1.5 text-xs", kind === k.id ? "bg-white text-black" : "bg-white/10"),
					children: k.label
				}, k.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				className: "mt-3 text-sm text-white/70",
				onClick: () => setPremium((p) => !p),
				children: premium ? "Professional crew · $28k+" : "Cheap hour · $4.5k"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrimaryBtn, {
				className: "mt-4 w-full",
				disabled: !artistId || !songId,
				onClick: () => artistId && songId && video(artistId, songId, kind, premium),
				children: "Upload"
			})
		]
	});
}
function Channel() {
	const game = useGame((s) => s.game);
	const overlay = useGame((s) => s.overlay);
	const setOverlay = useGame((s) => s.setOverlay);
	const live = useGame((s) => s.live);
	const roster = rosterOf(game);
	const requested = overlay.type === "youtube" ? overlay.artistId : void 0;
	const you = roster[0];
	const a = game.artists.find((x) => x.id === requested) ?? you;
	const [shelf, setShelf] = (0, import_react.useState)("home");
	const [sort, setSort] = (0, import_react.useState)("latest");
	if (!a) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "p-4 text-sm text-white/45",
		children: "No channel."
	});
	const profile = profileOf(a, "youtube");
	const mine = roster.some((r) => r.id === a.id);
	const videos = game.videos.filter((v) => v.artistId === a.id).sort((x, y) => y.views - x.views);
	const latest = [...videos].sort((x, y) => y.week - x.week)[0] ?? videos[0];
	const releases = game.songs.filter((s) => s.artistId === a.id && s.status === "released").sort((x, y) => (y.releasedWeek ?? 0) - (x.releasedWeek ?? 0));
	const featuredOn = game.songs.filter((s) => s.collabArtistId === a.id && s.status === "released");
	const shorts = game.clips.filter((c) => c.artistId === a.id).slice(0, 12);
	const subs = a.followers.youtube;
	const channelViews = videos.reduce((n, v) => n + v.views, 0) || a.wikiViews || a.monthlyListeners;
	const sortedVideos = sort === "popular" ? videos : [...videos].sort((x, y) => y.week - x.week || y.views - x.views);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "h-full overflow-auto pb-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: cn("h-28 bg-linear-to-r", THUMBS[a.avatar.accent % THUMBS.length]) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "px-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "-mt-10 flex items-end gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArtistAvatar, {
							spec: profile.avatar,
							size: 88,
							className: "ring-4 ring-[#0f0f0f]"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1 pb-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "flex items-center gap-1 font-display text-2xl leading-none",
								children: [a.name, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VerifiedBadge, { on: a.verified.youtube })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 text-xs text-white/50",
								children: ["@", profile.handle]
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-xs text-white/50",
						children: [
							compact(subs),
							" subscribers · ",
							videos.length,
							" videos · ",
							compact(channelViews),
							" views"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 line-clamp-2 text-sm text-white/70",
						children: profile.bio
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-xs text-white/40",
						children: [a.hometown, a.verified.youtube ? " · Official Artist Channel" : ""]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 flex flex-wrap gap-2",
						children: mine ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "min-h-10 rounded-full bg-white/10 px-4 text-sm",
								onClick: () => setOverlay({
									type: "youtube",
									tab: "settings"
								}),
								children: "Customize channel"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "min-h-10 rounded-full bg-white/10 px-4 text-sm",
								onClick: () => setOverlay({
									type: "youtube",
									tab: "studio"
								}),
								children: "Manage videos"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "min-h-10 rounded-full bg-white px-4 text-sm text-black",
								onClick: () => live(a.id, "youtube"),
								children: "Go live"
							})
						] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: "inline-flex min-h-10 items-center gap-1 rounded-full bg-white px-4 text-sm text-black",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "size-3.5" }), " Subscribed"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "min-h-10 rounded-full bg-white/10 px-4 text-sm",
							children: "Join"
						})] })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 flex gap-1 overflow-x-auto border-b border-white/10",
						children: [
							{
								id: "home",
								label: "Home"
							},
							{
								id: "videos",
								label: "Videos"
							},
							{
								id: "shorts",
								label: "Shorts"
							},
							{
								id: "live",
								label: "Live"
							},
							{
								id: "releases",
								label: "Releases"
							},
							{
								id: "playlists",
								label: "Playlists"
							},
							{
								id: "about",
								label: "About"
							}
						].map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setShelf(t.id),
							className: cn("min-h-11 shrink-0 px-3 text-sm", shelf === t.id ? "border-b-2 border-white font-medium" : "text-white/50"),
							children: t.label
						}, t.id))
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "px-4 pt-4",
				children: [
					shelf === "home" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-6",
						children: [
							latest ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								className: "text-left",
								onClick: () => setOverlay({
									type: "youtube",
									tab: "channel",
									videoId: latest.id,
									artistId: a.id
								}),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Thumb, {
										video: latest,
										large: true
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 text-sm font-medium",
										children: latest.title
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xs text-white/45",
										children: [
											compact(latest.views),
											" views · ",
											weeksAgo(latest.week, game.week)
										]
									})
								]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-white/45",
								children: mine ? "Upload from Create." : "This channel has no videos yet."
							}),
							videos.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shelf, {
								title: "Videos",
								onMore: () => setShelf("videos"),
								children: videos.slice(0, 8).map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									className: "w-40 shrink-0 text-left",
									onClick: () => setOverlay({
										type: "youtube",
										tab: "channel",
										videoId: v.id,
										artistId: a.id
									}),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Thumb, {
										video: v,
										compact: true
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 line-clamp-2 text-xs",
										children: v.title
									})]
								}, v.id))
							}),
							shorts.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shelf, {
								title: "Shorts",
								onMore: () => setShelf("shorts"),
								children: shorts.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "relative h-44 w-28 shrink-0 overflow-hidden rounded-lg bg-linear-to-b from-[#2a1818] to-black",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "absolute inset-x-1 bottom-1 line-clamp-2 text-[10px]",
										children: c.caption
									})
								}, c.id))
							}),
							releases.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-2 flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-medium",
									children: "Releases"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "text-xs text-white/45",
									onClick: () => setShelf("releases"),
									children: "View all"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "grid gap-2",
								children: releases.slice(0, 4).map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReleaseRow, {
									song: s,
									artistId: a.id
								}, s.id))
							})] })
						]
					}),
					shelf === "videos" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mb-3 flex gap-2",
						children: ["latest", "popular"].map((id) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setSort(id),
							className: cn("rounded-full px-3 py-1.5 text-xs capitalize", sort === id ? "bg-white text-black" : "bg-white/10"),
							children: id
						}, id))
					}), sortedVideos.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-white/45",
						children: "No uploads yet."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-2 gap-3",
						children: sortedVideos.map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VideoCard, {
							video: v,
							layout: "grid"
						}, v.id))
					})] }),
					shelf === "shorts" && (shorts.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-white/45",
						children: "No shorts on this channel."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-3 gap-1.5",
						children: shorts.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "relative aspect-[9/16] overflow-hidden rounded-md bg-linear-to-b from-[#2a1818] to-black",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "absolute inset-x-1 bottom-1 line-clamp-2 text-[10px]",
								children: c.caption
							})
						}, c.id))
					})),
					shelf === "live" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid place-items-center py-10 text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radio, { className: "size-8 text-[#ff0000]" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-sm text-white/60",
								children: mine ? `Last stream: ${compact(game.liveViewers.youtube)} watching.` : "No live streams right now."
							}),
							mine ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrimaryBtn, {
								className: "mt-4",
								onClick: () => live(a.id, "youtube"),
								children: "Start stream"
							}) : null
						]
					}),
					shelf === "releases" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mb-2 text-sm font-medium",
							children: "Singles & albums"
						}), releases.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-white/45",
							children: "No official releases yet."
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "grid gap-2",
							children: releases.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReleaseRow, {
								song: s,
								artistId: a.id
							}, s.id))
						})] }), featuredOn.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mb-2 text-sm font-medium",
							children: "Appears on"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "grid gap-2",
							children: featuredOn.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReleaseRow, {
								song: s,
								artistId: s.artistId,
								asFeature: true
							}, s.id))
						})] })]
					}),
					shelf === "playlists" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "grid gap-2",
						children: [[
							{
								name: "Official Videos",
								count: videos.filter((v) => v.kind === "traditional").length
							},
							{
								name: "Audio",
								count: videos.filter((v) => v.kind === "lyrics").length
							},
							{
								name: "Live",
								count: videos.filter((v) => v.kind === "performance").length
							},
							{
								name: "Uploads",
								count: videos.length
							}
						].filter((p) => p.count > 0).map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center justify-between rounded-lg bg-white/5 px-3 py-3 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: p.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-xs text-white/45",
								children: [p.count, " videos"]
							})]
						}, p.name)), videos.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-white/45",
							children: "Playlists appear after you upload."
						}) : null]
					}),
					shelf === "about" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-3 text-sm text-white/70",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: profile.bio }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-lg bg-white/5 px-3 py-3 text-xs text-white/55",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Joined week 1" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-1",
										children: [compact(channelViews), " views"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-1",
										children: [
											a.hometown,
											" · ",
											a.nationality
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-1",
										children: [compact(subs), " subscribers"]
									})
								]
							}),
							!a.verified.youtube && mine ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-white/40",
								children: "Hit 100k subscribers, then apply in Customize channel."
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "text-left text-xs text-white/45",
								onClick: () => setOverlay({
									type: "wiki",
									artistId: a.id
								}),
								children: "Open wiki"
							})
						]
					})
				]
			})
		]
	});
}
function Shelf({ title, onMore, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-2 flex items-center justify-between",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm font-medium",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			className: "text-xs text-white/45",
			onClick: onMore,
			children: "View all"
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex gap-2 overflow-x-auto pb-1",
		children
	})] });
}
function ReleaseRow({ song, artistId, asFeature }) {
	const game = useGame((s) => s.game);
	const setOverlay = useGame((s) => s.setOverlay);
	const feat = featName(game, song);
	const clip = game.videos.find((v) => v.songId === song.id);
	const host = game.artists.find((x) => x.id === song.artistId);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		disabled: !clip,
		className: "flex w-full items-center gap-3 rounded-lg bg-white/5 px-2 py-2 text-left disabled:opacity-50",
		onClick: () => clip && setOverlay({
			type: "youtube",
			tab: "channel",
			videoId: clip.id,
			artistId
		}),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cover, { song }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "min-w-0 flex-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "block truncate text-sm",
					children: song.title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-xs text-white/45",
					children: [
						asFeature ? `${host?.name ?? ""} · ` : "",
						feat && !asFeature ? `feat. ${feat} · ` : "",
						song.kind === "album" ? "Album" : song.kind === "ep" ? "EP" : "Single",
						song.chart ? ` · #${song.chart}` : "",
						" · ",
						compact(song.streams),
						" streams"
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "size-4 shrink-0 text-white/50" })
		]
	});
}
function Watch({ videoId }) {
	const game = useGame((s) => s.game);
	const setOverlay = useGame((s) => s.setOverlay);
	const video = game.videos.find((v) => v.id === videoId);
	if (!video) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "p-4 text-sm text-white/45",
		children: "Video gone."
	});
	const artist = game.artists.find((a) => a.id === video.artistId);
	const song = video.songId ? game.songs.find((s) => s.id === video.songId) : null;
	const feat = song ? featName(game, song) : null;
	const related = game.videos.filter((v) => v.id !== video.id).slice(0, 8);
	const comments = COMMENTS.slice(0, 5).map((c, i) => ({
		id: `${video.id}_${i}`,
		text: c,
		likes: Math.max(4, Math.round(video.likes / 40 * (.3 + (i + 3) % 5 / 8)))
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "h-full overflow-auto pb-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Thumb, {
			video,
			large: true
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "px-4 pt-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-base font-medium leading-snug",
					children: video.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-xs text-white/45",
					children: [
						compact(video.views),
						" views · ",
						weeksAgo(video.week, game.week)
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					className: "mt-3 flex w-full items-center gap-3 text-left",
					onClick: () => artist && setOverlay({
						type: "youtube",
						tab: "channel",
						artistId: artist.id
					}),
					children: [
						artist && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArtistAvatar, {
							spec: profileOf(artist, "youtube").avatar,
							size: 40
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-center gap-1 text-sm font-medium",
								children: [artist?.name, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VerifiedBadge, { on: artist?.verified.youtube })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-xs text-white/45",
								children: [compact(artist?.followers.youtube ?? 0), " subscribers"]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "rounded-full bg-white px-3 py-1.5 text-xs text-black",
							children: "Subscribe"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 flex gap-2 overflow-x-auto text-xs text-white/70",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThumbsUp, { className: "size-3.5" }),
								" ",
								compact(video.likes)
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1.5",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThumbsDown, { className: "size-3.5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, { className: "size-3.5" }), " Share"]
						}),
						feat ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "rounded-full bg-white/10 px-3 py-1.5",
							children: ["feat. ", feat]
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "rounded-full bg-white/10 px-3 py-1.5",
							children: kindLabel(video.kind)
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 rounded-xl bg-white/8 px-3 py-2 text-sm text-white/70",
					children: song ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						kindLabel(video.kind),
						" for “",
						song.title,
						"” · ",
						creditLine(game, song)
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-xs text-white/45",
						children: [
							compact(song.streams),
							" streams",
							song.chart ? ` · Billboard #${song.chart}` : ""
						]
					})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [artist?.name, " on YouTube."] })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-4 text-sm font-medium",
					children: [compact(video.comments || comments.length), " comments"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-2 grid gap-3",
					children: comments.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-white/80",
							children: c.text
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-0.5 text-[11px] text-white/35",
							children: [compact(c.likes), " likes"]
						})]
					}, c.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-5 text-sm font-medium",
					children: "Up next"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-2 grid gap-3",
					children: related.map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VideoCard, {
						video: v,
						layout: "row"
					}) }, v.id))
				})
			]
		})]
	});
}
function Live() {
	const game = useGame((s) => s.game);
	const live = useGame((s) => s.live);
	const you = rosterOf(game)[0];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid h-full place-items-center px-6 text-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radio, { className: "mx-auto size-8 text-[#ff0000]" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 font-display text-2xl",
				children: "Go live"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 text-sm text-white/50",
				children: [
					"Viewers ≈ subscribers × 1–6%. Last stream: ",
					compact(game.liveViewers.youtube),
					" watching."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrimaryBtn, {
				className: "mt-4",
				disabled: !you,
				onClick: () => you && live(you.id, "youtube"),
				children: "Start stream"
			})
		] })
	});
}
function Scout() {
	const game = useGame((s) => s.game);
	const setOverlay = useGame((s) => s.setOverlay);
	const sign = useGame((s) => s.sign);
	const scout = useGame((s) => s.scout);
	const prospects = unsignedProspects(game).slice(0, 12);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-40 grid place-items-end bg-bg/70 p-0 md:place-items-center md:p-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex max-h-[92dvh] w-full max-w-3xl flex-col rounded-t-xl border border-border bg-surface md:rounded-xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex items-center justify-between gap-3 border-b border-border px-4 py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-xl",
					children: "A&R"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted",
					children: "Stats you can see. Potential you can miss."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GhostBtn, {
						onClick: scout,
						children: ["Refresh · ", money(2500)]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "grid size-11 place-items-center rounded-md hover:bg-subtle",
						onClick: () => setOverlay({ type: "none" }),
						"aria-label": "Close",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" })
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "overflow-auto p-4",
				children: [
					game.pendingAudition && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-4 rounded-xl border border-border bg-elevated p-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-medium",
								children: "Audition room"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted",
								children: "Pick one. The others go home."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-2 flex flex-wrap gap-2",
								children: game.pendingAudition.names.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrimaryBtn, {
									onClick: () => useGame.getState().pickFromAudition(n),
									children: n
								}, n))
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mb-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GhostBtn, {
							onClick: () => useGame.getState().audition(),
							children: "Book auditions · $3,500"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "grid gap-3",
						children: prospects.map((a) => {
							const cost = signCost(a);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "rounded-lg border border-border bg-elevated p-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex gap-3",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArtistAvatar, {
												spec: a.avatar,
												size: 48
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "min-w-0 flex-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex flex-wrap items-center gap-2",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
															className: "font-medium",
															children: a.name
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, { children: genreLabel(a.genre) }),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, { children: a.kind })
													]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
													className: "text-xs text-muted",
													children: [
														a.hometown,
														" · TikTok ",
														compact(a.followers.tiktok),
														" · fame ",
														Math.round(a.fame)
													]
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrimaryBtn, {
												onClick: () => sign(a.id),
												children: money(cost.advance)
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 text-sm text-muted",
										children: a.bio
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-3 grid grid-cols-3 gap-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meter, {
												label: "Vocals",
												value: a.stats.vocals
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meter, {
												label: "Writing",
												value: a.stats.writing
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meter, {
												label: "Social",
												value: a.stats.social
											})
										]
									})
								]
							}, a.id);
						})
					})
				]
			})]
		})
	});
}
function ArtistModal({ id }) {
	const game = useGame((s) => s.game);
	const setOverlay = useGame((s) => s.setOverlay);
	const setView = useGame((s) => s.setView);
	const startRecord = useGame((s) => s.startRecord);
	const a = game.artists.find((x) => x.id === id);
	if (!a) return null;
	const songs = game.songs.filter((s) => s.artistId === a.id);
	const mine = isControlled(game, a);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-40 grid place-items-end bg-bg/70 md:place-items-center md:p-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-h-[92dvh] w-full max-w-lg overflow-auto rounded-t-xl border border-border bg-surface p-5 md:rounded-xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArtistAvatar, {
							spec: a.avatar,
							size: 56
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "flex items-center gap-1.5 font-display text-2xl",
							children: [a.name, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VerifiedBadge, { on: a.verified.x || a.verified.tiktok || a.verified.spotify })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-muted",
							children: [
								"@",
								a.handle,
								" · ",
								genreLabel(a.genre),
								" · pop ",
								Math.round(a.popularity)
							]
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "grid size-11 place-items-center rounded-md hover:bg-subtle",
						onClick: () => setOverlay({ type: "none" }),
						"aria-label": "Close",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm text-muted",
					children: a.bio
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 grid grid-cols-2 gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meter, {
							label: "Vocals",
							value: a.stats.vocals
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meter, {
							label: "Writing",
							value: a.stats.writing
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meter, {
							label: "Charisma",
							value: a.stats.charisma
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meter, {
							label: "Looks",
							value: a.stats.looks
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meter, {
							label: "Work ethic",
							value: a.stats.workEthic
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meter, {
							label: "Social instinct",
							value: a.stats.social
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 grid grid-cols-2 gap-2 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "flex items-center gap-1 text-muted",
							children: [
								"TikTok ",
								compact(a.followers.tiktok),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VerifiedBadge, {
									on: a.verified.tiktok,
									size: 12
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "flex items-center gap-1 text-muted",
							children: [
								"X ",
								compact(a.followers.x),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VerifiedBadge, {
									on: a.verified.x,
									size: 12
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "flex items-center gap-1 text-muted",
							children: [
								"Instagram ",
								compact(a.followers.instagram),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VerifiedBadge, {
									on: a.verified.instagram,
									size: 12
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "flex items-center gap-1 text-muted",
							children: [
								"Spotify ",
								compact(a.monthlyListeners),
								" /mo",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VerifiedBadge, {
									on: a.verified.spotify,
									size: 12,
									className: "text-wave"
								})
							]
						})
					]
				}),
				mine && game.career === "label" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 text-xs text-muted",
					children: [
						"Wage ",
						money(a.wage),
						" · ",
						Math.round(a.royalty * 100),
						"% artist share"
					]
				}),
				songs.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-4 grid gap-1 text-sm",
					children: songs.map((s) => {
						const guest = s.collabArtistId ? game.artists.find((x) => x.id === s.collabArtistId) : null;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								s.title,
								guest ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-muted",
									children: [" feat. ", guest.name]
								}) : null,
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
									className: "ml-1",
									children: s.status
								})
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "tabular-nums text-muted",
								children: compact(s.streams)
							})]
						}, s.id);
					})
				}),
				mine && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 flex flex-wrap gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrimaryBtn, {
							onClick: () => startRecord(a.id),
							children: "Book studio"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GhostBtn, {
							onClick: () => setOverlay({
								type: "wiki",
								artistId: a.id
							}),
							children: "Wiki"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GhostBtn, {
							onClick: () => setOverlay({
								type: "tiktok",
								tab: "create",
								artistId: a.id
							}),
							children: "TikTok"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GhostBtn, {
							onClick: () => setOverlay({
								type: "spotify",
								tab: "artist",
								artistId: a.id
							}),
							children: "Spotify"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GhostBtn, {
							onClick: () => setOverlay({
								type: "youtube",
								tab: "channel",
								artistId: a.id
							}),
							children: "YouTube"
						})
					]
				}),
				!mine && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 flex flex-wrap gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrimaryBtn, {
							onClick: () => setOverlay({
								type: "x",
								tab: "messages",
								threadId: a.id
							}),
							children: "DM for a collab"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GhostBtn, {
							onClick: () => setOverlay({
								type: "youtube",
								tab: "channel",
								artistId: a.id
							}),
							children: "YouTube"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GhostBtn, {
							onClick: () => setView("studio"),
							children: "Feature on a single"
						})
					]
				})
			]
		})
	});
}
function Rollout({ clipId }) {
	const game = useGame((s) => s.game);
	const setOverlay = useGame((s) => s.setOverlay);
	const rollout = game.lastRollout;
	const [shown, setShown] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		if (!rollout) return;
		setShown(0);
		const t = window.setInterval(() => {
			setShown((n) => {
				if (n >= rollout.stages.length) {
					window.clearInterval(t);
					return n;
				}
				return n + 1;
			});
		}, 420);
		return () => window.clearInterval(t);
	}, [rollout]);
	if (!rollout || rollout.clipId !== clipId) return null;
	const done = shown >= rollout.stages.length;
	const tone = rollout.verdict === "flop" ? "bad" : rollout.verdict === "solid" ? "default" : "viral";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-50 grid place-items-center bg-bg/80 p-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-md rounded-xl border border-border bg-surface p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs tracking-[0.18em] text-muted uppercase",
					children: "For You rollout"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-1 font-display text-2xl",
					children: "The page is testing the clip"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "mt-4 grid gap-2",
					children: rollout.stages.slice(0, shown).map((st, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "rounded-md bg-subtle px-3 py-2 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: st.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "tabular-nums text-muted",
								children: compact(st.views)
							})]
						}), !st.passed && st.reason ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-bad",
							children: st.reason
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-good",
							children: "Cleared. Pushing wider."
						})]
					}, i))
				}),
				done && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 grid gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
								tone: tone === "viral" ? "viral" : tone === "bad" ? "bad" : "mint",
								children: rollout.verdict
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "tabular-nums text-sm",
								children: [compact(rollout.totalViews), " views"]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: rollout.tip
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted",
							children: [
								"+",
								compact(rollout.followersGained),
								" TikTok · +",
								compact(rollout.xGained ?? 0),
								" X · +",
								compact(rollout.instagramGained ?? 0),
								" Instagram · +",
								compact(rollout.spotifyGained ?? 0),
								" Spotify · +",
								compact(rollout.streamsGained),
								" streams"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrimaryBtn, {
							onClick: () => setOverlay({
								type: "tiktok",
								tab: "home"
							}),
							children: "Watch it on For You"
						})
					]
				})
			]
		})
	});
}
function MailScreen() {
	const game = useGame((s) => s.game);
	const openMail = useGame((s) => s.openMail);
	const [id, setId] = (0, import_react.useState)(game.mail?.[0]?.id ?? null);
	const unread = unreadMail(game);
	const selected = (game.mail ?? []).find((m) => m.id === id) ?? game.mail?.[0];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto grid max-w-4xl gap-4 p-4 md:p-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-3xl",
			children: "Inbox"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "text-sm text-muted",
			children: [unread, " unread. Labels, film reads, legal, beat packs, business only. Family hits a toast."]
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 md:grid-cols-[16rem_1fr]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "grid max-h-[70vh] gap-1 overflow-auto",
				children: !game.mail || game.mail.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "Empty. Advance a week."
				}) : game.mail.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => {
						setId(m.id);
						openMail(m.id);
					},
					className: `flex min-h-12 w-full flex-col rounded-lg px-3 py-2 text-left text-sm ${selected?.id === m.id ? "bg-accent/15" : "bg-subtle"}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: m.read ? "text-muted" : "font-medium",
							children: m.from
						}), !m.read ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
							tone: "mint",
							children: "new"
						}) : null]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "truncate text-xs text-muted",
						children: m.subject
					})]
				}) }, m.id))
			}), selected ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
				title: selected.subject,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs text-muted",
					children: [
						selected.from,
						" · ",
						selected.kind,
						" · ",
						weekLabel(selected.week)
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm leading-relaxed",
					children: selected.body
				})]
			}) : null]
		})]
	});
}
function HollywoodScreen() {
	const game = useGame((s) => s.game);
	const film = useGame((s) => s.film);
	const you = playerArtist(game);
	const box = [...game.films].filter((f) => f.status === "released").sort((a, b) => (a.boxRank ?? 99) - (b.boxRank ?? 99));
	const ost = game.songs.filter((s) => s.ost && s.status === "released").sort((a, b) => b.streamsWeek - a.streamsWeek);
	const slate = (game.films ?? []).filter((f) => f.status === "pre");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto grid max-w-4xl gap-4 p-4 md:p-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl",
				children: "Hollywood"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "Cameos, supporting, leads, voice, OST. The slate refreshes with new titles. Fame gates the room."
			})] }),
			slate.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: "This week's slate",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "grid gap-2",
					children: slate.map((f) => {
						const need = f.fameNeed ?? 16;
						const locked = (you?.fame ?? 0) < need;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex flex-wrap items-center justify-between gap-2 rounded-lg bg-subtle px-3 py-2 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [f.title, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-muted",
								children: [
									" ",
									"· ",
									f.studio,
									" · ",
									f.role,
									f.ostOffer ? " · OST" : "",
									" · ",
									money(f.pay),
									" · fame ",
									need
								]
							})] }), locked ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Pill, { children: ["fame ", need] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GhostBtn, {
								onClick: () => film(f.catalogId),
								children: "Audition"
							})]
						}, f.id);
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: "Standing scripts",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "grid gap-2",
					children: FILMS.map((f) => {
						const locked = (you?.fame ?? 0) < f.fameNeed;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex flex-wrap items-center justify-between gap-2 rounded-lg bg-subtle px-3 py-2 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [f.title, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-muted",
								children: [
									" ",
									"· ",
									f.studio,
									" · ",
									f.role,
									f.ost ? " · OST" : "",
									" · ",
									money(f.pay),
									" · fame ",
									f.fameNeed
								]
							})] }), locked ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Pill, { children: ["fame ", f.fameNeed] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GhostBtn, {
								onClick: () => film(f.id),
								children: "Audition"
							})]
						}, f.id);
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: "Box office",
				children: box.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "No pictures in theaters."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "grid gap-1 text-sm",
					children: box.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							"#",
							f.boxRank,
							" ",
							f.title,
							f.role !== "none" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-muted",
								children: [" · you · ", f.role]
							}) : null
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "tabular-nums text-muted",
							children: [
								money(f.grossWeek),
								" wk · ",
								money(f.gross),
								" cume"
							]
						})]
					}, f.id))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: "Soundtrack chart",
				children: ost.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "No OST singles this week."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "grid gap-1 text-sm",
					children: ost.slice(0, 20).map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							"#",
							i + 1,
							" ",
							s.title
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "tabular-nums text-muted",
							children: [Math.round(s.streamsWeek).toLocaleString("en-US"), " streams"]
						})]
					}, s.id))
				})
			}),
			game.films.some((f) => f.artistId && f.status === "shooting") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: "On set",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "grid gap-1 text-sm",
					children: game.films.filter((f) => f.artistId && f.status === "shooting").map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
						f.title,
						" · ",
						f.weeksLeft,
						" weeks left · ",
						f.role
					] }, f.id))
				})
			})
		]
	});
}
function LegalScreen() {
	const game = useGame((s) => s.game);
	const openCheckout = useGame((s) => s.openCheckout);
	const journal = useGame((s) => s.journal);
	const you = playerArtist(game);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto grid max-w-4xl gap-4 p-4 md:p-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl",
				children: "Legal"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "Fights, DUI, contraband, fraud. Hire counsel, post bail, or sit the weeks and write from inside."
			})] }),
			you && you.incarceratedWeeks > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
				className: "border-bad/30",
				title: `Inside · ${you.incarceratedWeeks} weeks`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-muted",
					children: [
						"Street cred ",
						Math.round(you.streetCred),
						". The booth still works."
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrimaryBtn, {
					className: "mt-3",
					onClick: journal,
					children: "Write a prison journal"
				})]
			}),
			game.legal.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "Clean docket. Don't give them a reason."
			}) : game.legal.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
				title: `${c.kind} · ${c.status}`,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: c.note
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-xs text-muted",
						children: [
							"Bail ",
							money(c.bail),
							" · fine ",
							money(c.fine),
							" · ",
							c.weeksLeft,
							" weeks on the clock"
						]
					}),
					c.status !== "cleared" && c.status !== "jailed" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 flex flex-wrap gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrimaryBtn, {
							onClick: () => openCheckout({
								kind: "bail",
								id: c.id,
								title: `Bail · ${c.kind}`,
								price: c.bail
							}),
							children: "Post bail"
						}), LAWYERS.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GhostBtn, {
							onClick: () => openCheckout({
								kind: "lawyer",
								id: l.id,
								title: `${l.name} · ${c.kind}`,
								price: l.cost,
								extra: {
									caseId: c.id,
									lawyerId: l.id
								}
							}),
							children: [
								l.name,
								" · ",
								l.cost ? money(l.cost) : "free"
							]
						}, l.id))]
					})
				]
			}, c.id))
		]
	});
}
function HealthScreen() {
	const game = useGame((s) => s.game);
	const openCheckout = useGame((s) => s.openCheckout);
	const you = playerArtist(game);
	if (!you) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "p-6 text-sm text-muted",
		children: "Artist career."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto grid max-w-3xl gap-4 p-4 md:p-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl",
				children: "Health"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "Energy, vocal, mental. Substances boost the session then bill you in crashes, leaks, and court."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meter, {
						label: "Energy",
						value: you.energy
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meter, {
						label: "Vocal health",
						value: you.vocalHealth
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meter, {
						label: "Mental",
						value: you.mental
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meter, {
						label: "Alcohol",
						value: you.addiction.alcohol
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meter, {
						label: "Pills",
						value: you.addiction.pills
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meter, {
						label: "Smoke",
						value: you.addiction.smoke
					})
				]
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: "Use",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-2",
					children: SUBSTANCES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GhostBtn, {
						onClick: () => openCheckout({
							kind: "substance",
							id: s.id,
							title: s.name,
							price: s.cost
						}),
						children: [
							s.name,
							" · ",
							money(s.cost)
						]
					}, s.id))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: "Rehab",
				children: you.rehabWeeks > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm",
					children: [you.rehabWeeks, " weeks left in the house."]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrimaryBtn, {
					onClick: () => openCheckout({
						kind: "rehab",
						id: "rehab",
						title: "Serenity Hills rehab",
						price: 48e3
					}),
					children: "Check in · $48k · 4 weeks"
				})
			})
		]
	});
}
function NightlifeScreen() {
	const game = useGame((s) => s.game);
	const openCheckout = useGame((s) => s.openCheckout);
	const you = playerArtist(game);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto grid max-w-4xl gap-4 p-4 md:p-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl",
				children: "Nightlife"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "Click a room. VIP tables, high-roller suites, afterparties. Bottle service runs $12k–$100k on top."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-3 sm:grid-cols-2",
				children: NIGHTLIFE.map((n) => {
					const locked = (you?.fame ?? 0) < n.fameNeed;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						disabled: locked,
						onClick: () => openCheckout({
							kind: "night",
							id: n.id,
							title: n.name,
							price: n.cost
						}),
						className: "min-h-24 rounded-xl border border-border bg-surface p-4 text-left hover:bg-elevated disabled:opacity-40",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-xl",
							children: n.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-sm text-muted",
							children: [
								money(n.cost),
								" · fame ",
								n.fameNeed,
								n.city !== "any" ? ` · ${n.city}` : "",
								locked ? " · locked" : ""
							]
						})]
					}, n.id);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
				title: "Bottle service",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-2 text-sm text-muted",
					children: "Ace of Spades through six-figure Nebuchadnezzars. The table photographs itself."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "grid gap-2",
					children: BOTTLES.map((b) => {
						const locked = (you?.fame ?? 0) < b.fameNeed;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex flex-wrap items-center justify-between gap-2 rounded-lg bg-subtle px-3 py-2 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [b.name, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-muted",
								children: [" · ", money(b.cost)]
							})] }), locked ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Pill, { children: ["fame ", b.fameNeed] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GhostBtn, {
								onClick: () => openCheckout({
									kind: "bottle",
									id: b.id,
									title: b.name,
									price: b.cost
								}),
								children: "Order"
							})]
						}, b.id);
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
				title: "Private buyouts",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-2 text-sm text-muted",
					children: "Rent the zoo, the park, the water park. $250k and up. Family only."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "grid gap-2",
					children: LUXURY_DAYS.map((d) => {
						const locked = (you?.fame ?? 0) < d.fameNeed;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex flex-wrap items-center justify-between gap-2 rounded-lg bg-subtle px-3 py-2 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [d.name, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-muted",
								children: [
									" ",
									"· ",
									money(d.cost),
									" · fame ",
									d.fameNeed
								]
							})] }), locked ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Pill, { children: ["fame ", d.fameNeed] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrimaryBtn, {
								onClick: () => openCheckout({
									kind: "luxury",
									id: d.id,
									title: d.name,
									price: d.cost
								}),
								children: "Buy the day"
							})]
						}, d.id);
					})
				})]
			})
		]
	});
}
function EntourageBlock() {
	const game = useGame((s) => s.game);
	const crew = useGame((s) => s.crew);
	const setCrew = useGame((s) => s.setCrew);
	const openCheckout = useGame((s) => s.openCheckout);
	const fame = playerArtist(game)?.fame ?? 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
			title: "Entourage",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-2",
				children: ENT_ROLES.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GhostBtn, {
					onClick: () => crew(r.id, !game.entourage?.[r.id]),
					children: [
						r.name,
						" · ",
						game.entourage?.[r.id] ? "on" : "off",
						" · ",
						money(r.weekly),
						"/wk"
					]
				}, r.id))
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
			title: "Jets",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "grid gap-2",
				children: JETS.map((j) => {
					const owned = game.jets.some((x) => x.catalogId === j.id);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex flex-wrap items-center justify-between gap-2 rounded-lg bg-subtle px-3 py-2 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [j.name, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-muted",
							children: [" · ", money(j.price)]
						})] }), owned ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
							tone: "mint",
							children: "owned"
						}) : fame < j.fameNeed ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Pill, { children: ["fame ", j.fameNeed] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GhostBtn, {
							onClick: () => openCheckout({
								kind: "jet",
								id: j.id,
								title: j.name,
								price: j.price,
								financeable: true,
								leasable: true
							}),
							children: "Buy"
						})]
					}, j.id);
				})
			})
		}),
		game.jets.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
			title: "Flight department",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-muted",
				children: [
					game.jetCrew?.pilots ?? 0,
					" pilots · ",
					game.jetCrew?.attendants ?? 0,
					" attendants ·",
					" ",
					money((game.jetCrew?.pilots ?? 0) * 4e3 + (game.jetCrew?.attendants ?? 0) * 2200),
					"/wk"
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 flex flex-wrap gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GhostBtn, {
						onClick: () => setCrew(1, 1),
						children: "1 pilot · 1 attendant"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GhostBtn, {
						onClick: () => setCrew(2, 2),
						children: "2 · 2"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GhostBtn, {
						onClick: () => setCrew(2, 4),
						children: "Long-range crew"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GhostBtn, {
						onClick: () => setCrew(0, 0),
						children: "Park it"
					})
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
			title: "Jewelry",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "grid gap-2",
				children: JEWELRY.map((j) => {
					const owned = game.jewelry.some((x) => x.catalogId === j.id);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex flex-wrap items-center justify-between gap-2 rounded-lg bg-subtle px-3 py-2 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [j.name, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-muted",
							children: [" · ", money(j.price)]
						})] }), owned ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
							tone: "mint",
							children: "owned"
						}) : fame < j.fameNeed ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Pill, { children: ["fame ", j.fameNeed] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GhostBtn, {
							onClick: () => openCheckout({
								kind: "jewelry",
								id: j.id,
								title: j.name,
								price: j.price
							}),
							children: "Buy"
						})]
					}, j.id);
				})
			})
		})
	] });
}
function GiftRow() {
	const openCheckout = useGame((s) => s.openCheckout);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mt-3 flex flex-wrap gap-2",
		children: GIFTS.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GhostBtn, {
			onClick: () => openCheckout({
				kind: "gift",
				id: g.id,
				title: g.name,
				price: g.cost
			}),
			children: [
				g.name,
				" · ",
				money(g.cost)
			]
		}, g.id))
	});
}
function ToursScreen() {
	const game = useGame((s) => s.game);
	const tour = useGame((s) => s.tour);
	const tourStops = useGame((s) => s.tourStops);
	const festival = useGame((s) => s.festival);
	const euro = useGame((s) => s.euro);
	const roster = rosterOf(game);
	const [name, setName] = (0, import_react.useState)("World run");
	const [n, setN] = (0, import_react.useState)(4);
	const [picked, setPicked] = (0, import_react.useState)([]);
	const [sort, setSort] = (0, import_react.useState)("asc");
	const [region, setRegion] = (0, import_react.useState)("all");
	const a = roster[0];
	if (a) syncPopularity(a);
	const venues = VENUES.filter((v) => region === "all" || v.region === region).slice().sort((x, y) => sort === "asc" ? x.capacity - y.capacity : y.capacity - x.capacity);
	const toggle = (id) => setPicked((p) => p.includes(id) ? p.filter((x) => x !== id) : [...p, id]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto grid max-w-4xl gap-4 p-4 md:p-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl",
				children: "Tours"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "Clubs to stadiums. Sorted by how many people fit. Fill estimate uses popularity, monthly listeners, and fame."
			}),
			a && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
				title: "Arrange a tour",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mb-2 text-xs text-muted",
					children: [
						a.name,
						" · popularity ",
						Math.round(a.popularity),
						" · ",
						compact(a.monthlyListeners),
						" monthly"
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: name,
							onChange: (e) => setName(e.target.value),
							className: "h-11 min-w-40 flex-1 rounded-md border border-border bg-elevated px-3 text-sm"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							value: n,
							onChange: (e) => setN(Number(e.target.value)),
							className: "h-11 rounded-md border border-border bg-elevated px-2 text-sm",
							children: [
								3,
								4,
								6,
								8,
								12
							].map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
								value: x,
								children: [x, " auto rooms"]
							}, x))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrimaryBtn, {
							onClick: () => tour(a.id, name, n),
							children: "Book fillable rooms"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GhostBtn, {
							disabled: !picked.length,
							onClick: () => tourStops(a.id, name, picked),
							children: [
								"Book selected (",
								picked.length,
								")"
							]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
				title: "Rooms",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-3 flex flex-wrap gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setSort(sort === "asc" ? "desc" : "asc"),
							className: "min-h-10 rounded-full bg-subtle px-3 text-xs",
							children: ["Capacity ", sort === "asc" ? "small → large" : "large → small"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setRegion("all"),
							className: `min-h-10 rounded-full px-3 text-xs ${region === "all" ? "bg-accent text-accent-fg" : "bg-subtle"}`,
							children: "All regions"
						}),
						REGIONS.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setRegion(r.id),
							className: `min-h-10 rounded-full px-3 text-xs ${region === r.id ? "bg-accent text-accent-fg" : "bg-subtle"}`,
							children: r.label
						}, r.id))
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "grid max-h-[28rem] gap-2 overflow-auto",
					children: venues.map((v) => {
						const draw = a ? venueDraw(a, v.capacity) : {
							fill: 0,
							canFill: false,
							note: "—",
							attendance: 0
						};
						const on = picked.includes(v.id);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => toggle(v.id),
							className: `flex w-full flex-wrap items-center justify-between gap-2 rounded-lg px-3 py-2 text-left text-sm ${on ? "bg-accent/15" : "bg-subtle"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [v.name, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-muted",
								children: [
									" ",
									"· ",
									v.city,
									" · ",
									compact(v.capacity),
									" cap · ",
									money(v.ticket)
								]
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "tabular-nums text-xs text-muted",
									children: compact(draw.attendance)
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
									tone: draw.canFill ? "mint" : draw.fill >= .4 ? "default" : "bad",
									children: draw.note
								})]
							})]
						}) }, v.id);
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
				title: "Eurovision",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: "Enter if you're not a US act. Auto-sim the televote."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrimaryBtn, {
						className: "mt-2",
						onClick: euro,
						children: "Enter Eurovision"
					}),
					game.eurovision?.entered ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-sm",
						children: [
							game.eurovision.year,
							" · ",
							game.eurovision.place === 1 ? "Winner" : `#${game.eurovision.place}`
						]
					}) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: "Festivals",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "grid gap-2",
					children: FESTIVALS.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex flex-wrap items-center justify-between gap-2 rounded-lg bg-subtle px-3 py-2 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [f.name, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-muted",
							children: [
								" ",
								"· ",
								f.city,
								" · ",
								compact(f.capacity)
							]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GhostBtn, {
							onClick: () => a && festival(a.id, f.id),
							children: ["Play · fee ", money(f.fee)]
						})]
					}, f.id))
				})
			}),
			game.tours.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: `${t.name} · ${t.status}`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "grid gap-1 text-sm",
					children: t.stops.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: s.done ? "text-muted" : "",
							children: [
								"w",
								s.week,
								" · ",
								s.venue,
								", ",
								s.city
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "tabular-nums text-muted",
							children: [
								compact(s.attendance),
								"/",
								compact(s.capacity),
								s.canFill ? "" : " · short",
								" · ",
								money(s.gross)
							]
						})]
					}, s.id))
				})
			}, t.id))
		]
	});
}
function PromoScreen() {
	const game = useGame((s) => s.game);
	const promo = useGame((s) => s.promo);
	const radio = useGame((s) => s.radio);
	const playlist = useGame((s) => s.playlist);
	const songs = playerSongs(game).filter((s) => s.status === "released");
	const [songId, setSongId] = (0, import_react.useState)(songs[0]?.id ?? "");
	const [platform, setPlatform] = (0, import_react.useState)("tiktok");
	const [budget, setBudget] = (0, import_react.useState)(2500);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto grid max-w-3xl gap-4 p-4 md:p-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl",
				children: "Promotion"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "Boosting a song on an app adds heat. Without heat, weekly streams collapse."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, { children: songs.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "Release first."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						value: songId,
						onChange: (e) => setSongId(e.target.value),
						className: "h-11 rounded-md border border-border bg-elevated px-2 text-sm",
						children: songs.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
							value: s.id,
							children: [
								s.title,
								" · heat ",
								Math.round(s.promoHeat),
								" · ",
								compact(s.streamsWeek),
								" /wk"
							]
						}, s.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-2",
						children: [
							"tiktok",
							"x",
							"instagram",
							"youtube",
							"spotify",
							"radio",
							"tv",
							"press",
							"reddit"
						].map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setPlatform(p),
							className: `rounded-full px-3 py-1.5 text-xs ${platform === p ? "bg-accent text-accent-fg" : "bg-subtle"}`,
							children: p === "tiktok" ? "TikTok" : p === "x" ? "X" : p === "instagram" ? "Instagram" : p === "youtube" ? "YouTube" : p === "spotify" ? "Spotify" : p
						}, p))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "text-xs text-muted",
						children: [
							"Budget $",
							budget.toLocaleString("en-US"),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "range",
								min: 500,
								max: 5e4,
								step: 500,
								value: budget,
								onChange: (e) => setBudget(Number(e.target.value)),
								className: "mt-1 w-full"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrimaryBtn, {
								onClick: () => songId && promo(songId, platform, budget),
								children: "Run campaign"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GhostBtn, {
								onClick: () => songId && radio(songId),
								children: "Radio add"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GhostBtn, {
								onClick: () => songId && playlist(songId),
								children: "Spotify pitch"
							})
						]
					})
				]
			}) }),
			game.campaigns.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: "Active",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "grid gap-2 text-sm",
					children: game.campaigns.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							c.platform,
							" · ",
							game.songs.find((s) => s.id === c.songId)?.title
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-muted",
							children: [
								money(c.budget),
								" · ",
								c.weeksLeft,
								"w"
							]
						})]
					}, c.id))
				})
			})
		]
	});
}
function AwardsScreen() {
	const game = useGame((s) => s.game);
	const setOverlay = useGame((s) => s.setOverlay);
	const live = game.ceremony && !game.ceremony.done;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto grid max-w-3xl gap-4 p-4 md:p-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl",
				children: "Awards"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "Calendar weeks trigger Grammys, BRITs, Billboard, BET, VMAs. Skip a category or the whole show — hardware still prints."
			}),
			live ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
				title: `${game.ceremony.show} is live`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "The envelope is on the table."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrimaryBtn, {
					className: "mt-3",
					onClick: () => setOverlay({ type: "ceremony" }),
					children: "Open telecast"
				})]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, { children: game.awards.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "No hardware yet. Chart, then wait for the telecast."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "grid gap-3",
				children: game.awards.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-medium",
					children: a.show
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-muted",
					children: [
						a.category,
						" · week ",
						a.week,
						" · ",
						game.songs.find((s) => s.id === a.songId)?.title
					]
				})] }, a.id))
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: "Calendar",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "grid gap-1 text-sm",
					children: AWARD_CALENDAR.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: a.show }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-muted",
							children: [
								"week ",
								a.weekOfYear,
								" of the year"
							]
						})]
					}, a.show))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: "Categories",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "grid gap-1 text-sm",
					children: AWARDS.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: a.show }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted",
							children: a.category
						})]
					}, a.id))
				})
			})
		]
	});
}
function BankScreen() {
	const game = useGame((s) => s.game);
	const loan = useGame((s) => s.loan);
	const card = useGame((s) => s.card);
	const saveBank = useGame((s) => s.saveBank);
	const takeBank = useGame((s) => s.takeBank);
	const black = useGame((s) => s.black);
	const toggleAutopay = useGame((s) => s.toggleAutopay);
	const [amount, setAmount] = (0, import_react.useState)(25e3);
	const score = Math.round(game.creditScore);
	const band = creditBand(score);
	const houseQ = mortgageQuote(game, 54e4);
	const carQ = autoQuote(game, 41800, "loan");
	const leaseQ = autoQuote(game, 41800, "lease");
	const used = game.cards.reduce((n, c) => n + c.used, 0);
	const limits = game.cards.reduce((n, c) => n + (c.black ? 0 : c.limit), 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto grid max-w-4xl gap-4 p-4 md:p-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl",
				children: "Bank"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-muted",
				children: [
					"FICO ",
					score,
					" · ",
					band.label,
					". Debit is checking. Credit limits, mortgages, auto loans and leases all move with the score — same as a real desk. Miss payments and it falls. On-time lifts it."
				]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 sm:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted",
							children: ["FICO · ", band.label]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-3xl tabular-nums",
							children: score
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meter, { value: (score - 300) / 550 * 100 }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-xs text-muted",
							children: band.copy
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted",
							children: "Debit / checking"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-3xl tabular-nums",
							children: money(game.cash)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 text-xs text-muted",
							children: [
								"HYSA ",
								money(game.savings ?? 0),
								" · ",
								game.savingsApr,
								"% APY"
							]
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted",
							children: "Credit used"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-3xl tabular-nums",
							children: money(used)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 text-xs text-muted",
							children: [
								game.cards.some((c) => c.black) ? "Black on file · " : "",
								"limits ",
								money(limits),
								" · loans",
								" ",
								money(game.loans.reduce((n, l) => n + l.remaining, 0))
							]
						})
					] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: "What this score can do",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "grid gap-2 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Mortgage (Midtown condo example)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "tabular-nums text-muted",
								children: houseQ.allowed ? `${Math.round(houseQ.minDownPct * 100)}% down · ${houseQ.apr.toFixed(2)}% · ${money(houseQ.weekly)}/wk` : houseQ.reason
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Auto finance (Model 3)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "tabular-nums text-muted",
								children: carQ.allowed ? `${Math.round(carQ.minDownPct * 100)}% down · ${carQ.apr.toFixed(2)}%` : carQ.reason
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Auto lease" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "tabular-nums text-muted",
								children: leaseQ.allowed ? `${leaseQ.apr.toFixed(2)}% · ${money(leaseQ.weekly)}/wk` : leaseQ.reason
							})]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
				title: "Weekly autopay",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "Pull the statement from checking every week so you never miss a minimum. On-time lifts FICO."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrimaryBtn, {
					className: "mt-3",
					onClick: toggleAutopay,
					children: game.cardAutopay ? "Autopay on" : "Autopay off"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
				title: "Savings & Black",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-muted",
					children: [
						"HYSA ",
						game.savingsApr,
						"% APY · balance ",
						money(game.savings ?? 0),
						". Onyx Black needs FICO 760 and either $2M liquid or 80 fame."
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 flex flex-wrap gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GhostBtn, {
							onClick: () => saveBank(5e3),
							children: "Deposit $5,000"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GhostBtn, {
							onClick: () => saveBank(25e3),
							children: "Deposit $25,000"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GhostBtn, {
							onClick: () => takeBank(Math.min(game.savings ?? 0, 5e3)),
							children: "Withdraw $5,000"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrimaryBtn, {
							disabled: game.blackCard,
							onClick: black,
							children: game.blackCard ? "Black card live" : "Apply for Black"
						})
					]
				})]
			}),
			BANKS.map((b) => {
				const apr = aprForScore(b.personalApr, score);
				const locked = score < b.minScore;
				const maxLoan = personalLoanMax(game, b.id);
				const limit = cardLimitForScore(score, b.id);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
					title: b.name,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: b.note
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 text-xs text-muted",
							children: [
								"Personal ",
								b.personalApr[0],
								"–",
								b.personalApr[1],
								"% · Mortgage ",
								b.mortgageApr[0],
								"–",
								b.mortgageApr[1],
								"% · Card",
								" ",
								b.cardApr[0],
								"–",
								b.cardApr[1],
								"% · min FICO ",
								b.minScore
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-sm",
							children: [
								"Your personal APR today: ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "tabular-nums",
									children: [apr.toFixed(2), "%"]
								}),
								" · ",
								"max unsecured ",
								money(maxLoan),
								" · card limit ",
								money(limit)
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 flex flex-wrap items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "number",
									min: 1e3,
									step: 1e3,
									value: amount,
									onChange: (e) => setAmount(Number(e.target.value)),
									className: "h-11 w-32 rounded-md border border-border bg-elevated px-2 text-sm"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrimaryBtn, {
									disabled: locked,
									onClick: () => loan(b.id, amount, "personal"),
									children: "Personal loan"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GhostBtn, {
									disabled: locked,
									onClick: () => card(b.id),
									children: "Credit card"
								}),
								locked ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Pill, {
									tone: "bad",
									children: ["Need ", b.minScore]
								}) : null
							]
						})
					]
				}, b.id);
			}),
			game.loans.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: "Loans",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "grid gap-2 text-sm",
					children: game.loans.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							l.bankName,
							" · ",
							l.purpose,
							" · ",
							l.apr.toFixed(2),
							"%"
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "tabular-nums text-muted",
							children: [
								money(l.remaining),
								" · ",
								money(l.weeklyPayment),
								"/wk"
							]
						})]
					}, l.id))
				})
			}),
			game.cards.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: "Cards",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "grid gap-2 text-sm",
					children: game.cards.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							c.name,
							" · ",
							c.apr.toFixed(2),
							"%"
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "tabular-nums",
							children: [
								money(c.used),
								" / ",
								c.black ? "open" : money(c.limit)
							]
						})]
					}, c.id))
				})
			})
		]
	});
}
function LifeScreen() {
	const game = useGame((s) => s.game);
	const openCheckout = useGame((s) => s.openCheckout);
	const security = useGame((s) => s.security);
	const meetup = useGame((s) => s.meetup);
	const you = playerArtist(game) ?? rosterOf(game)[0];
	const fame = you?.fame ?? game.labelRep;
	const score = Math.round(game.creditScore);
	const band = creditBand(score);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto grid max-w-4xl gap-4 p-4 md:p-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl",
				children: "Lifestyle"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-muted",
				children: [
					"Houses, cars, jets, jewelry. Checkout asks debit, credit, or a split. Mortgages and auto finance/lease need the FICO — ",
					score,
					" ",
					band.label,
					" today. Worse credit means a bigger down payment, or cash only."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: `Security · ${game.securityGuards} on payroll`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-2",
					children: [[
						0,
						1,
						2,
						4,
						8
					].map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GhostBtn, {
						onClick: () => security(n),
						children: [
							n,
							" guards · ",
							money(n * 850),
							"/wk"
						]
					}, n)), you && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrimaryBtn, {
						onClick: () => meetup(you.id),
						children: "Fan meetup"
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EntourageBlock, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: "Houses",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "grid gap-2",
					children: HOUSES.map((h) => {
						const owned = game.houses.some((x) => x.catalogId === h.id);
						const mq = mortgageQuote(game, h.price);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex flex-wrap items-center justify-between gap-2 rounded-lg bg-subtle px-3 py-2 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [h.name, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-muted",
								children: [
									" ",
									"· ",
									h.city,
									" · ",
									h.beds,
									" bed · ",
									money(h.price),
									!owned && (mq.allowed ? ` · mortgage ${Math.round(mq.minDownPct * 100)}% down` : " · cash only")
								]
							})] }), owned ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
								tone: "mint",
								children: "owned"
							}) : fame < h.fameNeed ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Pill, { children: ["fame ", h.fameNeed] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GhostBtn, {
								onClick: () => openCheckout({
									kind: "house",
									id: h.id,
									title: h.name,
									price: h.price,
									financeable: true
								}),
								children: "Buy"
							})]
						}, h.id);
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: "Cars",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "grid gap-2",
					children: CARS.map((c) => {
						const owned = game.cars.some((x) => x.catalogId === c.id && !x.lease);
						const leased = game.cars.some((x) => x.catalogId === c.id && x.lease);
						const aq = autoQuote(game, c.price, "loan", c.id);
						const lq = autoQuote(game, c.price, "lease", c.id);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex flex-wrap items-center justify-between gap-2 rounded-lg bg-subtle px-3 py-2 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [c.name, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-muted",
								children: [
									" ",
									"· ",
									money(c.price),
									!owned && (aq.allowed ? ` · finance ${Math.round(aq.minDownPct * 100)}% down` : " · cash only"),
									!owned && lq.allowed ? " · lease open" : ""
								]
							})] }), owned ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
								tone: "mint",
								children: "owned"
							}) : fame < c.fameNeed ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Pill, { children: ["fame ", c.fameNeed] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex gap-2",
								children: [leased ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, { children: "leased" }) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GhostBtn, {
									onClick: () => openCheckout({
										kind: "car",
										id: c.id,
										title: c.name,
										price: c.price,
										financeable: true,
										leasable: c.id !== "tourbus"
									}),
									children: "Buy"
								})]
							})]
						}, c.id);
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: "Land · build from dirt",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "grid gap-2",
					children: LAND.map((lot) => {
						const owned = (game.lands ?? []).some((x) => x.catalogId === lot.id);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "rounded-lg bg-subtle px-3 py-2 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center justify-between gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [lot.name, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-muted",
									children: [
										" ",
										"· ",
										lot.city,
										" · ",
										money(lot.price)
									]
								})] }), owned ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
									tone: "mint",
									children: "owned"
								}) : fame < lot.fameNeed ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Pill, { children: ["fame ", lot.fameNeed] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GhostBtn, {
									onClick: () => openCheckout({
										kind: "land",
										id: lot.id,
										title: lot.name,
										price: lot.price,
										financeable: true
									}),
									children: "Buy lot"
								})]
							}), owned ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-2 flex flex-wrap gap-2",
								children: BUILD_OPTS.map((b) => {
									const job = (game.lands ?? []).find((x) => x.catalogId === lot.id);
									return (b.id === "studio" ? job.studioWing : job[b.id]) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
										tone: "mint",
										children: b.name
									}, b.id) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GhostBtn, {
										onClick: () => openCheckout({
											kind: "build",
											id: lot.id,
											title: b.name,
											price: b.cost,
											extra: { buildOpt: b.id }
										}),
										children: [
											b.name,
											" · ",
											money(b.cost)
										]
									}, b.id);
								})
							}) : null]
						}, lot.id);
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: "Private islands",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "grid gap-2",
					children: ISLANDS.map((isle) => {
						const owned = (game.islands ?? []).some((x) => x.catalogId === isle.id);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex flex-wrap items-center justify-between gap-2 rounded-lg bg-subtle px-3 py-2 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [isle.name, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-muted",
								children: [
									" ",
									"· ",
									isle.city,
									" · ",
									money(isle.price),
									" · ",
									money(isle.weekly),
									"/wk"
								]
							})] }), owned ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
								tone: "mint",
								children: "owned"
							}) : fame < isle.fameNeed ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Pill, { children: ["fame ", isle.fameNeed] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GhostBtn, {
								onClick: () => openCheckout({
									kind: "island",
									id: isle.id,
									title: isle.name,
									price: isle.price,
									financeable: true
								}),
								children: "Buy"
							})]
						}, isle.id);
					})
				})
			})
		]
	});
}
function MerchScreen() {
	const game = useGame((s) => s.game);
	const merchSite = useGame((s) => s.merchSite);
	const newMerch = useGame((s) => s.newMerch);
	const openCheckout = useGame((s) => s.openCheckout);
	const [name, setName] = (0, import_react.useState)("Tour tee");
	const [price, setPrice] = (0, import_react.useState)(35);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto grid max-w-3xl gap-4 p-4 md:p-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl",
				children: "Merch site"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: game.merchSiteLive ? `Live · ${compact(game.merchVisitsWeek)} visits this week` : "Offline. Flip it on to sell."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrimaryBtn, {
				onClick: merchSite,
				children: game.merchSiteLive ? "Pause site" : "Launch site"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: "Create SKU",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: name,
							onChange: (e) => setName(e.target.value),
							className: "h-11 flex-1 rounded-md border border-border bg-elevated px-3 text-sm"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "number",
							value: price,
							onChange: (e) => setPrice(Number(e.target.value)),
							className: "h-11 w-24 rounded-md border border-border bg-elevated px-2 text-sm"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GhostBtn, {
							onClick: () => newMerch(name, "tee", price),
							children: "Tee"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GhostBtn, {
							onClick: () => newMerch(name, "hoodie", price),
							children: "Hoodie"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GhostBtn, {
							onClick: () => newMerch(name, "vinyl", price),
							children: "Vinyl"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GhostBtn, {
							onClick: () => newMerch(name, "cd", price),
							children: "CD"
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: "Warehouse",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "grid gap-2 text-sm",
					children: game.merch.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-center justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							m.name,
							" · ",
							m.kind,
							" · ",
							money(m.price),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-muted",
								children: [
									" ",
									"· stock ",
									m.stock,
									" · sold ",
									m.sold
								]
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GhostBtn, {
							onClick: () => openCheckout({
								kind: "stock",
								id: m.id,
								title: `Restock ${m.name} × 30`,
								price: m.cost * 30,
								extra: { n: 30 }
							}),
							children: "Restock 30"
						})]
					}, m.id))
				})
			})
		]
	});
}
function FamilyScreen() {
	const game = useGame((s) => s.game);
	const startDate = useGame((s) => s.startDate);
	const openCheckout = useGame((s) => s.openCheckout);
	const doIntimacy = useGame((s) => s.doIntimacy);
	const hangKid = useGame((s) => s.hangKid);
	const retireTo = useGame((s) => s.retireTo);
	const parentCall = useGame((s) => s.parentCall);
	const a = playerArtist(game);
	if (!a) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "p-6 text-sm text-muted",
		children: "Artist career only."
	});
	const cards = a.parents.cards?.length ? a.parents.cards : [];
	const sameSex = Boolean(a.partner && a.gender === a.partner.gender);
	const maleCouple = sameSex && a.gender === "male";
	const suit = SUITORS.filter((s) => matchesOrientation(a, suitorGender(s.id)));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto grid max-w-3xl gap-4 p-4 md:p-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl",
				children: "Family"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-muted",
				children: [
					a.gender,
					" · ",
					a.orientation,
					" · ",
					a.relationship,
					a.pregnancy ? ` · ${a.pregnancy.via} · ${a.pregnancy.weeksLeft} weeks left` : ""
				]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
				title: "Parents",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-3 sm:grid-cols-2",
					children: cards.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-lg bg-subtle p-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArtistAvatar, {
								spec: c.avatar,
								size: 48
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "font-medium",
										children: [
											c.name,
											" ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-xs text-muted",
												children: ["· ", c.role]
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xs text-muted",
										children: [
											c.job,
											" · ",
											c.age
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-2 text-xs text-muted",
										children: ["Closeness ", Math.round(c.closeness)]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meter, { value: c.closeness })
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 flex flex-wrap gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GhostBtn, {
									onClick: () => parentCall(c.role),
									children: "Call"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GhostBtn, {
									onClick: () => openCheckout({
										kind: "parent",
										id: `${c.role}-aid`,
										title: `Aid · ${c.name}`,
										price: 5e3,
										extra: {
											parentRole: c.role,
											parentAct: "aid"
										}
									}),
									children: "Aid · $5k"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GhostBtn, {
									onClick: () => openCheckout({
										kind: "parent",
										id: `${c.role}-gift`,
										title: `Gift · ${c.name}`,
										price: 48e3,
										extra: {
											parentRole: c.role,
											parentAct: "gift"
										}
									}),
									children: "Luxury gift"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GhostBtn, {
									onClick: () => openCheckout({
										kind: "parent",
										id: `${c.role}-vip`,
										title: `VIP · ${c.name}`,
										price: 12e3,
										extra: {
											parentRole: c.role,
											parentAct: "vip"
										}
									}),
									children: "VIP show"
								})
							]
						})]
					}, c.role))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-xs text-muted",
					children: "Arrests and scandals drop closeness. Call every week or they notice."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, { children: a.partner ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArtistAvatar, {
					spec: a.partner.avatar,
					size: 56
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 flex-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "font-medium",
							children: [a.partner.name, a.partner.famous ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
								className: "ml-2",
								children: "famous"
							}) : null]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted",
							children: [
								a.partner.job,
								" · ",
								a.partner.gender,
								" · ",
								a.partner.age,
								" · ",
								a.partner.hometown
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted",
							children: a.partner.bio
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 text-xs text-muted",
							children: ["Closeness ", Math.round(a.partner.closeness)]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meter, { value: a.partner.closeness }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 flex flex-wrap gap-2",
							children: [
								a.relationship === "dating" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GhostBtn, {
									onClick: () => openCheckout({
										kind: "propose",
										id: "ring",
										title: `Ring for ${a.partner?.name}`,
										price: 8500
									}),
									children: "Propose · $8,500"
								}),
								a.relationship === "engaged" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrimaryBtn, {
									onClick: () => openCheckout({
										kind: "marry",
										id: "wedding",
										title: `Wedding · ${a.partner?.name}`,
										price: 22e3
									}),
									children: "Marry · $22,000"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GhostBtn, {
									onClick: () => openCheckout({
										kind: "date-night",
										id: "date",
										title: `Date night · ${a.partner?.name}`,
										price: 2400
									}),
									children: "Date night · $2,400"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GhostBtn, {
									onClick: doIntimacy,
									children: "Intimacy"
								}),
								maleCouple && !a.pregnancy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GhostBtn, {
									onClick: () => openCheckout({
										kind: "adopt",
										id: "surrogate",
										title: "Private surrogate",
										price: 85e3
									}),
									children: "Surrogate · $85k"
								}) : null,
								(sameSex || a.relationship === "married") && !a.pregnancy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GhostBtn, {
									onClick: () => openCheckout({
										kind: "adopt",
										id: "adopt",
										title: "Agency adoption",
										price: 45e3
									}),
									children: "Adopt · $45k"
								}) : null
							]
						}),
						a.partner ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GiftRow, {}) : null
					]
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "Pick someone. The list already respects orientation."
			}) }),
			!a.partner && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: "Who's in town",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "grid gap-2",
					children: suit.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex flex-wrap items-center justify-between gap-2 rounded-lg bg-subtle px-3 py-2 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [s.name, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-muted",
							children: [
								" ",
								"· ",
								s.job,
								s.famous ? " · famous" : "",
								" · ",
								suitorGender(s.id),
								" · ",
								s.age,
								" · ",
								money(s.netWorth)
							]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GhostBtn, {
							onClick: () => startDate(s.id),
							children: "Date"
						})]
					}, s.id))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: "Kids hub",
				children: a.kids.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: a.pregnancy ? `${a.pregnancy.via} · ${a.pregnancy.weeksLeft} weeks.` : "Intimacy can start a pregnancy. Same-sex couples adopt or hire a surrogate."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "grid gap-3",
					children: a.kids.map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "rounded-lg bg-subtle p-3 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArtistAvatar, {
								spec: k.avatar,
								size: 44
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "font-medium",
										children: [
											k.name,
											" · ",
											k.gender,
											" · age ",
											k.age
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xs text-muted",
										children: [
											k.personality,
											" · ",
											k.interests,
											" · talent ",
											k.talent,
											" · ",
											k.school,
											" · ",
											k.custody,
											" custody"
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-2 text-xs text-muted",
										children: ["Closeness ", Math.round(k.closeness)]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meter, { value: k.closeness }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-2 text-xs text-muted",
										children: [
											"Vocals ",
											Math.round(k.stats.vocals),
											" · writing ",
											Math.round(k.stats.writing),
											" · dance ",
											Math.round(k.stats.dance),
											" · production ",
											Math.round(k.stats.production)
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xs text-muted",
										children: [
											"Lessons · vocal ",
											k.lessons.vocal,
											" · dance ",
											k.lessons.dance,
											" · theory ",
											k.lessons.theory,
											" · instrument",
											" ",
											k.lessons.instrument
										]
									})
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 flex flex-wrap gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GhostBtn, {
									onClick: () => hangKid(k.id),
									children: "Hang out"
								}),
								LESSONS.map((L) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GhostBtn, {
									onClick: () => openCheckout({
										kind: "lesson",
										id: `${k.id}-${L.id}`,
										title: `${k.name} · ${L.label}`,
										price: L.cost,
										extra: {
											kidId: k.id,
											lesson: L.id
										}
									}),
									children: [
										L.label,
										" · ",
										money(L.cost)
									]
								}, L.id)),
								SCHOOLS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GhostBtn, {
									onClick: () => openCheckout({
										kind: "school",
										id: `${k.id}-${s.id}`,
										title: `${k.name} · ${s.name}`,
										price: s.yearly ? Math.round(s.yearly / 52) * 4 : 0,
										extra: {
											kidId: k.id,
											track: s.id
										}
									}),
									children: [s.name, s.yearly ? ` · ${money(s.yearly)}/yr` : ""]
								}, s.id)),
								k.age >= 16 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PrimaryBtn, {
									onClick: () => retireTo(k.id),
									children: ["Play as ", k.name]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, { children: "legacy at 16" })
							]
						})]
					}, k.id))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: "Family vacations",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "grid gap-2",
					children: VACATIONS.map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex flex-wrap items-center justify-between gap-2 rounded-lg bg-subtle px-3 py-2 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [v.name, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-muted",
							children: [
								" · ",
								v.city,
								" · ",
								money(v.cost)
							]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GhostBtn, {
							onClick: () => openCheckout({
								kind: "vacation",
								id: v.id,
								title: v.name,
								price: v.cost
							}),
							children: "Book"
						})]
					}, v.id))
				})
			})
		]
	});
}
function GigsScreen() {
	const game = useGame((s) => s.game);
	const takeGig = useGame((s) => s.takeGig);
	const you = playerArtist(game);
	const open = (game.gigs ?? []).filter((g) => g.status === "open");
	const past = (game.gigs ?? []).filter((g) => g.status !== "open").slice(0, 8);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto grid max-w-3xl gap-4 p-4 md:p-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl",
				children: "Paid gigs"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "Clubs, corporates, private festivals, yachts. Fees scale with popularity and Billboard heat. Not a tour."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: "Offers",
				children: open.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "Desk is quiet. Advance a week."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "grid gap-2",
					children: open.map((g) => {
						const locked = (you?.fame ?? 0) < g.fameNeed;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex flex-wrap items-center justify-between gap-2 rounded-lg bg-subtle px-3 py-2 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [g.name, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-muted",
								children: [
									" ",
									"· ",
									g.city,
									" · ",
									g.kind,
									" · ",
									money(g.fee)
								]
							})] }), locked ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Pill, { children: ["fame ", g.fameNeed] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrimaryBtn, {
								onClick: () => takeGig(g.id),
								children: "Book"
							})]
						}, g.id);
					})
				})
			}),
			past.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: "Log",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "grid gap-1 text-sm text-muted",
					children: past.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: g.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							g.status,
							" · ",
							money(g.fee)
						] })]
					}, g.id))
				})
			})
		]
	});
}
function SkillsScreen() {
	const game = useGame((s) => s.game);
	const openCheckout = useGame((s) => s.openCheckout);
	const a = playerArtist(game) ?? rosterOf(game)[0];
	if (!a) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "p-6 text-sm text-muted",
		children: "No artist."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto grid max-w-3xl gap-4 p-4 md:p-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl",
				children: "Skills"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-muted",
				children: [
					"Age ",
					a.age,
					" · potential ",
					a.potential,
					" · ability ",
					a.ability
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meter, {
						label: "Vocals",
						value: a.stats.vocals
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meter, {
						label: "Songwriting",
						value: a.stats.writing
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meter, {
						label: "Choreography",
						value: a.stats.dance
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meter, {
						label: "Charisma",
						value: a.stats.charisma
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meter, {
						label: "Looks",
						value: a.stats.looks
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meter, {
						label: "Work ethic",
						value: a.stats.workEthic
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meter, {
						label: "Media savvy",
						value: a.stats.social
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meter, {
						label: "Production",
						value: a.stats.production
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meter, {
						label: "Stage presence",
						value: a.stats.performance
					})
				]
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: "Coaching",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-2",
					children: COACHING.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GhostBtn, {
						onClick: () => openCheckout({
							kind: "coach",
							id: c.id,
							title: c.label,
							price: c.cost,
							extra: {
								artistId: a.id,
								skill: c.skill,
								gain: c.gain
							}
						}),
						children: [
							c.label,
							" · ",
							money(c.cost)
						]
					}, c.id))
				})
			})
		]
	});
}
var HUBS = [
	{
		id: "personal",
		title: "Personal Life & Assets",
		blurb: "Family, houses, jets, islands, health.",
		icon: Heart,
		items: [
			{
				label: "Family & Relationships",
				hint: "Dating, Mom & Dad, kids, school",
				view: "family"
			},
			{
				label: "Real Estate & Travel",
				hint: "Mansions, cars, jets, islands, vacations",
				view: "life"
			},
			{
				label: "Health & Wellness",
				hint: "Energy, substances, vocal rest, rehab",
				view: "health"
			}
		]
	},
	{
		id: "fame",
		title: "Fame, Nightlife & Screen",
		blurb: "Clubs, Hollywood, paid gigs, talent TV.",
		icon: Clapperboard,
		items: [
			{
				label: "Nightlife & VIP",
				hint: "Booths, bottles, casino, afterparties",
				view: "nightlife"
			},
			{
				label: "Hollywood & OSTs",
				hint: "Roles, voice work, soundtrack leads",
				view: "hollywood"
			},
			{
				label: "Paid Bookings",
				hint: "Clubs, private concerts, corporate sets",
				view: "gigs"
			},
			{
				label: "Talent Shows",
				hint: "Reality singing, judging, guest spots",
				tab: "talent"
			}
		]
	},
	{
		id: "business",
		title: "Business, Law & Management",
		blurb: "Skills, legal, security, entourage.",
		icon: Briefcase,
		items: [
			{
				label: "Artist Skills",
				hint: "Vocals, writing, stage, media savvy",
				view: "skills"
			},
			{
				label: "Legal & Law Enforcement",
				hint: "Charges, lawyers, bail, sentences",
				view: "legal"
			},
			{
				label: "Security & Entourage",
				hint: "Guards, drivers, chefs, anti-pap",
				view: "life"
			}
		]
	},
	{
		id: "system",
		title: "System & Meta",
		blurb: "Saves, settings, cheats, credits.",
		icon: Wrench,
		items: [
			{
				label: "Save / Load",
				hint: "Slots and autosave",
				tab: "save"
			},
			{
				label: "Settings",
				hint: "Difficulty, autosave, quit",
				tab: "settings"
			},
			{
				label: "Achievements",
				hint: "Hardware and firsts",
				tab: "achievements"
			},
			{
				label: "Leaderboards",
				hint: "Uploaded scores",
				tab: "leaders"
			},
			{
				label: "Cheats",
				hint: "Testing console",
				tab: "cheats"
			},
			{
				label: "R2S Editor",
				hint: "AI control, roster inspect",
				tab: "editor"
			},
			{
				label: "Admin",
				hint: "Live world stats",
				tab: "admin"
			},
			{
				label: "Credits",
				hint: "Created by Jayden Carter",
				tab: "credits"
			}
		]
	}
];
function MoreScreen() {
	const setView = useGame((s) => s.setView);
	const moreTab = useGame((s) => s.moreTab);
	const setMoreTab = useGame((s) => s.setMoreTab);
	const [open, setOpen] = (0, import_react.useState)(moreTab && moreTab !== "home" ? hubForTab(moreTab) : null);
	const go = (it) => {
		if (it.view) setView(it.view);
		else if (it.tab) setMoreTab(it.tab);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto grid max-w-4xl gap-4 p-4 md:p-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl",
				children: "Lifestyle & Hub"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "Four desks. Daily loops live in the bar. This is the rest of the building."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-3 md:grid-cols-2",
				children: HUBS.map((hub) => {
					const Icon = hub.icon;
					const expanded = open === hub.id;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: cn("rounded-xl border border-border bg-surface p-4", expanded && "border-accent/40 md:col-span-2"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => setOpen(expanded ? null : hub.id),
							className: "flex w-full items-start gap-3 text-left",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "grid size-11 shrink-0 place-items-center rounded-lg bg-subtle",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-5 text-accent" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block font-display text-xl leading-tight",
									children: hub.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mt-1 block text-sm text-muted",
									children: hub.blurb
								})]
							})]
						}), expanded ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-4 grid gap-2 sm:grid-cols-2",
							children: hub.items.map((it) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => go(it),
								className: "flex min-h-14 w-full flex-col rounded-lg bg-subtle px-3 py-2 text-left hover:bg-elevated",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm font-medium",
									children: it.label
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs text-muted",
									children: it.hint
								})]
							}) }, it.label))
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-xs text-muted",
							children: hub.items.map((i) => i.label).join(" · ")
						})]
					}, hub.id);
				})
			}),
			moreTab === "save" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Saves, {}),
			moreTab === "settings" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings$1, {}),
			moreTab === "achievements" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Achievements, {}),
			moreTab === "leaders" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Leaders, {}),
			moreTab === "admin" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Admin, {}),
			moreTab === "editor" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Editor, {}),
			moreTab === "cheats" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cheats, {}),
			moreTab === "credits" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Credits, {}),
			moreTab === "label" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabelOps, {}),
			moreTab === "talent" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TalentShow, {})
		]
	});
}
function hubForTab(tab) {
	for (const h of HUBS) if (h.items.some((i) => i.tab === tab)) return h.id;
	return null;
}
function Saves() {
	const listSlots = useGame((s) => s.listSlots);
	const saveSlot = useGame((s) => s.saveSlot);
	const loadSlot = useGame((s) => s.loadSlot);
	const slots = listSlots();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
		title: "Save game",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "grid gap-2",
			children: slots.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "flex items-center justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-sm",
					children: [s.slot === 0 ? "Autosave" : `Slot ${s.slot}`, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-muted",
						children: [" · ", s.week ? `${s.label} · w${s.week}` : "Empty"]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "flex gap-2",
					children: [s.slot !== 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GhostBtn, {
						onClick: () => saveSlot(s.slot),
						children: "Save"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GhostBtn, {
						disabled: !s.week,
						onClick: () => loadSlot(s.slot),
						children: "Load"
					})]
				})]
			}, s.slot))
		})
	});
}
function Settings$1() {
	const game = useGame((s) => s.game);
	const toggleAutosave = useGame((s) => s.toggleAutosave);
	const setDifficulty = useGame((s) => s.setDifficulty);
	const reset = useGame((s) => s.reset);
	const [updateNote, setUpdateNote] = (0, import_react.useState)(null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
		title: "Preferences",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-3 text-sm",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: toggleAutosave,
					className: "flex min-h-11 items-center justify-between rounded-md bg-subtle px-3",
					children: ["Autosave ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
						tone: game.settings.autosave ? "mint" : "default",
						children: game.settings.autosave ? "on" : "off"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex min-h-11 flex-wrap items-center justify-between gap-2 rounded-md bg-subtle px-3 py-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Difficulty" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "flex gap-1",
						children: [
							"easy",
							"normal",
							"hard"
						].map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setDifficulty(d),
							className: `rounded-full px-3 py-1 text-xs ${game.settings.difficulty === d ? "bg-accent text-accent-fg" : "bg-elevated"}`,
							children: d
						}, d))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-muted",
					children: [
						"Database: ",
						game.settings.database === "real" ? "RealArtists.db" : "Normal.db",
						" · build ",
						game.updateVersion
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GhostBtn, {
						onClick: () => {
							setUpdateNote(`Up to date · ${game.updateVersion}. Auto-updater checks this build.`);
						},
						children: "Check for updates"
					}), updateNote ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs text-muted",
						children: updateNote
					}) : null]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GhostBtn, {
					onClick: reset,
					children: "Quit to title"
				})
			]
		})
	});
}
function Achievements() {
	const game = useGame((s) => s.game);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
		title: "Achievements",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "grid gap-2",
			children: ACHIEVEMENTS.map((a) => {
				const got = game.achievements.find((x) => x.id === a.id);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex justify-between text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: got ? "" : "text-muted",
						children: [a.name, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-muted",
							children: [" · ", a.hint]
						})]
					}), got ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Pill, {
						tone: "mint",
						children: ["w", got.week]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted",
						children: "—"
					})]
				}, a.id);
			})
		})
	});
}
function Leaders() {
	const upload = useGame((s) => s.uploadLeaderboard);
	let rows = [];
	try {
		rows = JSON.parse(localStorage.getItem("musicstar.leaders.v1") ?? "[]");
	} catch {
		rows = [];
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
		title: "Leaderboards",
		action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GhostBtn, {
			onClick: upload,
			children: "Upload on save"
		}),
		children: rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted",
			children: "Save a game to upload a score."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
			className: "grid gap-1 text-sm",
			children: rows.map((r, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "flex justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
					"#",
					i + 1,
					" ",
					r.name
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "tabular-nums text-muted",
					children: [
						r.score,
						" · w",
						r.week
					]
				})]
			}, i))
		})
	});
}
function Admin() {
	const game = useGame((s) => s.game);
	const you = playerArtist(game);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
		title: "Admin stats",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
			className: "grid gap-2 text-sm",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted",
						children: "Week"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: game.week })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted",
						children: "Artists in world"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: game.artists.length })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted",
						children: "Songs"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: game.songs.length })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted",
						children: "Net worth"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: money(netWorth(game)) })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted",
						children: "CEO score"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: ceoScore(game) })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted",
						children: "Verify thresholds"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-right text-muted",
						children: [
							"100k apps / ",
							VERIFY_AT.spotify.toLocaleString("en-US"),
							" Spotify 4-wk"
						]
					})]
				}),
				you && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted",
						children: "Your 4-week streams"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: compact(you.monthlyListeners) })]
				})
			]
		})
	});
}
function Editor() {
	const game = useGame((s) => s.game);
	const toggleAi = useGame((s) => s.toggleAi);
	const roster = rosterOf(game);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
		title: "R2S Editor",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted",
			children: "Web stand-in for R2S_Editor.exe — toggle AI control, inspect roster data."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-3 grid gap-2 text-sm",
			children: roster.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
					a.name,
					" · ",
					a.genre,
					" · age ",
					a.age
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GhostBtn, {
					onClick: () => toggleAi(a.id),
					children: a.aiControl ? "AI on" : "AI off"
				})]
			}, a.id))
		})]
	});
}
function Cheats() {
	const cheat = useGame((s) => s.cheat);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
		title: "Cheats · testing",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mb-3 text-sm text-muted",
			children: "For testing only. Does not touch leaderboards retroactively."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap gap-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrimaryBtn, {
					onClick: () => cheat("money"),
					children: "+$1M"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GhostBtn, {
					onClick: () => cheat("fans"),
					children: "100k every app"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GhostBtn, {
					onClick: () => cheat("skills"),
					children: "Max skills"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GhostBtn, {
					onClick: () => cheat("hit"),
					children: "Spawn a hit"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GhostBtn, {
					onClick: () => cheat("score"),
					children: "FICO 820"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GhostBtn, {
					onClick: () => cheat("viral"),
					children: "Force viral"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GhostBtn, {
					onClick: () => cheat("fame"),
					children: "Fame 92"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GhostBtn, {
					onClick: () => cheat("year"),
					children: "Skip a year"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GhostBtn, {
					onClick: () => cheat("jail"),
					children: "Jail 4 weeks"
				})
			]
		})]
	});
}
function Credits() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
		title: "Credits",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-2xl",
				children: GAME_TITLE
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: GAME_SUBTITLE
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm",
				children: TAGLINE
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-4 text-sm",
				children: [
					"Created by ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-medium",
						children: CREATOR
					}),
					" only."
				]
			})
		]
	});
}
function LabelOps() {
	const game = useGame((s) => s.game);
	const invest = useGame((s) => s.invest);
	const sponsor = useGame((s) => s.sponsor);
	const openCheckout = useGame((s) => s.openCheckout);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
				title: "Ownership",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm",
						children: [
							"You own ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "tabular-nums",
								children: [game.labelOwnedPct, "%"]
							}),
							game.career === "label" ? ` of ${game.labelName}` : " as an independent",
							"."
						]
					}),
					game.career === "label" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 flex flex-wrap gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrimaryBtn, {
							onClick: () => invest(25e4, 12, "Northline Capital"),
							children: "Take $250k · 12%"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GhostBtn, {
							onClick: () => invest(8e4, 6, "Harbor Angels"),
							children: "$80k · 6%"
						})]
					}),
					game.investors.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-3 grid gap-1 text-sm text-muted",
						children: game.investors.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
							i.name,
							" · ",
							money(i.amount),
							" · ",
							i.equity,
							"%"
						] }, i.name))
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: "Facilities",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GhostBtn, {
							disabled: game.facilities.studio,
							onClick: () => openCheckout({
								kind: "facility",
								id: "studio",
								title: "Build in-house studio",
								price: 18e4,
								extra: { facility: "studio" }
							}),
							children: game.facilities.studio ? "Studio built" : "Build studio · $180k"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GhostBtn, {
							disabled: game.facilities.manufacturing,
							onClick: () => openCheckout({
								kind: "facility",
								id: "manufacturing",
								title: "Manufacturing plant",
								price: 24e4,
								extra: { facility: "manufacturing" }
							}),
							children: game.facilities.manufacturing ? "Plant built" : "Manufacturing · $240k"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GhostBtn, {
							disabled: game.facilities.distribution,
							onClick: () => openCheckout({
								kind: "facility",
								id: "distribution",
								title: "Distribution office",
								price: 16e4,
								extra: { facility: "distribution" }
							}),
							children: game.facilities.distribution ? "Distro live" : "Distribution · $160k"
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
				title: "Sponsors",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-2",
					children: [
						{
							name: "Nike",
							weekly: 12e3,
							weeks: 12
						},
						{
							name: "Pepsi",
							weekly: 9500,
							weeks: 10
						},
						{
							name: "Beats",
							weekly: 7200,
							weeks: 8
						},
						{
							name: "Cîroc",
							weekly: 6400,
							weeks: 8
						}
					].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GhostBtn, {
						onClick: () => sponsor(s.name, s.weekly, s.weeks),
						children: [
							s.name,
							" · ",
							money(s.weekly),
							"/wk"
						]
					}, s.name))
				}), game.sponsors.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 grid gap-1 text-sm text-muted",
					children: game.sponsors.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
						s.name,
						" · ",
						money(s.weekly),
						"/wk · ",
						s.weeksLeft,
						"w"
					] }, s.name))
				})]
			})
		]
	});
}
function TalentShow() {
	const game = useGame((s) => s.game);
	const talent = useGame((s) => s.talent);
	const stage = game.talentShow?.stage ?? "none";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
		title: "Talent show",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "X Factor-style. Audition, judges, final. The clip lives on TikTok either way."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 text-sm",
				children: ["Stage: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-medium",
					children: stage === "none" ? "not entered" : stage
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrimaryBtn, {
				className: "mt-3",
				onClick: talent,
				children: stage === "none" || stage === "final" ? "Enter · $8,000" : stage === "audition" ? "Face the judges" : "Go to the final"
			})
		]
	});
}
function SystemSheet() {
	const overlay = useGame((s) => s.overlay);
	const setOverlay = useGame((s) => s.setOverlay);
	const kind = overlay.type;
	const page = {
		saves: {
			title: "Save / Load",
			node: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Saves, {})
		},
		settings: {
			title: "Settings",
			node: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings$1, {})
		},
		cheats: {
			title: "Cheats",
			node: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cheats, {})
		},
		credits: {
			title: "Credits",
			node: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Credits, {})
		},
		achievements: {
			title: "Achievements",
			node: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Achievements, {})
		},
		leaderboards: {
			title: "Leaderboards",
			node: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Leaders, {})
		},
		admin: {
			title: "Admin",
			node: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Admin, {})
		},
		editor: {
			title: "R2S Editor",
			node: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Editor, {})
		}
	}[kind];
	if (!page) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-40 grid place-items-end bg-bg/70 p-0 sm:place-items-center sm:p-4",
		onClick: () => setOverlay({ type: "none" }),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			role: "dialog",
			"aria-label": page.title,
			className: "max-h-[88dvh] w-full max-w-lg overflow-auto rounded-t-2xl border border-border bg-surface p-4 shadow-2xl sm:rounded-2xl",
			onClick: (e) => e.stopPropagation(),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-3 flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs tracking-[0.16em] text-faint uppercase",
					children: "Gear"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GhostBtn, {
					onClick: () => setOverlay({ type: "none" }),
					children: "Close"
				})]
			}), page.node]
		})
	});
}
function WikiPage({ artistId }) {
	const game = useGame((s) => s.game);
	const setOverlay = useGame((s) => s.setOverlay);
	const a = game.artists.find((x) => x.id === artistId) ?? rosterOf(game)[0];
	if (!a) return null;
	ensureArtistExtras(a);
	const songs = game.songs.filter((s) => s.artistId === a.id && s.status === "released");
	const features = game.songs.filter((s) => s.collabArtistId === a.id);
	const born = weekParts(1);
	const now = weekParts(game.week);
	const yearsActive = `${born.year}–${now.year}`;
	const peak = songs.reduce((n, s) => s.peakChart != null && (n == null || s.peakChart < n) ? s.peakChart : n, null);
	const combined = songs.reduce((n, s) => n + s.salesDigital + s.salesPhysical, 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-40 grid place-items-end bg-bg/70 md:place-items-center md:p-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-h-[92dvh] w-full max-w-3xl overflow-auto rounded-t-xl border border-border bg-surface p-5 md:rounded-xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs tracking-[0.18em] text-muted uppercase",
					children: "Wiki"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "grid size-11 place-items-center rounded-md hover:bg-subtle",
					onClick: () => setOverlay({ type: "none" }),
					"aria-label": "Close",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" })
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-2 grid gap-5 md:grid-cols-[200px_1fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "rounded-lg border border-border bg-elevated p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArtistAvatar, {
							spec: a.avatar,
							size: 96,
							className: "mx-auto"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
							className: "mt-3 flex items-center justify-center gap-1 font-display text-2xl",
							children: [a.name, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VerifiedBadge, { on: a.verified.spotify || a.verified.x })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
							className: "mt-3 grid gap-1 text-xs",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
									k: "Born",
									v: `${a.age - now.careerYear + 1} (${a.hometown})`
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
									k: "Origin",
									v: `${a.hometown}, ${a.nationality}`
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
									k: "Genres",
									v: genreLabel(a.genre)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
									k: "Occupation",
									v: a.kind === "band" ? "band" : "singer-songwriter"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
									k: "Years active",
									v: yearsActive
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
									k: "Labels",
									v: a.signed ? game.rivals.find((r) => r.id === a.labelId)?.name ?? game.labelName : "Independent"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
									k: "Popularity",
									v: String(Math.round(a.popularity))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
									k: "Page views",
									v: compact(a.wikiViews || Math.round(a.monthlyListeners * .04))
								})
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl",
						children: "Career"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm leading-relaxed text-muted",
						children: a.bio
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted",
						children: a.history
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-5 font-display text-xl",
						children: "Personal life"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-sm text-muted",
						children: [
							a.relationship,
							a.partner ? ` · ${a.partner.name} (${a.partner.job}${a.partner.famous ? ", public figure" : ""}), net worth ${money(a.partner.netWorth)}, looks ${a.partner.looks}` : " · single",
							". Parents ",
							a.parents.mom,
							" and ",
							a.parents.dad,
							"."
						]
					}),
					a.kids.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-2 grid gap-1 text-sm text-muted",
						children: a.kids.map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
							k.name,
							" (",
							k.gender,
							", age ",
							k.age,
							", born ",
							weekLabel(k.bornWeek),
							") · ",
							k.personality,
							" · ",
							k.interests,
							" · ",
							k.school,
							" · ",
							k.custody,
							" custody"
						] }, k.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-5 font-display text-xl",
						children: "Discography"
					}),
					songs.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted",
						children: "No released titles yet."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-2 grid gap-1 text-sm",
						children: songs.slice().sort((x, y) => y.streams - x.streams).map((s) => {
							const guest = s.collabArtistId ? game.artists.find((x) => x.id === s.collabArtistId) : null;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex justify-between gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "min-w-0 truncate",
									children: [
										s.title,
										guest ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-muted",
											children: [" feat. ", guest.name]
										}) : null,
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-muted",
											children: [" · ", s.releaseFormat]
										}),
										s.chart ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Pill, {
											className: "ml-2",
											children: ["#", s.chart]
										}) : null
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "tabular-nums text-muted",
									children: compact(s.streams)
								})]
							}, s.id);
						})
					}),
					features.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-5 font-display text-xl",
						children: "Features"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-2 grid gap-1 text-sm text-muted",
						children: features.map((s) => {
							const host = game.artists.find((x) => x.id === s.artistId);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
								host?.name,
								" — ",
								s.title
							] }, s.id);
						})
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-5 text-xs text-muted",
						children: [
							"Peak Billboard 100: ",
							peak ? `#${peak}` : "—",
							". Combined sales (digital + CD): ",
							compact(combined),
							". As of",
							" ",
							weekLabel(game.week),
							"."
						]
					})
				] })]
			})]
		})
	});
}
function Row({ k, v }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex justify-between gap-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
			className: "text-muted",
			children: k
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
			className: "text-right",
			children: v
		})]
	});
}
function PaySheet() {
	const game = useGame((s) => s.game);
	const draft = useGame((s) => s.checkout);
	const close = useGame((s) => s.closeCheckout);
	const confirm = useGame((s) => s.confirmPay);
	const setView = useGame((s) => s.setView);
	const [mode, setMode] = (0, import_react.useState)(() => draft?.kind === "house" ? "mortgage" : draft?.financeable ? "loan" : "outright");
	const [method, setMethod] = (0, import_react.useState)("cash");
	const [cardId, setCardId] = (0, import_react.useState)(null);
	const [cashAmt, setCashAmt] = (0, import_react.useState)(0);
	const quote = (0, import_react.useMemo)(() => {
		if (!game || !draft) return null;
		return quoteFor(game, draft, mode);
	}, [
		game,
		draft,
		mode
	]);
	(0, import_react.useEffect)(() => {
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
	}, [
		draft?.id,
		draft?.kind,
		mode,
		quote?.dueNow,
		game?.cash
	]);
	(0, import_react.useEffect)(() => {
		if (!draft) return;
		setMode(draft.financeable ? draft.kind === "house" ? "mortgage" : "loan" : "outright");
	}, [
		draft?.id,
		draft?.kind,
		draft?.financeable
	]);
	if (!game || !draft || !quote) return null;
	const due = quote.dueNow;
	const band = creditBand(game.creditScore);
	const cards = game.cards;
	const picked = cards.find((c) => c.id === cardId) ?? cards[0] ?? null;
	const room = picked ? cardRoom(picked) : 0;
	const cashShare = method === "cash" ? due : method === "card" ? 0 : Math.max(0, Math.min(due, Math.round(cashAmt)));
	const cardShare = due - cashShare;
	const cashOk = cashShare <= game.cash + .5;
	const cardOk = cardShare <= 0 || picked != null && cardShare <= room + .5;
	const canPay = (mode === "outright" || quote.allowed) && cashOk && cardOk && (method !== "card" && method !== "split" ? true : cards.length > 0);
	const plan = {
		method,
		cardId: picked?.id ?? null,
		cashAmount: cashShare,
		cardAmount: cardShare,
		mode
	};
	const modes = [
		{
			id: "outright",
			label: "Pay in full",
			show: true
		},
		{
			id: "mortgage",
			label: "Mortgage",
			show: draft.kind === "house"
		},
		{
			id: "loan",
			label: "Finance",
			show: Boolean(draft.financeable) && draft.kind !== "house"
		},
		{
			id: "lease",
			label: "Lease",
			show: Boolean(draft.leasable)
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-40 grid place-items-end bg-bg/70 p-0 sm:place-items-center sm:p-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			role: "dialog",
			"aria-labelledby": "pay-title",
			className: "flex max-h-[92dvh] w-full max-w-lg flex-col overflow-hidden rounded-t-2xl border border-border bg-surface shadow-2xl sm:rounded-2xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "flex items-start justify-between gap-3 border-b border-border px-4 py-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] uppercase tracking-[0.16em] text-faint",
							children: "Checkout"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							id: "pay-title",
							className: "font-display text-2xl leading-tight",
							children: draft.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-muted",
							children: [money(draft.price), mode !== "outright" && quote.allowed ? ` · due today ${money(due)}` : null]
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: close,
						className: "grid size-11 place-items-center rounded-md hover:bg-subtle",
						"aria-label": "Close",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4 overflow-auto px-4 py-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center gap-2 rounded-lg bg-subtle px-3 py-2 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Landmark, { className: "size-4 text-muted" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									"FICO ",
									Math.round(game.creditScore),
									" · ",
									band.label
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
									tone: band.tone === "warn" ? "default" : band.tone === "mint" ? "mint" : band.tone,
									children: band.label
								})
							]
						}),
						modes.some((m) => m.show && m.id !== "outright") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mb-2 text-xs text-muted",
							children: "How do you want to buy it?"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid grid-cols-2 gap-2 sm:grid-cols-3",
							children: modes.filter((m) => m.show).map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setMode(m.id),
								className: cn("min-h-11 rounded-md border px-3 text-sm", mode === m.id ? "border-accent bg-accent/15 text-fg" : "border-border text-muted hover:bg-subtle"),
								children: m.label
							}, m.id))
						})] }),
						mode !== "outright" && !quote.allowed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "rounded-lg border border-bad/40 bg-bad/10 px-3 py-3 text-sm",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "flex items-start gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ban, { className: "mt-0.5 size-4 shrink-0 text-bad" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [quote.reason, " Pay in full, or rebuild credit and come back with a bigger down payment."] })]
							})
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							mode !== "outright" && quote.allowed && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-lg border border-border bg-elevated px-3 py-3 text-sm",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "font-medium",
										children: [
											quote.bankName,
											" · ",
											quote.apr.toFixed(2),
											"% APR"
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-muted",
										children: quote.reason
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-2 tabular-nums text-muted",
										children: [
											"Down ",
											money(quote.down),
											" (",
											Math.round(quote.minDownPct * 100),
											"%) · financed ",
											money(quote.financed),
											" ·",
											" ",
											money(quote.weekly),
											"/wk × ",
											quote.weeks,
											" weeks"
										]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mb-2 text-xs text-muted",
								children: [
									"Pay ",
									money(due),
									" due today with"
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PayChoice, {
										active: method === "cash",
										onClick: () => setMethod("cash"),
										icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wallet, { className: "size-4" }),
										title: "Debit card",
										hint: `Harbor checking · ${money(game.cash)}`
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PayChoice, {
										active: method === "card",
										onClick: () => setMethod("card"),
										icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreditCard, { className: "size-4" }),
										title: "Credit card",
										hint: cards.length ? `${cards.length} card${cards.length === 1 ? "" : "s"} · ${money(totalCardRoom(game))} available` : "No card on file — apply at Bank",
										disabled: cards.length === 0
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PayChoice, {
										active: method === "split",
										onClick: () => setMethod("split"),
										icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Landmark, { className: "size-4" }),
										title: "Debit + credit",
										hint: "Split the due amount across checking and a card",
										disabled: cards.length === 0
									})
								]
							})] }),
							(method === "card" || method === "split") && cards.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mb-2 text-xs text-muted",
								children: "Card"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "grid gap-2",
								children: cards.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => setCardId(c.id),
									className: cn("flex min-h-11 w-full items-center justify-between rounded-md border px-3 text-sm", cardId === c.id ? "border-accent bg-accent/10" : "border-border hover:bg-subtle"),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [c.name, c.black ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
										className: "ml-2",
										tone: "viral",
										children: "Black"
									}) : null] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "tabular-nums text-muted",
										children: [
											money(c.used),
											" / ",
											c.black ? "no cap" : money(c.limit)
										]
									})]
								}) }, c.id))
							})] }),
							method === "split" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-1 flex justify-between text-xs text-muted",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Debit ", money(cashShare)] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Card ", money(cardShare)] })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "range",
								min: 0,
								max: due,
								step: Math.max(1, Math.round(due / 40)),
								value: cashShare,
								onChange: (e) => setCashAmt(Number(e.target.value)),
								className: "w-full accent-[var(--color-accent)]"
							})] }),
							!cashOk && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm text-bad",
								children: [
									"Checking is short ",
									money(cashShare - game.cash),
									"."
								]
							}),
							method !== "cash" && cards.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm text-bad",
								children: [
									"Apply for a card in Bank first.",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										className: "underline",
										onClick: () => {
											close();
											setView("bank");
										},
										children: "Open Bank"
									})
								]
							}),
							cardShare > 0 && picked && !cardOk && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm text-bad",
								children: [
									picked.name,
									" only has ",
									money(room),
									" left. Move more onto debit or pick another card."
								]
							})
						] })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
					className: "flex gap-2 border-t border-border px-4 py-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GhostBtn, {
						className: "flex-1",
						onClick: close,
						children: "Cancel"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PrimaryBtn, {
						className: "flex-1",
						disabled: !canPay,
						onClick: () => confirm(plan),
						children: ["Confirm · ", money(due)]
					})]
				})
			]
		})
	});
}
function PayChoice({ active, onClick, icon, title, hint, disabled }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		disabled,
		onClick,
		className: cn("flex min-h-14 items-center gap-3 rounded-md border px-3 text-left", active ? "border-accent bg-accent/10" : "border-border hover:bg-subtle", disabled && "opacity-40"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-muted",
			children: icon
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "block text-sm font-medium",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "block text-xs text-muted",
			children: hint
		})] })]
	});
}
function CeremonyOverlay() {
	const game = useGame((s) => s.game);
	const skipCategory = useGame((s) => s.skipCategory);
	const skipShow = useGame((s) => s.skipShow);
	const cer = game.ceremony;
	if (!cer || cer.done) return null;
	const cat = cer.categories[cer.cursor];
	const remaining = cer.categories.length - cer.cursor;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-40 grid place-items-end bg-bg/75 p-0 sm:place-items-center sm:p-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex max-h-[92dvh] w-full max-w-lg flex-col overflow-hidden rounded-t-2xl border border-border bg-surface shadow-2xl sm:rounded-2xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "border-b border-border px-4 py-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] uppercase tracking-[0.16em] text-faint",
						children: "Live telecast"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl leading-tight",
						children: cer.show
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-muted",
						children: [
							"Category ",
							Math.min(cer.cursor + 1, cer.categories.length),
							" of ",
							cer.categories.length
						]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 overflow-auto px-4 py-4",
				children: [
					cat ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
						title: cat.category,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "grid gap-2 text-sm",
							children: cat.nominees.map((n, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex justify-between gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [n.name, n.songId ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-muted",
									children: [" · ", n.title]
								}) : null] }), cat.revealed && i === cat.winnerIndex ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
									tone: "mint",
									children: "wins"
								}) : null]
							}, `${n.artistId}-${n.songId ?? i}`))
						})
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: "Envelope is empty."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-muted",
						children: [remaining, " left. Skipping still records the winners."]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrimaryBtn, {
							onClick: skipCategory,
							children: "Skip category"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GhostBtn, {
							onClick: skipShow,
							children: "Skip show"
						})]
					})
				]
			})]
		})
	});
}
var MUSIC_VIEWS = [
	"studio",
	"promo",
	"merch",
	"tours"
];
var CHART_VIEWS = ["charts", "awards"];
var MONEY_VIEWS = [
	"bank",
	"books",
	"career",
	"roster"
];
var LIFE_VIEWS = [
	"more",
	"family",
	"life",
	"health",
	"nightlife",
	"hollywood",
	"gigs",
	"legal",
	"skills"
];
var NAV = [
	{
		id: "hq",
		short: "HQ",
		full: "HQ",
		icon: LayoutDashboard,
		hub: "hq"
	},
	{
		id: "studio",
		short: "Music",
		full: "Music & Promo",
		icon: Music2,
		hub: "music"
	},
	{
		id: "charts",
		short: "Charts",
		full: "Charts & Awards",
		icon: ChartLine,
		hub: "charts"
	},
	{
		id: "social",
		short: "Socials",
		full: "Socials & Media",
		icon: Radio,
		hub: "social"
	},
	{
		id: "bank",
		short: "Money",
		full: "Finances & Label",
		icon: Landmark,
		hub: "money"
	},
	{
		id: "more",
		short: "Life",
		full: "Lifestyle",
		icon: Sparkles,
		hub: "life"
	}
];
function hubOf(view) {
	if (MUSIC_VIEWS.includes(view)) return "music";
	if (CHART_VIEWS.includes(view)) return "charts";
	if (MONEY_VIEWS.includes(view)) return "money";
	if (LIFE_VIEWS.includes(view) || view === "mail") return view === "mail" ? "hq" : "life";
	if (view === "social") return "social";
	return "hq";
}
function Shell() {
	const game = useGame((s) => s.game);
	const view = useGame((s) => s.view);
	const overlay = useGame((s) => s.overlay);
	const setView = useGame((s) => s.setView);
	const setOverlay = useGame((s) => s.setOverlay);
	const setMoreTab = useGame((s) => s.setMoreTab);
	const nextWeek = useGame((s) => s.nextWeek);
	const toasts = useGame((s) => s.toasts);
	const checkout = useGame((s) => s.checkout);
	const roster = rosterOf(game);
	const you = playerArtist(game) ?? roster[0];
	const unread = unreadMail(game);
	const title = game.career === "artist" ? you?.name ?? "Independent" : game.labelName;
	const activeHub = hubOf(view);
	const goNav = (item) => {
		if (item.hub === "life") {
			setMoreTab("home");
			setView("more");
			return;
		}
		setView(item.id);
	};
	const openProfile = () => {
		if (game.career === "artist") setView("career");
		else setView("roster");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-dvh bg-bg text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "hidden w-56 shrink-0 flex-col border-r border-border bg-surface lg:flex",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "px-5 py-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-xl leading-tight tracking-tight",
								children: title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 text-xs text-muted",
								children: [game.city, game.career === "artist" ? game.dealKind === "signed" ? ` · ${game.labelName}` : " · Independent" : " · Label"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-[10px] tracking-[0.16em] text-faint uppercase",
								children: GAME_TITLE
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						className: "grid gap-1 px-3",
						children: NAV.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => goNav(item),
							className: cn("flex min-h-11 items-center gap-3 rounded-md px-3 text-sm", activeHub === item.hub ? "bg-subtle text-fg" : "text-muted hover:bg-subtle/60 hover:text-fg"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, { className: "size-4" }), item.full]
						}, item.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-auto grid gap-2 px-4 py-5 text-xs text-muted",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Week net" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "tabular-nums text-fg",
									children: signedMoney(game.ledger.net)
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Popularity" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "tabular-nums text-fg",
									children: Math.round(you?.popularity ?? 0)
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "FICO" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "tabular-nums text-fg",
									children: Math.round(game.creditScore)
								})]
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-w-0 flex-1 flex-col",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
						className: "flex items-center gap-2 border-b border-border px-3 py-2 md:gap-3 md:px-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: openProfile,
								className: "relative grid size-11 shrink-0 place-items-center",
								"aria-label": "Profile",
								children: you ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArtistAvatar, {
									spec: you.avatar,
									size: 36
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "grid size-9 place-items-center rounded-full bg-subtle text-xs",
									children: "You"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setView("mail"),
								className: "relative grid size-11 shrink-0 place-items-center rounded-md hover:bg-subtle",
								"aria-label": unread ? `Inbox, ${unread} unread` : "Inbox",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "size-5" }), unread > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "absolute top-1.5 right-1.5 grid min-w-4 place-items-center rounded-full bg-accent px-1 text-[10px] font-medium text-accent-fg",
									children: unread > 9 ? "9+" : unread
								}) : null]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "truncate text-sm font-medium",
									children: weekLabel(game.week)
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "truncate text-xs text-muted lg:hidden",
									children: title
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "max-w-20 truncate tabular-nums text-sm font-medium sm:max-w-none",
								children: money(game.cash)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: nextWeek,
								className: "min-h-11 rounded-md bg-accent px-2.5 text-sm font-medium text-accent-fg sm:px-3",
								children: "Next week"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GearMenu, { setOverlay })
						]
					}),
					activeHub === "music" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeskTabs, { items: [
						{
							id: "studio",
							label: "Studio",
							active: view === "studio",
							onClick: () => setView("studio")
						},
						{
							id: "promo",
							label: "Promo",
							active: view === "promo",
							onClick: () => setView("promo")
						},
						{
							id: "videos",
							label: "Videos",
							active: overlay.type === "youtube" && overlay.tab === "studio",
							onClick: () => setOverlay({
								type: "youtube",
								tab: "studio"
							})
						},
						{
							id: "merch",
							label: "Merch",
							active: view === "merch",
							onClick: () => setView("merch")
						},
						{
							id: "tours",
							label: "Tours",
							active: view === "tours",
							onClick: () => setView("tours")
						}
					] }),
					activeHub === "charts" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeskTabs, { items: [{
						id: "charts",
						label: "Boards",
						active: view === "charts",
						onClick: () => setView("charts")
					}, {
						id: "awards",
						label: "Awards",
						active: view === "awards",
						onClick: () => setView("awards")
					}] }),
					activeHub === "money" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeskTabs, { items: [
						{
							id: "bank",
							label: "Bank",
							active: view === "bank",
							onClick: () => setView("bank")
						},
						{
							id: "books",
							label: "History",
							active: view === "books",
							onClick: () => setView("books")
						},
						{
							id: "career",
							label: game.career === "label" ? "Label / AGM" : "Deals",
							active: view === "career",
							onClick: () => setView("career")
						},
						...game.career === "label" ? [{
							id: "roster",
							label: "Roster",
							active: view === "roster",
							onClick: () => setView("roster")
						}] : []
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
						className: "flex-1 overflow-auto pb-24 lg:pb-8",
						children: [
							view === "hq" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dashboard, {}),
							view === "roster" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Roster, {}),
							view === "career" && (game.career === "artist" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Career, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mx-auto grid max-w-3xl gap-4 p-4 md:p-6",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
									className: "font-display text-3xl",
									children: "Label / AGM"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabelOps, {})]
							})),
							view === "studio" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Studio$1, {}),
							view === "charts" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Charts, {}),
							view === "social" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SocialHub, {}),
							view === "books" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Books, {}),
							view === "tours" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToursScreen, {}),
							view === "promo" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PromoScreen, {}),
							view === "awards" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AwardsScreen, {}),
							view === "bank" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BankScreen, {}),
							view === "life" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LifeScreen, {}),
							view === "merch" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MerchScreen, {}),
							view === "family" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FamilyScreen, {}),
							view === "skills" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkillsScreen, {}),
							view === "mail" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MailScreen, {}),
							view === "hollywood" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HollywoodScreen, {}),
							view === "legal" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LegalScreen, {}),
							view === "health" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HealthScreen, {}),
							view === "nightlife" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NightlifeScreen, {}),
							view === "gigs" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GigsScreen, {}),
							view === "more" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MoreScreen, {})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "fixed inset-x-0 bottom-0 z-20 grid grid-cols-6 border-t border-border bg-surface/95 px-1 py-1 backdrop-blur lg:hidden",
				children: NAV.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => goNav(item),
					className: cn("flex min-h-12 flex-col items-center justify-center gap-0.5 text-[10px] leading-tight", activeHub === item.hub ? "text-accent" : "text-muted"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, { className: "size-4" }), item.short]
				}, item.id))
			}),
			overlay.type === "tiktok" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TikTokApp, {}),
			overlay.type === "x" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(XApp, {}),
			overlay.type === "instagram" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InstagramApp, {}),
			overlay.type === "spotify" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpotifyApp, {}),
			overlay.type === "youtube" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(YouTubeApp, {}),
			overlay.type === "scout" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scout, {}),
			overlay.type === "artist" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArtistModal, { id: overlay.id }),
			overlay.type === "rollout" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rollout, { clipId: overlay.clipId }),
			overlay.type === "wiki" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WikiPage, { artistId: overlay.artistId }),
			checkout ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaySheet, {}) : null,
			overlay.type === "ceremony" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CeremonyOverlay, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SystemSheet, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pointer-events-none fixed top-16 right-4 z-50 grid gap-2",
				children: toasts.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: cn("pointer-events-auto min-w-56 max-w-xs rounded-md border border-border bg-elevated px-3 py-2 text-sm shadow-lg", t.tone === "viral" && "border-tok-like/40", t.tone === "bad" && "border-bad/40", t.tone === "good" && "border-good/40"),
					children: t.text
				}, t.id))
			})
		]
	});
}
function GearMenu({ setOverlay }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	const ref = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		if (!open) return;
		const onDoc = (e) => {
			if (!ref.current?.contains(e.target)) setOpen(false);
		};
		document.addEventListener("mousedown", onDoc);
		return () => document.removeEventListener("mousedown", onDoc);
	}, [open]);
	const pick = (type) => {
		setOpen(false);
		setOverlay({ type });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative",
		ref,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			onClick: () => setOpen((v) => !v),
			className: "grid size-11 place-items-center rounded-md hover:bg-subtle",
			"aria-label": "Settings",
			"aria-expanded": open,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, { className: "size-5" })
		}), open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "absolute top-12 right-0 z-30 w-52 overflow-hidden rounded-xl border border-border bg-elevated shadow-xl",
			children: [
				{
					type: "saves",
					label: "Save / Load"
				},
				{
					type: "settings",
					label: "Settings"
				},
				{
					type: "cheats",
					label: "Cheats"
				}
			].map((it) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => pick(it.type),
				className: "flex min-h-11 w-full items-center px-4 text-left text-sm hover:bg-subtle",
				children: it.label
			}, it.type))
		}) : null]
	});
}
function GameApp() {
	const hydrated = useGame((s) => s.hydrated);
	const game = useGame((s) => s.game);
	const [entered, setEntered] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const t = window.setTimeout(() => {
			if (!useGame.getState().hydrated) useGame.setState({ hydrated: true });
		}, 80);
		return () => window.clearTimeout(t);
	}, []);
	if (!hydrated) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid min-h-dvh place-items-center bg-bg text-muted",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-display text-2xl text-fg",
			children: GAME_TITLE
		})
	});
	if (!entered || !game) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TitleScreen, { onPlay: () => setEntered(true) });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, {});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GameApp, {});
}
//#endregion
export { Home as component };
