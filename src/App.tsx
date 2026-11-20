import { useCallback, useEffect, useState } from "react";
import { ADVENTURE_STOPS, type AdventureStop, type AvatarId, type LevelId } from "./data/pontDeSalarsData";
import { AdventureMapView } from "./components/AdventureMapView";
import { DiplomaView } from "./components/DiplomaView";
import { LeaderboardView } from "./components/LeaderboardView";
import { MissionModal } from "./components/MissionModal";
import { SetupScreen } from "./components/SetupScreen";
import { TopBar } from "./components/TopBar";
import { TreasuresView } from "./components/TreasuresView";
import type {
  CompletedStopRecord,
  FamilySession,
  LeaderboardEntry,
  PlayStyle,
  ScreenTab,
} from "./types/game";

const STORAGE_KEY = "pont_de_salars_session_v1";

function loadSavedSession(): FamilySession | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as FamilySession;
    if (!parsed || typeof parsed.familyName !== "string" || !parsed.teamId) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function App() {
  const [session, setSession] = useState<FamilySession | null>(() => loadSavedSession());
  const [activeTab, setActiveTab] = useState<ScreenTab>(() =>
    loadSavedSession() ? "map" : "setup",
  );
  const [activeStop, setActiveStop] = useState<AdventureStop | null>(null);
  const [muted, setMuted] = useState(false);

  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [lbLoading, setLbLoading] = useState(false);
  const [lbError, setLbError] = useState("");

  useEffect(() => {
    try {
      if (session) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch {
      // Ignore storage quota errors
    }
  }, [session]);

  const fetchLeaderboard = useCallback(async () => {
    setLbLoading(true);
    setLbError("");
    try {
      const res = await fetch("/api/leaderboard");
      const data = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Impossible de charger le classement.");
      }
      setLeaderboard(Array.isArray(data.entries) ? data.entries : []);
    } catch (err) {
      setLbError(
        err instanceof Error ? err.message : "Impossible de joindre le classement du village.",
      );
    } finally {
      setLbLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchLeaderboard();
  }, [fetchLeaderboard]);

  const syncTeamToLeaderboard = useCallback(async (nextSession: FamilySession) => {
    const records = Object.values(nextSession.completedStops);
    if (records.length === 0) return;

    const treasuresFound = records.length;
    const stars = records.reduce((acc, r) => acc + r.stars, 0);
    const score = records.reduce((acc, r) => acc + r.pointsEarned, 0);

    try {
      const res = await fetch("/api/leaderboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: nextSession.teamId,
          familyName: nextSession.familyName,
          avatarId: nextSession.avatarId,
          levelId: nextSession.levelId,
          treasuresFound,
          stars,
          score,
          completed: treasuresFound >= ADVENTURE_STOPS.length,
        }),
      });
      const data = await res.json();
      if (res.ok && data.ok && Array.isArray(data.entries)) {
        setLeaderboard(data.entries);
      }
    } catch {
      // Keep local progress safe even if offline
    }
  }, []);

  const handleStartAdventure = (config: {
    familyName: string;
    avatarId: AvatarId;
    levelId: LevelId;
    playStyle: PlayStyle;
  }) => {
    const next: FamilySession = {
      teamId: `team-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`,
      familyName: config.familyName,
      avatarId: config.avatarId,
      levelId: config.levelId,
      playStyle: config.playStyle,
      freeOrder: config.playStyle === "commerces",
      startedAt: new Date().toISOString(),
      completedStops: {},
    };
    setSession(next);
    setActiveTab("map");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCompleteStop = (record: CompletedStopRecord) => {
    setSession((prev) => {
      if (!prev) return prev;
      const existing = prev.completedStops[record.stopId];
      // Preserve higher score if replayed
      const chosenRecord =
        existing && existing.pointsEarned >= record.pointsEarned ? existing : record;
      const updated: FamilySession = {
        ...prev,
        completedStops: {
          ...prev.completedStops,
          [record.stopId]: chosenRecord,
        },
      };
      void syncTeamToLeaderboard(updated);
      return updated;
    });
  };

  const handleToggleFreeOrder = () => {
    setSession((prev) => (prev ? { ...prev, freeOrder: !prev.freeOrder } : prev));
  };

  const handleResetAdventure = () => {
    setSession(null);
    setActiveStop(null);
    setActiveTab("setup");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavigate = (tab: ScreenTab) => {
    if (tab === "map" && !session) {
      setActiveTab("setup");
      const el = document.getElementById("team-setup-form");
      el?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    setActiveTab(tab);
    if (tab === "leaderboard") {
      void fetchLeaderboard();
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const treasuresCount = session ? Object.keys(session.completedStops).length : 0;

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-[#18261E]">
      <TopBar
        activeTab={activeTab}
        hasStarted={Boolean(session)}
        treasuresCount={treasuresCount}
        muted={muted}
        onToggleMute={() => setMuted((m) => !m)}
        onNavigate={handleNavigate}
      />

      <main>
        {activeTab === "setup" && (
          <SetupScreen
            existingSession={session}
            onStartAdventure={handleStartAdventure}
            onResumeAdventure={() => setActiveTab("map")}
            onResetAdventure={handleResetAdventure}
          />
        )}

        {activeTab === "map" && session && (
          <AdventureMapView
            session={session}
            onSelectStop={(stop) => setActiveStop(stop)}
            onToggleFreeOrder={handleToggleFreeOrder}
            onOpenDiploma={() => setActiveTab("diploma")}
          />
        )}

        {activeTab === "treasures" && (
          <TreasuresView session={session} onGoToMap={() => handleNavigate("map")} />
        )}

        {activeTab === "leaderboard" && (
          <LeaderboardView
            entries={leaderboard}
            loading={lbLoading}
            error={lbError}
            currentTeamId={session?.teamId}
            onRefresh={() => void fetchLeaderboard()}
          />
        )}

        {activeTab === "diploma" && (
          <DiplomaView
            session={session}
            onGoToMap={() => handleNavigate("map")}
            onStartNewGame={handleResetAdventure}
          />
        )}
      </main>

      {activeStop && session && (
        <MissionModal
          stop={activeStop}
          avatarId={session.avatarId}
          levelId={session.levelId}
          playStyle={session.playStyle}
          existingRecord={session.completedStops[activeStop.id]}
          muted={muted}
          onClose={() => setActiveStop(null)}
          onComplete={handleCompleteStop}
        />
      )}
    </div>
  );
}
export default App;
