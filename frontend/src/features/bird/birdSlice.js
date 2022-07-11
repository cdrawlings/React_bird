import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import birdService from "./birdService";

const initialState = {
    birds: [],
    last:{},
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

// Add newly viewed bird to the database
export const addBird = createAsyncThunk(
    'bird/add', async (addData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await birdService.addBird(addData, token)
    } catch (e) {
        const message =
            (e.message &&
                e.response.data &&
                e.response.data.message) ||
            e.message || e.toString()

        return thunkAPI.rejectWithValue(message)
        }
    }
)


// Get all birds seen by user
export const getBirds = createAsyncThunk(
    'bird/getall', async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await birdService.getBirds(token)
        } catch (e) {
            const message =
                (e.message &&
                    e.response.data &&
                    e.response.data.message) ||
                e.message || e.toString()

            return thunkAPI.rejectWithValue(message)
        }
    }
)


// Get get last bird entered
export const getLast = createAsyncThunk(
    'bird/getlast', async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await birdService.getLast(token)
        } catch (e) {
            const message =
                (e.message &&
                    e.response.data &&
                    e.response.data.message) ||
                e.message || e.toString()

            return thunkAPI.rejectWithValue(message)
        }
    }

)


export const birdSlice = createSlice({
    name: "bird",
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(addBird.pending, (state) => {
                state.isLoading = true
            })
            .addCase(addBird.fulfilled, (state) => {
                state.isLoading = false
                state.isSuccess = true
            })
            .addCase(addBird.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getBirds.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getBirds.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.birds = action.payload
            })
            .addCase(getBirds.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getLast.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getLast.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.last = action.payload
            })
            .addCase(getLast.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})


export const {reset} = birdSlice.actions
export default birdSlice.reducer