import { getContentProvider } from "@/lib/cms"
import { CaseStudyCard } from "@/components/marketing/case-study-card"
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger-group"

export async function CaseStudiesPreview() {
  const caseStudies = await getContentProvider().getCaseStudies()

  return (
    <StaggerGroup className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      {caseStudies.slice(0, 3).map((study) => (
        <StaggerItem key={study.slug} className="h-full">
          <CaseStudyCard study={study} />
        </StaggerItem>
      ))}
    </StaggerGroup>
  )
}
