import axiosInstance from "../../api/axios";
import { UUID } from "../../common/types/uuid.type";
import { CreateInventory } from "./interfaces/create-inventory.interface";
import { QueryInvetory } from "./interfaces/query-inventory.interface";
import { UpdateInventory } from "./types/update-inventory.type";


export const getInventoriesAPI = async (queryInventory: QueryInvetory) => {
    const res = await axiosInstance.get('inventories',{
        params: queryInventory
    })
    return res.data.data;
}

export const getInventoryByIdAPI = async (id: UUID) => {
    const res = await axiosInstance.get(`inventories/${id}`);
    return res.data.data;
}

export const createInventoryAPI = async (createInventory: CreateInventory) => {
    const res = await axiosInstance.post('inventories',createInventory);
    return res.data.data;
}

export const updateInventoryAPI = async (id: UUID, updateInventory: UpdateInventory) => {
    const res = await axiosInstance.patch(`inventories/${id}`, updateInventory);
    return res.data.data;
}

export const removeInventoryAPI = async (id: string) => {
    await axiosInstance.delete(`inventories/${id}`);
}