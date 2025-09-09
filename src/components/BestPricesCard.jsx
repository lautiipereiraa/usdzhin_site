import { useEffect } from "react";
import Card from "@components/Card";
import { fetchQuotes } from "@store/quotesSlice";
import { useSelector, useDispatch } from "react-redux";

export default function BestPricesCard() {
    const dispatch = useDispatch();
    const { bestBuy, bestSell, loading } = useSelector(state => state.quotes);

    useEffect(() => {
        dispatch(fetchQuotes());
    }, [dispatch]);

    if (loading) return <div>Cargando...</div>;

    const cards = [
        bestBuy
            ? {
                title: `Mejor precio para comprar: ${bestBuy.prettyName}`,
                priceBuy: bestBuy.ask,
                priceSell: bestBuy.bid,
            }
            : null,
        bestSell
            ? {
                title: `Mejor precio para vender: ${bestSell.prettyName}`,
                priceBuy: bestSell.ask,
                priceSell: bestSell.bid,
            }
            : null,
        bestSell
            ? {
                title: `Mejor precio para vender: ${bestSell.prettyName}`,
                priceBuy: bestSell.ask,
                priceSell: bestSell.bid,
            }
            : null,
    ];

    return (
        <div className="flex justify-around w-full gap-6">
            {cards.map((card, idx) =>
                card ? (
                    <div key={idx} className="flex-1">
                        <Card
                            title={card.title}
                            priceBuy={card.priceBuy}
                            priceSell={card.priceSell}
                        />
                    </div>
                ) : (
                    <div key={idx} className="flex-1" />
                )
            )}
        </div>
    );
}
