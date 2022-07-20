import { createSlice} from "@reduxjs/toolkit";


const initialState = {
    location: [],
    isLoading: true,
}

const currentSlice = createSlice({
    name: "location",
    initialState,
    reducers: {
      addLocation: (state, action) => {
        state.location = action.payload
      }
    }
})

export const { addLocation } = currentSlice.actions
export default currentSlice.reducer