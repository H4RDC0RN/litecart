import { expect, Locator } from '@playwright/test';

export async function expectPrice(locator: Locator, expectedAmount: string) {
    await expect(locator).toHaveText(new RegExp(`^\\D${expectedAmount}$`));
}