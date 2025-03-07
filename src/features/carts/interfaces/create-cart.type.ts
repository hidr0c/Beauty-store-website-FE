import { CreateOmitFields } from "../../../common/types/create-omit-feilds.type";
import { CartItems } from "./cart-items.interface";


export interface CreateCart extends Omit<CartItems, CreateOmitFields | 'product'> {
    productId: string
}