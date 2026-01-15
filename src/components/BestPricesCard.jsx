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

const normalizePrice = (val) => {
    const n = Number(val);
    return n > 100000 ? n / 1000 : n;
};

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
            price: normalizePrice(bestBuy.ask),
            label: "Venta",
            type: "buy",
            logoUrl: bestBuy.logoUrl || bestBuy.logo || default_img,
            url: bestBuy.url || "#",
            pct_variation: bestBuy.pct_variation,
        },
        bestSell && {
            title: `Mejor precio para vender: ${bestSell.prettyName}`,
            price: normalizePrice(bestSell.bid),
            label: "Compra",
            type: "sell",
            logoUrl: bestSell.logoUrl || bestSell.logo || default_img,
            url: bestSell.url || "#",
            pct_variation: bestSell.pct_variation,
        },
        bestSpread && {
            title: `Menor spread: ${bestSpread.prettyName}`,
            price: normalizePrice(bestSpread.ask) - normalizePrice(bestSpread.bid),
            label: "Spread",
            type: "spread",
            logoUrl: bestSpread.logoUrl || bestSpread.logo || default_img,
            url: bestSpread.url || "#",
            pct_variation: bestSpread.pct_variation,
        },
    ].filter(Boolean);

    if (cards.length === 0) return null;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {cards.map((card, idx) => (
                <a
                    key={idx}
                    href={card.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[color:var(--card-bg)] backdrop-blur-sm rounded-2xl p-6 border border-[color:var(--border-color)] hover:shadow-md transition-all flex flex-col justify-between"
                >
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-start gap-1.5 max-w-[85%]">
                            <h3 className="text-base font-medium text-[color:var(--text-blue-800)] leading-tight">
                                {card.title}
                            </h3>
                            {card.type === "spread" && <InfoIcon className="w-4 h-4 text-blue-500 mt-1" />}
                        </div>
                        <img
                            src={card.logoUrl}
                            alt="logo"
                            className="h-12 w-12 rounded-full object-cover"
                            onError={(e) => (e.target.src = default_img)}
                        />
                    </div>

                    <div className="flex justify-between items-center">
                        <span className="text-xs font-semibold text-[color:var(--text-blue-600)] uppercase">
                            {card.label}
                        </span>
                        <span className="text-xl font-bold text-[color:var(--text-blue-800)] flex items-center gap-1">
                            {currencyFormatter.format(card.price)}
                            {card.pct_variation > 0 ? (
                                <ArrowUpIcon className="text-red-500 w-4 h-4" />
                            ) : (
                                <ArrowDownIcon className="text-green-500 w-4 h-4" />
                            )}
                        </span>
                    </div>
                </a>
            ))}
        </div>
    );
}