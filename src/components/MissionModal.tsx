import { useEffect, useState } from "react";
import {
  Check,
  Flame,
  Gem,
  HelpCircle,
  QrCode,
  Sparkles,
  Star,
  Store,
  Timer,
  X,
} from "lucide-react";
import {
  AVATARS,
  LEVELS,
  getStopRiddle,
  type AdventureStop,
  type AvatarId,
  type LevelId,
  type SeriesId,
} from "../data/pontDeSalarsData";
import type { CompletedStopRecord, PlayStyle } from "../types/game";
import { playChime } from "../utils/soundFx";

const SPEED_BONUS_SECONDS = 25;
const SPEED_BONUS_POINTS = 20;

interface MissionModalProps {
  stop: AdventureStop;
  avatarId: AvatarId;
  levelId: LevelId;
  seriesId: SeriesId;
  playStyle: PlayStyle;
  currentStreak: number;
  existingRecord?: CompletedStopRecord;
  muted: boolean;
  mobileShell: boolean;
  onClose: () => void;
  onComplete: (record: CompletedStopRecord, cleanFirstTry: boolean) => void;
}

export function MissionModal({
  stop,
  avatarId,
  levelId,
  seriesId,
  playStyle,
  currentStreak,
  existingRecord,
  muted,
  mobileShell,
  onClose,
  onComplete,
}: MissionModalProps) {
  const avatar = AVATARS.find((a) => a.id === avatarId) ?? AVATARS[0];
  const level = LEVELS.find((l) => l.id === levelId) ?? LEVELS[1];
  const riddle = getStopRiddle(stop, seriesId, levelId);
  const hasSpicyChrono = seriesId === "pimentee" || levelId === "experts";

  const [selectedOption, setSelectedOption] = useState<number | null>(
    existingRecord ? riddle.correctIndex : null,
  );
  const [showHint, setShowHint] = useState(false);
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [feedbackError, setFeedbackError] = useState("");
  const [secondsLeft, setSecondsLeft] = useState<number>(
    existingRecord ? 0 : SPEED_BONUS_SECONDS,
  );
  const [vitrineInput, setVitrineInput] = useState(
    existingRecord?.vitrineBonus && stop.vitrineCode ? stop.vitrineCode : "",
  );
  const [vitrineVerified, setVitrineVerified] = useState(Boolean(existingRecord?.vitrineBonus));
  const [vitrineMsg, setVitrineMsg] = useState("");
  const [solvedRecord, setSolvedRecord] = useState<CompletedStopRecord | null>(
    existingRecord ?? null,
  );

  useEffect(() => {
    if (!hasSpicyChrono || solvedRecord) return;
    if (secondsLeft <= 0) return;

    const timerId = window.setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => window.clearInterval(timerId);
  }, [hasSpicyChrono, solvedRecord, secondsLeft]);

  const handleCheckVitrine = () => {
    if (!stop.vitrineCode) return;
    const normalized = vitrineInput.trim().toUpperCase();
    if (normalized === stop.vitrineCode) {
      playChime("success", muted);
      setVitrineVerified(true);
      setVitrineMsg("Code vitrine validé : +40 pts bonus !");
    } else {
      playChime("error", muted);
      setVitrineMsg("Ce code ne correspond pas encore à l'affichette de ce commerce.");
    }
  };

  const handleValidateAnswer = () => {
    if (selectedOption === null) {
      setFeedbackError("Choisissez une réponse avant de valider.");
      return;
    }

    if (selectedOption === riddle.correctIndex) {
      const cleanFirstTry = !showHint && wrongAttempts === 0;
      const stars = Math.max(1, 3 - (showHint ? 1 : 0) - (wrongAttempts > 0 ? 1 : 0));
      const basePoints = 80 + stars * 20;
      const weightedPoints = Math.round(basePoints * level.pointMultiplier);
      const vitrineBonusPts = vitrineVerified ? 40 : 0;
      const earnedSpeedBonus = hasSpicyChrono && secondsLeft > 0 && !showHint;
      const speedBonusPts = earnedSpeedBonus ? SPEED_BONUS_POINTS : 0;

      const nextStreak = cleanFirstTry ? currentStreak + 1 : 0;
      const streakBonusPts =
        cleanFirstTry && nextStreak >= 2 ? Math.min(45, (nextStreak - 1) * 15) : 0;

      const record: CompletedStopRecord = {
        stopId: stop.id,
        stars,
        pointsEarned: weightedPoints + vitrineBonusPts + speedBonusPts + streakBonusPts,
        usedHint: showHint,
        vitrineBonus: vitrineVerified,
        speedBonus: earnedSpeedBonus,
        streakBonus: streakBonusPts,
        solvedAt: new Date().toISOString(),
      };
      playChime(stop.order === 10 ? "victory" : "success", muted);
      setFeedbackError("");
      setSolvedRecord(record);
      onComplete(record, cleanFirstTry);
    } else {
      playChime("error", muted);
      setWrongAttempts((n) => n + 1);
      setFeedbackError(
        "Pas tout à fait ! Relisez bien la question ou utilisez l'indice de votre compagnon.",
      );
    }
  };

  const introText = seriesId === "pimentee" ? stop.spicyIntro : stop.storyIntro;
  const chronoPercent = Math.round((secondsLeft / SPEED_BONUS_SECONDS) * 100);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-[#18261E]/55 p-0 backdrop-blur-xs sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="mission-modal-title"
    >
      <div
        className={`max-h-[85vh] w-full overflow-y-auto rounded-t-3xl border border-[#18261E]/12 bg-[#FAF9F5] p-5 shadow-2xl ${
          mobileShell ? "max-w-[430px] sm:rounded-3xl" : "max-w-2xl sm:rounded-2xl sm:p-7"
        }`}
      >
        <div className="mx-auto mb-3 h-1.5 w-10 rounded-full bg-[#18261E]/15" />

        <div className="flex items-start justify-between gap-3 border-b border-[#18261E]/10 pb-3.5">
          <div>
            <p
              className={`text-xs font-semibold ${
                seriesId === "pimentee" ? "text-[#B45309]" : "text-[#1D6B4A]"
              }`}
            >
              Étape {String(stop.order).padStart(2, "0")} ·{" "}
              {riddle.twistLabel ? riddle.twistLabel : stop.categoryLabel}
            </p>
            <h2
              id="mission-modal-title"
              className="font-display mt-0.5 text-xl font-bold text-[#18261E]"
            >
              {stop.name}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer la mission"
            className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-xl border border-[#18261E]/14 bg-white text-[#526158] hover:text-[#18261E]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-4 flex items-start gap-3 rounded-xl border border-[#18261E]/10 bg-white p-3.5">
          <img
            src={avatar.image}
            alt={avatar.name}
            referrerPolicy="no-referrer"
            className="h-11 w-11 shrink-0 rounded-xl object-cover"
          />
          <div>
            <p className="text-xs font-semibold text-[#18261E]">{avatar.name}</p>
            <p className="mt-0.5 text-xs leading-relaxed text-[#526158]">{introText}</p>
          </div>
        </div>

        {hasSpicyChrono && !solvedRecord && (
          <div className="mt-3 rounded-xl border border-[#D97706]/25 bg-[#FEF9EC] p-3">
            <div className="flex items-center justify-between gap-2 text-xs">
              <span className="inline-flex items-center gap-1.5 font-semibold text-[#92400E]">
                <Timer className="h-3.5 w-3.5 text-[#D97706]" />
                {secondsLeft > 0
                  ? `Chrono Éclair : ${secondsLeft} s (+${SPEED_BONUS_POINTS} pts)`
                  : "Chrono terminé · répondez à votre rythme"}
              </span>
              {currentStreak >= 1 && (
                <span className="inline-flex items-center gap-1 font-semibold text-[#B45309]">
                  <Flame className="h-3.5 w-3.5" />
                  Série ×{currentStreak}
                </span>
              )}
            </div>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-[#D97706]/20">
              <div
                className="h-full rounded-full bg-[#D97706] transition-all duration-1000 ease-linear"
                style={{ width: `${chronoPercent}%` }}
              />
            </div>
          </div>
        )}

        {!hasSpicyChrono && currentStreak >= 1 && !solvedRecord && (
          <p className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-[#1D6B4A]">
            <Flame className="h-3.5 w-3.5 text-[#D97706]" />
            <span>
              Série sans faute en cours : {currentStreak} étape(s) (+15 pts bonus dès la 2e)
            </span>
          </p>
        )}

        {stop.partnerName && (
          <div className="mt-3.5 rounded-xl border border-[#18261E]/10 bg-[#F1F3EE] p-3.5">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#18261E]">
              <Store className="h-4 w-4 text-[#1D6B4A]" />
              <span>{stop.partnerName}</span>
            </div>
            {stop.vitrineHint && (
              <p className="mt-1 text-xs text-[#526158]">{stop.vitrineHint}</p>
            )}

            {(playStyle === "commerces" || vitrineVerified) && stop.vitrineCode && !solvedRecord && (
              <div className="mt-2.5 flex gap-2">
                <div className="relative flex-1">
                  <QrCode className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[#526158]" />
                  <input
                    type="text"
                    value={vitrineInput}
                    onChange={(e) => setVitrineInput(e.target.value)}
                    disabled={vitrineVerified}
                    placeholder={`Code (${stop.vitrineCode})`}
                    className="h-11 w-full rounded-lg border border-[#18261E]/16 bg-white pr-2.5 pl-9 text-base font-medium text-[#18261E] uppercase focus:border-[#1D6B4A] focus:outline-none disabled:opacity-70 sm:text-xs"
                  />
                </div>
                {!vitrineVerified && (
                  <button
                    type="button"
                    onClick={handleCheckVitrine}
                    className="min-h-[44px] cursor-pointer rounded-lg border border-[#1D6B4A] bg-white px-3 py-1.5 text-xs font-semibold text-[#1D6B4A] whitespace-nowrap"
                  >
                    Valider
                  </button>
                )}
              </div>
            )}
            {vitrineMsg && (
              <p
                className={`mt-2 text-xs font-medium ${
                  vitrineVerified ? "text-[#1D6B4A]" : "text-[#B45309]"
                }`}
              >
                {vitrineMsg}
              </p>
            )}
          </div>
        )}

        {!solvedRecord ? (
          <div className="mt-4">
            <h3 className="text-sm font-bold leading-snug text-[#18261E]">{riddle.question}</h3>

            <div className="mt-3 space-y-2">
              {riddle.options.map((option, idx) => {
                const isSelected = selectedOption === idx;
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => {
                      setSelectedOption(idx);
                      setFeedbackError("");
                    }}
                    className={`flex min-h-[48px] w-full cursor-pointer items-center justify-between gap-3 rounded-xl border px-3.5 py-2.5 text-left text-sm font-medium transition-colors ${
                      isSelected
                        ? "border-[#1D6B4A] bg-[#F1F7F4] text-[#18261E]"
                        : "border-[#18261E]/14 bg-white text-[#18261E]"
                    }`}
                  >
                    <span>{option}</span>
                    <span
                      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                        isSelected
                          ? "border-[#1D6B4A] bg-[#1D6B4A] text-white"
                          : "border-[#18261E]/25 bg-white"
                      }`}
                    >
                      {isSelected && <Check className="h-3 w-3" />}
                    </span>
                  </button>
                );
              })}
            </div>

            {showHint && (
              <div className="mt-3 rounded-xl border border-[#D97706]/30 bg-[#FEF9EC] p-3 text-xs leading-relaxed text-[#78350F]">
                <strong>Indice :</strong> {riddle.hint}
              </div>
            )}

            {feedbackError && (
              <p className="mt-2.5 text-xs font-semibold text-[#B91C1C]">{feedbackError}</p>
            )}

            <div className="mt-5 flex flex-col gap-2.5">
              <button
                type="button"
                onClick={handleValidateAnswer}
                className="inline-flex min-h-[48px] w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#1D6B4A] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#16553A]"
              >
                <Sparkles className="h-4 w-4" />
                <span>Valider notre réponse</span>
              </button>
              <button
                type="button"
                onClick={() => setShowHint(true)}
                disabled={showHint}
                className="inline-flex min-h-[42px] w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-[#18261E]/15 bg-white px-4 py-2 text-xs font-semibold text-[#526158] disabled:opacity-50"
              >
                <HelpCircle className="h-4 w-4" />
                <span>{showHint ? "Indice affiché" : "Demander un indice"}</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="mt-4 rounded-2xl border border-[#1D6B4A]/25 bg-white p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-[#1D6B4A]">
                <Gem className="h-4 w-4" />
                <span className="text-sm font-bold">{stop.treasureName}</span>
              </div>
              <div className="flex items-center gap-1 text-[#D97706]">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < solvedRecord.stars ? "fill-current" : "text-[#18261E]/20"
                    }`}
                  />
                ))}
                <span className="font-mono-num ml-1 text-xs font-semibold text-[#18261E]">
                  +{solvedRecord.pointsEarned} pts
                </span>
              </div>
            </div>

            {(solvedRecord.speedBonus ||
              (solvedRecord.streakBonus ?? 0) > 0 ||
              solvedRecord.vitrineBonus) && (
              <p className="mt-2 text-xs font-medium text-[#1D6B4A]">
                Bonus gagnés :{" "}
                {[
                  solvedRecord.vitrineBonus ? "Vitrine +40" : null,
                  solvedRecord.speedBonus ? `Chrono Éclair +${SPEED_BONUS_POINTS}` : null,
                  (solvedRecord.streakBonus ?? 0) > 0
                    ? `Sans faute +${solvedRecord.streakBonus}`
                    : null,
                ]
                  .filter(Boolean)
                  .join(" · ")}
              </p>
            )}

            <p className="mt-2.5 text-sm leading-relaxed text-[#18261E]">{riddle.explanation}</p>

            <div className="mt-3 rounded-xl bg-[#F1F3EE] p-3 text-xs leading-relaxed text-[#526158]">
              <p className="font-semibold text-[#18261E]">Badge : {stop.badgeTitle}</p>
              <p className="mt-1">{stop.heritageFact}</p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="mt-4 inline-flex min-h-[46px] w-full cursor-pointer items-center justify-center rounded-xl bg-[#1D6B4A] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#16553A]"
            >
              Continuer l'aventure
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
