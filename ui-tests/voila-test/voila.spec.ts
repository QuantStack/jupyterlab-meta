import { expect, test } from "@jupyterlab/galata";

test.use({ autoGoto: false });

test.describe("Voila Extension Test", () => {
  test("should render notebook with voila", async ({ page }) => {
    await page.goto();

    await page.notebook.open("test-voila.ipynb");

    const notebookEditor = page.locator(".jp-Notebook");
    await expect(notebookEditor).toBeVisible();

    const voilaButton = page.locator('div[data-jp-item-name="voilaRender"]');

    await voilaButton.click();
    await page.locator('button:has-text("Close")').click();
    
    await page.waitForTimeout(5000);
    expect(await page.screenshot()).toMatchSnapshot("voila.png");
  });
});
