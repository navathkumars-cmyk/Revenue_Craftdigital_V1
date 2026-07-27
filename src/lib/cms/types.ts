import type { Service, Industry, CaseStudy, Testimonial, FaqItem } from "@/types"

/**
 * Every content backend (local config files, Sanity, Contentful, Strapi,
 * WordPress) implements this same shape. Pages and components should only
 * ever call `getContentProvider()` from `@/lib/cms` — never import
 * `config/*.ts` arrays directly — so swapping the backend later never
 * touches a single page.
 */
export interface ContentProvider {
  getServices(): Promise<Service[]>
  getServiceBySlug(slug: string): Promise<Service | undefined>
  getIndustries(): Promise<Industry[]>
  getIndustryBySlug(slug: string): Promise<Industry | undefined>
  getCaseStudies(): Promise<CaseStudy[]>
  getCaseStudyBySlug(slug: string): Promise<CaseStudy | undefined>
  getTestimonials(): Promise<Testimonial[]>
  getFaqs(): Promise<FaqItem[]>
}
