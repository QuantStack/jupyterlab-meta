import { test, expect } from "@jupyterlab/galata";

test.use({ autoGoto: false });

test.describe("ipympl Extension", () => {
  test("should render an interactive Matplotlib figure", async ({ page }) => {
    await page.goto();

    await page.notebook.open("test-ipympl.ipynb");
    await expect(page.locator(".jp-Notebook")).toBeVisible();
    await page.waitForTimeout(5000);

    await page.notebook.run();

    const mplFigure = page.locator(".jupyter-matplotlib-figure");
    await expect(mplFigure).toBeVisible();

    const mplCanvas = mplFigure.locator("canvas");
    await expect(mplCanvas).toHaveCount(2);
    const box = await mplCanvas.first().boundingBox();
    if (box) {
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    }
    const toolbar = page.locator(".jupyter-matplotlib-toolbar");
    await expect(toolbar).toBeVisible();

    expect(await page.screenshot()).toMatchSnapshot("ipympl-figure.png");
  });
});
