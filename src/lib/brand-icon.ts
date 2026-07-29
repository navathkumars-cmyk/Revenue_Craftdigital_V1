import { readFile } from "node:fs/promises"
import { join } from "node:path"

/** Base64 data URI of the real brand icon mark, for use inside `next/og`
 * ImageResponse trees (which can't reference `/public` files by URL — they
 * need an inline data URI). Shared by icon.tsx, apple-icon.tsx, and
 * opengraph-image.tsx so there's one source of truth for the asset path. */
export async function getBrandIconDataUri() {
  const buffer = await readFile(join(process.cwd(), "public", "brand-icon.png"))
  return `data:image/png;base64,${buffer.toString("base64")}`
}
