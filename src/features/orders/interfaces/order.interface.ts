import { OrderStatus } from "../../../constants/app.constant";
import { OrderItem } from "./order-items.interface";


export interface Order {
    id: string;
    status: OrderStatus;
    userId: string;
    address: string;
    items: OrderItem[]
    createdAt: Date;
    updatedAt: Date;
}