import { Pagination } from "../interfaces/pagination.interface";
import { UUID } from "./uuid.type";


export type PayloadList<T> = {
    items: T[];
    pagination: Pagination
}

export type PayloadRemove<T> = {
    id: T;
}