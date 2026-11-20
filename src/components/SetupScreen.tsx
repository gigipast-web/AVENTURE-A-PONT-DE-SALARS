import { useState } from "react";
import { ArrowRight, Check, Compass, MapPin, QrCode, RotateCcw, Store } from "lucide-react";
import {
  ADVENTURE_STOPS,
  AVATARS,
  HERO_IMAGE,
  LEVELS,
  PARTNER_SHOPS,
  type AvatarId,
  type LevelId,
} from "../data/pontDeSalarsData";
import type { FamilySession, PlayStyle } from "../types/game";

interface SetupScreenProps {
  existingSession: FamilySession | null;
  mobileShell: boolean;
  onStartAdventure: (config: {
    familyName: string;
    avatarId: AvatarId;
    levelId: LevelId;
    playStyle: PlayStyle;
  }) => void;
  onResumeAdventure: () => void;
  onResetAdventure: () => void;
}

export function SetupScreen({
  existingSession,
  mobileShell,
  onStartAdventure,
  onResumeAdventure,
  onResetAdventure,
}: SetupScreenProps) {
  const [familyName, setFamilyName] = useState(existingSession?.familyName ?? "");
  const [avatarId, setAvatarId] = useState<AvatarId>(existingSession?.avatarId ?? "renard");
  const [levelId, setLevelId] = useState<LevelId>(existingSession?.levelId ?? "aventuriers");
  const [playStyle, setPlayStyle] = useState<PlayStyle>(existingSession?.playStyle ?? "libre");
  const [heroImgError, setHeroImgError] = useState(false);
  const [formError, setFormError] = useState("");

  const completedCount = existingSession
    ? Object.keys(existingSession.completedStops).length
    : 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = familyName.trim();
    if (cleaned.length < 2) {
      setFormError("Indiquez le nom de votre famille ou équipe (au moins 2 lettres).");
      return;
    }
    setFormError("");
    onStartAdventure({
      familyName: cleaned,
      avatarId,
      levelId,
      playStyle,
    });
  };

  return (
    <div
      className={`mx-auto px-4 pt-4 pb-8 ${
        mobileShell ? "space-y-5" : "max-w-7xl space-y-8 sm:px-6 sm:pt-6 lg:px-8 lg:pb-14"
      }`}
    >
      <section className={mobileShell ? "space-y-4" : "grid items-stretch gap-8 lg:grid-cols-12"}>
        <div
          className={`overflow-hidden rounded-2xl border border-[#18261E]/10 bg-[#F1F3EE] ${
            mobileShell ? "" : "lg:order-2 lg:col-span-6"
          }`}
        >
          {!heroImgError ? (
            <img
              src={HERO_IMAGE}
              alt="Vue illustrée du village de Pont-de-Salars, son pont sur le Viaur, sa chapelle et son lac"
              referrerPolicy="no-referrer"
              onError={() => setHeroImgError(true)}
              className={`w-full object-cover ${
                mobileShell ? "h-44" : "h-56 sm:h-72 lg:h-full lg:min-h-[320px]"
              }`}
            />
          ) : (
            <div className="flex h-44 w-full flex-col items-center justify-center bg-[#E6EFE9] p-6 text-center">
              <Compass className="h-9 w-9 text-[#1D6B4A]" />
              <p className="font-display mt-2 text-base font-semibold text-[#18261E]">
                Pont-de-Salars & Lac du Lévézou
              </p>
            </div>
          )}
        </div>

        <div className={`flex flex-col justify-between ${mobileShell ? "" : "lg:order-1 lg:col-span-6"}`}>
          <div>
            <p className="text-xs font-semibold text-[#1D6B4A]">
              Chasse au trésor en Aveyron · 10 étapes
            </p>
            <h1
              className={`font-display mt-1.5 text-balance font-bold tracking-tight text-[#18261E] ${
                mobileShell ? "text-2xl leading-tight" : "text-3xl sm:text-5xl sm:leading-[1.08]"
              }`}
            >
              À l'aventure à Pont-de-Salars !
            </h1>
            <p className="mt-2.5 text-sm leading-relaxed text-[#526158]">
              Le Farfadet du Viaur a caché les 10 trésors du village. En famille, suivez la carte,
              observez les vitrines et résolvez les énigmes jusqu'aux Rousselleries.
            </p>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-3 border-t border-[#18261E]/10 pt-4">
            <div>
              <p className="font-mono-num text-xl font-bold text-[#18261E]">10</p>
              <p className="text-[11px] text-[#526158]">Trésors</p>
            </div>
            <div>
              <p className="font-mono-num text-xl font-bold text-[#18261E]">3</p>
              <p className="text-[11px] text-[#526158]">Niveaux d'âge</p>
            </div>
            <div>
              <p className="font-mono-num text-xl font-bold text-[#18261E]">
                {PARTNER_SHOPS.length}
              </p>
              <p className="text-[11px] text-[#526158]">Commerces</p>
            </div>
          </div>
        </div>
      </section>

      {existingSession && (
        <section className="rounded-2xl border border-[#1D6B4A]/25 bg-white p-4">
          <p className="text-xs font-semibold text-[#1D6B4A]">
            Partie en cours · {completedCount} / {ADVENTURE_STOPS.length} trésors trouvés
          </p>
          <h2 className="font-display mt-0.5 text-lg font-bold text-[#18261E]">
            {existingSession.familyName}
          </h2>
          <div className="mt-3 flex flex-wrap gap-2.5">
            <button
              type="button"
              onClick={onResumeAdventure}
              className="inline-flex min-h-[44px] flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#1D6B4A] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#16553A] whitespace-nowrap"
            >
              <span>Reprendre la carte</span>
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={onResetAdventure}
              aria-label="Nouvelle famille"
              className="inline-flex min-h-[44px] cursor-pointer items-center justify-center gap-1.5 rounded-xl border border-[#18261E]/15 bg-[#FAF9F5] px-3.5 py-2 text-xs font-medium text-[#526158] hover:text-[#18261E] whitespace-nowrap"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Recommencer</span>
            </button>
          </div>
        </section>
      )}

      <form
        id="team-setup-form"
        onSubmit={handleSubmit}
        className="rounded-2xl border border-[#18261E]/10 bg-white p-4 sm:p-6"
      >
        <div className="border-b border-[#18261E]/8 pb-4">
          <h2 className="font-display text-xl font-bold text-[#18261E]">
            Créer votre équipe
          </h2>
          <p className="mt-0.5 text-xs text-[#526158]">
            Choisissez votre nom, votre compagnon et votre niveau de difficulté.
          </p>
        </div>

        <div className={mobileShell ? "mt-4 space-y-5" : "mt-6 grid gap-8 lg:grid-cols-12"}>
          <div className={mobileShell ? "space-y-5" : "space-y-6 lg:col-span-5"}>
            <div>
              <label htmlFor="family-name" className="block text-sm font-semibold text-[#18261E]">
                Nom de la famille / équipe
              </label>
              <input
                id="family-name"
                type="text"
                maxLength={36}
                value={familyName}
                onChange={(e) => setFamilyName(e.target.value)}
                placeholder="Ex. Famille Martin"
                className="mt-2 h-12 w-full rounded-xl border border-[#18261E]/18 bg-[#FAF9F5] px-3.5 text-base text-[#18261E] placeholder:text-[#526158]/60 focus:border-[#1D6B4A] focus:bg-white focus:outline-none"
              />
              {formError && <p className="mt-1.5 text-xs font-medium text-[#B91C1C]">{formError}</p>}
            </div>

            <div>
              <p className="text-sm font-semibold text-[#18261E]">Niveau d'énigmes</p>
              <div className="mt-2 space-y-2">
                {LEVELS.map((lvl) => {
                  const selected = levelId === lvl.id;
                  return (
                    <button
                      key={lvl.id}
                      type="button"
                      onClick={() => setLevelId(lvl.id)}
                      className={`flex min-h-[52px] w-full cursor-pointer items-center justify-between gap-3 rounded-xl border p-3 text-left transition-colors ${
                        selected
                          ? "border-[#1D6B4A] bg-[#F1F7F4]"
                          : "border-[#18261E]/12 bg-[#FAF9F5] hover:border-[#18261E]/25"
                      }`}
                    >
                      <div>
                        <p className="text-sm font-semibold text-[#18261E]">
                          {lvl.title}{" "}
                          <span className="font-normal text-[#526158]">· {lvl.ageRange}</span>
                        </p>
                        <p className="mt-0.5 text-xs text-[#526158]">{lvl.description}</p>
                      </div>
                      <span
                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                          selected
                            ? "border-[#1D6B4A] bg-[#1D6B4A] text-white"
                            : "border-[#18261E]/25 bg-white"
                        }`}
                      >
                        {selected && <Check className="h-3 w-3" />}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-[#18261E]">Mode de jeu</p>
              <div className="mt-2 grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => setPlayStyle("libre")}
                  className={`flex min-h-[52px] cursor-pointer items-start gap-2.5 rounded-xl border p-3 text-left transition-colors ${
                    playStyle === "libre"
                      ? "border-[#1D6B4A] bg-[#F1F7F4]"
                      : "border-[#18261E]/12 bg-[#FAF9F5]"
                  }`}
                >
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#1D6B4A]" />
                  <div>
                    <p className="text-xs font-semibold text-[#18261E]">Carte & Énigmes</p>
                    <p className="text-[11px] text-[#526158]">Pas à pas</p>
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => setPlayStyle("commerces")}
                  className={`flex min-h-[52px] cursor-pointer items-start gap-2.5 rounded-xl border p-3 text-left transition-colors ${
                    playStyle === "commerces"
                      ? "border-[#1D6B4A] bg-[#F1F7F4]"
                      : "border-[#18261E]/12 bg-[#FAF9F5]"
                  }`}
                >
                  <QrCode className="mt-0.5 h-4 w-4 shrink-0 text-[#1D6B4A]" />
                  <div>
                    <p className="text-xs font-semibold text-[#18261E]">Codes Vitrines</p>
                    <p className="text-[11px] text-[#526158]">Bonus boutique</p>
                  </div>
                </button>
              </div>
            </div>
          </div>

          <div className={`flex flex-col justify-between ${mobileShell ? "" : "lg:col-span-7"}`}>
            <div>
              <p className="text-sm font-semibold text-[#18261E]">Votre compagnon d'aventure</p>
              <div
                className={`mt-2.5 ${
                  mobileShell
                    ? "no-scrollbar -mx-1 flex snap-x snap-mandatory gap-3 overflow-x-auto px-1 pb-2"
                    : "grid gap-4 sm:grid-cols-3"
                }`}
              >
                {AVATARS.map((av) => {
                  const selected = avatarId === av.id;
                  return (
                    <button
                      key={av.id}
                      type="button"
                      onClick={() => setAvatarId(av.id)}
                      className={`flex shrink-0 cursor-pointer flex-col overflow-hidden rounded-2xl border text-left transition-all ${
                        mobileShell ? "w-[175px] snap-start" : ""
                      } ${
                        selected
                          ? "border-[#1D6B4A] bg-[#F1F7F4] ring-1 ring-[#1D6B4A]"
                          : "border-[#18261E]/12 bg-[#FAF9F5] hover:border-[#18261E]/25"
                      }`}
                    >
                      <div className="aspect-square w-full overflow-hidden bg-[#F1F3EE]">
                        <img
                          src={av.image}
                          alt={av.name}
                          referrerPolicy="no-referrer"
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="p-3">
                        <p className="text-[11px] text-[#526158]">{av.role}</p>
                        <p className="mt-0.5 text-sm font-bold text-[#18261E]">{av.name}</p>
                        <p className="mt-1 line-clamp-2 text-xs text-[#526158]">{av.tagline}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              type="submit"
              className="mt-5 inline-flex min-h-[48px] w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#1D6B4A] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#16553A]"
            >
              <span>Lancer l'aventure</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </form>

      <section className={mobileShell ? "space-y-4" : "grid gap-6 lg:grid-cols-2"}>
        <div className="rounded-2xl border border-[#18261E]/10 bg-white p-4 sm:p-5">
          <div className="flex items-center gap-2">
            <Store className="h-4 w-4 text-[#1D6B4A]" />
            <h3 className="font-display text-lg font-bold text-[#18261E]">
              Commerces & artisans partenaires
            </h3>
          </div>
          <div className="mt-3 divide-y divide-[#18261E]/8">
            {PARTNER_SHOPS.map((shop) => (
              <div key={shop.id} className="flex items-center justify-between gap-3 py-2.5">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-[#18261E]">{shop.partnerName}</p>
                  <p className="truncate text-xs text-[#526158]">{shop.missionSummary}</p>
                </div>
                <span className="font-mono-num text-xs font-semibold text-[#1D6B4A] shrink-0">
                  #{String(shop.order).padStart(2, "0")}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-[#18261E]/10 bg-white p-4 sm:p-5">
          <div className="flex items-center gap-2">
            <Compass className="h-4 w-4 text-[#1D6B4A]" />
            <h3 className="font-display text-lg font-bold text-[#18261E]">
              Patrimoine & nature du village
            </h3>
          </div>
          <div className="mt-3 divide-y divide-[#18261E]/8">
            {ADVENTURE_STOPS.filter((s) => s.category !== "commerce").map((place) => (
              <div key={place.id} className="flex items-center justify-between gap-3 py-2.5">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-[#18261E]">{place.name}</p>
                  <p className="truncate text-xs text-[#526158]">{place.missionSummary}</p>
                </div>
                <span className="font-mono-num text-xs font-semibold text-[#D97706] shrink-0">
                  #{String(place.order).padStart(2, "0")}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
