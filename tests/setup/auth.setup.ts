import { test as setup } from '@playwright/test';
import { HomePage } from '../ui/pages/home.page';
import { AUTH_FILE } from '../config/auth';

setup('authenticate', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.goto();
  await homePage.navigation.login(process.env.USER_EMAIL!, process.env.USER_PASSWORD!);
  await homePage.navigation.expectLoggedIn();

  await page.context().storageState({ path: AUTH_FILE });
});