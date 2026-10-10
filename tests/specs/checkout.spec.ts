import { test } from '../fixtures/test';
import { expect } from '@playwright/test';
import { products } from '../data/products';

test.describe('Checkout', () => {
  for (const product of Object.values(products)) {
    test(`should successfully place an order for ${product.name}`, async ({ emptyCartHomePage }) => {
      const categoryPage = await emptyCartHomePage.siteMenu.openCategory(product.categoryPath);
      const productPage = await categoryPage.openProduct(product.name);
      await expect(productPage.productName).toHaveText(product.name);

      const expectedOrderItem = await productPage.addToCart(product);
      await expect(productPage.header.cart.itemCount).toHaveText(product.quantity.toString());
      await productPage.header.cart.expectTotalPrice(expectedOrderItem.total);

      const checkoutPage = await productPage.header.cart.openCheckout();
      const actualOrderItem = await checkoutPage.getOrderItem(product.name);
      expect(actualOrderItem).toEqual(expectedOrderItem);
      await checkoutPage.expectPaymentDue(expectedOrderItem.total);

      const successOrderPage = await checkoutPage.confirmOrder();
      await successOrderPage.expectOpened();
      await expect(successOrderPage.orderSuccessMessage).toBeVisible();
      await expect(successOrderPage.orderSuccessMessage).toHaveText('Your order is successfully completed!');
    });
  }
});