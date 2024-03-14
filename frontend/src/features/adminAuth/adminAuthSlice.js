import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import adminAuthService from './adminAuthService';

// Get admin from local storage
const admin = JSON.parse(localStorage.getItem("admin"));

const initialState = {
    admin: admin ? admin : null,
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: "",
};

export const adminLogin = createAsyncThunk(
    "auth/adminLogin",
    async (adminData, thunkAPI) => {
        try {
            const response = await adminAuthService.adminLogin(adminData);
            return response.data; 
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            throw new Error(message);
        }
    }
);

//logout
export const adminlogout=createAsyncThunk('auth/adminlogout',async()=>{
    await adminAuthService.adminLogout()
})

export const adminAuthSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = false;
            state.message = "";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(adminLogin.pending, (state) => {
                state.isLoading = true;
                state.isError = false; 
                state.isSuccess = false; 
            })
            .addCase(adminLogin.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.admin = action.payload; 
            })
            .addCase(adminLogin.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false; 
                state.message = action.error.message; 
            })
            .addCase(adminlogout.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.isSuccess = false;
            })
            .addCase(adminlogout.fulfilled, (state) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.admin = null; 
            })
            .addCase(adminlogout.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            });
    }
});

export const { reset } = adminAuthSlice.actions;
export default adminAuthSlice.reducer;
