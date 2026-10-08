import { Page } from '@playwright/test';
import { Cart } from './cart';

export class Header {
    readonly cart: Cart;

    constructor(private page: Page) {
        this.cart = new Cart(page);
    }
}