import type { AvatarId, LevelId, SeriesId } from "../data/pontDeSalarsData";

export type ScreenTab = "setup" | "map" | "treasures" | "leaderboard" | "diploma";

export type PlayStyle = "libre" | "commerces";

export interface CompletedStopRecord {
  stopId: string;
  stars: number; // 1..3
  pointsEarned: number;
  usedHint: boolean;
  vitrineBonus: boolean;
  speedBonus?: boolean;
  streakBonus?: number;
  solvedAt: string;
}

export interface FamilySession {
  teamId: string;
  familyName: string;
  avatarId: AvatarId;
  levelId: LevelId;
  seriesId: SeriesId;
  playStyle: PlayStyle;
  freeOrder: boolean;
  streak: number;
  startedAt: string;
  completedStops: Record<string, CompletedStopRecord>;
}

export interface LeaderboardEntry {
  id: string;
  familyName: string;
  avatarId: AvatarId;
  levelId: LevelId;
  seriesId?: SeriesId;
  treasuresFound: number;
  stars: number;
  score: number;
  completed: boolean;
  updatedAt: string;
}
