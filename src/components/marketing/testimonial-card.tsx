import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { TiltGlassCard } from "@/components/ui/tilt-glass-card"
import type { Testimonial } from "@/types"

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <TiltGlassCard maxTilt={5} className="p-6">
      <figure className="flex h-full flex-col justify-between gap-6">
        <blockquote className="text-foreground text-lg text-pretty">“{testimonial.quote}”</blockquote>
        <figcaption className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={testimonial.avatar} alt="" />
            <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-foreground text-sm font-semibold">{testimonial.name}</span>
            <span className="text-muted-foreground text-sm">
              {testimonial.role}, {testimonial.company}
            </span>
          </div>
        </figcaption>
      </figure>
    </TiltGlassCard>
  )
}
