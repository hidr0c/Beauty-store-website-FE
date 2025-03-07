import axiosInstance from "../../api/axios";
import { UUID } from "../../common/types/uuid.type";
import { QueryUser } from "./interfaces/query-user.interface";
import { CreateUser } from "./types/create-user.type";
import { UpdateUser } from "./types/update-user.type";


export const getUsersAPI = async (queryUser: QueryUser) => {
    const res = await axiosInstance.get('users',{
        params: queryUser
    })
    return res.data.data;
}

export const getCurrentUserAPI = async () => {
    const res = await axiosInstance.get(`users/me`);
    return res.data.data;
}


export const createUserAPI = async (createUser: CreateUser) => {
    const res = await axiosInstance.post('users',createUser);
    return res.data.data;
}

export const updateUserApi = async (id: UUID, updateUser: UpdateUser) => {
    const res = await axiosInstance.patch(`users/${id}`,updateUser);
    return res.data.data;
}

export const getUserByIdAPI = async (id: UUID) => {
    const res = await axiosInstance.get(`users/${id}`);
    return res.data.data;
}

export const removeUserAPI = async (id: UUID) => {
    await axiosInstance.delete(`users/${id}`);
}