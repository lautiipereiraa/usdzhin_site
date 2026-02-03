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
            prettyName: bestBuy.prettyName,
            price: bestBuy.ask,
            type: "buy",
            logoUrl: bestBuy.logoUrl || bestBuy.logo || default_img,
            url: bestBuy.url || "#",
            pct_variation: bestBuy.pct_variation,
            is24x7: bestBuy.is24x7,
        },
        bestSell && {
            prettyName: bestSell.prettyName,
            price: bestSell.bid,
            type: "sell",
            logoUrl: bestSell.logoUrl || bestSell.logo || default_img,
            url: bestSell.url || "#",
            pct_variation: bestSell.pct_variation,
            is24x7: bestSell.is24x7,
        },
        bestSpread && {
            prettyName: bestSpread.prettyName,
            price: bestSpread.ask - bestSpread.bid,
            type: "spread",
            logoUrl: bestSpread.logoUrl || bestSpread.logo || default_img,
            url: bestSpread.url || "#",
            pct_variation: bestSpread.pct_variation,
            is24x7: bestSpread.is24x7,
        },
    ].filter(Boolean);

    if (cards.length === 0) return null;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full mb-8">
            {cards.map((card, idx) => (
                <a
                    key={idx}
                    href={card.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[color:var(--card-bg)] backdrop-blur-md rounded-2xl p-6 shadow-xl border border-[color:var(--border-color)] hover:bg-[color:var(--card-hover-bg)] transition-all duration-300 flex flex-col group relative overflow-hidden"
                >
                    <div className="flex items-center gap-2 mb-6">
                        {card.type === "buy" ? (
                            <ArrowDownIcon className="text-green-500 w-5 h-5" />
                        ) : card.type === "sell" ? (
                            <ArrowUpIcon className="text-red-500 w-5 h-5" />
                        ) : (
                            <InfoIcon className="text-blue-500 w-5 h-5" />
                        )}
                        <h3 className="text-sm font-semibold text-[color:var(--text-blue-800)] opacity-90 uppercase tracking-tight">
                            {card.type === "buy" ? "Mejor para comprar" : card.type === "sell" ? "Mejor para vender" : "Menor Spread"}
                        </h3>
                    </div>

                    <div className="mb-6">
                        <span className="text-4xl sm:text-5xl font-bold text-[color:var(--text-blue-800)] tracking-tighter">
                            {currencyFormatter.format(card.price)}
                        </span>
                    </div>

                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-[color:var(--border-color)] opacity-80 group-hover:opacity-100 transition-opacity">
                        <div className="flex items-center gap-2 bg-black/5 dark:bg-white/5 px-3 py-1.5 rounded-full border border-[color:var(--border-color)]">
                            <img
                                src={card.logoUrl}
                                alt={card.prettyName}
                                className="h-5 w-5 rounded-full object-cover"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = default_img;
                                }}
                            />
                            <span className="text-sm font-medium text-[color:var(--text-blue-600)]">
                                {card.prettyName}
                            </span>
                            {card.is24x7 && (
                                <span className="text-[10px] font-bold bg-green-500/20 text-green-500 px-1.5 py-0.5 rounded-md leading-none">
                                    24/7
                                </span>
                            )}
                        </div>
                        <div className="text-[color:var(--text-blue-400)]">
                            <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="9 5l7 7-7 7" />
                            </svg>
                        </div>
                    </div>
                </a>
            ))}
        </div>
    );
}