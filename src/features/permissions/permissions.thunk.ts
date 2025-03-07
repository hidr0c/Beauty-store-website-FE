import { createAsyncThunk } from "@reduxjs/toolkit";
import { QueryPermission } from "./types/query-permission";
import { getPermissions } from "./permissions.api";

export const fetchPermissions = createAsyncThunk(
  "permissions/fetchPermissions",
  async (queryPermission: QueryPermission, { rejectWithValue }) => {
    try {
      return await getPermissions(queryPermission)
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);