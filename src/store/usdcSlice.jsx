import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUSDC = createAsyncThunk("usdc/fetch", async () => {
  const response = await axios.get("https://api.comparadolar.ar/crypto/usdc");
  return response.data;
});

const usdcSlice = createSlice({
  name: "usdc",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUSDC.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUSDC.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchUSDC.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default usdcSlice.reducer;
