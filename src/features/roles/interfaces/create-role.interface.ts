import { CreateOmitFields } from "../../../common/types/create-omit-feilds.type";
import { Roles } from "./role.interface";

export interface CreateRole extends Omit<Roles, CreateOmitFields | 'permissions'> {
    permissionIds?: string[];
}   