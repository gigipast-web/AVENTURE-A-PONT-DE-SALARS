import { CheckCircle2, Gem, Lock, QrCode, Star, Store } from "lucide-react";
import { ADVENTURE_STOPS, PARTNER_SHOPS } from "../data/pontDeSalarsData";
import type { FamilySession } from "../types/game";

interface TreasuresViewProps {
  session: FamilySession | null;
  mobileShell: boolean;
  onGoToMap: () => void;
}

export function TreasuresView({ session, mobileShell, onGoToMap }: TreasuresViewProps) {
  const completedMap = session?.completedStops ?? {};
  const foundCount = Object.keys(completedMap).length;

  return (
    <div
      className={`mx-auto px-4 pt-4 pb-8 ${
        mobileShell ? "space-y-6" : "max-w-7xl space-y-8 sm:px-6 sm:pt-6 lg:px-8 lg:pb-14"
      }`}
    >
      <div className="flex flex-col justify-between gap-3 border-b border-[#18261E]/10 pb-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-semibold text-[#1D6B4A]">
            {foundCount} / {ADVENTURE_STOPS.length} trésors découverts
          </p>
          <h1 className="font-display mt-0.5 text-2xl font-bold text-[#18261E] sm:text-3xl">
            Coffre aux trésors
          </h1>
        </div>

        <button
          type="button"
          onClick={onGoToMap}
          className="inline-flex min-h-[44px] cursor-pointer items-center justify-center rounded-xl bg-[#1D6B4A] px-4 py-2 text-sm font-semibold text-white hover:bg-[#16553A] whitespace-nowrap"
        >
          Retour à la carte
        </button>
      </div>

      <section className={mobileShell ? "space-y-3" : "grid gap-4 sm:grid-cols-2 lg:grid-cols-3"}>
        {ADVENTURE_STOPS.map((stop) => {
          const record = completedMap[stop.id];
          return (
            <article
              key={stop.id}
              className={`rounded-2xl border p-4 ${
                record
                  ? "border-[#1D6B4A]/25 bg-white"
                  : "border-[#18261E]/10 bg-[#F1F3EE]/60"
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <span className="font-mono-num text-xs font-semibold text-[#526158]">
                  Trésor #{String(stop.order).padStart(2, "0")}
                </span>
                {record ? (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#D97706]">
                    <Star className="h-3.5 w-3.5 fill-current" />
                    <span className="font-mono-num">{record.stars}/3</span>
                  </span>
                ) : (
                  <Lock className="h-4 w-4 text-[#526158]/60" />
                )}
              </div>

              <div className="mt-2.5 flex items-start gap-3">
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                    record ? "bg-[#F1F7F4] text-[#1D6B4A]" : "bg-white text-[#526158]/60"
                  }`}
                >
                  {record ? <Gem className="h-5 w-5" /> : <Lock className="h-4 w-4" />}
                </div>
                <div>
                  <h2 className="font-display text-base font-bold text-[#18261E]">
                    {record ? stop.treasureName : "Trésor encore caché"}
                  </h2>
                  <p className="text-xs text-[#526158]">{stop.name}</p>
                </div>
              </div>

              {record ? (
                <div className="mt-3 border-t border-[#18261E]/8 pt-2.5 text-xs leading-relaxed text-[#526158]">
                  <p className="font-semibold text-[#1D6B4A]">
                    <CheckCircle2 className="mr-1 inline h-3.5 w-3.5" />
                    Badge : {stop.badgeTitle}
                  </p>
                  <p className="mt-1">{stop.heritageFact}</p>
                </div>
              ) : (
                <p className="mt-3 border-t border-[#18261E]/8 pt-2.5 text-xs text-[#526158]">
                  {stop.missionSummary}
                </p>
              )}
            </article>
          );
        })}
      </section>

      <section className="rounded-2xl border border-[#18261E]/10 bg-white p-4 sm:p-6">
        <div className="flex items-center gap-2">
          <Store className="h-5 w-5 text-[#1D6B4A]" />
          <h2 className="font-display text-xl font-bold text-[#18261E]">
            Codes vitrines commerçants
          </h2>
        </div>
        <p className="mt-1 text-xs leading-relaxed text-[#526158]">
          Les commerçants partenaires affichent un mot-code en vitrine pour offrir un bonus aux
          familles sur place.
        </p>

        <div className="mt-4 divide-y divide-[#18261E]/8">
          {PARTNER_SHOPS.map((shop) => (
            <div key={shop.id} className="flex items-start justify-between gap-3 py-3">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-[#18261E]">{shop.partnerName}</p>
                <p className="mt-0.5 text-xs text-[#526158]">{shop.vitrineHint}</p>
              </div>
              <span className="font-mono-num inline-flex shrink-0 items-center gap-1 rounded-lg bg-[#F1F7F4] px-2.5 py-1 text-xs font-semibold text-[#1D6B4A]">
                <QrCode className="h-3.5 w-3.5" />
                {shop.vitrineCode}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
