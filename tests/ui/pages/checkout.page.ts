import { Page, Locator, expect } from '@playwright/test';
import { Header } from '../components/header';
import { SiteMenu } from '../components/site-menu';
import { extractNumber, NUMBER_REGEX } from '../../utils/string-utils';
import { OrderItem } from '../../models/order-item';
import { SuccessOrderPage } from './success-order.page';
import { expectPrice } from '../../utils/expect-utils';
import { Table } from '../components/table';

const ORDER_COLUMN_CLASSES = {
    productName: 'item',
    quantity: 'quantity',    
    unitCost: 'unit-cost',
    sku: 'sku',
    tax: 'tax',
    total: 'sum',
} as const;

export class CheckoutPage {
    readonly header: Header;
    readonly siteMenu: SiteMenu;
    readonly paymentDue: Locator;

    private readonly checkoutCartView: Locator;
    private readonly shortcuts: Locator;
    private readonly removeButton: Locator;
    private readonly emptyCartMessage: Locator;
    private readonly tableContainer: Locator;
    private readonly orderTable: Table<keyof typeof ORDER_COLUMN_CLASSES>;
    private readonly confirmButton: Locator;

    constructor(private page: Page) {
        this.header = new Header(page);
        this.siteMenu = new SiteMenu(page);

        this.checkoutCartView = this.page.locator('#checkout-cart-wrapper');
        this.shortcuts = this.checkoutCartView.locator('li.shortcut');
        this.removeButton = this.checkoutCartView.locator('button[name="remove_cart_item"]');
        this.emptyCartMessage = this.checkoutCartView.getByText('There are no items in your cart.');

        this.tableContainer = this.page.locator('#order_confirmation-wrapper table');
        this.orderTable = new Table(this.tableContainer, ORDER_COLUMN_CLASSES, { rowSelector: 'tr:has(td.item)' });
        this.paymentDue = this.tableContainer.locator('tr.footer td').filter({ hasText: NUMBER_REGEX });
        this.confirmButton = this.page.locator('button[name="confirm_order"]');
    }

    async clearCart() {
        const productCount = await this.orderTable.getRows().then(rows => rows.length);
        const itemsBeforeLastCount = productCount - 1;

        if (productCount > 0) {
            for (let i = 0; i < itemsBeforeLastCount; i++) {
                await this.shortcuts.first().click();
                await this.removeButton.first().click();
                await this.orderTable.expectRowCount(itemsBeforeLastCount - i);
            }

            await this.removeButton.click();
        }
        await expect(this.emptyCartMessage).toBeVisible();
    }

    async getOrderItems(): Promise<OrderItem[]> {
        await this.orderTable.expectHasRows();
        const rows = await this.orderTable.getRows();
        return rows.map(row => ({
            productName: row.productName,
            quantity: Number(row.quantity),
            unitCost: extractNumber(row.unitCost),
            total: extractNumber(row.total)
        }));
    }

    async getOrderItem(productName: string): Promise<OrderItem> {
        const item = (await this.getOrderItems()).find(i => i.productName === productName);
        if (!item) throw new Error(`Product "${productName}" not found in order table`);
        return item;
    }

    async expectPaymentDue(amount: number) {
        await expectPrice(this.paymentDue, amount.toFixed(2));
    }

    async confirmOrder(): Promise<SuccessOrderPage> {
        await this.confirmButton.click();
        return new SuccessOrderPage(this.page);
    }
}