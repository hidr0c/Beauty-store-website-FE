import { message } from 'antd';

import { createAsyncThunk } from "@reduxjs/toolkit";
import * as productAPI from "./products.api";
import { UpdateThunk } from "../../common/types/update-thunk.type";
import { UpdateProduct } from "./types/update-product.type";
import { CreateProduct } from "./interfaces/create-product.interface";
import { QueryProduct } from "./interfaces/query-product.interface";
import { UUID } from "../../common/types/uuid.type";
import { AxiosError } from "axios";

// GET MANY
export const fetchProducts = createAsyncThunk(
    "products/fetchProducts",
    async (query: QueryProduct, { rejectWithValue }) => {
        try {
            return await productAPI.getProductsAPI(query);
        } catch (error: AxiosError<unknown, unknown>) {
            return rejectWithValue(error.response.data);
        }
    }
);

//STATS
export const statsProducts = createAsyncThunk(
    "products/statsProducts",
    async (_, {rejectWithValue}) => {
        try {
            return await productAPI.statsProductsAPI();

        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

// GET ONE
export const fetchProductById = createAsyncThunk(
    "products/fetchProductById",
    async (id: UUID, { rejectWithValue }) => {
        try {
            return await productAPI.getProductByIdAPI(id);
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

//FETCH PRODUCT BY SLUG
export const fetchProductBySlug = createAsyncThunk(
    "products/getOneBySlug",
    async (slug: string, {rejectWithValue}) => {
        try {
            return await productAPI.getProductBySlugAPI(slug)
        } catch (error) {
            return rejectWithValue(error);
        }
    }
)

// CREATE
export const createProduct = createAsyncThunk(
    "products/createProduct",
    async (data: CreateProduct, { rejectWithValue }) => {
        try {
            return await productAPI.createProductAPI(data);
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

// UPDATE
export const updateProduct = createAsyncThunk(
    "products/updateProduct",
    async ({ id, data }: UpdateThunk<UUID, UpdateProduct>, { rejectWithValue }) => {
        try {
            return await productAPI.updateProductAPI(id, data);
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

// REMOVE
export const removeProduct = createAsyncThunk(
    "products/removeProduct",
    async (id: UUID, { rejectWithValue }) => {
        try {
            await productAPI.removeProductAPI(id);
            return id
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);
