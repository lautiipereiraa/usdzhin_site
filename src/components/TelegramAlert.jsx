import IconX from "@icons/IconX";
import BellIcon from "@icons/BellIcon";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ArrowTelegram from "@icons/ArrowTelegram";

const TelegramAlert = ({ interval = 15000, duration = 7000, delay = 1000 }) => {
  const [visible, setVisible] = useState(false);
  const [closedManually, setClosedManually] = useState(false);

  useEffect(() => {
    let initialTimer;
    let recurringTimer;

    const showAlert = () => {
      if (!closedManually) {
        setVisible(true);
        setTimeout(() => setVisible(false), duration);
      }
    };

    initialTimer = setTimeout(() => {
      showAlert();
      recurringTimer = setInterval(showAlert, interval);
    }, delay);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(recurringTimer);
    };
  }, [interval, duration, delay, closedManually]);

  const handleClose = () => {
    setVisible(false);
    setClosedManually(true);
    setTimeout(() => setClosedManually(false), interval);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="telegram-alert"
          initial={{ y: -100, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: -100, opacity: 0, scale: 0.95 }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 25,
            opacity: { duration: 0.2 }
          }}
          className="fixed top-6 right-6 z-50 w-full max-w-sm"
        >
          <div className="absolute inset-0 bg-white/70 backdrop-blur-md rounded-2xl"></div>

          <div className="relative bg-gradient-to-br from-blue-50/90 to-indigo-100/90 rounded-2xl p-6 shadow-2xl border border-blue-200/50 backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 via-transparent to-indigo-400/20 rounded-2xl pointer-events-none"></div>

            <button
              onClick={handleClose}
              className="absolute top-3 right-3 w-8 h-8 bg-white/80 hover:bg-white rounded-full flex items-center justify-center text-blue-600 hover:text-blue-800 transition-all duration-200 hover:scale-110 shadow-sm"
            >
              <IconX className="w-4 h-4" />
            </button>

            <div className="flex items-start gap-4">
              <div className="flex-1">
                <h3 className="font-bold text-slate-800 text-xl mb-2 tracking-tight">
                  ¡Próximamente!
                </h3>

                <p className="text-slate-600 text-sm leading-relaxed mb-5 max-w-xs">
                  Estoy trabajando para integrar un bot de Telegram. Mientras tanto, podés ver el código aquí.
                </p>

                <a
                  href="https://github.com/lautiipereiraa/usdzhinbot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                >
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center justify-center gap-3 bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-900 hover:to-black text-white px-6 py-3.5 rounded-xl cursor-pointer text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-200 w-full sm:w-auto"
                  >
                    <span>Ver en GitHub</span>
                    <ArrowTelegram className="w-4 h-4 text-white group-hover:translate-x-0.5 transition-transform duration-200" />
                  </motion.button>
                </a>
              </div>
            </div>

            <div className="absolute top-0 left-1/4 w-1/2 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TelegramAlert;