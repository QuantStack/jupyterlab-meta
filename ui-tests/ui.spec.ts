import { expect, test } from "@jupyterlab/galata";
import { addBenchmarkToTest } from "./utils";

test.use({ autoGoto: false });
test.setTimeout(300000); // 5 minutes to scroll through the whole notebook

test.describe("Large Notebook Performance Benchmark", () => {
  test("should perform benchmark operations", async ({ page }, testInfo) => {
    const browserName = testInfo.project.name;
    await page.goto();

    // Measure time to open the notebook
    await addBenchmarkToTest(
      "open-large-notebook",
      async () => {
        await page.notebook.open("test-large-notebook-with-extensions.ipynb");
        await expect(page.locator(".jp-Notebook")).toBeVisible();
      },
      testInfo,
      browserName,
      1
    );

    // Measure time to switch between tabs in the sidebar
    await addBenchmarkToTest(
      "switch-sidebar-tabs",
      async () => {
        expect(await page.screenshot()).toMatchSnapshot("filebrowser.png");

        await page.locator('li[data-id="table-of-contents"]').click();
        await page.waitForTimeout(500);
        expect(await page.screenshot()).toMatchSnapshot("toc.png");
        await page.locator('li[data-id="table-of-contents"]').click();
      },
      testInfo,
      browserName,
      1
    );

    await addBenchmarkToTest(
      "navigate-all-toc-sections",
      async () => {
        const tocTab = page.locator('li[data-id="table-of-contents"]');
        await tocTab.click();
        await page.waitForTimeout(1000);

        const tocItems = page.locator(
          ".jp-TableOfContents-content span.jp-tocItem-content"
        );

        const count = await tocItems.count();
        for (let i = 0; i < count; i++) {
          const item = tocItems.nth(i);
          const text = await item.textContent();
          await item.click();
          await page.waitForTimeout(500);
        }
      },
      testInfo,
      browserName,
      1
    );

    // Measure time to search
    await addBenchmarkToTest(
      "search-in-notebook",
      async () => {
        await page.keyboard.press("Control+F");
        await page.keyboard.type("ipywidgets");
        await page.waitForTimeout(1000);
      },
      testInfo,
      browserName,
      1
    );

    // Mesure the time to add a new ToC entry
    await addBenchmarkToTest(
      "add-toc-entry",
      async () => {
        await page.locator('span[title="jupyterlab-code-formatter"]').click();
        await page.waitForTimeout(2000);

        await page.notebook.runCell(14);

        const addCellutton = page.locator('div[data-jp-item-name="insert"]');
        await addCellutton.click();

        const cellLocator = await page.notebook.getCellLocator(16);
        await cellLocator?.focus();

        await page.keyboard.press("Enter");
        await page.waitForTimeout(2000);
        await page.notebook.setCell(16, "markdown", "## Benchmark Section");

        await page.notebook.runCell(16);
        await page.waitForTimeout(200);

        await page.locator('span[title="Benchmark Section"]').click();
        await page.waitForTimeout(200);

        expect(await page.screenshot()).toMatchSnapshot("benchmarksection.png");
      },
      testInfo,
      browserName,
      1
    );

    await addBenchmarkToTest(
      "run-random-cells",
      async () => {
        const indices = [5, 15, 100, 250, 500];
        for (const index of indices) {
          const cellLocator = await page.notebook.getCellLocator(index);
          await cellLocator?.scrollIntoViewIfNeeded();
          await page.notebook.runCell(index);
          await page.waitForTimeout(300);
        }
      },
      testInfo,
      browserName,
      1
    );
  });
});
