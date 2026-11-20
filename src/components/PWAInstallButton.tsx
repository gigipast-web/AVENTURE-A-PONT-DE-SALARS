import { useEffect, useState } from "react";
import {
  Check,
  Copy,
  Download,
  ExternalLink,
  Share,
  Share2,
  WifiOff,
  X,
} from "lucide-react";
import { useOnlineStatus } from "../hooks/useOnlineStatus";
import { usePWAInstall } from "../hooks/usePWAInstall";

function copyTextFallback(text: string): boolean {
  try {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    textarea.setSelectionRange(0, text.length);
    const ok = document.execCommand("copy");
    document.body.removeChild(textarea);
    return ok;
  } catch {
    return false;
  }
}

export function PWAInstallButton() {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showGuide, setShowGuide] = useState(false);
  const [inIframe, setInIframe] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try {
      setInIframe(window.self !== window.top);
    } catch {
      setInIframe(true);
    }
  }, []);

  const currentUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareUrl =
    typeof window !== "undefined" && window.location.hostname.startsWith("ais-dev-")
      ? "https://ais-pre-6hyg67lbu23xgm4yqi3sfw-665307952988.europe-west2.run.app/"
      : currentUrl;
  const [copiedPost, setCopiedPost] = useState(false);

  const handleInstallClick = async () => {
    if (isInstallable) {
      const accepted = await install();
      if (accepted) return;
    }
    setShowGuide(true);
  };

  const handleCopyText = async (text: string, onDone: () => void) => {
    let ok = false;
    try {
      if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
        await navigator.clipboard.writeText(text);
        ok = true;
      }
    } catch {
      ok = false;
    }
    if (!ok) {
      ok = copyTextFallback(text);
    }
    if (ok) {
      onDone();
    }
  };

  const handleCopyLink = async () => {
    await handleCopyText(shareUrl, () => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    });
  };

  const handleCopyFacebookPost = async () => {
    const postText = `À l'aventure à Pont-de-Salars ! (Création de L'Escapade de Jos)\n\nPartez en famille à la recherche des 10 trésors du village : commerces partenaires, artisans, pont sur le Viaur, chapelle de Salars, lac et plage des Rousselleries !\n\nJouer ici : ${shareUrl}`;
    await handleCopyText(postText, () => {
      setCopiedPost(true);
      setTimeout(() => setCopiedPost(false), 2500);
    });
  };

  const handleNativeShare = async () => {
    if (typeof navigator !== "undefined" && typeof navigator.share === "function" && !inIframe) {
      try {
        await navigator.share({
          title: "À l'aventure à Pont-de-Salars !",
          text: "Partons à la chasse aux 10 trésors de Pont-de-Salars en famille !",
          url: shareUrl,
        });
        return;
      } catch {
        // Cancelled or blocked -> open guide with copy button
      }
    }
    await handleCopyLink();
    setShowGuide(true);
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
          <div className="max-h-[85vh] w-full max-w-sm overflow-y-auto rounded-t-3xl border border-[#18261E]/12 bg-[#FAF9F5] p-6 shadow-2xl sm:rounded-2xl">
            <div className="mx-auto mb-4 h-1.5 w-10 rounded-full bg-[#18261E]/15 sm:hidden" />
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold text-[#1D6B4A]">Application mobile PWA</p>
                <h3 className="font-display mt-0.5 text-xl font-bold text-[#18261E]">
                  {isIOS ? "Installer sur iPhone / iPad" : "Installer sur votre téléphone"}
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
                <p className="font-semibold">Sortir de l'aperçu d'abord</p>
                <p className="mt-1">
                  Sur iPhone, vous devez ouvrir ce lien directement dans{" "}
                  <strong>Safari</strong> (hors aperçu) pour voir l'icône Partager de Safari en
                  bas de l'écran.
                </p>
                <a
                  href={currentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2.5 inline-flex min-h-[42px] w-full items-center justify-center gap-1.5 rounded-lg bg-[#1D6B4A] px-3 py-2 text-xs font-semibold text-white"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  <span>Ouvrir dans un onglet Safari / Chrome</span>
                </a>
              </div>
            )}

            <div className="mt-4 flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={shareUrl}
                onFocus={(e) => e.currentTarget.select()}
                aria-label="Lien web de l'application"
                className="h-11 min-w-0 flex-1 rounded-lg border border-[#18261E]/14 bg-white px-3 text-base text-[#526158] sm:text-xs"
              />
              <button
                type="button"
                onClick={() => void handleCopyLink()}
                className="inline-flex h-11 shrink-0 cursor-pointer items-center gap-1.5 rounded-lg border border-[#18261E]/14 bg-white px-3 text-xs font-semibold text-[#18261E]"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-[#1D6B4A]" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copied ? "Copié !" : "Copier"}</span>
              </button>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => void handleCopyFacebookPost()}
                className="inline-flex min-h-[42px] cursor-pointer items-center justify-center gap-1.5 rounded-lg bg-[#1877F2] px-3 py-2 text-xs font-semibold text-white transition-opacity hover:opacity-90"
              >
                {copiedPost ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copiedPost ? "Texte copié !" : "Post Facebook"}</span>
              </button>
              <a
                href="/og-pont-de-salars.jpg"
                download="pont-de-salars-facebook.jpg"
                className="inline-flex min-h-[42px] items-center justify-center gap-1.5 rounded-lg border border-[#18261E]/14 bg-white px-3 py-2 text-xs font-semibold text-[#18261E] hover:border-[#1D6B4A]"
              >
                <Download className="h-3.5 w-3.5 text-[#1D6B4A]" />
                <span>Image Facebook</span>
              </a>
            </div>

            {isIOS ? (
              <ol className="mt-4 space-y-2.5 text-xs leading-relaxed text-[#526158]">
                <li className="flex items-start gap-2.5">
                  <span className="font-mono-num flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#1D6B4A] text-[11px] font-bold text-white">
                    1
                  </span>
                  <span>
                    Ouvrez le lien ci-dessus dans <strong className="text-[#18261E]">Safari</strong>{" "}
                    (sur iPhone, Chrome ou l'app Google ne proposent pas toujours « Sur l'écran
                    d'accueil »).
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="font-mono-num flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#1D6B4A] text-[11px] font-bold text-white">
                    2
                  </span>
                  <span>
                    Dans la barre tout en bas de Safari, touchez{" "}
                    <strong className="text-[#18261E]">Partager</strong>{" "}
                    <Share className="inline h-3.5 w-3.5 text-[#1D6B4A]" /> puis{" "}
                    <strong className="text-[#18261E]">Sur l'écran d'accueil</strong>.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="font-mono-num flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#1D6B4A] text-[11px] font-bold text-white">
                    3
                  </span>
                  <span>
                    Touchez <strong className="text-[#18261E]">Ajouter</strong> en haut à droite.
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
                    Android (ou <strong className="text-[#18261E]">Safari</strong> sur iPhone).
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="font-mono-num flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#1D6B4A] text-[11px] font-bold text-white">
                    2
                  </span>
                  <span>
                    Touchez <strong className="text-[#18261E]">Installer</strong> ou{" "}
                    <strong className="text-[#18261E]">Ajouter à l'écran d'accueil</strong>.
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
