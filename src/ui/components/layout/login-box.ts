import test, { Locator, expect } from "@playwright/test";

export class LoginBox {
    private readonly root: Locator;
    private readonly emailInput: Locator;
    private readonly passwordInput: Locator;
    private readonly loginButton: Locator;

    constructor(parent: Locator) {
        this.root = parent.locator('#box-account-login');
        this.emailInput = this.root.locator('input[name="email"]');
        this.passwordInput = this.root.locator('input[name="password"]');
        this.loginButton = this.root.locator('button[name="login"]');
    }

    async submit(email: string, password: string, masked = true) {
        await test.step('Log in', async () => {
            await this.emailInput.fill(email);
            await this.passwordInput.fill(password);
            await this.loginButton.click();
        }, { box: masked });
    }

    async expectHidden() {
        await expect(this.root).toBeHidden();
    }
}