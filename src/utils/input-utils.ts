import { expect, Locator } from '@playwright/test';

export async function fillSecret(input: Locator, value: string) {
    await expect(input).toBeEditable();
    await input.evaluate((element, text) => {
        (element as HTMLInputElement).value = text;
        element.dispatchEvent(new Event('input', { bubbles: true }));
        element.dispatchEvent(new Event('change', { bubbles: true }));
    }, value);
}