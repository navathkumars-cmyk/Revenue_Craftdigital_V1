import { services } from "@/config/services"
import { industries } from "@/config/industries"
import { caseStudies } from "@/config/case-studies"
import { testimonials } from "@/config/testimonials"
import { generalFaqs } from "@/config/faqs"
import type { ContentProvider } from "../types"

/**
 * Default content provider — reads from the typed `config/*.ts` files
 * shipped in this repo. This is what runs when `CMS_PROVIDER` is unset.
 * Every method is `async` even though the data is already in memory, so
 * this provider has the exact same call signature as a real network-backed
 * one — swapping providers never requires touching a call site.
 */
export const localContentProvider: ContentProvider = {
  async getServices() {
    return services
  },
  async getServiceBySlug(slug) {
    return services.find((service) => service.slug === slug)
  },
  async getIndustries() {
    return industries
  },
  async getIndustryBySlug(slug) {
    return industries.find((industry) => industry.slug === slug)
  },
  async getCaseStudies() {
    return caseStudies
  },
  async getCaseStudyBySlug(slug) {
    return caseStudies.find((study) => study.slug === slug)
  },
  async getTestimonials() {
    return testimonials
  },
  async getFaqs() {
    return generalFaqs
  },
}
