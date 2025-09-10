import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchBTC = createAsyncThunk("btc/fetchBTC", async () => {
    const res = await axios.get("https://api.comparadolar.ar/crypto/btc");
    return res.data;
});

const btcSlice = createSlice({
    name: "btc",
    initialState: { data: null, loading: false, error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBTC.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBTC.fulfilled, (state, action) => {
                state.data = action.payload;
                state.loading = false;
            })
            .addCase(fetchBTC.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            });
    },
});

export default btcSlice.reducer;
