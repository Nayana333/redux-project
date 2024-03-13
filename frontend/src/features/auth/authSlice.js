
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService'


// Get user from localStorage
const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Register user
export const register = createAsyncThunk(
  'auth/register', // find the acion
  async (user, thunkAPI) => {
    try {
      return await authService.register(user) //take data from auth service .register
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

//edit user

const editUserDetails=async(token,id,name,email)=>{
  
}


//login user
export const login = createAsyncThunk(
  'http://localhost:5000/login',
  async (user, thunkAPI) => {
    try {
      return await authService.login(user)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const logout = createAsyncThunk('auth/logout', async () => {
  await authService.logout()
})

// Login user

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false// reset reset to initial value
      state.isSuccess = false
      state.isError = false
      state.message = ''
    },
  },
  extraReducers: (builder) => { //extra reducer add the outside slice property,bulder define the lifecycle action of thunk
    builder
      .addCase(register.pending, (state) => { // add a reducer for specific action like pending..,reject...
        state.isLoading = true
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null
      })



  },
})

export const { reset } = authSlice.actions
export default authSlice.reducer