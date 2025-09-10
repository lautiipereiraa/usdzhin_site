import { useEffect } from "react";
import Hero from "@components/Hero";
import Card from "@components/Card";
import Layout from "@components/Layout";
import Divisor from "@components/Divisor";
import InfoCard from "@components/InfoCard";
import { fetchUSDC } from "@store/usdcSlice";
import SelectBox from "@components/SelectBox";
import { fetchDollars } from "@store/dolarSlice";
import { fetchQuotes } from "@store/quotesSlice";
import DivisorAlert from "@components/DivisorAlert";
import TelegramCard from "@components/TelegramCard";
import SkeletonCard from "@components/SkeletonCard";
import { useDispatch, useSelector } from "react-redux";
import BestPricesCard from "@components/BestPricesCard";

const App = () => {
  const dispatch = useDispatch();
  const { data: dollars, loading: loadingDollars } = useSelector(
    (state) => state.dollars
  );
  const { loading: loadingUSDC } = useSelector((state) => state.usdc);

  useEffect(() => {
    dispatch(fetchDollars());
    dispatch(fetchUSDC());
    dispatch(fetchQuotes());
  }, [dispatch]);

  const isLoading = loadingDollars || loadingUSDC;

  const fechaActualizacion = dollars && dollars.length > 0
    ? new Date(dollars[0].fechaActualizacion).toLocaleString('es-AR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
    : '';

  const filteredDollars = dollars ? dollars.filter(item => item.casa !== "mayorista") : [];

  return (
    <Layout>
      <Hero />
      <section className="container mx-auto px-20">
        {/* Select coin */}
        <SelectBox />
        {/* Best price cards */}
        <div className="mb-6">
          <section className="mt-6 mb-6">
            <Divisor />
          </section>
          <span className="w-full text-2xl text-blue-800">Mejores precios</span>

          <div className="mt-6">
            <BestPricesCard />
          </div>
        </div>
        {/* Skeleton loader */}
        {isLoading ? (
          <SkeletonCard />
        ) : (
          // Cards dolares
          <>
            <section className="mt-6 mb-6">
              <Divisor />
            </section>
            <div className="flex items-center justify-between">
              <span className="w-full text-2xl text-blue-800">Precio dolares</span>
              <div className="flex justify-end items-center w-full gap-2">
                <span className="text-sm text-blue-600">(Última actualización: </span>
                <span className="text-sm text-blue-600">{fechaActualizacion || ""})</span>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {filteredDollars.map((item) => (
                <Card
                  key={item.nombre}
                  title={item.nombre}
                  priceBuy={item.compra}
                  priceSell={item.venta}
                  variation={item.variacion || "0"}
                />
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
              <TelegramCard />
            </section>
          </>
        )}
      </section>
    </Layout >
  );
};

export default App;
