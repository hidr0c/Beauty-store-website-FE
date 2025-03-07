import { BaseQuery } from "../../../common/interfaces/base-query.interface";


export interface QueryInvetory extends BaseQuery {
    minQuantity?: number;
    maxQuantity?: number;
}