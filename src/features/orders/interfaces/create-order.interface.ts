import { OrderStatus } from "../../../constants/app.constant";
import { CreateOrderItem } from "./create-order-item.interface";


export interface CreateOrder {
    userId: string;
    status: OrderStatus;
    address: string;
    items: CreateOrderItem[];
}