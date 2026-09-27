const { defineConfig, devices } = require('@playwright/test');

const baseURL = process.env.BASE_URL || 'https://kajazoma-restaurant-47jyhr0i8-juniorpablo2402-gifs-projects.vercel.app';

module.exports = defineConfig({
  testDir: './tests',
  timeout: 45_000,
  expect: {
    timeout: 10_000,
    toHaveScreenshot: {
      animations: 'disabled',
      caret: 'hide',
    },
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: process.env.CI
    ? [['list'], ['html', { outputFolder: 'playwright-report', open: 'never' }]]
    : [['list'], ['html', { outputFolder: 'playwright-report', open: 'never' }]],
  use: {
    baseURL,
    locale: 'fr-FR',
    timezoneId: 'Africa/Abidjan',
    colorScheme: 'dark',
    reducedMotion: 'reduce',
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'setup',
      testMatch: /.*\.setup\.js/,
    },
    {
      name: 'iphone-13',
      dependencies: ['setup'],
      use: { ...devices['iPhone 13'], storageState: 'playwright/.auth/staff.json' },
    },
    {
      name: 'iphone-15-pro',
      dependencies: ['setup'],
      use: { ...devices['iPhone 15 Pro'], storageState: 'playwright/.auth/staff.json' },
    },
    {
      name: 'pixel-7',
      dependencies: ['setup'],
      use: { ...devices['Pixel 7'], storageState: 'playwright/.auth/staff.json' },
    },
  ],
});
