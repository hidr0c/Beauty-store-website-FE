import { createSlice } from "@reduxjs/toolkit";
import { GeneralInitialState } from "../../common/interfaces/general-initial-state";
import { Inventory } from "./interfaces/inventory.interface";
import { LoadingConstant } from "../../constants/loading.constant";
import {
  fetchInventories,
  fetchInventoryById,
  createInventory,
  updateInventory,
  removeInventory,
} from "./inventories.thunk";

const initialState: GeneralInitialState<Inventory> = {
  pagination: null,
  items: [],
  item: null,
  loading: LoadingConstant.IDLE,
  error: null,
};

const inventorySlice = createSlice({
  name: "inventories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
        //FETCH INVENTORIES
      .addCase(fetchInventories.pending, (state) => {
        state.loading = LoadingConstant.PENDING;
      })
      .addCase(fetchInventories.fulfilled, (state, action) => {
        state.loading = LoadingConstant.SUCCEEDED;
        state.items = action.payload.items;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchInventories.rejected, (state, action) => {
        state.loading = LoadingConstant.FAILED;
        state.error = action.payload as string;
      })
      //FETCH INVENTORIES BY ID
      .addCase(fetchInventoryById.pending, (state) => {
        state.loading = LoadingConstant.PENDING;
      })
      .addCase(fetchInventoryById.fulfilled, (state, action) => {
        state.loading = LoadingConstant.SUCCEEDED;
        state.item = action.payload;
      })
      .addCase(fetchInventoryById.rejected, (state, action) => {
        state.loading = LoadingConstant.FAILED;
        state.error = action.payload as string;
      })
      //CREATE INVENTORY
      .addCase(createInventory.pending, (state) => {
        state.loading = LoadingConstant.PENDING;
      })
      .addCase(createInventory.fulfilled, (state, action) => {
        state.loading = LoadingConstant.SUCCEEDED;
        state.items.unshift(action.payload);
      })
      .addCase(createInventory.rejected, (state, action) => {
        state.loading = LoadingConstant.FAILED;
        state.error = action.payload as string;
      })
      //UPDATE INVENTORY
      .addCase(updateInventory.pending, (state) => {
        state.loading = LoadingConstant.PENDING;
      })
      .addCase(updateInventory.fulfilled, (state, action) => {
        state.loading = LoadingConstant.SUCCEEDED;
        state.items = state.items.map((item) =>
          item.id === action.payload.id ? action.payload : item
        );
      })
      .addCase(updateInventory.rejected, (state, action) => {
        state.loading = LoadingConstant.FAILED;
        state.error = action.payload as string;
      })
      //REMOVE INVENTORY
      .addCase(removeInventory.pending, (state) => {
        state.loading = LoadingConstant.PENDING;
      })
      .addCase(removeInventory.fulfilled, (state, action) => {
        state.loading = LoadingConstant.SUCCEEDED;
        state.items = state.items.filter((item) => item.id !== action.payload);
      })
      .addCase(removeInventory.rejected, (state, action) => {
        state.loading = LoadingConstant.FAILED;
        state.error = action.payload as string;
      });
  },
});

export default inventorySlice.reducer;
