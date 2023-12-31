import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const getGreeting = createAsyncThunk('get/message', 
    async () => {
        try {
            const response  = await fetch("http://127.0.0.1:3000/api/greeting")
            const result = await response.json()
            console.log(result)
            return result
        } catch (error) {
            console.error(error)
        }
    }
)

const greetingSlice = createSlice({
    name: 'greeting',
    initialState: {
        greeting:  '',
        status: null,
        error: null
    },
     extraReducers: (builder) => {
        builder.addCase(getGreeting.pending, (state) => {
            state.status = "Loading"
        });
        builder.addCase(getGreeting.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.greeting = action.payload;
        });
        
        builder.addCase(getGreeting.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        });
     }
})

export default greetingSlice.reducer;