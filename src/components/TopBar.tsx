import { Award, Compass, Gem, Home, Maximize2, Smartphone, Trophy, Volume2, VolumeX } from "lucide-react";
import type { ScreenTab } from "../types/game";
import { OfflineIndicator, PWAInstallButton } from "./PWAInstallButton";

interface TopBarProps {
  activeTab: ScreenTab;
  mobileShell: boolean;
  muted: boolean;
  onToggleMute: () => void;
  onToggleShell: () => void;
  onNavigate: (tab: ScreenTab) => void;
}

const TAB_TITLES: Record<ScreenTab, string> = {
  setup: "Pont-de-Salars",
  map: "Carte du parcours",
  treasures: "Trésors & Commerces",
  leaderboard: "Classement",
  diploma: "Mon Diplôme",
};

export function TopBar({
  activeTab,
  mobileShell,
  muted,
  onToggleMute,
  onToggleShell,
  onNavigate,
}: TopBarProps) {
  return (
    <header className="no-print shrink-0 border-b border-[#18261E]/10 bg-[#FAF9F5]/95 backdrop-blur-md">
      <div
        className={`mx-auto flex h-[54px] items-center justify-between gap-3 px-4 ${
          mobileShell ? "" : "max-w-7xl sm:px-6 lg:px-8"
        }`}
      >
        <button
          type="button"
          onClick={() => onNavigate("setup")}
          className="font-display cursor-pointer truncate text-left text-base font-bold tracking-tight text-[#18261E] whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D6B4A]"
        >
          {mobileShell ? TAB_TITLES[activeTab] : "Pont-de-Salars"}
        </button>

        {!mobileShell && (
          <nav className="hidden items-center gap-6 md:flex" aria-label="Navigation principale">
            {(
              [
                { id: "setup", label: "Accueil" },
                { id: "map", label: "Carte" },
                { id: "treasures", label: "Trésors" },
                { id: "leaderboard", label: "Classement" },
                { id: "diploma", label: "Diplôme" },
              ] as const
            ).map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onNavigate(item.id)}
                  className={`cursor-pointer border-b-2 py-1 text-sm font-medium transition-colors whitespace-nowrap shrink-0 ${
                    isActive
                      ? "border-[#1D6B4A] text-[#18261E]"
                      : "border-transparent text-[#526158] hover:text-[#18261E]"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>
        )}

        <div className="flex items-center gap-1.5 shrink-0">
          <PWAInstallButton />

          <button
            type="button"
            onClick={onToggleMute}
            aria-label={muted ? "Activer les sons" : "Couper les sons"}
            title={muted ? "Activer les sons" : "Couper les sons"}
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-[#18261E]/12 bg-white text-[#526158] transition-colors hover:text-[#18261E]"
          >
            {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </button>

          <button
            type="button"
            onClick={onToggleShell}
            aria-label={mobileShell ? "Passer en grand écran" : "Passer au format mobile"}
            title={mobileShell ? "Passer en grand écran" : "Passer au format mobile"}
            className="hidden h-9 cursor-pointer items-center gap-1.5 rounded-lg border border-[#18261E]/12 bg-white px-2.5 text-xs font-medium text-[#526158] transition-colors hover:text-[#18261E] sm:inline-flex"
          >
            {mobileShell ? (
              <>
                <Maximize2 className="h-3.5 w-3.5" />
                <span className="sr-only">Grand écran</span>
              </>
            ) : (
              <>
                <Smartphone className="h-3.5 w-3.5" />
                <span>Format mobile</span>
              </>
            )}
          </button>
        </div>
      </div>

      <OfflineIndicator />
    </header>
  );
}

interface BottomTabBarProps {
  activeTab: ScreenTab;
  mobileShell: boolean;
  onNavigate: (tab: ScreenTab) => void;
}

export function BottomTabBar({ activeTab, mobileShell, onNavigate }: BottomTabBarProps) {
  const navItems: Array<{ id: ScreenTab; label: string; icon: typeof Compass }> = [
    { id: "setup", label: "Accueil", icon: Home },
    { id: "map", label: "Carte", icon: Compass },
    { id: "treasures", label: "Trésors", icon: Gem },
    { id: "leaderboard", label: "Classement", icon: Trophy },
    { id: "diploma", label: "Diplôme", icon: Award },
  ];

  return (
    <nav
      className={`no-print shrink-0 border-t border-[#18261E]/12 bg-[#FAF9F5]/98 pb-[env(safe-area-inset-bottom)] backdrop-blur-md ${
        mobileShell ? "" : "md:hidden"
      }`}
      aria-label="Navigation principale mobile"
    >
      <div className="grid h-[60px] grid-cols-5 items-center">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavigate(item.id)}
              className={`flex min-h-[44px] cursor-pointer flex-col items-center justify-center gap-0.5 text-[10px] font-medium transition-colors ${
                isActive ? "font-semibold text-[#1D6B4A]" : "text-[#526158]"
              }`}
            >
              <Icon className="h-5 w-5" strokeWidth={isActive ? 2.4 : 1.8} />
              <span className="whitespace-nowrap">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
