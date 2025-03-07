import { CreateOmitFields } from "../../../common/types/create-omit-feilds.type";
import { Category } from "../interfaces/category.interface";



export type CreateCategory = Omit<Category, CreateOmitFields | 'slug' >;