import { useState, useRef, useEffect } from "react";

const SelectBox = () => {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState({ icon: "$", label: "USD" });
    const ref = useRef(null);

    const options = [
        { icon: "$", label: "US Dolar (USD)" },
        { icon: "◎", label: "USD Coin (USDC)" },  
        { icon: "◈", label: "Tether (USDT)" },
        { icon: "₿", label: "Bitcoin (BTC)" },
        { icon: "Ξ", label: "Ethereum (ETH)" },
    ];


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
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`w-4 h-4 transition-transform duration-200 ${open ? "rotate-180" : ""
                        }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="m6 9 6 6 6-6" />
                </svg>
            </button>

            {open && (
                <div className="absolute top-full left-0 mt-2 bg-white/90 backdrop-blur-sm border border-blue-200 rounded-xl shadow-lg z-10 overflow-y-auto w-full max-h-40 custom-scroll">
                    {options.map((opt, i) => (
                        <button
                            key={i}
                            onClick={() => {
                                setSelected(opt);
                                setOpen(false);
                            }}
                            className={`w-full px-4 py-2 text-left hover:bg-blue-50 transition-colors duration-200 flex items-center ${opt.label === selected.label
                                ? "bg-blue-100 text-blue-700"
                                : "text-blue-800"
                                }`}
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
