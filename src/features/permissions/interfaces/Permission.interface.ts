import { UUID } from "../../../common/types/uuid.type";
import { PermissionName, PermissionResource } from "../../../constants/permission.enum";

export interface Permission {
    id: UUID;
    name: PermissionName;
    resource: PermissionResource;
    createdAt: Date;
    updatedAt: Date;

}