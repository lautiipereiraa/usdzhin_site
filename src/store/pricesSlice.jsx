import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPrices = createAsyncThunk("prices/fetch", async (currencyName = "usd") => {
  const endpoint = currencyName === "usd" ? "https://api.comparadolar.ar/quotes" : `https://api.comparadolar.ar/crypto/${currencyName}`;
  const response = await axios.get(endpoint);
  return response.data;
});

const pricesSlice = createSlice({
  name: "prices",
  initialState: {
    data: null,
    loading: false,
    bestBuy: null,
    bestSell: null,
    selectedCurrency: { icon: "$", label: "US Dolar (USD)", name: "usd" },
    error: null,
  },
  reducers: {
    setSelectedCurrency: (state, action) => {
      state.selectedCurrency = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPrices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPrices.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;

        const bestBuy = action.payload.reduce((min, current) => {
          if (current.ask && (min === null || current.ask < min.ask)) {
            return current;
          }
          return min;
        }, null);

        const bestSell = action.payload.reduce((max, current) => {
          if (current.bid && (max === null || current.bid > max.bid)) {
            return current;
          }
          return max;
        }, null);

        state.bestBuy = bestBuy;
        state.bestSell = bestSell;
      })
      .addCase(fetchPrices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setSelectedCurrency } = pricesSlice.actions;
export default pricesSlice.reducer;