import { useEffect } from "react";
import Hero from "@components/Hero";
import Card from "@components/Card";
import Layout from "@components/Layout";
import { fetchUSDC } from "@store/usdcSlice";
import { fetchDollars } from "@store/dolarSlice";
import { fetchQuotes } from "@store/quotesSlice";
import { useDispatch, useSelector } from "react-redux";

const App = () => {
  const dispatch = useDispatch();
  const { data: dollars, loading: loadingDollars } = useSelector((state) => state.dollars);
  const { loading: loadingUSDC } = useSelector((state) => state.usdc);

  useEffect(() => {
    dispatch(fetchDollars());
    dispatch(fetchUSDC());
    dispatch(fetchQuotes());
  }, [dispatch]);

  return (
    <Layout>
      <Hero />
      <section className="container mx-auto px-4 py-12">
        {(loadingDollars || loadingUSDC) && (
          <p className="text-center text-blue-600">Cargando información...</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
      </section>
    </Layout>
  );
};

export default App;
