import { Page, Locator, expect } from "@playwright/test";
import { CheckoutPage } from "../pages/checkout.page";
import { expectPrice } from "../../utils/expect-utils";

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

    async expectTotalPrice(amount: number) {
        const expectedAmount = Number.isInteger(amount) ? amount.toString() : amount.toFixed(2);
        await expectPrice(this.totalPrice, expectedAmount);
    }
}