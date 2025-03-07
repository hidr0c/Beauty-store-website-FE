import moment from "moment";

export const formatPriceToVnd = (price: number = 0): string => {
    return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
}

export const formatVndToNumber = (price: string): number =>{
    return Number(price.replace(/\./g, "").replace(" VND", ""));
}

export const formatForInput = (date: Date): string => {
    return moment(date).format('YYYY-MM-DD');
}

export const formatDate = (date: Date): string => {
    return moment(date).format('MMMM Do YYYY');
}