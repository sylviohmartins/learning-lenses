import {
  assessments,
  concepts,
  content,
  episodes,
  lensMappings,
  misconceptions,
  sources,
  validateContentGraph,
} from ".";
import {
  assessmentSchema,
  conceptSchema,
  episodeSchema,
  lensMappingSchema,
  misconceptionSchema,
  moduleSchema,
  sourceSchema,
  subjectSchema,
} from "./schemas";
describe("content as data", () => {
  it("valida todos os schemas obrigatórios", () => {
    expect(() => subjectSchema.parse(content.subject)).not.toThrow();
    expect(() => conceptSchema.array().parse(concepts)).not.toThrow();
    expect(() => sourceSchema.array().parse(sources)).not.toThrow();
    expect(() => assessmentSchema.array().parse(assessments)).not.toThrow();
    expect(() => episodeSchema.array().parse(episodes)).not.toThrow();
    expect(() => moduleSchema.parse(content.module)).not.toThrow();
    expect(() => misconceptionSchema.array().parse(misconceptions)).not.toThrow();
    expect(() => lensMappingSchema.array().parse(lensMappings)).not.toThrow();
  });
  it("tem cinco episódios reais e seis avaliações finais", () => {
    expect(episodes).toHaveLength(5);
    expect(content.module.finalAssessmentIds).toHaveLength(6);
    expect(episodes.every((episode) => episode.status === "verified")).toBe(true);
  });
  it("tem fonte em toda afirmação e integridade referencial", () => {
    expect(() => validateContentGraph()).not.toThrow();
    expect(assessments.every((item) => item.sourceIds.length > 0)).toBe(true);
  });
  it("inclui todos os tipos de interação P0", () => {
    expect(new Set(assessments.map((item) => item.kind))).toEqual(
      new Set(["single-choice", "boolean", "order", "matching", "short-text"]),
    );
  });
});
