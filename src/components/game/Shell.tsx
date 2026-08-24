import {
  Disc3,
  LayoutDashboard,
  LineChart,
  Music2,
  Sparkles,
  Users,
  Radio,
  Landmark,
  MoreHorizontal,
  Bus,
} from "lucide-react";
import { compact, money, signedMoney, weekLabel } from "@/lib/game/format";
import { rosterOf } from "@/lib/game/sim";
import { useGame } from "@/lib/game/store";
import type { ViewId } from "@/lib/game/types";
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
import { MoreScreen } from "./More";
import { WikiPage } from "./Wiki";
import { HollywoodScreen, HealthScreen, LegalScreen, MailScreen, NightlifeScreen } from "./CityLife";
import { PaySheet } from "./PaySheet";
import { CeremonyOverlay } from "./Ceremony";

export function Shell() {
  const game = useGame((s) => s.game)!;
  const view = useGame((s) => s.view);
  const overlay = useGame((s) => s.overlay);
  const setView = useGame((s) => s.setView);
  const nextWeek = useGame((s) => s.nextWeek);
  const toasts = useGame((s) => s.toasts);
  const checkout = useGame((s) => s.checkout);
  const roster = rosterOf(game);
  const tt = roster.reduce((a, x) => a + x.followers.tiktok, 0);
  const nav: { id: ViewId; label: string; icon: typeof LayoutDashboard }[] =
    game.career === "artist"
      ? [
          { id: "hq", label: "HQ", icon: LayoutDashboard },
          { id: "career", label: "Career", icon: Sparkles },
          { id: "studio", label: "Studio", icon: Music2 },
          { id: "charts", label: "Charts", icon: LineChart },
          { id: "social", label: "Socials", icon: Radio },
          { id: "tours", label: "Tours", icon: Bus },
          { id: "bank", label: "Bank", icon: Landmark },
          { id: "more", label: "More", icon: MoreHorizontal },
        ]
      : [
          { id: "hq", label: "HQ", icon: LayoutDashboard },
          { id: "roster", label: "Roster", icon: Users },
          { id: "studio", label: "Studio", icon: Music2 },
          { id: "charts", label: "Charts", icon: LineChart },
          { id: "social", label: "Socials", icon: Radio },
          { id: "tours", label: "Tours", icon: Bus },
          { id: "bank", label: "Bank", icon: Landmark },
          { id: "more", label: "More", icon: MoreHorizontal },
        ];

  const mobileNav = nav.filter((n) => ["hq", "studio", "charts", "social", "bank", "more"].includes(n.id));

  const title = game.career === "artist" ? (roster[0]?.name ?? "Independent") : game.labelName;

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
          {nav.map((item) => (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className={cn(
                "flex min-h-11 items-center gap-3 rounded-md px-3 text-sm",
                view === item.id ? "bg-subtle text-fg" : "text-muted hover:bg-subtle/60 hover:text-fg",
              )}
            >
              <item.icon className="size-4" />
              {item.label}
            </button>
          ))}
        </nav>
        <div className="mt-auto grid gap-2 px-4 py-5 text-xs text-muted">
          <div className="flex justify-between">
            <span>Week net</span>
            <span className="tabular-nums text-fg">{signedMoney(game.ledger.net)}</span>
          </div>
          <div className="flex justify-between">
            <span>TikTok reach</span>
            <span className="tabular-nums text-fg">{compact(tt)}</span>
          </div>
          <div className="flex justify-between">
            <span>Popularity</span>
            <span className="tabular-nums text-fg">{Math.round(roster[0]?.popularity ?? 0)}</span>
          </div>
          <div className="flex justify-between">
            <span>FICO</span>
            <span className="tabular-nums text-fg">{Math.round(game.creditScore)}</span>
          </div>
          <button onClick={() => setView("mail")} className="flex justify-between text-left hover:text-fg">
            <span>Inbox</span>
            <span className="tabular-nums text-fg">{(game.mail ?? []).filter((m) => !m.read).length}</span>
          </button>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center gap-3 border-b border-border px-4 py-3 md:px-6">
          <Disc3 className="size-5 text-accent" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">{weekLabel(game.week)}</p>
            <p className="text-xs text-muted lg:hidden">{title}</p>
          </div>
          <p className="tabular-nums text-sm font-medium">{money(game.cash)}</p>
          <button onClick={nextWeek} className="min-h-11 rounded-md bg-accent px-3 text-sm font-medium text-accent-fg">
            Next week
          </button>
        </header>

        <main className="flex-1 overflow-auto pb-24 lg:pb-8">
          {view === "hq" && <Dashboard />}
          {view === "roster" && <Roster />}
          {view === "career" && <Career />}
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
        {mobileNav.map((item) => (
          <button
            key={item.id}
            onClick={() => setView(item.id)}
            className={cn(
              "flex min-h-12 flex-col items-center justify-center gap-0.5 text-[10px]",
              view === item.id ? "text-accent" : "text-muted",
            )}
          >
            <item.icon className="size-4" />
            {item.label}
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
