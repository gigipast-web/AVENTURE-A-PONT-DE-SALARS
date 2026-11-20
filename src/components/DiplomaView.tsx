import { ArrowLeft, Award, Printer, RotateCcw, Star } from "lucide-react";
import { ADVENTURE_STOPS, AVATARS, LEVELS, QUESTION_SERIES } from "../data/pontDeSalarsData";
import type { FamilySession } from "../types/game";

interface DiplomaViewProps {
  session: FamilySession | null;
  mobileShell: boolean;
  onGoToMap: () => void;
  onStartNewGame: () => void;
}

export function DiplomaView({
  session,
  mobileShell,
  onGoToMap,
  onStartNewGame,
}: DiplomaViewProps) {
  if (!session) {
    return (
      <div className="mx-auto max-w-md px-5 py-12 text-center">
        <Award className="mx-auto h-10 w-10 text-[#1D6B4A]" />
        <h1 className="font-display mt-3 text-2xl font-bold text-[#18261E]">
          Votre diplôme vous attend
        </h1>
        <p className="mt-2 text-sm text-[#526158]">
          Créez d'abord votre équipe familiale sur l'accueil pour partir à la recherche des 10
          trésors de Pont-de-Salars.
        </p>
        <button
          type="button"
          onClick={onStartNewGame}
          className="mt-6 inline-flex min-h-[46px] w-full cursor-pointer items-center justify-center rounded-xl bg-[#1D6B4A] px-6 py-2.5 text-sm font-semibold text-white"
        >
          Créer notre équipe
        </button>
      </div>
    );
  }

  const avatar = AVATARS.find((a) => a.id === session.avatarId) ?? AVATARS[0];
  const level = LEVELS.find((l) => l.id === session.levelId) ?? LEVELS[1];
  const series =
    QUESTION_SERIES.find((s) => s.id === (session.seriesId ?? "decouverte")) ?? QUESTION_SERIES[0];
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
    <div
      className={`mx-auto px-4 pt-4 pb-8 ${
        mobileShell ? "space-y-4" : "max-w-4xl space-y-6 sm:px-6 sm:pt-6 lg:px-8 lg:pb-16"
      }`}
    >
      <div className="no-print flex flex-wrap items-center justify-between gap-2.5">
        <button
          type="button"
          onClick={onGoToMap}
          className="inline-flex min-h-[42px] cursor-pointer items-center gap-1.5 rounded-xl border border-[#18261E]/15 bg-white px-3.5 py-2 text-xs font-semibold text-[#18261E]"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Carte</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex min-h-[42px] cursor-pointer items-center gap-1.5 rounded-xl bg-[#1D6B4A] px-3.5 py-2 text-xs font-semibold text-white hover:bg-[#16553A]"
          >
            <Printer className="h-4 w-4" />
            <span>Imprimer</span>
          </button>

          <button
            type="button"
            onClick={onStartNewGame}
            className="inline-flex min-h-[42px] cursor-pointer items-center gap-1.5 rounded-xl border border-[#18261E]/15 bg-white px-3.5 py-2 text-xs font-semibold text-[#526158]"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Rejouer</span>
          </button>
        </div>
      </div>

      {!isFinished && (
        <div className="no-print rounded-2xl border border-[#D97706]/30 bg-[#FEF9EC] p-3.5 text-xs leading-relaxed text-[#78350F]">
          Il vous reste encore{" "}
          <strong className="font-mono-num">{ADVENTURE_STOPS.length - completedCount}</strong>{" "}
          trésor(s) à trouver pour valider votre diplôme complet !
        </div>
      )}

      <article className="print-only-full rounded-3xl border-2 border-[#1D6B4A]/35 bg-white p-4 sm:p-8">
        <div className="rounded-2xl border border-[#18261E]/12 bg-[#FAF9F5] p-5 text-center sm:p-8">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#D97706] bg-white text-[#D97706]">
            <Award className="h-7 w-7" />
          </div>

          <p className="mt-3 text-[11px] font-semibold tracking-wider text-[#1D6B4A] uppercase">
            Pont-de-Salars · Aveyron
          </p>

          <h1 className="font-display mt-1.5 text-balance text-2xl font-bold text-[#18261E] sm:text-3xl">
            {isFinished
              ? "Diplôme de Grand Explorateur"
              : "Brevet d'Explorateur en Cours"}
          </h1>

          <p className="mt-3 text-xs text-[#526158]">Décerné à l'équipe</p>
          <p className="font-display mt-1 text-2xl font-bold text-[#1D6B4A]">
            {session.familyName}
          </p>

          <p className="mx-auto mt-3 max-w-md text-xs leading-relaxed text-[#526158] sm:text-sm">
            Pour avoir parcouru le village, ses commerces partenaires, le pont sur le Viaur, la
            chapelle de Salars et le lac jusqu'aux Rousselleries ({series.title} · {level.title}).
          </p>

          <div className="mx-auto mt-5 flex items-center gap-3.5 rounded-2xl border border-[#18261E]/10 bg-white p-3.5 text-left">
            <img
              src={avatar.image}
              alt={avatar.name}
              referrerPolicy="no-referrer"
              className="h-14 w-14 shrink-0 rounded-xl object-cover"
            />
            <div>
              <p className="text-[11px] text-[#526158]">Compagnon d'expédition</p>
              <p className="font-display text-base font-bold text-[#18261E]">{avatar.name}</p>
              <p className="text-xs text-[#526158]">{avatar.role}</p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3 border-y border-[#18261E]/10 py-4">
            <div>
              <p className="text-[11px] text-[#526158]">Trésors</p>
              <p className="font-mono-num mt-0.5 text-lg font-bold text-[#18261E]">
                {completedCount}/10
              </p>
            </div>
            <div>
              <p className="text-[11px] text-[#526158]">Étoiles</p>
              <p className="font-mono-num mt-0.5 inline-flex items-center gap-1 text-lg font-bold text-[#D97706]">
                <Star className="h-4 w-4 fill-current" />
                {totalStars}
              </p>
            </div>
            <div>
              <p className="text-[11px] text-[#526158]">Score</p>
              <p className="font-mono-num mt-0.5 text-lg font-bold text-[#1D6B4A]">
                {totalScore}
              </p>
            </div>
          </div>

          <div className="mt-5 flex flex-col items-center justify-between gap-2 text-xs text-[#526158] sm:flex-row">
            <span>Pont-de-Salars, le {formattedDate}</span>
            <span className="font-display font-semibold text-[#18261E]">
              L'Escapade de Jos · Le Gardien du Viaur
            </span>
          </div>
        </div>
      </article>
    </div>
  );
}
