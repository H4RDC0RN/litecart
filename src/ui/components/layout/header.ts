import { Locator, Page } from '@playwright/test';
import { Cart } from '@/ui/components/layout/cart';
import { HomePage } from '@/ui/pages/home.page';

export class Header {
    readonly cart: Cart;
    private readonly homeButton: Locator

    constructor(private page: Page) {
        this.cart = new Cart(page);
        this.homeButton = page.locator('#logotype-wrapper').getByRole('link');
    }

    async openHomePage() {
        this.homeButton.click()
        return new HomePage(this.page);
    }
}