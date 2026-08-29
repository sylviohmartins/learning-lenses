import type { Assessment } from "@/content/model";

export type AssessmentResponse = string | string[] | Record<string, string>;
const normalize = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("pt-BR");

export function scoreAssessment(assessment: Assessment, response: AssessmentResponse): boolean {
  if (assessment.kind === "single-choice" || assessment.kind === "boolean")
    return typeof response === "string" && assessment.correctChoiceIds?.includes(response) === true;
  if (assessment.kind === "order")
    return Array.isArray(response) && response.join("|") === assessment.correctOrder?.join("|");
  if (assessment.kind === "matching") {
    if (Array.isArray(response) || typeof response === "string") return false;
    return Object.entries(assessment.correctMatches ?? {}).every(
      ([left, right]) => response[left] === right,
    );
  }
  if (assessment.kind === "short-text" && typeof response === "string") {
    const text = normalize(response);
    return (assessment.acceptedKeywordGroups ?? []).every((group) =>
      group.some((keyword) => text.includes(normalize(keyword))),
    );
  }
  return false;
}
