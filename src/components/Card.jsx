const Card = ({ title, priceBuy, priceSell, variation }) => {
  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-blue-100 hover:shadow-xl transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-blue-800">{title}</h3>
        <div className="flex items-center text-emerald-600">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trending-up w-4 h-4">
            <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
            <polyline points="16 7 22 7 22 13"></polyline>
          </svg>
        </div>
      </div>
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-blue-600">Compra</span>
          <span className="text-xl font-semibold text-blue-800">$ {priceBuy}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-blue-600">Venta</span>
          <span className="text-xl font-semibold text-blue-800">$ {priceSell}</span>
        </div>
        {/* <div className="pt-2 border-t border-blue-100">
          <div className="flex justify-between items-center">
            <span className="text-sm text-blue-600">Variación</span>
            <span className="text-sm font-medium text-emerald-600">{variation}</span>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Card;
