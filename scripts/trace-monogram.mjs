/**
 * Traces the ZAN-F sigma monogram out of the supplied logo render into vector.
 *
 * Why this works where the earlier full-lock-up key failed: that attempt tried
 * to separate a dark panel from dark 3D bevels, which are the same pixels. This
 * only asks a much easier question — "is this pixel green, or blue, or neither" —
 * and the monogram's letter faces answer it unambiguously by hue. The bevel
 * highlights and drop shadows are neutral, so they fall out of both masks.
 *
 * The traced result is filled flat in the recovered brand colours rather than
 * the metallic gradient. Flat is what survives at 32px, and what works on a
 * light header.
 *
 * Run: node scripts/trace-monogram.mjs
 */
import sharp from 'sharp'
import potrace from 'potrace'
import { writeFile } from 'node:fs/promises'

const SRC = 'Zanf Logo HD.png'

// The monogram, left of the wordmark. Measured off the render: the mark spans
// roughly x 87–448 and y 73–545, and "EMISSION CONTROL" sits below it (its
// near-white pixels fall out of both hue masks anyway).
const REGION = { left: 78, top: 62, width: 388, height: 500 }

const GREEN = '#1f8f57'
const BLUE = '#1d6b96'

const { data, info } = await sharp(SRC)
  .extract(REGION)
  .resize({ width: 1000 }) // trace at high resolution, scale down in the SVG
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true })

const count = info.width * info.height
console.log(`tracing region ${info.width}x${info.height}`)

/** Build a 1-bit mask: white where the pixel belongs to this half of the mark. */
/** Union bounding box of everything either mask claims, for a tight viewBox. */
const bbox = { minX: info.width, minY: info.height, maxX: 0, maxY: 0 }

function mask(which) {
  const out = Buffer.alloc(count)
  let hits = 0
  for (let i = 0; i < count; i++) {
    const r = data[i * 4]
    const g = data[i * 4 + 1]
    const b = data[i * 4 + 2]
    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    const sat = max === 0 ? 0 : (max - min) / max
    const lum = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255

    // Two tiers. The letter faces are mid-tone and strongly coloured. But the
    // top-right of each shape carries a bright metallic highlight that a single
    // mid-tone test drops, punching holes in exactly the part of the mark that
    // matters — so brighter pixels are accepted on a much weaker hue signal.
    const isFace = sat > 0.3 && lum > 0.1 && lum < 0.72
    const isHighlight = lum >= 0.72 && sat > 0.1
    // A margin on the blue test. The green shape's top-left tip runs teal, and
    // without it a sliver of that tip traces into the blue path as a speck.
    const isGreen = g >= b && g > r
    const isBlue = b - g > 14 && b > r

    const on =
      (isFace || isHighlight) && (which === 'green' ? isGreen : isBlue)
    // potrace fills *dark* regions, so the shape has to be black on white.
    out[i] = on ? 0 : 255
    if (on) {
      hits++
      const x = i % info.width
      const y = (i / info.width) | 0
      if (x < bbox.minX) bbox.minX = x
      if (y < bbox.minY) bbox.minY = y
      if (x > bbox.maxX) bbox.maxX = x
      if (y > bbox.maxY) bbox.maxY = y
    }
  }
  console.log(`  ${which}: ${((hits / count) * 100).toFixed(1)}% of region`)
  return out
}

async function trace(which) {
  const raw = mask(which)

  // Median first to kill the isolated spurs the hue test leaves along
  // anti-aliased edges, then blur and re-threshold to smooth the outline. A
  // straight trace of the raw mask comes out visibly ragged.
  const cleaned = await sharp(raw, {
    raw: { width: info.width, height: info.height, channels: 1 },
  })
    // Blur wide and threshold low: that acts as a morphological close, filling
    // the pinholes the bevel leaves inside each shape. The dark diagonal gap
    // between the two halves is wide enough to survive it.
    .median(7)
    .blur(5)
    .threshold(112)
    .png()
    .toBuffer()

  return new Promise((resolve, reject) => {
    potrace.trace(
      cleaned,
      {
        threshold: 128,
        turdSize: 400, // the mark is two large shapes; anything small is noise
        alphaMax: 0.35, // strongly prefer straight corners — the mark is angular
        optCurve: true,
        optTolerance: 0.8,
      },
      (err, svg) => {
        if (err) return reject(err)
        // potrace returns a full SVG; keep just the path data.
        const d = [...svg.matchAll(/ d="([^"]+)"/g)].map((m) => m[1]).join(' ')
        resolve(d)
      }
    )
  })
}

const [greenPath, bluePath] = await Promise.all([trace('green'), trace('blue')])

// Tight viewBox with a small optical margin, so the component controls the
// padding rather than inheriting whitespace baked into the crop.
const pad = 6
const vb = {
  x: Math.max(0, bbox.minX - pad),
  y: Math.max(0, bbox.minY - pad),
}
vb.w = Math.min(info.width - vb.x, bbox.maxX - bbox.minX + pad * 2)
vb.h = Math.min(info.height - vb.y, bbox.maxY - bbox.minY + pad * 2)
console.log(`viewBox ${vb.x} ${vb.y} ${vb.w} ${vb.h}`)

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb.x} ${vb.y} ${vb.w} ${vb.h}" fill="none">
  <path d="${greenPath}" fill="${GREEN}"/>
  <path d="${bluePath}" fill="${BLUE}"/>
</svg>
`

await writeFile('public/media/zanf-monogram.svg', svg)
console.log(
  `wrote public/media/zanf-monogram.svg (${Math.round(svg.length / 1024)} KB)`
)

// Proof render, so the trace can actually be looked at.
await sharp(Buffer.from(svg)).resize({ width: 420 }).png().toFile('scripts/_traced.png')
console.log('wrote scripts/_traced.png')

// --- Icons -----------------------------------------------------------------
// Static PNGs rather than next/og routes: the monogram is the mark, so the tab
// icon should be the mark, and a file is cheaper than rendering one per request.
async function icon(size, out, inset) {
  const markSize = Math.round(size * inset)
  const mark = await sharp(Buffer.from(svg))
    .resize({ height: markSize, fit: 'inside' })
    .png()
    .toBuffer()
  const m = await sharp(mark).metadata()

  await sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: '#0e1512',
    },
  })
    .composite([
      {
        input: mark,
        left: Math.round((size - m.width) / 2),
        top: Math.round((size - m.height) / 2),
      },
    ])
    .png({ compressionLevel: 9 })
    .toFile(out)
  console.log(`wrote ${out} (${size}x${size})`)
}

await icon(32, 'app/icon.png', 0.74)
await icon(180, 'app/apple-icon.png', 0.62)
