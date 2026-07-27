import type { ContentProvider } from "../types"

/**
 * Strapi (self-hosted headless CMS) adapter. To activate:
 *
 * 1. Set env vars: STRAPI_URL (e.g. https://cms.yourdomain.com),
 *    STRAPI_API_TOKEN (a read-only API token from Strapi's admin panel),
 *    and CMS_PROVIDER=strapi. No SDK needed — Strapi's REST API is plain
 *    `fetch`.
 * 2. In Strapi, create collection types `service`, `industry`,
 *    `case-study`, `testimonial`, `faq` with fields matching
 *    `src/types/index.ts`. Keep `icon` as a short text field holding a key
 *    from `src/lib/icon-registry.ts`, not a media field.
 * 3. Replace each `notConfigured(...)` call below with a real fetch to
 *    `${STRAPI_URL}/api/<collection>?populate=*`, using the helper below.
 */

function notConfigured(method: string): never {
  throw new Error(
    `Strapi content provider: ${method}() is not implemented yet. See the setup steps at the top of src/lib/cms/providers/strapi.ts.`
  )
}

// async function strapiFetch<T>(path: string): Promise<T> {
//   const res = await fetch(`${process.env.STRAPI_URL}/api/${path}`, {
//     headers: { Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}` },
//     next: { revalidate: 300 },
//   })
//   if (!res.ok) throw new Error(`Strapi request failed: ${res.status} ${res.statusText}`)
//   const json = await res.json()
//   return json.data.map((entry: { attributes: T }) => entry.attributes)
// }

export const strapiContentProvider: ContentProvider = {
  async getServices() {
    // return strapiFetch<Service>("services?populate=*")
    notConfigured("getServices")
  },
  async getServiceBySlug() {
    notConfigured("getServiceBySlug")
  },
  async getIndustries() {
    notConfigured("getIndustries")
  },
  async getIndustryBySlug() {
    notConfigured("getIndustryBySlug")
  },
  async getCaseStudies() {
    notConfigured("getCaseStudies")
  },
  async getCaseStudyBySlug() {
    notConfigured("getCaseStudyBySlug")
  },
  async getTestimonials() {
    notConfigured("getTestimonials")
  },
  async getFaqs() {
    notConfigured("getFaqs")
  },
}
