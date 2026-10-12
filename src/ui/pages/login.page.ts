import { Page, expect } from "@playwright/test";
import { Header } from "@/ui/components/layout/header";
import { LoginBox } from "@/ui/components/layout/login-box";
import { SiteMenu } from "@/ui/components/layout/site-menu";
import { Notices } from "@/ui/components/layout/notices";

const LOGIN_URL = '/login';

export class LoginPage {
    readonly header: Header;
    readonly siteMenu: SiteMenu;
    readonly notices: Notices;
    readonly login: LoginBox;

    constructor(private page: Page) {
        this.header = new Header(page);
        this.siteMenu = new SiteMenu(page);
        this.notices = new Notices(page);
        this.login = new LoginBox(page.locator('#box-login'));
    }

    async goto() {
        await this.page.goto(LOGIN_URL);
        await this.expectOpened();
    }

    async expectOpened() {
        await expect(this.page).toHaveURL(new RegExp(`${LOGIN_URL}$`));
    }
}