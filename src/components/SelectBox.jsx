import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ArrowDownBlueIcon from "@icons/ArrowDownBlueIcon";
import { fetchPrices, setSelectedCurrency } from "@store/pricesSlice";
import { useTheme } from "@context/ThemeContext";
import { AnimatePresence, motion } from "framer-motion";

const SelectBox = () => {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    const dispatch = useDispatch();
    const selected = useSelector((state) => state.prices.selectedCurrency);
    const { theme } = useTheme();

    const options = [
        { icon: "$", label: "US Dolar (USD)", name: "usd" },
        { icon: "◎", label: "USD Coin (USDC)", name: "usdc" },
        { icon: "◈", label: "Tether (USDT)", name: "usdt" },
        { icon: "₿", label: "Bitcoin (BTC)", name: "btc" },
        { icon: "Ξ", label: "Ethereum (ETH)", name: "eth" },
    ];

    useEffect(() => {
        dispatch(fetchPrices(selected.name));
    }, [dispatch, selected.name]);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="flex justify-center mb-10 relative z-40" ref={ref}>
            <button
                onClick={() => setOpen(!open)}
                className="flex justify-between items-center px-5 py-3 bg-[color:var(--card-bg)] border border-[color:var(--border-color)] rounded-xl shadow-sm hover:border-blue-500/50 hover:shadow-md transition-all duration-300 font-semibold min-w-[220px] cursor-pointer group"
            >
                <div className="flex items-center">
                    <span className="mr-3 text-lg text-blue-600 dark:text-blue-400 font-bold bg-blue-50 dark:bg-blue-900/30 w-8 h-8 rounded-full flex items-center justify-center">{selected.icon}</span>
                    <span className="truncate text-[color:var(--text-color)]">{selected.label}</span>
                </div>
                <div className={`transition-transform duration-300 text-slate-400 group-hover:text-blue-500 ${open ? 'rotate-180' : ''}`}>
                    <ArrowDownBlueIcon />
                </div>
            </button>

            <AnimatePresence>
                {open && (
                    <motion.div 
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-[calc(100%+8px)] left-1/2 -translate-x-1/2 bg-[color:var(--card-bg)] backdrop-blur-xl border border-[color:var(--border-color)] rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.5)] z-50 overflow-hidden w-64 p-1 custom-scroll"
                    >
                        {options.map((opt, i) => {
                            const isSelected = opt.label === selected.label;
                            return (
                                <button
                                    key={i}
                                    onClick={() => {
                                        dispatch(setSelectedCurrency(opt));
                                        setOpen(false);
                                    }}
                                    className={`w-full px-4 py-3 text-left transition-all duration-200 flex items-center rounded-lg mb-1 last:mb-0
                                        ${isSelected
                                            ? 'bg-blue-50 text-blue-700 dark:bg-[color:var(--hero-update-hover-bg)] dark:text-blue-400 font-medium'
                                            : 'text-[color:var(--text-color)] hover:bg-[color:var(--hero-update-bg)]'
                                        }`}
                                >
                                    <span className={`mr-3 text-base flex justify-center w-5 ${isSelected ? 'text-blue-600 dark:text-blue-400 font-bold' : 'text-slate-400 dark:text-slate-500'}`}>{opt.icon}</span>
                                    <span className="truncate">{opt.label}</span>
                                    {isSelected && (
                                        <span className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400"></span>
                                    )}
                                </button>
                            );
                        })}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default SelectBox;
