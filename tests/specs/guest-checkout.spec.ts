import { test } from '../fixtures/test';
import { expect } from '@playwright/test';
import { products } from '../data/products';
import { addProductsToCart } from '../flow/cart.flow';
import { sortByProductName, sumTotals } from '../models/order-item';

test.describe('Guest checkout', () => {
    test.use({ storageState: { cookies: [], origins: [] } });

    test('should allow placing an order without authentication', async ({ homePage }) => {
        const selectedProducts = [products.regular, products.discounted];
        const expectedOrderItems = await addProductsToCart(homePage, selectedProducts);
        const checkoutPage = await homePage.header.cart.openCheckout();

        const actualOrderItems = await checkoutPage.getOrderItems();
        expect(sortByProductName(actualOrderItems)).toEqual(sortByProductName(expectedOrderItems));
        await checkoutPage.expectPaymentDue(sumTotals(expectedOrderItems));
    });
});