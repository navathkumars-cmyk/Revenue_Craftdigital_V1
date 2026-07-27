import type { ContentProvider } from "../types"

/**
 * WordPress Headless adapter (via the WPGraphQL plugin). To activate:
 *
 * 1. Install and activate the WPGraphQL plugin on the WordPress site, plus
 *    WPGraphQL for Advanced Custom Fields if using ACF for the content
 *    model below.
 * 2. Set env vars: WORDPRESS_GRAPHQL_ENDPOINT (e.g.
 *    https://cms.yourdomain.com/graphql) and CMS_PROVIDER=wordpress.
 * 3. Register custom post types `service`, `industry`, `case_study`,
 *    `testimonial`, `faq` (via a plugin like Custom Post Type UI) with ACF
 *    field groups matching `src/types/index.ts`. Keep `icon` as a plain
 *    text field holding a key from `src/lib/icon-registry.ts`.
 * 4. Replace each `notConfigured(...)` call below with a real GraphQL query
 *    against WORDPRESS_GRAPHQL_ENDPOINT, using the helper below.
 */

function notConfigured(method: string): never {
  throw new Error(
    `WordPress content provider: ${method}() is not implemented yet. See the setup steps at the top of src/lib/cms/providers/wordpress.ts.`
  )
}

// async function wpGraphql<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
//   const res = await fetch(process.env.WORDPRESS_GRAPHQL_ENDPOINT!, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ query, variables }),
//     next: { revalidate: 300 },
//   })
//   const { data, errors } = await res.json()
//   if (errors?.length) throw new Error(`WPGraphQL error: ${errors[0].message}`)
//   return data
// }

export const wordpressContentProvider: ContentProvider = {
  async getServices() {
    // const data = await wpGraphql<{ services: { nodes: Service[] } }>(`
    //   query { services { nodes { slug name category summary description icon outcomes } } }
    // `)
    // return data.services.nodes
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
