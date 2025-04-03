import { test, expect } from "@jupyterlab/galata";

test.use({ autoGoto: false });

test.describe("ipympl Extension", () => {
  test("should render an interactive Matplotlib figure", async ({ page }) => {
    await page.goto();

    await page.notebook.open("test-large-notebook-with-extensions.ipynb");

    await expect(page.locator(".jp-Notebook")).toBeVisible();
    await page.waitForTimeout(5000);

    const tocTab = page.locator('li[data-id="table-of-contents"]');
    await tocTab.click();
    await page.waitForTimeout(2000);

    await page.locator('span[title="ipympl"]').click();
    await page.waitForTimeout(2000);

    await page.notebook.runCell(13);

    await page.waitForTimeout(3000);

    const mplFigure = page.locator(".jupyter-matplotlib-figure");
    await expect(mplFigure).toBeVisible();

    const mplCanvas = mplFigure.locator("canvas");
    await expect(mplCanvas).toHaveCount(2);

    expect(await page.screenshot()).toMatchSnapshot("ipympl-figure.png");
  });
});
