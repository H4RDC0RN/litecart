import { test as base } from '@playwright/test';
import { HomePage } from '@/ui/pages/home.page';
import { LoginPage } from '@/ui/pages/login.page';

type Fixtures = {
    homePage: HomePage;
    emptyCartHomePage: HomePage;
    loginPage: LoginPage
};

export const test = base.extend<Fixtures>({
    homePage: async ({ page }, use) => {
        const homePage = new HomePage(page);
        await homePage.goto();
        await use(homePage);
    },

    emptyCartHomePage: async ({ homePage }, use) => {
        if (!(await homePage.header.cart.isCartEmpty())) {
            const checkoutPage = await homePage.header.cart.openCheckout();
            await checkoutPage.clearCart();
            await homePage.goto();
        }
        await use(homePage);
    },

    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await use(loginPage);
    },
});