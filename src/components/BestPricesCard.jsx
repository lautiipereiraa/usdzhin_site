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
        bestBuy && bestBuy.length > 0 && {
            providers: bestBuy.map(p => ({
                prettyName: p.prettyName,
                logoUrl: p.logoUrl || p.logo || default_img,
                url: p.url || "#",
                is24x7: p.is24x7,
            })),
            price: bestBuy[0].ask,
            type: "buy",
        },
        bestSell && bestSell.length > 0 && {
            providers: bestSell.map(p => ({
                prettyName: p.prettyName,
                logoUrl: p.logoUrl || p.logo || default_img,
                url: p.url || "#",
                is24x7: p.is24x7,
            })),
            price: bestSell[0].bid,
            type: "sell",
        },
        bestSpread && bestSpread.length > 0 && {
            providers: bestSpread.map(p => ({
                prettyName: p.prettyName,
                logoUrl: p.logoUrl || p.logo || default_img,
                url: p.url || "#",
                is24x7: p.is24x7,
            })),
            price: bestSpread[0].ask - bestSpread[0].bid,
            type: "spread",
        },
    ].filter(Boolean);

    if (cards.length === 0) return null;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full mb-8">
            {cards.map((card, idx) => (
                <div
                    key={idx}
                    className="bg-[color:var(--card-bg)] backdrop-blur-md rounded-2xl p-4 sm:p-6 shadow-xl border border-[color:var(--border-color)] hover:bg-[color:var(--card-hover-bg)] transition-all duration-300 flex flex-col group relative overflow-hidden"
                >
                    <div className="flex items-center gap-2 mb-4 sm:mb-6">
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

                    <div className="mb-4 sm:mb-6">
                        <span className="text-4xl sm:text-5xl font-bold text-[color:var(--text-blue-800)] tracking-tighter">
                            {currencyFormatter.format(card.price)}
                        </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 mt-auto pt-3 sm:pt-4 border-t border-[color:var(--border-color)] opacity-80 group-hover:opacity-100 transition-opacity">
                        {card.providers.map((provider, pIdx) => (
                            <a
                                key={pIdx}
                                href={provider.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 bg-black/5 dark:bg-white/5 px-3 py-2 rounded-full border border-[color:var(--border-color)] hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
                            >
                                <img
                                    src={provider.logoUrl}
                                    alt={provider.prettyName}
                                    className="h-5 w-5 rounded-full object-cover"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = default_img;
                                    }}
                                />
                                <span className="text-sm font-medium text-[color:var(--text-blue-600)]">
                                    {provider.prettyName}
                                </span>
                                {provider.is24x7 && (
                                    <span className="text-[10px] font-bold bg-green-500/20 text-green-500 px-1.5 py-0.5 rounded-md leading-none">
                                        24/7
                                    </span>
                                )}
                            </a>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}