// Extracts the icon mark from the client-supplied logo lockup (public/Logo.jpeg)
// and produces public/brand-icon.png: just the colorful "R" mark, cropped
// tightly, with a transparent background (JPEG has no alpha channel, and the
// wordmark/tagline in the source are solid black — unreadable in dark mode —
// so only the icon is extracted; "Revenue Craft" renders as live theme-aware
// text next to it via src/components/layout/logo.tsx).
//
// Re-run with `node scripts/process-logo.mjs` after replacing public/Logo.jpeg
// with a new source file.

import sharp from "sharp"

const SOURCE = "public/Logo.jpeg"
const OUTPUT = "public/brand-icon.png"

// 1. Trim the source's white padding down to the actual ink (icon + wordmark
//    + tagline combined).
const trimmed = await sharp(SOURCE).trim({ threshold: 10 }).toBuffer()
const trimmedMeta = await sharp(trimmed).metadata()

// 2. Find the icon's right edge: the rightmost column containing a saturated
//    (colorful) pixel, scanning only the main row so the tagline doesn't
//    interfere. Everything past this point is the black wordmark text.
const { data: rgb, info } = await sharp(trimmed)
  .raw()
  .toBuffer({ resolveWithObject: true })
const { width, height, channels } = info
const scanHeight = Math.round(height * 0.75)

function saturationOf(r, g, b) {
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  return max === 0 ? 0 : (max - min) / max
}

let iconRight = 0
for (let y = 0; y < scanHeight; y++) {
  for (let x = 0; x < width; x++) {
    const idx = (y * width + x) * channels
    if (saturationOf(rgb[idx], rgb[idx + 1], rgb[idx + 2]) > 0.35) {
      iconRight = Math.max(iconRight, x)
    }
  }
}
iconRight += 10 // small margin

// 3. Find the icon's vertical bounds within that left strip.
let iconTop = height
let iconBottom = 0
for (let y = 0; y < height; y++) {
  for (let x = 0; x < iconRight; x++) {
    const idx = (y * width + x) * channels
    if (saturationOf(rgb[idx], rgb[idx + 1], rgb[idx + 2]) > 0.35) {
      iconTop = Math.min(iconTop, y)
      iconBottom = Math.max(iconBottom, y)
    }
  }
}
const margin = 6
const cropTop = Math.max(0, iconTop - margin)
const cropHeight = Math.min(height - cropTop, iconBottom - iconTop + margin * 2)

const iconCrop = await sharp(trimmed)
  .extract({ left: 0, top: cropTop, width: iconRight, height: cropHeight })
  .raw()
  .toBuffer({ resolveWithObject: true })

// 4. Key out the white background with anti-aliased alpha, then decontaminate
//    (undo white bleed on partially-transparent edge pixels from JPEG
//    compression) so edges read as clean icon color, not a pale halo.
const { data: cropData, info: cropInfo } = iconCrop
const out = Buffer.alloc(cropInfo.width * cropInfo.height * 4)

for (let i = 0, p = 0; i < cropData.length; i += cropInfo.channels, p += 4) {
  const r = cropData[i]
  const g = cropData[i + 1]
  const b = cropData[i + 2]
  const whiteness = Math.min(r, g, b)
  const distFromWhite = 255 - whiteness
  const floored = distFromWhite < 16 ? 0 : distFromWhite
  const a = Math.max(0, Math.min(255, Math.round((floored / 10) * 255)))
  const aNorm = a / 255

  if (aNorm > 0.02) {
    out[p] = Math.max(0, Math.min(255, Math.round((r - 255 * (1 - aNorm)) / aNorm)))
    out[p + 1] = Math.max(0, Math.min(255, Math.round((g - 255 * (1 - aNorm)) / aNorm)))
    out[p + 2] = Math.max(0, Math.min(255, Math.round((b - 255 * (1 - aNorm)) / aNorm)))
  } else {
    out[p] = r
    out[p + 1] = g
    out[p + 2] = b
  }
  out[p + 3] = a
}

await sharp(out, { raw: { width: cropInfo.width, height: cropInfo.height, channels: 4 } })
  .png()
  .trim({ threshold: 10 })
  .toFile(OUTPUT)

console.log(`Saved ${OUTPUT} (source: ${trimmedMeta.width}x${trimmedMeta.height} trimmed lockup)`)
