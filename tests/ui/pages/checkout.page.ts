import { Page, Locator } from '@playwright/test';
import { Header } from '../components/header';
import { SiteMenu } from '../components/site-menu';
import { extractNumber, NUMBER_REGEX } from '../../utils/string-utils';
import { OrderItem } from '../../models/order-item';
import { SuccessOrderPage } from './success-order.page';
import { expectPrice } from '../../utils/expect-utils';

type OrderColumnClass = 'quantity' | 'item' | 'unit-cost' | 'sum';

export class CheckoutPage {
    readonly header: Header;
    readonly siteMenu: SiteMenu;
    readonly paymentDue: Locator;

    private readonly productsTable: Locator;
    private readonly confirmButton: Locator;

    constructor(private page: Page) {
        this.header = new Header(page);
        this.siteMenu = new SiteMenu(page);
        this.productsTable = this.page.locator('#order_confirmation-wrapper table');
        this.paymentDue = this.productsTable.locator('tr.footer td').filter({ hasText: NUMBER_REGEX });
        this.confirmButton = this.page.locator('button[name="confirm_order"]');
    }

    async getOrderItem(productName: string): Promise<OrderItem> {
        const row = this.getProductRow(productName);

        return {
            productName: (await row.locator('td.item').textContent())!.trim(),
            quantity: Number(await row.locator('td').nth(await this.getColumnIndex('quantity')).textContent()),
            unitCost: extractNumber(await row.locator('td.unit-cost').textContent()),
            total: extractNumber(await row.locator('td.sum').textContent())
        };
    }

    async expectPaymentDue(amount: number) {
        await expectPrice(this.paymentDue, amount.toFixed(2));
    }

    async confirmOrder(): Promise<SuccessOrderPage> {
        await this.confirmButton.click();
        return new SuccessOrderPage(this.page);
    }

    private getProductRow(productName: string): Locator {
        return this.productsTable.locator('tr').filter({ hasText: productName });
    }

    private async getColumnIndex(columnClass: OrderColumnClass): Promise<number> {
        return this.productsTable.locator(`tr.header th.${columnClass}`)
            .evaluate(element => (element as HTMLTableCellElement).cellIndex);
    }
}