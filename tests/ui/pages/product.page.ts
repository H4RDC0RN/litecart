import { Page, Locator } from '@playwright/test';
import { Header } from '../components/header';
import { SiteMenu } from '../components/site-menu';
import { extractNumber } from '../../utils/string-utils';

export class ProductPage {
    readonly header: Header;
    readonly siteMenu: SiteMenu;
    readonly productName: Locator;

    private readonly productView: Locator;
    private readonly productPrice: Locator;
    private readonly quantityInput: Locator;
    private readonly addToCartButton: Locator;

    constructor(private page: Page) {
        this.header = new Header(page);
        this.siteMenu = new SiteMenu(page);
        this.productView = page.locator('#box-product');
        this.productName = this.productView.locator('.title[itemprop="name"]');
        this.productPrice = this.productView.locator('.price');
        this.quantityInput = this.productView.locator('input[name="quantity"]');
        this.addToCartButton = this.productView.locator('button[name="add_cart_product"]');
    }

    async getProductPrice(): Promise<number> {
        return extractNumber(await this.productPrice.textContent());
    }

    async addToCart(quantity: number) {
        await this.quantityInput.fill(quantity.toString());
        await this.addToCartButton.click();
    }
}