import { expect, test } from "@jupyterlab/galata";

test.use({ autoGoto: false });

test.describe("JupyterLab Code Formatter", () => {
  test("should format notebook", async ({ page }) => {
    await page.goto();

    await page.notebook.open("test-large-notebook-with-extensions.ipynb");

    await expect(page.locator(".jp-Notebook")).toBeVisible();
    await page.waitForTimeout(5000);

    const tocTab = page.locator('li[data-id="table-of-contents"]');
    await tocTab.click();
    await page.waitForTimeout(2000);

    await page.locator('span[title="jupyterlab-code-formatter"]').click();
    await page.waitForTimeout(5000);

    expect(await page.screenshot()).toMatchSnapshot(
      "before_format_notebook.png"
    );

    await page.notebook.runCell(14);
    await page.waitForTimeout(500);

    // Right-click on a specific cell
    const cellLocator = await page.notebook.getCellLocator(15);
    await cellLocator?.click({ button: "right" });
    await page.waitForTimeout(500);

    // Click on "Format Cell" in the context menu
    const formatCellOption = page.locator("text=Format Cell");
    await formatCellOption.click();
    await page.waitForTimeout(2000);

    expect(await page.screenshot()).toMatchSnapshot(
      "after_format_notebook.png"
    );
  });
});
