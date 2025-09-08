import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchDollars = createAsyncThunk("dollars/fetch", async () => {
    const response = await axios.get("https://dolarapi.com/v1/dolares");
    return response.data;
});

const dollarSlice = createSlice({
    name: "dollars",
    initialState: {
        data: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchDollars.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchDollars.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchDollars.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default dollarSlice.reducer;
