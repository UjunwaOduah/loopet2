// Hand-drawn style SVG illustrations for Loopet

import logoSmall from '../../assets/logo-small.png';

export function PawPrintIllustration({ className = "w-16 h-16" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="50" cy="65" rx="22" ry="18" fill="#f6511d" opacity="0.9" transform="rotate(-5 50 65)"/>
      <ellipse cx="25" cy="40" rx="9" ry="12" fill="#f6511d" opacity="0.9" transform="rotate(-20 25 40)"/>
      <ellipse cx="43" cy="32" rx="9" ry="12" fill="#f6511d" opacity="0.9" transform="rotate(-5 43 32)"/>
      <ellipse cx="62" cy="32" rx="9" ry="12" fill="#f6511d" opacity="0.9" transform="rotate(5 62 32)"/>
      <ellipse cx="78" cy="40" rx="9" ry="12" fill="#f6511d" opacity="0.9" transform="rotate(20 78 40)"/>
      <ellipse cx="50" cy="65" rx="22" ry="18" stroke="#090c02" strokeWidth="2.5" strokeLinecap="round" fill="none" transform="rotate(-5 50 65)" strokeDasharray="1 0"/>
    </svg>
  );
}

export function DogIllustration({ className = "w-32 h-32" }: { className?: string }) {
  return (
    null
  );
}

export function CatIllustration({ className = "w-32 h-32" }: { className?: string }) {
  return (
    null
  );
}

export function HeartIllustration({ className = "w-12 h-12", color = "#f6511d" }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 60 60" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M30 50 C15 38 5 28 5 18 C5 10 12 4 20 6 C24 7 28 10 30 14 C32 10 36 7 40 6 C48 4 55 10 55 18 C55 28 45 38 30 50Z" fill={color} opacity="0.9"/>
      <path d="M30 50 C15 38 5 28 5 18 C5 10 12 4 20 6 C24 7 28 10 30 14 C32 10 36 7 40 6 C48 4 55 10 55 18 C55 28 45 38 30 50Z" stroke="#090c02" strokeWidth="2" fill="none"/>
    </svg>
  );
}

export function StarIllustration({ className = "w-8 h-8", color = "#23967F" }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} fill={color} xmlns="http://www.w3.org/2000/svg">
      <path d="M20 3 L24 14 L36 14 L27 21 L30 33 L20 26 L10 33 L13 21 L4 14 L16 14 Z"/>
    </svg>
  );
}

export function WaveDecoration({ className = "w-full" }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 40" className={className} preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 20 Q50 0 100 20 Q150 40 200 20 Q250 0 300 20 Q350 40 400 20 L400 40 L0 40 Z" fill="#23967F" opacity="0.3"/>
    </svg>
  );
}

export function ShelterIllustration({ className = "w-40 h-40" }: { className?: string }) {
  return (
    <svg viewBox="0 0 160 160" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Building */}
      <rect x="20" y="70" width="120" height="80" rx="4" fill="#135346" opacity="0.9"/>
      {/* Roof */}
      <polygon points="10,70 80,20 150,70" fill="#090c02"/>
      {/* Door */}
      <rect x="60" y="110" width="40" height="40" rx="4" fill="#23967F"/>
      <circle cx="94" cy="132" r="3" fill="#090c02"/>
      {/* Windows */}
      <rect x="28" y="82" width="28" height="24" rx="4" fill="#ffd5c2"/>
      <rect x="104" y="82" width="28" height="24" rx="4" fill="#ffd5c2"/>
      {/* Paw on sign */}
      <rect x="60" y="40" width="40" height="22" rx="4" fill="white"/>
      <circle cx="80" cy="49" r="3" fill="#f6511d"/>
      <circle cx="72" cy="45" r="2.5" fill="#f6511d"/>
      <circle cx="88" cy="45" r="2.5" fill="#f6511d"/>
      <circle cx="68" cy="48" r="2.5" fill="#f6511d"/>
    </svg>
  );
}

export function NfcIllustration({ className = "w-20 h-20" }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 80" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="40" cy="40" r="38" fill="#23967F" opacity="0.2"/>
      <circle cx="40" cy="40" r="28" fill="#23967F" opacity="0.3"/>
      <circle cx="40" cy="40" r="18" fill="#23967F" opacity="0.5"/>
      <circle cx="40" cy="40" r="10" fill="#23967f"/>
      <path d="M33 40 L37 36 L37 44 L43 40" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function MatchRing({ score, size = 80 }: { score: number; size?: number }) {
  const r = (size / 2) - 8;
  const circumference = 2 * Math.PI * r;
  const dash = (score / 100) * circumference;
  const color = score >= 90 ? '#23967F' : score >= 75 ? '#135346' : score >= 60 ? '#F6511D' : '#53584A';

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="absolute">
        <circle cx={size/2} cy={size/2} r={r} stroke="#e8e8e4" strokeWidth="6" fill="none"/>
        <circle
          cx={size/2} cy={size/2} r={r}
          stroke={color} strokeWidth="6" fill="none"
          strokeDasharray={`${dash} ${circumference}`}
          strokeLinecap="round"
          transform={`rotate(-90 ${size/2} ${size/2})`}
          className="transition-all duration-700"
        />
      </svg>
      <span className="relative z-10 text-xs font-bold" style={{ color }}>{score}%</span>
    </div>
  );
}

export function LogoMark({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <img src={logoSmall} alt="Loopet logo" className={className} />
  );
}
