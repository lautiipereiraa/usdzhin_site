import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ArrowDownBlueIcon from "@icons/ArrowDownBlueIcon";
import { fetchPrices, setSelectedCurrency } from "@store/pricesSlice";

const SelectBox = () => {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    const dispatch = useDispatch();
    const selected = useSelector((state) => state.prices.selectedCurrency);

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
        <div className="flex justify-center mb-6 relative" ref={ref}>
            <button
                onClick={() => setOpen(!open)}
                className="flex justify-center items-center px-4 py-2 bg-white/80 backdrop-blur-sm border border-blue-200 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 text-blue-800 font-medium min-w-40 cursor-pointer"
            >
                <span className="mr-2 text-base">{selected.icon}</span>
                <span className="mr-2">{selected.label}</span>
                <ArrowDownBlueIcon />
            </button>
            {open && (
                <div className="absolute top-full left-0 mt-2 bg-white/90 backdrop-blur-sm border border-blue-200 rounded-xl shadow-lg z-10 overflow-y-auto w-full max-h-40 custom-scroll">
                    {options.map((opt, i) => (
                        <button
                            key={i}
                            onClick={() => {
                                dispatch(setSelectedCurrency(opt));
                                setOpen(false);
                            }}
                            className={`w-full px-4 py-2 text-left hover:bg-blue-50 transition-colors duration-200 flex items-center ${opt.label === selected.label ? "bg-blue-100 text-blue-700" : "text-blue-800"}`}
                        >
                            <span className="mr-2 text-base">{opt.icon}</span>
                            <span className="truncate">{opt.label}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SelectBox;