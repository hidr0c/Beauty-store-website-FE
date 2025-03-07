import { BaseQuery } from "../../../common/interfaces/base-query.interface";
import { StatusActiveEnum } from "../../../constants/app.constant";


export interface QueryRole extends BaseQuery {
    status?: StatusActiveEnum;
}