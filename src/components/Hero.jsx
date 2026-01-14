<<<<<<< Updated upstream
import logo from "@assets/logo.png"
=======
import logo from "@assets/logo.png";
import logoDarkMode from "@assets/icon_dark_mode.png";
import { useTheme } from "@context/ThemeContext";
>>>>>>> Stashed changes
import { useState, useEffect } from "react";
import { fetchPrices } from "@store/pricesSlice";
import CircleLoading from "@icons/CircleLoading";
import CircleIsLoading from "@icons/CircleIsLoading";
import { useDispatch, useSelector } from "react-redux";

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
    <div className="py-8 text-center relative">
      <div className="flex items-center justify-center">
        <img src={theme === 'light' ? logo : logoDarkMode} alt="Logo de USDZHIN" className="h-24 sm:h-28 md:h-32" />
      </div>

      <div className="flex items-center justify-center text-sm text-blue-600 dark:text-[color:var(--text-blue-600)] mb-4 mt-0">
        <span className="mr-4">
          Última actualización: {lastUpdate || "—:—"}
        </span>
        <button
          onClick={handleUpdate}
          disabled={isButtonDisabled}
          className={`flex items-center px-3 py-1 rounded-full transition-colors duration-200 
            ${isButtonDisabled ? 'bg-blue-300 dark:bg-gray-700 cursor-not-allowed' : 'bg-blue-200 hover:bg-blue-300 dark:bg-[color:var(--hero-update-bg)] dark:hover:bg-[color:var(--hero-update-hover-bg)] active:bg-[color:var(--text-blue-600)]'}`}
        >
          {loading ? (
            <CircleIsLoading />
          ) : (
            <CircleLoading />
          )}
          Actualizar {cooldown > 0 && `(${cooldown}s)`}
        </button>
      </div>
    </div>
  );
};

export default Hero;