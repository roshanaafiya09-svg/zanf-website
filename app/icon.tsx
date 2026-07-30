import { ImageResponse } from 'next/og'

export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

/**
 * Tab icon, generated rather than committed as a binary.
 *
 * A "Z" on carbon with the emission-green rule beneath it — the same two
 * elements as the wordmark, which is as much as reads at 32px. Replace this
 * with the real mark when ZAN-F supplies an SVG logo.
 */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0E1512',
          color: '#F0F6F3',
          fontSize: 22,
          fontWeight: 700,
          letterSpacing: -1,
        }}
      >
        <div style={{ display: 'flex', marginTop: 2 }}>Z</div>
        <div
          style={{
            width: 18,
            height: 3,
            marginTop: 1,
            background: '#0E8A5F',
          }}
        />
      </div>
    ),
    size
  )
}
