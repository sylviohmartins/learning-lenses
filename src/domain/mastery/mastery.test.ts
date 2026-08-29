import {
  calculateMastery,
  delayWeight,
  evidenceValue,
  masteryLevel,
  type EvidenceWithDifficulty,
} from "./mastery";

const evidence = (overrides: Partial<EvidenceWithDifficulty> = {}): EvidenceWithDifficulty => ({
  id: crypto.randomUUID(),
  conceptId: "c",
  assessmentId: "a",
  outcome: 1,
  evidenceType: "recognition",
  hintUsed: false,
  occurredAt: "2026-08-29T12:00:00.000Z",
  delaySinceLearningHours: 0.5,
  difficulty: 1,
  ...overrides,
});

describe("mastery V1", () => {
  it("aplica os pesos de atraso e dica", () => {
    expect(delayWeight(0.5)).toBe(0.7);
    expect(delayWeight(12)).toBe(0.85);
    expect(delayWeight(48)).toBe(1);
    expect(delayWeight(100)).toBe(1.1);
    expect(delayWeight(200)).toBe(1.2);
    expect(evidenceValue(evidence({ hintUsed: true }))).toBeCloseTo(1 * 0.7 * 0.8 * 0.7 * 0.75);
  });
  it("mantém o prior de 30 na ausência de evidência", () => {
    expect(calculateMastery([]).mastery).toBe(30);
  });
  it("aplica gate 79 sem recall posterior", () => {
    const items = Array.from({ length: 40 }, (_, index) =>
      evidence({
        id: String(index),
        evidenceType: index % 2 ? "application" : "transfer",
        difficulty: 5,
        delaySinceLearningHours: 200,
      }),
    );
    expect(calculateMastery(items).mastery).toBe(79);
  });
  it("aplica gate 84 sem application e gate 89 sem transfer", () => {
    const recallAndTransfer = Array.from({ length: 40 }, (_, index) =>
      evidence({
        id: String(index),
        evidenceType: index % 2 ? "recall" : "transfer",
        difficulty: 5,
        delaySinceLearningHours: 200,
        occurredAt: index % 2 ? "2026-08-29T12:00:00.000Z" : "2026-08-30T12:00:00.000Z",
      }),
    );
    expect(calculateMastery(recallAndTransfer).mastery).toBe(84);
    const recallAndApplication = recallAndTransfer.map((item) => ({
      ...item,
      evidenceType: item.evidenceType === "transfer" ? ("application" as const) : item.evidenceType,
    }));
    expect(calculateMastery(recallAndApplication).mastery).toBe(89);
  });
  it("só consolida com recall posterior, application, transfer e dias diferentes", () => {
    const types = ["recall", "application", "transfer"] as const;
    const items = Array.from({ length: 45 }, (_, index) =>
      evidence({
        id: String(index),
        evidenceType: types[index % 3]!,
        difficulty: 5,
        delaySinceLearningHours: 200,
        occurredAt: index % 2 ? "2026-08-29T12:00:00.000Z" : "2026-08-30T12:00:00.000Z",
      }),
    );
    expect(calculateMastery(items).level).toBe("consolidated");
  });
  it("classifica todos os níveis", () => {
    expect(masteryLevel(39)).toBe("discovering");
    expect(masteryLevel(40)).toBe("familiar");
    expect(masteryLevel(65)).toBe("understood");
    expect(masteryLevel(80)).toBe("proficient");
    expect(masteryLevel(90)).toBe("consolidated");
  });
});
