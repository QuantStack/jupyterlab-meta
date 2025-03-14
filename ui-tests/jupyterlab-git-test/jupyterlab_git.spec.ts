import { expect, test } from "@jupyterlab/galata";

test.use({ autoGoto: false });

test.describe("JupyterLab Git Extension", () => {
  test("should open Git panel after clicking on Git tab", async ({ page }) => {
    await page.goto();
    await page.waitForSelector(".jp-Launcher", { state: "attached" });

    const gitTab = page.locator('li[data-id="jp-git-sessions"]');
    await gitTab.click();

    const gitPanel = page.locator('div[id="jp-git-sessions"]');
    await expect(gitPanel).toBeVisible();

    expect(await page.screenshot()).toMatchSnapshot("git_panel.png", {
      maxDiffPixelRatio: 0.04,
    });
  });
  test("should open Initialize repository dialog", async ({ page }) => {
    await page.goto();

    const gitTab = page.locator('li[data-id="jp-git-sessions"]');
    await gitTab.click();

    const gitPanel = page.locator('div[id="jp-git-sessions"]');
    await expect(gitPanel).toBeVisible();

    const openRepoButton = page.getByRole("button", {
      name: "Initialize a Repository",
    });

    await openRepoButton.click();
    expect(await page.screenshot()).toMatchSnapshot(
      "initialize_repo_dialog.png",
      { maxDiffPixelRatio: 0.04 }
    );
  });
  test("should open Clone repository dialog", async ({ page }) => {
    await page.goto();

    const gitTab = page.locator('li[data-id="jp-git-sessions"]');
    await gitTab.click();

    const gitPanel = page.locator('div[id="jp-git-sessions"]');
    await expect(gitPanel).toBeVisible();

    const openRepoButton = page.getByRole("button", {
      name: "Clone a Repository",
    });

    await openRepoButton.click();
    expect(await page.screenshot()).toMatchSnapshot("clone_repo_dialog.png");
  });
  test("should open Git Menu", async ({ page }) => {
    await page.goto();

    const gitMenuItem = page.locator('li.lm-MenuBar-item:has-text("Git")');
    await gitMenuItem.click();

    expect(await page.screenshot()).toMatchSnapshot("git_menu.png", {
      maxDiffPixelRatio: 0.04,
    });
  });
  test("should open git difference in a notebook", async ({ page }) => {
    await page.goto();

    await page.notebook.open("test-git.ipynb");

    const notebookEditor = page.locator(".jp-Notebook");
    await expect(notebookEditor).toBeVisible();

    const gitButton = page.locator(
      'div[data-jp-item-name="Notebook checkpoint diff"]'
    );

    await gitButton.click();
    expect(await page.screenshot()).toMatchSnapshot("git_diff.png", {
      maxDiffPixelRatio: 0.04,
    });
  });
});
