import btcReducer from "@store/btcSlice";
import ethReducer from "@store/ethSlice";
import usdcReducer from "@store/usdcSlice";
import usdtReducer from "@store/usdtSlice";
import dollarReducer from "@store/dolarSlice";
import pricesReducer from "@store/pricesSlice";
import quotesReducer from "@store/quotesSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    eth: ethReducer,
    btc: btcReducer,
    usdc: usdcReducer,
    usdt: usdtReducer,
    quotes: quotesReducer,
    prices: pricesReducer,
    dollars: dollarReducer,
  },
});
