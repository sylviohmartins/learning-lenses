import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";
import { completeEpisodeOne, startModule } from "./helpers";

async function expectNoSeriousViolations(page: Page) {
  const result = await new AxeBuilder({ page }).analyze();
  const serious = result.violations.filter(
    (item) => item.impact === "serious" || item.impact === "critical",
  );
  expect(serious, serious.map((item) => `${item.id}: ${item.help}`).join("\n")).toEqual([]);
}

test("axe — home, episódio, source drawer e settings", async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => localStorage.clear());
  await page.reload();
  await expectNoSeriousViolations(page);
  await startModule(page);
  await expectNoSeriousViolations(page);
  await completeEpisodeOne(page);
  await expectNoSeriousViolations(page);
  const sourceTrigger = page.getByRole("button", { name: "De onde saiu essa fofoca?" });
  await sourceTrigger.click();
  await expectNoSeriousViolations(page);
  const close = page.getByRole("button", { name: "Fechar fontes" });
  await expect(close).toBeFocused();
  await page.keyboard.press("Shift+Tab");
  await expect(page.getByRole("link", { name: /Abrir fonte oficial/ }).last()).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(close).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(sourceTrigger).toBeFocused();
  await page.getByRole("link", { name: "Configurações" }).click();
  await expectNoSeriousViolations(page);
});

test("reduced motion preserva a experiência", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /A Reforma Tributária/ })).toBeVisible();
  await expectNoSeriousViolations(page);
  await page.setViewportSize({ width: 640, height: 800 });
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
    ),
    "reflow equivalente a zoom 200% em 1280px",
  ).toBe(false);
  await page.setViewportSize({ width: 320, height: 568 });
  await page.goto("/settings");
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
    ),
    "reflow da página de Ajustes em 320px",
  ).toBe(false);
});
