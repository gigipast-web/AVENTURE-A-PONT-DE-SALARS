import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  CandyCane,
  Check,
  Gift,
  HelpCircle,
  Play,
  RotateCcw,
  Snowflake,
  Sparkles,
  Star,
  TreePine,
  Trophy,
} from "lucide-react";
import {
  CHRISTMAS_HERO_IMAGE,
  CHRISTMAS_LEVELS,
  CHRISTMAS_QUESTIONS,
  type ChristmasLevelId,
} from "../data/christmasGameData";
import { playChime } from "../utils/soundFx";
import {
  ChristmasGarlandBanner,
  ChristmasHangingOrnaments,
  ChristmasLightsGarland,
  ChristmasPageSnowfall,
  ChristmasSnowfall,
  HollyCorner,
  InteractiveChristmasTree,
} from "./ChristmasDecorations";

type ChristmasActivity = "quiz" | "catch";
type CatchPhase = "READY" | "PLAYING" | "GAME_OVER";
type FallingKind = "gift" | "star" | "candy" | "coal";

interface FallingItem {
  id: number;
  kind: FallingKind;
  xPercent: number;
  yPx: number;
  speedPxPerSec: number;
  points: number;
}

const CATCH_BEST_KEY = "pont_de_salars_noel_best_v1";
const CATCH_DURATION_SEC = 30;
const ARENA_HEIGHT_PX = 330;

function loadCatchBest(): number {
  try {
    const val = Number(localStorage.getItem(CATCH_BEST_KEY) || 0);
    return Number.isFinite(val) && val > 0 ? val : 0;
  } catch {
    return 0;
  }
}

interface ChristmasGameViewProps {
  mobileShell: boolean;
  muted: boolean;
  onBack: () => void;
}

export function ChristmasGameView({ mobileShell, muted, onBack }: ChristmasGameViewProps) {
  const [heroError, setHeroError] = useState(false);
  const [activity, setActivity] = useState<ChristmasActivity>("quiz");

  // --- Activity 1: Quiz du Sapin Magique ---
  const [quizLevel, setQuizLevel] = useState<ChristmasLevelId>("lutins");
  const [questionIdx, setQuestionIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [quizError, setQuizError] = useState("");
  const [answeredCorrect, setAnsweredCorrect] = useState(false);
  const [decoratedCount, setDecoratedCount] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const currentQuestions = CHRISTMAS_QUESTIONS[quizLevel];
  const currentQuestion = currentQuestions[questionIdx];
  const levelInfo = CHRISTMAS_LEVELS.find((l) => l.id === quizLevel) ?? CHRISTMAS_LEVELS[0];

  const handleChangeQuizLevel = (lvl: ChristmasLevelId) => {
    setQuizLevel(lvl);
    setQuestionIdx(0);
    setSelectedOption(null);
    setShowHint(false);
    setQuizError("");
    setAnsweredCorrect(false);
    setDecoratedCount(0);
    setQuizScore(0);
    setQuizFinished(false);
  };

  const handleRestartQuiz = () => {
    setQuestionIdx(0);
    setSelectedOption(null);
    setShowHint(false);
    setQuizError("");
    setAnsweredCorrect(false);
    setDecoratedCount(0);
    setQuizScore(0);
    setQuizFinished(false);
  };

  const handleValidateQuiz = () => {
    if (selectedOption === null) {
      setQuizError("Choisissez une réponse avant de décorer le sapin !");
      return;
    }

    if (selectedOption === currentQuestion.correctIndex) {
      const gained = Math.round((showHint ? 80 : 120) * levelInfo.multiplier);
      setQuizError("");
      setAnsweredCorrect(true);
      setDecoratedCount((c) => Math.max(c, questionIdx + 1));
      setQuizScore((s) => s + gained);
      playChime(questionIdx + 1 >= currentQuestions.length ? "victory" : "success", muted);
    } else {
      playChime("error", muted);
      setQuizError("Pas tout à fait ! Essayez une autre réponse ou demandez un indice de lutin.");
    }
  };

  const handleNextQuestion = () => {
    if (questionIdx + 1 >= currentQuestions.length) {
      setQuizFinished(true);
      return;
    }
    setQuestionIdx((i) => i + 1);
    setSelectedOption(null);
    setShowHint(false);
    setQuizError("");
    setAnsweredCorrect(false);
  };

  // --- Activity 2: Pluie de Cadeaux sur le Pont ---
  const [catchPhase, setCatchPhase] = useState<CatchPhase>("READY");
  const [catchScore, setCatchScore] = useState(0);
  const [catchBest, setCatchBest] = useState<number>(() => loadCatchBest());
  const [catchTimeLeft, setCatchTimeLeft] = useState(CATCH_DURATION_SEC);
  const [caughtCount, setCaughtCount] = useState(0);
  const [lastTapFeedback, setLastTapFeedback] = useState("");
  const [items, setItems] = useState<FallingItem[]>([]);

  const nextIdRef = useRef(1);
  const spawnTimerRef = useRef(0);
  const catchScoreRef = useRef(0);

  const startCatchGame = useCallback(() => {
    nextIdRef.current = 1;
    spawnTimerRef.current = 0;
    catchScoreRef.current = 0;
    setItems([]);
    setCatchScore(0);
    setCaughtCount(0);
    setCatchTimeLeft(CATCH_DURATION_SEC);
    setLastTapFeedback("");
    setCatchPhase("PLAYING");
    playChime("click", muted);
  }, [muted]);

  useEffect(() => {
    if (catchPhase !== "PLAYING") return;

    const timer = window.setInterval(() => {
      setCatchTimeLeft((prev) => {
        if (prev <= 1) {
          setCatchPhase("GAME_OVER");
          playChime("victory", muted);
          setCatchBest((oldBest) => {
            const nextBest = Math.max(oldBest, catchScoreRef.current);
            try {
              localStorage.setItem(CATCH_BEST_KEY, String(nextBest));
            } catch {
              // ignore storage errors
            }
            return nextBest;
          });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [catchPhase, muted]);

  useEffect(() => {
    if (catchPhase !== "PLAYING") return;

    let rafId = 0;
    let lastTime = performance.now();

    const step = (now: number) => {
      const dt = Math.min(0.05, (now - lastTime) / 1000);
      lastTime = now;

      spawnTimerRef.current += dt;
      let spawned: FallingItem | null = null;
      if (spawnTimerRef.current >= 0.62) {
        spawnTimerRef.current = 0;
        const roll = Math.random();
        let kind: FallingKind = "gift";
        let points = 15;
        let speed = 115 + Math.random() * 55;
        if (roll > 0.82) {
          kind = "star";
          points = 30;
          speed = 145 + Math.random() * 45;
        } else if (roll > 0.62) {
          kind = "candy";
          points = 20;
          speed = 125 + Math.random() * 50;
        } else if (roll < 0.2) {
          kind = "coal";
          points = -10;
          speed = 110 + Math.random() * 45;
        }
        spawned = {
          id: nextIdRef.current++,
          kind,
          xPercent: 12 + Math.random() * 76,
          yPx: -24,
          speedPxPerSec: speed,
          points,
        };
      }

      setItems((prev) => {
        const moved = prev
          .map((item) => ({ ...item, yPx: item.yPx + item.speedPxPerSec * dt }))
          .filter((item) => item.yPx < ARENA_HEIGHT_PX + 24);
        return spawned ? [...moved, spawned] : moved;
      });

      rafId = window.requestAnimationFrame(step);
    };

    rafId = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(rafId);
  }, [catchPhase]);

  const handleCatchItem = (target: FallingItem) => {
    if (catchPhase !== "PLAYING") return;
    setItems((prev) => prev.filter((it) => it.id !== target.id));

    if (target.kind === "coal") {
      playChime("error", muted);
      setLastTapFeedback("Oups ! Charbon (-10 pts)");
      setCatchScore((s) => {
        const next = Math.max(0, s - 10);
        catchScoreRef.current = next;
        return next;
      });
    } else {
      playChime("success", muted);
      const label =
        target.kind === "star"
          ? "Étoile d'or +30 !"
          : target.kind === "candy"
            ? "Sucre d'orge +20 !"
            : "Cadeau +15 !";
      setLastTapFeedback(label);
      setCaughtCount((c) => c + 1);
      setCatchScore((s) => {
        const next = s + target.points;
        catchScoreRef.current = next;
        return next;
      });
    }
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-[#F4F8FB] via-[#FAF9F5] to-[#FEF9EC]/45">
      <ChristmasPageSnowfall />

      <div
        className={`relative z-10 mx-auto px-4 pt-2 pb-8 ${
          mobileShell ? "space-y-4" : "max-w-6xl space-y-6 sm:px-6 sm:pt-4 lg:px-8 lg:pb-14"
        }`}
      >
        <ChristmasLightsGarland />

        <div className="flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex min-h-[42px] cursor-pointer items-center gap-1.5 rounded-xl border border-[#18261E]/15 bg-white px-3.5 py-2 text-xs font-semibold text-[#18261E] hover:border-[#1D6B4A]"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Retour au parcours</span>
          </button>

          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#B91C1C]">
            <TreePine className="h-4 w-4 text-[#14532D]" />
            <span>Édition Spéciale Noël</span>
          </span>
        </div>

        <section className="overflow-hidden rounded-2xl border border-[#14532D]/20 bg-white shadow-xs">
          <div className="relative bg-[#FAF9F5]">
            <ChristmasGarlandBanner />
            <div className="absolute top-0 right-1 left-1">
              <ChristmasHangingOrnaments />
            </div>
          </div>

        <div className={mobileShell ? "" : "grid lg:grid-cols-12"}>
          <div className={`relative overflow-hidden bg-[#13263E] ${mobileShell ? "" : "lg:col-span-6"}`}>
            {!heroError ? (
              <img
                src={CHRISTMAS_HERO_IMAGE}
                alt="Pont-de-Salars sous la neige avec son grand sapin illuminé et son pont de pierre"
                referrerPolicy="no-referrer"
                onError={() => setHeroError(true)}
                className={`w-full object-cover ${mobileShell ? "h-44" : "h-56 lg:h-full lg:min-h-[240px]"}`}
              />
            ) : (
              <div className="flex h-44 w-full flex-col items-center justify-center bg-[#13263E] p-6 text-center text-white">
                <TreePine className="h-10 w-10 text-[#FBBF24]" />
                <p className="font-display mt-2 text-lg font-bold">Noël à Pont-de-Salars</p>
              </div>
            )}
            <ChristmasSnowfall />
          </div>

          <div className={`p-4 sm:p-6 ${mobileShell ? "" : "lg:col-span-6"}`}>
            <p className="text-xs font-semibold text-[#B91C1C]">
              Jeux d'hiver · Décorations de Noël
            </p>
            <h1 className="font-display mt-1 text-balance text-2xl font-bold text-[#18261E] sm:text-3xl">
              Le Noël Magique de Pont-de-Salars
            </h1>
            <p className="mt-2 text-xs leading-relaxed text-[#526158] sm:text-sm">
              Le Père Noël a fait escale près du pont enneigé ! Décorez le grand sapin du village
              avec le quiz de Noël ou attrapez un maximum de cadeaux qui tombent du ciel.
            </p>

            <div className="mt-4 grid grid-cols-2 gap-2 rounded-xl bg-[#F1F3EE] p-1">
              <button
                type="button"
                onClick={() => setActivity("quiz")}
                className={`flex min-h-[44px] cursor-pointer items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold transition-colors ${
                  activity === "quiz"
                    ? "bg-white text-[#14532D] shadow-xs"
                    : "text-[#526158] hover:text-[#18261E]"
                }`}
              >
                <TreePine className="h-4 w-4 text-[#14532D]" />
                <span>Sapin & Quiz</span>
              </button>
              <button
                type="button"
                onClick={() => setActivity("catch")}
                className={`flex min-h-[44px] cursor-pointer items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold transition-colors ${
                  activity === "catch"
                    ? "bg-white text-[#B91C1C] shadow-xs"
                    : "text-[#526158] hover:text-[#18261E]"
                }`}
              >
                <Gift className="h-4 w-4 text-[#B91C1C]" />
                <span>Pluie de cadeaux</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {activity === "quiz" ? (
        <section className="relative overflow-hidden rounded-2xl border border-[#14532D]/20 bg-white p-4 sm:p-6">
          <div className="pointer-events-none absolute top-0 left-0">
            <HollyCorner position="left" />
          </div>
          <div className="pointer-events-none absolute top-0 right-0">
            <HollyCorner position="right" />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#18261E]/10 pt-2 pb-4">
            <div>
              <p className="text-xs font-semibold text-[#14532D]">
                Décorations accrochées : {decoratedCount}/8 · Score :{" "}
                <span className="font-mono-num">{quizScore} pts</span>
              </p>
              <h2 className="font-display text-xl font-bold text-[#18261E]">
                Décorez le sapin de Noël !
              </h2>
            </div>

            <div className="flex gap-1.5 rounded-xl bg-[#F1F3EE] p-1">
              {CHRISTMAS_LEVELS.map((lvl) => {
                const active = quizLevel === lvl.id;
                return (
                  <button
                    key={lvl.id}
                    type="button"
                    onClick={() => handleChangeQuizLevel(lvl.id)}
                    className={`min-h-[38px] cursor-pointer rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap ${
                      active
                        ? "bg-white text-[#B91C1C] shadow-xs"
                        : "text-[#526158] hover:text-[#18261E]"
                    }`}
                  >
                    {lvl.title}
                  </button>
                );
              })}
            </div>
          </div>

          <div className={`mt-5 ${mobileShell ? "space-y-5" : "grid items-start gap-8 lg:grid-cols-12"}`}>
            <div
              className={`relative overflow-hidden rounded-2xl border border-[#14532D]/15 bg-gradient-to-b from-[#EEF4FA] via-[#FAF9F5] to-[#F3F8F4] p-4 text-center ${
                mobileShell ? "" : "lg:col-span-5"
              }`}
            >
              <div className="mb-1">
                <ChristmasLightsGarland />
              </div>
              <InteractiveChristmasTree decoratedCount={decoratedCount} />
              <p className="mt-2 text-xs font-medium text-[#526158]">
                {decoratedCount === 0
                  ? "Répondez juste pour accrocher l'étoile dorée !"
                  : decoratedCount < 8
                    ? `Dernière déco : ${currentQuestions[decoratedCount - 1]?.ornamentName}`
                    : "Le sapin de Pont-de-Salars brille de mille feux !"}
              </p>
            </div>

            <div className={mobileShell ? "" : "lg:col-span-7"}>
              {quizFinished ? (
                <div className="rounded-2xl border border-[#D97706]/30 bg-[#FEF9EC] p-5 text-center">
                  <Sparkles className="mx-auto h-9 w-9 text-[#D97706]" />
                  <h3 className="font-display mt-2 text-2xl font-bold text-[#18261E]">
                    Joyeux Noël à toute la famille !
                  </h3>
                  <p className="mt-1.5 text-sm text-[#526158]">
                    Vous avez accroché les 8 décorations de Noël ({levelInfo.title}) avec un score
                    de <strong className="font-mono-num text-[#14532D]">{quizScore} pts</strong>.
                  </p>
                  <div className="mt-5 flex flex-col gap-2.5 sm:flex-row">
                    <button
                      type="button"
                      onClick={handleRestartQuiz}
                      className="inline-flex min-h-[46px] flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#14532D] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#166534]"
                    >
                      <RotateCcw className="h-4 w-4" />
                      <span>Rejouer le quiz</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setActivity("catch")}
                      className="inline-flex min-h-[46px] flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#B91C1C] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#991B1B]"
                    >
                      <Gift className="h-4 w-4" />
                      <span>Attraper les cadeaux</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <p className="text-xs font-semibold text-[#B91C1C]">
                    Question {questionIdx + 1}/{currentQuestions.length} · À gagner :{" "}
                    {currentQuestion.ornamentName}
                  </p>
                  <h3 className="mt-1.5 text-base font-bold leading-snug text-[#18261E]">
                    {currentQuestion.question}
                  </h3>

                  <div className="mt-3.5 space-y-2">
                    {currentQuestion.options.map((opt, idx) => {
                      const isSelected = selectedOption === idx;
                      return (
                        <button
                          key={opt}
                          type="button"
                          disabled={answeredCorrect}
                          onClick={() => {
                            setSelectedOption(idx);
                            setQuizError("");
                          }}
                          className={`flex min-h-[48px] w-full cursor-pointer items-center justify-between gap-3 rounded-xl border px-3.5 py-2.5 text-left text-sm font-medium transition-colors disabled:cursor-default ${
                            isSelected
                              ? "border-[#14532D] bg-[#F1F7F4] text-[#18261E]"
                              : "border-[#18261E]/14 bg-[#FAF9F5] text-[#18261E] hover:border-[#18261E]/25"
                          }`}
                        >
                          <span>{opt}</span>
                          <span
                            className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                              isSelected
                                ? "border-[#14532D] bg-[#14532D] text-white"
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
                    <div className="mt-3 rounded-xl border border-[#D97706]/30 bg-[#FEF9EC] p-3 text-xs text-[#78350F]">
                      <strong>Indice de lutin :</strong> {currentQuestion.hint}
                    </div>
                  )}

                  {quizError && (
                    <p className="mt-2.5 text-xs font-semibold text-[#B91C1C]">{quizError}</p>
                  )}

                  {answeredCorrect ? (
                    <div className="mt-4 rounded-xl border border-[#14532D]/25 bg-[#F1F7F4] p-3.5">
                      <p className="text-sm font-medium text-[#18261E]">
                        {currentQuestion.explanation}
                      </p>
                      <button
                        type="button"
                        onClick={handleNextQuestion}
                        className="mt-3 inline-flex min-h-[46px] w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#14532D] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#166534]"
                      >
                        <span>
                          {questionIdx + 1 >= currentQuestions.length
                            ? "Illuminer le sapin complet"
                            : "Question suivante"}
                        </span>
                      </button>
                    </div>
                  ) : (
                    <div className="mt-4 flex flex-col gap-2">
                      <button
                        type="button"
                        onClick={handleValidateQuiz}
                        className="inline-flex min-h-[48px] w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#B91C1C] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#991B1B]"
                      >
                        <Star className="h-4 w-4" />
                        <span>Accrocher cette décoration</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowHint(true)}
                        disabled={showHint}
                        className="inline-flex min-h-[42px] w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-[#18261E]/15 bg-white px-4 py-2 text-xs font-semibold text-[#526158] disabled:opacity-50"
                      >
                        <HelpCircle className="h-4 w-4" />
                        <span>{showHint ? "Indice affiché" : "Indice des lutins"}</span>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>
      ) : (
        <section className="relative overflow-hidden rounded-2xl border border-[#B91C1C]/25 bg-white p-4 sm:p-6">
          <div className="pointer-events-none absolute top-0 left-0">
            <HollyCorner position="left" />
          </div>
          <div className="pointer-events-none absolute top-0 right-0">
            <HollyCorner position="right" />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#18261E]/10 pt-2 pb-3.5">
            <div>
              <p className="text-xs font-semibold text-[#B91C1C]">
                Mini-jeu d'adresse · 30 secondes
              </p>
              <h2 className="font-display text-xl font-bold text-[#18261E]">
                Pluie de cadeaux sur le pont
              </h2>
            </div>

            <div className="flex items-center gap-4 text-right">
              <div>
                <p className="text-[10px] text-[#526158]">Temps</p>
                <p className="font-mono-num text-sm font-bold text-[#18261E]">
                  {catchTimeLeft}s
                </p>
              </div>
              <div>
                <p className="text-[10px] text-[#526158]">Score</p>
                <p className="font-mono-num text-sm font-bold text-[#B91C1C]">{catchScore}</p>
              </div>
              <div>
                <p className="text-[10px] text-[#526158]">Record</p>
                <p className="font-mono-num inline-flex items-center gap-1 text-sm font-bold text-[#D97706]">
                  <Trophy className="h-3.5 w-3.5" />
                  {catchBest}
                </p>
              </div>
            </div>
          </div>

          <p className="mt-3 text-xs text-[#526158]">
            Touchez les cadeaux (+15), sucres d'orge (+20) et étoiles dorées (+30) qui tombent sur
            Pont-de-Salars. Évitez les boules de charbon (-10) !
          </p>

          <div
            className="relative mt-3 w-full overflow-hidden rounded-2xl border border-[#18261E]/15 bg-gradient-to-b from-[#0F233B] via-[#1B3A5C] to-[#274C77] select-none"
            style={{ height: `${ARENA_HEIGHT_PX}px` }}
          >
            <ChristmasSnowfall />

            <svg
              viewBox="0 0 400 120"
              preserveAspectRatio="none"
              className="pointer-events-none absolute inset-x-0 top-0 h-28 w-full opacity-80"
              aria-hidden="true"
            >
              <circle cx="344" cy="30" r="14" fill="#FEF3C7" fillOpacity="0.9" />
              <circle cx="350" cy="27" r="12" fill="#122842" />
              <circle cx="44" cy="24" r="1.6" fill="#FEF3C7" />
              <circle cx="96" cy="40" r="1.4" fill="#FEF3C7" />
              <circle cx="158" cy="18" r="1.8" fill="#FDE68A" />
              <circle cx="226" cy="36" r="1.5" fill="#FEF3C7" />
              <circle cx="286" cy="20" r="1.7" fill="#FDE68A" />
            </svg>

            {lastTapFeedback && catchPhase === "PLAYING" && (
              <div className="pointer-events-none absolute top-3 left-1/2 z-20 -translate-x-1/2 rounded-lg bg-white/90 px-3 py-1 text-xs font-bold text-[#18261E] shadow-xs">
                {lastTapFeedback}
              </div>
            )}

            <svg
              viewBox="0 0 400 84"
              preserveAspectRatio="none"
              className="pointer-events-none absolute right-0 bottom-0 left-0 h-20 w-full"
              aria-hidden="true"
            >
              <polygon points="18,68 32,28 46,68" fill="#14532D" />
              <polygon points="354,68 368,26 382,68" fill="#14532D" />
              <polygon points="370,70 382,38 394,70" fill="#166534" />
              <path
                d="M0,56 Q55,30 110,56 Q175,30 240,56 Q310,30 375,56 L400,56 L400,84 L0,84 Z"
                fill="#E2E8F0"
              />
              <path d="M0,48 L400,48 L400,56 L0,56 Z" fill="#94A3B8" fillOpacity="0.45" />
              <path
                d="M0,51 Q50,61 100,51 T200,51 T300,51 T400,51"
                fill="none"
                stroke="#14532D"
                strokeWidth="2.5"
              />
              <circle cx="50" cy="56" r="2.6" fill="#DC2626" />
              <circle cx="150" cy="56" r="2.6" fill="#F59E0B" />
              <circle cx="250" cy="56" r="2.6" fill="#DC2626" />
              <circle cx="350" cy="56" r="2.6" fill="#F59E0B" />
            </svg>

            {catchPhase === "PLAYING" &&
              items.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onPointerDown={() => handleCatchItem(item)}
                  aria-label={
                    item.kind === "coal"
                      ? "Charbon piège"
                      : item.kind === "star"
                        ? "Étoile dorée bonus"
                        : item.kind === "candy"
                          ? "Sucre d'orge"
                          : "Cadeau de Noël"
                  }
                  style={{
                    left: `${item.xPercent}%`,
                    transform: `translate(-50%, ${item.yPx}px)`,
                  }}
                  className="absolute top-0 z-10 flex h-14 w-14 cursor-pointer items-center justify-center rounded-2xl transition-transform active:scale-90"
                >
                  {item.kind === "gift" && (
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl border-2 border-[#FEF3C7] bg-[#DC2626] text-white shadow-md">
                      <Gift className="h-6 w-6" />
                    </span>
                  )}
                  {item.kind === "star" && (
                    <span className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-white bg-[#F59E0B] text-white shadow-md">
                      <Star className="h-6 w-6 fill-current" />
                    </span>
                  )}
                  {item.kind === "candy" && (
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl border-2 border-[#FECACA] bg-white text-[#DC2626] shadow-md">
                      <CandyCane className="h-6 w-6" />
                    </span>
                  )}
                  {item.kind === "coal" && (
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#64748B] bg-[#1E293B] text-[#CBD5E1] shadow-md">
                      <Snowflake className="h-5 w-5" />
                    </span>
                  )}
                </button>
              ))}

            {catchPhase === "READY" && (
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#0F233B]/65 p-5 text-center text-white">
                <Gift className="h-10 w-10 text-[#FBBF24]" />
                <h3 className="font-display mt-2 text-xl font-bold">
                  Prêts à aider le Père Noël ?
                </h3>
                <p className="mt-1 max-w-xs text-xs text-white/85">
                  Tapez vite sur les cadeaux et étoiles avant qu'ils ne touchent le pont enneigé.
                </p>
                <button
                  type="button"
                  onClick={startCatchGame}
                  className="mt-4 inline-flex min-h-[46px] cursor-pointer items-center gap-2 rounded-xl bg-[#B91C1C] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#991B1B]"
                >
                  <Play className="h-4 w-4 fill-current" />
                  <span>Lancer la partie (30s)</span>
                </button>
              </div>
            )}

            {catchPhase === "GAME_OVER" && (
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#0F233B]/80 p-5 text-center text-white">
                <Trophy className="h-10 w-10 text-[#FBBF24]" />
                <h3 className="font-display mt-2 text-xl font-bold">Hotte remplie !</h3>
                <p className="mt-1 text-sm text-white/90">
                  Score : <strong className="font-mono-num">{catchScore} pts</strong> ·{" "}
                  {caughtCount} cadeaux attrapés
                </p>
                <button
                  type="button"
                  onClick={startCatchGame}
                  className="mt-4 inline-flex min-h-[46px] cursor-pointer items-center gap-2 rounded-xl bg-[#14532D] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#166534]"
                >
                  <RotateCcw className="h-4 w-4" />
                  <span>Rejouer</span>
                </button>
              </div>
            )}
          </div>
        </section>
      )}
      </div>
    </div>
  );
}
