import { test as setup } from '@playwright/test';
import { AUTH_FILE } from '@/config/constants';
import { HomePage } from '@/ui/pages/home.page';

setup('authenticate', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();
    await homePage.navigation.login.submit(process.env.USER_EMAIL!, process.env.USER_PASSWORD!);
    await homePage.navigation.expectLoggedIn();

    await page.context().storageState({ path: AUTH_FILE });
});
