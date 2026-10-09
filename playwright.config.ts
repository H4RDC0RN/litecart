import { defineConfig, devices, Project } from '@playwright/test';
import dotenv from 'dotenv';
import { AUTH_FILE } from './tests/config/auth';

dotenv.config();
const isCI = !!process.env.CI;
const browsers: Project[] = isCI
    ? [
        { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
        { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    ]
    : [
        { name: 'chrome', use: { ...devices['Desktop Chrome'], channel: 'chrome' } },
    ];

export default defineConfig({
    testDir: './tests',
    globalSetup: './tests/setup/global.setup.ts',
    fullyParallel: true,
    forbidOnly: isCI,
    retries: isCI ? 2 : 0,
    workers: 1,
    reporter: [['html']],

    use: {
        baseURL: process.env.BASE_URL,
        ignoreHTTPSErrors: true,
        actionTimeout: 10_000,
        trace: 'on-first-retry',
        screenshot: 'only-on-failure',
        video: isCI ? 'retain-on-failure' : 'off',
    },

    projects: browsers.map((browser): Project => ({
        ...browser,
        use: { ...browser.use, storageState: AUTH_FILE },
    })),
});