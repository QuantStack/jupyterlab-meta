import { expect, test } from "@jupyterlab/galata";

test.use({ autoGoto: false });

test.describe("ipydatagrid Extension", () => {
  test("should execute notebook and render DataGrid", async ({ page }) => {
    await page.goto();

    await page.notebook.open("test-large-notebook-with-extensions.ipynb");

    await expect(page.locator(".jp-Notebook")).toBeVisible();
    await page.waitForTimeout(5000);

   
    const tocTab = page.locator('li[data-id="table-of-contents"]');
    await tocTab.click();
    await page.waitForTimeout(2000);

    await page.locator('span[title="ipydatagrid"]').click();
    await page.waitForTimeout(2000);

    await page.notebook.runCell(11);

    await page.waitForTimeout(5000);

    const gridCanvas = page.locator(".ipydatagrid-widget canvas").first();
    await expect(gridCanvas).toBeVisible();
    await page.waitForTimeout(1000);

    expect(await page.screenshot()).toMatchSnapshot("ipydatagrid-initial.png");
  });
});
