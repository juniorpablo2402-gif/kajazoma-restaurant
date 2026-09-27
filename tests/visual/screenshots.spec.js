const { test, expect } = require('@playwright/test');

const screens = [
  { name: 'direction', path: '/admin/direction.html' },
  { name: 'service', path: '/admin/service.html' },
  { name: 'reservations', path: '/admin/reservations.html' },
];

for (const screen of screens) {
  test(`mobile screenshot — ${screen.name}`, async ({ page }, testInfo) => {
    await page.goto(screen.path, { waitUntil: 'networkidle' });
    await expect(page.locator('body')).toBeVisible();

    await page.screenshot({
      path: testInfo.outputPath(`${screen.name}-mobile.png`),
      fullPage: true,
    });
  });
}
