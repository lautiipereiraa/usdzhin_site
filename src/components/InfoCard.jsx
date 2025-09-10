const InfoCard = () => {
    return (
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-blue-100">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-blue-800">
                    La información proporcionada en este sitio tiene carácter meramente informativo. Recopilamos y publicamos cotizaciones de diversas plataformas con la mayor actualización posible, sin embargo, no garantizamos la exactitud, integridad o vigencia de los datos mostrados. Los precios finales de transacción pueden variar respecto a las cotizaciones exhibidas debido a comisiones, spread, tasas o cargos adicionales aplicados por cada plataforma. El usuario acepta que este sitio y sus administradores no serán responsables por decisiones financieras tomadas en base a esta información, ni por discrepancias entre las cotizaciones mostradas y los precios de ejecución final. Se recomienda verificar las condiciones actualizadas directamente en cada plataforma antes de realizar cualquier operación.
                </h3>
            </div>
        </div>
    );
};

export default InfoCard;
