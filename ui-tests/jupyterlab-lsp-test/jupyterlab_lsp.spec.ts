import { expect, test } from "@jupyterlab/galata";

test.use({ autoGoto: false });

test.describe("Jupyterlab-lsp Extension Test", () => {
  test("should open lsp popup", async ({ page }) => {
    await page.goto();

    await page.notebook.open("test-lsp.ipynb");

    const notebookEditor = page.locator(".jp-Notebook");
    await expect(notebookEditor).toBeVisible();

    const lspStatusGroup = page.locator(".lsp-status-group");

    await lspStatusGroup.click();

    expect(await page.screenshot()).toMatchSnapshot("lsp-popup.png");

    const lspStatusMessage = page.locator(".lsp-status-message");

    await page.waitForFunction(() => {
      const el = document.querySelector(".lsp-status-message");
      return el && el.textContent?.trim() === "Fully initialized";
    });

    await expect(lspStatusMessage).toHaveText("Fully initialized");

    await page.waitForTimeout(500);

    expect(await page.screenshot()).toMatchSnapshot(
      "lsp-popup-fully-initialized.png"
    );
  });

  test("should show autocompletion suggestions", async ({ page }) => {
    await page.goto();
    await page.notebook.open("test-lsp.ipynb");
    const notebookEditor = page.locator(".jp-Notebook");
    await expect(notebookEditor).toBeVisible();

    const codeCellEditor = page.locator(".cm-content");
    await codeCellEditor.first().click();
    await page.keyboard.press("End");

    await page.waitForTimeout(1000);

    // Press Tab to trigger autocompletion
    await page.keyboard.press("Tab");


    const autocompleteSuggestions = page.locator(".jp-Completer ");
    await page.waitForTimeout(5000);

    await expect(autocompleteSuggestions).toBeVisible();

    expect(await page.screenshot()).toMatchSnapshot(
      "autocomplete-suggestions.png",
      { maxDiffPixelRatio: 0.04 }
    );
  });
});
