import { BaseQuery } from "../../../common/interfaces/base-query.interface";
import { StatusActiveEnum } from "../../../constants/app.constant";


export interface QueryCategory extends BaseQuery {
    status?: StatusActiveEnum
}