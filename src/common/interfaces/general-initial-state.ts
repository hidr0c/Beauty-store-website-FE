import { LoadingConstant } from "../../constants/loading.constant";
import { Pagination } from "./pagination.interface";

//T = items type
//S = stats
export interface GeneralInitialState<T, S = unknown> {
    pagination: Pagination | null;
    items: T[];
    item: T | null;
    loading: LoadingConstant;
    error: string | null;
    stats?: S | null; //Statistical
    [key: string]: unknown

}