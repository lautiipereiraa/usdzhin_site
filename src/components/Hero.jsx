import { useState, useEffect } from "react";
import { fetchPrices } from "@store/pricesSlice";
import CircleLoading from "@icons/CircleLoading";
import CircleIsLoading from "@icons/CircleIsLoading";
import BilleteAscii from "@components/BilleteAscii";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";

const cooldown_sec = 30;

// Las cuatro cruces de las esquinas: marcas de encuadre, puro detalle grafico.
const CORNERS = [
  "left-0 top-0",
  "right-0 top-0",
  "left-0 bottom-0",
  "right-0 bottom-0",
];

const Hero = () => {
  const dispatch = useDispatch();

  const { loading, selectedCurrency, lastFetchedAt } = useSelector((state) => state.prices);

  const [cooldown, setCooldown] = useState(0);

  // La hora sale del ultimo fetch exitoso que registra el store, no del momento
  // en que monto el componente: antes decia la hora de carga de la pagina aunque
  // el precio en pantalla fuera de mucho antes, y nunca se actualizaba sola.
  const lastUpdate = lastFetchedAt
    ? new Date(lastFetchedAt).toLocaleTimeString("es-AR", {
      hour: "2-digit",
      minute: "2-digit",
    })
    : "";

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
      setCooldown(cooldown_sec);
    } catch (err) {
      console.error("Error al actualizar precios:", err);
    }
  };

  const isButtonDisabled = loading || cooldown > 0;

  return (
    <div className="relative flex flex-col items-center justify-center py-8 text-center md:py-12">
      {CORNERS.map((position) => (
        <span
          key={position}
          aria-hidden="true"
          className={`pointer-events-none absolute ${position} select-none text-lg font-light leading-none text-[color:var(--text-color)] opacity-25`}
        >
          +
        </span>
      ))}

      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 mx-auto h-64 w-2/3 rounded-full bg-blue-500/10 blur-[80px] dark:bg-blue-500/20" />

      <motion.h1
        initial={{ opacity: 0, y: -20, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="font-display max-w-5xl text-3xl leading-[0.95] text-slate-900 dark:text-white sm:text-5xl md:text-6xl"
      >
        <span className="text-blue-600 dark:text-blue-500">El mejor precio</span>{" "}
        no es el que más te conviene.
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="mt-5 max-w-2xl text-base text-[color:var(--text-color)] opacity-70 sm:text-lg"
      >
        Comparamos 23 proveedores por lo que realmente te queda después de
        comisiones, no por el número de la pantalla.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25 }}
        className="mt-7 flex items-center justify-center rounded-full border border-[color:var(--border-color)]/80 bg-[color:var(--card-bg)]/60 px-5 py-2 text-sm font-medium text-[color:var(--text-color)] shadow-sm backdrop-blur-xl transition-shadow dark:shadow-none"
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

      {/* Mas baja en mobile: ahi el billete lo limita el ancho y una caja alta
          solo agrega vacio entre el titular y el resto de la pagina. */}
      <BilleteAscii className="mt-4 h-[26vh] min-h-[170px] w-full max-h-[460px] sm:mt-6 sm:h-[42vh] sm:min-h-[300px]" />
    </div>
  );
};

export default Hero;
