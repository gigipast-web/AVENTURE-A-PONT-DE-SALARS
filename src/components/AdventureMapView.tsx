import { useState } from "react";
import { Award, Check, Compass, Lock, MapPin, Star, Unlock } from "lucide-react";
import {
  ADVENTURE_STOPS,
  AVATARS,
  LEVELS,
  MAP_IMAGE,
  type AdventureStop,
} from "../data/pontDeSalarsData";
import type { FamilySession } from "../types/game";

interface AdventureMapViewProps {
  session: FamilySession;
  mobileShell: boolean;
  onSelectStop: (stop: AdventureStop) => void;
  onToggleFreeOrder: () => void;
  onOpenDiploma: () => void;
}

export function AdventureMapView({
  session,
  mobileShell,
  onSelectStop,
  onToggleFreeOrder,
  onOpenDiploma,
}: AdventureMapViewProps) {
  const [mapError, setMapError] = useState(false);

  const avatar = AVATARS.find((a) => a.id === session.avatarId) ?? AVATARS[0];
  const level = LEVELS.find((l) => l.id === session.levelId) ?? LEVELS[1];

  const completedCount = Object.keys(session.completedStops).length;
  const totalStars = Object.values(session.completedStops).reduce((acc, r) => acc + r.stars, 0);
  const totalScore = Object.values(session.completedStops).reduce(
    (acc, r) => acc + r.pointsEarned,
    0,
  );

  const nextStop =
    ADVENTURE_STOPS.find((stop) => !session.completedStops[stop.id]) ?? ADVENTURE_STOPS[9];

  const isStopUnlocked = (stop: AdventureStop) => {
    if (session.freeOrder) return true;
    if (session.completedStops[stop.id]) return true;
    return stop.order <= nextStop.order;
  };

  return (
    <div
      className={`mx-auto px-4 pt-4 pb-8 ${
        mobileShell ? "space-y-4" : "max-w-7xl space-y-6 sm:px-6 sm:pt-5 lg:px-8 lg:pb-12"
      }`}
    >
      <section className="flex items-center justify-between gap-3 rounded-2xl border border-[#18261E]/10 bg-white p-3.5">
        <div className="flex min-w-0 items-center gap-3">
          <img
            src={avatar.image}
            alt={avatar.name}
            referrerPolicy="no-referrer"
            className="h-11 w-11 shrink-0 rounded-xl border border-[#18261E]/10 object-cover"
          />
          <div className="min-w-0">
            <p className="truncate text-[11px] text-[#526158]">{level.title}</p>
            <h1 className="font-display truncate text-base font-bold text-[#18261E]">
              {session.familyName}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3.5 shrink-0 text-right">
          <div>
            <p className="text-[10px] text-[#526158]">Trésors</p>
            <p className="font-mono-num text-sm font-bold text-[#18261E]">
              {completedCount}/10
            </p>
          </div>
          <div>
            <p className="text-[10px] text-[#526158]">Étoiles</p>
            <p className="font-mono-num text-sm font-bold text-[#D97706]">{totalStars}</p>
          </div>
          <div>
            <p className="text-[10px] text-[#526158]">Score</p>
            <p className="font-mono-num text-sm font-bold text-[#1D6B4A]">{totalScore}</p>
          </div>
        </div>
      </section>

      <div className={mobileShell ? "space-y-4" : "grid gap-6 lg:grid-cols-12"}>
        <section className={mobileShell ? "" : "lg:col-span-7"}>
          <div className="flex items-center justify-between gap-2 pb-2.5">
            <p className="text-xs font-medium text-[#526158]">
              Touchez un point sur la carte
            </p>
            <button
              type="button"
              onClick={onToggleFreeOrder}
              className="inline-flex min-h-[38px] cursor-pointer items-center gap-1.5 rounded-lg border border-[#18261E]/14 bg-white px-2.5 py-1 text-xs font-medium text-[#18261E] hover:border-[#1D6B4A] whitespace-nowrap"
            >
              {session.freeOrder ? (
                <>
                  <Unlock className="h-3.5 w-3.5 text-[#1D6B4A]" />
                  <span>Parcours libre</span>
                </>
              ) : (
                <>
                  <Lock className="h-3.5 w-3.5 text-[#526158]" />
                  <span>Ordre guidé</span>
                </>
              )}
            </button>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-[#18261E]/12 bg-[#EAE7DC]">
            {!mapError ? (
              <img
                src={MAP_IMAGE}
                alt="Carte illustrée de Pont-de-Salars : chapelle de Salars, pont sur le Viaur, commerces du bourg, barrage, lac et plage des Rousselleries"
                referrerPolicy="no-referrer"
                onError={() => setMapError(true)}
                className="block aspect-video w-full object-cover select-none"
              />
            ) : (
              <div className="flex aspect-video w-full flex-col items-center justify-center bg-[#EAE7DC] p-6 text-center">
                <Compass className="h-9 w-9 text-[#1D6B4A]" />
                <p className="mt-2 text-sm font-medium text-[#18261E]">
                  Carte de Pont-de-Salars
                </p>
              </div>
            )}

            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              className="pointer-events-none absolute inset-0 h-full w-full"
              aria-hidden="true"
            >
              {ADVENTURE_STOPS.slice(0, -1).map((stop, idx) => {
                const next = ADVENTURE_STOPS[idx + 1];
                const bothDone =
                  Boolean(session.completedStops[stop.id]) &&
                  Boolean(session.completedStops[next.id]);
                const pathActive = Boolean(session.completedStops[stop.id]);
                return (
                  <line
                    key={`${stop.id}-${next.id}`}
                    x1={stop.mapX}
                    y1={stop.mapY}
                    x2={next.mapX}
                    y2={next.mapY}
                    stroke={bothDone || pathActive ? "#1D6B4A" : "#18261E"}
                    strokeOpacity={bothDone ? 0.85 : pathActive ? 0.65 : 0.34}
                    strokeWidth="0.7"
                    strokeDasharray={bothDone ? undefined : "1.4 1.2"}
                    strokeLinecap="round"
                  />
                );
              })}
            </svg>

            {ADVENTURE_STOPS.map((stop) => {
              const record = session.completedStops[stop.id];
              const unlocked = isStopUnlocked(stop);
              const isCurrent = !record && stop.id === nextStop.id;

              return (
                <button
                  key={stop.id}
                  type="button"
                  onClick={() => unlocked && onSelectStop(stop)}
                  disabled={!unlocked}
                  style={{ left: `${stop.mapX}%`, top: `${stop.mapY}%` }}
                  title={`${stop.order}. ${stop.name}`}
                  aria-label={`Étape ${stop.order} : ${stop.name}${
                    record ? " (terminée)" : unlocked ? " (disponible)" : " (verrouillée)"
                  }`}
                  className={`group absolute flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center transition-transform focus-visible:outline-2 focus-visible:outline-[#1D6B4A] disabled:cursor-not-allowed ${
                    unlocked ? "active:scale-95" : "opacity-75"
                  }`}
                >
                  <span
                    className={`flex h-7 w-7 items-center justify-center rounded-full border-2 text-[11px] font-bold shadow-md sm:h-8 sm:w-8 ${
                      record
                        ? "border-white bg-[#1D6B4A] text-white"
                        : isCurrent
                          ? "border-white bg-[#D97706] text-white ring-4 ring-[#D97706]/30"
                          : unlocked
                            ? "border-[#18261E] bg-white text-[#18261E]"
                            : "border-[#526158]/40 bg-[#F1F3EE] text-[#526158]"
                    }`}
                  >
                    {record ? (
                      <Check className="h-3.5 w-3.5 stroke-[2.75]" />
                    ) : (
                      <span className="font-mono-num">{stop.order}</span>
                    )}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        <aside className={`flex flex-col gap-4 ${mobileShell ? "" : "lg:col-span-5"}`}>
          {completedCount < ADVENTURE_STOPS.length ? (
            <div className="rounded-2xl border border-[#1D6B4A]/25 bg-white p-4">
              <p className="text-xs font-semibold text-[#1D6B4A]">
                Prochaine mission · Étape {String(nextStop.order).padStart(2, "0")}
              </p>
              <h2 className="font-display mt-0.5 text-lg font-bold text-[#18261E]">
                {nextStop.name}
              </h2>
              <p className="mt-1.5 text-xs leading-relaxed text-[#526158]">
                {nextStop.storyIntro}
              </p>
              <button
                type="button"
                onClick={() => onSelectStop(nextStop)}
                className="mt-3.5 inline-flex min-h-[46px] w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#1D6B4A] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#16553A]"
              >
                <MapPin className="h-4 w-4" />
                <span>Ouvrir l'étape {nextStop.order}</span>
              </button>
            </div>
          ) : (
            <div className="rounded-2xl border border-[#D97706]/35 bg-white p-4">
              <p className="text-xs font-semibold text-[#D97706]">Quête terminée</p>
              <h2 className="font-display mt-0.5 text-lg font-bold text-[#18261E]">
                Les 10 trésors sont réunis !
              </h2>
              <button
                type="button"
                onClick={onOpenDiploma}
                className="mt-3 inline-flex min-h-[46px] w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#D97706] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#B45309]"
              >
                <Award className="h-4 w-4" />
                <span>Afficher notre diplôme</span>
              </button>
            </div>
          )}

          <div className="rounded-2xl border border-[#18261E]/10 bg-white p-4">
            <h3 className="font-display text-base font-bold text-[#18261E]">
              Les 10 étapes du parcours
            </h3>
            <div className="mt-2 divide-y divide-[#18261E]/8">
              {ADVENTURE_STOPS.map((stop) => {
                const record = session.completedStops[stop.id];
                const unlocked = isStopUnlocked(stop);
                return (
                  <button
                    key={stop.id}
                    type="button"
                    disabled={!unlocked}
                    onClick={() => unlocked && onSelectStop(stop)}
                    className="flex min-h-[56px] w-full cursor-pointer items-center justify-between gap-3 py-2.5 text-left transition-colors disabled:cursor-not-allowed disabled:opacity-55"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <span
                        className={`font-mono-num flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-bold ${
                          record
                            ? "bg-[#1D6B4A] text-white"
                            : stop.id === nextStop.id
                              ? "bg-[#D97706] text-white"
                              : "bg-[#F1F3EE] text-[#18261E]"
                        }`}
                      >
                        {record ? <Check className="h-4 w-4" /> : stop.order}
                      </span>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-[#18261E]">
                          {stop.shortName}
                        </p>
                        <p className="truncate text-xs text-[#526158]">{stop.missionSummary}</p>
                      </div>
                    </div>

                    <div className="shrink-0">
                      {record ? (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#D97706]">
                          <Star className="h-3.5 w-3.5 fill-current" />
                          <span className="font-mono-num">{record.stars}/3</span>
                        </span>
                      ) : unlocked ? (
                        <span className="text-xs font-semibold text-[#1D6B4A]">Ouvrir</span>
                      ) : (
                        <Lock className="h-3.5 w-3.5 text-[#526158]" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
