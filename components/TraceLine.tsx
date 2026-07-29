/**
 * The signature element.
 *
 * A strip-chart trace of an exhaust line: noisy and violent on the way in,
 * through the device, then flat on the way out. The four small ticks are the
 * sensor taps — two before the unit, two after — which is exactly how a RECD
 * is instrumented in the field (see the labelled cross-section in
 * /public/media/recd-cross-section.jpeg).
 *
 * Pure CSS animation, no JS. The global reduced-motion rule collapses the
 * duration so it renders in its final state.
 */

const DIRTY =
  'M0,44 L16,26 L28,62 L42,20 L55,66 L68,30 L82,58 L95,16 L110,70 L124,34 L138,54 L152,22 L167,64 L180,32 L195,60 L208,18 L223,68 L236,38 L250,52 L264,24 L279,62 L292,34 L307,56 L320,26 L335,64 L348,36 L362,50 L376,30 L390,48 L404,41 L415,44'

const CLEAN =
  'M497,44 L540,43.2 L590,44.8 L645,43.5 L705,44.4 L770,43.7 L845,44.3 L925,44 L1010,44.1 L1100,43.9 L1200,44'

export default function TraceLine({
  className = '',
  delay = 0,
}: {
  className?: string
  delay?: number
}) {
  return (
    <svg
      viewBox="0 0 1200 88"
      preserveAspectRatio="none"
      role="img"
      aria-label="Exhaust trace: turbulent, high-particulate gas entering the device and leaving as a clean, steady flow."
      className={`h-16 w-full md:h-20 ${className}`}
    >
      <path
        d={DIRTY}
        pathLength={1}
        fill="none"
        stroke="var(--soot)"
        strokeWidth={1.25}
        strokeLinejoin="round"
        style={{
          strokeDasharray: 1,
          strokeDashoffset: 1,
          animation: `trace-draw 1.1s cubic-bezier(0.4,0,0.2,1) ${delay}s forwards`,
        }}
      />

      {/* Sensor taps — pressure and temperature, inlet side. */}
      {[424, 436].map((x, i) => (
        <line
          key={x}
          x1={x}
          y1={30}
          x2={x}
          y2={38}
          stroke="var(--accent)"
          strokeWidth={1.25}
          style={{
            opacity: 0,
            animation: `node-settle 0.3s ease-out ${delay + 1 + i * 0.06}s forwards`,
          }}
        />
      ))}

      {/* The device itself. */}
      <rect
        x={422}
        y={38}
        width={68}
        height={12}
        rx={6}
        fill="var(--accent)"
        style={{
          transformOrigin: '456px 44px',
          opacity: 0,
          filter: 'drop-shadow(var(--glow-accent))',
          animation: `node-settle 0.45s cubic-bezier(0.16,1,0.3,1) ${delay + 1.05}s forwards`,
        }}
      />

      {/* Sensor taps, outlet side. */}
      {[476, 488].map((x, i) => (
        <line
          key={x}
          x1={x}
          y1={50}
          x2={x}
          y2={58}
          stroke="var(--accent)"
          strokeWidth={1.25}
          style={{
            opacity: 0,
            animation: `node-settle 0.3s ease-out ${delay + 1.2 + i * 0.06}s forwards`,
          }}
        />
      ))}

      <path
        d={CLEAN}
        pathLength={1}
        fill="none"
        stroke="var(--text-hi)"
        strokeWidth={1.25}
        strokeLinejoin="round"
        style={{
          strokeDasharray: 1,
          strokeDashoffset: 1,
          animation: `trace-draw 1.3s cubic-bezier(0.4,0,0.2,1) ${delay + 1.35}s forwards`,
        }}
      />
    </svg>
  )
}
