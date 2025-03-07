import { createAsyncThunk } from "@reduxjs/toolkit";
import { registerAPI, loginAPI, logoutAPI, verifyAPI, forgotPasswordAPI, verifyOtpAPI, resetPasswordAPI } from "./auth.api";
import { Register } from "./types/register.type";
import { Login } from "./interfaces/login.interface";

// Register Thunk
export const registerUser = createAsyncThunk(
    "auth/register",
    async (data: Register, { rejectWithValue }) => {
        try {
            return await registerAPI(data);
            
        } catch (error: any) {
            return rejectWithValue(error.response?.data || "Registration failed");
        }
    }
);

// Login Thunk
export const loginUser = createAsyncThunk(
    "auth/login",
    async ({ email, password }: Login, { rejectWithValue }) => {
        try {
            return await loginAPI(email, password);
            
        } catch (error: any) {
            return rejectWithValue(error.response?.data || "Login failed");
        }
    }
);

// Logout Thunk
export const logoutUser = createAsyncThunk(
    "auth/logout",
    async (_, { rejectWithValue }) => {
        try {
            await logoutAPI();
        } catch (error: any) {
            return rejectWithValue(error.response?.data || "Logout failed");
        }
    }
);


//VERIFY EMAIL 

export const verify = createAsyncThunk(
    "auth/verify",
    async (token: string, {rejectWithValue}) => {
        try {
            await verifyAPI(token)
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

//FORGOT PASSWORD
export const forgotPassword = createAsyncThunk(
    "auth/forgotPassword",
    async (email: string, {rejectWithValue}) => {
        try {
            await forgotPasswordAPI(email)
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

//VERIFY OTP 
export const verifyOtp = createAsyncThunk(
    "auth/verifyotp",
    async ({email, otp}: {email: string, otp: string},{rejectWithValue}) => {
        try {
            return  await verifyOtpAPI(email, otp);
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

//RESET PASSWORD 
export const resetPassword = createAsyncThunk(
    "auth/resetPassword",
    async ({token, password}: {token: string, password: string}, {rejectWithValue}) => {
        try {
            await resetPasswordAPI(token, password);
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)