import { expect, test } from "@jupyterlab/galata";

test.use({ autoGoto: false });

test.describe("Dash Extension Test", () => {
  test("should render dash", async ({ page }) => {
    await page.goto();

    await page.notebook.open("test-large-notebook-with-extensions.ipynb");

    await expect(page.locator(".jp-Notebook")).toBeVisible();
    await page.waitForTimeout(5000);

    const tocTab = page.locator('li[data-id="table-of-contents"]');
    await tocTab.click();
    await page.waitForTimeout(2000);

    await page.locator('span[title="Dash"]').click();

    await page.waitForTimeout(2000);

    await page.notebook.runCell(7);

    await page.waitForTimeout(5000);

    const iframeElement = page.locator('iframe[src="http://0.0.0.0:8052/"]');
    await iframeElement.waitFor();

    const iframe = iframeElement.contentFrame();

    const graph = iframe.locator("#graph");
    await expect(graph).toBeVisible();
    await graph.scrollIntoViewIfNeeded();
    await page.waitForTimeout(6000);

    expect(await page.screenshot()).toMatchSnapshot("dash.png", {
      maxDiffPixelRatio: 0.05,
    });
  });
});
