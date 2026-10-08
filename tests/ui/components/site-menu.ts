import { Page, Locator } from '@playwright/test';
import { CategoryPage } from '../pages/category.page';

export class SiteMenu {
    private readonly siteMenu: Locator;

    constructor(private page: Page) {
        this.siteMenu = page.locator('#site-menu');
    }

    async openCategory(categoryPath: string[]): Promise<CategoryPage> {
        for (let i = 0; i < categoryPath.length; i++) {
            const categoryName = categoryPath[i];
            const isFinalCategory = i === categoryPath.length - 1;

            const category = this.siteMenu.getByRole('link', { name: categoryName, exact: true });

            if (isFinalCategory) {
                await category.click();
            } else {
                await category.hover();
            }
        }
        return new CategoryPage(this.page);
    }
}