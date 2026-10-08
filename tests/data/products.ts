type TestProduct = {
    categoryPath: string[];
    name: string;
    quantity: number;
};

export const products = {
    regular: {
        categoryPath: ['Rubber Ducks'],
        name: 'Red Duck',
        quantity: 3,
    },

    discounted: {
        categoryPath: ['Rubber Ducks', 'Subcategory'],
        name: 'Yellow Duck',
        quantity: 2,
    }
} satisfies Record<string, TestProduct>;