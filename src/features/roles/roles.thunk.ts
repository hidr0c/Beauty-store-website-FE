import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getRolesAPI,
  getRoleByIdAPI,
  createRoleAPI,
  updateRoleAPI,
  removeRoleAPI,
} from "./roles.api";
import { CreateRole } from "./interfaces/create-role.interface";
import { QueryRole } from "./interfaces/query-role.interface";
import { UpdateRole } from "./types/update-role.type";

export const fetchRoles = createAsyncThunk(
  "roles/fetchRoles",
  async (query: QueryRole, { rejectWithValue }) => {
    try {
      const data = await getRolesAPI(query);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchRoleById = createAsyncThunk(
  "roles/fetchRoleById",
  async (id: string, { rejectWithValue }) => {
    try {
      const data = await getRoleByIdAPI(id);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const createRole = createAsyncThunk(
  "roles/createRole",
  async (role: CreateRole, { rejectWithValue }) => {
    try {
      const data = await createRoleAPI(role);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateRole = createAsyncThunk(
  "roles/updateRole",
  async (
    { id, role }: { id: string; role: UpdateRole },
    { rejectWithValue }
  ) => {
    try {
      const data = await updateRoleAPI(id, role);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const removeRole = createAsyncThunk(
  "roles/removeRole",
  async (id: string, { rejectWithValue }) => {
    try {
      await removeRoleAPI(id);
      return id;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
