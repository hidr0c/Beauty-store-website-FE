import axiosInstance from "../../api/axios";
import { QueryCategory } from "./interfaces/query-category.interface";
import { CreateCategory } from "./types/create-category.interface";
import { UpdateCategory } from "./types/update-category.interface";



export const getCategoriesAPI = async (queryCategory: QueryCategory) => {
    const res = await axiosInstance.get('categories',{
        params: queryCategory
    })
    return res.data.data;
}

export const createCategoryAPI = async (createCategory: CreateCategory) => {
    const res = await axiosInstance.post('categories',createCategory);
    return res.data.data;
}

export const getCategoryByIdAPI = async (id: string) => {
    const res = await axiosInstance.get(`categories/${id}`);
    return res.data.data;
}

export const updateCategoryByIdAPI = async (id: string, updateCategory: UpdateCategory) => {
    const res =await axiosInstance.patch(`categories/${id}`,updateCategory);
    return res.data.data;
}

export const removeCategoryByIdAPI = async (id: string) => {
    await axiosInstance.delete(`categories/${id}`);

}