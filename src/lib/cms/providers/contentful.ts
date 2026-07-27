import type { ContentProvider } from "../types"

/**
 * Contentful adapter. To activate:
 *
 * 1. `npm install contentful`
 * 2. Set env vars: CONTENTFUL_SPACE_ID, CONTENTFUL_ACCESS_TOKEN (Content
 *    Delivery API token), and CMS_PROVIDER=contentful. Use
 *    CONTENTFUL_PREVIEW_TOKEN + the Preview API host for draft content.
 * 3. In Contentful, create content types `service`, `industry`,
 *    `caseStudy`, `testimonial`, `faq` with fields matching
 *    `src/types/index.ts`. Keep `icon` as a short text field holding a key
 *    from `src/lib/icon-registry.ts` — not an asset — so it stays plain data.
 * 4. Replace each `notConfigured(...)` call below with a real
 *    `client.getEntries({ content_type: "..." })` call and map `.items`
 *    to the shapes in `src/types/index.ts`.
 */

function notConfigured(method: string): never {
  throw new Error(
    `Contentful content provider: ${method}() is not implemented yet. See the setup steps at the top of src/lib/cms/providers/contentful.ts.`
  )
}

// Uncomment once the `contentful` package is installed and env vars are set:
//
// import { createClient } from "contentful"
//
// const client = createClient({
//   space: process.env.CONTENTFUL_SPACE_ID!,
//   accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
// })

export const contentfulContentProvider: ContentProvider = {
  async getServices() {
    // const { items } = await client.getEntries({ content_type: "service" })
    // return items.map((item) => item.fields as Service)
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
