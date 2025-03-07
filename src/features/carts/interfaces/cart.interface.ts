import { Pagination } from "../../../common/interfaces/pagination.interface";
import { CartItems } from "./cart-items.interface";

interface Paginated {
    items: CartItems[];
    pagination: Pagination | null
}
export interface Cart {
    id: string;
    userId: string;
    cart_items: Paginated;
    createdAt: Date;
    updatedAt: Date;
}