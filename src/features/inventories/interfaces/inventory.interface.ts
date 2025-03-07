import { UUID } from "../../../common/types/uuid.type";
import { Product } from "../../products/interfaces/product.interface";


export interface Inventory {
    id: UUID;
    supplier: string;
    address: string;
    quantity: number;
    product: Product
    createdAt: Date;
    updatedAt: Date;

}