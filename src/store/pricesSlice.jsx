import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPrices = createAsyncThunk("prices/fetch", async (currencyName = "usd") => {
  const endpoint = currencyName === "usd" ? "https://api.comparadolar.ar/usd" : `https://api.comparadolar.ar/crypto/${currencyName}`;
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
    bestSpread: null,
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

        const isStable = ["usd", "usdt", "usdc"].includes(state.selectedCurrency.name);

        const normalizedData = action.payload.map(provider => {
          let ask = provider.totalAsk || provider.ask || 0;
          let bid = provider.totalBid || provider.bid || 0;

          if (isStable) {
            if (ask > 10000) ask = ask / 1000;
            if (bid > 10000) bid = bid / 1000;
          }

          return {
            ...provider,
            ask: ask,
            bid: bid,
            originalAsk: provider.ask,
            originalBid: provider.bid
          };
        });

        state.data = normalizedData;

        const bestProviders = normalizedData.filter(p => p.is24x7);
        const dataForBest = bestProviders.length > 0 ? bestProviders : normalizedData;

        const bestBuy = dataForBest.reduce((min, current) => {
          if (current.ask > 0 && (min === null || current.ask < min.ask)) {
            return current;
          }
          return min;
        }, null);

        const bestSell = dataForBest.reduce((max, current) => {
          if (current.bid > 0 && (max === null || current.bid > max.bid)) {
            return current;
          }
          return max;
        }, null);

        const bestSpread = dataForBest.reduce((min, current) => {
          if (current.ask > 0 && current.bid > 0) {
            const currentSpread = current.ask - current.bid;
            if (min === null || currentSpread < (min.ask - min.bid)) {
              return current;
            }
          }
          return min;
        }, null);

        state.bestBuy = bestBuy;
        state.bestSell = bestSell;
        state.bestSpread = bestSpread;
      })
      .addCase(fetchPrices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setSelectedCurrency } = pricesSlice.actions;
export default pricesSlice.reducer;