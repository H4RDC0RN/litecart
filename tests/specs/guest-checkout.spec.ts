import { expect } from '@playwright/test';
import { addProductsToCart } from '../../src/flows/cart.flow';
import { sortByProductName, sumTotals } from '../../src/models/order-item';
import { test } from '../../src/fixtures/test';
import { products } from '../../src/data/products';

test.describe('Guest checkout', () => {
    test.use({ storageState: { cookies: [], origins: [] } });

    test('should allow placing an order without authentication', async ({ homePage }) => {
        const selectedProducts = [products.regular, products.discounted];
        const expectedOrderItems = await addProductsToCart(homePage, selectedProducts);
        const checkoutPage = await homePage.header.cart.openCheckout();

        const actualOrderItems = await checkoutPage.getOrderItems();
        expect.soft(sortByProductName(actualOrderItems)).toEqual(sortByProductName(expectedOrderItems));
        await checkoutPage.expectPaymentDue(sumTotals(expectedOrderItems), { soft: true });
    });
});