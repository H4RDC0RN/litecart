import { Page, Locator } from '@playwright/test';
import { ProductPage } from './product.page';

export class CategoryPage {
    private readonly categoryView: Locator;
    private readonly products: Locator;

    constructor(private readonly page: Page) {
        this.categoryView = page.locator('#box-category');
        this.products = this.categoryView.locator('ul.products');
    }

    async openProduct(productName: string): Promise<ProductPage> {
        const product = this.products.locator('a.link').filter({ hasText: productName });
        await product.click();
        return new ProductPage(this.page);
    }
}