import type { ContentProvider } from "./types"
import { localContentProvider } from "./providers/local"
import { sanityContentProvider } from "./providers/sanity"
import { contentfulContentProvider } from "./providers/contentful"
import { strapiContentProvider } from "./providers/strapi"
import { wordpressContentProvider } from "./providers/wordpress"

const providers: Record<string, ContentProvider> = {
  local: localContentProvider,
  sanity: sanityContentProvider,
  contentful: contentfulContentProvider,
  strapi: strapiContentProvider,
  wordpress: wordpressContentProvider,
}

/**
 * Selects the active content backend via the `CMS_PROVIDER` env var
 * (defaults to "local"). This is the only place page/component code should
 * fetch services/industries/case studies/testimonials/FAQs from — never
 * import `config/*.ts` arrays directly in a page — so switching to a real
 * CMS later is a one-line env var change, not a rewrite.
 */
export function getContentProvider(): ContentProvider {
  const key = process.env.CMS_PROVIDER ?? "local"
  const provider = providers[key]

  if (!provider) {
    throw new Error(`Unknown CMS_PROVIDER "${key}". Valid values: ${Object.keys(providers).join(", ")}.`)
  }

  return provider
}

export type { ContentProvider }
