import { Page, Locator, expect } from '@playwright/test';
import { extractNumber } from '@/utils/string-utils';
import { OrderItem } from '@/models/order-item';
import { Product } from '@/models/product';
import { Header } from '@/ui/components/layout/header';
import { SiteMenu } from '@/ui/components/layout/site-menu';

export class ProductPage {
    readonly header: Header;
    readonly siteMenu: SiteMenu;

    private readonly productView: Locator;
    private readonly productNameLabel: Locator;
    private readonly productPriceLabel: Locator;
    private readonly quantityInput: Locator;
    private readonly sizeSelector: Locator;
    private readonly addToCartButton: Locator;

    constructor(private page: Page) {
        this.header = new Header(page);
        this.siteMenu = new SiteMenu(page);

        this.productView = page.locator('#box-product');
        this.productNameLabel = this.productView.locator('.title[itemprop="name"]');
        this.productPriceLabel = this.productView.locator('.price-wrapper [itemprop="price"]');
        this.quantityInput = this.productView.locator('input[name="quantity"]');
        this.sizeSelector = this.productView.locator('select[name*="size" i]');
        this.addToCartButton = this.productView.locator('button[name="add_cart_product"]');
    }

    getSlug(): string {
        return new URL(this.page.url()).pathname.split('/').filter(Boolean).pop()!;
    }

    async expectProductName(productName: string) {
        await expect(this.productNameLabel).toHaveText(productName);
    }

    async getPrice(): Promise<number> {
        return extractNumber(await this.productPriceLabel.textContent());
    }

    async addToCart(product: Product): Promise<OrderItem> {
        const itemsBefore = await this.header.cart.getItemCount();
        await this.quantityInput.fill(product.quantity.toString());
        if (product.size) {
            await this.sizeSelector.selectOption(product.size);
        }
        await this.addToCartButton.click();
        await this.header.cart.expectItemCount(itemsBefore + product.quantity);
        return new OrderItem(product.name, product.quantity, await this.getPrice());
    }
}