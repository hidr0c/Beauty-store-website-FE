import { Product } from "../../products/interfaces/product.interface";


export interface CartItems {
    id: string;
    product: Product;
    quantity: number;
    createdAt: Date;
    updatedAt: Date;
}