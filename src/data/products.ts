import { Product } from '@/models/product';

function defineProducts<TKey extends string>(data: Record<TKey, Product>): Record<TKey, Product> {
    return data;
}

export const products = defineProducts({
    regular: {
        categoryPath: ['Rubber Ducks'],
        name: 'Red Duck',
        hasDiscount: false,
        quantity: 3,
    },
    discounted: {
        categoryPath: ['Rubber Ducks', 'Subcategory'],
        name: 'Yellow Duck',
        hasDiscount: true,
        quantity: 2,
        size: 'Small',
    },
});