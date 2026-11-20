import { CheckCircle2, Gem, Lock, QrCode, Star, Store } from "lucide-react";
import { ADVENTURE_STOPS, PARTNER_SHOPS } from "../data/pontDeSalarsData";
import type { FamilySession } from "../types/game";

interface TreasuresViewProps {
  session: FamilySession | null;
  onGoToMap: () => void;
}

export function TreasuresView({ session, onGoToMap }: TreasuresViewProps) {
  const completedMap = session?.completedStops ?? {};
  const foundCount = Object.keys(completedMap).length;

  return (
    <div className="mx-auto max-w-7xl px-4 pt-6 pb-24 sm:px-6 lg:px-8 lg:pb-16">
      <div className="flex flex-col justify-between gap-4 border-b border-[#18261E]/10 pb-6 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-semibold text-[#1D6B4A]">
            Collection du village · {foundCount} / {ADVENTURE_STOPS.length} trésors découverts
          </p>
          <h1 className="font-display mt-1 text-3xl font-bold text-[#18261E]">
            Coffre aux trésors & badges
          </h1>
          <p className="mt-1.5 max-w-2xl text-sm text-[#526158]">
            Chaque étape réussie à Pont-de-Salars dévoile un trésor du Lévézou, son histoire locale
            et un badge familial.
          </p>
        </div>

        <button
          type="button"
          onClick={onGoToMap}
          className="inline-flex min-h-[44px] cursor-pointer items-center justify-center rounded-xl bg-[#1D6B4A] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#16553A] whitespace-nowrap shrink-0"
        >
          Retour à la carte
        </button>
      </div>

      <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {ADVENTURE_STOPS.map((stop) => {
          const record = completedMap[stop.id];
          return (
            <article
              key={stop.id}
              className={`rounded-2xl border p-5 transition-colors ${
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

              <div className="mt-3 flex items-start gap-3">
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                    record ? "bg-[#F1F7F4] text-[#1D6B4A]" : "bg-white text-[#526158]/60"
                  }`}
                >
                  {record ? <Gem className="h-5 w-5" /> : <Lock className="h-4 w-4" />}
                </div>
                <div>
                  <h2 className="font-display text-lg font-bold text-[#18261E]">
                    {record ? stop.treasureName : "Trésor encore caché"}
                  </h2>
                  <p className="mt-0.5 text-xs font-medium text-[#526158]">{stop.name}</p>
                </div>
              </div>

              {record ? (
                <div className="mt-4 border-t border-[#18261E]/8 pt-3 text-xs leading-relaxed text-[#526158]">
                  <p className="font-semibold text-[#1D6B4A]">
                    <CheckCircle2 className="mr-1 inline h-3.5 w-3.5" />
                    Badge : {stop.badgeTitle}
                  </p>
                  <p className="mt-1.5">{stop.heritageFact}</p>
                </div>
              ) : (
                <p className="mt-4 border-t border-[#18261E]/8 pt-3 text-xs text-[#526158]">
                  Mission à accomplir : {stop.missionSummary}.
                </p>
              )}
            </article>
          );
        })}
      </section>

      <section className="mt-12 rounded-2xl border border-[#18261E]/10 bg-white p-6 sm:p-8">
        <div className="flex items-center gap-2.5">
          <Store className="h-5 w-5 text-[#1D6B4A]" />
          <h2 className="font-display text-2xl font-bold text-[#18261E]">
            Guide des commerçants partenaires
          </h2>
        </div>
        <p className="mt-1.5 max-w-3xl text-sm text-[#526158]">
          Les commerçants volontaires de Pont-de-Salars participent au jeu en affichant un petit
          mot-code dans leur vitrine ou près de la caisse pour offrir des points bonus aux familles.
        </p>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[600px] text-left text-sm">
            <thead>
              <tr className="border-b border-[#18261E]/10 text-xs font-semibold text-[#526158]">
                <th className="py-2.5 pr-4">Étape</th>
                <th className="py-2.5 pr-4">Commerce / Partenaire</th>
                <th className="py-2.5 pr-4">Où chercher sur place</th>
                <th className="py-2.5 text-right">Code vitrine</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#18261E]/8">
              {PARTNER_SHOPS.map((shop) => (
                <tr key={shop.id}>
                  <td className="font-mono-num py-3 pr-4 text-xs font-semibold text-[#1D6B4A]">
                    #{String(shop.order).padStart(2, "0")}
                  </td>
                  <td className="py-3 pr-4 font-semibold text-[#18261E]">{shop.partnerName}</td>
                  <td className="py-3 pr-4 text-xs text-[#526158]">{shop.vitrineHint}</td>
                  <td className="py-3 text-right">
                    <span className="font-mono-num inline-flex items-center gap-1.5 text-xs font-semibold text-[#18261E]">
                      <QrCode className="h-3.5 w-3.5 text-[#1D6B4A]" />
                      {shop.vitrineCode}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
