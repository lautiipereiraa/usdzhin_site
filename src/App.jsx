import { useEffect } from "react";
import Hero from "@components/Hero";
import Card from "@components/Card";
import Layout from "@components/Layout";
import { fetchUSDC } from "@store/usdcSlice";
import SelectBox from "@components/SelectBox";
import { fetchDollars } from "@store/dolarSlice";
import { fetchQuotes } from "@store/quotesSlice";
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

  return (
    <Layout>
      <Hero />
      <section className="container mx-auto px-20">
        {/* Select coin */}
        <SelectBox />
        {/* Best price cards */}
        <div className="mb-6">
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
            <span className="w-full text-2xl text-blue-800">Precio dolares</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {dollars.map((item) => (
                <Card
                  key={item.nombre}
                  title={item.nombre}
                  priceBuy={item.compra}
                  priceSell={item.venta}
                  variation={item.variacion || "0"}
                />
              ))}
            </div>
          </>
        )}
      </section>
    </Layout >
  );
};

export default App;
