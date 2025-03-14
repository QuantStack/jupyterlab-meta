import { expect, test } from "@jupyterlab/galata";

test.use({ autoGoto: false });

test.describe("Jupytext Extension", () => {
  test("should display Jupytext launcher section", async ({ page }) => {
    await page.goto();
    await page.waitForSelector(".jp-Launcher", { state: "attached" });

    const launcherSection = page.locator(
      'div[class="jp-Launcher-section"]:has-text("Jupytext")'
    );
    await expect(launcherSection).toBeVisible();

    expect(await launcherSection.screenshot()).toMatchSnapshot(
      "launcher-section.png"
    );
  });
});
