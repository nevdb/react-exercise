test("hello world!", async ({ page }) => {
  await page.goto("http://localhost:3002");
  const title = await page.title();
  expect(title).toBe("My React App");
});
