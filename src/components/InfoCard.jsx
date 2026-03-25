const InfoCard = () => {
    return (
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 mt-16 mb-12 pt-12 border-t border-slate-200/60 dark:border-slate-800/60">
            <div className="flex-grow lg:w-2/3 space-y-8">
                <div className="relative pl-6">
                    <div className="absolute left-0 top-2.5 w-1.5 h-1.5 bg-blue-500 dark:bg-blue-400 rounded-full"></div>
                    <p className="text-slate-600 dark:text-slate-400 text-base md:text-lg leading-relaxed font-light">
                        Las cotizaciones presentadas son de carácter referencial, obtenidas mediante la agregación
                        de datos de múltiples fuentes del mercado financiero y criptográfico. La información se
                        actualiza con la mayor frecuencia técnicamente posible.
                    </p>
                </div>

                <div className="relative pl-6">
                    <div className="absolute left-0 top-2.5 w-1.5 h-1.5 bg-blue-500 dark:bg-blue-400 rounded-full"></div>
                    <p className="text-slate-600 dark:text-slate-400 text-base md:text-lg leading-relaxed font-light">
                        Los precios de ejecución final pueden diferir significativamente de las cotizaciones
                        mostradas debido a la aplicación de spreads, comisiones, slippage y condiciones
                        específicas de liquidez de cada plataforma.
                    </p>
                </div>

                <div className="relative pl-6">
                    <div className="absolute left-0 top-2.5 w-1.5 h-1.5 bg-blue-500 dark:bg-blue-400 rounded-full"></div>
                    <p className="text-slate-600 dark:text-slate-400 text-base md:text-lg leading-relaxed font-light">
                        Este servicio no garantiza la exactitud, integridad o vigencia temporal de los datos.
                        Se recomienda encarecidamente verificar las condiciones actuales directamente
                        en su exchange o plataforma de preferencia.
                    </p>
                </div>
            </div>

            <div className="space-y-8 lg:w-1/3">
                <div className="bg-[color:var(--card-bg)] p-6 rounded-2xl border border-[color:var(--border-color)] shadow-sm">
                    <div className="uppercase tracking-widest text-xs text-blue-600 dark:text-blue-400 font-bold mb-3">
                        ¿Qué es el Spread?
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                        Es la diferencia entre el precio de <strong className="text-[color:var(--text-color)] font-semibold">compra</strong> y el precio de <strong className="text-[color:var(--text-color)] font-semibold">venta</strong>.
                        Representa el costo de intermediación: mientras menor sea el spread, más eficiente es el cambio.
                    </p>
                </div>

                <div>
                    <div className="uppercase tracking-widest text-[10px] text-slate-400 dark:text-slate-500 font-bold mb-2">
                        Responsabilidad
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">
                        Los administradores de este sitio no asumen responsabilidad por decisiones
                        de inversión basadas en esta información.
                    </p>
                </div>

                <div>
                    <div className="uppercase tracking-widest text-[10px] text-slate-400 dark:text-slate-500 font-bold mb-2">
                        Uso recomendado
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">
                        Utilice esta información únicamente como referencia para análisis
                        y comparación de tendencias de mercado.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default InfoCard;