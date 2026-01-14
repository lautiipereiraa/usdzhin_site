import { useSelector } from "react-redux";
import ArrowUpIcon from "@icons/ArrowUpIcon";
import ArrowDownIcon from "@icons/ArrowDownIcon";
import InfoIcon from "@icons/InfoIcon";
import SkeletonBestPriceCard from "./SkeletonBestPriceCard";

const default_img = "./src/assets/default_img.png";

const currencyFormatter = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
});

export default function BestPricesCard() {
    const { bestBuy, bestSell, bestSpread, loading } = useSelector((state) => state.prices);

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
            url: bestBuy.url || "#",
            pct_variation: bestBuy.pct_variation,
        },
        bestSell && {
            title: `Mejor precio para vender: ${bestSell.prettyName}`,
            price: bestSell.bid,
            type: "sell",
            logoUrl: bestSell.logoUrl || bestSell.logo || default_img,
            url: bestSell.url || "#",
            pct_variation: bestSell.pct_variation,
        },
        bestSpread && {
            title: `Menor spread: ${bestSpread.prettyName}`,
            price: bestSpread.ask - bestSpread.bid,
            type: "spread",
            logoUrl: bestSpread.logoUrl || bestSpread.logo || default_img,
            url: bestSpread.url || "#",
            pct_variation: bestSpread.pct_variation,
        },
    ].filter(Boolean);

    if (cards.length === 0) {
        return <div className="text-center text-[color:var(--text-blue-800)] text-lg">No hay datos de precios disponibles.</div>;
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {cards.map((card, idx) => (
                <a
                    key={idx}
                    href={card.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[color:var(--card-bg)] backdrop-blur-sm rounded-2xl p-6 shadow-xs border border-[color:var(--border-color)] hover:shadow-md duration-300 flex flex-col justify-between hover:scale-102 transition-transform"
                >
                    <div className="flex items-center justify-between mb-4">
<<<<<<< Updated upstream
                        <h3 className="text-lg font-medium text-blue-800">{card.title}</h3>
=======
                        <div className="flex items-start gap-1.5 max-w-[85%]">
                            <h3 className="text-base sm:text-lg font-medium text-[color:var(--text-blue-800)] leading-tight">{card.title}</h3>
                            {card.type === "spread" && (
                                <div className="group relative flex-shrink-0">
                                    <InfoIcon className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 cursor-help mt-1" />
                                    <div className="absolute bottom-full left-[-20px] sm:left-1/2 sm:-translate-x-1/2 mb-2 w-40 sm:w-48 p-2 bg-gray-900/95 text-white text-[10px] sm:text-xs rounded-xl shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 backdrop-blur-sm border border-white/10">
                                        Es la diferencia entre compra y venta. ¡Cuanto más bajo, mejor!
                                    </div>
                                </div>
                            )}
                        </div>
>>>>>>> Stashed changes
                        <img
                            src={card.logoUrl}
                            alt={card.title}
                            className="h-12 w-12 rounded-full object-cover"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = default_img;
                            }}
                        />
                    </div >
        <div className="flex justify-between items-center">
            <span className="text-sm text-blue-600">
                {card.type === "buy" ? "Compra" : "Venta"}
=======
                        <span className="text-sm text-[color:var(--text-blue-600)]">
                    {card.type === "buy" ? "Venta (Tú compras)" : card.type === "sell" ? "Compra (Tú vendes)" : "Spread"}
>>>>>>> Stashed changes
                </span>
                <span className="text-xl font-semibold text-[color:var(--text-blue-800)] flex items-center gap-1">
                    {currencyFormatter.format(card.price)}
                    {card.pct_variation > 0 && <ArrowUpIcon />}
                    {card.pct_variation < 0 && <ArrowDownIcon />}
                </span>
        </div>
                </a >
            ))
}
        </div >
    );
}