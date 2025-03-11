import { expect, test, galata } from "@jupyterlab/galata";
test.use({ autoGoto: false });

test.describe("UI Test", () => {
  test.describe("Should start JupyterLab", () => {
    test("should go to the page", async ({ page }) => {
      await page.goto();
    });
  });
});
