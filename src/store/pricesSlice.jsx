import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPrices = createAsyncThunk("prices/fetch", async (currencyName = "usd") => {
  const endpoint = `https://api.comparadolar.ar/${currencyName}`;
  const response = await axios.get(endpoint);
  return response.data;
});

const pricesSlice = createSlice({
  name: "prices",
  initialState: {
    data: null,
    loading: false,
    bestBuy: [],
    bestSell: [],
    bestSpread: [],
    // Proveedor que sale segundo en el podio, con su precio: permite decirle al
    // usuario contra quien se compara en vez de un vago "la siguiente opcion".
    // null cuando todos empatan en el primer puesto o hay un solo dato.
    runnerUpBuy: null,
    runnerUpSell: null,
    // Si el podio se calculo solo con proveedores 24/7. Es false cuando ninguno
    // lo es y hubo que caer a la lista completa: ahi la tarjeta no puede decir
    // que el ganador opera a toda hora.
    podiumIs24x7: false,
    selectedCurrency: { icon: "$", label: "US Dolar (USD)", name: "usd" },
    // Momento del ultimo fetch exitoso. comparadolar no manda timestamp propio,
    // asi que esto es lo unico honesto que se puede mostrar como "actualizado".
    lastFetchedAt: null,
    error: null,
  },
  reducers: {
    setSelectedCurrency: (state, action) => {
      state.selectedCurrency = action.payload;
      // Cambiar de divisa invalida lo que hay en pantalla. Sin esto, y ahora que
      // los componentes mantienen el ultimo dato bueno mientras revalidan, al
      // pasar de USD a BTC se verian los precios del dolar hasta que llegue la
      // respuesta nueva.
      state.data = null;
      state.bestBuy = [];
      state.bestSell = [];
      state.bestSpread = [];
      state.runnerUpBuy = null;
      state.runnerUpSell = null;
      state.podiumIs24x7 = false;
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

        const bestBuyPrice = dataForBest.reduce((minAsk, current) => {
          if (current.ask > 0 && (minAsk === null || current.ask < minAsk)) {
            return current.ask;
          }
          return minAsk;
        }, null);
        const bestBuy = bestBuyPrice !== null
          ? dataForBest.filter(p => p.ask === bestBuyPrice)
          : [];

        const bestSellPrice = dataForBest.reduce((maxBid, current) => {
          if (current.bid > 0 && (maxBid === null || current.bid > maxBid)) {
            return current.bid;
          }
          return maxBid;
        }, null);
        const bestSell = bestSellPrice !== null
          ? dataForBest.filter(p => p.bid === bestSellPrice)
          : [];

        const bestSpreadValue = dataForBest.reduce((minSpread, current) => {
          if (current.ask > 0 && current.bid > 0) {
            const currentSpread = current.ask - current.bid;
            if (minSpread === null || currentSpread < minSpread) {
              return currentSpread;
            }
          }
          return minSpread;
        }, null);
        const bestSpread = bestSpreadValue !== null
          ? dataForBest.filter(p => p.ask > 0 && p.bid > 0 && (p.ask - p.bid) === bestSpreadValue)
          : [];

        state.bestBuy = bestBuy;
        state.bestSell = bestSell;
        state.bestSpread = bestSpread;

        // Segundo mejor precio *distinto*: los empates en el primer puesto no
        // cuentan como runner-up, si no la diferencia mostrada seria cero.
        const asks = [...new Set(dataForBest.filter(p => p.ask > 0).map(p => p.ask))].sort((a, b) => a - b);
        const bids = [...new Set(dataForBest.filter(p => p.bid > 0).map(p => p.bid))].sort((a, b) => b - a);

        // Si varios empatan en el segundo puesto se nombra al primero que
        // aparece: alcanza para que el usuario sepa contra que se compara.
        const runnerUp = (price, field) => {
          if (price === undefined) return null;
          const provider = dataForBest.find(p => p[field] === price);
          return provider ? { prettyName: provider.prettyName, price } : null;
        };

        state.runnerUpBuy = runnerUp(asks[1], "ask");
        state.runnerUpSell = runnerUp(bids[1], "bid");
        state.podiumIs24x7 = bestProviders.length > 0;

        state.lastFetchedAt = Date.now();
      })
      .addCase(fetchPrices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setSelectedCurrency } = pricesSlice.actions;
export default pricesSlice.reducer;