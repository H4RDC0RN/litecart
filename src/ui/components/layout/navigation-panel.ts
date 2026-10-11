import { Page } from '@playwright/test';
import { LoginBox } from '@/ui/components/layout/login-box';
import { RecentlyViewedBox } from '@/ui/components/layout/recently-viewed-box';
import { AccountBox } from '@/ui/components/layout/account-box';

export class NavigationPanel {
    readonly login: LoginBox;
    readonly recentViewed: RecentlyViewedBox;
    readonly account: AccountBox;

    constructor(parent: Page) {
        const root = parent.locator('#navigation');
        this.login = new LoginBox(root.locator('#box-account-login'));
        this.recentViewed = new RecentlyViewedBox(root);
        this.account = new AccountBox(root);
    }

    async expectLoggedIn() {
        await this.account.expectVisible();
        await this.login.expectHidden();
    }
}