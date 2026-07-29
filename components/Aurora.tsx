/**
 * Plant-room haze — light bouncing off an enclosure in a dark room, not a
 * neon bloom. A wide, low, desaturated teal wash with a single copper ember
 * where the device would be. Grain over the top keeps it from banding.
 *
 * Never more than one of these per viewport.
 */
export default function Aurora({
  className = '',
  intensity = 'full',
}: {
  className?: string
  intensity?: 'full' | 'soft'
}) {
  const opacity = intensity === 'soft' ? 0.55 : 1

  return (
    <div
      aria-hidden="true"
      className={`grain pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <div
        className="absolute inset-x-[-30%] bottom-[-55%] h-[125%]"
        style={{
          opacity,
          background:
            'radial-gradient(ellipse 60% 50% at 50% 50%, var(--haze), transparent 70%)',
        }}
      />
      {/* Brighter inner core — this is what makes the wash read as radiant
          rather than as flat fog. */}
      <div
        className="absolute inset-x-[-8%] bottom-[-32%] h-[72%]"
        style={{
          opacity,
          background:
            'radial-gradient(ellipse 45% 50% at 50% 50%, var(--haze-core), transparent 68%)',
        }}
      />
      <div
        className="absolute bottom-[-10%] left-[8%] h-[55%] w-[36%]"
        style={{
          opacity,
          background:
            'radial-gradient(ellipse 50% 50% at 50% 50%, var(--ember), transparent 72%)',
        }}
      />
      <div
        className="absolute inset-x-0 top-0 h-[42%]"
        style={{
          background: 'linear-gradient(180deg, var(--canvas), transparent)',
        }}
      />
    </div>
  )
}
