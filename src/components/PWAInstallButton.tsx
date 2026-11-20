import { useEffect, useState } from "react";
import {
  Check,
  Copy,
  Download,
  ExternalLink,
  Share2,
  WifiOff,
  X,
} from "lucide-react";
import { useOnlineStatus } from "../hooks/useOnlineStatus";
import { usePWAInstall } from "../hooks/usePWAInstall";

export function PWAInstallButton() {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showGuide, setShowGuide] = useState(false);
  const [inIframe, setInIframe] = useState(false);
  const [copied, setCopied] = useState(false);
  const [shareNote, setShareNote] = useState("");

  useEffect(() => {
    try {
      setInIframe(window.self !== window.top);
    } catch {
      setInIframe(true);
    }
  }, []);

  const currentUrl = typeof window !== "undefined" ? window.location.href : "";

  const handleInstallClick = async () => {
    if (isInstallable) {
      const accepted = await install();
      if (accepted) return;
    }
    setShowGuide(true);
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setShareNote("Sélectionnez et copiez l'adresse ci-dessus.");
    }
  };

  const handleNativeShare = async () => {
    if (typeof navigator !== "undefined" && typeof navigator.share === "function") {
      try {
        await navigator.share({
          title: "À l'aventure à Pont-de-Salars !",
          text: "Partons à la chasse aux 10 trésors de Pont-de-Salars en famille !",
          url: currentUrl,
        });
        return;
      } catch {
        // User cancelled or share blocked in iframe -> fallback to copy
      }
    }
    await handleCopyLink();
  };

  return (
    <>
      <div className="flex items-center gap-1.5 shrink-0">
        <button
          type="button"
          onClick={() => void handleNativeShare()}
          aria-label="Partager l'application"
          title="Partager le lien de l'application"
          className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-[#18261E]/14 bg-white text-[#18261E] transition-colors hover:border-[#1D6B4A]"
        >
          {copied ? <Check className="h-4 w-4 text-[#1D6B4A]" /> : <Share2 className="h-4 w-4" />}
        </button>

        {!isInstalled && (
          <button
            type="button"
            onClick={() => void handleInstallClick()}
            aria-label="Installer l'application"
            title="Installer sur votre téléphone"
            className="inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-lg bg-[#1D6B4A] px-2.5 text-xs font-semibold text-white transition-colors hover:bg-[#16553A] whitespace-nowrap shrink-0"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Installer</span>
          </button>
        )}
      </div>

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

            {inIframe && (
              <div className="mt-4 rounded-xl border border-[#D97706]/30 bg-[#FEF9EC] p-3.5 text-xs leading-relaxed text-[#78350F]">
                <p className="font-semibold">Ouvert dans un aperçu intégré</p>
                <p className="mt-1">
                  Les navigateurs bloquent l'installation tant que l'appli est dans un cadre
                  d'aperçu. Ouvrez-la d'abord dans un nouvel onglet sur votre téléphone :
                </p>
                <a
                  href={currentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2.5 inline-flex min-h-[40px] w-full items-center justify-center gap-1.5 rounded-lg bg-[#1D6B4A] px-3 py-2 text-xs font-semibold text-white"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  <span>Ouvrir dans le navigateur</span>
                </a>
              </div>
            )}

            <div className="mt-4 flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={currentUrl}
                aria-label="Lien de l'application"
                className="h-10 flex-1 rounded-lg border border-[#18261E]/14 bg-white px-2.5 text-xs text-[#526158]"
              />
              <button
                type="button"
                onClick={() => void handleCopyLink()}
                className="inline-flex h-10 cursor-pointer items-center gap-1.5 rounded-lg border border-[#18261E]/14 bg-white px-3 text-xs font-semibold text-[#18261E]"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-[#1D6B4A]" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copied ? "Copié" : "Copier"}</span>
              </button>
            </div>

            {shareNote && <p className="mt-1.5 text-xs text-[#526158]">{shareNote}</p>}

            {isIOS ? (
              <ol className="mt-4 space-y-2.5 text-xs leading-relaxed text-[#526158]">
                <li className="flex items-start gap-2.5">
                  <span className="font-mono-num flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#1D6B4A] text-[11px] font-bold text-white">
                    1
                  </span>
                  <span>
                    Ouvrez ce lien dans <strong className="text-[#18261E]">Safari</strong> (sur
                    iPhone/iPad, Chrome ne propose pas l'installation directe).
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="font-mono-num flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#1D6B4A] text-[11px] font-bold text-white">
                    2
                  </span>
                  <span>
                    Touchez <strong className="text-[#18261E]">Partager</strong> en bas de Safari,
                    puis <strong className="text-[#18261E]">Sur l'écran d'accueil</strong>.
                  </span>
                </li>
              </ol>
            ) : (
              <ol className="mt-4 space-y-2.5 text-xs leading-relaxed text-[#526158]">
                <li className="flex items-start gap-2.5">
                  <span className="font-mono-num flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#1D6B4A] text-[11px] font-bold text-white">
                    1
                  </span>
                  <span>
                    Ouvrez ce lien dans <strong className="text-[#18261E]">Chrome</strong> sur
                    Android.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="font-mono-num flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#1D6B4A] text-[11px] font-bold text-white">
                    2
                  </span>
                  <span>
                    Touchez <strong className="text-[#18261E]">Installer</strong> ou le menu{" "}
                    <strong className="text-[#18261E]">⋮ → Ajouter à l'écran d'accueil</strong>.
                  </span>
                </li>
              </ol>
            )}

            <button
              type="button"
              onClick={() => setShowGuide(false)}
              className="mt-5 min-h-[44px] w-full cursor-pointer rounded-xl bg-[#18261E] py-2.5 text-sm font-semibold text-white"
            >
              Fermer
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
