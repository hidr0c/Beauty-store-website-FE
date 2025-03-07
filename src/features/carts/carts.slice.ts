import { LoadingConstant } from '../../constants/loading.constant';
import { clearCart, createCart, fetchCart, removeCart, updateCart } from './carts.thunk';
import { CartState } from './interfaces/cart-state.interface';
import { createSlice } from "@reduxjs/toolkit";
import { Product } from '../products/interfaces/product.interface';



const initialState: CartState  = {
    cart: null,
    loading: LoadingConstant.IDLE,
    error: null
}
const cartSlice = createSlice({
    name: 'carts',
    initialState,
    reducers: {
        addCartNoAuth: (state,action) => {
            const {product, quantity} = action.payload;
            if(state.cart && state.cart.cart_items) {
                state.cart.cart_items.items.push({
                    id: '',
                    product: product as Product,
                    quantity: quantity as number,
                    createdAt: new Date(),
                    updatedAt: new Date()
                })
            }
        },
        getCartNoAuth: (state) => {
            state.cart = {
                cart_items: {
                    items: state.cart?.cart_items?.items ?? [],
                    pagination: null
                },
                createdAt: new Date(),
                updatedAt: new Date()
            }
        }
    },
    extraReducers: (builder) => {
        //GET CART 
        builder
        .addCase(fetchCart.pending, (state) => {
            state.loading = LoadingConstant.PENDING
        })
        .addCase(fetchCart.fulfilled, (state, action) => {
            state.loading = LoadingConstant.SUCCEEDED;
            state.cart = action.payload;
        })
        .addCase(fetchCart.rejected, (state, action) => {
            state.loading = LoadingConstant.FAILED;
            state.error = action.payload as string;
        })
        //CREATE CART 
        .addCase(createCart.fulfilled, (state, action) => {
            state.loading = LoadingConstant.SUCCEEDED;
            const index = state.cart?.cart_items.items.findIndex((item) => item.id === action.payload.id) as number;
            if (state.cart?.cart_items.items) {
                if(index !== -1) {
                    state.cart.cart_items.items[index] = action.payload;
                } else {
                    state.cart?.cart_items.items.unshift(action.payload);
                }
            }
            
        })
        //UPDATE CART 
        .addCase(updateCart.fulfilled, (state, action) => {
            state.loading = LoadingConstant.SUCCEEDED;
            const index = state.cart?.cart_items.items.findIndex((item) => item.id === action.payload.id);
            if (state.cart?.cart_items.items) {
                const index = state.cart.cart_items.items.findIndex((item) => item.id === action.payload.id);
                if (index !== -1) {
                    state.cart.cart_items.items[index] = action.payload;
                }
            }
        })
        //DELETE CART 
        .addCase(removeCart.fulfilled, (state, action) => {
            state.loading = LoadingConstant.SUCCEEDED;
            console.log(action.payload)
            if (state.cart?.cart_items.items) {
                state.cart.cart_items.items = state.cart.cart_items.items.filter((item) => item.product.id !== action.payload);
            }
            
        })
        //CLEAR CART 
        .addCase(clearCart.fulfilled, (state) => {
            state.loading = LoadingConstant.SUCCEEDED;
            if (state.cart?.cart_items.items) {
                state.cart.cart_items.items = []
            }
            
        })
    }
})

export const {addCartNoAuth, getCartNoAuth} = cartSlice.actions
export default cartSlice.reducer