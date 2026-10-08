import { Page, Locator, expect } from '@playwright/test';

export class NavigationPanel {
    private readonly navigationPanel: Locator;
    private readonly loginSection: Locator;
    private readonly emailInput: Locator;
    private readonly passwordInput: Locator;
    private readonly loginButton: Locator;
    private readonly accountSection: Locator;

    constructor(private page: Page) {
        this.navigationPanel = page.locator('#navigation');
        this.loginSection = this.navigationPanel.locator('#box-account-login');
        this.emailInput = this.loginSection.locator('input[name="email"]');
        this.passwordInput = this.loginSection.locator('input[name="password"]');
        this.loginButton = this.loginSection.locator('button[name="login"]');
        this.accountSection = this.navigationPanel.locator('#box-account');
    }

    async login(email: string, password: string) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async expectLoggedIn() {
        await expect(this.accountSection).toBeVisible();
        await expect(this.emailInput).toBeHidden();
    }
}