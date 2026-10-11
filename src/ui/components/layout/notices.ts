import { expect, Locator, Page } from '@playwright/test';
import { isReddish } from '@/utils/color-utils';

const WRONG_CREDENTIALS = 'Wrong password or the account is disabled, or does not exist';

export class Notices {
    private readonly root: Locator;
    private readonly error: Locator;

    constructor(private readonly page: Page) {
        this.root = page.locator('#notices');
        this.error = this.root.locator('.notice.errors');
    }

    async expectWrongCredentialsError() {
        await this.expectError(WRONG_CREDENTIALS);
    }

    async expectError(text: string) {
        await expect(this.error).toContainText(text);
    }

    async expectErrorReddish() {
        const color = await this.error.evaluate(el => getComputedStyle(el).backgroundColor);
        expect.soft(isReddish(color), `Error background is ${color}, expected a reddish color`).toBe(true);
    }
}