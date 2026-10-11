import { Page, Locator, expect } from '@playwright/test';
import { Header } from '@/ui/components/layout/header';
import { SiteMenu } from '@/ui/components/layout/site-menu';

const ORDER_SUCCESS_URL = '/order_success';
const ORDER_SUCCESS_TEXT = 'Your order is successfully completed!';

export class SuccessOrderPage {
    readonly header: Header;
    readonly siteMenu: SiteMenu;

    private readonly successOrderView: Locator;
    private readonly orderSuccessMessage: Locator;

    constructor(private page: Page) {
        this.header = new Header(page);
        this.siteMenu = new SiteMenu(page);
        this.successOrderView = this.page.locator('#box-order-success');
        this.orderSuccessMessage = this.successOrderView.locator('.title');
    }

    async expectOrderCompleted() {
        await expect(this.page).toHaveURL(new RegExp(`${ORDER_SUCCESS_URL}$`));
        await expect(this.orderSuccessMessage).toHaveText(ORDER_SUCCESS_TEXT);
    }
}