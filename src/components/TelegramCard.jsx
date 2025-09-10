const TelegramCard = () => {
    return (
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 shadow-sm border border-blue-100 mb-6">
            <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-blue-800">
                        <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                        <path d="M10.36 18.35a2 2 0 1 0 3.28 0" />
                    </svg>
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
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                                <path d="m22 2-7 20-4-9-9-4 20-7Z" />
                                <path d="M15 15l6-6" />
                            </svg>
                            Vincular Telegram
                        </button>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default TelegramCard;