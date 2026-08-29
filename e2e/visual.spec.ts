import { test, expect } from "@playwright/test";
import { mkdir } from "node:fs/promises";
import { completeEpisodeOne, reset, startModule } from "./helpers";

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
    await page.screenshot({
      path: `artifacts/screenshots/interaction-${viewport.width}x${viewport.height}.png`,
    });
    await completeEpisodeOne(page);
    await page.getByRole("button", { name: "De onde saiu essa fofoca?" }).click();
    await page.screenshot({
      path: `artifacts/screenshots/source-${viewport.width}x${viewport.height}.png`,
    });
  }
});
