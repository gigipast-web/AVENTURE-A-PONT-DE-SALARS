import { useState } from "react";
import { RefreshCw, Star, Trophy } from "lucide-react";
import { AVATARS, LEVELS, type LevelId } from "../data/pontDeSalarsData";
import type { LeaderboardEntry } from "../types/game";

interface LeaderboardViewProps {
  entries: LeaderboardEntry[];
  loading: boolean;
  error: string;
  currentTeamId?: string;
  mobileShell: boolean;
  onRefresh: () => void;
}

export function LeaderboardView({
  entries,
  loading,
  error,
  currentTeamId,
  mobileShell,
  onRefresh,
}: LeaderboardViewProps) {
  const [filterLevel, setFilterLevel] = useState<"all" | LevelId>("all");

  const filtered =
    filterLevel === "all" ? entries : entries.filter((e) => e.levelId === filterLevel);

  return (
    <div
      className={`mx-auto px-4 pt-4 pb-8 ${
        mobileShell ? "space-y-4" : "max-w-7xl space-y-6 sm:px-6 sm:pt-6 lg:px-8 lg:pb-14"
      }`}
    >
      <div className="flex items-end justify-between gap-3 border-b border-[#18261E]/10 pb-4">
        <div>
          <p className="text-xs font-semibold text-[#1D6B4A]">Familles participantes</p>
          <h1 className="font-display mt-0.5 text-2xl font-bold text-[#18261E] sm:text-3xl">
            Classement du village
          </h1>
        </div>

        <button
          type="button"
          onClick={onRefresh}
          disabled={loading}
          aria-label="Actualiser le classement"
          className="inline-flex min-h-[42px] cursor-pointer items-center gap-1.5 rounded-xl border border-[#18261E]/15 bg-white px-3 py-2 text-xs font-semibold text-[#18261E] hover:border-[#1D6B4A] shrink-0 disabled:opacity-60"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          <span>Actualiser</span>
        </button>
      </div>

      <div className="no-scrollbar flex gap-1.5 overflow-x-auto rounded-xl bg-[#F1F3EE] p-1">
        <button
          type="button"
          onClick={() => setFilterLevel("all")}
          className={`min-h-[38px] shrink-0 cursor-pointer rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap ${
            filterLevel === "all"
              ? "bg-white text-[#18261E] shadow-xs"
              : "text-[#526158] hover:text-[#18261E]"
          }`}
        >
          Tous
        </button>
        {LEVELS.map((lvl) => (
          <button
            key={lvl.id}
            type="button"
            onClick={() => setFilterLevel(lvl.id)}
            className={`min-h-[38px] shrink-0 cursor-pointer rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap ${
              filterLevel === lvl.id
                ? "bg-white text-[#18261E] shadow-xs"
                : "text-[#526158] hover:text-[#18261E]"
            }`}
          >
            {lvl.title}
          </button>
        ))}
      </div>

      {error && (
        <div className="rounded-xl border border-[#B91C1C]/25 bg-[#FEF2F2] p-3.5 text-xs text-[#991B1B]">
          {error}
        </div>
      )}

      <section className="overflow-hidden rounded-2xl border border-[#18261E]/10 bg-white">
        {loading && filtered.length === 0 ? (
          <div className="p-8 text-center text-sm text-[#526158]">
            Chargement du classement…
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-8 text-center">
            <Trophy className="mx-auto h-8 w-8 text-[#526158]/50" />
            <p className="mt-2 text-sm font-semibold text-[#18261E]">
              Aucune famille classée dans ce niveau
            </p>
          </div>
        ) : mobileShell ? (
          <div className="divide-y divide-[#18261E]/8">
            {filtered.map((entry, idx) => {
              const avatar = AVATARS.find((a) => a.id === entry.avatarId) ?? AVATARS[0];
              const level = LEVELS.find((l) => l.id === entry.levelId) ?? LEVELS[1];
              const isMine = currentTeamId === entry.id;

              return (
                <div
                  key={entry.id}
                  className={`flex items-center justify-between gap-3 px-4 py-3.5 ${
                    isMine ? "bg-[#F1F7F4]" : ""
                  }`}
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="font-mono-num w-6 text-sm font-bold text-[#18261E]">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <img
                      src={avatar.image}
                      alt={avatar.name}
                      referrerPolicy="no-referrer"
                      className="h-10 w-10 shrink-0 rounded-xl object-cover"
                    />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-[#18261E]">
                        {entry.familyName}
                        {isMine ? " (Vous)" : ""}
                      </p>
                      <p className="truncate text-xs text-[#526158]">
                        {level.title} · {entry.treasuresFound}/10
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0 text-right">
                    <p className="font-mono-num text-sm font-bold text-[#1D6B4A]">
                      {entry.score} pts
                    </p>
                    <p className="font-mono-num inline-flex items-center gap-1 text-xs font-semibold text-[#D97706]">
                      <Star className="h-3 w-3 fill-current" />
                      {entry.stars}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead>
                <tr className="border-b border-[#18261E]/10 bg-[#FAF9F5] text-xs font-semibold text-[#526158]">
                  <th className="py-3.5 pr-3 pl-5">Rang</th>
                  <th className="py-3.5 pr-4">Famille / Équipe</th>
                  <th className="py-3.5 pr-4">Niveau</th>
                  <th className="py-3.5 pr-4 text-right">Trésors</th>
                  <th className="py-3.5 pr-4 text-right">Étoiles</th>
                  <th className="py-3.5 pr-5 text-right">Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#18261E]/8">
                {filtered.map((entry, idx) => {
                  const avatar = AVATARS.find((a) => a.id === entry.avatarId) ?? AVATARS[0];
                  const level = LEVELS.find((l) => l.id === entry.levelId) ?? LEVELS[1];
                  const isMine = currentTeamId === entry.id;

                  return (
                    <tr key={entry.id} className={isMine ? "bg-[#F1F7F4]" : ""}>
                      <td className="font-mono-num py-3.5 pr-3 pl-5 text-sm font-bold text-[#18261E]">
                        {String(idx + 1).padStart(2, "0")}
                      </td>
                      <td className="py-3.5 pr-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={avatar.image}
                            alt={avatar.name}
                            referrerPolicy="no-referrer"
                            className="h-9 w-9 shrink-0 rounded-lg object-cover"
                          />
                          <div>
                            <p className="font-semibold text-[#18261E]">
                              {entry.familyName}
                              {isMine ? " (Vous)" : ""}
                            </p>
                            <p className="text-xs text-[#526158]">{avatar.name}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 pr-4 text-xs text-[#526158]">{level.title}</td>
                      <td className="font-mono-num py-3.5 pr-4 text-right font-medium text-[#18261E]">
                        {entry.treasuresFound}/10
                      </td>
                      <td className="py-3.5 pr-4 text-right">
                        <span className="font-mono-num inline-flex items-center gap-1 font-semibold text-[#D97706]">
                          <Star className="h-3.5 w-3.5 fill-current" />
                          {entry.stars}
                        </span>
                      </td>
                      <td className="font-mono-num py-3.5 pr-5 text-right font-bold text-[#1D6B4A]">
                        {entry.score} pts
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
