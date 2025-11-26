import ArrowUpIcon from "@icons/ArrowUpIcon"
import ArrowDownIcon from "@icons/ArrowDownIcon"

const Card = ({ title, priceBuy, priceSell }) => {
  return (
    <>
      <div className="bg-[color:var(--card-bg)] backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-[color:var(--border-color)] hover:shadow-xl transition-all duration-300">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-[color:var(--text-blue-800)]">{title}</h3>
        </div>

        <div className="space-y-3">
          {priceBuy !== undefined && (
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-1">
                <span className="text-sm text-[color:var(--text-blue-600)]">Compra</span>
                <ArrowDownIcon />
              </div>
              <span className="text-xl font-semibold text-[color:var(--text-blue-800)]">$ {priceBuy}</span>
            </div>
          )}

          {priceSell !== undefined && (
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-1">
                <span className="text-sm text-[color:var(--text-blue-600)]">Venta</span>
                <ArrowUpIcon />
              </div>
              <span className="text-xl font-semibold text-[color:var(--text-blue-800)]">$ {priceSell}</span>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Card;
