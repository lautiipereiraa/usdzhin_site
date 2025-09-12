import BellIcon from "@icons/BellIcon";
import ArrowTelegram from "@icons/ArrowTelegram";

const TelegramCard = () => {
    return (
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 shadow-sm border border-blue-100 mb-6">
            <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <BellIcon />
                </div>
                <div className="flex-1">
                    <h3 className="font-semibold text-blue-800 text-lg mb-2">
                        Recibí los mejores precios diariamente (notificación diaria)
                    </h3>
                    <span></span>
                    <p className="text-blue-800 text-sm mb-4">
                        Vinculá tu Telegram y recibí notificaciones con los mejores precios del dólar.
                    </p>

                    <a
                        href="https://t.me/usdzhinbot"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <button
                            className="bg-blue-800 text-white px-6 py-2 rounded-xl hover:bg-blue-900 transition-colors font-medium text-sm flex items-center gap-2 cursor-pointer"
                        >
                           <ArrowTelegram />
                            Vincular Telegram
                        </button>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default TelegramCard;