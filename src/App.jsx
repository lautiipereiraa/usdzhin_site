import { useEffect } from "react";
import Hero from "@components/Hero";
import Card from "@components/Card";
import Layout from "@components/Layout";
import Divisor from "@components/Divisor";
import InfoCard from "@components/InfoCard";
import { fetchUSDC } from "@store/usdcSlice";
import SelectBox from "@components/SelectBox";
import { fetchDollars } from "@store/dolarSlice";
import DivisorAlert from "@components/DivisorAlert";
import TelegramAlert from "@components/TelegramAlert";
import { useDispatch, useSelector } from "react-redux";
import BestPricesCard from "@components/BestPricesCard";
import { motion, AnimatePresence } from "framer-motion";

const App = () => {
  const dispatch = useDispatch();
  const { data: dollars, loading: loadingDollars } = useSelector(
    (state) => state.dollars
  );
  const { loading: loadingUSDC } = useSelector((state) => state.usdc);

  useEffect(() => {
    dispatch(fetchDollars());
    dispatch(fetchUSDC());
  }, [dispatch]);

  const isLoading = loadingDollars || loadingUSDC;

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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <SelectBox />
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
            <span className="w-full text-2xl text-[color:var(--text-blue-800)]">Mejores precios</span>

            <div className="mt-6">
              <BestPricesCard />
            </div>
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
                <span className="w-full text-2xl text-[color:var(--text-blue-800)]">Precio dolares</span>
                <div className="flex justify-end items-center w-full gap-2">
                  <span className="text-sm text-[color:var(--text-blue-600)]">(Última actualización: </span>
                  <span className="text-sm text-[color:var(--text-blue-600)]">{fechaActualizacion || ""})</span>
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

              <section className="mt-6">
                <Divisor />
              </section>

              <section className="mt-6">
                <TelegramAlert delay={10000} interval={20000} duration={8000} />
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