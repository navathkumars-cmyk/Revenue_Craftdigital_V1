import type { Metadata } from "next"
import { siteConfig } from "@/config/site"
import type { FaqItem } from "@/types"

interface BuildMetadataInput {
  title: string
  description?: string
  path?: string
  /** Only pass this for a page that needs a bespoke OG image. Leave unset to
   * let Next.js's file-convention opengraph-image.tsx apply automatically. */
  image?: string
  noIndex?: boolean
}

/** Builds page-level Metadata with sensible defaults inherited from siteConfig. */
export function buildMetadata({
  title,
  description = siteConfig.description,
  path = "/",
  image,
  noIndex = false,
}: BuildMetadataInput): Metadata {
  const url = new URL(path, siteConfig.url).toString()

  return {
    title,
    description,
    alternates: { canonical: url },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      type: "website",
      ...(image ? { images: [{ url: image }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(image ? { images: [image] } : {}),
    },
  }
}

/** Minimal JSON-LD builder — pass any schema.org shape, script tag handles serialization. */
export function jsonLd(data: Record<string, unknown>) {
  return {
    __html: JSON.stringify(data),
  }
}

export function organizationJsonLd() {
  return jsonLd({
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    sameAs: Object.values(siteConfig.links),
  })
}

/** FAQPage structured data — pass the same items rendered by <FaqAccordion>
 * so the markup and the schema never drift apart. */
export function faqPageJsonLd(items: FaqItem[]) {
  return jsonLd({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  })
}
