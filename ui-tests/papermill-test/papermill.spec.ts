import { expect, test } from "@jupyterlab/galata";

test.use({ autoGoto: false });

test.describe("Papermill Execution Test", () => {
  test("should run notebook with papermill and verify execution", async ({
    page,
  }) => {
    await page.goto();

    await page.notebook.open("test-large-notebook-with-extensions.ipynb");
    await expect(page.locator(".jp-Notebook")).toBeVisible();
    const tocTab = page.locator('li[data-id="table-of-contents"]');
    await tocTab.click();
    await page.waitForTimeout(2000);

    await page.locator('span[title="Papermill"]').click();
    await page.waitForTimeout(2000);

    await page.notebook.runCell(3, false);
    await page.waitForTimeout(200);
    const outputPath = await page
      .locator(".jp-Cell .jp-OutputArea-output")
      .locator("text=/Output saved to.*/")
      .textContent();

    expect(outputPath).toBeTruthy();
    expect(await page.screenshot()).toMatchSnapshot("papermill-output.png", {
      maxDiffPixelRatio: 0.05,
    });
  });
});
