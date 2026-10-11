import { OrderItem } from "@/models/order-item";
import { Product } from "@/models/product";
import { HomePage } from "@/ui/pages/home.page";

export type AddedProducts = {
    orderItems: OrderItem[];
    productSlugs: string[];
};

export async function addProductsToCart(homePage: HomePage, products: Product[]): Promise<AddedProducts> {
    const orderItems: OrderItem[] = [];
    const productSlugs: string[] = [];

    for (const product of products) {
        const categoryPage = await homePage.siteMenu.openCategory(product.categoryPath);
        const productPage = await categoryPage.openProduct(product.name);
        orderItems.push(await productPage.addToCart(product));
        productSlugs.push(productPage.getSlug());
    }
    return { orderItems, productSlugs };
}