import { FixedClock } from "./clock";
import { completeReview, scheduleInitialReview } from "./review";
const clock = new FixedClock(new Date("2026-08-29T12:00:00.000Z"));
describe("review engine", () => {
  it("agenda a aprendizagem para +1 dia", () => {
    expect(scheduleInitialReview("c", "a", clock, "r").dueAt).toBe("2026-08-30T12:00:00.000Z");
  });
  it("avança acerto forte para +3 dias", () => {
    const initial = scheduleInitialReview("c", "a", clock, "r");
    expect(completeReview(initial, "correct", false, 2, clock).review.dueAt).toBe(
      "2026-09-01T12:00:00.000Z",
    );
  });
  it("mantém intervalo com dica", () => {
    const initial = scheduleInitialReview("c", "a", clock, "r");
    expect(completeReview(initial, "correct", true, 2, clock).review.intervalIndex).toBe(0);
  });
  it("erro volta a +1 dia e confiança alta prioriza misconception", () => {
    const advanced = { ...scheduleInitialReview("c", "a", clock, "r"), intervalIndex: 2 };
    const result = completeReview(advanced, "wrong", false, 3, clock);
    expect(result.review.intervalIndex).toBe(0);
    expect(result.review.misconceptionPriority).toBe("high");
  });
  it("acerto com confiança baixa produz feedback de competência", () => {
    const result = completeReview(
      scheduleInitialReview("c", "a", clock, "r"),
      "correct",
      false,
      1,
      clock,
    );
    expect(result.competenceFeedback).toBe(true);
  });
});
