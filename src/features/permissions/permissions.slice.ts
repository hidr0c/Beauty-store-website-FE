import { createSlice } from "@reduxjs/toolkit";
import { GeneralInitialState } from "../../common/interfaces/general-initial-state";
import { LoadingConstant } from "../../constants/loading.constant";
import { Permission } from "./interfaces/Permission.interface";
import { fetchPermissions } from "./permissions.thunk";

const initialState: GeneralInitialState<Permission> = {
    pagination: null,
    items: [],
    item: null,
    loading: LoadingConstant.IDLE,
    error: null
};

const permissionsSlice = createSlice({
    name: "permissions",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPermissions.pending, (state) => {
                state.loading = LoadingConstant.PENDING;
                state.error = null;
            })
            .addCase(fetchPermissions.fulfilled, (state, action) => {
                state.loading = LoadingConstant.SUCCEEDED;
                state.items = action.payload.items;
                state.pagination = action.payload.pagination;
            })
            .addCase(fetchPermissions.rejected, (state, action) => {
                state.loading = LoadingConstant.FAILED;
                state.error = action.payload as string;
            });
    },
});

export default permissionsSlice.reducer;
