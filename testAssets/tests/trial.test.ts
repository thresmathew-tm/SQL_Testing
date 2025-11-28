// import { test, expect } from '@playwright/test';

// test('open and validate a page', async ({ page }) => {
//   await page.goto('http://localhost:3000');
//   const pageTitle = page.title;
//   expect(pageTitle).toBe("Bookstore");
// });
import { test, expect } from '@playwright/test';

test('open and validate a page', async ({ page }) => {
  await page.goto('http://localhost:3000');
  const pageTitle = await page.title();
  expect(pageTitle).toBe("BookStore");

   await page.click('text=Sign In');
  expect(await page.url()).toContain('/login');

  const btn=await page.locator('//button[text()="Sign In"]');
  await btn.click();
});