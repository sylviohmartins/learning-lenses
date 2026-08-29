import type { Clock } from "./clock";

export const REVIEW_INTERVAL_DAYS = [1, 3, 7, 21] as const;
export type ReviewOutcome = "correct" | "wrong";
export type MisconceptionPriority = "normal" | "high";

export interface ReviewState {
  id: string;
  conceptId: string;
  assessmentId: string;
  dueAt: string;
  intervalIndex: number;
  attempts: number;
  status: "scheduled" | "due" | "completed";
  misconceptionPriority: MisconceptionPriority;
  createdAt: string;
  lastReviewedAt?: string;
}

export function scheduleInitialReview(
  conceptId: string,
  assessmentId: string,
  clock: Clock,
  id: string,
): ReviewState {
  const due = clock.now();
  due.setDate(due.getDate() + REVIEW_INTERVAL_DAYS[0]);
  return {
    id,
    conceptId,
    assessmentId,
    dueAt: due.toISOString(),
    intervalIndex: 0,
    attempts: 0,
    status: "scheduled",
    misconceptionPriority: "normal",
    createdAt: clock.now().toISOString(),
  };
}

export function completeReview(
  review: ReviewState,
  outcome: ReviewOutcome,
  hintUsed: boolean,
  confidence: 1 | 2 | 3 | undefined,
  clock: Clock,
): { review: ReviewState; competenceFeedback: boolean } {
  let intervalIndex = review.intervalIndex;
  if (outcome === "wrong") intervalIndex = 0;
  else if (!hintUsed) intervalIndex = Math.min(REVIEW_INTERVAL_DAYS.length - 1, intervalIndex + 1);
  const due = clock.now();
  due.setDate(due.getDate() + REVIEW_INTERVAL_DAYS[intervalIndex]!);
  return {
    review: {
      ...review,
      dueAt: due.toISOString(),
      intervalIndex,
      attempts: review.attempts + 1,
      status: "scheduled",
      lastReviewedAt: clock.now().toISOString(),
      misconceptionPriority:
        outcome === "wrong" && confidence === 3 ? "high" : review.misconceptionPriority,
    },
    competenceFeedback: outcome === "correct" && confidence === 1,
  };
}

export const isReviewDue = (review: ReviewState, clock: Clock) =>
  new Date(review.dueAt).getTime() <= clock.now().getTime();
