import { Page, Locator } from '@playwright/test';
import { CategoryPage } from '../pages/category.page';

export class SiteMenu {
    private readonly siteMenu: Locator;

    constructor(private page: Page) {
        this.siteMenu = page.locator('#site-menu');
    }

    async openCategory(categoryPath: string[]): Promise<CategoryPage> {
        const categoriesBeforeLast = categoryPath.length - 1;

        for (let i = 0; i < categoriesBeforeLast; i++) {
            await this.getCategory(categoryPath[i]).hover();
        }

        await this.getCategory(categoryPath[categoriesBeforeLast]).click();
        return new CategoryPage(this.page);
    }

    private getCategory(categoryName: string): Locator {
        return this.siteMenu.getByRole('link', { name: categoryName, exact: true });
    }
}