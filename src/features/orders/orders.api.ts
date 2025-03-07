import axiosInstance from "../../api/axios";
import { CreateOrder } from "./interfaces/create-order.interface";
import { QueryOrder } from "./interfaces/query-order.interface";
import { UpdateOrder } from "./types/update-order.type";


//CREATE
export const createOrderAPI = async (createOrder: CreateOrder)  => {
    const res = await axiosInstance.post('orders',createOrder);
    return res.data.data;
} 

//UPDATE 
export const updateOrderAPI = async (id: string, updateOrder: UpdateOrder) => {
    const res = await axiosInstance.patch(`orders/${id}`,{
        data: updateOrder
    })
    return res.data.data
}

//GET MANY 
export const getOrdersAPI = async (queryOrder: QueryOrder) => {
    const res = await axiosInstance.get('orders',{
        params: queryOrder
    })
    return res.data.data;
}

//GET ONE 
export const getOrderByIdAPI = async (id: string) => {
    const res = await axiosInstance.get(`orders/${id}`);
    return res.data.data;
}

//REMOVE 
export const removeOrderAPI = async (id: string) :Promise<void> => {
    await axiosInstance.delete(`orders/${id}`);
}