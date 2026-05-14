import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './specs',
  timeout: 60000,
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: 1,
  reporter: [['html'], ['list']],
  snapshotDir: './screenshots',
  use: {
    baseURL: 'https://www.tui.nl/h/nl',
    locale: 'nl-NL',
    testIdAttribute: 'data-test-id',
    storageState: 'specs/auth/cookies.json',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure'
  },
  projects: [
    {
      name: 'Google Chrome',
      use: { ...devices['Desktop Chrome'], channel: 'chrome' }
    },
    {
      name: 'Desktop Safari',
      use: { ...devices['Desktop Safari'] }
    },
    {
      name: 'Desktop Firefox',
      use: { ...devices['Desktop Firefox'] }
    }
  ]
});
