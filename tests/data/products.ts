type TestProduct = {
    categoryPath: string[];
    name: string;
    quantity: number;
    size?: ProductSize;
};

export const productSizes = ['Small', 'Medium', 'Large'] as const;
export type ProductSize = typeof productSizes[number];

export const products: TestProduct[] = [
    {
        categoryPath: ['Rubber Ducks'],
        name: 'Red Duck',
        quantity: 3,
    },
    {
        categoryPath: ['Rubber Ducks', 'Subcategory'],
        name: 'Yellow Duck',
        quantity: 2,
        size: 'Small',
    }
]