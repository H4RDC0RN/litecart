import { test as base } from '@playwright/test';
import { HomePage } from '../ui/pages/home.page';

type Fixtures = {
    homePage: HomePage;
    emptyCartHomePage: HomePage;
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
});

export { expect } from '@playwright/test';