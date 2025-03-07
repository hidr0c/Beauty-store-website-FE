

import { createSlice } from "@reduxjs/toolkit";
import { UploadState } from "./interfaces/upload-state";
import { LoadingConstant } from "../../constants/loading.constant";
import { uploadMulti, uploadSingle } from "./upload.thunk";



const initialState: UploadState = {
    url: null,
    urls: [],
    loading: LoadingConstant.IDLE,
    error: null
}

const uploadSlice = createSlice({
    name: 'upload',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(uploadSingle.fulfilled, (state, action) => {
            state.url = action.payload.url 
        })
        .addCase(uploadMulti.fulfilled, (state, action) => {
            state.urls = action.payload.urls;
        })
    }

})


export default uploadSlice.reducer