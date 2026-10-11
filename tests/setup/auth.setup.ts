import { test as setup } from '@playwright/test';
import { AUTH_FILE } from '../../src/config/constants';
import { HomePage } from '../../src/ui/pages/home.page';

setup('authenticate', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();
    await homePage.navigation.loginMasked(process.env.USER_EMAIL!, process.env.USER_PASSWORD!);
    await homePage.navigation.expectLoggedIn();

    await page.context().storageState({ path: AUTH_FILE });
});