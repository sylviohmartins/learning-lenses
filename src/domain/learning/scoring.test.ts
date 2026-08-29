import { getAssessment } from "@/content";
import { scoreAssessment } from "./scoring";
describe("scoring determinístico", () => {
  it("pontua escolha, ordem e matching", () => {
    expect(scoreAssessment(getAssessment("a-ep1-transicao")!, "b")).toBe(true);
    expect(scoreAssessment(getAssessment("a-ep4-ordem")!, ["2026", "2027", "2029", "2033"])).toBe(
      true,
    );
    expect(
      scoreAssessment(getAssessment("a-ep2-matching")!, { cbs: "federal", ibs: "subnacional" }),
    ).toBe(true);
  });
  it("aceita transferência semanticamente equivalente por conceitos mínimos", () => {
    expect(
      scoreAssessment(
        getAssessment("a-final-transfer")!,
        "2026 foi só o início do teste; existe transição gradual até 2033.",
      ),
    ).toBe(true);
    expect(scoreAssessment(getAssessment("a-final-transfer")!, "Sim, acabou.")).toBe(false);
  });
});
