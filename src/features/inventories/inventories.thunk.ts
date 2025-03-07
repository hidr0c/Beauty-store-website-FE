import { createAsyncThunk } from "@reduxjs/toolkit";
import { UUID } from "../../common/types/uuid.type";
import { CreateInventory } from "./interfaces/create-inventory.interface";
import { QueryInvetory } from "./interfaces/query-inventory.interface";
import { UpdateInventory } from "./types/update-inventory.type";
import {
  getInventoriesAPI,
  getInventoryByIdAPI,
  createInventoryAPI,
  updateInventoryAPI,
  removeInventoryAPI,
} from "./inventories.api";

export const fetchInventories = createAsyncThunk(
  "inventories/fetchAll",
  async (query: QueryInvetory, { rejectWithValue }) => {
    try {
      return await getInventoriesAPI(query);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchInventoryById = createAsyncThunk(
  "inventories/fetchById",
  async (id: UUID, { rejectWithValue }) => {
    try {
      return await getInventoryByIdAPI(id);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const createInventory = createAsyncThunk(
  "inventories/create",
  async (data: CreateInventory, { rejectWithValue }) => {
    try {
      return await createInventoryAPI(data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateInventory = createAsyncThunk(
  "inventories/update",
  async (
    { id, data }: { id: UUID; data: UpdateInventory },
    { rejectWithValue }
  ) => {
    try {
      return await updateInventoryAPI(id, data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const removeInventory = createAsyncThunk(
  "inventories/remove",
  async (id: UUID, { rejectWithValue }) => {
    try {
      await removeInventoryAPI(id);
      return id; 
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
