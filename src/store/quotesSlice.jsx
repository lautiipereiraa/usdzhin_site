import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchQuotes = createAsyncThunk("quotes/fetch", async () => {
  const response = await axios.get("https://api.comparadolar.ar/quotes");
  return response.data;
});

const quotesSlice = createSlice({
  name: "quotes",
  initialState: {
    data: null,
    loading: false,
    bestBuy: null,
    bestSell: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuotes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchQuotes.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;

        const active24x7 = action.payload.filter(item => item.is24x7);

        const validBids = active24x7.filter(item => item.bid !== null);
        const validAsks = active24x7.filter(item => item.ask !== null);

        const bestBuy = validAsks.reduce((prev, curr) =>
          curr.ask < (prev?.ask || Infinity) ? curr : prev
          , null);

        const bestSell = validBids.reduce((prev, curr) =>
          curr.bid > (prev?.bid || 0) ? curr : prev
          , null);

        state.bestBuy = bestBuy;
        state.bestSell = bestSell;
      })
      .addCase(fetchQuotes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default quotesSlice.reducer;
