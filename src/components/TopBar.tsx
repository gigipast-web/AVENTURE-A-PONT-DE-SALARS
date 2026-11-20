import { Award, Compass, Gem, Home, Trophy, Volume2, VolumeX } from "lucide-react";
import type { ScreenTab } from "../types/game";

interface TopBarProps {
  activeTab: ScreenTab;
  hasStarted: boolean;
  treasuresCount: number;
  muted: boolean;
  onToggleMute: () => void;
  onNavigate: (tab: ScreenTab) => void;
}

export function TopBar({
  activeTab,
  hasStarted,
  treasuresCount,
  muted,
  onToggleMute,
  onNavigate,
}: TopBarProps) {
  const navItems: Array<{ id: ScreenTab; label: string; icon: typeof Compass }> = [
    { id: "setup", label: "Accueil", icon: Home },
    { id: "map", label: "Carte", icon: Compass },
    { id: "treasures", label: "Trésors", icon: Gem },
    { id: "leaderboard", label: "Classement", icon: Trophy },
  ];

  const primaryLabel =
    treasuresCount >= 10 ? "Mon Diplôme" : hasStarted ? "Mon Diplôme" : "Commencer";

  const handlePrimaryClick = () => {
    if (hasStarted) {
      onNavigate("diploma");
    } else {
      onNavigate("setup");
      const el = document.getElementById("team-setup-form");
      el?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header className="no-print sticky top-0 z-30 border-b border-[#18261E]/10 bg-[#FAF9F5]/92 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 px-4 sm:gap-8 sm:px-6 lg:px-8">
          <button
            type="button"
            onClick={() => onNavigate("setup")}
            className="font-display cursor-pointer text-left text-base font-bold tracking-tight text-[#18261E] whitespace-nowrap shrink-0 sm:text-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D6B4A]"
          >
            Pont-de-Salars
          </button>

          <nav className="hidden items-center gap-6 md:flex" aria-label="Navigation principale">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onNavigate(item.id)}
                  className={`cursor-pointer border-b-2 py-1 text-sm font-medium transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D6B4A] ${
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

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={onToggleMute}
              aria-label={muted ? "Activer les sons" : "Couper les sons"}
              title={muted ? "Activer les sons" : "Couper les sons"}
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border border-[#18261E]/12 bg-white text-[#526158] transition-colors hover:border-[#18261E]/25 hover:text-[#18261E] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D6B4A]"
            >
              {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </button>

            <button
              type="button"
              onClick={handlePrimaryClick}
              className="inline-flex min-h-[40px] cursor-pointer items-center gap-2 rounded-lg bg-[#1D6B4A] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#16553A] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D6B4A]"
            >
              <Award className="h-4 w-4 shrink-0" />
              <span>{primaryLabel}</span>
            </button>
          </div>
        </div>
      </header>

      <nav
        className="no-print fixed right-0 bottom-0 left-0 z-30 border-t border-[#18261E]/12 bg-[#FAF9F5]/95 backdrop-blur-md md:hidden"
        aria-label="Navigation mobile"
      >
        <div className="grid h-16 grid-cols-5 items-center">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onNavigate(item.id)}
                className={`flex min-h-[44px] cursor-pointer flex-col items-center justify-center gap-1 text-[11px] font-medium transition-colors ${
                  isActive ? "text-[#1D6B4A] font-semibold" : "text-[#526158]"
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="whitespace-nowrap">{item.label}</span>
              </button>
            );
          })}
          <button
            type="button"
            onClick={() => onNavigate("diploma")}
            className={`flex min-h-[44px] cursor-pointer flex-col items-center justify-center gap-1 text-[11px] font-medium transition-colors ${
              activeTab === "diploma" ? "text-[#1D6B4A] font-semibold" : "text-[#526158]"
            }`}
          >
            <Award className="h-5 w-5" />
            <span className="whitespace-nowrap">Diplôme</span>
          </button>
        </div>
      </nav>
    </>
  );
}
