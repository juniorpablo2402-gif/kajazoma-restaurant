const { test: setup, expect } = require('@playwright/test');
const fs = require('fs');

const authFile = 'playwright/.auth/staff.json';

setup('authenticate staff user', async ({ page }) => {
  fs.mkdirSync('playwright/.auth', { recursive: true });

  const email = process.env.PLAYWRIGHT_EMAIL;
  const password = process.env.PLAYWRIGHT_PASSWORD;

  if (!email || !password) {
    throw new Error(
      'PLAYWRIGHT_EMAIL and PLAYWRIGHT_PASSWORD are required for authenticated visual tests.'
    );
  }

  await page.goto('/admin/reservations.html', { waitUntil: 'networkidle' });

  await page.locator('#email').fill(email);
  await page.locator('#password').fill(password);
  await page.locator('#loginForm button[type="submit"]').click();

  await expect(page.locator('#app')).toBeVisible({ timeout: 15_000 });
  await page.context().storageState({ path: authFile });
});
