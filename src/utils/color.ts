import { ColorCrudConstant } from "../constants/color-crud.constant"
import { PermissionName } from "../constants/permission.enum"

export const getColorCrud = (permissionName: PermissionName) => {

    switch(permissionName) {
        case PermissionName.CREATE: 
            return ColorCrudConstant.CREATE;
        case PermissionName.UPDATE:
            return ColorCrudConstant.UPDATE;
        case PermissionName.READ:
            return ColorCrudConstant.READ;
        case PermissionName.DELETE:
            return ColorCrudConstant.DELETE;
        default: 
            return "default"
    }

}