import { expect, Locator } from '@playwright/test';

export type ExpectOptions = { soft?: boolean };

export async function expectPrice(locator: Locator, expectedAmount: string, { soft = false }: ExpectOptions = {}) {
    const check = soft ? expect.soft : expect;
    await check(locator).toHaveText(new RegExp(`^\\D${expectedAmount}$`));
}