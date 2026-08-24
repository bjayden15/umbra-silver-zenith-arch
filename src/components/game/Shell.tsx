import { useEffect, useRef, useState } from "react";
import {
  Landmark,
  LayoutDashboard,
  LineChart,
  Mail,
  Music2,
  Radio,
  Settings,
  Sparkles,
} from "lucide-react";
import { money, signedMoney, weekLabel } from "@/lib/game/format";
import { playerArtist, rosterOf, unreadMail } from "@/lib/game/sim";
import { useGame } from "@/lib/game/store";
import type { Overlay, ViewId } from "@/lib/game/types";
import { GAME_TITLE } from "@/lib/game/types";
import { cn } from "@/lib/utils";
import { Dashboard } from "./Dashboard";
import { Roster } from "./Roster";
import { Studio } from "./Studio";
import { Charts } from "./Charts";
import { SocialHub } from "./SocialHub";
import { Books } from "./Books";
import { Career } from "./Career";
import { TikTokApp } from "./TikTokApp";
import { XApp } from "./XApp";
import { InstagramApp } from "./InstagramApp";
import { SpotifyApp } from "./SpotifyApp";
import { YouTubeApp } from "./YouTubeApp";
import { Scout } from "./Scout";
import { ArtistModal } from "./ArtistModal";
import { Rollout } from "./Rollout";
import { ToursScreen, PromoScreen, AwardsScreen, BankScreen, LifeScreen, MerchScreen, FamilyScreen, SkillsScreen, GigsScreen } from "./Systems";
import { LabelOps, MoreScreen, SystemSheet } from "./More";
import { WikiPage } from "./Wiki";
import { HollywoodScreen, HealthScreen, LegalScreen, MailScreen, NightlifeScreen } from "./CityLife";
import { PaySheet } from "./PaySheet";
import { CeremonyOverlay } from "./Ceremony";
import { ArtistAvatar } from "./ArtistAvatar";
import { DeskTabs } from "./bits";

const MUSIC_VIEWS: ViewId[] = ["studio", "promo", "merch", "tours"];
const CHART_VIEWS: ViewId[] = ["charts", "awards"];
const MONEY_VIEWS: ViewId[] = ["bank", "books", "career", "roster"];
const LIFE_VIEWS: ViewId[] = [
  "more",
  "family",
  "life",
  "health",
  "nightlife",
  "hollywood",
  "gigs",
  "legal",
  "skills",
];

type NavItem = {
  id: ViewId;
  short: string;
  full: string;
  icon: typeof LayoutDashboard;
  hub: "hq" | "music" | "charts" | "social" | "money" | "life";
};

const NAV: NavItem[] = [
  { id: "hq", short: "HQ", full: "HQ", icon: LayoutDashboard, hub: "hq" },
  { id: "studio", short: "Music", full: "Music & Promo", icon: Music2, hub: "music" },
  { id: "charts", short: "Charts", full: "Charts & Awards", icon: LineChart, hub: "charts" },
  { id: "social", short: "Socials", full: "Socials & Media", icon: Radio, hub: "social" },
  { id: "bank", short: "Money", full: "Finances & Label", icon: Landmark, hub: "money" },
  { id: "more", short: "Life", full: "Lifestyle", icon: Sparkles, hub: "life" },
];

function hubOf(view: ViewId): NavItem["hub"] {
  if (MUSIC_VIEWS.includes(view)) return "music";
  if (CHART_VIEWS.includes(view)) return "charts";
  if (MONEY_VIEWS.includes(view)) return "money";
  if (LIFE_VIEWS.includes(view) || view === "mail") return view === "mail" ? "hq" : "life";
  if (view === "social") return "social";
  return "hq";
}

export function Shell() {
  const game = useGame((s) => s.game)!;
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
  const title = game.career === "artist" ? (you?.name ?? "Independent") : game.labelName;
  const activeHub = hubOf(view);

  const goNav = (item: NavItem) => {
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

  return (
    <div className="flex min-h-dvh bg-bg text-fg">
      <aside className="hidden w-56 shrink-0 flex-col border-r border-border bg-surface lg:flex">
        <div className="px-5 py-6">
          <p className="font-display text-xl leading-tight tracking-tight">{title}</p>
          <p className="mt-1 text-xs text-muted">
            {game.city}
            {game.career === "artist" ? (game.dealKind === "signed" ? ` · ${game.labelName}` : " · Independent") : " · Label"}
          </p>
          <p className="mt-2 text-[10px] tracking-[0.16em] text-faint uppercase">{GAME_TITLE}</p>
        </div>
        <nav className="grid gap-1 px-3">
          {NAV.map((item) => (
            <button
              key={item.id}
              onClick={() => goNav(item)}
              className={cn(
                "flex min-h-11 items-center gap-3 rounded-md px-3 text-sm",
                activeHub === item.hub ? "bg-subtle text-fg" : "text-muted hover:bg-subtle/60 hover:text-fg",
              )}
            >
              <item.icon className="size-4" />
              {item.full}
            </button>
          ))}
        </nav>
        <div className="mt-auto grid gap-2 px-4 py-5 text-xs text-muted">
          <div className="flex justify-between">
            <span>Week net</span>
            <span className="tabular-nums text-fg">{signedMoney(game.ledger.net)}</span>
          </div>
          <div className="flex justify-between">
            <span>Popularity</span>
            <span className="tabular-nums text-fg">{Math.round(you?.popularity ?? 0)}</span>
          </div>
          <div className="flex justify-between">
            <span>FICO</span>
            <span className="tabular-nums text-fg">{Math.round(game.creditScore)}</span>
          </div>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center gap-2 border-b border-border px-3 py-2 md:gap-3 md:px-6">
          <button
            type="button"
            onClick={openProfile}
            className="relative grid size-11 shrink-0 place-items-center"
            aria-label="Profile"
          >
            {you ? (
              <ArtistAvatar spec={you.avatar} size={36} />
            ) : (
              <span className="grid size-9 place-items-center rounded-full bg-subtle text-xs">You</span>
            )}
          </button>
          <button
            type="button"
            onClick={() => setView("mail")}
            className="relative grid size-11 shrink-0 place-items-center rounded-md hover:bg-subtle"
            aria-label={unread ? `Inbox, ${unread} unread` : "Inbox"}
          >
            <Mail className="size-5" />
            {unread > 0 ? (
              <span className="absolute top-1.5 right-1.5 grid min-w-4 place-items-center rounded-full bg-accent px-1 text-[10px] font-medium text-accent-fg">
                {unread > 9 ? "9+" : unread}
              </span>
            ) : null}
          </button>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">{weekLabel(game.week)}</p>
            <p className="truncate text-xs text-muted lg:hidden">{title}</p>
          </div>
          <p className="max-w-20 truncate tabular-nums text-sm font-medium sm:max-w-none">{money(game.cash)}</p>
          <button
            type="button"
            onClick={nextWeek}
            className="min-h-11 rounded-md bg-accent px-2.5 text-sm font-medium text-accent-fg sm:px-3"
          >
            Next week
          </button>
          <GearMenu setOverlay={setOverlay} />
        </header>

        {activeHub === "music" && (
          <DeskTabs
            items={[
              { id: "studio", label: "Studio", active: view === "studio", onClick: () => setView("studio") },
              { id: "promo", label: "Promo", active: view === "promo", onClick: () => setView("promo") },
              {
                id: "videos",
                label: "Videos",
                active: overlay.type === "youtube" && overlay.tab === "studio",
                onClick: () => setOverlay({ type: "youtube", tab: "studio" }),
              },
              { id: "merch", label: "Merch", active: view === "merch", onClick: () => setView("merch") },
              { id: "tours", label: "Tours", active: view === "tours", onClick: () => setView("tours") },
            ]}
          />
        )}
        {activeHub === "charts" && (
          <DeskTabs
            items={[
              { id: "charts", label: "Boards", active: view === "charts", onClick: () => setView("charts") },
              { id: "awards", label: "Awards", active: view === "awards", onClick: () => setView("awards") },
            ]}
          />
        )}
        {activeHub === "money" && (
          <DeskTabs
            items={[
              { id: "bank", label: "Bank", active: view === "bank", onClick: () => setView("bank") },
              { id: "books", label: "History", active: view === "books", onClick: () => setView("books") },
              {
                id: "career",
                label: game.career === "label" ? "Label / AGM" : "Deals",
                active: view === "career",
                onClick: () => setView("career"),
              },
              ...(game.career === "label"
                ? [{ id: "roster", label: "Roster", active: view === "roster", onClick: () => setView("roster" as ViewId) }]
                : []),
            ]}
          />
        )}

        <main className="flex-1 overflow-auto pb-24 lg:pb-8">
          {view === "hq" && <Dashboard />}
          {view === "roster" && <Roster />}
          {view === "career" && (game.career === "artist" ? <Career /> : (
            <div className="mx-auto grid max-w-3xl gap-4 p-4 md:p-6">
              <h1 className="font-display text-3xl">Label / AGM</h1>
              <LabelOps />
            </div>
          ))}
          {view === "studio" && <Studio />}
          {view === "charts" && <Charts />}
          {view === "social" && <SocialHub />}
          {view === "books" && <Books />}
          {view === "tours" && <ToursScreen />}
          {view === "promo" && <PromoScreen />}
          {view === "awards" && <AwardsScreen />}
          {view === "bank" && <BankScreen />}
          {view === "life" && <LifeScreen />}
          {view === "merch" && <MerchScreen />}
          {view === "family" && <FamilyScreen />}
          {view === "skills" && <SkillsScreen />}
          {view === "mail" && <MailScreen />}
          {view === "hollywood" && <HollywoodScreen />}
          {view === "legal" && <LegalScreen />}
          {view === "health" && <HealthScreen />}
          {view === "nightlife" && <NightlifeScreen />}
          {view === "gigs" && <GigsScreen />}
          {view === "more" && <MoreScreen />}
        </main>
      </div>

      <nav className="fixed inset-x-0 bottom-0 z-20 grid grid-cols-6 border-t border-border bg-surface/95 px-1 py-1 backdrop-blur lg:hidden">
        {NAV.map((item) => (
          <button
            key={item.id}
            onClick={() => goNav(item)}
            className={cn(
              "flex min-h-12 flex-col items-center justify-center gap-0.5 text-[10px] leading-tight",
              activeHub === item.hub ? "text-accent" : "text-muted",
            )}
          >
            <item.icon className="size-4" />
            {item.short}
          </button>
        ))}
      </nav>

      {overlay.type === "tiktok" && <TikTokApp />}
      {overlay.type === "x" && <XApp />}
      {overlay.type === "instagram" && <InstagramApp />}
      {overlay.type === "spotify" && <SpotifyApp />}
      {overlay.type === "youtube" && <YouTubeApp />}
      {overlay.type === "scout" && <Scout />}
      {overlay.type === "artist" && <ArtistModal id={overlay.id} />}
      {overlay.type === "rollout" && <Rollout clipId={overlay.clipId} />}
      {overlay.type === "wiki" && <WikiPage artistId={overlay.artistId} />}
      {checkout ? <PaySheet /> : null}
      {overlay.type === "ceremony" && <CeremonyOverlay />}
      <SystemSheet />

      <div className="pointer-events-none fixed top-16 right-4 z-50 grid gap-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={cn(
              "pointer-events-auto min-w-56 max-w-xs rounded-md border border-border bg-elevated px-3 py-2 text-sm shadow-lg",
              t.tone === "viral" && "border-tok-like/40",
              t.tone === "bad" && "border-bad/40",
              t.tone === "good" && "border-good/40",
            )}
          >
            {t.text}
          </div>
        ))}
      </div>
    </div>
  );
}

function GearMenu({ setOverlay }: { setOverlay: (o: Overlay) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  const pick = (type: Overlay["type"]) => {
    setOpen(false);
    setOverlay({ type } as Overlay);
  };

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="grid size-11 place-items-center rounded-md hover:bg-subtle"
        aria-label="Settings"
        aria-expanded={open}
      >
        <Settings className="size-5" />
      </button>
      {open ? (
        <div className="absolute top-12 right-0 z-30 w-52 overflow-hidden rounded-xl border border-border bg-elevated shadow-xl">
          {(
            [
              { type: "saves" as const, label: "Save / Load" },
              { type: "settings" as const, label: "Settings" },
              { type: "cheats" as const, label: "Cheats" },
            ] as const
          ).map((it) => (
            <button
              key={it.type}
              type="button"
              onClick={() => pick(it.type)}
              className="flex min-h-11 w-full items-center px-4 text-left text-sm hover:bg-subtle"
            >
              {it.label}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
