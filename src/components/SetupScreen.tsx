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
    <div className="mx-auto max-w-7xl px-4 pt-6 pb-24 sm:px-6 lg:px-8 lg:pb-16">
      <section className="grid items-stretch gap-8 lg:grid-cols-12">
        <div className="flex flex-col justify-between lg:col-span-6">
          <div>
            <p className="text-xs font-semibold tracking-wide text-[#1D6B4A]">
              Parcours familial en Aveyron · 10 étapes · Bourg & Lac
            </p>
            <h1 className="font-display mt-3 text-balance text-3xl font-bold tracking-tight text-[#18261E] sm:text-5xl sm:leading-[1.08]">
              À l'aventure à Pont-de-Salars !
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-[#526158]">
              Le mystérieux Farfadet du Viaur a caché les 10 trésors du village. En famille, suivez
              la carte, observez les vitrines des commerçants, rencontrez les artisans et résolvez
              les énigmes de la chapelle jusqu'à la plage des Rousselleries.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-4 border-t border-[#18261E]/10 pt-6">
            <div>
              <p className="font-mono-num text-2xl font-semibold text-[#18261E]">10</p>
              <p className="mt-1 text-xs text-[#526158]">Trésors à retrouver</p>
            </div>
            <div>
              <p className="font-mono-num text-2xl font-semibold text-[#18261E]">3</p>
              <p className="mt-1 text-xs text-[#526158]">Niveaux par âge</p>
            </div>
            <div>
              <p className="font-mono-num text-2xl font-semibold text-[#18261E]">
                {PARTNER_SHOPS.length}
              </p>
              <p className="mt-1 text-xs text-[#526158]">Commerces partenaires</p>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-[#18261E]/10 bg-[#F1F3EE] lg:col-span-6">
          {!heroImgError ? (
            <img
              src={HERO_IMAGE}
              alt="Vue illustrée du village de Pont-de-Salars, son pont sur le Viaur, sa chapelle et son lac"
              referrerPolicy="no-referrer"
              onError={() => setHeroImgError(true)}
              className="h-64 w-full object-cover sm:h-80 lg:h-full lg:min-h-[340px]"
            />
          ) : (
            <div className="flex h-64 w-full flex-col items-center justify-center bg-gradient-to-br from-[#E6EFE9] to-[#F1F3EE] p-6 text-center lg:h-full">
              <Compass className="h-10 w-10 text-[#1D6B4A]" />
              <p className="font-display mt-3 text-lg font-semibold text-[#18261E]">
                Pont-de-Salars & Lac du Lévézou
              </p>
            </div>
          )}
        </div>
      </section>

      {existingSession && (
        <section className="mt-8 rounded-2xl border border-[#1D6B4A]/25 bg-white p-5 sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-medium text-[#1D6B4A]">
                Aventure en cours · {completedCount} / {ADVENTURE_STOPS.length} trésors trouvés
              </p>
              <h2 className="font-display mt-1 text-xl font-bold text-[#18261E]">
                {existingSession.familyName}
              </h2>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={onResumeAdventure}
                className="inline-flex min-h-[44px] cursor-pointer items-center gap-2 rounded-xl bg-[#1D6B4A] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#16553A] whitespace-nowrap"
              >
                <span>Reprendre la carte</span>
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={onResetAdventure}
                className="inline-flex min-h-[44px] cursor-pointer items-center gap-2 rounded-xl border border-[#18261E]/15 bg-[#FAF9F5] px-4 py-2.5 text-sm font-medium text-[#526158] transition-colors hover:border-[#18261E]/30 hover:text-[#18261E] whitespace-nowrap"
              >
                <RotateCcw className="h-4 w-4" />
                <span>Nouvelle famille</span>
              </button>
            </div>
          </div>
        </section>
      )}

      <form
        id="team-setup-form"
        onSubmit={handleSubmit}
        className="mt-10 rounded-2xl border border-[#18261E]/10 bg-white p-6 sm:p-8"
      >
        <div className="border-b border-[#18261E]/8 pb-5">
          <h2 className="font-display text-2xl font-bold text-[#18261E]">
            Préparez votre équipe d'explorateurs
          </h2>
          <p className="mt-1 text-sm text-[#526158]">
            Choisissez votre nom d'équipe, votre compagnon du village et le niveau adapté à votre
            famille.
          </p>
        </div>

        <div className="mt-6 grid gap-8 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-5">
            <div>
              <label htmlFor="family-name" className="block text-sm font-semibold text-[#18261E]">
                Nom de la famille ou de l'équipe
              </label>
              <input
                id="family-name"
                type="text"
                maxLength={36}
                value={familyName}
                onChange={(e) => setFamilyName(e.target.value)}
                placeholder="Ex. Famille Martin ou Les Curieux du Viaur"
                className="mt-2 h-12 w-full rounded-xl border border-[#18261E]/18 bg-[#FAF9F5] px-4 text-base text-[#18261E] placeholder:text-[#526158]/60 focus:border-[#1D6B4A] focus:bg-white focus:outline-none"
              />
              {formError && <p className="mt-2 text-xs font-medium text-[#B91C1C]">{formError}</p>}
            </div>

            <div>
              <p className="text-sm font-semibold text-[#18261E]">Niveau d'énigmes</p>
              <div className="mt-2 space-y-2.5">
                {LEVELS.map((lvl) => {
                  const selected = levelId === lvl.id;
                  return (
                    <button
                      key={lvl.id}
                      type="button"
                      onClick={() => setLevelId(lvl.id)}
                      className={`flex min-h-[56px] w-full cursor-pointer items-start justify-between gap-3 rounded-xl border p-3.5 text-left transition-colors ${
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
                        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
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
              <p className="text-sm font-semibold text-[#18261E]">Mode de promenade</p>
              <div className="mt-2 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => setPlayStyle("libre")}
                  className={`flex min-h-[48px] cursor-pointer items-start gap-3 rounded-xl border p-3 text-left transition-colors ${
                    playStyle === "libre"
                      ? "border-[#1D6B4A] bg-[#F1F7F4]"
                      : "border-[#18261E]/12 bg-[#FAF9F5] hover:border-[#18261E]/25"
                  }`}
                >
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#1D6B4A]" />
                  <div>
                    <p className="text-xs font-semibold text-[#18261E]">Carte & Énigmes</p>
                    <p className="mt-0.5 text-xs text-[#526158]">Jouable partout pas à pas</p>
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => setPlayStyle("commerces")}
                  className={`flex min-h-[48px] cursor-pointer items-start gap-3 rounded-xl border p-3 text-left transition-colors ${
                    playStyle === "commerces"
                      ? "border-[#1D6B4A] bg-[#F1F7F4]"
                      : "border-[#18261E]/12 bg-[#FAF9F5] hover:border-[#18261E]/25"
                  }`}
                >
                  <QrCode className="mt-0.5 h-4 w-4 shrink-0 text-[#1D6B4A]" />
                  <div>
                    <p className="text-xs font-semibold text-[#18261E]">Codes Vitrines</p>
                    <p className="mt-0.5 text-xs text-[#526158]">Avec bonus en boutique</p>
                  </div>
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between lg:col-span-7">
            <div>
              <p className="text-sm font-semibold text-[#18261E]">
                Choisissez votre compagnon de promenade
              </p>
              <div className="mt-3 grid gap-4 sm:grid-cols-3">
                {AVATARS.map((av) => {
                  const selected = avatarId === av.id;
                  return (
                    <button
                      key={av.id}
                      type="button"
                      onClick={() => setAvatarId(av.id)}
                      className={`flex cursor-pointer flex-col overflow-hidden rounded-2xl border text-left transition-all ${
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
                      <div className="p-3.5">
                        <p className="text-xs text-[#526158]">{av.role}</p>
                        <p className="mt-0.5 text-sm font-bold text-[#18261E]">{av.name}</p>
                        <p className="mt-1.5 text-xs leading-relaxed text-[#526158]">
                          {av.tagline}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-6 flex flex-col items-stretch justify-between gap-4 border-t border-[#18261E]/8 pt-5 sm:flex-row sm:items-center">
              <p className="text-xs text-[#526158]">
                Les enfants choisissent leur compagnon, les parents et grands-parents participent aux
                énigmes.
              </p>
              <button
                type="submit"
                className="inline-flex min-h-[48px] cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#1D6B4A] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#16553A] whitespace-nowrap shrink-0"
              >
                <span>Lancer l'aventure</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </form>

      <section className="mt-12 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-[#18261E]/10 bg-white p-6">
          <div className="flex items-center gap-2.5">
            <Store className="h-5 w-5 text-[#1D6B4A]" />
            <h3 className="font-display text-xl font-bold text-[#18261E]">
              Commerces & artisans partenaires
            </h3>
          </div>
          <p className="mt-2 text-sm text-[#526158]">
            Chaque boutique participante accueille les familles avec un indice en vitrine ou une
            spécialité à deviner.
          </p>
          <div className="mt-4 divide-y divide-[#18261E]/8">
            {PARTNER_SHOPS.map((shop) => (
              <div key={shop.id} className="flex items-center justify-between gap-4 py-3">
                <div>
                  <p className="text-sm font-semibold text-[#18261E]">{shop.partnerName}</p>
                  <p className="text-xs text-[#526158]">{shop.missionSummary}</p>
                </div>
                <span className="font-mono-num text-xs font-medium text-[#1D6B4A] whitespace-nowrap shrink-0">
                  Étape {String(shop.order).padStart(2, "0")}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-[#18261E]/10 bg-white p-6">
          <div className="flex items-center gap-2.5">
            <Compass className="h-5 w-5 text-[#1D6B4A]" />
            <h3 className="font-display text-xl font-bold text-[#18261E]">
              Patrimoine & paysages à explorer
            </h3>
          </div>
          <p className="mt-2 text-sm text-[#526158]">
            Un itinéraire doux entre les ruelles du bourg, la rivière du Viaur et les rives du lac.
          </p>
          <div className="mt-4 divide-y divide-[#18261E]/8">
            {ADVENTURE_STOPS.filter((s) => s.category !== "commerce").map((place) => (
              <div key={place.id} className="flex items-center justify-between gap-4 py-3">
                <div>
                  <p className="text-sm font-semibold text-[#18261E]">{place.name}</p>
                  <p className="text-xs text-[#526158]">{place.missionSummary}</p>
                </div>
                <span className="font-mono-num text-xs font-medium text-[#D97706] whitespace-nowrap shrink-0">
                  Étape {String(place.order).padStart(2, "0")}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
