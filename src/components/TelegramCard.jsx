import BellIcon from "@icons/BellIcon";
import ShowCodeIcon from "@icons/ShowCodeIcon";
import ArrowTelegram from "@icons/ArrowTelegram";

const TelegramCard = () => {
    return (
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 shadow-sm border border-blue-100 mb-6">
            <div className="flex flex-col sm:flex-row items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <BellIcon />
                </div>

                <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                        <h3 className="font-semibold text-blue-800 text-lg">
                            Notificaciones de Telegram
                        </h3>
                        <span className="bg-orange-100 text-orange-700 text-xs px-2 py-1 rounded-full font-medium">
                            En desarrollo
                        </span>
                    </div>

                    <p className="text-blue-800 text-sm mb-4">
                        Bot de Telegram para recibir notificaciones diarias con los mejores precios del dólar.
                        Actualmente en fase de desarrollo.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3">
                        <a
                            href="https://github.com/lautiipereiraa/usdzhinbot"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-gray-700 text-white px-4 py-2 rounded-xl hover:bg-gray-800 transition-colors font-medium text-sm flex items-center gap-2 justify-center sm:justify-start"
                        >
                            <ShowCodeIcon />
                            Ver código
                        </a>

                        <button
                            disabled
                            className="bg-blue-300 text-blue-600 px-4 py-2 rounded-xl font-medium text-sm flex items-center gap-2 cursor-not-allowed opacity-60 justify-center sm:justify-start"
                        >
                            <ArrowTelegram />
                            Próximamente
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TelegramCard;
