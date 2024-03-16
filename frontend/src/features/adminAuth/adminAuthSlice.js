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

//getuser

export const getAllUsers = createAsyncThunk(

    "auth/getAllUsers",
    async (_, thunkAPI) => {
        try {
            const { token } = JSON.parse(localStorage.getItem('admin'))
            const response = await adminAuthService.getAllUsers(token);
            return response.users;
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

//admin login

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
export const adminlogout = createAsyncThunk('auth/adminlogout', async () => {
    await adminAuthService.adminLogout()
})

//edituser

// export const editUser = createAsyncThunk('admin/editUser',

//     async ({ userId, name, email }, thunkAPI) => {
//         try {
//             const token = thunkAPI.getState().adminAuth.admin.token
//             return await adminAuthService.editUserDetails(token, userId, name, email)

//         } catch (error) {
//             alert(error)
//                 const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
//                 return thunkAPI.rejectWithValue(message)
            

//         }
//     }
// )

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
            })
            .addCase(getAllUsers.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllUsers.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload

            })
            .addCase(getAllUsers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.users = action.payload

            })
    }
});

export const { reset } = adminAuthSlice.actions;
export default adminAuthSlice.reducer;