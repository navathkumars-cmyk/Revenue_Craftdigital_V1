"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { mainNav, siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/layout/container"
import { Logo } from "@/components/layout/logo"
import { MobileNav } from "@/components/layout/mobile-nav"
import { ThemeToggle } from "@/components/layout/theme-toggle"

export function SiteHeader() {
  const pathname = usePathname()

  return (
    <header className="border-border/60 bg-background/80 sticky top-0 z-40 w-full border-b backdrop-blur-lg supports-backdrop-filter:bg-background/60">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/">
          <Logo priority className="text-foreground" />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {mainNav.map((item) => {
            const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors",
                  isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button variant="ghost" className="hidden lg:inline-flex" render={<Link href="/contact" />}>
            Contact
          </Button>
          <Button ripple render={<Link href="/contact" />} className="hidden lg:inline-flex">
            {siteConfig.cta.primary}
          </Button>
          <MobileNav />
        </div>
      </Container>
    </header>
  )
}
