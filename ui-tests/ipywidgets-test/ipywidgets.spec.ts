import { expect, test } from "@jupyterlab/galata";

test.use({ autoGoto: false });

test.describe("ipywidgets Extension", () => {
  test("should render widgets and interact", async ({ page }) => {
    await page.goto();

    await page.notebook.open("test-large-notebook-with-extensions.ipynb");

    await expect(page.locator(".jp-Notebook")).toBeVisible();
    await page.waitForTimeout(5000);

    const tocTab = page.locator('li[data-id="table-of-contents"]');
    await tocTab.click();
    await page.waitForTimeout(2000);

    await page.locator('span[title="ipywidgets"]').click();
    await page.waitForTimeout(2000);

    await page.notebook.runCell(5);
    await page.waitForTimeout(5000);

    const slider = page.locator("div.widget-slider").first();
    await expect(slider).toBeVisible();

    const button = page.locator('button:has-text("Click Me")').first();
    await expect(button).toBeVisible();

    expect(await page.screenshot()).toMatchSnapshot("ipywidgets-initial.png");

    await button.click();
    await page.waitForTimeout(500);

    expect(await page.screenshot()).toMatchSnapshot(
      "ipywidgets-after-click.png"
    );
  });
});
