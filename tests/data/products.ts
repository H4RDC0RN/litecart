import { Product } from '../models/product';

function defineProducts<TProductType extends string>(data: Record<TProductType, Product>): Record<TProductType, Product> {
    return data;
}
export const products = defineProducts({
    regular: {
        categoryPath: ['Rubber Ducks'],
        name: 'Red Duck',
        quantity: 3,
    },
    discounted: {
        categoryPath: ['Rubber Ducks', 'Subcategory'],
        name: 'Yellow Duck',
        quantity: 2,
        size: 'Small',
    },
});