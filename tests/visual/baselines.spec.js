const { test, expect } = require('@playwright/test');

const screens = [
  { name: 'direction', path: '/admin/direction.html' },
  { name: 'service', path: '/admin/service.html' },
  { name: 'reservations', path: '/admin/reservations.html' },
];

for (const screen of screens) {
  test(`visual baseline — ${screen.name}`, async ({ page }) => {
    await page.goto(screen.path, { waitUntil: 'networkidle' });
    await expect(page.locator('body')).toBeVisible();
    await expect(page).toHaveScreenshot(`${screen.name}.png`, {
      fullPage: true,
    });
  });
}
