import { useTheme } from "@context/ThemeContext";
import { useState, useEffect } from "react";
import { fetchPrices } from "@store/pricesSlice";
import CircleLoading from "@icons/CircleLoading";
import CircleIsLoading from "@icons/CircleIsLoading";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";

const cooldown_sec = 30;

const Hero = () => {
  const dispatch = useDispatch();
  const { theme } = useTheme();

  const { loading, selectedCurrency } = useSelector((state) => state.prices);

  const [lastUpdate, setLastUpdate] = useState("");
  const [cooldown, setCooldown] = useState(0);

  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  useEffect(() => {
    if (!lastUpdate && !loading) {
      setLastUpdate(getCurrentTime());
    }
  }, [lastUpdate, loading]);

  useEffect(() => {
    if (cooldown > 0) {
      const timer = setInterval(() => {
        setCooldown((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [cooldown]);

  const handleUpdate = async () => {
    if (cooldown > 0) return;

    try {
      await dispatch(fetchPrices(selectedCurrency.name)).unwrap();
      setLastUpdate(getCurrentTime());
      setCooldown(cooldown_sec);
    } catch (err) {
      console.error("Error al actualizar precios:", err);
    }
  };

  const isButtonDisabled = loading || cooldown > 0;

  return (
    <div className="py-12 md:py-16 text-center relative flex flex-col items-center justify-center space-y-8">
      <motion.div 
        initial={{ opacity: 0, y: -20, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-center justify-center relative"
      >
        <div className="absolute inset-0 bg-blue-500/10 dark:bg-blue-500/20 blur-[80px] rounded-full -z-10 transform scale-150 transition-all duration-1000 ease-in-out"></div>
        <h1 className="text-5xl sm:text-6xl md:text-8xl font-black text-slate-900 dark:text-white tracking-tighter drop-shadow-sm transition-all duration-1000 ease-in-out">
          USD<span className="text-blue-600 dark:text-blue-500 text-transparent bg-clip-text bg-gradient-to-br from-blue-500 to-blue-700 dark:from-blue-400 dark:to-blue-600 transition-all duration-1000 ease-in-out">ZHIN</span>
        </h1>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex items-center justify-center text-sm font-medium text-[color:var(--text-color)] bg-[color:var(--card-bg)]/60 border border-[color:var(--border-color)]/80 rounded-full px-5 py-2 backdrop-blur-xl shadow-sm transition-shadow dark:shadow-none"
      >
        <div className="flex items-center space-x-4">
          <span className="flex items-center space-x-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>Actualizado: <span className="text-[color:var(--text-color)] font-semibold ml-1">{lastUpdate || "—:—"}</span></span>
          </span>
          <div className="w-px h-4 bg-[color:var(--border-color)]"></div>
          <button
            onClick={handleUpdate}
            disabled={isButtonDisabled}
            className={`flex items-center transition-all duration-200 font-semibold group
              ${isButtonDisabled ? 'opacity-50 cursor-not-allowed text-slate-400' : 'cursor-pointer text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300'}`}
          >
            <span className="mr-1.5 flex items-center justify-center">
              {loading ? <CircleIsLoading className="w-4 h-4 animate-spin" /> : <CircleLoading className="w-4 h-4" />}
            </span>
            <span>Actualizar {cooldown > 0 && <span className="opacity-75 font-normal ml-0.5">({cooldown}s)</span>}</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;