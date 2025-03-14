import { expect, test } from "@jupyterlab/galata";

test.use({ autoGoto: false });

test.describe("JupyterLab Code Formatter", () => {
  test("should format notebook", async ({ page }) => {
    await page.goto();

    await page.notebook.open("test-code-formatter.ipynb");
    const notebookEditor = page.locator(".jp-Notebook");
    await expect(notebookEditor).toBeVisible();


    expect(await page.screenshot()).toMatchSnapshot(
      "before_format_notebook.png"
    );

    const formatButton = page.locator('jp-button[aria-label="Format notebook"]');

    await formatButton.click();

    await page.waitForTimeout(2000);

    expect(await page.screenshot()).toMatchSnapshot(
      "after_format_notebook.png"
    );
  });
});
