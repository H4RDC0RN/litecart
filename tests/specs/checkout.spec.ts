import { expect } from '@playwright/test';
import { test } from '@/fixtures/test';
import { products } from '@/data/products';

test.describe('Checkout', () => {
  for (const product of Object.values(products)) {
    test(`should successfully place an order for ${product.name}`, async ({ emptyCartHomePage }) => {
      const categoryPage = await emptyCartHomePage.siteMenu.openCategory(product.categoryPath);
      const productPage = await categoryPage.openProduct(product.name);
      await productPage.expectProductName(product.name);

      const expectedOrderItem = await productPage.addToCart(product);
      await productPage.header.cart.expectTotalPrice(expectedOrderItem.total, { soft: true });

      const checkoutPage = await productPage.header.cart.openCheckout();
      const actualOrderItem = await checkoutPage.getOrderItem(product.name);
      expect.soft(actualOrderItem).toEqual(expectedOrderItem);
      await checkoutPage.expectPaymentDue(expectedOrderItem.total, { soft: true });

      const successOrderPage = await checkoutPage.confirmOrder();
      await successOrderPage.expectOrderCompleted();
    });
  }
});