import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getUsersAPI,
  getCurrentUserAPI,
  createUserAPI,
  updateUserApi,
  getUserByIdAPI,
  removeUserAPI,
} from "./users.api";
import { QueryUser } from "./interfaces/query-user.interface";
import { CreateUser } from "./types/create-user.type";
import { UpdateUser } from "./types/update-user.type";
import { UpdateThunk } from "../../common/types/update-thunk.type";
import { UUID } from "../../common/types/uuid.type";

export const fetchUsers = createAsyncThunk(
    "users/fetchUsers", 
    async (query: QueryUser, { rejectWithValue }) => {
    try {
        return await getUsersAPI(query);
    } catch (error) {
        return rejectWithValue(error);
    }
});

export const fetchCurrentUser = createAsyncThunk(
    "users/fetchCurrentUser", 
    async (_, { rejectWithValue }) => {
    try {
        return await getCurrentUserAPI();
    } catch (error) {
        return rejectWithValue(error);
    }
});

export const createUser = createAsyncThunk(
    "users/createUser", 
    async (createUserData: CreateUser, { rejectWithValue }) => {
    try {
        return await createUserAPI(createUserData);
    } catch (error) {
        return rejectWithValue(error);
    }
});

export const updateUser = createAsyncThunk(
    "users/updateUser", 
    async ({ id, data }: UpdateThunk<UUID,UpdateUser>, { rejectWithValue }) => {
    try {
        return await updateUserApi(id, data);
    } catch (error) {
        return rejectWithValue(error);
    }
});

export const fetchUserById = createAsyncThunk(
    "users/fetchUserById", 
    async (id: UUID, { rejectWithValue }) => {
    try {
        return await getUserByIdAPI(id);
    } catch (error) {
        return rejectWithValue(error);
    }
});

export const removeUser = createAsyncThunk(
    "users/removeUser", 
    async (id: UUID, { rejectWithValue }) => {
    try {
        await removeUserAPI(id);
        return id
    } catch (error) {
        return rejectWithValue(error);
    }
});
