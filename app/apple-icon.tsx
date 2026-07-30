import { ImageResponse } from 'next/og'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

/** Home-screen icon. Same two elements as the tab icon, with room to breathe. */
export default function AppleIcon() {
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
          fontSize: 96,
          fontWeight: 700,
          letterSpacing: -4,
        }}
      >
        <div style={{ display: 'flex' }}>Z</div>
        <div
          style={{
            width: 84,
            height: 8,
            marginTop: 8,
            background:
              'linear-gradient(90deg, #1C2A24 0%, #0E8A5F 55%, #DEE5E1 100%)',
          }}
        />
      </div>
    ),
    size
  )
}
