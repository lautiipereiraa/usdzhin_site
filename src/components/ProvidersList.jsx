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
    const { data, loading, selectedCurrency } = useSelector((state) => state.prices);

    if (loading || !data) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="h-24 bg-[color:var(--card-bg)] animate-pulse rounded-2xl border border-[color:var(--border-color)]"></div>
                ))}
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.map((provider, idx) => (
                <a
                    key={idx}
                    href={provider.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[color:var(--card-bg)] backdrop-blur-sm rounded-2xl p-4 shadow-sm border border-[color:var(--border-color)] hover:shadow-md transition-all duration-300 flex items-center justify-between group"
                >
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <img
                                src={provider.logoUrl || provider.logo || default_img}
                                alt={provider.prettyName}
                                className="h-10 w-10 rounded-full object-cover border border-[color:var(--border-color)]"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = default_img;
                                }}
                            />

                        </div>
                        <div>
                            <h4 className="font-medium text-[color:var(--text-blue-800)] group-hover:text-blue-600 transition-colors">
                                {provider.prettyName}
                            </h4>
                            <div className="flex items-center gap-2">
                                {provider.isBank && (
                                    <span className="text-[10px] bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded uppercase font-bold">Banco</span>
                                )}

                            </div>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="flex flex-col">
                            <span className="text-lg font-bold text-[color:var(--text-blue-800)]">
                                {currencyFormatter.format(provider.ask)}
                            </span>
                            <div className="flex items-center justify-end gap-1 text-[10px] text-[color:var(--text-blue-600)]">
                                <span>Spread: {provider.ask && provider.bid ? currencyFormatter.format(provider.ask - provider.bid) : 'N/A'}</span>
                                {provider.pct_variation > 0 ? <ArrowUpIcon className="w-3 h-3" /> : provider.pct_variation < 0 ? <ArrowDownIcon className="w-3 h-3" /> : null}
                            </div>
                        </div>
                    </div>
                </a>
            ))}
        </div>
    );
}
