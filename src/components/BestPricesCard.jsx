import { useSelector } from "react-redux";
import ArrowUpIcon from "@icons/ArrowUpIcon";
import ArrowDownIcon from "@icons/ArrowDownIcon";
import InfoIcon from "@icons/InfoIcon";
import SkeletonBestPriceCard from "./SkeletonBestPriceCard";
import { motion } from "framer-motion";

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
            <div className="flex flex-col items-center justify-center min-h-[12rem] w-full mb-12">
                <div className="w-5 h-5 border-[2px] border-[color:var(--border-color)] border-t-[color:var(--text-blue-600)] rounded-full animate-spin"></div>
                <span className="mt-4 text-[10px] uppercase tracking-widest font-semibold text-[color:var(--text-color)] opacity-40">
                    Calculando mejores precios...
                </span>
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full mb-10">
            {cards.map((card, idx) => (
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    key={idx}
                    className="bg-[color:var(--card-bg)] rounded-2xl p-6 shadow-sm border border-[color:var(--border-color)] hover:shadow-lg hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-500 flex flex-col group relative overflow-hidden text-left"
                >
                    <div className="flex items-center gap-2 mb-6 relative z-10">
                        {card.type === "buy" ? (
                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-50 dark:bg-emerald-500/10">
                                <ArrowDownIcon className="text-emerald-500 w-4 h-4" />
                            </div>
                        ) : card.type === "sell" ? (
                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-rose-50 dark:bg-rose-500/10">
                                <ArrowUpIcon className="text-rose-500 w-4 h-4" />
                            </div>
                        ) : (
                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-500/10">
                                <InfoIcon className="text-blue-500 w-4 h-4" />
                            </div>
                        )}
                        <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                            {card.type === "buy" ? "Mejor Compra" : card.type === "sell" ? "Mejor Venta" : "Menor Spread"}
                        </h3>
                    </div>

                    <div className="mb-6 relative z-10">
                        <span className="text-4xl sm:text-5xl font-extrabold text-[color:var(--text-blue-800)] tracking-tighter">
                            {currencyFormatter.format(card.price)}
                        </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 mt-auto pt-4 border-t border-[color:var(--border-color)] relative z-10">
                        {card.providers.map((provider, pIdx) => (
                            <a
                                key={pIdx}
                                href={provider.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 bg-[color:var(--background-color)] hover:bg-[color:var(--border-color)]/30 px-3 py-1.5 rounded-full border border-[color:var(--border-color)] hover:border-[color:var(--border-color)]/80 transition-all duration-300"
                            >
                                <img
                                    src={provider.logoUrl}
                                    alt={provider.prettyName}
                                    className="h-5 w-5 rounded-full object-cover bg-white"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = default_img;
                                    }}
                                />
                                <span className="text-xs font-semibold text-[color:var(--text-color)]">
                                    {provider.prettyName}
                                </span>
                                {provider.is24x7 && (
                                    <span className="text-[9px] font-bold bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 px-1.5 py-0.5 rounded leading-none uppercase">
                                        24/7
                                    </span>
                                )}
                            </a>
                        ))}
                    </div>
                </motion.div>
            ))}
        </div>
    );
}