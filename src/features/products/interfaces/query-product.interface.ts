import { BaseQuery } from "../../../common/interfaces/base-query.interface";
import { StatusActiveEnum } from "../../../constants/app.constant";


export interface QueryProduct extends BaseQuery {
    minPrice?: number;
    maxPrice?: number;
    minPercentage?: number;
    maxPercentage?: number;
    status?: StatusActiveEnum;
    categorySlug?: string;
}