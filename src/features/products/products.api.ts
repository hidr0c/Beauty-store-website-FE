import axiosInstance from "../../api/axios";
import { UUID } from "../../common/types/uuid.type";
import { QueryProduct } from "./interfaces/query-product.interface";
import { CreateProduct } from "./interfaces/create-product.interface";
import { UpdateProduct } from "./types/update-product.type";

// GET MANY
export const getProductsAPI = async (query: QueryProduct) => {
    const res = await axiosInstance.get('products', { params: query });
    return res.data.data;
};

// GET ONE
export const getProductByIdAPI = async (id: UUID) => {
    const res = await axiosInstance.get(`products/${id}`);
    return res.data.data;
};

//GET ONE BY SLUG
export const getProductBySlugAPI = async (slug: string) => {
    const res = await axiosInstance.get(`products/slug/${slug}`);
    return res.data.data;
}

//STATS 
export const statsProductsAPI = async () => {
    const res = await axiosInstance.get(`products/stats`);
    return res.data.data;
}

// CREATE
export const createProductAPI = async (data: CreateProduct) => {
    const res = await axiosInstance.post('products', data);
    return res.data.data;
};

// UPDATE
export const updateProductAPI = async (id: UUID, data: UpdateProduct) => {
    const res = await axiosInstance.patch(`products/${id}`, data);
    return res.data.data;
};

// REMOVE
export const removeProductAPI = async (id: UUID) => {
    await axiosInstance.delete(`products/${id}`);
  
};
