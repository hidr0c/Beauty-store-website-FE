import { createAsyncThunk } from "@reduxjs/toolkit";
import { uploadMultiAPI, uploadSingleAPI } from "./upload.api";


export const uploadSingle = createAsyncThunk(
    'upload/uploadSingle',
    async (formData: FormData, {rejectWithValue}) => {
        try {
            return uploadSingleAPI(formData)
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const uploadMulti = createAsyncThunk(
    'upload/uploadMulti',
    async (files: FormData, {rejectWithValue}) => {
        try {
            return uploadMultiAPI(files)
        } catch (error) {
            return rejectWithValue(error);
        }
    }
)

