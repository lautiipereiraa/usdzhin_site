import { useSelector } from "react-redux";
import ArrowUpIcon from "@icons/ArrowUpIcon";
import ArrowDownIcon from "@icons/ArrowDownIcon";

const default_img = "./src/assets/default_img.png";

const currencyFormatter = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
});

export default function ProvidersList() {
    const { data, loading } = useSelector((state) => state.prices);

    if (loading || !data) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[16rem] w-full">
                <div className="w-5 h-5 border-[2px] border-[color:var(--border-color)] border-t-[color:var(--text-blue-600)] rounded-full animate-spin"></div>
                <span className="mt-4 text-[10px] uppercase tracking-widest font-semibold text-[color:var(--text-color)] opacity-40">
                    Actualizando proveedores...
                </span>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.map((provider, idx) => (
                <a
                    key={idx}
                    href={provider.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[color:var(--card-bg)] rounded-2xl p-5 border border-[color:var(--border-color)] hover:bg-slate-50 dark:hover:bg-white/[0.04] hover:border-slate-300 dark:hover:border-slate-600 transition-colors duration-200 flex items-center justify-between group"
                >
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <img
                                src={provider.logoUrl || provider.logo || default_img}
                                alt={provider.prettyName}
                                className="h-10 w-10 sm:h-12 sm:w-12 rounded-full object-cover border border-[color:var(--border-color)] bg-white"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = default_img;
                                }}
                            />
                        </div>
                        <div>
                            <h4 className="font-semibold text-base sm:text-lg text-[color:var(--text-color)] transition-colors tracking-tight">
                                {provider.prettyName}
                            </h4>
                            <div className="flex items-center gap-2 mt-0.5">
                                {provider.isBank && (
                                    <span className="text-[9px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded-full uppercase font-bold tracking-widest">Banco</span>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="flex flex-col">
                            <span className="text-lg sm:text-xl font-bold text-[color:var(--text-color)] tracking-tighter">
                                {currencyFormatter.format(provider.ask)}
                            </span>
                            <div className="flex items-center justify-end gap-1 text-[10px] font-bold text-slate-400 dark:text-slate-500 mt-0.5 uppercase tracking-widest">
                                <span>Sp: {provider.ask && provider.bid ? currencyFormatter.format(provider.ask - provider.bid) : 'N/A'}</span>
                                {provider.pct_variation > 0 ? <ArrowUpIcon className="w-3 h-3 text-rose-500" /> : provider.pct_variation < 0 ? <ArrowDownIcon className="w-3 h-3 text-emerald-500" /> : null}
                            </div>
                        </div>
                    </div>
                </a>
            ))}
        </div>
    );
}
