

export const camulatorDiscountPrice = (price: number, discount: number) => {
    return price * (100 - discount) /100
}