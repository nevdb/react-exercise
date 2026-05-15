import { test, expect } from "@playwright/test";

test("homepage has title and links to about page", async ({ page }) => {
  await page.goto("http://localhost:3000");
  await expect(page).toHaveTitle(/My React App/);
  await expect(page.locator("text=About")).toBeVisible();
});

test("user can navigate to about page", async ({ page }) => {
  await page.goto("http://localhost:3000");
  await page.click("text=About");
  await expect(page).toHaveURL(/about/);
  await expect(page.locator("h1")).toHaveText("About Us");
});
