import { StatusActiveEnum } from "../../../constants/app.constant";
import { Permission } from "../../permissions/interfaces/Permission.interface";


export interface Roles {
    id: string;
    title: string;
    description: string;
    status: StatusActiveEnum;
    permissions: Permission[]
    createdAt: Date;
    updatedAt: Date;
}