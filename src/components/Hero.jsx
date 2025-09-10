import logo from "@assets/logo.png"
import { useState, useEffect } from "react";
import { fetchQuotes } from "@store/quotesSlice";
import { useDispatch, useSelector } from "react-redux";

const Hero = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.quotes);
  const [lastUpdate, setLastUpdate] = useState("");

  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  useEffect(() => {
    const fetchInitial = async () => {
      try {
        await dispatch(fetchQuotes()).unwrap();
        setLastUpdate(getCurrentTime());
      } catch (err) {
        console.error("Error al cargar quotes iniciales:", err);
      }
    };
    fetchInitial();
  }, [dispatch]);

  const handleUpdate = async () => {
    try {
      await dispatch(fetchQuotes()).unwrap();
      setLastUpdate(getCurrentTime());
    } catch (err) {
      console.error("Error al actualizar quotes:", err);
    }
  };

  return (
    <div className="py-8 text-center">
      <div className="flex items-center justify-center">
        <img src={logo} alt="Logo de USDZHIN" className="h-30" />
      </div>

      <div className="flex items-center justify-center text-sm text-blue-600 mb-4">
        <span className="mr-4">
          Última actualización: {lastUpdate || "—:—"}
        </span>
        <button
          onClick={handleUpdate}
          disabled={loading}
          className={`flex items-center px-3 py-1 rounded-full transition-colors duration-200 
            ${loading ? "bg-blue-300 cursor-not-allowed" : "bg-blue-200 hover:bg-blue-300"}`}
        >
          {loading ? (
            <svg
              className="animate-spin w-4 h-4 mr-1 text-blue-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              ></path>
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-refresh-cw w-4 h-4 mr-1"
            >
              <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"></path>
              <path d="M21 3v5h-5"></path>
              <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"></path>
              <path d="M8 16H3v5"></path>
            </svg>
          )}
          Actualizar
        </button>
      </div>

      {error && (
        <p className="text-red-500 text-sm">
          Error al actualizar quotes. Se mantiene la última hora correcta.
        </p>
      )}
    </div>
  );
};

export default Hero;
