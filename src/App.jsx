import { useEffect, useRef } from "react";
import ReactGA from "react-ga4";
import Hero from "@components/Hero";
import Card from "@components/Card";
import Layout from "@components/Layout";
import Divisor from "@components/Divisor";
import InfoCard from "@components/InfoCard";
import { fetchUSDC } from "@store/usdcSlice";
import SelectBox from "@components/SelectBox";
import AmountInput from "@components/AmountInput";
import { fetchDollars } from "@store/dolarSlice";
import { fetchPrices } from "@store/pricesSlice";
import DivisorAlert from "@components/DivisorAlert";
import ProvidersList from "@components/ProvidersList";
import { useDispatch, useSelector } from "react-redux";
import BestPricesCard from "@components/BestPricesCard";
import { motion, AnimatePresence } from "framer-motion";

// El footer promete datos actualizados cada minuto: este es el intervalo que
// hace que sea cierto.
const refresh_ms = 60000;

const App = () => {
  const dispatch = useDispatch();
  const { data: dollars, loading: loadingDollars } = useSelector(
    (state) => state.dollars
  );
  const { loading: loadingUSDC } = useSelector((state) => state.usdc);
  const { selectedCurrency, lastFetchedAt } = useSelector((state) => state.prices);

  // En un ref y no en las deps del efecto de abajo: si dependiera de el, cada
  // fetch exitoso reiniciaria el intervalo que lo acaba de disparar.
  const lastFetchedRef = useRef(lastFetchedAt);
  useEffect(() => {
    lastFetchedRef.current = lastFetchedAt;
  }, [lastFetchedAt]);

  useEffect(() => {
    dispatch(fetchDollars());
    dispatch(fetchUSDC());
    ReactGA.send({ hitType: "pageview", page: window.location.pathname });
  }, [dispatch]);

  // Refresco automatico. La pestaña en segundo plano no pide nada: no tiene
  // sentido gastar requests contra APIs publicas gratuitas para nadie.
  useEffect(() => {
    const refresh = () => {
      if (document.hidden) return;
      dispatch(fetchPrices(selectedCurrency.name));
      dispatch(fetchDollars());
    };

    const interval = setInterval(refresh, refresh_ms);

    // Al volver a la pestaña se refresca en el acto si el dato ya quedo viejo,
    // en vez de mostrar un precio rancio hasta el proximo tick.
    const handleVisibility = () => {
      const stale =
        !lastFetchedRef.current || Date.now() - lastFetchedRef.current >= refresh_ms;
      if (!document.hidden && stale) refresh();
    };

    document.addEventListener("visibilitychange", handleVisibility);
    return () => {
      clearInterval(interval);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [dispatch, selectedCurrency.name]);

  // Carga inicial, no cualquier fetch: el refresco automatico vuelve a poner
  // loading en true cada minuto, y usar eso desmontaria la seccion de dolares
  // una vez por minuto.
  const isLoading = (loadingDollars || loadingUSDC) && (!dollars || dollars.length === 0);

  const fechaActualizacion =
    dollars && dollars.length > 0
      ? new Date(dollars[0].fechaActualizacion).toLocaleString("es-AR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
      : "";

  const filteredDollars = dollars
    ? dollars.filter((item) => item.casa !== "mayorista")
    : [];

  return (
    <Layout>
      <AnimatePresence>
        <section className="container mx-auto px-4 sm:px-6 lg:px-20">
          <motion.div
            key="hero"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Hero />
          </motion.div>

          <motion.div
            key="selectbox"
            className="flex flex-col sm:flex-row items-center sm:items-start justify-center gap-4 mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <SelectBox />
            <AmountInput />
          </motion.div>

          <motion.div
            key="best-prices"
            className="mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <section className="mt-6 mb-6">
              <Divisor />
            </section>
            <span className="w-full text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Mejores precios</span>

            <div className="mt-6">
              <BestPricesCard />
            </div>

            <section className="mt-8 mb-4">
              <div className="flex flex-wrap items-baseline justify-between gap-2 mb-4">
                <span className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">Todos los proveedores</span>
                {/* Las 23 filas no repiten "ARS" una por una: alcanza con decirlo
                    una vez arriba de la lista que describe. */}
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                  Valores en ARS
                </span>
              </div>
              <ProvidersList />
            </section>
          </motion.div>

          {!isLoading && (
            <motion.div
              key="dollars-section"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <section className="mt-6 mb-6">
                <Divisor />
              </section>
              <div className="flex items-center justify-between">
                <span className="w-full text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Precio dolares</span>
                <div className="flex justify-end items-center w-full gap-2">
                  <span className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-widest">(Última actualización: </span>
                  <span className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-widest">{fechaActualizacion || ""})</span>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {filteredDollars.map((item, index) => (
                  <motion.div
                    key={`${item.nombre}-${index}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Card
                      title={item.nombre}
                      priceBuy={item.compra}
                      priceSell={item.venta}
                      variation={item.variacion || "0"}
                    />
                  </motion.div>
                ))}
              </div>

              <section className="mt-6">
                <DivisorAlert />
              </section>

              <section className="mt-6">
                <InfoCard />
              </section>

              <section className="mt-6 mb-6">
                <Divisor />
              </section>
            </motion.div>
          )}

          {isLoading && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="h-64 flex items-center justify-center"
            >
              <span className="text-[color:var(--text-blue-600)]">Cargando...</span>
            </motion.div>
          )}
        </section>
      </AnimatePresence>
    </Layout>
  );
};

export default App;