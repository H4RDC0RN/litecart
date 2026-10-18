import { fillSecret } from "@/utils/input-utils";
import test, { Locator, expect } from "@playwright/test";

export class LoginBox {
    private readonly root: Locator;
    private readonly emailInput: Locator;
    private readonly passwordInput: Locator;
    private readonly loginButton: Locator;

    constructor(root: Locator) {
        this.root = root;
        this.emailInput = this.root.locator('input[name="email"]');
        this.passwordInput = this.root.locator('input[name="password"]');
        this.loginButton = this.root.locator('button[name="login"]');
    }

    async submit(email: string, password: string, masked = true) {
        const fill = (input: Locator, value: string) => masked ? fillSecret(input, value) : input.fill(value);

        await test.step('Log in', async () => {
            await fill(this.emailInput, email);
            await fill(this.passwordInput, password);
            await this.loginButton.click();
        });
    }

    async expectHidden() {
        await expect(this.root).toBeHidden();
    }
}