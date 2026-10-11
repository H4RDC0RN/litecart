import { Locator, Page, expect } from "@playwright/test";
import { ExpectOptions, expectPrice } from "../../utils/expect-utils";
import { CheckoutPage } from "../pages/checkout.page";

export class Cart {
    private readonly cart: Locator;
    private readonly checkoutLink: Locator;

    readonly itemCount: Locator;
    readonly totalPrice: Locator;

    constructor(private readonly page: Page) {
        this.cart = page.locator('#cart');
        this.itemCount = this.cart.locator('.quantity');
        this.totalPrice = this.cart.locator('.formatted_value');
        this.checkoutLink = this.cart.locator('a.link');
    }

    async openCheckout(): Promise<CheckoutPage> {
        await this.checkoutLink.click();
        return new CheckoutPage(this.page);
    }

    async getItemCount(): Promise<number> {
        return Number((await this.itemCount.textContent())?.trim());
    }

    async isCartEmpty(): Promise<boolean> {
        return await this.getItemCount() === 0;
    }

    async expectItemCount(count: number) {
        await expect(this.itemCount).toHaveText(count.toString());
    }

    async expectTotalPrice(amount: number, options?: ExpectOptions) {
        const expectedAmount = Number.isInteger(amount) ? amount.toString() : amount.toFixed(2);
        await expectPrice(this.totalPrice, expectedAmount, options);
    }
}