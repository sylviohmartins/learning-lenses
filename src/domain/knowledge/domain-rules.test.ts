import { concepts, lensMappings, sources } from "@/content";
import { prerequisitesMet } from "./prerequisites";
import { sourceNeedsUpdate } from "./freshness";
import { lensSuitabilityScore } from "@/domain/lens/suitability";
describe("regras editoriais e da lente", () => {
  it("valida pré-requisitos", () => {
    expect(prerequisitesMet(concepts[0]!, [])).toBe(true);
    expect(prerequisitesMet({ ...concepts[0]!, prerequisiteIds: ["cbs"] }, [])).toBe(false);
  });
  it("aplica freshness por classe", () => {
    expect(
      sourceNeedsUpdate(
        sources.find((item) => item.freshnessClass === "operational")!,
        new Date("2026-09-29T00:00:01.000Z"),
      ),
    ).toBe(true);
  });
  it("rejeita lens mapping abaixo de hard gate", () => {
    const value = { ...lensMappings[0]!.suitability, structuralFit: 59 };
    expect(lensSuitabilityScore(value).classification).toBe("rejected");
  });
  it("classifica o mapping P0 como bom", () => {
    expect(lensSuitabilityScore(lensMappings[0]!.suitability).classification).toBe("good");
  });
});
