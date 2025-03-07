import { CreateOrder } from "../interfaces/create-order.interface";


export type UpdateOrder = Pick<CreateOrder, 'status'>;