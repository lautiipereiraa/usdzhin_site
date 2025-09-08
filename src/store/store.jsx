import usdcReducer from "@store/usdcSlice";
import dollarReducer from "@store/dolarSlice";
import quotesReducer from "@store/quotesSlice";
import { configureStore } from "@reduxjs/toolkit";


export const store = configureStore({
  reducer: {
    dollars: dollarReducer,
    usdc: usdcReducer,
    quotes: quotesReducer,
  },
});
