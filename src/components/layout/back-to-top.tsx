"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowUp } from "lucide-react"

import { cn } from "@/lib/utils"

/** Floating button that appears once the user has scrolled past one viewport
 * height, and smooth-scrolls back to the top of the page on click. */
export function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    function handleScroll() {
      setVisible(window.scrollY > window.innerHeight)
    }
    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible ? (
        <motion.button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          initial={{ opacity: 0, y: 12, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.9 }}
          transition={{ duration: 0.2 }}
          aria-label="Back to top"
          className={cn(
            "bg-foreground text-background shadow-lg fixed right-6 bottom-6 z-40 flex size-11 items-center justify-center rounded-full",
            "hover:bg-foreground/90 focus-visible:ring-ring/50 focus-visible:ring-3 outline-none transition-colors"
          )}
        >
          <ArrowUp className="size-5" />
        </motion.button>
      ) : null}
    </AnimatePresence>
  )
}
