export function ChristmasGarlandBanner({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={`pointer-events-none relative w-full overflow-hidden select-none ${
        compact ? "h-8" : "h-12"
      }`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 400 44" preserveAspectRatio="none" className="h-full w-full">
        <path
          d="M0,4 Q50,24 100,8 T200,10 T300,8 T400,6"
          fill="none"
          stroke="#14532D"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <path
          d="M0,6 Q50,26 100,10 T200,12 T300,10 T400,8"
          fill="none"
          stroke="#166534"
          strokeWidth="2.5"
          strokeDasharray="6 5"
          strokeLinecap="round"
        />
        <path
          d="M0,8 Q50,28 100,12 T200,14 T300,12 T400,10"
          fill="none"
          stroke="#D97706"
          strokeWidth="1"
          strokeOpacity="0.6"
        />

        <circle cx="34" cy="18" r="5" fill="#B91C1C" />
        <circle cx="32.5" cy="16.5" r="1.4" fill="#FCA5A5" />

        <circle cx="84" cy="16" r="4.5" fill="#D97706" />
        <circle cx="82.8" cy="14.6" r="1.3" fill="#FEF3C7" />

        <polygon
          points="146,11 148.5,16.5 154.5,17 150,21 151.3,27 146,24 140.7,27 142,21 137.5,17 143.5,16.5"
          fill="#F59E0B"
        />

        <circle cx="204" cy="18" r="5.2" fill="#B91C1C" />
        <circle cx="202.5" cy="16.4" r="1.5" fill="#FCA5A5" />

        <circle cx="258" cy="16" r="4.2" fill="#F59E0B" />
        <circle cx="257" cy="14.8" r="1.2" fill="#FEF3C7" />

        <polygon
          points="312,10 314.2,15 319.8,15.5 315.6,19.2 316.8,24.8 312,22 307.2,24.8 308.4,19.2 304.2,15.5 309.8,15"
          fill="#F59E0B"
        />

        <circle cx="366" cy="17" r="5" fill="#B91C1C" />
        <circle cx="364.5" cy="15.5" r="1.4" fill="#FCA5A5" />
      </svg>
    </div>
  );
}

const LIGHT_BULBS = [
  { x: 24, y: 15, color: "#DC2626", glow: "#FECACA", delay: "0s" },
  { x: 64, y: 20, color: "#F59E0B", glow: "#FEF3C7", delay: "0.4s" },
  { x: 104, y: 14, color: "#15803D", glow: "#BBF7D0", delay: "0.8s" },
  { x: 146, y: 20, color: "#DC2626", glow: "#FECACA", delay: "1.2s" },
  { x: 188, y: 14, color: "#F59E0B", glow: "#FEF3C7", delay: "0.2s" },
  { x: 230, y: 20, color: "#15803D", glow: "#BBF7D0", delay: "0.9s" },
  { x: 272, y: 15, color: "#DC2626", glow: "#FECACA", delay: "1.5s" },
  { x: 314, y: 20, color: "#F59E0B", glow: "#FEF3C7", delay: "0.6s" },
  { x: 356, y: 15, color: "#15803D", glow: "#BBF7D0", delay: "1.1s" },
  { x: 388, y: 18, color: "#DC2626", glow: "#FECACA", delay: "0.3s" },
];

export function ChristmasLightsGarland() {
  return (
    <div className="pointer-events-none w-full overflow-hidden select-none" aria-hidden="true">
      <svg viewBox="0 0 400 32" preserveAspectRatio="none" className="h-8 w-full">
        <path
          d="M0,4 Q44,22 88,6 T176,8 T264,6 T352,8 T400,5"
          fill="none"
          stroke="#14532D"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        {LIGHT_BULBS.map((bulb, i) => (
          <g
            key={i}
            className="animate-twinkle"
            style={{ animationDelay: bulb.delay }}
          >
            <rect x={bulb.x - 2} y={bulb.y - 7} width="4" height="4" rx="1" fill="#334155" />
            <circle cx={bulb.x} cy={bulb.y} r="7" fill={bulb.glow} fillOpacity="0.55" />
            <ellipse cx={bulb.x} cy={bulb.y + 0.5} rx="4" ry="5" fill={bulb.color} />
          </g>
        ))}
      </svg>
    </div>
  );
}

export function ChristmasHangingOrnaments() {
  return (
    <div
      className="pointer-events-none flex items-start justify-between px-4 select-none"
      aria-hidden="true"
    >
      <svg viewBox="0 0 80 54" className="h-12 w-20">
        <line x1="18" y1="0" x2="18" y2="20" stroke="#D97706" strokeWidth="1.5" />
        <rect x="14" y="18" width="8" height="4" rx="1" fill="#D97706" />
        <circle cx="18" cy="34" r="12" fill="#B91C1C" />
        <path d="M10,32 Q18,38 26,32" fill="none" stroke="#FEF3C7" strokeWidth="1.5" />
        <circle cx="14" cy="29" r="2.2" fill="#FCA5A5" />

        <line x1="52" y1="0" x2="52" y2="12" stroke="#14532D" strokeWidth="1.4" />
        <polygon
          points="52,11 54.8,18.5 62.8,19 56.6,23.8 58.6,31.5 52,27 45.4,31.5 47.4,23.8 41.2,19 49.2,18.5"
          fill="#F59E0B"
        />
      </svg>

      <svg viewBox="0 0 80 54" className="h-12 w-20">
        <line x1="28" y1="0" x2="28" y2="14" stroke="#14532D" strokeWidth="1.4" />
        <rect x="24.5" y="13" width="7" height="3.5" rx="1" fill="#D97706" />
        <circle cx="28" cy="27" r="10.5" fill="#14532D" />
        <circle cx="25" cy="23" r="2" fill="#86EFAC" />

        <line x1="60" y1="0" x2="60" y2="22" stroke="#D97706" strokeWidth="1.5" />
        <rect x="56" y="20" width="8" height="4" rx="1" fill="#D97706" />
        <circle cx="60" cy="36" r="12" fill="#D97706" />
        <path d="M51,36 L69,36" stroke="#FEF3C7" strokeWidth="1.8" />
        <circle cx="56" cy="31" r="2.2" fill="#FEF3C7" />
      </svg>
    </div>
  );
}

export function HollyCorner({ position = "left" }: { position?: "left" | "right" }) {
  return (
    <svg
      viewBox="0 0 48 48"
      aria-hidden="true"
      className={`pointer-events-none h-10 w-10 select-none ${
        position === "right" ? "-scale-x-100" : ""
      }`}
    >
      <path
        d="M6,26 Q14,14 26,18 Q20,28 6,26 Z"
        fill="#15803D"
        stroke="#14532D"
        strokeWidth="1.2"
      />
      <path
        d="M16,8 Q28,12 24,24 Q14,20 16,8 Z"
        fill="#166534"
        stroke="#14532D"
        strokeWidth="1.2"
      />
      <circle cx="15" cy="23" r="3.4" fill="#DC2626" />
      <circle cx="21" cy="26" r="3.2" fill="#B91C1C" />
      <circle cx="20" cy="19" r="3" fill="#EF4444" />
      <circle cx="14" cy="22" r="1" fill="#FECACA" />
    </svg>
  );
}

const SNOWFLAKES = [
  { left: "8%", delay: "0s", duration: "5.2s", size: 5 },
  { left: "19%", delay: "1.4s", duration: "6.1s", size: 4 },
  { left: "31%", delay: "0.7s", duration: "4.8s", size: 6 },
  { left: "44%", delay: "2.1s", duration: "5.8s", size: 4 },
  { left: "58%", delay: "0.3s", duration: "6.4s", size: 5 },
  { left: "71%", delay: "1.8s", duration: "5.0s", size: 6 },
  { left: "83%", delay: "1.1s", duration: "5.6s", size: 4 },
  { left: "92%", delay: "2.6s", duration: "4.9s", size: 5 },
];

export function ChristmasSnowfall() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {SNOWFLAKES.map((flake, idx) => (
        <span
          key={idx}
          className="animate-snowfall absolute -top-2 rounded-full bg-white/85"
          style={{
            left: flake.left,
            width: `${flake.size}px`,
            height: `${flake.size}px`,
            animationDelay: flake.delay,
            animationDuration: flake.duration,
          }}
        />
      ))}
    </div>
  );
}

const PAGE_FLAKES = [
  { left: "6%", delay: "0s", duration: "9.5s", size: 12 },
  { left: "16%", delay: "2.2s", duration: "11s", size: 10 },
  { left: "28%", delay: "4.1s", duration: "10.2s", size: 13 },
  { left: "42%", delay: "1.3s", duration: "12s", size: 11 },
  { left: "56%", delay: "3.5s", duration: "9.8s", size: 12 },
  { left: "69%", delay: "0.8s", duration: "11.5s", size: 10 },
  { left: "82%", delay: "2.8s", duration: "10.6s", size: 13 },
  { left: "93%", delay: "4.9s", duration: "9.2s", size: 11 },
];

export function ChristmasPageSnowfall() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {PAGE_FLAKES.map((flake, idx) => (
        <svg
          key={idx}
          viewBox="0 0 24 24"
          className="animate-snowfall-page absolute -top-4 text-[#93C5FD]/70"
          style={{
            left: flake.left,
            width: `${flake.size}px`,
            height: `${flake.size}px`,
            animationDelay: flake.delay,
            animationDuration: flake.duration,
          }}
        >
          <g stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            <line x1="12" y1="2" x2="12" y2="22" />
            <line x1="3.4" y1="7" x2="20.6" y2="17" />
            <line x1="20.6" y1="7" x2="3.4" y2="17" />
          </g>
        </svg>
      ))}
    </div>
  );
}

export function InteractiveChristmasTree({ decoratedCount }: { decoratedCount: number }) {
  const show = (step: number) => decoratedCount >= step;

  return (
    <div className="relative mx-auto flex w-full max-w-[240px] flex-col items-center select-none">
      <svg
        viewBox="0 0 220 240"
        className="h-auto w-full drop-shadow-xs"
        role="img"
        aria-label={`Sapin de Noël décoré avec ${decoratedCount} décorations sur 8`}
      >
        <ellipse cx="110" cy="224" rx="74" ry="10" fill="#E6EFE9" />

        <rect x="97" y="190" width="26" height="32" rx="4" fill="#78350F" />

        <polygon points="110,80 38,194 182,194" fill="#14532D" />
        <polygon points="110,54 48,148 172,148" fill="#166534" />
        <polygon points="110,28 64,104 156,104" fill="#15803D" />

        <path
          d="M72,94 Q110,112 148,92"
          fill="none"
          stroke={show(2) ? "#FBBF24" : "#1D6B4A"}
          strokeWidth="2.5"
          strokeOpacity={show(2) ? 0.9 : 0.35}
          strokeLinecap="round"
        />
        <path
          d="M54,140 Q110,164 166,138"
          fill="none"
          stroke={show(5) ? "#FBBF24" : "#1D6B4A"}
          strokeWidth="2.8"
          strokeOpacity={show(5) ? 0.9 : 0.35}
          strokeLinecap="round"
        />
        <path
          d="M44,182 Q110,206 176,180"
          fill="none"
          stroke={show(8) ? "#FBBF24" : "#1D6B4A"}
          strokeWidth="3"
          strokeOpacity={show(8) ? 0.9 : 0.35}
          strokeLinecap="round"
        />

        {show(1) ? (
          <polygon
            points="110,4 115.5,17 129.5,18 118.8,27.2 122,41 110,33.5 98,41 101.2,27.2 90.5,18 104.5,17"
            fill="#F59E0B"
            stroke="#FEF3C7"
            strokeWidth="1.5"
          />
        ) : (
          <polygon
            points="110,6 114.5,17 126.5,17.8 117.2,25.6 120,37.4 110,31 100,37.4 102.8,25.6 93.5,17.8 105.5,17"
            fill="none"
            stroke="#94A3B8"
            strokeWidth="1.4"
            strokeDasharray="3 2"
          />
        )}

        {show(2) && (
          <g>
            <circle cx="94" cy="82" r="8" fill="#DC2626" />
            <circle cx="91.5" cy="79.5" r="2.2" fill="#FECACA" />
          </g>
        )}

        {show(3) && (
          <g>
            <path
              d="M128,96 L128,79 A5,5 0 0 1 138,79"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="4.5"
              strokeLinecap="round"
            />
            <path
              d="M128,96 L128,79 A5,5 0 0 1 138,79"
              fill="none"
              stroke="#DC2626"
              strokeWidth="4.5"
              strokeDasharray="3 3"
              strokeLinecap="round"
            />
          </g>
        )}

        {show(4) && (
          <g>
            <path
              d="M78,120 L70,136 L86,136 Z"
              fill="#F59E0B"
              stroke="#FEF3C7"
              strokeWidth="1"
            />
            <circle cx="78" cy="138" r="2.5" fill="#B45309" />
          </g>
        )}

        {show(5) && (
          <g stroke="#E0F2FE" strokeWidth="2.2" strokeLinecap="round">
            <line x1="112" y1="114" x2="112" y2="132" />
            <line x1="104" y1="118.5" x2="120" y2="127.5" />
            <line x1="120" y1="118.5" x2="104" y2="127.5" />
          </g>
        )}

        {show(6) && (
          <g>
            <rect x="136" y="122" width="14" height="18" rx="4" fill="#B91C1C" />
            <rect x="135" y="120" width="16" height="5" rx="2" fill="#FAF9F5" />
          </g>
        )}

        {show(7) && (
          <g>
            <circle cx="72" cy="172" r="9.5" fill="#F59E0B" />
            <circle cx="69" cy="169" r="2.5" fill="#FEF3C7" />
            <circle cx="144" cy="170" r="8.5" fill="#DC2626" />
            <circle cx="141.5" cy="167.5" r="2.2" fill="#FECACA" />
          </g>
        )}

        {show(8) && (
          <g>
            <rect x="52" y="198" width="30" height="24" rx="3" fill="#B91C1C" />
            <rect x="64" y="198" width="6" height="24" fill="#FBBF24" />
            <rect x="52" y="207" width="30" height="5" fill="#FBBF24" />

            <rect x="138" y="200" width="28" height="22" rx="3" fill="#1D6B4A" />
            <rect x="149" y="200" width="6" height="22" fill="#FEF3C7" />
            <rect x="138" y="208" width="28" height="5" fill="#FEF3C7" />
          </g>
        )}
      </svg>
    </div>
  );
}
