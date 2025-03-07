import { Gender, StatusActiveEnum } from "../constants/app.constant";
import { PermissionName, PermissionResource } from "../constants/permission.enum";



export const transfromStatus = (status: StatusActiveEnum) => {
    return status === StatusActiveEnum.ACTIVE ? 'Hoạt động' : 'Không hoạt động'
}

export const transfromGender = (gender: Gender) => {
    return gender === Gender.MALE ? 'Nam' : 'Nữ'
}

export const getColorByStatus = (status: StatusActiveEnum) => {
    return status === StatusActiveEnum.ACTIVE ? 'green' : 'red'
}

export const transformReverseStatus = (status: StatusActiveEnum) => {
    return status === StatusActiveEnum.ACTIVE ? StatusActiveEnum.INACTIVE : StatusActiveEnum.ACTIVE
}

export const transformNamePermission = (permissionName: PermissionName): string => {

    switch(permissionName) {
        case PermissionName.CREATE: 
            return 'Tạo';
        case PermissionName.UPDATE: 
            return 'Sửa';
        case PermissionName.READ:
            return 'Đọc';
        case PermissionName.DELETE:
            return 'Xóa'
    }
}

export const transformResourcePermission = (permissionResource: PermissionResource): string => {
    switch (permissionResource) {
        case PermissionResource.USERS:
            return 'Người dùng';
        case PermissionResource.PRODUCTS:
            return 'Sản phẩm';
        case PermissionResource.CATEGORIES:
            return 'Danh mục';
        case PermissionResource.INVENTORIES:
            return 'Kho hàng';
        case PermissionResource.ROLES:
            return 'Vai trò';
        case PermissionResource.PERMISSIONS:
            return 'Quyền';
        case PermissionResource.ORDERS:
            return 'Đơn hàng';
        default:
            return 'Không xác định';
    }
};