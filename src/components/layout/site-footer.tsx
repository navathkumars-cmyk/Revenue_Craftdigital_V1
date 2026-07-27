import Link from "next/link"

import { footerNav, siteConfig } from "@/config/site"
import { Container } from "@/components/layout/container"
import { FloatingShape } from "@/components/motion/floating-shape"

const socialLinks = [
  { mark: "in", href: siteConfig.links.linkedin, label: "LinkedIn" },
  { mark: "IG", href: siteConfig.links.instagram, label: "Instagram" },
]

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="text-muted-foreground hover:text-foreground after:bg-foreground relative w-fit text-sm transition-colors after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-0 after:transition-all after:duration-base after:ease-out-expo hover:after:w-full"
    >
      {children}
    </Link>
  )
}

export function SiteFooter() {
  return (
    <footer className="border-border/60 bg-muted/30 relative overflow-hidden border-t">
      <div
        aria-hidden="true"
        className="via-brand-500/50 pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent to-transparent"
      />
      <FloatingShape
        className="bg-brand-400/10 -right-16 -bottom-16 size-72 rounded-full blur-3xl hidden lg:block"
        duration={10}
      />

      <Container className="relative grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="flex flex-col gap-4">
          <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
            <span className="bg-brand-600 flex size-7 items-center justify-center rounded-md text-sm font-bold text-white">
              R
            </span>
            <span>{siteConfig.shortName}</span>
          </Link>
          <p className="text-muted-foreground max-w-xs text-sm text-pretty">
            {siteConfig.tagline}
          </p>
          <div className="flex gap-2 pt-1">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="border-border text-muted-foreground hover:text-brand-700 dark:hover:text-brand-400 hover:border-brand-300 dark:hover:border-brand-700 flex size-9 items-center justify-center rounded-full border text-xs font-semibold transition-all duration-base hover:scale-110"
              >
                {social.mark}
              </a>
            ))}
          </div>
        </div>

        {footerNav.map((group) => (
          <div key={group.title} className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold">{group.title}</h3>
            <ul className="flex flex-col gap-2">
              {group.items.map((item) => (
                <li key={item.href}>
                  <FooterLink href={item.href}>{item.label}</FooterLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Container>

      <Container className="border-border/60 relative flex flex-col gap-4 border-t py-6 text-sm sm:flex-row sm:items-center sm:justify-between">
        <p className="text-muted-foreground">
          © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </p>
        <div className="flex gap-6">
          <FooterLink href="/privacy">Privacy Policy</FooterLink>
          <FooterLink href="/terms">Terms of Service</FooterLink>
        </div>
      </Container>
    </footer>
  )
}
