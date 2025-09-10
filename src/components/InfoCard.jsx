const InfoCard = () => {
    return (
        <>
            <div className="flex flex-col lg:flex-row gap-8">
                <div className="flex-grow lg:w-2/3 space-y-6">
                    <div className="relative pl-6">
                        <div className="absolute left-0 top-2 w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                        <p className="text-slate-700 leading-relaxed font-light">
                            Las cotizaciones presentadas son de carácter referencial, obtenidas mediante la agregación
                            de datos de múltiples fuentes del mercado financiero y criptográfico. La información se
                            actualiza con la mayor frecuencia técnicamente posible.
                        </p>
                    </div>

                    <div className="relative pl-6">
                        <div className="absolute left-0 top-2 w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                        <p className="text-slate-700 leading-relaxed font-light">
                            Los precios de ejecución final pueden diferir significativamente de las cotizaciones
                            mostradas debido a la aplicación de spreads, comisiones, slippage y condiciones
                            específicas de liquidez de cada plataforma.
                        </p>
                    </div>

                    <div className="relative pl-6">
                        <div className="absolute left-0 top-2 w-2 h-2 bg-gradient-to-r from-pink-500 to-cyan-500 rounded-full"></div>
                        <p className="text-slate-700 leading-relaxed font-light">
                            Este servicio no garantiza la exactitud, integridad o vigencia temporal de los datos.
                            Se recomienda encarecidamente verificar las condiciones actuales directamente
                            en su exchange o plataforma de preferencia.
                        </p>
                    </div>
                </div>

                <div className="space-y-4 lg:w-1/3">
                    <div className="bg-white/60 rounded-xl p-4 border border-blue-100/40">
                        <div className="uppercase tracking-wider text-blue-600 font-medium mb-2">
                            Responsabilidad
                        </div>
                        <p className="text-slate-600 leading-relaxed">
                            Los administradores de este sitio no asumen responsabilidad por decisiones
                            de inversión basadas en esta información.
                        </p>
                    </div>

                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 border border-purple-100/40">
                        <div className="uppercase tracking-wider text-purple-600 font-medium mb-2">
                            Uso recomendado
                        </div>
                        <p className="text-slate-600 leading-relaxed">
                            Utilice esta información únicamente como referencia para análisis
                            y comparación de tendencias de mercado.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default InfoCard;