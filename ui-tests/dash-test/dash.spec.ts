import { expect, test } from "@jupyterlab/galata";

test.use({ autoGoto: false });

test.describe("Dash Extension Test", () => {
  test("should render dash", async ({ page }) => {
    await page.goto();

    await page.notebook.open("test-dash.ipynb");

    await expect(page.locator(".jp-Notebook")).toBeVisible();
    await page.waitForTimeout(5000);

    await page.notebook.run();
    await page.waitForTimeout(6000);

    const iframeElement = page.locator('iframe[src="http://0.0.0.0:8052/"]');
    await iframeElement.waitFor();

    const iframe = iframeElement.contentFrame();

    const graph = iframe.locator("#graph");
    await expect(graph).toBeVisible();
    await page.waitForTimeout(6000);

    expect(await page.screenshot()).toMatchSnapshot("dash.png", {
      maxDiffPixelRatio: 0.05,
    });
  });
});
