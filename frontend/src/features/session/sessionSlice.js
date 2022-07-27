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


// Add new session to the database
export const addSession = createAsyncThunk(
    'session/add', async (addData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await sessionService.addSession(addData, token)
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
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(addSession.pending, (state) => {
                state.isLoading = true
            })
            .addCase(addSession.fulfilled, (state) => {
                state.isLoading = false
                state.isSuccess = true
            })
            .addCase(addSession.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})


export const {reset} = sessionSlice.actions
export default sessionSlice.reducer