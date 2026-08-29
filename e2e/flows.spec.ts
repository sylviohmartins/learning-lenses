import { readFile } from "node:fs/promises";
import { expect, test } from "@playwright/test";
import { completeEpisodeOne, completeWholeModule, startModule } from "./helpers";

test("E2E 1 — usuário novo chega ao feedback e à fonte", async ({ page }) => {
  await startModule(page);
  await completeEpisodeOne(page);
  await page.getByRole("button", { name: "De onde saiu essa fofoca?" }).click();
  await expect(page.getByRole("dialog", { name: "O que sustenta esta regra" })).toBeVisible();
  await expect(page.getByRole("link", { name: /Abrir fonte oficial/ }).first()).toHaveAttribute(
    "href",
    /gov\.br|planalto/,
  );
});

test("E2E 2 — cinco episódios, avaliação, XP, achievement e dossiê", async ({ page }) => {
  await startModule(page);
  await completeWholeModule(page);
  await expect(
    page.getByRole("heading", { name: "A fofoca inteira, sem perder a fonte." }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Abrir meu dossiê" }).click();
  await expect(page.getByRole("heading", { name: "O que as evidências dizem" })).toBeVisible();
  const state = await page.evaluate(() =>
    JSON.parse(localStorage.getItem("fuxico-fiscal:state") ?? "{}"),
  );
  expect(state.progress.moduleComplete).toBe(true);
  expect(state.xp).toBeGreaterThanOrEqual(205);
  expect(
    state.achievements.find((item: { id: string }) => item.id === "module").unlockedAt,
  ).toBeTruthy();
});

test("E2E 3 — reload retoma no episódio correto", async ({ page }) => {
  await startModule(page);
  await completeEpisodeOne(page);
  await page.getByRole("button", { name: /Próximo episódio/ }).click();
  await expect(page.getByRole("heading", { name: "CBS e IBS são gêmeos?" })).toBeVisible();
  await page.reload();
  await expect(page.getByRole("heading", { name: "CBS e IBS são gêmeos?" })).toBeVisible();
  await page.getByRole("link", { name: "FUXICO FISCAL" }).click();
  await expect(page.getByRole("button", { name: "Continuar" })).toBeVisible();
});

test("E2E 4/5 — erro cria misconception; time travel libera review funcional", async ({ page }) => {
  await startModule(page);
  await completeEpisodeOne(page, false);
  let state = await page.evaluate(() =>
    JSON.parse(localStorage.getItem("fuxico-fiscal:state") ?? "{}"),
  );
  expect(state.concepts.transicao.misconceptionIds).toContain("m-terminou-2026");
  expect(state.reviews).toHaveLength(1);
  await page.getByRole("link", { name: "Configurações" }).click();
  await page.getByRole("button", { name: "+1d" }).click();
  await page.getByRole("link", { name: "Revisar" }).click();
  await page.getByRole("button", { name: "Revisar agora" }).click();
  await page
    .getByRole("radio", { name: /acho que sei/ })
    .locator("..")
    .click();
  await page.getByRole("radio", { name: "Tudo foi trocado em 2026." }).locator("..").click();
  await page.getByRole("button", { name: "Conferir resposta" }).click();
  await expect(page.getByTestId("feedback")).toContainText("isso");
  await page.getByRole("button", { name: /Continuar/ }).click();
  await expect(page.getByRole("heading", { name: "Nada voltou a circular ainda." })).toBeVisible();
  state = await page.evaluate(() =>
    JSON.parse(localStorage.getItem("fuxico-fiscal:state") ?? "{}"),
  );
  expect(state.reviews[0].attempts).toBe(1);
  expect(state.xp).toBeGreaterThanOrEqual(15);
});

test("E2E 6 — fluxo inicial apenas com teclado", async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => localStorage.clear());
  await page.reload();
  await page.keyboard.press("Tab");
  await page.keyboard.press("Tab");
  await page.keyboard.press("Tab");
  await page.keyboard.press("Tab");
  await page.keyboard.press("Enter");
  await expect(page.getByRole("heading", { name: /Aprenda a Reforma Tributária/ })).toBeVisible();
  await page.getByRole("button", { name: "Começar a fofoca" }).focus();
  await page.keyboard.press("Enter");
  await expect(
    page.getByRole("heading", { name: "Acabaram cinco impostos. Confia." }),
  ).toBeVisible();
  await page.getByRole("radio", { name: /acho que sei/ }).focus();
  await page.keyboard.press("Space");
  await page.getByRole("radio", { name: "Tudo foi trocado em 2026." }).focus();
  await page.keyboard.press("Space");
  await page.getByRole("button", { name: "Conferir resposta" }).focus();
  await page.keyboard.press("Enter");
  await expect(page.getByTestId("feedback")).toBeVisible();
});

test("E2E 7 — exportação do piloto é pseudônima e versionada", async ({ page }) => {
  await startModule(page);
  await completeEpisodeOne(page);
  await page.getByRole("link", { name: "Configurações" }).click();
  await page.getByLabel("Código do participante").fill("P001");

  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: "Baixar dados do piloto" }).click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toMatch(/^fuxico-fiscal-pilot-P001-/);

  const path = await download.path();
  if (!path) throw new Error("O arquivo de evidências não foi disponibilizado pelo navegador.");
  const exported = JSON.parse(await readFile(path, "utf8"));
  expect(exported.exportSchemaVersion).toBe(1);
  expect(exported.participantCode).toBe("P001");
  expect(exported.application.simulationOffsetDays).toBe(0);
  expect(exported.learning.responses).toHaveLength(1);
  expect(exported.learning.responses[0]).not.toHaveProperty("response");
  await expect(page.locator("#export-status")).toContainText("Arquivo baixado");
});
