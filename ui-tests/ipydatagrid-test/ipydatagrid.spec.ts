import { expect, test } from "@jupyterlab/galata";

test.use({ autoGoto: false });

test.describe("ipydatagrid Extension", () => {
  test("should execute notebook and render DataGrid", async ({ page }) => {
    await page.goto();

    await page.notebook.open("test-ipydatagrid.ipynb");

    await expect(page.locator(".jp-Notebook")).toBeVisible();
    await page.waitForTimeout(5000);

    await page.notebook.run();

    const gridCanvas = page.locator(".ipydatagrid-widget canvas").first();
    await expect(gridCanvas).toBeVisible();

    expect(await page.screenshot()).toMatchSnapshot("ipydatagrid-initial.png");

  });
});
