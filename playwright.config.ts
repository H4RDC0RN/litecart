import { defineConfig, devices, Project } from '@playwright/test';
import dotenv from 'dotenv';
import { AUTH_FILE } from './src/config/constants';

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

    projects: [
        {
            name: 'setup',
            testMatch: /.*\.setup\.ts/,
            use: { ...browsers[0].use, trace: 'off', video: 'off', screenshot: 'off' },
        },
        ...browsers.map((browser): Project => ({
            ...browser,
            use: { ...browser.use, storageState: AUTH_FILE },
            dependencies: ['setup'],
        })),
    ]
});