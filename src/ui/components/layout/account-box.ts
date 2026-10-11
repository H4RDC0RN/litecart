import { expect, Locator } from "@playwright/test";

export class AccountBox {
    private readonly root: Locator;
    private readonly logoutLink: Locator;

    constructor(parent: Locator) {
        this.root = parent.locator('#box-account');
        this.logoutLink = this.root.locator('a[href$="/logout"]')
    }

    async expectVisible() {
        await expect(this.root).toBeVisible();
    }
}