import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"
import { GlassCard } from "@/components/ui/glass-card"
import type { FaqItem } from "@/types"

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  return (
    <GlassCard className="p-6 sm:p-8">
      <Accordion className="w-full">
        {items.map((item, index) => (
          <AccordionItem key={item.question} value={`item-${index}`}>
            <AccordionTrigger className="text-left text-base font-medium">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground text-base text-pretty">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </GlassCard>
  )
}
