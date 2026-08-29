import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { assessments, content, getAssessment } from "@/content";
import type { AssessmentResponse } from "@/domain/learning/scoring";
import { scoreAssessment } from "@/domain/learning/scoring";
import { calculateMastery, type EvidenceWithDifficulty } from "@/domain/mastery/mastery";
import { OffsetClock, hoursBetween } from "@/domain/review/clock";
import { completeReview, scheduleInitialReview } from "@/domain/review/review";
import {
  progressWeeklyRhythm,
  xpFor,
  type AchievementId,
} from "@/domain/gamification/gamification";
import { addEvent } from "@/analytics/events";
import { loadState, resetState, saveState } from "@/persistence/storage";
import type { PersistedState } from "@/persistence/schema";

interface AnswerOptions {
  confidence?: 1 | 2 | 3;
  hintUsed?: boolean;
  episodeId?: string;
  reviewId?: string;
}
interface AppContextValue {
  state: PersistedState;
  recoveryMessage?: string;
  clock: OffsetClock;
  startOnboarding(): void;
  completeOnboarding(): void;
  startEpisode(id: string): void;
  recordInteractionViewed(id: string, episodeId?: string): void;
  answerAssessment(id: string, response: AssessmentResponse, options?: AnswerOptions): boolean;
  completeEpisode(id: string): void;
  completeModule(): void;
  openSource(id: string): void;
  openDossier(conceptId?: string): void;
  startReview(id: string): void;
  setWeeklyTarget(target: 2 | 3 | 4 | 5): void;
  setReducedMotion(value: "system" | "reduce" | "allow"): void;
  setClockOffset(days: number): void;
  dismissAchievement(): void;
  resetAll(): void;
}

const AppContext = createContext<AppContextValue | null>(null);
const nowFor = (state: PersistedState) => new OffsetClock(state.settings.clockOffsetDays).now();

function addWeeklyActivity(
  state: PersistedState,
  occurredAt: string,
  activity: "episode" | "review" | "transfer",
): PersistedState {
  const rhythm = progressWeeklyRhythm(state.weeklyRhythm, new Date(occurredAt), activity);
  let next = { ...state, weeklyRhythm: rhythm };
  if (rhythm.usefulSessionDates.length > state.weeklyRhythm.usefulSessionDates.length) {
    next = addEvent(
      next,
      "weekly_rhythm_progressed",
      occurredAt,
      {},
      { completed: rhythm.usefulSessionDates.length, target: rhythm.target },
    );
  }
  return next;
}

function unlock(
  state: PersistedState,
  achievementId: AchievementId,
  occurredAt: string,
): PersistedState {
  const achievement = state.achievements.find((item) => item.id === achievementId);
  if (!achievement || achievement.unlockedAt) return state;
  let next: PersistedState = {
    ...state,
    achievements: state.achievements.map((item) =>
      item.id === achievementId ? { ...item, unlockedAt: occurredAt } : item,
    ),
    progress: { ...state.progress, recentAchievementId: achievementId },
  };
  next = addEvent(next, "achievement_unlocked", occurredAt, {}, { achievementId });
  return next;
}

export function AppProvider({ children }: { children: ReactNode }) {
  const initial = useMemo(() => loadState(), []);
  const [state, setState] = useState<PersistedState>(initial.state);
  const [recoveryMessage, setRecoveryMessage] = useState(initial.message);
  useEffect(() => {
    saveState(state);
  }, [state]);
  useEffect(() => {
    setState((current) =>
      addEvent(current, "app_started", nowFor(current).toISOString(), {
        subjectId: content.subject.id,
      }),
    );
  }, []);

  const mutate = useCallback(
    (fn: (current: PersistedState, occurredAt: string) => PersistedState) => {
      setState((current) => fn(current, nowFor(current).toISOString()));
    },
    [],
  );

  const startOnboarding = useCallback(
    () => mutate((current, occurredAt) => addEvent(current, "onboarding_started", occurredAt)),
    [mutate],
  );
  const completeOnboarding = useCallback(
    () =>
      mutate((current, occurredAt) => {
        let next: PersistedState = {
          ...current,
          user: { ...current.user, onboardingComplete: true },
          progress: { ...current.progress, moduleStarted: true, currentEpisodeId: "ep-1" },
        };
        next = addEvent(next, "onboarding_completed", occurredAt);
        return addEvent(next, "module_started", occurredAt, {
          moduleId: content.module.id,
          subjectId: content.subject.id,
        });
      }),
    [mutate],
  );
  const startEpisode = useCallback(
    (id: string) =>
      mutate((current, occurredAt) =>
        addEvent(
          { ...current, progress: { ...current.progress, currentEpisodeId: id } },
          "episode_started",
          occurredAt,
          { moduleId: content.module.id, episodeId: id },
        ),
      ),
    [mutate],
  );
  const recordInteractionViewed = useCallback(
    (id: string, episodeId?: string) =>
      mutate((current, occurredAt) =>
        addEvent(current, "interaction_viewed", occurredAt, { assessmentId: id, episodeId }),
      ),
    [mutate],
  );

  const answerAssessment = useCallback(
    (id: string, response: AssessmentResponse, options: AnswerOptions = {}) => {
      const assessment = getAssessment(id);
      if (!assessment) return false;
      const correct = scoreAssessment(assessment, response);
      mutate((current, occurredAt) => {
        const review = options.reviewId
          ? current.reviews.find((item) => item.id === options.reviewId)
          : undefined;
        const responseKey = review ? `review:${review.id}:${review.attempts}` : id;
        if (current.progress.responses[responseKey]) return current;
        let next: PersistedState = {
          ...current,
          progress: {
            ...current.progress,
            responses: {
              ...current.progress.responses,
              [responseKey]: { response, correct, answeredAt: occurredAt },
            },
          },
        };
        if (options.confidence)
          next = addEvent(
            next,
            "confidence_recorded",
            occurredAt,
            { assessmentId: id },
            { confidence: options.confidence },
          );
        next = addEvent(
          next,
          "interaction_answered",
          occurredAt,
          { assessmentId: id, episodeId: options.episodeId },
          { correct, kind: assessment.kind, review: Boolean(review) },
        );
        const newEvidence = assessment.conceptIds.map((conceptId) => ({
          id: crypto.randomUUID(),
          conceptId,
          assessmentId: id,
          outcome: correct ? 1 : 0,
          evidenceType: assessment.type,
          hintUsed: options.hintUsed ?? false,
          confidence: options.confidence,
          occurredAt,
          delaySinceLearningHours: hoursBetween(current.user.createdAt, new Date(occurredAt)),
        }));
        next = { ...next, evidence: [...next.evidence, ...newEvidence] };
        for (const evidence of newEvidence) {
          const all = [...next.evidence]
            .filter((item) => item.conceptId === evidence.conceptId)
            .map((item): EvidenceWithDifficulty => ({
              ...item,
              difficulty: getAssessment(item.assessmentId)?.difficulty ?? 1,
            }));
          const result = calculateMastery(all);
          const previous = next.concepts[evidence.conceptId];
          next = {
            ...next,
            concepts: {
              ...next.concepts,
              [evidence.conceptId]: {
                conceptId: evidence.conceptId,
                mastery: result.mastery,
                level: result.level,
                evidenceIds: all.map((item) => item.id),
                misconceptionIds:
                  !correct && assessment.misconceptionId
                    ? Array.from(
                        new Set([
                          ...(previous?.misconceptionIds ?? []),
                          assessment.misconceptionId,
                        ]),
                      )
                    : (previous?.misconceptionIds ?? []),
                nextReviewAt: previous?.nextReviewAt,
                updatedAt: occurredAt,
              },
            },
          };
          next = addEvent(
            next,
            "mastery_evidence_added",
            occurredAt,
            { conceptId: evidence.conceptId, assessmentId: id },
            { outcome: evidence.outcome, type: evidence.evidenceType },
          );
          if (previous?.mastery !== result.mastery)
            next = addEvent(
              next,
              "mastery_changed",
              occurredAt,
              { conceptId: evidence.conceptId },
              { from: previous?.mastery ?? 30, to: result.mastery },
            );
          if (!review) {
            const scheduled = scheduleInitialReview(
              evidence.conceptId,
              id,
              new OffsetClock(current.settings.clockOffsetDays),
              crypto.randomUUID(),
            );
            next = {
              ...next,
              reviews: [...next.reviews, scheduled],
              concepts: {
                ...next.concepts,
                [evidence.conceptId]: {
                  ...next.concepts[evidence.conceptId]!,
                  nextReviewAt: scheduled.dueAt,
                },
              },
            };
            next = addEvent(
              next,
              "review_scheduled",
              occurredAt,
              { conceptId: evidence.conceptId, assessmentId: id },
              { dueAt: scheduled.dueAt },
            );
          }
        }
        if (!correct && assessment.misconceptionId)
          next = addEvent(
            next,
            "misconception_triggered",
            occurredAt,
            { assessmentId: id },
            { misconceptionId: assessment.misconceptionId },
          );
        if (correct && assessment.misconceptionId === "m-terminou-2026")
          next = unlock(next, "transition", occurredAt);
        if (correct && assessment.type === "transfer") {
          next = addWeeklyActivity(
            { ...next, xp: next.xp + xpFor("transfer") },
            occurredAt,
            "transfer",
          );
          next = unlock(next, "transfer", occurredAt);
        } else if (correct && assessment.type === "recall" && !review)
          next = { ...next, xp: next.xp + xpFor("retrieval") };
        if (review) {
          const completed = completeReview(
            review,
            correct ? "correct" : "wrong",
            options.hintUsed ?? false,
            options.confidence,
            new OffsetClock(current.settings.clockOffsetDays),
          );
          next = addWeeklyActivity(
            {
              ...next,
              reviews: next.reviews.map((item) =>
                item.id === review.id ? completed.review : item,
              ),
              xp: next.xp + xpFor("review", review.attempts > 0),
            },
            occurredAt,
            "review",
          );
          next = addEvent(
            next,
            "review_completed",
            occurredAt,
            { conceptId: review.conceptId, assessmentId: id },
            { correct, competenceFeedback: completed.competenceFeedback },
          );
        }
        return addEvent(next, "feedback_viewed", occurredAt, { assessmentId: id }, { correct });
      });
      return correct;
    },
    [mutate],
  );

  const completeEpisode = useCallback(
    (id: string) =>
      mutate((current, occurredAt) => {
        const repeated = current.progress.completedEpisodeIds.includes(id);
        const episodeIndex = content.module.episodeIds.indexOf(id);
        const nextEpisode = content.module.episodeIds[episodeIndex + 1];
        const next = addWeeklyActivity(
          {
            ...current,
            xp: current.xp + xpFor("episode", repeated),
            progress: {
              ...current.progress,
              completedEpisodeIds: repeated
                ? current.progress.completedEpisodeIds
                : [...current.progress.completedEpisodeIds, id],
              currentEpisodeId: nextEpisode,
            },
          },
          occurredAt,
          "episode",
        );
        return addEvent(
          next,
          "episode_completed",
          occurredAt,
          { moduleId: content.module.id, episodeId: id },
          { repeated },
        );
      }),
    [mutate],
  );
  const completeModule = useCallback(
    () =>
      mutate((current, occurredAt) => {
        if (current.progress.moduleComplete) return current;
        let next = {
          ...current,
          xp: current.xp + xpFor("module"),
          progress: { ...current.progress, moduleComplete: true },
        };
        next = addEvent(next, "module_completed", occurredAt, { moduleId: content.module.id });
        return unlock(next, "module", occurredAt);
      }),
    [mutate],
  );
  const openSource = useCallback(
    (id: string) =>
      mutate((current, occurredAt) =>
        unlock(
          addEvent(current, "source_opened", occurredAt, {}, { sourceId: id }),
          "first-source",
          occurredAt,
        ),
      ),
    [mutate],
  );
  const openDossier = useCallback(
    (conceptId?: string) =>
      mutate((current, occurredAt) =>
        addEvent(current, "dossier_opened", occurredAt, { conceptId }),
      ),
    [mutate],
  );
  const startReview = useCallback(
    (id: string) =>
      mutate((current, occurredAt) =>
        addEvent(current, "review_started", occurredAt, {}, { reviewId: id }),
      ),
    [mutate],
  );
  const setWeeklyTarget = useCallback(
    (target: 2 | 3 | 4 | 5) =>
      mutate((current, occurredAt) =>
        addEvent(
          { ...current, weeklyRhythm: { ...current.weeklyRhythm, target } },
          "settings_changed",
          occurredAt,
          {},
          { weeklyTarget: target },
        ),
      ),
    [mutate],
  );
  const setReducedMotion = useCallback(
    (value: "system" | "reduce" | "allow") =>
      mutate((current, occurredAt) =>
        addEvent(
          { ...current, settings: { ...current.settings, reducedMotion: value } },
          "settings_changed",
          occurredAt,
          {},
          { reducedMotion: value },
        ),
      ),
    [mutate],
  );
  const setClockOffset = useCallback(
    (days: number) =>
      mutate((current) => ({
        ...current,
        settings: { ...current.settings, clockOffsetDays: days },
      })),
    [mutate],
  );
  const dismissAchievement = useCallback(
    () =>
      mutate((current) => ({
        ...current,
        progress: { ...current.progress, recentAchievementId: undefined },
      })),
    [mutate],
  );
  const resetAll = useCallback(() => {
    setState(resetState());
    setRecoveryMessage(undefined);
  }, []);

  const value = useMemo<AppContextValue>(
    () => ({
      state,
      recoveryMessage,
      clock: new OffsetClock(state.settings.clockOffsetDays),
      startOnboarding,
      completeOnboarding,
      startEpisode,
      recordInteractionViewed,
      answerAssessment,
      completeEpisode,
      completeModule,
      openSource,
      openDossier,
      startReview,
      setWeeklyTarget,
      setReducedMotion,
      setClockOffset,
      dismissAchievement,
      resetAll,
    }),
    [
      state,
      recoveryMessage,
      startOnboarding,
      completeOnboarding,
      startEpisode,
      recordInteractionViewed,
      answerAssessment,
      completeEpisode,
      completeModule,
      openSource,
      openDossier,
      startReview,
      setWeeklyTarget,
      setReducedMotion,
      setClockOffset,
      dismissAchievement,
      resetAll,
    ],
  );
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp(): AppContextValue {
  const value = useContext(AppContext);
  if (!value) throw new Error("useApp precisa de AppProvider");
  return value;
}

export const assessmentById = Object.fromEntries(assessments.map((item) => [item.id, item]));
