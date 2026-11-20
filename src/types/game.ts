import type { AvatarId, LevelId } from "../data/pontDeSalarsData";

export type ScreenTab = "setup" | "map" | "treasures" | "leaderboard" | "diploma";

export type PlayStyle = "libre" | "commerces";

export interface CompletedStopRecord {
  stopId: string;
  stars: number; // 1..3
  pointsEarned: number;
  usedHint: boolean;
  vitrineBonus: boolean;
  solvedAt: string;
}

export interface FamilySession {
  teamId: string;
  familyName: string;
  avatarId: AvatarId;
  levelId: LevelId;
  playStyle: PlayStyle;
  freeOrder: boolean;
  startedAt: string;
  completedStops: Record<string, CompletedStopRecord>;
}

export interface LeaderboardEntry {
  id: string;
  familyName: string;
  avatarId: AvatarId;
  levelId: LevelId;
  treasuresFound: number;
  stars: number;
  score: number;
  completed: boolean;
  updatedAt: string;
}
