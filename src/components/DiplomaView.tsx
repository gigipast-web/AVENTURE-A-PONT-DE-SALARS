import { ArrowLeft, Award, Printer, RotateCcw, Star } from "lucide-react";
import { ADVENTURE_STOPS, AVATARS, LEVELS } from "../data/pontDeSalarsData";
import type { FamilySession } from "../types/game";

interface DiplomaViewProps {
  session: FamilySession | null;
  onGoToMap: () => void;
  onStartNewGame: () => void;
}

export function DiplomaView({ session, onGoToMap, onStartNewGame }: DiplomaViewProps) {
  if (!session) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <Award className="mx-auto h-10 w-10 text-[#1D6B4A]" />
        <h1 className="font-display mt-3 text-2xl font-bold text-[#18261E]">
          Votre diplôme d'explorateur vous attend
        </h1>
        <p className="mt-2 text-sm text-[#526158]">
          Créez d'abord votre équipe familiale sur l'écran d'accueil pour partir à la recherche des
          10 trésors de Pont-de-Salars.
        </p>
        <button
          type="button"
          onClick={onStartNewGame}
          className="mt-6 inline-flex min-h-[44px] cursor-pointer items-center justify-center rounded-xl bg-[#1D6B4A] px-6 py-2.5 text-sm font-semibold text-white"
        >
          Créer notre équipe
        </button>
      </div>
    );
  }

  const avatar = AVATARS.find((a) => a.id === session.avatarId) ?? AVATARS[0];
  const level = LEVELS.find((l) => l.id === session.levelId) ?? LEVELS[1];
  const completedCount = Object.keys(session.completedStops).length;
  const totalStars = Object.values(session.completedStops).reduce((acc, r) => acc + r.stars, 0);
  const totalScore = Object.values(session.completedStops).reduce(
    (acc, r) => acc + r.pointsEarned,
    0,
  );
  const isFinished = completedCount >= ADVENTURE_STOPS.length;

  const formattedDate = new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());

  return (
    <div className="mx-auto max-w-4xl px-4 pt-6 pb-24 sm:px-6 lg:px-8 lg:pb-16">
      <div className="no-print mb-6 flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={onGoToMap}
          className="inline-flex min-h-[42px] cursor-pointer items-center gap-2 rounded-xl border border-[#18261E]/15 bg-white px-4 py-2 text-xs font-semibold text-[#18261E] transition-colors hover:border-[#1D6B4A]"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Retour à la carte</span>
        </button>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex min-h-[42px] cursor-pointer items-center gap-2 rounded-xl bg-[#1D6B4A] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#16553A]"
          >
            <Printer className="h-4 w-4" />
            <span>Imprimer le diplôme</span>
          </button>

          <button
            type="button"
            onClick={onStartNewGame}
            className="inline-flex min-h-[42px] cursor-pointer items-center gap-2 rounded-xl border border-[#18261E]/15 bg-white px-4 py-2 text-xs font-semibold text-[#526158] transition-colors hover:text-[#18261E]"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Rejouer</span>
          </button>
        </div>
      </div>

      {!isFinished && (
        <div className="no-print mb-6 rounded-2xl border border-[#D97706]/30 bg-[#FEF9EC] p-4 text-sm text-[#78350F]">
          Il vous reste encore{" "}
          <strong className="font-mono-num">{ADVENTURE_STOPS.length - completedCount}</strong>{" "}
          trésor(s) à découvrir pour valider définitivement votre diplôme officiel !
        </div>
      )}

      <article className="print-only-full rounded-3xl border-2 border-[#1D6B4A]/35 bg-white p-6 shadow-sm sm:p-10">
        <div className="rounded-2xl border border-[#18261E]/12 bg-[#FAF9F5] p-6 text-center sm:p-10">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#D97706] bg-white text-[#D97706]">
            <Award className="h-8 w-8" />
          </div>

          <p className="mt-4 text-xs font-semibold tracking-widest text-[#1D6B4A] uppercase">
            Commune de Pont-de-Salars · Aveyron
          </p>

          <h1 className="font-display mt-2 text-balance text-3xl font-bold text-[#18261E] sm:text-4xl">
            {isFinished
              ? "Diplôme de Grand Explorateur"
              : "Brevet d'Explorateur en Cours"}
          </h1>

          <p className="mt-4 text-sm text-[#526158]">Décerné officiellement à l'équipe</p>

          <p className="font-display mt-2 text-2xl font-bold text-[#1D6B4A] sm:text-3xl">
            {session.familyName}
          </p>

          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-[#526158]">
            Pour avoir parcouru les ruelles du village, rencontré ses commerçants et artisans,
            observé le pont sur le Viaur, la chapelle de Salars et exploré le lac jusqu'aux
            Rousselleries dans la catégorie <strong>{level.title}</strong>.
          </p>

          <div className="mx-auto mt-8 flex max-w-md items-center justify-center gap-4 rounded-2xl border border-[#18261E]/10 bg-white p-4 text-left">
            <img
              src={avatar.image}
              alt={avatar.name}
              referrerPolicy="no-referrer"
              className="h-16 w-16 shrink-0 rounded-xl object-cover"
            />
            <div>
              <p className="text-xs text-[#526158]">Compagnon d'expédition</p>
              <p className="font-display text-base font-bold text-[#18261E]">{avatar.name}</p>
              <p className="text-xs text-[#526158]">{avatar.role}</p>
            </div>
          </div>

          <div className="mx-auto mt-8 grid max-w-lg grid-cols-3 gap-4 border-y border-[#18261E]/10 py-5">
            <div>
              <p className="text-xs text-[#526158]">Trésors</p>
              <p className="font-mono-num mt-1 text-xl font-bold text-[#18261E]">
                {completedCount} / 10
              </p>
            </div>
            <div>
              <p className="text-xs text-[#526158]">Étoiles</p>
              <p className="font-mono-num mt-1 inline-flex items-center gap-1 text-xl font-bold text-[#D97706]">
                <Star className="h-4 w-4 fill-current" />
                {totalStars} / 30
              </p>
            </div>
            <div>
              <p className="text-xs text-[#526158]">Score final</p>
              <p className="font-mono-num mt-1 text-xl font-bold text-[#1D6B4A]">
                {totalScore} pts
              </p>
            </div>
          </div>

          <div className="mt-7 flex flex-col items-center justify-between gap-4 text-xs text-[#526158] sm:flex-row">
            <span>Fait à Pont-de-Salars, le {formattedDate}</span>
            <span className="font-display text-sm font-semibold text-[#18261E]">
              Le Gardien des Trésors du Viaur
            </span>
          </div>
        </div>
      </article>
    </div>
  );
}
