import { expect, test } from "@jupyterlab/galata";

test.use({ autoGoto: false });

test.describe("Jupyterlab-lsp Extension Test", () => {
  test("should show autocompletion suggestions", async ({ page }) => {
    await page.goto();

    await page.notebook.open("test-large-notebook-with-extensions.ipynb");

    await expect(page.locator(".jp-Notebook")).toBeVisible();
    await page.waitForTimeout(5000);

    const tocTab = page.locator('li[data-id="table-of-contents"]');
    await tocTab.click();
    await page.waitForTimeout(2000);

    await page.locator('span[title="jupyterlab-lsp"]').click();
    await page.waitForTimeout(2000);

    await page.notebook.runCell(8);
    await page.waitForTimeout(200);
    await page.keyboard.press("Enter");

    await page.keyboard.press("Control+End");
    await page.waitForTimeout(1000);

    // Press Tab to trigger autocompletion
    await page.keyboard.press("Tab");

    const autocompleteSuggestions = page.locator(".jp-Completer");
    await page.waitForTimeout(5000);

    await expect(autocompleteSuggestions).toBeVisible();

    expect(await page.screenshot()).toMatchSnapshot(
      "autocomplete-suggestions.png",
      { maxDiffPixelRatio: 0.04 }
    );
  });
});
