import { act, renderHook, waitFor } from "@testing-library/react";
import type { ReactNode } from "react";
import { AppProvider, useApp } from "./AppProvider";
import { STORAGE_KEY } from "@/persistence/storage";

const wrapper = ({ children }: { children: ReactNode }) => <AppProvider>{children}</AppProvider>;

describe("integração de aprendizagem e estado", () => {
  it("resposta gera evidence, mastery, review e misconception", () => {
    const { result } = renderHook(() => useApp(), { wrapper });
    act(() => {
      result.current.answerAssessment("a-ep1-transicao", "a", { confidence: 3, episodeId: "ep-1" });
    });
    expect(result.current.state.evidence).toHaveLength(1);
    expect(result.current.state.concepts.transicao?.mastery).toBeLessThan(30);
    expect(result.current.state.concepts.transicao?.misconceptionIds).toContain("m-terminou-2026");
    expect(result.current.state.reviews).toHaveLength(1);
    expect(
      result.current.state.analytics.some((event) => event.name === "misconception_triggered"),
    ).toBe(true);
  });
  it("concluir episódio atualiza progresso, XP e ritmo", () => {
    const { result } = renderHook(() => useApp(), { wrapper });
    act(() => {
      result.current.completeEpisode("ep-1");
    });
    expect(result.current.state.progress.completedEpisodeIds).toContain("ep-1");
    expect(result.current.state.xp).toBe(20);
    expect(result.current.state.weeklyRhythm.usefulSessionDates).toHaveLength(1);
  });
  it("abrir fonte desbloqueia exatamente a conquista correspondente", () => {
    const { result } = renderHook(() => useApp(), { wrapper });
    act(() => {
      result.current.openSource("ec-132-2023");
    });
    expect(
      result.current.state.achievements.find((item) => item.id === "first-source")?.unlockedAt,
    ).toBeTruthy();
    expect(result.current.state.achievements.filter((item) => item.unlockedAt)).toHaveLength(1);
  });
  it("reload restaura progresso persistido", async () => {
    const first = renderHook(() => useApp(), { wrapper });
    act(() => {
      first.result.current.completeOnboarding();
      first.result.current.completeEpisode("ep-1");
    });
    await waitFor(() => {
      expect(localStorage.getItem(STORAGE_KEY)).toContain("ep-1");
    });
    first.unmount();
    const second = renderHook(() => useApp(), { wrapper });
    expect(second.result.current.state.user.onboardingComplete).toBe(true);
    expect(second.result.current.state.progress.completedEpisodeIds).toContain("ep-1");
  });
  it("time travel torna revisão vencida e responder atualiza próxima agenda", () => {
    const { result } = renderHook(() => useApp(), { wrapper });
    act(() => {
      result.current.answerAssessment("a-ep1-transicao", "b", { confidence: 2 });
    });
    const reviewId = result.current.state.reviews[0]!.id;
    const firstDue = result.current.state.reviews[0]!.dueAt;
    act(() => {
      result.current.setClockOffset(1);
    });
    expect(result.current.clock.now().getTime()).toBeGreaterThanOrEqual(
      new Date(firstDue).getTime(),
    );
    act(() => {
      result.current.answerAssessment("a-ep1-transicao", "b", { confidence: 2, reviewId });
    });
    expect(result.current.state.reviews[0]!.attempts).toBe(1);
    expect(new Date(result.current.state.reviews[0]!.dueAt).getTime()).toBeGreaterThan(
      new Date(firstDue).getTime(),
    );
  });
});
