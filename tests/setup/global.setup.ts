import { chromium } from '@playwright/test';
import { HomePage } from '../ui/pages/home.page';
import { AUTH_FILE } from '../config/auth';

export default async function globalSetup() {
    const isCI = !!process.env.CI;
    const browser = await chromium.launch({
        channel: isCI ? undefined : 'chrome'
    });
    const context = await browser.newContext({
        baseURL: process.env.BASE_URL,
        ignoreHTTPSErrors: true
    });
    const page = await context.newPage();

    try {
        const homePage = new HomePage(page);
        await homePage.goto();
        await homePage.navigation.login(process.env.USER_EMAIL!, process.env.USER_PASSWORD!);
        await homePage.navigation.expectLoggedIn();

        await context.storageState({ path: AUTH_FILE });
    } finally {
        await browser.close();
    }
}