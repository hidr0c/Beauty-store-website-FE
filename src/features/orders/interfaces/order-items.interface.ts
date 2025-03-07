import { Product } from "../../products/interfaces/product.interface";


export interface OrderItem {
    id: number;
    product: Product;
    price: number;
    quantity: number;
    createdAt: Date;
    updatedAt: Date;
}