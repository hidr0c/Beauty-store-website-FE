import { createSlice } from "@reduxjs/toolkit";
import { GeneralInitialState } from "../../common/interfaces/general-initial-state";
import { Category } from "./interfaces/category.interface";
import { LoadingConstant } from "../../constants/loading.constant";
import {
    fetchCategories,
    fetchCategoryById,
    createCategory,
    updateCategory,
    removeCategory
} from "./categories.thunk";

const initialState: GeneralInitialState<Category> = {
    pagination: null,
    items: [],
    item: null,
    loading: LoadingConstant.IDLE,
    error: null
};

const categorySlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            //FETCH CATEGORIES
            .addCase(fetchCategories.pending, (state) => {
                state.loading = LoadingConstant.PENDING;
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.loading = LoadingConstant.SUCCEEDED;
                state.items = action.payload.items;
                state.pagination = action.payload.pagination;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.loading = LoadingConstant.FAILED;
                state.error = action.payload as string;
            })
            //FETCH CATEGORIES BY ID
            .addCase(fetchCategoryById.pending, (state) => {
                state.loading = LoadingConstant.PENDING;
            })
            .addCase(fetchCategoryById.fulfilled, (state, action) => {
                state.loading = LoadingConstant.SUCCEEDED;
                state.item = action.payload;
            })
            .addCase(fetchCategoryById.rejected, (state, action) => {
                state.loading = LoadingConstant.FAILED;
                state.error = action.payload as string;
            })
            //CREATE CATEGORY 
            .addCase(createCategory.pending, (state) => {
                state.loading = LoadingConstant.PENDING;
            })
            .addCase(createCategory.fulfilled, (state, action) => {
                state.loading = LoadingConstant.SUCCEEDED;
                state.items.unshift(action.payload);
            })
            .addCase(createCategory.rejected, (state, action) => {
                state.loading = LoadingConstant.FAILED;
                state.error = action.payload as string;
            })
            //UPDATE CATEGORY
            .addCase(updateCategory.pending, (state) => {
                state.loading = LoadingConstant.PENDING;
            })
            .addCase(updateCategory.fulfilled, (state, action) => {
                state.loading = LoadingConstant.SUCCEEDED;
                state.items = state.items.map(category => category.id === action.payload.id ? action.payload : category);
            })
            .addCase(updateCategory.rejected, (state, action) => {
                state.loading = LoadingConstant.FAILED;
                state.error = action.payload as string;
            })
            //REMOVE CATEGORY
            .addCase(removeCategory.pending, (state) => {
                state.loading = LoadingConstant.PENDING;
            })
            .addCase(removeCategory.fulfilled, (state, action) => {
                state.loading = LoadingConstant.SUCCEEDED;
                state.items = state.items.filter(category => category.id !== action.payload);
            })
            .addCase(removeCategory.rejected, (state, action) => {
                state.loading = LoadingConstant.FAILED;
                state.error = action.payload as string;
            });
    }
});

export default categorySlice.reducer;
