// Full case studies, keyed to the service-area page that embeds each one.
// Adding a project here puts its <ProjectCaseStudy /> section, JSON-LD
// images, and (optional) OG image on that area page automatically.

import type { ProjectCaseStudyData } from "@/components/ProjectCaseStudy";
import { havertownCaseStudy } from "@/data/havertownProject";
import { nolibsCaseStudy } from "@/data/northernLibertiesProject";
import { manayunkCaseStudy } from "@/data/manayunkProject";
import { fishtownCaseStudy } from "@/data/fishtownProject";

export const projectCaseStudies: ProjectCaseStudyData[] = [
  fishtownCaseStudy,
  nolibsCaseStudy,
  manayunkCaseStudy,
  havertownCaseStudy,
];

export function getCaseStudyForArea(areaSlug: string): ProjectCaseStudyData | undefined {
  return projectCaseStudies.find((cs) => cs.areaSlug === areaSlug);
}
