

export const ADMIN  = 'admin'

export enum DiscountPercentage {
    MIN = 0,
    MAX = 100
}
export enum Gender {
    MALE = 'male',
    FEMALE = 'female'
}

export enum StatusActiveEnum {
    ACTIVE = 'active',
    INACTIVE ='inactive'
}

export enum SortOrder {
    ASC = 'asc',
    DESC = 'desc'
}

export enum OrderStatus {
    PENDING = 'pending',
    CONFIRMED  = 'confirmed',
    PROCESSING  = 'processing',
    SHIPPED = 'shipped',
    DELIVERED = 'delivered',
    CANCELED = 'canceled',
    FAILED = 'failed'
}