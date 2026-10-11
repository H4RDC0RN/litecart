import { ExpectOptions } from "@/utils/expect-utils";
import { Locator, expect } from "@playwright/test";

export class RecentlyViewedBox {
    private readonly root: Locator;

    constructor(parent: Locator) {
        this.root = parent.locator('#box-recently-viewed-products');
    }

    async expectContains(productSlugs: string[], { soft = false }: ExpectOptions = {}) {
        const check = soft ? expect.soft : expect;
        for (const slug of productSlugs) {
            await check(this.root.locator(`a[href$="/${slug}"]`), `Product "${slug}" in Recently Viewed`).toHaveCount(1);
        }
    }
}