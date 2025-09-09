import { useSelector } from "react-redux";

export default function BestPricesCard() {
    const { bestBuy, bestSell, loading } = useSelector(state => state.quotes);

    if (loading) return <div>Cargando...</div>;

    const cards = [
        bestBuy && {
            title: `Mejor precio para comprar: ${bestBuy.prettyName}`,
            price: bestBuy.ask,
            type: "buy",
            logoUrl: bestBuy.logoUrl,
            url: bestBuy.url,
            pct_variation: bestBuy.pct_variation,
        },
        bestSell && {
            title: `Mejor precio para vender: ${bestSell.prettyName}`,
            price: bestSell.bid,
            type: "sell",
            logoUrl: bestSell.logoUrl,
            url: bestSell.url,
            pct_variation: bestSell.pct_variation,
        },
    ].filter(Boolean);

    return (
        <div className="flex justify-around w-full gap-6">
            {cards.map((card, idx) => (
                <a
                    key={idx}
                    href={card.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-blue-100 hover:shadow-xl transition-all duration-300"
                >
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-medium text-blue-800">{card.title}</h3>
                        <img
                            src={card.logoUrl}
                            alt={card.title}
                            className="h-12 w-12 rounded-full object-cover"
                        />
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-blue-600">{card.type === "buy" ? "Compra" : "Venta"}</span>
                        <span className="text-xl font-semibold text-blue-800 flex items-center gap-1">
                            $ {card.price}
                            {card.pct_variation > 0 && (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-4 h-4 text-emerald-600"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                                </svg>
                            )}
                            {card.pct_variation < 0 && (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-4 h-4 text-red-600"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                </svg>
                            )}
                        </span>
                    </div>
                </a>
            ))}
        </div>
    );
}
