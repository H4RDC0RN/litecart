import { OrderItem } from "../models/order-item";
import { Product } from "../models/product";
import { HomePage } from "../ui/pages/home.page";

export async function addProductsToCart(homePage: HomePage, products: Product[]): Promise<OrderItem[]> {
    const items: OrderItem[] = [];
    for (const product of products) {
        const categoryPage = await homePage.siteMenu.openCategory(product.categoryPath);
        const productPage = await categoryPage.openProduct(product.name);
        items.push(await productPage.addToCart(product));
    }
    return items;
}