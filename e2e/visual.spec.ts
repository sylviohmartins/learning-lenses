import { test, expect } from "@playwright/test";
import { mkdir } from "node:fs/promises";
import { reset, startModule } from "./helpers";

const viewports = [
  { width: 320, height: 568 },
  { width: 360, height: 800 },
  { width: 390, height: 844 },
  { width: 430, height: 932 },
  { width: 768, height: 1024 },
  { width: 1280, height: 800 },
  { width: 1440, height: 900 },
];

test("captura e valida os sete viewports obrigatórios", async ({ page }) => {
  test.setTimeout(180_000);
  await mkdir("artifacts/screenshots", { recursive: true });
  for (const viewport of viewports) {
    await page.setViewportSize(viewport);
    await reset(page);
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
    );
    expect(overflow, `overflow em ${viewport.width}x${viewport.height}`).toBe(false);
    await page.screenshot({
      path: `artifacts/screenshots/home-${viewport.width}x${viewport.height}.png`,
    });
    await startModule(page);
    await page.screenshot({
      path: `artifacts/screenshots/episode-${viewport.width}x${viewport.height}.png`,
    });
    await page
      .getByRole("region", { name: "Qual parte parece mais suspeita?" })
      .scrollIntoViewIfNeeded();
    await page.evaluate(() => window.scrollBy(0, -76));
    await page.screenshot({
      path: `artifacts/screenshots/interaction-${viewport.width}x${viewport.height}.png`,
    });
    const interactionBefore = await page.locator(".interaction").boundingBox();
    const actionBefore = await page
      .getByRole("button", { name: "Conferir resposta" })
      .evaluate((element) => element.getBoundingClientRect().top + window.scrollY);
    await page.getByRole("button", { name: "Conferir resposta" }).click();
    await expect(page.getByRole("alert")).toContainText("Escolha ou escreva uma resposta");
    await page.screenshot({
      path: `artifacts/screenshots/interaction-error-${viewport.width}x${viewport.height}.png`,
    });
    await page
      .getByRole("radio", { name: /acho que sei/ })
      .locator("..")
      .click();
    await expect(page.getByRole("alert")).toHaveCount(0);
    await page.getByRole("radio", { name: "Tudo foi trocado em 2026." }).locator("..").click();
    const interactionSelected = await page.locator(".interaction").boundingBox();
    const actionSelected = await page
      .getByRole("button", { name: "Conferir resposta" })
      .evaluate((element) => element.getBoundingClientRect().top + window.scrollY);
    expect(interactionSelected?.height).toBeCloseTo(interactionBefore?.height ?? 0, 1);
    expect(actionSelected).toBeCloseTo(actionBefore, 1);
    await page.screenshot({
      path: `artifacts/screenshots/interaction-selected-${viewport.width}x${viewport.height}.png`,
    });
    await page.getByRole("button", { name: "Quero uma pista" }).click();
    await page.screenshot({
      path: `artifacts/screenshots/interaction-hint-${viewport.width}x${viewport.height}.png`,
    });
    await page.getByRole("button", { name: "Conferir resposta" }).click();
    await expect(page.getByTestId("feedback")).toBeVisible();
    await page.screenshot({
      path: `artifacts/screenshots/interaction-feedback-${viewport.width}x${viewport.height}.png`,
    });
    await page.getByRole("button", { name: /Continuar/ }).click();
    await expect(
      page.getByRole("heading", { name: "A regra, sem telefone sem fio" }),
    ).toBeVisible();
    await page.getByRole("button", { name: "De onde saiu essa fofoca?" }).click();
    await page.screenshot({
      path: `artifacts/screenshots/source-${viewport.width}x${viewport.height}.png`,
    });
  }
});
