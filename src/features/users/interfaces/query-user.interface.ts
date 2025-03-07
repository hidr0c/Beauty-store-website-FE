import { BaseQuery } from "../../../common/interfaces/base-query.interface";
import { Gender, StatusActiveEnum } from "../../../constants/app.constant";


export interface QueryUser extends BaseQuery {
    status?: StatusActiveEnum;
    gender?: Gender;
}