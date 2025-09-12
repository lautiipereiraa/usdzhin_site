import { useSelector } from "react-redux";
import ArrowUpIcon from "@icons/ArrowUpIcon";
import ArrowDownIcon from "@icons/ArrowDownIcon";
import SkeletonBestPriceCard from "./SkeletonBestPriceCard";

const default_img = "./src/assets/default_img.png";

export default function BestPricesCard() {
    const { bestBuy, bestSell, loading } = useSelector((state) => state.prices);

    if (loading) {
        return (
            <div className="flex justify-around w-full gap-6">
                <SkeletonBestPriceCard />
            </div>
        );
    }

    const cards = [
        bestBuy && {
            title: `Mejor precio para comprar: ${bestBuy.prettyName}`,
            price: bestBuy.ask,
            type: "buy",
            logoUrl: bestBuy.logoUrl || bestBuy.logo || default_img,
            url: bestBuy.url || '#',
            pct_variation: bestBuy.pct_variation,
        },
        bestSell && {
            title: `Mejor precio para vender: ${bestSell.prettyName}`,
            price: bestSell.bid,
            type: "sell",
            logoUrl: bestSell.logoUrl || bestSell.logo || default_img,
            url: bestSell.url || '#',
            pct_variation: bestSell.pct_variation,
        },
    ].filter(Boolean);

    if (cards.length === 0) {
        return <div className="text-center text-blue-800 text-lg">No hay datos de precios disponibles.</div>;
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 w-full">
            {cards.map((card, idx) => (
                <a
                    key={idx}
                    href={card.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-xs border border-blue-100 hover:shadow-md duration-300 flex flex-col justify-between hover:scale-102 transition-transform"
                >
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-medium text-blue-800">{card.title}</h3>
                        <img
                            src={card.logoUrl}
                            alt={card.title}
                            className="h-12 w-12 rounded-full object-cover"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = default_img;
                            }}
                        />
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-blue-600">
                            {card.type === "buy" ? "Compra" : "Venta"}
                        </span>
                        <span className="text-xl font-semibold text-blue-800 flex items-center gap-1">
                            $ {card.price}
                            {card.pct_variation > 0 && (
                                <ArrowUpIcon />
                            )}
                            {card.pct_variation < 0 && (
                                <ArrowDownIcon />
                            )}
                        </span>
                    </div>
                </a>
            ))}
        </div>
    );

}