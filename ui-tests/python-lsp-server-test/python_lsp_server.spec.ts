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
});
