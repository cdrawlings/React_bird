import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import authService from "./authService";

const initialState = {
    user: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

export const register = createAsyncThunk('auth/register', async (user, thunkAPI) => {
  try {
      return await authService.register(user)
  } catch (e) {
    const message = (e.message && e.response.data && e.response.data.message)
      || e.message || e.toString()

      return thunkAPI.rejectWithValue(message)
  }

})


export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
    console.log(user)
})

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.message = ''
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true
                })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
                })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false
                state.user = null
                state.isError = true
                state.message = action.payload
            })
    },
})



export const {reset} = authSlice.actions
export default authSlice.reducer