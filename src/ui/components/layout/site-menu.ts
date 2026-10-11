import { Page, Locator } from '@playwright/test';
import { CategoryPage } from '@/ui/pages/category.page';

export class SiteMenu {
    private readonly root: Locator;

    constructor(private readonly page: Page) {
        this.root = page.locator('#site-menu');
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
        return this.root.getByRole('link', { name: categoryName, exact: true });
    }
}