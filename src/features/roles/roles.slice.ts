import { createSlice } from "@reduxjs/toolkit";
import { GeneralInitialState } from "../../common/interfaces/general-initial-state";
import { LoadingConstant } from "../../constants/loading.constant";
import { Roles } from "./interfaces/role.interface";
import {
  fetchRoles,
  fetchRoleById,
  createRole,
  updateRole,
  removeRole,
} from "./roles.thunk";

const initialState: GeneralInitialState<Roles> = {
  pagination: null,
  items: [],
  item: null,
  loading: LoadingConstant.IDLE,
  error: null,
};

const rolesSlice = createSlice({
  name: "roles",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //FETCH ROLES
      .addCase(fetchRoles.pending, (state) => {
        state.loading = LoadingConstant.PENDING;
      })
      .addCase(fetchRoles.fulfilled, (state, action) => {
        state.loading = LoadingConstant.IDLE;
        state.items = action.payload.items;
        state.pagination = action.payload.pagination
      })
      .addCase(fetchRoles.rejected, (state, action) => {
        state.loading = LoadingConstant.IDLE;
        state.error = action.payload as string;
      })
      //FETCH ROLE BY ID
      .addCase(fetchRoleById.pending, (state) => {
        state.loading = LoadingConstant.PENDING;
      })
      .addCase(fetchRoleById.fulfilled, (state, action) => {
        state.loading = LoadingConstant.IDLE;
        state.item = action.payload;
      })
      .addCase(fetchRoleById.rejected, (state, action) => {
        state.loading = LoadingConstant.IDLE;
        state.error = action.payload as string;
      })
      //CREATE ROLE
      .addCase(createRole.pending, (state) => {
        state.loading = LoadingConstant.PENDING;
      })
      .addCase(createRole.fulfilled, (state, action) => {
        state.loading = LoadingConstant.IDLE;
        state.items.unshift(action.payload);
      })
      .addCase(createRole.rejected, (state, action) => {
        state.loading = LoadingConstant.IDLE;
        state.error = action.payload as string;
      })
      //UPDATE ROLE
      .addCase(updateRole.pending, (state) => {
        state.loading = LoadingConstant.PENDING;
      })
      .addCase(updateRole.fulfilled, (state, action) => {
        state.loading = LoadingConstant.IDLE;
        state.items = state.items.map((role) =>
          role.id === action.payload.id ? action.payload : role
        );
      })
      .addCase(updateRole.rejected, (state, action) => {
        state.loading = LoadingConstant.IDLE;
        state.error = action.payload as string;
      })
      //REMOVE ROLE
      .addCase(removeRole.pending, (state) => {
        state.loading = LoadingConstant.PENDING;
      })
      .addCase(removeRole.fulfilled, (state, action) => {
        state.loading = LoadingConstant.IDLE;
        state.items = state.items.filter((role) => role.id !== action.payload);
      })
      .addCase(removeRole.rejected, (state, action) => {
        state.loading = LoadingConstant.IDLE;
        state.error = action.payload as string;
      });
  },
});

export default rolesSlice.reducer;