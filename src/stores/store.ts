import { configureStore } from '@reduxjs/toolkit';
import productReducer from "../features/products/products.slice";
import alertReducer from "../features/alert/alert.slice";
import authReducer from "../features/auth/auth.slice";
import notificationReducer from "../features/notifications/notification.slice";
import inventoryReducer  from "../features/inventories/inventories.slice";
import categoriesReducer from "../features/categories/categories.slice";
import userReducer from "../features/users/users.slice";
import roleReducer from "../features/roles/roles.slice";
import cartReducer from "../features/carts/carts.slice";
import permissionReducer from "../features/permissions/permissions.slice";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from "redux";
import uploadReducer from "../features/upload/upload.slice"

const rootReducer = combineReducers({
    alert: alertReducer,
    notification: notificationReducer,
    products: productReducer,
    categories: categoriesReducer,
    auth: authReducer,
    users: userReducer,
    upload: uploadReducer,
    inventories: inventoryReducer,
    roles: roleReducer,
    permissions: permissionReducer,
    carts: cartReducer
});

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth'] 
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, 
        }),
});

export const persistor = persistStore(store);
