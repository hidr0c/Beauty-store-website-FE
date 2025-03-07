import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    getCategoriesAPI,
    createCategoryAPI,
    getCategoryByIdAPI,
    updateCategoryByIdAPI,
    removeCategoryByIdAPI
} from "./categories.api";
import { QueryCategory } from "./interfaces/query-category.interface";
import { CreateCategory } from "./types/create-category.interface";
import { UpdateCategory } from "./types/update-category.interface";

// GET ALL CATEGORIES
export const fetchCategories = createAsyncThunk(
    "categories/fetchCategories",
    async (queryCategory: QueryCategory, { rejectWithValue }) => {
        try {
            return await getCategoriesAPI(queryCategory);
            
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// GET CATEGORY BY ID
export const fetchCategoryById = createAsyncThunk(
    "categories/fetchCategoryById",
    async (id: string, { rejectWithValue }) => {
        try {
            return await getCategoryByIdAPI(id);
            
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// CREATE CATEGORY
export const createCategory = createAsyncThunk(
    "categories/createCategory",
    async (newCategory: CreateCategory, { rejectWithValue }) => {
        try {
            return await createCategoryAPI(newCategory);
            
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// UPDATE CATEGORY
export const updateCategory = createAsyncThunk(
    "categories/updateCategory",
    async ({ id, updateData }: { id: string; updateData: UpdateCategory }, { rejectWithValue }) => {
        try {
            return await updateCategoryByIdAPI(id, updateData);
            
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// DELETE CATEGORY
export const removeCategory = createAsyncThunk(
    "categories/removeCategory",
    async (id: string, { rejectWithValue }) => {
        try {
            await removeCategoryByIdAPI(id);
            return id; 
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);
