import { z } from "zod";

const contentStatus = z.enum([
  "requested",
  "researching",
  "draft",
  "review",
  "beta",
  "verified",
  "update_required",
  "archived",
]);
const id = z.string().min(1);
const isoDate = z.string().datetime();
const choice = z.object({ id, label: z.string().min(1) });
const evidenceType = z.enum(["recognition", "recall", "application", "transfer", "teach-back"]);
const lensSuitability = z.object({
  structuralFit: z.number().min(0).max(100),
  misconceptionSafety: z.number().min(0).max(100),
  extensibility: z.number().min(0).max(100),
  transferPotential: z.number().min(0).max(100),
  familiarity: z.number().min(0).max(100),
  narrativePotential: z.number().min(0).max(100),
});

export const subjectSchema = z.object({
  id,
  slug: id,
  title: z.string().min(1),
  description: z.string().min(1),
  domainIds: z.array(id).min(1),
  status: contentStatus,
  version: z.number().int().positive(),
});
export const conceptSchema = z.object({
  id,
  subjectId: id,
  name: z.string().min(1),
  description: z.string().min(1),
  prerequisiteIds: z.array(id),
  learningObjectiveIds: z.array(id).min(1),
  misconceptionIds: z.array(id),
  assessmentIds: z.array(id).min(1),
  sourceIds: z.array(id).min(1),
  riskLevel: z.enum(["normal", "high"]),
  version: z.number().int().positive(),
  verifiedAt: isoDate,
});
export const lensSchema = z.object({
  id,
  name: z.string().min(1),
  description: z.string().min(1),
  vocabulary: z.array(z.object({ term: z.string(), meaning: z.string() })),
  narrativePatterns: z.array(z.string()),
  toneRules: z.array(z.string()),
  prohibitedPatterns: z.array(z.string()),
  version: z.number().int().positive(),
});
export const lensMappingSchema = z.object({
  id,
  conceptId: id,
  lensId: id,
  sourceDomain: z.string(),
  mapping: z
    .array(z.object({ source: z.string(), target: z.string(), explanation: z.string() }))
    .min(1),
  limitations: z.array(z.string()).min(1),
  misconceptionRisks: z.array(z.string()),
  suitability: lensSuitability,
  fadePlanId: id,
  status: z.enum(["draft", "reviewed", "verified"]),
});
export const sourceSchema = z.object({
  id,
  title: z.string().min(1),
  authority: z.string().min(1),
  url: z.url(),
  legalReference: z.string().optional(),
  sourceType: z.enum([
    "constitution",
    "law",
    "regulation",
    "official-guidance",
    "academic",
    "other",
  ]),
  effectiveFrom: z.string().optional(),
  effectiveUntil: z.string().optional(),
  verifiedAt: isoDate,
  freshnessClass: z.enum(["stable", "legislative", "operational"]),
  status: contentStatus,
});
export const assessmentSchema = z.object({
  id,
  conceptIds: z.array(id).min(1),
  type: evidenceType,
  difficulty: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5)]),
  prompt: z.string().min(1),
  scoringRuleId: id,
  lensId: id.optional(),
  verified: z.boolean(),
  kind: z.enum(["single-choice", "boolean", "order", "matching", "short-text"]),
  choices: z.array(choice).optional(),
  correctChoiceIds: z.array(id).optional(),
  orderItems: z.array(choice).optional(),
  correctOrder: z.array(id).optional(),
  matchLeft: z.array(choice).optional(),
  matchRight: z.array(choice).optional(),
  correctMatches: z.record(z.string(), z.string()).optional(),
  acceptedKeywordGroups: z.array(z.array(z.string())).optional(),
  feedbackCorrect: z.string().min(1),
  feedbackWrong: z.string().min(1),
  sourceIds: z.array(id).min(1),
  misconceptionId: id.optional(),
  asksConfidence: z.boolean().optional(),
});
export const masteryEvidenceSchema = z.object({
  id,
  conceptId: id,
  assessmentId: id,
  outcome: z.number().min(0).max(1),
  evidenceType,
  hintUsed: z.boolean(),
  confidence: z.union([z.literal(1), z.literal(2), z.literal(3)]).optional(),
  occurredAt: isoDate,
  delaySinceLearningHours: z.number().min(0),
});
export const conceptStateSchema = z.object({
  id: z.string().optional(),
  conceptId: id,
  mastery: z.number().min(0).max(100),
  level: z.enum(["discovering", "familiar", "understood", "proficient", "consolidated"]),
  evidenceIds: z.array(id),
  misconceptionIds: z.array(id),
  nextReviewAt: isoDate.optional(),
  updatedAt: isoDate,
});
export const episodeSchema = z.object({
  id,
  moduleId: id,
  number: z.number().int().positive(),
  title: z.string().min(1),
  hook: z.string().min(1),
  messages: z
    .array(z.object({ character: z.enum(["Nina", "Rafa", "Lia"]), text: z.string().min(1) }))
    .min(1),
  truth: z.object({
    title: z.string(),
    body: z.string(),
    items: z.array(z.string()).optional(),
    sourceIds: z.array(id).min(1),
  }),
  assessmentIds: z.array(id).min(1),
  sourceIds: z.array(id).min(1),
  conceptIds: z.array(id).min(1),
  closingHook: z.string().min(1),
  fadeStage: z.enum(["F1", "F2", "F3", "F4", "F5"]),
  estimatedMinutes: z.number().positive(),
  version: z.number().int().positive(),
  status: contentStatus,
});
export const moduleSchema = z.object({
  id,
  subjectId: id,
  seasonTitle: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  episodeIds: z.array(id).min(1),
  finalAssessmentIds: z.array(id).min(1),
  estimatedMinutes: z.number().positive(),
  prerequisiteConceptIds: z.array(id),
  status: contentStatus,
  version: z.number().int().positive(),
});
export const misconceptionSchema = z.object({
  id,
  conceptIds: z.array(id).min(1),
  claim: z.string().min(1),
  correction: z.string().min(1),
  whyPlausible: z.string().min(1),
  sourceIds: z.array(id).min(1),
  status: contentStatus,
});

export const analyticsEventNameSchema = z.enum([
  "app_started",
  "onboarding_started",
  "onboarding_completed",
  "module_started",
  "module_completed",
  "episode_started",
  "episode_completed",
  "interaction_viewed",
  "interaction_answered",
  "confidence_recorded",
  "feedback_viewed",
  "source_opened",
  "misconception_triggered",
  "mastery_evidence_added",
  "mastery_changed",
  "review_scheduled",
  "review_started",
  "review_completed",
  "achievement_unlocked",
  "weekly_rhythm_progressed",
  "dossier_opened",
  "settings_changed",
]);
export const analyticsEventSchema = z.object({
  id,
  name: analyticsEventNameSchema,
  occurredAt: isoDate,
  sessionId: id,
  subjectId: id.optional(),
  moduleId: id.optional(),
  episodeId: id.optional(),
  conceptId: id.optional(),
  assessmentId: id.optional(),
  properties: z.record(z.string(), z.unknown()),
});

export type AnalyticsEventName = z.infer<typeof analyticsEventNameSchema>;
