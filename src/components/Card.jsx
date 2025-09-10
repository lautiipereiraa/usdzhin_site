const Card = ({ title, priceBuy, priceSell }) => {
  return (
    <>
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-blue-100 hover:shadow-xl transition-all duration-300">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-blue-800">{title}</h3>
        </div>

        <div className="space-y-3">
          {priceBuy !== undefined && (
            <div className="flex justify-between items-center">
              <span className="text-sm text-blue-600">Compra</span>
              <span className="text-xl font-semibold text-blue-800">$ {priceBuy}</span>
            </div>
          )}

          {priceSell !== undefined && (
            <div className="flex justify-between items-center">
              <span className="text-sm text-blue-600">Venta</span>
              <span className="text-xl font-semibold text-blue-800">$ {priceSell}</span>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Card;
