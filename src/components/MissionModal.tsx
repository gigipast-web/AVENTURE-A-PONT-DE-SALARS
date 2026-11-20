import { useState } from "react";
import { Check, Gem, HelpCircle, QrCode, Sparkles, Star, Store, X } from "lucide-react";
import {
  AVATARS,
  LEVELS,
  type AdventureStop,
  type AvatarId,
  type LevelId,
} from "../data/pontDeSalarsData";
import type { CompletedStopRecord, PlayStyle } from "../types/game";
import { playChime } from "../utils/soundFx";

interface MissionModalProps {
  stop: AdventureStop;
  avatarId: AvatarId;
  levelId: LevelId;
  playStyle: PlayStyle;
  existingRecord?: CompletedStopRecord;
  muted: boolean;
  onClose: () => void;
  onComplete: (record: CompletedStopRecord) => void;
}

export function MissionModal({
  stop,
  avatarId,
  levelId,
  playStyle,
  existingRecord,
  muted,
  onClose,
  onComplete,
}: MissionModalProps) {
  const avatar = AVATARS.find((a) => a.id === avatarId) ?? AVATARS[0];
  const level = LEVELS.find((l) => l.id === levelId) ?? LEVELS[1];
  const riddle = stop.riddles[levelId];

  const [selectedOption, setSelectedOption] = useState<number | null>(
    existingRecord ? riddle.correctIndex : null,
  );
  const [showHint, setShowHint] = useState(false);
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [feedbackError, setFeedbackError] = useState("");
  const [vitrineInput, setVitrineInput] = useState(
    existingRecord?.vitrineBonus && stop.vitrineCode ? stop.vitrineCode : "",
  );
  const [vitrineVerified, setVitrineVerified] = useState(Boolean(existingRecord?.vitrineBonus));
  const [vitrineMsg, setVitrineMsg] = useState("");
  const [solvedRecord, setSolvedRecord] = useState<CompletedStopRecord | null>(
    existingRecord ?? null,
  );

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
      const stars = Math.max(1, 3 - (showHint ? 1 : 0) - (wrongAttempts > 0 ? 1 : 0));
      const basePoints = 80 + stars * 20;
      const weightedPoints = Math.round(basePoints * level.pointMultiplier);
      const bonus = vitrineVerified ? 40 : 0;

      const record: CompletedStopRecord = {
        stopId: stop.id,
        stars,
        pointsEarned: weightedPoints + bonus,
        usedHint: showHint,
        vitrineBonus: vitrineVerified,
        solvedAt: new Date().toISOString(),
      };
      playChime(stop.order === 10 ? "victory" : "success", muted);
      setFeedbackError("");
      setSolvedRecord(record);
      onComplete(record);
    } else {
      playChime("error", muted);
      setWrongAttempts((n) => n + 1);
      setFeedbackError(
        "Pas tout à fait ! Relisez bien la question ou utilisez l'indice de votre compagnon.",
      );
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-[#18261E]/55 p-0 backdrop-blur-xs sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="mission-modal-title"
    >
      <div className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-t-3xl border border-[#18261E]/12 bg-[#FAF9F5] p-5 shadow-2xl sm:rounded-2xl sm:p-7">
        <div className="flex items-start justify-between gap-4 border-b border-[#18261E]/10 pb-4">
          <div>
            <p className="text-xs font-semibold text-[#1D6B4A]">
              Étape {String(stop.order).padStart(2, "0")} · {stop.categoryLabel} · {level.title}
            </p>
            <h2 id="mission-modal-title" className="font-display mt-1 text-2xl font-bold text-[#18261E]">
              {stop.name}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer la mission"
            className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-xl border border-[#18261E]/14 bg-white text-[#526158] transition-colors hover:text-[#18261E]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-5 flex items-start gap-3.5 rounded-xl border border-[#18261E]/10 bg-white p-4">
          <img
            src={avatar.image}
            alt={avatar.name}
            referrerPolicy="no-referrer"
            className="h-12 w-12 shrink-0 rounded-xl object-cover"
          />
          <div>
            <p className="text-xs font-semibold text-[#18261E]">{avatar.name} vous guide</p>
            <p className="mt-1 text-sm leading-relaxed text-[#526158]">{stop.storyIntro}</p>
          </div>
        </div>

        {stop.partnerName && (
          <div className="mt-4 rounded-xl border border-[#18261E]/10 bg-[#F1F3EE] p-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#18261E]">
              <Store className="h-4 w-4 text-[#1D6B4A]" />
              <span>Partenaire de l'étape : {stop.partnerName}</span>
            </div>
            {stop.vitrineHint && (
              <p className="mt-1 text-xs text-[#526158]">{stop.vitrineHint}</p>
            )}

            {(playStyle === "commerces" || vitrineVerified) && stop.vitrineCode && !solvedRecord && (
              <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center">
                <div className="relative flex-1">
                  <QrCode className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[#526158]" />
                  <input
                    type="text"
                    value={vitrineInput}
                    onChange={(e) => setVitrineInput(e.target.value)}
                    disabled={vitrineVerified}
                    placeholder={`Code vitrine bonus (ex. ${stop.vitrineCode})`}
                    className="h-10 w-full rounded-lg border border-[#18261E]/16 bg-white pr-3 pl-9 text-xs font-medium text-[#18261E] uppercase focus:border-[#1D6B4A] focus:outline-none disabled:opacity-70"
                  />
                </div>
                {!vitrineVerified && (
                  <button
                    type="button"
                    onClick={handleCheckVitrine}
                    className="min-h-[40px] cursor-pointer rounded-lg border border-[#1D6B4A] bg-white px-3.5 py-1.5 text-xs font-semibold text-[#1D6B4A] transition-colors hover:bg-[#1D6B4A] hover:text-white whitespace-nowrap"
                  >
                    Valider le code
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
          <div className="mt-5">
            <h3 className="text-base font-bold text-[#18261E]">{riddle.question}</h3>

            <div className="mt-3 space-y-2.5">
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
                    className={`flex min-h-[50px] w-full cursor-pointer items-center justify-between gap-3 rounded-xl border px-4 py-3 text-left text-sm font-medium transition-colors ${
                      isSelected
                        ? "border-[#1D6B4A] bg-[#F1F7F4] text-[#18261E]"
                        : "border-[#18261E]/14 bg-white text-[#18261E] hover:border-[#18261E]/30"
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
              <div className="mt-3 rounded-xl border border-[#D97706]/30 bg-[#FEF9EC] p-3.5 text-xs leading-relaxed text-[#78350F]">
                <strong>Indice de {avatar.name} :</strong> {riddle.hint}
              </div>
            )}

            {feedbackError && (
              <p className="mt-3 text-xs font-semibold text-[#B91C1C]">{feedbackError}</p>
            )}

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="button"
                onClick={() => setShowHint(true)}
                disabled={showHint}
                className="inline-flex min-h-[44px] cursor-pointer items-center justify-center gap-2 rounded-xl border border-[#18261E]/15 bg-white px-4 py-2.5 text-xs font-semibold text-[#526158] transition-colors hover:text-[#18261E] disabled:opacity-50"
              >
                <HelpCircle className="h-4 w-4" />
                <span>{showHint ? "Indice affiché" : "Demander un indice"}</span>
              </button>

              <button
                type="button"
                onClick={handleValidateAnswer}
                className="inline-flex min-h-[46px] cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#1D6B4A] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#16553A]"
              >
                <Sparkles className="h-4 w-4" />
                <span>Valider notre réponse</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="mt-5 rounded-2xl border border-[#1D6B4A]/25 bg-white p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-[#1D6B4A]">
                <Gem className="h-5 w-5" />
                <span className="text-sm font-bold">Trésor débloqué : {stop.treasureName}</span>
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
                <span className="font-mono-num ml-1.5 text-xs font-semibold text-[#18261E]">
                  +{solvedRecord.pointsEarned} pts
                </span>
              </div>
            </div>

            <p className="mt-3 text-sm leading-relaxed text-[#18261E]">{riddle.explanation}</p>

            <div className="mt-4 rounded-xl bg-[#F1F3EE] p-3.5 text-xs leading-relaxed text-[#526158]">
              <p className="font-semibold text-[#18261E]">
                Badge gagné : {stop.badgeTitle}
              </p>
              <p className="mt-1">{stop.heritageFact}</p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="mt-5 inline-flex min-h-[46px] w-full cursor-pointer items-center justify-center rounded-xl bg-[#1D6B4A] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#16553A]"
            >
              Continuer l'aventure
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
