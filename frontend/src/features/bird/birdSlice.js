import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import birdService from "./birdService";

const initialState = {
    birds: birds ? birds : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

export const eBird = createAsyncThunk('auth/login', async (birds, thunkAPI) => {
    try {
        return await birdService.eBird(birds)
    } catch (e) {
        const message = (e.message && e.response.data && e.response.data.message)
            || e.message || e.toString()

        return thunkAPI.rejectWithValue(message)
    }
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
                state.user = null
                state.isError = true
                state.message = action.payload
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null
            })
    },
})



export const {reset} = authSlice.actions
export default authSlice.reducer