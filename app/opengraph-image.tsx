import { ImageResponse } from 'next/og'

export const alt =
  'ZAN-F — authorized Platino RECD dealer and turnkey SITC partner'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

/**
 * Link preview card. Carbon, the wordmark, the positioning line, and the
 * Clean-Air Gradient Rule — the same three elements as the hero, so a shared
 * link is recognisably the same site.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#0E1512',
          padding: 72,
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              fontSize: 20,
              letterSpacing: 4,
              textTransform: 'uppercase',
              color: '#35C08C',
            }}
          >
            // Authorized Platino RECD dealer &amp; turnkey SITC partner
          </div>
          <div
            style={{
              marginTop: 36,
              fontSize: 76,
              lineHeight: 1.05,
              letterSpacing: -2,
              color: '#F0F6F3',
              maxWidth: 900,
            }}
          >
            Compliance you can measure. Power you can trust.
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              height: 4,
              width: '100%',
              background:
                'linear-gradient(90deg, #1C2A24 0%, #0E8A5F 50%, #DEE5E1 100%)',
            }}
          />
          <div
            style={{
              marginTop: 28,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
            }}
          >
            {/* Satori needs an explicit display on any node with more than one
                child, so the wordmark is laid out rather than inlined. */}
            <div
              style={{
                display: 'flex',
                fontSize: 56,
                letterSpacing: -2,
                color: '#F0F6F3',
              }}
            >
              <span>ZAN</span>
              <span style={{ color: '#35C08C' }}>-</span>
              <span>F</span>
            </div>
            <div style={{ fontSize: 22, color: '#A7BAB2' }}>
              RECD · RATS® · Installation · Testing · Commissioning
            </div>
          </div>
        </div>
      </div>
    ),
    size
  )
}
