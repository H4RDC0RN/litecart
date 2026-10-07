import { defineConfig, devices } from '@playwright/test';

const isCI = !!process.env.CI;

export default defineConfig({
    testDir: './tests',
    fullyParallel: true,
    forbidOnly: isCI,
    retries: isCI ? 2 : 0,
    workers: isCI ? 1 : undefined,
    reporter: [['html']],

    use: {
        baseURL: 'https://litecart.stqa.ru/',
        trace: 'on-first-retry',
        screenshot: 'only-on-failure',
        video: isCI ? 'retain-on-failure' : 'off',
    },

    projects: isCI
        ? [
            {
                name: 'chromium',
                use: {
                    ...devices['Desktop Chrome'],
                },
            },
            {
                name: 'firefox',
                use: {
                    ...devices['Desktop Firefox'],
                },
            },
        ]
        : [
            {
                name: 'chrome',
                use: {
                    ...devices['Desktop Chrome'],
                    channel: 'chrome',
                },
            },
        ],
});