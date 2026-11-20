import { useState } from "react";
import { Download, Share, Smartphone, WifiOff, X } from "lucide-react";
import { useOnlineStatus } from "../hooks/useOnlineStatus";
import { usePWAInstall } from "../hooks/usePWAInstall";

export function PWAInstallButton() {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showGuide, setShowGuide] = useState(false);

  if (isInstalled) return null;

  if (isInstallable) {
    return (
      <button
        type="button"
        onClick={() => void install()}
        aria-label="Installer l'application"
        title="Installer l'application sur l'écran d'accueil"
        className="inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-lg bg-[#1D6B4A] px-2.5 text-xs font-semibold text-white transition-colors hover:bg-[#16553A] whitespace-nowrap shrink-0"
      >
        <Download className="h-3.5 w-3.5" />
        <span>Installer</span>
      </button>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setShowGuide(true)}
        aria-label="Installer sur téléphone"
        title="Ajouter à l'écran d'accueil"
        className="inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-lg border border-[#18261E]/14 bg-white px-2.5 text-xs font-semibold text-[#18261E] transition-colors hover:border-[#1D6B4A] whitespace-nowrap shrink-0"
      >
        <Smartphone className="h-3.5 w-3.5 text-[#1D6B4A]" />
        <span>Appli</span>
      </button>

      {showGuide && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-[#18261E]/55 p-0 backdrop-blur-xs sm:items-center sm:p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Installer l'application mobile"
        >
          <div className="w-full max-w-sm rounded-t-3xl border border-[#18261E]/12 bg-[#FAF9F5] p-6 shadow-2xl sm:rounded-2xl">
            <div className="mx-auto mb-4 h-1.5 w-10 rounded-full bg-[#18261E]/15 sm:hidden" />
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold text-[#1D6B4A]">Application mobile PWA</p>
                <h3 className="font-display mt-0.5 text-xl font-bold text-[#18261E]">
                  Installer sur votre téléphone
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowGuide(false)}
                aria-label="Fermer"
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border border-[#18261E]/12 bg-white text-[#526158]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {isIOS ? (
              <ol className="mt-4 space-y-2.5 text-sm text-[#526158]">
                <li className="flex items-start gap-2.5">
                  <span className="font-mono-num flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#1D6B4A] text-xs font-bold text-white">
                    1
                  </span>
                  <span>
                    Touchez le bouton <strong className="text-[#18261E]">Partager</strong>{" "}
                    <Share className="inline h-3.5 w-3.5 text-[#1D6B4A]" /> dans la barre Safari.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="font-mono-num flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#1D6B4A] text-xs font-bold text-white">
                    2
                  </span>
                  <span>
                    Sélectionnez{" "}
                    <strong className="text-[#18261E]">Sur l'écran d'accueil</strong> pour lancer
                    le jeu en plein écran, même hors ligne.
                  </span>
                </li>
              </ol>
            ) : (
              <ol className="mt-4 space-y-2.5 text-sm text-[#526158]">
                <li className="flex items-start gap-2.5">
                  <span className="font-mono-num flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#1D6B4A] text-xs font-bold text-white">
                    1
                  </span>
                  <span>
                    Ouvrez le menu du navigateur (<strong className="text-[#18261E]">⋮</strong> ou
                    icône d'installation).
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="font-mono-num flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#1D6B4A] text-xs font-bold text-white">
                    2
                  </span>
                  <span>
                    Touchez <strong className="text-[#18261E]">Installer l'application</strong> ou{" "}
                    <strong className="text-[#18261E]">Ajouter à l'écran d'accueil</strong>.
                  </span>
                </li>
              </ol>
            )}

            <button
              type="button"
              onClick={() => setShowGuide(false)}
              className="mt-6 min-h-[44px] w-full cursor-pointer rounded-xl bg-[#1D6B4A] py-2.5 text-sm font-semibold text-white"
            >
              Compris
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export function OfflineIndicator() {
  const isOnline = useOnlineStatus();
  if (isOnline) return null;

  return (
    <div
      role="status"
      className="no-print flex items-center justify-center gap-2 border-b border-[#D97706]/25 bg-[#FEF9EC] px-3 py-1.5 text-xs font-medium text-[#78350F]"
    >
      <WifiOff className="h-3.5 w-3.5 shrink-0" />
      <span>Mode hors ligne · Votre parcours reste sauvegardé</span>
    </div>
  );
}
