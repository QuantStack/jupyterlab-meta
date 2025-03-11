import { expect, test } from "@jupyterlab/galata";

test.use({ autoGoto: false });

test.describe("Papermill Execution Test", () => {
  test("should run notebook with papermill and verify execution", async ({
    page,
  }) => {
    await page.goto();

    await page.notebook.open("test.ipynb");
    await expect(page.locator(".jp-Notebook")).toBeVisible();

    await page.notebook.run();
    await page.waitForTimeout(10000); 

    const outputPath = await page
      .locator(".jp-Cell .jp-OutputArea-output")
      .locator("text=/Output saved to.*/")
      .textContent();

    expect(outputPath).toBeTruthy();
  });
});
