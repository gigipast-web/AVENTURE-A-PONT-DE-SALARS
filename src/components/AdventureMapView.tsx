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
  onSelectStop: (stop: AdventureStop) => void;
  onToggleFreeOrder: () => void;
  onOpenDiploma: () => void;
}

export function AdventureMapView({
  session,
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

  // Determine the next recommended stop in order
  const nextStop =
    ADVENTURE_STOPS.find((stop) => !session.completedStops[stop.id]) ?? ADVENTURE_STOPS[9];

  const isStopUnlocked = (stop: AdventureStop) => {
    if (session.freeOrder) return true;
    if (session.completedStops[stop.id]) return true;
    return stop.order <= nextStop.order;
  };

  return (
    <div className="mx-auto max-w-7xl px-4 pt-5 pb-24 sm:px-6 lg:px-8 lg:pb-12">
      <section className="flex flex-col justify-between gap-4 rounded-2xl border border-[#18261E]/10 bg-white p-4 sm:flex-row sm:items-center sm:p-5">
        <div className="flex items-center gap-3.5">
          <img
            src={avatar.image}
            alt={avatar.name}
            referrerPolicy="no-referrer"
            className="h-12 w-12 shrink-0 rounded-xl border border-[#18261E]/10 object-cover"
          />
          <div>
            <p className="text-xs text-[#526158]">
              {level.title} · {avatar.name}
            </p>
            <h1 className="font-display text-lg font-bold text-[#18261E] sm:text-xl">
              {session.familyName}
            </h1>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-6 border-t border-[#18261E]/8 pt-3 sm:border-t-0 sm:pt-0">
          <div>
            <p className="text-xs text-[#526158]">Trésors</p>
            <p className="font-mono-num text-lg font-semibold text-[#18261E]">
              {completedCount} / {ADVENTURE_STOPS.length}
            </p>
          </div>
          <div>
            <p className="text-xs text-[#526158]">Étoiles</p>
            <p className="font-mono-num text-lg font-semibold text-[#D97706]">{totalStars} / 30</p>
          </div>
          <div>
            <p className="text-xs text-[#526158]">Score</p>
            <p className="font-mono-num text-lg font-semibold text-[#1D6B4A]">{totalScore} pts</p>
          </div>
          {completedCount >= ADVENTURE_STOPS.length && (
            <button
              type="button"
              onClick={onOpenDiploma}
              className="inline-flex min-h-[42px] cursor-pointer items-center gap-2 rounded-xl bg-[#D97706] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#B45309] whitespace-nowrap"
            >
              <Award className="h-4 w-4" />
              <span>Voir le diplôme</span>
            </button>
          )}
        </div>
      </section>

      <div className="mt-6 grid gap-6 lg:grid-cols-12">
        <section className="lg:col-span-7">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3">
            <div>
              <h2 className="font-display text-xl font-bold text-[#18261E]">
                Carte au trésor de Pont-de-Salars
              </h2>
              <p className="text-xs text-[#526158]">
                Touchez une étape numérotée sur la carte pour ouvrir l'énigme correspondante.
              </p>
            </div>
            <button
              type="button"
              onClick={onToggleFreeOrder}
              className="inline-flex min-h-[40px] cursor-pointer items-center gap-2 rounded-lg border border-[#18261E]/14 bg-white px-3 py-1.5 text-xs font-medium text-[#18261E] transition-colors hover:border-[#1D6B4A] whitespace-nowrap"
            >
              {session.freeOrder ? (
                <>
                  <Unlock className="h-3.5 w-3.5 text-[#1D6B4A]" />
                  <span>Parcours libre activé</span>
                </>
              ) : (
                <>
                  <Lock className="h-3.5 w-3.5 text-[#526158]" />
                  <span>Ordre des étapes</span>
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
                <Compass className="h-10 w-10 text-[#1D6B4A]" />
                <p className="mt-2 text-sm font-medium text-[#18261E]">
                  Carte interactive de Pont-de-Salars
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
                    strokeOpacity={bothDone ? 0.85 : pathActive ? 0.65 : 0.32}
                    strokeWidth="0.65"
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
                  className={`group absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-transform focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D6B4A] disabled:cursor-not-allowed ${
                    unlocked ? "hover:scale-110 active:scale-95" : "opacity-70"
                  }`}
                >
                  <span
                    className={`flex h-9 w-9 items-center justify-center rounded-full border-2 text-xs font-bold shadow-md sm:h-10 sm:w-10 ${
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
                      <Check className="h-4 w-4 stroke-[2.75]" />
                    ) : (
                      <span className="font-mono-num">{stop.order}</span>
                    )}
                  </span>

                  <span className="pointer-events-none absolute top-full left-1/2 mt-1 hidden -translate-x-1/2 rounded-md bg-[#18261E] px-2 py-0.5 text-[11px] font-medium text-white whitespace-nowrap shadow-sm group-hover:block">
                    {stop.shortName}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-[#526158]">
            <span className="inline-flex items-center gap-1.5">
              <span className="inline-block h-3 w-3 rounded-full bg-[#D97706]" />
              Prochaine mission
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="inline-block h-3 w-3 rounded-full bg-[#1D6B4A]" />
              Trésor trouvé
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="inline-block h-3 w-3 rounded-full border border-[#18261E] bg-white" />
              Étape accessible
            </span>
          </div>
        </section>

        <aside className="flex flex-col gap-4 lg:col-span-5">
          {completedCount < ADVENTURE_STOPS.length ? (
            <div className="rounded-2xl border border-[#1D6B4A]/25 bg-white p-5">
              <p className="text-xs font-semibold text-[#1D6B4A]">
                Prochaine étape recommandée · Étape {String(nextStop.order).padStart(2, "0")}
              </p>
              <h3 className="font-display mt-1 text-xl font-bold text-[#18261E]">
                {nextStop.name}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#526158]">
                {nextStop.storyIntro}
              </p>
              <button
                type="button"
                onClick={() => onSelectStop(nextStop)}
                className="mt-4 inline-flex min-h-[44px] w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#1D6B4A] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#16553A]"
              >
                <MapPin className="h-4 w-4" />
                <span>Ouvrir la mission {nextStop.order}</span>
              </button>
            </div>
          ) : (
            <div className="rounded-2xl border border-[#D97706]/35 bg-white p-5">
              <p className="text-xs font-semibold text-[#D97706]">Quête accomplie</p>
              <h3 className="font-display mt-1 text-xl font-bold text-[#18261E]">
                Les 10 trésors de Pont-de-Salars sont réunis !
              </h3>
              <p className="mt-2 text-sm text-[#526158]">
                Bravo {session.familyName} ! Vous pouvez maintenant afficher et imprimer votre
                diplôme officiel de Grand Explorateur.
              </p>
              <button
                type="button"
                onClick={onOpenDiploma}
                className="mt-4 inline-flex min-h-[44px] w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#D97706] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#B45309]"
              >
                <Award className="h-4 w-4" />
                <span>Obtenir notre diplôme</span>
              </button>
            </div>
          )}

          <div className="rounded-2xl border border-[#18261E]/10 bg-white p-4 sm:p-5">
            <h3 className="font-display text-lg font-bold text-[#18261E]">
              Les 10 étapes du village
            </h3>
            <div className="mt-3 max-h-[380px] divide-y divide-[#18261E]/8 overflow-y-auto pr-1">
              {ADVENTURE_STOPS.map((stop) => {
                const record = session.completedStops[stop.id];
                const unlocked = isStopUnlocked(stop);
                return (
                  <button
                    key={stop.id}
                    type="button"
                    disabled={!unlocked}
                    onClick={() => unlocked && onSelectStop(stop)}
                    className={`flex min-h-[58px] w-full cursor-pointer items-center justify-between gap-3 py-3 text-left transition-colors disabled:cursor-not-allowed disabled:opacity-55 ${
                      unlocked ? "hover:bg-[#FAF9F5]" : ""
                    }`}
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
                        <p className="truncate text-sm font-semibold text-[#18261E]">{stop.name}</p>
                        <p className="truncate text-xs text-[#526158]">
                          {stop.categoryLabel} · {stop.missionSummary}
                        </p>
                      </div>
                    </div>

                    <div className="shrink-0 text-right">
                      {record ? (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#D97706]">
                          <Star className="h-3.5 w-3.5 fill-current" />
                          <span className="font-mono-num">{record.stars}/3</span>
                        </span>
                      ) : unlocked ? (
                        <span className="text-xs font-semibold text-[#1D6B4A]">Jouer</span>
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
