import { SortOrder } from "../../constants/app.constant";


export interface BaseQuery {
    keyword?: string
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: SortOrder;
    startCreatedAt?: Date;
    endCreatedAt?: Date;
    startUpdatedAt?: Date;
    endUpdatedAt?: Date;


}