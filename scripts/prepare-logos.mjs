/**
 * Turns the client logos from zanf.in into assets that work on a dark canvas.
 *
 * The source files are PNGs on a solid white background. Dropped onto the dark
 * page they would read as white boxes, so the white is removed — but each logo
 * keeps its own brand colours.
 *
 * This is a proper un-matting, not a colour-key. Every source pixel is a brand
 * colour composited over white at some coverage `a`:
 *     pixel = colour * a + 255 * (1 - a)
 * so the original colour is recovered by solving for `colour`. Doing it this
 * way keeps anti-aliased edges clean; a naive threshold leaves a pale halo
 * around every mark.
 *
 * Run: node scripts/prepare-logos.mjs
 */
import sharp from 'sharp'
import { readdir, mkdir } from 'node:fs/promises'
import path from 'node:path'

const SRC = path.join(process.cwd(), 'public/media/clients')
const OUT = path.join(process.cwd(), 'public/media/clients/prepared')

/** Source file → company name, verified by eye against each image. */
const NAMES = {
  'c1.png': 'GE',
  'c2.png': 'Ather Energy',
  'c3.png': 'Hindustan Unilever Limited',
  'c4.png': 'Nestlé',
  'c5.png': 'Suzuki',
  'c6.png': 'ITC Hotels',
  'c7.png': 'Bosch',
  'c8.png': 'Tesco',
  'c9.png': 'Lakmé',
  'c10.png': 'The Times of India',
  'c11.png': 'ABB',
  'c12.png': 'Alstom',
  'c13.png': 'USV',
  'c14.png': 'Cipla',
  'c15.png': 'Praxair',
  'c16.png': 'TVS',
  'c17.png': 'ST Telemedia',
  'c18.png': 'Yamaha',
  'c19.png': 'DuPont',
  'c20.png': 'Blue Dart Aviation Limited',
}

const slug = (name) =>
  name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

await mkdir(OUT, { recursive: true })

const files = (await readdir(SRC)).filter((f) => /^c\d+\.png$/.test(f))
const entries = []

for (const file of files) {
  const name = NAMES[file]
  if (!name) {
    console.warn(`skipping ${file} — no verified company name`)
    continue
  }

  const { data, info } = await sharp(path.join(SRC, file))
    // Crop the surrounding white so every mark fills its cell consistently.
    .trim({ background: '#ffffff', threshold: 12 })
    .resize({ width: 400, height: 160, fit: 'inside', withoutEnlargement: true })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })

  const px = info.width * info.height
  const out = Buffer.alloc(px * 4)

  for (let i = 0; i < px; i++) {
    const r = data[i * 4]
    const g = data[i * 4 + 1]
    const b = data[i * 4 + 2]
    const a = data[i * 4 + 3]

    // Coverage: how far this pixel is from the white matte.
    const cov = ((255 - Math.min(r, g, b)) / 255) * (a / 255)

    if (cov <= 0.004) {
      out[i * 4] = 0
      out[i * 4 + 1] = 0
      out[i * 4 + 2] = 0
      out[i * 4 + 3] = 0
      continue
    }

    // Recover the original colour from the white composite.
    const unmatte = (c) =>
      Math.max(0, Math.min(255, Math.round((c - 255 * (1 - cov)) / cov)))

    out[i * 4] = unmatte(r)
    out[i * 4 + 1] = unmatte(g)
    out[i * 4 + 2] = unmatte(b)
    out[i * 4 + 3] = Math.round(cov * 255)
  }

  const outName = `${slug(name)}.png`
  await sharp(out, { raw: { width: info.width, height: info.height, channels: 4 } })
    .png({ compressionLevel: 9 })
    .toFile(path.join(OUT, outName))

  entries.push({ name, src: `/media/clients/prepared/${outName}` })
  console.log(`${file} → ${outName}  (${info.width}x${info.height})`)
}

entries.sort((a, b) => a.name.localeCompare(b.name))
console.log('\n--- paste into content/site.ts ---\n')
console.log(
  `export const clients: { name: string; src: string }[] = ${JSON.stringify(entries, null, 2)}`
)
