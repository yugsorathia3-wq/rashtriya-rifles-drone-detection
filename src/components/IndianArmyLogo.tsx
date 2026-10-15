import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
}

export const IndianArmyLogo: React.FC<LogoProps> = ({ 
  className = '', 
  size = 'md',
  showSubtitle = true 
}) => {
  const sizeMap = {
    sm: { w: 'w-10 h-10', text: 'text-xs', title: 'text-sm' },
    md: { w: 'w-16 h-16', text: 'text-xs', title: 'text-lg' },
    lg: { w: 'w-24 h-24', text: 'text-sm', title: 'text-2xl' },
  };

  const currentSize = sizeMap[size];

  return (
    <div className={`flex items-center gap-3.5 select-none ${className}`}>
      {/* Official Emblem Graphic */}
      <div className={`relative ${currentSize.w} shrink-0 drop-shadow-[0_0_15px_rgba(234,179,8,0.35)]`}>
        <svg
          viewBox="0 0 200 200"
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Subtle Outer Glow / Ring */}
          <circle cx="100" cy="100" r="95" stroke="#eab308" strokeWidth="2.5" strokeDasharray="6 3" opacity="0.7" />
          <circle cx="100" cy="100" r="89" fill="#141c14" stroke="#854d0e" strokeWidth="2" />
          
          {/* National Tricolor Circular Accent Rings */}
          <path d="M 15 100 A 85 85 0 0 1 100 15" stroke="#FF9933" strokeWidth="4" strokeLinecap="round" opacity="0.85" />
          <path d="M 100 15 A 85 85 0 0 1 185 100" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" opacity="0.85" />
          <path d="M 185 100 A 85 85 0 0 1 100 185" stroke="#138808" strokeWidth="4" strokeLinecap="round" opacity="0.85" />
          <path d="M 100 185 A 85 85 0 0 1 15 100" stroke="#ca8a04" strokeWidth="3" strokeLinecap="round" opacity="0.85" />

          {/* Crossed Swords / Scimitars (Indian Army Tradition) */}
          <g id="crossed-swords" stroke="#facc15" strokeWidth="3" strokeLinecap="round">
            {/* Blade 1 */}
            <path d="M 45 155 Q 90 110 155 45" />
            <path d="M 45 155 Q 70 140 100 100" stroke="#fef08a" strokeWidth="1.5" />
            {/* Guard 1 */}
            <line x1="60" y1="130" x2="40" y2="150" stroke="#ca8a04" strokeWidth="5" />
            <circle cx="38" cy="162" r="5" fill="#eab308" />

            {/* Blade 2 */}
            <path d="M 155 155 Q 110 110 45 45" />
            <path d="M 155 155 Q 130 140 100 100" stroke="#fef08a" strokeWidth="1.5" />
            {/* Guard 2 */}
            <line x1="140" y1="130" x2="160" y2="150" stroke="#ca8a04" strokeWidth="5" />
            <circle cx="162" cy="162" r="5" fill="#eab308" />
          </g>

          {/* Rashtriya Rifles Crossed AK Rifles Behind Crest */}
          <g id="rr-rifles" opacity="0.65" stroke="#94a3b8" strokeWidth="2">
            <line x1="50" y1="145" x2="150" y2="55" />
            <line x1="150" y1="145" x2="50" y2="55" />
          </g>

          {/* Gold Shield Base */}
          <path
            d="M 68 55 Q 100 48 132 55 Q 132 105 100 140 Q 68 105 68 55 Z"
            fill="#7f1d1d"
            stroke="#facc15"
            strokeWidth="3"
            filter="drop-shadow(0 2px 4px rgba(0,0,0,0.8))"
          />

          {/* Ashoka Lion Capital (Emblem of India) Silhouette in Gold */}
          <g id="ashoka-lions" fill="#facc15">
            {/* Central Lion Head */}
            <path d="M 94 62 C 94 56 106 56 106 62 C 108 65 106 72 104 74 L 104 80 L 96 80 L 96 74 C 94 72 92 65 94 62 Z" />
            {/* Left Lion Head */}
            <path d="M 85 66 C 82 62 88 58 92 63 C 94 66 93 72 90 74 L 88 80 L 84 79 L 85 73 Z" />
            {/* Right Lion Head */}
            <path d="M 115 66 C 118 62 112 58 108 63 C 106 66 107 72 110 74 L 112 80 L 116 79 L 115 73 Z" />
            
            {/* Mane & Shoulders */}
            <path d="M 82 80 Q 100 78 118 80 L 115 90 Q 100 93 85 90 Z" fill="#eab308" />
            
            {/* Ashoka Abacus Base with Ashoka Chakra Wheel */}
            <rect x="80" y="91" width="40" height="9" rx="1.5" fill="#ca8a04" stroke="#fef08a" strokeWidth="1" />
            <circle cx="100" cy="95.5" r="3.5" fill="#000080" stroke="#facc15" strokeWidth="0.8" />
            {/* Wheel Spokes */}
            <circle cx="100" cy="95.5" r="1.2" fill="#ffffff" />
          </g>

          {/* Satyameva Jayate / Indian Army Scroll Ribbon */}
          <path
            d="M 50 142 Q 100 135 150 142 L 145 154 Q 100 145 55 154 Z"
            fill="#ca8a04"
            stroke="#fef08a"
            strokeWidth="1.5"
          />
          <text
            x="100"
            y="150"
            textAnchor="middle"
            fill="#0f172a"
            fontSize="7"
            fontWeight="bold"
            letterSpacing="0.5"
            fontFamily="sans-serif"
          >
            सत्यमेव जयते
          </text>

          {/* Rashtriya Rifles Banner Ring Text */}
          <text
            x="100"
            y="35"
            textAnchor="middle"
            fill="#facc15"
            fontSize="9"
            fontWeight="900"
            letterSpacing="2.5"
            fontFamily="'Chakra Petch', sans-serif"
          >
            INDIAN ARMY
          </text>

          <text
            x="100"
            y="178"
            textAnchor="middle"
            fill="#e2e8f0"
            fontSize="8"
            fontWeight="700"
            letterSpacing="1.5"
            fontFamily="'Chakra Petch', sans-serif"
          >
            RASHTRIYA RIFLES
          </text>

          {/* Stars */}
          <polygon points="38,98 40,103 45,103 41,106 43,111 38,108 34,111 35,106 31,103 37,103" fill="#facc15" />
          <polygon points="162,98 164,103 169,103 165,106 167,111 162,108 158,111 159,106 155,103 161,103" fill="#facc15" />
        </svg>

        {/* Small live pulse beacon */}
        <span className="absolute bottom-0 right-0 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border border-black"></span>
        </span>
      </div>

      {/* Typography & Regimental Title */}
      {showSubtitle && (
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="px-1.5 py-0.5 rounded text-[10px] font-bold tracking-widest bg-amber-500/20 text-amber-300 border border-amber-500/40">
              HQ NORTHERN COMMAND
            </span>
            <span className="text-[11px] text-emerald-400 font-mono tracking-wider">
              15 & 16 CORPS
            </span>
          </div>
          <h1 className={`font-military font-bold tracking-wider text-white uppercase flex items-baseline gap-2 ${currentSize.title}`}>
            <span>भारतीय सेना</span>
            <span className="text-amber-400">|</span>
            <span className="text-yellow-400">RASHTRIYA RIFLES</span>
          </h1>
          <p className="text-[11px] font-mono tracking-wide text-zinc-400 flex items-center gap-2">
            <span className="text-amber-400/90 font-semibold">मोटो: दृढ़ता और वीरता</span>
            <span className="text-zinc-600">•</span>
            <span className="text-emerald-300">PROJECT GARUDA // AUTO DRONE DEFENCE</span>
          </p>
        </div>
      )}
    </div>
  );
};
