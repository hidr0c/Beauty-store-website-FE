import axiosInstance from "../../api/axios"
import { CreateRole } from "./interfaces/create-role.interface";
import { QueryRole } from "./interfaces/query-role.interface"
import { UpdateRole } from "./types/update-role.type";



export const getRolesAPI = async (queryRole: QueryRole) => {
    const res = await axiosInstance.get('roles',{
        params: queryRole
    })

    return res.data.data;
}

export const getRoleByIdAPI = async (id: string) => {
    const res = await axiosInstance.get(`roles/${id}`)
    return res.data.data;
}

export const createRoleAPI = async (data: CreateRole) => {
    const res = await axiosInstance.post('roles',data);
    return res.data.data;
}

export const updateRoleAPI = async (id: string, updateRole: UpdateRole) => {
    const res = await axiosInstance.patch(`roles/${id}`, updateRole);
    return res.data.data
}

export const removeRoleAPI = async (id: string) => {
    await axiosInstance.delete(`roles/${id}`)
}