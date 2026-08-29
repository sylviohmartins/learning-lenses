import type { EvidenceType, MasteryEvidence, MasteryLevel } from "@/content/model";

const TYPE_WEIGHT: Record<EvidenceType, number> = {
  recognition: 0.7,
  recall: 1,
  application: 1.15,
  transfer: 1.35,
  "teach-back": 1.25,
};
const DIFFICULTY_WEIGHT: Record<1 | 2 | 3 | 4 | 5, number> = {
  1: 0.8,
  2: 0.9,
  3: 1,
  4: 1.1,
  5: 1.2,
};
export const PRIOR_SCORE = 0.3;
export const PRIOR_WEIGHT = 2;

export interface EvidenceWithDifficulty extends MasteryEvidence {
  difficulty: 1 | 2 | 3 | 4 | 5;
}

export function delayWeight(hours: number): number {
  if (hours < 1) return 0.7;
  if (hours < 24) return 0.85;
  if (hours < 72) return 1;
  if (hours < 168) return 1.1;
  return 1.2;
}

export function evidenceMaxWeight(evidence: EvidenceWithDifficulty): number {
  return (
    TYPE_WEIGHT[evidence.evidenceType] *
    DIFFICULTY_WEIGHT[evidence.difficulty] *
    delayWeight(evidence.delaySinceLearningHours)
  );
}

export function evidenceValue(evidence: EvidenceWithDifficulty): number {
  return evidence.outcome * evidenceMaxWeight(evidence) * (evidence.hintUsed ? 0.75 : 1);
}

export function masteryLevel(score: number): MasteryLevel {
  if (score < 40) return "discovering";
  if (score < 65) return "familiar";
  if (score < 80) return "understood";
  if (score < 90) return "proficient";
  return "consolidated";
}

export function calculateMastery(evidence: EvidenceWithDifficulty[]): {
  mastery: number;
  level: MasteryLevel;
  raw: number;
} {
  const numerator =
    PRIOR_SCORE * PRIOR_WEIGHT + evidence.reduce((sum, item) => sum + evidenceValue(item), 0);
  const denominator =
    PRIOR_WEIGHT + evidence.reduce((sum, item) => sum + evidenceMaxWeight(item), 0);
  const raw = (numerator / denominator) * 100;
  const hasPosteriorRecall = evidence.some(
    (item) =>
      item.evidenceType === "recall" && item.delaySinceLearningHours >= 24 && item.outcome > 0,
  );
  const hasApplication = evidence.some(
    (item) => item.evidenceType === "application" && item.outcome > 0,
  );
  const hasCorrectTransfer = evidence.some(
    (item) => item.evidenceType === "transfer" && item.outcome === 1,
  );
  let gated = raw;
  if (!hasPosteriorRecall) gated = Math.min(gated, 79);
  if (!hasApplication) gated = Math.min(gated, 84);
  if (!hasCorrectTransfer) gated = Math.min(gated, 89);
  const days = new Set(evidence.map((item) => item.occurredAt.slice(0, 10)));
  if (gated >= 90 && (days.size < 2 || !hasCorrectTransfer)) gated = 89;
  const mastery = Math.max(0, Math.min(100, Math.round(gated)));
  return { mastery, level: masteryLevel(mastery), raw };
}

export const masteryLevelLabel: Record<MasteryLevel, string> = {
  discovering: "Descobrindo",
  familiar: "Familiar",
  understood: "Compreendido",
  proficient: "Proficiente",
  consolidated: "Consolidado",
};
