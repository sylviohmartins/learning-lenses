import { createInitialState } from "@/persistence/storage";
import {
  createResearchExport,
  participantCodeSchema,
  researchExportFilename,
  researchExportSchema,
} from "./export";

describe("exportação pseudônima do piloto", () => {
  it("exporta resultados sem texto livre nem preferências de acessibilidade", () => {
    const state = createInitialState(new Date("2026-08-29T10:00:00.000Z"));
    state.progress.responses.transfer = {
      response: "Meu nome e qualquer texto livre não devem sair",
      correct: true,
      answeredAt: "2026-08-29T10:15:00.000Z",
    };
    state.settings.reducedMotion = "reduce";
    state.analytics.push({
      id: "event-settings",
      name: "settings_changed",
      occurredAt: "2026-08-29T10:20:00.000Z",
      sessionId: "session-test",
      properties: { reducedMotion: "reduce", freeText: "não exportar", weeklyTarget: 3 },
    });

    const exported = createResearchExport(state, " U01 ", new Date("2026-08-29T11:00:00.000Z"));
    const serialized = JSON.stringify(exported);

    expect(researchExportSchema.parse(exported)).toEqual(exported);
    expect(exported.participantCode).toBe("U01");
    expect(exported.learning.responses).toEqual([
      {
        responseId: "transfer",
        correct: true,
        answeredAt: "2026-08-29T10:15:00.000Z",
      },
    ]);
    expect(serialized).not.toContain("Meu nome");
    expect(serialized).not.toContain("reducedMotion");
    expect(serialized).not.toContain("não exportar");
    expect(exported.learning.analytics[0]?.properties).toEqual({ weeklyTarget: 3 });
  });

  it("valida código e gera nome de arquivo estável", () => {
    expect(participantCodeSchema.safeParse("nome com espaço").success).toBe(false);
    const exported = createResearchExport(
      createInitialState(new Date("2026-08-29T10:00:00.000Z")),
      "U_02",
      new Date("2026-08-29T11:00:00.000Z"),
    );
    expect(researchExportFilename(exported)).toBe(
      "fuxico-fiscal-pilot-U_02-2026-08-29T11-00-00.000Z.json",
    );
  });
});
