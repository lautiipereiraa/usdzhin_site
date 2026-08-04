/* eslint-disable no-unused-vars */
// El disable es por `motion`: se usa como `motion.div` en el JSX, pero esta
// config de eslint no lo detecta. Mismo workaround que Card.jsx.
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAmount } from "@store/pricesSlice";
import ConvertIcon from "@icons/ConvertIcon";
import IconX from "@icons/IconX";
import { AnimatePresence, motion } from "framer-motion";

// Por divisa: nadie compra 100 BTC (serian miles de millones de pesos) ni 0,01
// dolares. Los montos que tienen sentido no son los mismos en cada mercado.
const presets_by_currency = {
  usd: [100, 500, 1000],
  usdc: [100, 500, 1000],
  usdt: [100, 500, 1000],
  btc: [0.01, 0.1, 1],
  eth: [0.1, 0.5, 1],
};

const default_presets = [1, 10, 100];

// El usuario argentino escribe "1.000,50": punto de miles y coma decimal. Pero
// tambien puede escribir "1000.5" con el punto como decimal. Se resuelve la
// ambiguedad asi: si hay coma, la coma es el decimal y los puntos son de miles.
// Si solo hay puntos, son de miles unicamente cuando el ultimo grupo tiene 3
// digitos exactos ("1.000"); en cualquier otro caso el punto es decimal ("1.5").
const parseAmount = (raw) => {
  const clean = String(raw).trim().replace(/\s/g, "");
  if (!clean) return null;

  let normalized;
  if (clean.includes(",")) {
    normalized = clean.replace(/\./g, "").replace(",", ".");
  } else {
    const groups = clean.split(".");
    normalized = groups.length > 1 && groups[groups.length - 1].length === 3
      ? groups.join("")
      : clean;
  }

  const parsed = Number(normalized);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
};

const AmountInput = () => {
  const dispatch = useDispatch();
  const { selectedCurrency, amount } = useSelector((state) => state.prices);

  const [open, setOpen] = useState(false);

  // El texto crudo vive local para que se pueda borrar el campo y escribir a
  // medias sin que el store quede con un monto invalido en el medio.
  const [raw, setRaw] = useState("1");
  const inputRef = useRef(null);

  const ticker = selectedCurrency.label.match(/\(([^)]+)\)/)?.[1] ?? "";
  const invalid = raw.trim() !== "" && parseAmount(raw) === null;
  const presets = presets_by_currency[selectedCurrency.name] ?? default_presets;

  // Con monto 1 el sitio muestra precios unitarios: la calculadora no altera
  // nada. Con cualquier otro valor el icono queda en azul, porque es la unica
  // pista de donde se cambia ese numero. El "x 1.000 USD" que explica el total
  // ya lo muestran las tarjetas del podio.
  const active = amount !== 1;

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const handleChange = (value) => {
    setRaw(value);
    const parsed = parseAmount(value);
    dispatch(setAmount(parsed ?? 1));
  };

  const applyPreset = (preset) => {
    setRaw(preset.toLocaleString("es-AR"));
    dispatch(setAmount(preset));
  };

  const reset = () => {
    setRaw("1");
    dispatch(setAmount(1));
    inputRef.current?.focus();
  };

  return (
    <div className="flex items-center gap-2">
      {/* El alto tiene que coincidir con el boton del selector de divisa. Ese
          mide 58px porque combina py-3 con el circulo de w-8 h-8 del icono, asi
          que aca se repite la misma estructura: px-4 py-3 con el icono en una
          caja de w-8 h-8. Coinciden por construccion, sin alto hardcodeado. */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls="amount-panel"
        aria-label="Convertir un monto"
        title="Convertir un monto"
        className={`flex items-center justify-center shrink-0 px-4 py-3 rounded-xl border shadow-sm bg-[color:var(--card-bg)] transition-all duration-300 cursor-pointer group
          ${active || open
            ? 'border-blue-500/50 dark:border-blue-400/40'
            : 'border-[color:var(--border-color)] hover:border-blue-500/50 hover:shadow-md'
          }`}
      >
        <span className="flex items-center justify-center w-8 h-8">
          <ConvertIcon
            className={`w-5 h-5 transition-colors ${active || open
              ? 'text-blue-600 dark:text-blue-400'
              : 'text-slate-400 group-hover:text-blue-500'
              }`}
          />
        </span>
      </button>

      {/* Se despliega a lo ancho, no a lo alto: creciendo hacia abajo empujaba
          todo el contenido de la pagina cada vez que se abria. */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id="amount-panel"
            key="amount-panel"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "auto", opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            {/* w-max: mantiene el ancho natural del contenido mientras el
                contenedor de afuera lo recorta durante la animacion. */}
            <div className="flex items-center gap-2 w-max">
              {/* Mismo px-4 py-3 + caja de 32px que el boton, para que el input
                  quede exactamente al mismo alto. */}
              <div
                className={`flex items-center px-4 py-3 bg-[color:var(--card-bg)] border rounded-xl shadow-sm transition-colors duration-300 w-[150px]
                  ${invalid
                    ? 'border-rose-400 dark:border-rose-500/60'
                    : 'border-[color:var(--border-color)] focus-within:border-blue-500/50'
                  }`}
              >
                <input
                  ref={inputRef}
                  id="amount"
                  type="text"
                  inputMode="decimal"
                  value={raw}
                  onChange={(e) => handleChange(e.target.value)}
                  onFocus={(e) => e.target.select()}
                  placeholder="1"
                  aria-label={`Monto en ${ticker || selectedCurrency.label}`}
                  aria-invalid={invalid}
                  className="w-full min-w-0 h-8 bg-transparent text-right text-lg font-bold text-[color:var(--text-color)] tracking-tight outline-none placeholder:font-normal placeholder:text-slate-400"
                />
                <span className="ml-2 text-sm font-semibold text-blue-600 dark:text-blue-400 shrink-0">
                  {ticker}
                </span>
              </div>

              {/* Los presets se esconden en mobile: ahi el ancho no alcanza y el
                  numero se escribe a mano. */}
              <div className="hidden sm:flex items-center gap-1">
                {presets.map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => applyPreset(preset)}
                    className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition-colors duration-200 cursor-pointer whitespace-nowrap
                      ${amount === preset
                        ? 'bg-blue-50 text-blue-700 dark:bg-[color:var(--hero-update-bg)] dark:text-blue-400'
                        : 'text-slate-500 dark:text-slate-400 hover:bg-[color:var(--hero-update-bg)] hover:text-blue-600 dark:hover:text-blue-400'
                      }`}
                  >
                    {preset.toLocaleString("es-AR")}
                  </button>
                ))}
              </div>

              {active && (
                <button
                  type="button"
                  onClick={reset}
                  title="Volver a precios unitarios"
                  aria-label="Volver a precios unitarios"
                  className="flex items-center justify-center shrink-0 p-1.5 rounded-full text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 transition-colors cursor-pointer"
                >
                  <IconX className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AmountInput;
