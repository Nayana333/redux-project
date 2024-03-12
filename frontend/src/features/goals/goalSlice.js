import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import goalService from './goalService'


// const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
goals:[],
isError: false,
isSuccess: false,
isLoading: false,
message: '',
}
//create new goal   

export const createGoal=createAsyncThunk('goal/create',async(goalData,thunkAPI)=>{
    try {
        const token=thunkAPI.getState().auth.user.token
        return await goalService.createGoal(goalData,token)
        
    } catch (error) {
        const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
        
    }

})

export const goalSlice=createSlice({
    name:'goal',
    initialState,
    reducer:{
        reset:(state)=>initialState
    }
})





export const {reset}=goalSlice.actions
export  default goalSlice.reducer
