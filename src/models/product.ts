export type Product = {
    categoryPath: string[];
    name: string;
    hasDiscount: boolean;
    quantity: number;
    size?: ProductSize;
};

export const productSizes = ['Small', 'Medium', 'Large'] as const;
export type ProductSize = typeof productSizes[number];