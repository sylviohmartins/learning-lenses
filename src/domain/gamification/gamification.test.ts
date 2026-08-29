import {
  achievementsFor,
  progressWeeklyRhythm,
  weekKey,
  xpFor,
  type WeeklyRhythmState,
} from "./gamification";
describe("gamificação separada de mastery", () => {
  it("limita repetição a 20% do XP original", () => {
    expect(xpFor("episode")).toBe(20);
    expect(xpFor("episode", true)).toBe(4);
    expect(xpFor("transfer")).toBe(25);
  });
  it("conta episódio como sessão útil e exige duas reviews", () => {
    const date = new Date("2026-08-29T12:00:00.000Z");
    const base: WeeklyRhythmState = {
      target: 3,
      weekKey: weekKey(date),
      usefulSessionDates: [],
      activityByDate: {},
    };
    const oneReview = progressWeeklyRhythm(base, date, "review");
    expect(oneReview.usefulSessionDates).toHaveLength(0);
    const twoReviews = progressWeeklyRhythm(oneReview, date, "review");
    expect(twoReviews.usefulSessionDates).toHaveLength(1);
    const episode = progressWeeklyRhythm(base, date, "episode");
    expect(episode.usefulSessionDates).toHaveLength(1);
  });
  it("desbloqueia somente as quatro conquistas P0 pelas regras definidas", () => {
    expect(
      achievementsFor({
        officialSourcesOpened: 1,
        transitionMisconceptionCorrect: true,
        correctTransfers: 1,
        moduleCompleted: true,
      }),
    ).toEqual(["first-source", "transition", "transfer", "module"]);
    expect(
      achievementsFor({
        officialSourcesOpened: 0,
        transitionMisconceptionCorrect: false,
        correctTransfers: 0,
        moduleCompleted: false,
      }),
    ).toEqual([]);
  });
});
