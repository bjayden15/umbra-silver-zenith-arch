import { useState, type ReactNode } from "react";
import {
  Briefcase,
  Clapperboard,
  Heart,
  Wrench,
} from "lucide-react";
import { compact, money } from "@/lib/game/format";
import { ceoScore, netWorth, playerArtist, rosterOf } from "@/lib/game/sim";
import { useGame } from "@/lib/game/store";
import type { ViewId } from "@/lib/game/types";
import { CREATOR, GAME_TITLE, TAGLINE, VERIFY_AT } from "@/lib/game/types";
import { ACHIEVEMENTS } from "@/lib/game/world";
import { GhostBtn, Panel, Pill, PrimaryBtn } from "./bits";
import { cn } from "@/lib/utils";

type HubItem = {
  label: string;
  hint: string;
  view?: ViewId;
  tab?: string;
};

type HubCard = {
  id: string;
  title: string;
  blurb: string;
  icon: typeof Heart;
  items: HubItem[];
};

const HUBS: HubCard[] = [
  {
    id: "personal",
    title: "Personal Life & Assets",
    blurb: "Family, houses, jets, islands, health.",
    icon: Heart,
    items: [
      { label: "Family & Relationships", hint: "Dating, Mom & Dad, kids, school", view: "family" },
      { label: "Real Estate & Travel", hint: "Mansions, cars, jets, islands, vacations", view: "life" },
      { label: "Health & Wellness", hint: "Energy, substances, vocal rest, rehab", view: "health" },
    ],
  },
  {
    id: "fame",
    title: "Fame, Nightlife & Screen",
    blurb: "Clubs, Hollywood, paid gigs, talent TV.",
    icon: Clapperboard,
    items: [
      { label: "Nightlife & VIP", hint: "Booths, bottles, casino, afterparties", view: "nightlife" },
      { label: "Hollywood & OSTs", hint: "Roles, voice work, soundtrack leads", view: "hollywood" },
      { label: "Paid Bookings", hint: "Clubs, private concerts, corporate sets", view: "gigs" },
      { label: "Talent Shows", hint: "Reality singing, judging, guest spots", tab: "talent" },
    ],
  },
  {
    id: "business",
    title: "Business, Law & Management",
    blurb: "Skills, legal, security, entourage.",
    icon: Briefcase,
    items: [
      { label: "Artist Skills", hint: "Vocals, writing, stage, media savvy", view: "skills" },
      { label: "Legal & Law Enforcement", hint: "Charges, lawyers, bail, sentences", view: "legal" },
      { label: "Security & Entourage", hint: "Guards, drivers, chefs, anti-pap", view: "life" },
    ],
  },
  {
    id: "system",
    title: "System & Meta",
    blurb: "Saves, settings, cheats, credits.",
    icon: Wrench,
    items: [
      { label: "Save / Load", hint: "Slots and autosave", tab: "save" },
      { label: "Settings", hint: "Difficulty, autosave, quit", tab: "settings" },
      { label: "Achievements", hint: "Hardware and firsts", tab: "achievements" },
      { label: "Leaderboards", hint: "Uploaded scores", tab: "leaders" },
      { label: "Cheats", hint: "Testing console", tab: "cheats" },
      { label: "R2S Editor", hint: "AI control, roster inspect", tab: "editor" },
      { label: "Admin", hint: "Live world stats", tab: "admin" },
      { label: "Credits", hint: "Created by Jayden Carter", tab: "credits" },
    ],
  },
];

export function MoreScreen() {
  const setView = useGame((s) => s.setView);
  const moreTab = useGame((s) => s.moreTab);
  const setMoreTab = useGame((s) => s.setMoreTab);
  const [open, setOpen] = useState<string | null>(moreTab && moreTab !== "home" ? hubForTab(moreTab) : null);

  const go = (it: HubItem) => {
    if (it.view) setView(it.view);
    else if (it.tab) setMoreTab(it.tab);
  };

  return (
    <div className="mx-auto grid max-w-4xl gap-4 p-4 md:p-6">
      <div>
        <h1 className="font-display text-3xl">Lifestyle & Hub</h1>
        <p className="text-sm text-muted">Four desks. Daily loops live in the bar. This is the rest of the building.</p>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {HUBS.map((hub) => {
          const Icon = hub.icon;
          const expanded = open === hub.id;
          return (
            <section
              key={hub.id}
              className={cn(
                "rounded-xl border border-border bg-surface p-4",
                expanded && "border-accent/40 md:col-span-2",
              )}
            >
              <button
                type="button"
                onClick={() => setOpen(expanded ? null : hub.id)}
                className="flex w-full items-start gap-3 text-left"
              >
                <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-subtle">
                  <Icon className="size-5 text-accent" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-display text-xl leading-tight">{hub.title}</span>
                  <span className="mt-1 block text-sm text-muted">{hub.blurb}</span>
                </span>
              </button>
              {expanded ? (
                <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                  {hub.items.map((it) => (
                    <li key={it.label}>
                      <button
                        type="button"
                        onClick={() => go(it)}
                        className="flex min-h-14 w-full flex-col rounded-lg bg-subtle px-3 py-2 text-left hover:bg-elevated"
                      >
                        <span className="text-sm font-medium">{it.label}</span>
                        <span className="text-xs text-muted">{it.hint}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-3 text-xs text-muted">{hub.items.map((i) => i.label).join(" · ")}</p>
              )}
            </section>
          );
        })}
      </div>
      {moreTab === "save" && <Saves />}
      {moreTab === "settings" && <Settings />}
      {moreTab === "achievements" && <Achievements />}
      {moreTab === "leaders" && <Leaders />}
      {moreTab === "admin" && <Admin />}
      {moreTab === "editor" && <Editor />}
      {moreTab === "cheats" && <Cheats />}
      {moreTab === "credits" && <Credits />}
      {moreTab === "label" && <LabelOps />}
      {moreTab === "talent" && <TalentShow />}
    </div>
  );
}

function hubForTab(tab: string) {
  for (const h of HUBS) {
    if (h.items.some((i) => i.tab === tab)) return h.id;
  }
  return null;
}

export function Saves() {
  const listSlots = useGame((s) => s.listSlots);
  const saveSlot = useGame((s) => s.saveSlot);
  const loadSlot = useGame((s) => s.loadSlot);
  const slots = listSlots();
  return (
    <Panel title="Save game">
      <ul className="grid gap-2">
        {slots.map((s) => (
          <li key={s.slot} className="flex items-center justify-between gap-2">
            <span className="text-sm">
              {s.slot === 0 ? "Autosave" : `Slot ${s.slot}`}
              <span className="text-muted"> · {s.week ? `${s.label} · w${s.week}` : "Empty"}</span>
            </span>
            <span className="flex gap-2">
              {s.slot !== 0 && <GhostBtn onClick={() => saveSlot(s.slot)}>Save</GhostBtn>}
              <GhostBtn disabled={!s.week} onClick={() => loadSlot(s.slot)}>
                Load
              </GhostBtn>
            </span>
          </li>
        ))}
      </ul>
    </Panel>
  );
}

export function Settings() {
  const game = useGame((s) => s.game)!;
  const toggleAutosave = useGame((s) => s.toggleAutosave);
  const setDifficulty = useGame((s) => s.setDifficulty);
  const reset = useGame((s) => s.reset);
  const [updateNote, setUpdateNote] = useState<string | null>(null);
  return (
    <Panel title="Preferences">
      <div className="grid gap-3 text-sm">
        <button onClick={toggleAutosave} className="flex min-h-11 items-center justify-between rounded-md bg-subtle px-3">
          Autosave <Pill tone={game.settings.autosave ? "mint" : "default"}>{game.settings.autosave ? "on" : "off"}</Pill>
        </button>
        <div className="flex min-h-11 flex-wrap items-center justify-between gap-2 rounded-md bg-subtle px-3 py-2">
          <span>Difficulty</span>
          <span className="flex gap-1">
            {(["easy", "normal", "hard"] as const).map((d) => (
              <button
                key={d}
                onClick={() => setDifficulty(d)}
                className={`rounded-full px-3 py-1 text-xs ${game.settings.difficulty === d ? "bg-accent text-accent-fg" : "bg-elevated"}`}
              >
                {d}
              </button>
            ))}
          </span>
        </div>
        <p className="text-muted">
          Database: {game.settings.database === "real" ? "RealArtists.db" : "Normal.db"} · build {game.updateVersion}
        </p>
        <div className="flex flex-wrap items-center gap-2">
          <GhostBtn
            onClick={() => {
              setUpdateNote(`Up to date · ${game.updateVersion}. Auto-updater checks this build.`);
            }}
          >
            Check for updates
          </GhostBtn>
          {updateNote ? <span className="text-xs text-muted">{updateNote}</span> : null}
        </div>
        <GhostBtn onClick={reset}>Quit to title</GhostBtn>
      </div>
    </Panel>
  );
}

export function Achievements() {
  const game = useGame((s) => s.game)!;
  return (
    <Panel title="Achievements">
      <ul className="grid gap-2">
        {ACHIEVEMENTS.map((a) => {
          const got = game.achievements.find((x) => x.id === a.id);
          return (
            <li key={a.id} className="flex justify-between text-sm">
              <span className={got ? "" : "text-muted"}>
                {a.name}
                <span className="text-muted"> · {a.hint}</span>
              </span>
              {got ? <Pill tone="mint">w{got.week}</Pill> : <span className="text-muted">—</span>}
            </li>
          );
        })}
      </ul>
    </Panel>
  );
}

export function Leaders() {
  const upload = useGame((s) => s.uploadLeaderboard);
  let rows: { name: string; score: number; week: number }[] = [];
  try {
    rows = JSON.parse(localStorage.getItem("musicstar.leaders.v1") ?? "[]") as typeof rows;
  } catch {
    rows = [];
  }
  return (
    <Panel title="Leaderboards" action={<GhostBtn onClick={upload}>Upload on save</GhostBtn>}>
      {rows.length === 0 ? (
        <p className="text-sm text-muted">Save a game to upload a score.</p>
      ) : (
        <ol className="grid gap-1 text-sm">
          {rows.map((r, i) => (
            <li key={i} className="flex justify-between">
              <span>
                #{i + 1} {r.name}
              </span>
              <span className="tabular-nums text-muted">
                {r.score} · w{r.week}
              </span>
            </li>
          ))}
        </ol>
      )}
    </Panel>
  );
}

export function Admin() {
  const game = useGame((s) => s.game)!;
  const you = playerArtist(game);
  return (
    <Panel title="Admin stats">
      <ul className="grid gap-2 text-sm">
        <li className="flex justify-between">
          <span className="text-muted">Week</span>
          <span>{game.week}</span>
        </li>
        <li className="flex justify-between">
          <span className="text-muted">Artists in world</span>
          <span>{game.artists.length}</span>
        </li>
        <li className="flex justify-between">
          <span className="text-muted">Songs</span>
          <span>{game.songs.length}</span>
        </li>
        <li className="flex justify-between">
          <span className="text-muted">Net worth</span>
          <span>{money(netWorth(game))}</span>
        </li>
        <li className="flex justify-between">
          <span className="text-muted">CEO score</span>
          <span>{ceoScore(game)}</span>
        </li>
        <li className="flex justify-between">
          <span className="text-muted">Verify thresholds</span>
          <span className="text-right text-muted">
            100k apps / {VERIFY_AT.spotify.toLocaleString("en-US")} Spotify 4-wk
          </span>
        </li>
        {you && (
          <li className="flex justify-between">
            <span className="text-muted">Your 4-week streams</span>
            <span>{compact(you.monthlyListeners)}</span>
          </li>
        )}
      </ul>
    </Panel>
  );
}

export function Editor() {
  const game = useGame((s) => s.game)!;
  const toggleAi = useGame((s) => s.toggleAi);
  const roster = rosterOf(game);
  return (
    <Panel title="R2S Editor">
      <p className="text-sm text-muted">Web stand-in for R2S_Editor.exe — toggle AI control, inspect roster data.</p>
      <ul className="mt-3 grid gap-2 text-sm">
        {roster.map((a) => (
          <li key={a.id} className="flex items-center justify-between">
            <span>
              {a.name} · {a.genre} · age {a.age}
            </span>
            <GhostBtn onClick={() => toggleAi(a.id)}>{a.aiControl ? "AI on" : "AI off"}</GhostBtn>
          </li>
        ))}
      </ul>
    </Panel>
  );
}

export function Cheats() {
  const cheat = useGame((s) => s.cheat);
  return (
    <Panel title="Cheats · testing">
      <p className="mb-3 text-sm text-muted">For testing only. Does not touch leaderboards retroactively.</p>
      <div className="flex flex-wrap gap-2">
        <PrimaryBtn onClick={() => cheat("money")}>+$1M</PrimaryBtn>
        <GhostBtn onClick={() => cheat("fans")}>100k every app</GhostBtn>
        <GhostBtn onClick={() => cheat("skills")}>Max skills</GhostBtn>
        <GhostBtn onClick={() => cheat("hit")}>Spawn a hit</GhostBtn>
        <GhostBtn onClick={() => cheat("score")}>FICO 820</GhostBtn>
        <GhostBtn onClick={() => cheat("viral")}>Force viral</GhostBtn>
        <GhostBtn onClick={() => cheat("fame")}>Fame 92</GhostBtn>
        <GhostBtn onClick={() => cheat("year")}>Skip a year</GhostBtn>
        <GhostBtn onClick={() => cheat("jail")}>Jail 4 weeks</GhostBtn>
      </div>
    </Panel>
  );
}

export function Credits() {
  return (
    <Panel title="Credits">
      <p className="font-display text-2xl">{GAME_TITLE}</p>
      <p className="mt-3 text-sm">{TAGLINE}</p>
      <p className="mt-4 text-sm">
        Created by <span className="font-medium">{CREATOR}</span> only.
      </p>
    </Panel>
  );
}

export function LabelOps() {
  const game = useGame((s) => s.game)!;
  const invest = useGame((s) => s.invest);
  const sponsor = useGame((s) => s.sponsor);
  const openCheckout = useGame((s) => s.openCheckout);
  const sponsors = [
    { name: "Nike", weekly: 12_000, weeks: 12 },
    { name: "Pepsi", weekly: 9_500, weeks: 10 },
    { name: "Beats", weekly: 7_200, weeks: 8 },
    { name: "Cîroc", weekly: 6_400, weeks: 8 },
  ];
  return (
    <div className="grid gap-4">
      <Panel title="Ownership">
        <p className="text-sm">
          You own <span className="tabular-nums">{game.labelOwnedPct}%</span>
          {game.career === "label" ? ` of ${game.labelName}` : " as an independent"}.
        </p>
        {game.career === "label" && (
          <div className="mt-3 flex flex-wrap gap-2">
            <PrimaryBtn onClick={() => invest(250_000, 12, "Northline Capital")}>Take $250k · 12%</PrimaryBtn>
            <GhostBtn onClick={() => invest(80_000, 6, "Harbor Angels")}>$80k · 6%</GhostBtn>
          </div>
        )}
        {game.investors.length > 0 && (
          <ul className="mt-3 grid gap-1 text-sm text-muted">
            {game.investors.map((i) => (
              <li key={i.name}>
                {i.name} · {money(i.amount)} · {i.equity}%
              </li>
            ))}
          </ul>
        )}
      </Panel>
      <Panel title="Facilities">
        <div className="flex flex-wrap gap-2">
          <GhostBtn
            disabled={game.facilities.studio}
            onClick={() =>
              openCheckout({
                kind: "facility",
                id: "studio",
                title: "Build in-house studio",
                price: 180_000,
                extra: { facility: "studio" },
              })
            }
          >
            {game.facilities.studio ? "Studio built" : "Build studio · $180k"}
          </GhostBtn>
          <GhostBtn
            disabled={game.facilities.manufacturing}
            onClick={() =>
              openCheckout({
                kind: "facility",
                id: "manufacturing",
                title: "Manufacturing plant",
                price: 240_000,
                extra: { facility: "manufacturing" },
              })
            }
          >
            {game.facilities.manufacturing ? "Plant built" : "Manufacturing · $240k"}
          </GhostBtn>
          <GhostBtn
            disabled={game.facilities.distribution}
            onClick={() =>
              openCheckout({
                kind: "facility",
                id: "distribution",
                title: "Distribution office",
                price: 160_000,
                extra: { facility: "distribution" },
              })
            }
          >
            {game.facilities.distribution ? "Distro live" : "Distribution · $160k"}
          </GhostBtn>
        </div>
      </Panel>
      <Panel title="Sponsors">
        <div className="flex flex-wrap gap-2">
          {sponsors.map((s) => (
            <GhostBtn key={s.name} onClick={() => sponsor(s.name, s.weekly, s.weeks)}>
              {s.name} · {money(s.weekly)}/wk
            </GhostBtn>
          ))}
        </div>
        {game.sponsors.length > 0 && (
          <ul className="mt-3 grid gap-1 text-sm text-muted">
            {game.sponsors.map((s) => (
              <li key={s.name}>
                {s.name} · {money(s.weekly)}/wk · {s.weeksLeft}w
              </li>
            ))}
          </ul>
        )}
      </Panel>
    </div>
  );
}

export function TalentShow() {
  const game = useGame((s) => s.game)!;
  const talent = useGame((s) => s.talent);
  const stage = game.talentShow?.stage ?? "none";
  return (
    <Panel title="Talent show">
      <p className="text-sm text-muted">
        X Factor-style. Audition, judges, final. The clip lives on TikTok either way.
      </p>
      <p className="mt-2 text-sm">
        Stage: <span className="font-medium">{stage === "none" ? "not entered" : stage}</span>
      </p>
      <PrimaryBtn className="mt-3" onClick={talent}>
        {stage === "none" || stage === "final" ? "Enter · $8,000" : stage === "audition" ? "Face the judges" : "Go to the final"}
      </PrimaryBtn>
    </Panel>
  );
}

export function SystemSheet() {
  const overlay = useGame((s) => s.overlay);
  const setOverlay = useGame((s) => s.setOverlay);
  const kind = overlay.type;
  const map: Record<string, { title: string; node: ReactNode }> = {
    saves: { title: "Save / Load", node: <Saves /> },
    settings: { title: "Settings", node: <Settings /> },
    cheats: { title: "Cheats", node: <Cheats /> },
    credits: { title: "Credits", node: <Credits /> },
    achievements: { title: "Achievements", node: <Achievements /> },
    leaderboards: { title: "Leaderboards", node: <Leaders /> },
    admin: { title: "Admin", node: <Admin /> },
    editor: { title: "R2S Editor", node: <Editor /> },
  };
  const page = map[kind];
  if (!page) return null;
  return (
    <div
      className="fixed inset-0 z-40 grid place-items-end bg-bg/70 p-0 sm:place-items-center sm:p-4"
      onClick={() => setOverlay({ type: "none" })}
    >
      <div
        role="dialog"
        aria-label={page.title}
        className="max-h-[88dvh] w-full max-w-lg overflow-auto rounded-t-2xl border border-border bg-surface p-4 shadow-2xl sm:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-3 flex items-center justify-between">
          <p className="text-xs tracking-[0.16em] text-faint uppercase">Gear</p>
          <GhostBtn onClick={() => setOverlay({ type: "none" })}>Close</GhostBtn>
        </div>
        {page.node}
      </div>
    </div>
  );
}
