import { createSlice, PayloadAction } from "@reduxjs/toolkit";


type AlertState = {
    type: "success" | "error" | null;
    message: string;
};

const initialState: AlertState = {
    type: null,
    message: ''
}

const alertSlice = createSlice({
    name: 'alert',
    initialState,
    reducers: {
        showAlert: (state, action: PayloadAction<AlertState>) => {
            state.type = action.payload.type;
            state.message = action.payload.message;
        },
        clearAlert: (state) => {
            state.type = null;
            state.message = "";
        }
    }
})

export const {showAlert, clearAlert} = alertSlice.actions;
export default alertSlice.reducer
