import { Locator, Page, expect } from "@playwright/test";
import { ExpectOptions, expectPrice } from "@/utils/expect-utils";
import { CheckoutPage } from "@/ui/pages/checkout.page";

export class Cart {
    private readonly root: Locator;
    private readonly itemCount: Locator;
    private readonly totalPrice: Locator;
    private readonly checkoutLink: Locator;

    constructor(private readonly page: Page) {
        this.root = page.locator('#cart');
        this.itemCount = this.root.locator('.quantity');
        this.totalPrice = this.root.locator('.formatted_value');
        this.checkoutLink = this.root.locator('a.link');
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