import { expect, test } from "@jupyterlab/galata";

test.use({ autoGoto: false });

test.describe("ipywidgets Extension", () => {
  test("should render widgets and interact", async ({ page }) => {
    await page.goto();

    await page.notebook.open("test-ipywidgets.ipynb");

    await expect(page.locator(".jp-Notebook")).toBeVisible();
    await page.waitForTimeout(5000);

    await page.notebook.run();

    const slider = page.locator("div.widget-slider");
    await expect(slider).toBeVisible();

    const button = page.locator('button:has-text("Click Me")');
    await expect(button).toBeVisible();

    expect(await page.screenshot()).toMatchSnapshot("ipywidgets-initial.png");

    await button.click();
    await page.waitForTimeout(500);

    expect(await page.screenshot()).toMatchSnapshot(
      "ipywidgets-after-click.png"
    );
  });
});
