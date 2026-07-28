import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { BackToTop } from "@/components/layout/back-to-top"
import { PageTransition } from "@/components/layout/page-transition"

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a
        href="#main-content"
        className="bg-background text-foreground focus-visible:ring-ring sr-only rounded-lg px-4 py-2 text-sm font-medium focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus-visible:ring-3"
      >
        Skip to main content
      </a>
      <SiteHeader />
      <main id="main-content" className="flex-1">
        <PageTransition>{children}</PageTransition>
      </main>
      <SiteFooter />
      <BackToTop />
    </>
  )
}
