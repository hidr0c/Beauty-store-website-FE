import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoadingConstant } from "../../constants/loading.constant";
import { Product } from "./interfaces/product.interface";
import { GeneralInitialState } from "../../common/interfaces/general-initial-state";
import { fetchProducts, fetchProductById, createProduct, updateProduct, removeProduct, statsProducts, fetchProductBySlug } from "./products.thunk";
import { PayloadList, PayloadRemove } from "../../common/types/payload.type";
import { ProductStats } from "./interfaces/product-stats.interface";

const initialState: GeneralInitialState<Product, ProductStats> = {
    pagination: null,
    items: [],
    item: null,
    loading: LoadingConstant.IDLE,
    error: null,
    stats: null

};

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            //Fetch products
            .addCase(fetchProducts.pending, (state) => {
                state.loading = LoadingConstant.PENDING;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<PayloadList<Product>>) => {
                state.loading = LoadingConstant.SUCCEEDED;
                state.items = action.payload.items;
                state.pagination = action.payload.pagination;
            })
            .addCase(fetchProducts.rejected, (state, action: PayloadAction<any>) => {
                state.loading = LoadingConstant.FAILED;
                state.error = action.payload || "Failed to fetch products";


            })
            //Fetch product by id
            .addCase(fetchProductById.pending, (state) => {
                state.loading = LoadingConstant.PENDING;
                state.error = null;
            })
            .addCase(fetchProductById.fulfilled, (state, action: PayloadAction<Product>) => {
                state.loading = LoadingConstant.SUCCEEDED;
                state.item = action.payload;
            })
            .addCase(fetchProductById.rejected, (state, action: PayloadAction<any>) => {
                state.loading = LoadingConstant.FAILED;
                state.error = action.payload || "Failed to fetch product";
            })
            //Fetch product by slug
            .addCase(fetchProductBySlug.pending, (state) => {
                state.loading = LoadingConstant.PENDING
            })
            .addCase(fetchProductBySlug.fulfilled, (state, action) => {
                state.loading = LoadingConstant.SUCCEEDED
                state.item = action.payload
            })
            .addCase(fetchProductBySlug.rejected, (state, action) => {
                state.loading = LoadingConstant.PENDING;
                console.log(action)
            })
            //Create product
            .addCase(createProduct.fulfilled, (state, action: PayloadAction<Product>) => {
                state.items.unshift(action.payload);
            })
            //Update product
            .addCase(updateProduct.fulfilled, (state, action: PayloadAction<Product>) => {
                const index = state.items.findIndex((item) => item.id === action.payload.id);
                if (index !== -1) state.items[index] = action.payload;
            })
            .addCase(updateProduct.rejected, (state, action) => {
                console.log(action)
            })
            //Remove product
            .addCase(removeProduct.fulfilled, (state, action) => {
                state.items = state.items.filter((item) => item.id !== action.payload);
            })
            //Stats product
            .addCase(statsProducts.pending, (state) => {
                state.loading = LoadingConstant.PENDING
            })
            .addCase(statsProducts.fulfilled, (state, action) => {
                state.loading = LoadingConstant.SUCCEEDED
                state.stats = action.payload;
                
            })
    },
});

export default productSlice.reducer;
