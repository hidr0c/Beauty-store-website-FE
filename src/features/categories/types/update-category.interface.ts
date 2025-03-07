import { CreateOmitFields } from "../../../common/types/create-omit-feilds.type";
import { Category } from "../interfaces/category.interface";


export type UpdateCategory = Partial<Omit<Category, CreateOmitFields>>