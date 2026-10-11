import { expect } from '@playwright/test';
import { addProductsToCart } from '@/flows/cart.flow';
import { sortByProductName, sumTotals } from '@/models/order-item';
import { test } from '@/fixtures/test';
import { products } from '@/data/products';
import { defaultCustomerDetails } from '@/data/customer-details';

test.describe('Guest checkout', () => {
    test.use({ storageState: { cookies: [], origins: [] } });
    test('should allow placing an order without authentication', async ({ homePage }) => {
        const selectedProducts = [products.regular, products.discounted];
        const expectedProducts = await addProductsToCart(homePage, selectedProducts);
        const checkoutPage = await homePage.header.cart.openCheckout();

        const actualOrderItems = await checkoutPage.getOrderItems();
        expect.soft(sortByProductName(actualOrderItems)).toEqual(sortByProductName(expectedProducts.orderItems));
        await checkoutPage.expectPaymentDue(sumTotals(expectedProducts.orderItems), { soft: true });
        expect.soft(await checkoutPage.customerDetails.getDetails()).toEqual(defaultCustomerDetails);

        const returnedHomePage = await checkoutPage.header.openHomePage();
        await returnedHomePage.navigation.recentViewed.expectContains(expectedProducts.productSlugs, { soft: true });
    });
});