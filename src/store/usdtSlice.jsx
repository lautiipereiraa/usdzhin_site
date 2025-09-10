import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUSDT = createAsyncThunk("usdt/fetchUSDT", async () => {
  const res = await axios.get("https://api.comparadolar.ar/crypto/usdt");
  return res.data;
});

const usdtSlice = createSlice({
  name: "usdt",
  initialState: { data: null, loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUSDT.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUSDT.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchUSDT.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export default usdtSlice.reducer;
