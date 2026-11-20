import { useState } from "react";
import { RefreshCw, Star, Trophy } from "lucide-react";
import { AVATARS, LEVELS, type LevelId } from "../data/pontDeSalarsData";
import type { LeaderboardEntry } from "../types/game";

interface LeaderboardViewProps {
  entries: LeaderboardEntry[];
  loading: boolean;
  error: string;
  currentTeamId?: string;
  onRefresh: () => void;
}

export function LeaderboardView({
  entries,
  loading,
  error,
  currentTeamId,
  onRefresh,
}: LeaderboardViewProps) {
  const [filterLevel, setFilterLevel] = useState<"all" | LevelId>("all");

  const filtered =
    filterLevel === "all" ? entries : entries.filter((e) => e.levelId === filterLevel);

  return (
    <div className="mx-auto max-w-7xl px-4 pt-6 pb-24 sm:px-6 lg:px-8 lg:pb-16">
      <div className="flex flex-col justify-between gap-4 border-b border-[#18261E]/10 pb-6 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-semibold text-[#1D6B4A]">
            Classement partagé des familles participantes
          </p>
          <h1 className="font-display mt-1 text-3xl font-bold text-[#18261E]">
            Tableau d'honneur de Pont-de-Salars
          </h1>
          <p className="mt-1.5 text-sm text-[#526158]">
            Chaque trésor trouvé et chaque étoile remportée font grimper votre famille dans le
            classement du village.
          </p>
        </div>

        <button
          type="button"
          onClick={onRefresh}
          disabled={loading}
          className="inline-flex min-h-[44px] cursor-pointer items-center gap-2 rounded-xl border border-[#18261E]/15 bg-white px-4 py-2 text-xs font-semibold text-[#18261E] transition-colors hover:border-[#1D6B4A] whitespace-nowrap shrink-0 disabled:opacity-60"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          <span>Actualiser</span>
        </button>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-1.5 rounded-xl bg-[#F1F3EE] p-1.5 sm:inline-flex">
        <button
          type="button"
          onClick={() => setFilterLevel("all")}
          className={`min-h-[38px] cursor-pointer rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap ${
            filterLevel === "all"
              ? "bg-white text-[#18261E] shadow-xs"
              : "text-[#526158] hover:text-[#18261E]"
          }`}
        >
          Tous les niveaux
        </button>
        {LEVELS.map((lvl) => (
          <button
            key={lvl.id}
            type="button"
            onClick={() => setFilterLevel(lvl.id)}
            className={`min-h-[38px] cursor-pointer rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap ${
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
        <div className="mt-5 rounded-xl border border-[#B91C1C]/25 bg-[#FEF2F2] p-4 text-sm text-[#991B1B]">
          {error}
        </div>
      )}

      <section className="mt-6 overflow-hidden rounded-2xl border border-[#18261E]/10 bg-white">
        {loading && filtered.length === 0 ? (
          <div className="p-10 text-center text-sm text-[#526158]">
            Chargement du classement des familles…
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-10 text-center">
            <Trophy className="mx-auto h-8 w-8 text-[#526158]/50" />
            <p className="mt-2 text-sm font-semibold text-[#18261E]">
              Aucune famille classée dans ce niveau pour l'instant
            </p>
            <p className="mt-1 text-xs text-[#526158]">
              Soyez les premiers à terminer une étape dans cette catégorie !
            </p>
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
                    <tr
                      key={entry.id}
                      className={isMine ? "bg-[#F1F7F4]" : "hover:bg-[#FAF9F5]/80"}
                    >
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
