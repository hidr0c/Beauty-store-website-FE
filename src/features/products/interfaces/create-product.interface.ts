import { CreateOmitFields } from "../../../common/types/create-omit-feilds.type";
import { Product } from "./product.interface";


export interface CreateProduct extends Omit<Product,CreateOmitFields | 'price' | 'slug' | 'category'> {
    price: string | number
    categoryId: string
}