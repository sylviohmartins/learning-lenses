import { z } from "zod";
import { analyticsEventSchema, conceptStateSchema, masteryEvidenceSchema } from "@/content/schemas";
import { persistedStateSchema, reviewStateSchema, type PersistedState } from "@/persistence/schema";

export const participantCodeSchema = z
  .string()
  .trim()
  .min(2, "Use pelo menos 2 caracteres.")
  .max(32, "Use no máximo 32 caracteres.")
  .regex(/^[A-Za-z0-9_-]+$/, "Use apenas letras, números, hífen ou sublinhado.");

const responseResultSchema = z.object({
  responseId: z.string(),
  correct: z.boolean(),
  answeredAt: z.string().datetime(),
});

export const researchExportSchema = z.object({
  exportSchemaVersion: z.literal(1),
  generatedAt: z.string().datetime(),
  participantCode: participantCodeSchema.optional(),
  application: z.object({
    stateSchemaVersion: z.literal(1),
    simulationOffsetDays: z.number().int().min(0).max(365),
  }),
  learning: z.object({
    createdAt: z.string().datetime(),
    moduleStarted: z.boolean(),
    moduleComplete: z.boolean(),
    completedEpisodeIds: z.array(z.string()),
    currentEpisodeId: z.string().optional(),
    responses: z.array(responseResultSchema),
    concepts: z.array(conceptStateSchema),
    reviews: z.array(reviewStateSchema),
    evidence: z.array(masteryEvidenceSchema),
    xp: z.number().int().min(0),
    achievements: persistedStateSchema.shape.achievements,
    weeklyRhythm: persistedStateSchema.shape.weeklyRhythm,
    analytics: z.array(analyticsEventSchema),
  }),
});

export type ResearchExport = z.infer<typeof researchExportSchema>;

const allowedAnalyticsPropertyKeys = new Set([
  "achievementId",
  "completed",
  "competenceFeedback",
  "confidence",
  "correct",
  "dueAt",
  "from",
  "kind",
  "misconceptionId",
  "outcome",
  "repeated",
  "review",
  "reviewId",
  "sourceId",
  "target",
  "to",
  "type",
  "weeklyTarget",
]);

function sanitizeAnalyticsProperties(properties: Record<string, unknown>): Record<string, unknown> {
  return Object.fromEntries(
    Object.entries(properties).filter(([key]) => allowedAnalyticsPropertyKeys.has(key)),
  );
}

export function createResearchExport(
  state: PersistedState,
  participantCode?: string,
  generatedAt = new Date(),
): ResearchExport {
  const normalizedCode = participantCode?.trim() || undefined;
  return researchExportSchema.parse({
    exportSchemaVersion: 1,
    generatedAt: generatedAt.toISOString(),
    participantCode: normalizedCode,
    application: {
      stateSchemaVersion: state.schemaVersion,
      simulationOffsetDays: state.settings.clockOffsetDays,
    },
    learning: {
      createdAt: state.user.createdAt,
      moduleStarted: state.progress.moduleStarted,
      moduleComplete: state.progress.moduleComplete,
      completedEpisodeIds: state.progress.completedEpisodeIds,
      currentEpisodeId: state.progress.currentEpisodeId,
      responses: Object.entries(state.progress.responses).map(([responseId, response]) => ({
        responseId,
        correct: response.correct,
        answeredAt: response.answeredAt,
      })),
      concepts: Object.values(state.concepts),
      reviews: state.reviews,
      evidence: state.evidence,
      xp: state.xp,
      achievements: state.achievements,
      weeklyRhythm: state.weeklyRhythm,
      analytics: state.analytics.map((event) => ({
        ...event,
        properties: sanitizeAnalyticsProperties(event.properties),
      })),
    },
  });
}

export function researchExportFilename(exported: ResearchExport): string {
  const code = exported.participantCode ? `-${exported.participantCode}` : "";
  const timestamp = exported.generatedAt.replaceAll(":", "-");
  return `fuxico-fiscal-pilot${code}-${timestamp}.json`;
}

export function downloadResearchExport(exported: ResearchExport): string {
  const serialized = JSON.stringify(researchExportSchema.parse(exported), null, 2);
  const url = URL.createObjectURL(new Blob([serialized], { type: "application/json" }));
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = researchExportFilename(exported);
  document.body.append(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
  return anchor.download;
}
