import { BaseQuery } from "../../../common/interfaces/base-query.interface";
import { OrderStatus } from "../../../constants/app.constant";


export interface QueryOrder extends BaseQuery {
    status?: OrderStatus;
    userId?: string;
    minTotalPrice?: number;
    maxTotalPrice?: number;
    minOrderCount?: number;
    maxOrderCount?: number;
}