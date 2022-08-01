import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import sessionService from "./sessionService";

const initialState = {
    sessions: [],
    session: {},
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}


// This adds a single bird to the session DB
//api/bird/new_bird
export const AddSession = createAsyncThunk(
    'session/add', async (addData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await sessionService.AddSession(addData, token)
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


// This saves the weather/location to the session DB as a prelude to tracking birds
// api/bird/start
export const StartWatch = createAsyncThunk(
    'session/start', async (addData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await sessionService.StartWatch(addData, token)
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


// This gets the bird information needed to track birds counted
// Bird counting/spotting page
// api/bird/watching/:id
export const getWatch = createAsyncThunk(
    'session/getWatch', async (sessId, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await sessionService.getWatch(sessId, token)
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



export const sessionSlice = createSlice({
    name: "session",
    initialState,
    reducers: {
        rereset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(AddSession.pending, (state) => {
                state.isLoading = true
            })
            .addCase(AddSession.fulfilled, (state) => {
                state.isLoading = false
                state.isSuccess = true
            })
            .addCase(AddSession.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(StartWatch.pending, (state) => {
                state.isLoading = true
            })
            .addCase(StartWatch.fulfilled, (state) => {
                state.isLoading = false
                state.isSuccess = true
            })
            .addCase(StartWatch.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getWatch.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getWatch.fulfilled, (state) => {
                state.isLoading = false
                state.isSuccess = true
            })
            .addCase(getWatch.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})


export const {rereset} = sessionSlice.actions
export default sessionSlice.reducer