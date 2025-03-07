import { createSlice } from "@reduxjs/toolkit";
import { AuthState } from "./interfaces/auth.state";
import { LoadingConstant } from "../../constants/loading.constant";
import { registerUser, loginUser, logoutUser, verify, forgotPassword, verifyOtp, resetPassword } from "./auth.thunk";
import { isTokenExpires } from "../../utils/jwt";

const initialState: AuthState = {
    accessToken: null,
    refreshToken: null,
    resetToken: null,
    isAuth: false,
    loading: LoadingConstant.IDLE,
    error: null,
    expiresIn: 0,
    roleId: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        resetAuthState: (state) => {
            state.accessToken = null;
            state.refreshToken = null;
            state.isAuth = false;
            state.loading = LoadingConstant.IDLE;
            state.error = null;
        },
        checkAuth: (state) => {
            if(isTokenExpires(state.expiresIn)) {
                state.accessToken = null;
                state.refreshToken = null;
                state.isAuth = false;
                state.loading = LoadingConstant.IDLE;
                state.error = null;
            }
        }
    },
    extraReducers: (builder) => {
        builder
            //REGISTER
            .addCase(registerUser.pending, (state) => {
                state.loading = LoadingConstant.PENDING;
            })
            .addCase(registerUser.fulfilled, (state) => {
                state.loading = LoadingConstant.SUCCEEDED;
            })
            .addCase(registerUser.rejected, (state, action) => {
                console.log(action)
                state.loading = LoadingConstant.FAILED;
                state.error = action.payload as string;
            })
            //LOGIN
            .addCase(loginUser.pending, (state) => {
                state.loading = LoadingConstant.PENDING;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = LoadingConstant.SUCCEEDED;
                state.isAuth = true;
                state.accessToken = action.payload.accessToken;
                state.refreshToken = action.payload.refreshToken;
                state.error = null;
                state.expiresIn = action.payload.expiresIn
                state.roleId = action.payload.roleId 
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = LoadingConstant.FAILED;
                state.error = action.payload as string;
            })
            //LOGOUT
            .addCase(logoutUser.fulfilled, (state) => {
                state.accessToken = null;
                state.refreshToken = null;
                state.isAuth = false;
                state.loading = LoadingConstant.IDLE;
                state.error = null;
            })
            //VERIFY 
            .addCase(verify.fulfilled, (state) => {
                state.loading = LoadingConstant.SUCCEEDED;
            })
            //FORGOT PASSWORD
            .addCase(forgotPassword.fulfilled, (state) => {
                state.loading = LoadingConstant.SUCCEEDED;
            })
            //VERIFY OTP 
            .addCase(verifyOtp.fulfilled, (state, action) => {
                state.loading = LoadingConstant.SUCCEEDED;
                state.refreshToken = action.payload.token
            } )
            //RESET PASSWORD
            .addCase(resetPassword.fulfilled, (state) => {
                state.loading = LoadingConstant.SUCCEEDED;
            })
    }
})

export const { resetAuthState, checkAuth } = authSlice.actions;
export default authSlice.reducer;
