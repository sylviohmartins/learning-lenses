import { z } from "zod";
import { analyticsEventSchema, conceptStateSchema, masteryEvidenceSchema } from "@/content/schemas";

export const achievementIdSchema = z.enum(["first-source", "transition", "transfer", "module"]);
export const reviewStateSchema = z.object({
  id: z.string(),
  conceptId: z.string(),
  assessmentId: z.string(),
  dueAt: z.string().datetime(),
  intervalIndex: z.number().int().min(0).max(3),
  attempts: z.number().int().min(0),
  status: z.enum(["scheduled", "due", "completed"]),
  misconceptionPriority: z.enum(["normal", "high"]),
  createdAt: z.string().datetime(),
  lastReviewedAt: z.string().datetime().optional(),
});
const responseSchema = z.object({
  response: z.union([z.string(), z.array(z.string()), z.record(z.string(), z.string())]),
  correct: z.boolean(),
  answeredAt: z.string().datetime(),
});

export const persistedStateSchema = z.object({
  schemaVersion: z.literal(1),
  user: z.object({ onboardingComplete: z.boolean(), createdAt: z.string().datetime() }),
  progress: z.object({
    moduleStarted: z.boolean(),
    moduleComplete: z.boolean(),
    completedEpisodeIds: z.array(z.string()),
    currentEpisodeId: z.string().optional(),
    responses: z.record(z.string(), responseSchema),
    recentAchievementId: achievementIdSchema.optional(),
  }),
  concepts: z.record(z.string(), conceptStateSchema),
  reviews: z.array(reviewStateSchema),
  evidence: z.array(masteryEvidenceSchema),
  xp: z.number().int().min(0),
  achievements: z.array(
    z.object({ id: achievementIdSchema, unlockedAt: z.string().datetime().optional() }),
  ),
  weeklyRhythm: z.object({
    target: z.union([z.literal(2), z.literal(3), z.literal(4), z.literal(5)]),
    weekKey: z.string(),
    usefulSessionDates: z.array(z.string()),
    activityByDate: z.record(
      z.string(),
      z.object({
        episodes: z.number().int().min(0),
        reviews: z.number().int().min(0),
        transfers: z.number().int().min(0),
      }),
    ),
  }),
  settings: z.object({
    reducedMotion: z.enum(["system", "reduce", "allow"]),
    clockOffsetDays: z.number().int().min(0).max(365),
  }),
  analytics: z.array(analyticsEventSchema).max(300),
});

export type PersistedState = z.infer<typeof persistedStateSchema>;
