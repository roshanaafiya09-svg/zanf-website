/**
 * Lifts the ZAN-F lock-up out of the supplied mockup render.
 *
 * The source, `Zanf Logo HD.png`, is not a logo file — it is a presentation
 * render: 3D brushed-metal lettering photographed on a dark textured panel,
 * with bevels, drop shadows and a lighting gradient baked into the pixels.
 * There is no vector and no alpha channel to recover.
 *
 * So this does the only two honest things available:
 *
 *   1. `zanf-logo-plate.png` — trimmed to the artwork, sparkle artefact cropped
 *      off. Used on dark surfaces, presented as a mounted plate rather than
 *      pretended to be transparent.
 *   2. `zanf-logo-mark.png` — an attempt at keying the dark panel out to
 *      transparency, judged on saturation and luminance: the letters are
 *      saturated green and blue or near-white, the panel is neutral and dark.
 *      Whether this is usable depends on how much of the metallic highlight
 *      survives; inspect the output before trusting it.
 *
 * Run: node scripts/prepare-brand-logo.mjs
 */
import sharp from 'sharp'
import path from 'node:path'

const SRC = path.join(process.cwd(), 'Zanf Logo HD.png')
const OUT = path.join(process.cwd(), 'public/media')

const meta = await sharp(SRC).metadata()
console.log(`source: ${meta.width}x${meta.height}  alpha=${meta.hasAlpha}  ${meta.format}`)

// --- Sample the panel colour from the four corners -------------------------
const corners = await sharp(SRC).resize(3, 3, { fit: 'fill' }).raw().toBuffer()
const px = (i) => `rgb(${corners[i * 3]},${corners[i * 3 + 1]},${corners[i * 3 + 2]})`
console.log(`panel corners: ${px(0)} ${px(2)} ${px(6)} ${px(8)}`)

// --- 1. The plate ----------------------------------------------------------
// A four-point sparkle sits in the bottom-right corner of the render, and it
// overlaps the right margin of "SYSTEMS" — so cropping it off clips the final
// letter. Patch it instead: sample the panel just above it, and composite a
// blurred rectangle of that colour over the artefact. The panel is a smooth
// gradient there, so a matched, soft-edged patch is invisible.
// The artwork ships as-is, only resized. Two things were tried and rejected:
//
//   - Cropping the right edge to lose the four-point sparkle in the bottom
//     corner. The sparkle overlaps the right margin of "SYSTEMS", so any crop
//     that removes it clips the final letter.
//   - Patching over the sparkle with sampled panel colour. The panel is a
//     smooth gradient, so a flat fill leaves a visible rectangle — worse than
//     the artefact it hides.
//
// At the size this is displayed the sparkle reads as a highlight on a
// photographed plate. Fixing it properly means fixing the source file.
const plate = await sharp(SRC)
  .resize({ width: 1200, withoutEnlargement: true })
  .png({ compressionLevel: 9 })
  .toBuffer()

await sharp(plate).toFile(path.join(OUT, 'zanf-logo-plate.png'))
console.log(
  `wrote zanf-logo-plate.png (${meta.width}x${meta.height} source, resized to 1200 wide)`
)

// --- 2. Brand colours ------------------------------------------------------
// Recovered from the letter faces: mid-tone, genuinely saturated pixels only,
// so bevel highlights and drop shadows do not drag the average.
const { data, info } = await sharp(plate).ensureAlpha().raw().toBuffer({
  resolveWithObject: true,
})

const greens = []
const blues = []
for (let i = 0; i < info.width * info.height; i++) {
  const r = data[i * 4]
  const g = data[i * 4 + 1]
  const b = data[i * 4 + 2]
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const sat = max === 0 ? 0 : (max - min) / max
  const lum = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255
  if (lum > 0.15 && lum < 0.62 && sat > 0.45) {
    if (g > b && g > r) greens.push([r, g, b])
    else if (b > g && b > r) blues.push([r, g, b])
  }
}
const hex = (arr) => {
  const s = arr.reduce((a, c) => [a[0] + c[0], a[1] + c[1], a[2] + c[2]], [0, 0, 0])
  return (
    '#' +
    s
      .map((v) => Math.round(v / arr.length).toString(16).padStart(2, '0'))
      .join('')
  )
}
console.log(`brand green: ${hex(greens)}   brand blue: ${hex(blues)}`)

// --- Note on transparency --------------------------------------------------
// Keying the panel out was attempted and abandoned. The letters carry a 3D
// extrusion whose faces are near-black, and saturation is meaningless at that
// luminance, so shadows survive the key at full opacity while the panel itself
// leaks through as a translucent veil. There is no threshold that separates
// "dark panel" from "dark bevel" here — they are the same pixels. A transparent
// logo needs the flat mark from the client, ideally as SVG.
console.log(
  'no transparent variant produced — see the comment in this file for why'
)
