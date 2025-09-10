import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchEth = createAsyncThunk("eth/fetchEth", async () => {
    const res = await axios.get("https://api.comparadolar.ar/crypto/eth");
    return res.data;
});

const ethSlice = createSlice({
    name: "eth",
    initialState: { data: null, loading: false, error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchEth.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchEth.fulfilled, (state, action) => {
                state.data = action.payload;
                state.loading = false;
            })
            .addCase(fetchEth.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            });
    },
});

export default ethSlice.reducer;
