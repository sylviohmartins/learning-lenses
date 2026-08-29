import type { LensSuitability } from "@/content/model";
export function lensSuitabilityScore(value: LensSuitability): {
  score: number;
  classification: "excellent" | "good" | "limited" | "rejected";
} {
  const score =
    value.structuralFit * 0.3 +
    value.misconceptionSafety * 0.2 +
    value.extensibility * 0.15 +
    value.transferPotential * 0.15 +
    value.familiarity * 0.1 +
    value.narrativePotential * 0.1;
  if (value.structuralFit < 60 || value.misconceptionSafety < 60 || score < 60)
    return { score, classification: "rejected" };
  if (score >= 85) return { score, classification: "excellent" };
  if (score >= 70) return { score, classification: "good" };
  return { score, classification: "limited" };
}
