import { Locator, expect } from '@playwright/test';

const TR = 'tr';
const TH = 'th';
const TD = 'td';

type TableOptions = {
    headerRowSelector?: string;
    rowSelector?: string;
};

export class Table<THeader extends string> {
    private readonly columns: Record<THeader, string>;
    private readonly headerRowLocator: Locator;
    private readonly rowLocator: Locator;

    constructor(root: Locator, columns: Record<THeader, string>, options: TableOptions = {}) {
        this.columns = columns;
        this.headerRowLocator = root.locator(options.headerRowSelector ?? `${TR}:has(${TH})`);
        this.rowLocator = root.locator(options.rowSelector ?? `${TR}:has(${TD})`);
    }

    async getRows(): Promise<Record<THeader, string>[]> {
        const headers = Object.keys(this.columns) as THeader[];
        const indexes = await Promise.all(headers.map(header => this.getColumnIndex(this.columns[header])));
        const cells = await this.getCells();
        return cells.map(rowCells =>
            Object.fromEntries(headers.map((header, i) => [header, rowCells[indexes[i]]])) as Record<THeader, string>);
    }

    async getRowCount(): Promise<number> {
        return this.rowLocator.count();
    }

    async expectRowCount(count: number) {
        await expect(this.rowLocator).toHaveCount(count);
    }

    async expectHasRows() {
        await expect(this.rowLocator.first()).toBeVisible();
    }

    private getColumnIndex(columnClass: string): Promise<number> {
        return this.headerRowLocator.locator(`${TH}.${columnClass}`)
            .evaluate(headerCell => (headerCell as HTMLTableCellElement).cellIndex);
    }

    private async getCells(): Promise<string[][]> {
        const rows = await this.rowLocator.all();
        return Promise.all(rows.map(async row => (await row.locator(TD).allInnerTexts()).map(text => text.trim())));
    }
}