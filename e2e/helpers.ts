import { expect, type Page } from "@playwright/test";

export async function reset(page: Page) {
  await page.goto("/");
  await page.evaluate(() => localStorage.clear());
  await page.reload();
}

export async function startModule(page: Page) {
  await reset(page);
  await page.getByRole("button", { name: "Começar", exact: true }).click();
  await expect(page.getByRole("heading", { name: /Aprenda a Reforma Tributária/ })).toBeVisible();
  await page.getByRole("button", { name: "Começar a fofoca" }).click();
  await expect(
    page.getByRole("heading", { name: "Acabaram cinco impostos. Confia." }),
  ).toBeVisible();
}

async function submitChoice(page: Page, option: string, confidence?: string) {
  if (confidence)
    await page
      .getByRole("radio", { name: new RegExp(confidence) })
      .locator("..")
      .click();
  await page.getByRole("radio", { name: option }).locator("..").click();
  await page.getByRole("button", { name: "Conferir resposta" }).click();
  await expect(page.getByTestId("feedback")).toBeVisible();
  await page.getByRole("button", { name: /Continuar/ }).click();
}

export async function completeEpisodeOne(page: Page, correct = true) {
  await submitChoice(
    page,
    correct ? "Tudo foi trocado em 2026." : "Existem IBS e CBS.",
    "acho que sei",
  );
  await expect(page.getByRole("heading", { name: "A regra, sem telefone sem fio" })).toBeVisible();
}

export async function completeWholeModule(page: Page) {
  await completeEpisodeOne(page);
  await page.getByRole("button", { name: /Próximo episódio/ }).click();
  await submitChoice(page, "Um é federal e o outro envolve estados, municípios e DF.");
  await page.getByLabel("Correspondência para CBS").selectOption("federal");
  await page.getByLabel("Correspondência para IBS").selectOption("subnacional");
  await page.getByRole("button", { name: "Conferir resposta" }).click();
  await page.getByRole("button", { name: /Continuar/ }).click();
  await page.getByRole("button", { name: /Próximo episódio/ }).click();
  await submitChoice(
    page,
    "Incidência seletiva ligada a bens e serviços definidos em lei por efeitos prejudiciais à saúde ou ao meio ambiente.",
  );
  await page.getByRole("button", { name: /Próximo episódio/ }).click();
  await page
    .getByRole("radio", { name: /acho que sei/ })
    .locator("..")
    .click();
  await page.getByRole("button", { name: "Conferir resposta" }).click();
  await page.getByRole("button", { name: /Continuar/ }).click();
  await page.getByRole("button", { name: /Próximo episódio/ }).click();
  await submitChoice(page, "Não");
  await page.getByRole("button", { name: /Ir para a avaliação final/ }).click();
  await submitChoice(page, "União / esfera federal");
  await submitChoice(page, "Estados, municípios e Distrito Federal");
  await submitChoice(page, "Não");
  await submitChoice(page, "Não");
  await submitChoice(page, "IBS");
  await page
    .getByRole("radio", { name: /acho que sei/ })
    .locator("..")
    .click();
  await page
    .getByLabel("Sua resposta")
    .fill(
      "Em 2026 começou a fase de teste; a transição é gradual e chega ao modelo integral em 2033.",
    );
  await page.getByRole("button", { name: "Conferir resposta" }).click();
  await expect(page.getByTestId("feedback")).toContainText("transferência");
  await page.getByRole("button", { name: /Continuar/ }).click();
}
