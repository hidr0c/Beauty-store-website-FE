
import { CreateOmitFields } from "../../../common/types/create-omit-feilds.type";
import { UUID } from "../../../common/types/uuid.type";
import { Inventory } from "./inventory.interface";


export interface CreateInventory extends Omit<Inventory, CreateOmitFields | 'product' > {
    productId: UUID;
}