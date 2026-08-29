import type { Concept } from "@/content/model";
export function prerequisitesMet(concept: Concept, completedConceptIds: string[]): boolean {
  return concept.prerequisiteIds.every((id) => completedConceptIds.includes(id));
}
