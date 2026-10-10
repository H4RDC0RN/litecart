export class OrderItem {
    readonly productName: string;
    readonly quantity: number;
    readonly unitCost: number;
    readonly total: number;

    constructor(productName: string, quantity: number, unitCost: number) {
        this.productName = productName;
        this.quantity = quantity;
        this.unitCost = unitCost;
        this.total = Math.round(unitCost * 100) * quantity / 100;
    }
};

export const byProductName = (a: OrderItem, b: OrderItem) => a.productName.localeCompare(b.productName);

export const sortByProductName = (items: OrderItem[]): OrderItem[] => [...items].sort(byProductName);

export const sumTotals = (items: OrderItem[]): number => items.reduce((sum, item) => sum + item.total, 0);