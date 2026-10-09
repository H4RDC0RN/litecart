import { test, expect } from '../fixtures/test';
import { products } from '../data/products';

test.describe('Checkout', () => {
  for (const product of products) {
    test(`should successfully place an order for ${product.name}`, async ({ emptyCartHomePage }) => {
      const categoryPage = await emptyCartHomePage.siteMenu.openCategory(product.categoryPath);
      const productPage = await categoryPage.openProduct(product.name);
      await expect(productPage.productName).toHaveText(product.name);

      const productPrice = await productPage.getProductPrice();
      const expectedTotalPrice = productPrice * product.quantity;
      await productPage.addToCart(product.quantity, product.size);
      await expect(productPage.header.cart.itemCount).toHaveText(product.quantity.toString());
      await productPage.header.cart.expectTotalPrice(expectedTotalPrice);

      const checkoutPage = await productPage.header.cart.openCheckout();
      const orderItem = await checkoutPage.getOrderItem(product.name);
      expect(orderItem.productName).toBe(product.name);
      expect(orderItem.quantity).toBe(product.quantity);
      expect(orderItem.unitCost).toBe(productPrice);
      expect(orderItem.total).toBe(expectedTotalPrice);
      await checkoutPage.expectPaymentDue(expectedTotalPrice);

      const successOrderPage = await checkoutPage.confirmOrder();
      await successOrderPage.expectOpened();
      await expect(successOrderPage.orderSuccessMessage).toBeVisible();
      await expect(successOrderPage.orderSuccessMessage).toHaveText('Your order is successfully completed!');
    });
  }
});