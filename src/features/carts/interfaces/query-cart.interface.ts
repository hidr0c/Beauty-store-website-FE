import { BaseQuery } from "../../../common/interfaces/base-query.interface";


export interface QueryCart extends BaseQuery{
    minQuantity?: number;
    maxQuantity?: number;
}