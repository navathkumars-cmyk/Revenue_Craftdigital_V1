import type { ContentProvider } from "../types"

/**
 * Sanity.io adapter. To activate:
 *
 * 1. `npm install @sanity/client`
 * 2. Set env vars: SANITY_PROJECT_ID, SANITY_DATASET (e.g. "production"),
 *    and CMS_PROVIDER=sanity. Add SANITY_API_TOKEN too if content is
 *    unpublished/draft and needs an authenticated read.
 * 3. In your Sanity Studio, create document types named `service`,
 *    `industry`, `caseStudy`, `testimonial`, and `faq` with fields matching
 *    the shapes in `src/types/index.ts` — in particular, `icon` should be a
 *    plain string field (a key from `src/lib/icon-registry.ts`), not an
 *    image or file, since content-driven icons must stay JSON-serializable.
 * 4. Replace each `notConfigured(...)` call below with a real GROQ query,
 *    using the commented examples as a starting point.
 *
 * Until step 4 is done for a given method, calling it throws with a clear
 * message rather than silently returning empty data.
 */

function notConfigured(method: string): never {
  throw new Error(
    `Sanity content provider: ${method}() is not implemented yet. See the setup steps at the top of src/lib/cms/providers/sanity.ts.`
  )
}

// Uncomment once @sanity/client is installed and env vars are set:
//
// import { createClient } from "@sanity/client"
//
// const client = createClient({
//   projectId: process.env.SANITY_PROJECT_ID!,
//   dataset: process.env.SANITY_DATASET ?? "production",
//   apiVersion: "2024-01-01",
//   token: process.env.SANITY_API_TOKEN,
//   useCdn: !process.env.SANITY_API_TOKEN,
// })

export const sanityContentProvider: ContentProvider = {
  async getServices() {
    // return client.fetch(`*[_type == "service"] | order(name asc){
    //   "slug": slug.current, name, category, summary, description, icon, outcomes
    // }`)
    notConfigured("getServices")
  },
  async getServiceBySlug() {
    // return client.fetch(`*[_type == "service" && slug.current == $slug][0]{...}`, { slug })
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
