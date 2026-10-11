import { Page, Locator, expect } from '@playwright/test';
import { Header } from '../components/header';
import { SiteMenu } from '../components/site-menu';

const ORDER_SUCCESS_URL = '/order_success';

export class SuccessOrderPage {
    readonly header: Header;
    readonly siteMenu: SiteMenu;
    readonly orderSuccessMessage: Locator;

    private readonly successOrderView: Locator;

    constructor(private page: Page) {
        this.header = new Header(page);
        this.siteMenu = new SiteMenu(page);
        this.successOrderView = this.page.locator('#box-order-success');
        this.orderSuccessMessage = this.successOrderView.locator('.title');
    }

    async expectOpened() {
        await expect(this.page).toHaveURL(new RegExp(`${ORDER_SUCCESS_URL}$`));
    }
}