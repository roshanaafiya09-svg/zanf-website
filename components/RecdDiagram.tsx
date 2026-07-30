/**
 * The RECD cross-section, drawn rather than photographed.
 *
 * A photo of a diagram does not scale, cannot be read at 360px and is invisible
 * to search. This is vector, its labels are text, and the one thing it is
 * asking the viewer to notice — dirty in on the left, clean out on the right —
 * is carried by the same carbon → emission → air gradient used everywhere else.
 */
export default function RecdDiagram() {
  return (
    <figure className="rounded-[8px] border border-steel-200 bg-white p-4 sm:p-6">
      <svg
        viewBox="0 0 960 250"
        role="img"
        aria-labelledby="recd-diagram-title recd-diagram-desc"
        className="h-auto w-full"
      >
        <title id="recd-diagram-title">
          Cross-section of a Retrofit Emission Control Device
        </title>
        <desc id="recd-diagram-desc">
          Untreated exhaust enters from the left through a diffuser, passes
          through the Fuel Oxidation Catalyst which converts carbon monoxide and
          hydrocarbons, then through the Catalytic Soot Trap which captures
          particulate matter, and leaves through the outlet chamber on the right
          as treated gas. Pressure and temperature sensor taps sit on both the
          inlet and the outlet side.
        </desc>

        <defs>
          {/* The signature gradient, applied to the device body. */}
          <linearGradient id="recd-flow" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#1C2A24" />
            <stop offset="38%" stopColor="#0E8A5F" />
            <stop offset="72%" stopColor="#35C08C" />
            <stop offset="100%" stopColor="#DEE5E1" />
          </linearGradient>

          {/* FOC: axial channels. CST: trap cells. */}
          <pattern
            id="recd-foc"
            width="12"
            height="12"
            patternUnits="userSpaceOnUse"
          >
            <rect width="12" height="12" fill="#F6FAF8" />
            <path d="M6 0V12" stroke="#0E8A5F" strokeWidth="1.6" opacity="0.55" />
          </pattern>
          <pattern
            id="recd-cst"
            width="14"
            height="14"
            patternUnits="userSpaceOnUse"
          >
            <rect width="14" height="14" fill="#F6FAF8" />
            <circle cx="7" cy="7" r="3.2" fill="none" stroke="#0E8A5F" strokeWidth="1.4" opacity="0.6" />
          </pattern>
        </defs>

        {/* Inlet pipe */}
        <rect x="0" y="98" width="150" height="54" fill="#EEF3F0" stroke="#DEE5E1" />
        <rect x="144" y="86" width="12" height="78" fill="#DEE5E1" />

        {/* Soot on the way in */}
        <g fill="#1C2A24">
          <circle cx="24" cy="116" r="3.4" />
          <circle cx="52" cy="136" r="2.6" />
          <circle cx="78" cy="112" r="3" />
          <circle cx="104" cy="132" r="2.2" />
          <circle cx="126" cy="120" r="3.2" />
          <circle cx="40" cy="126" r="1.8" opacity="0.7" />
          <circle cx="92" cy="140" r="1.6" opacity="0.7" />
        </g>

        {/* Device body */}
        <rect
          x="164"
          y="44"
          width="632"
          height="162"
          rx="10"
          fill="#FFFFFF"
          stroke="#DEE5E1"
          strokeWidth="2"
        />
        {/* The gradient reads as a base rail under the device */}
        <rect x="164" y="200" width="632" height="6" rx="3" fill="url(#recd-flow)" />

        {/* Diffuser */}
        <path
          d="M176 108 L262 62 L262 188 L176 142 Z"
          fill="#EEF3F0"
          stroke="#DEE5E1"
          strokeWidth="1.5"
        />

        {/* FOC */}
        <rect x="286" y="62" width="164" height="126" rx="4" fill="url(#recd-foc)" stroke="#0E8A5F" strokeWidth="1.5" />
        <text x="368" y="132" textAnchor="middle" fill="#0A6B4A" fontFamily="var(--font-plex-mono, monospace)" fontSize="19" letterSpacing="1">
          FOC
        </text>

        {/* CST */}
        <rect x="486" y="62" width="180" height="126" rx="4" fill="url(#recd-cst)" stroke="#0E8A5F" strokeWidth="1.5" />
        <text x="576" y="132" textAnchor="middle" fill="#0A6B4A" fontFamily="var(--font-plex-mono, monospace)" fontSize="19" letterSpacing="1">
          CST
        </text>

        {/* Outlet chamber */}
        <path
          d="M690 62 L784 108 L784 142 L690 188 Z"
          fill="#EEF3F0"
          stroke="#DEE5E1"
          strokeWidth="1.5"
        />

        {/* Outlet pipe */}
        <rect x="804" y="98" width="156" height="54" fill="#EEF3F0" stroke="#DEE5E1" />
        <rect x="798" y="86" width="12" height="78" fill="#DEE5E1" />

        {/* Treated gas out */}
        <g stroke="#35C08C" strokeWidth="2.5" strokeLinecap="round">
          <path d="M828 116H872" />
          <path d="M842 134H896" />
          <path d="M864 116H920" />
        </g>

        {/* Sensor taps — two before the unit, two after, as installed */}
        <g stroke="#1C2A24" strokeWidth="2">
          <path d="M120 98V70" />
          <path d="M860 98V70" />
        </g>
        <g fill="#10201A" fontFamily="var(--font-plex-mono, monospace)" fontSize="13">
          <text x="112" y="60" textAnchor="middle">ΔP · T</text>
          <text x="852" y="60" textAnchor="middle">ΔP · T</text>
        </g>

        {/* Flow labels */}
        <g fontFamily="var(--font-plex-mono, monospace)" fontSize="13" letterSpacing="0.8">
          <text x="4" y="182" fill="#46564F">UNTREATED</text>
          <text x="956" y="182" textAnchor="end" fill="#0A6B4A">TREATED</text>
        </g>
      </svg>

      <figcaption className="mono mt-4 text-[0.6875rem] uppercase tracking-[0.12em] text-ink-400">
        Diffuser · FOC · CST · outlet chamber, with pressure and temperature taps
        either side
      </figcaption>
    </figure>
  )
}
