/* eslint-disable no-unused-vars */
// El disable es por `motion`: se usa como `motion.div` en el JSX, pero esta
// config de eslint no lo detecta. Mismo workaround que Card.jsx.
import { useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import SelectBox from "@components/SelectBox";
import ConvertIcon from "@icons/ConvertIcon";
import default_img from "@assets/default_img.png";
import RollingNumber from "@components/RollingNumber";
import { motion, AnimatePresence } from "framer-motion";
import {
  arsFormatter,
  caretAfterDigits,
  decimalsFor,
  digitsBefore,
  formatAmountText,
  formatAsset,
  formatSigned,
  parseAmountText,
  parsePastedAmount,
  toAmountText,
} from "@lib/numberFormat";
import { countTiedAtBest, rankByAsk, yieldFor } from "@lib/bestPrice";

const OTHERS_SHOWN = 5;

const Calculator = () => {
  const { data, selectedCurrency } = useSelector((state) => state.prices);

  // El texto crudo vive local para poder borrar el campo y escribir a medias
  // sin que el store quede con un monto invalido en el medio.
  const [raw, setRaw] = useState("");
  const [inverted, setInverted] = useState(false);
  const [open, setOpen] = useState(false);
  const inputRef = useRef(null);
  const caretRef = useRef(null);
  // Valor exacto arrastrado al invertir. El campo muestra el redondeado, pero la
  // cuenta usa este hasta que el usuario escriba: si no, 500.000 pesos dan
  // 331,79 dolares y al invertir vuelven 500.007,53, que parece un error.
  const exactRef = useRef(null);
  const panelRef = useRef(null);

  const ticker = selectedCurrency.label.match(/\(([^)]+)\)/)?.[1] ?? "";
  const assetDecimals = decimalsFor(selectedCurrency.name);
  // Lo que se tipea son pesos en modo directo y unidades del activo en invertido.
  const inputDecimals = inverted ? assetDecimals : 2;

  const typed = parseAmountText(raw);
  const amount = exactRef.current ?? typed;
  const ranking = useMemo(() => rankByAsk(data), [data]);
  const best = ranking[0] ?? null;
  const tied = countTiedAtBest(ranking);
  const others = ranking.slice(1, 1 + OTHERS_SHOWN);

  const bestYield = best && amount ? yieldFor(best, amount, inverted) : null;
  const showOthers = Boolean(amount) && others.length > 0;

  // La calculadora no toca el resto de la pagina. El podio y la lista muestran
  // siempre precios por unidad, que es lo que los hace comparables entre si;
  // multiplicarlos por el monto escalaba las tres tarjetas por la misma
  // constante sin agregar informacion, y dejaba cifras raras como un spread
  // multiplicado. La pregunta "cuanto me queda con X" vive solo aca.

  // Reformatear en cada tecla corre los puntos de miles y el cursor se va al
  // final. Se guarda cuantos digitos habia antes del cursor y se lo vuelve a
  // poner despues de esos mismos digitos.
  useEffect(() => {
    if (caretRef.current === null || !inputRef.current) return;
    const position = caretAfterDigits(raw, caretRef.current);
    inputRef.current.setSelectionRange(position, position);
    caretRef.current = null;
  }, [raw]);

  useEffect(() => {
    exactRef.current = null;
  }, [selectedCurrency.name]);

  useEffect(() => {
    if (open) inputRef.current?.focus({ preventScroll: true });
  }, [open]);

  const handleChange = (event) => {
    const { value, selectionStart } = event.target;
    exactRef.current = null;
    caretRef.current = digitsBefore(value, selectionStart);
    setRaw(formatAmountText(value, inputDecimals));
  };

  // El punto del teclado numerico se convierte en coma antes de entrar. Asi
  // todos los puntos del valor son del agrupador y no hay que adivinar despues
  // cual separador puso quien.
  const handleBeforeInput = (event) => {
    if (event.data !== "." && event.data !== ",") return;
    event.preventDefault();
    exactRef.current = null;
    if (raw.includes(",")) return;
    setRaw(`${raw || "0"},`);
  };

  const handlePaste = (event) => {
    event.preventDefault();
    exactRef.current = null;
    const pasted = parsePastedAmount(event.clipboardData.getData("text"));
    if (pasted !== null) setRaw(toAmountText(pasted, inputDecimals));
  };

  // Al invertir se conserva el valor, no el numero: si tenias 500.000 pesos que
  // daban 330 dolares, pasas a tener 330 dolares. Cambiar el modo y que el campo
  // diga "500.000 USD" no tendria ningun sentido.
  const invert = () => {
    const next = !inverted;
    if (amount && best) {
      const carried = yieldFor(best, amount, inverted);
      exactRef.current = carried;
      setRaw(toAmountText(carried, decimalsFor(next ? selectedCurrency.name : "usd")));
    } else {
      exactRef.current = null;
    }
    setInverted(next);
    inputRef.current?.focus();
  };

  const topLabel = inverted ? "Quiero" : "Tengo";
  const bottomLabel = inverted ? "Necesitás" : "Recibís";
  const inputUnit = inverted ? ticker : "ARS";
  const resultUnit = inverted ? "ARS" : ticker;

  const resultText = bestYield === null
    ? "—"
    : inverted
      ? arsFormatter.format(bestYield)
      : formatAsset(bestYield, selectedCurrency.name);

  return (
    <section id="calculadora" className="mx-auto w-full max-w-4xl">
      <div className="flex items-center justify-center gap-2">
        <SelectBox />

        {/* Mismo alto que el boton del selector: ese mide 58px porque combina
            py-3 con el circulo de w-8 h-8 del icono, asi que aca se repite la
            misma estructura. Coinciden por construccion, sin alto hardcodeado. */}
        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="calc-panel"
          title="Calcular un monto"
          aria-label="Calcular un monto"
          className={`group flex shrink-0 cursor-pointer items-center justify-center rounded-xl border bg-[color:var(--card-bg)] px-4 py-3 shadow-sm transition-all duration-300
            ${open || amount
              ? "border-blue-500/50 dark:border-blue-400/40"
              : "border-[color:var(--border-color)] hover:border-blue-500/50 hover:shadow-md"}`}
        >
          <span className="flex h-8 w-8 items-center justify-center">
            <ConvertIcon
              className={`h-5 w-5 transition-colors ${open || amount
                ? "text-blue-600 dark:text-blue-400"
                : "text-slate-400 group-hover:text-blue-500"}`}
            />
          </span>
        </button>
      </div>

      {/* Colapsada por defecto. Abierta y vacia es una tarjeta grande con un cero
          y un guion: ocupa media pantalla para no decir nada. */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id="calc-panel"
            key="calc-panel"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onAnimationComplete={() => {
              // block: "nearest" solo scrollea si el panel quedo cortado. Si ya
              // se ve entero no mueve nada.
              if (open) {
                panelRef.current?.scrollIntoView({ block: "nearest", behavior: "smooth" });
              }
            }}
            ref={panelRef}
            className="overflow-hidden"
          >
            {/* El espaciado va adentro: en el elemento que anima la altura daria
                un salto al arrancar y al cerrar. */}
            {/* Una sola tarjeta con dos paneles, no dos tarjetas sueltas. Con
                dos, el selector de arriba quedaba centrado en la junta entre
                ambas: flotando entre las dos sin pertenecer a ninguna. Asi hay
                un solo bloque centrado y todo comparte el mismo eje. */}
            <div className="pt-4">
              {/* La tarjeta se ensancha recien cuando hay algo que comparar. Sin
                  monto, a ancho completo, quedaba media tarjeta vacia al lado
                  del conversor. */}
              <div
                className={`mx-auto rounded-3xl border border-[color:var(--border-color)] bg-[color:var(--card-bg)] p-4 shadow-sm transition-[max-width] duration-300 ease-out sm:p-6 dark:shadow-none
                  ${showOthers ? "max-w-4xl" : "max-w-xl"}`}
              >
                <div className={`grid gap-5 ${showOthers ? "lg:grid-cols-2 lg:gap-6" : ""}`}>
              <div className="relative min-w-0">
                <div className="flex items-center justify-between gap-3">
                  <label
                    htmlFor="calc-amount"
                    className="text-[10px] font-semibold uppercase tracking-widest text-[color:var(--text-color)] opacity-50"
                  >
                    {topLabel}
                  </label>
                  <span className="text-xs font-bold text-blue-600 dark:text-blue-400">
                    {inputUnit}
                  </span>
                </div>

                <input
                  ref={inputRef}
                  id="calc-amount"
                  type="text"
                  inputMode="decimal"
                  autoComplete="off"
                  value={raw}
                  onChange={handleChange}
                  onBeforeInput={handleBeforeInput}
                  onPaste={handlePaste}
                  placeholder="0"
                  aria-label={`Monto en ${inputUnit}`}
                  className="mt-1 w-full bg-transparent text-3xl font-extrabold tracking-tighter tabular-nums text-[color:var(--text-color)] outline-none placeholder:font-bold placeholder:text-slate-300 sm:text-4xl dark:placeholder:text-slate-700"
                />

                {/* La linea divisoria y el boton de invertir: el patron de swap que ya
                    conoce cualquiera que haya usado un exchange. */}
                <div className="relative my-4 h-px bg-[color:var(--border-color)]">
                  <button
                    type="button"
                    onClick={invert}
                    title="Invertir"
                    aria-label="Invertir la cuenta"
                    className="absolute left-1/2 top-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-[color:var(--border-color)] bg-[color:var(--card-bg)] text-slate-400 transition-colors duration-200 hover:border-blue-500/50 hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    <ConvertIcon className="h-4 w-4" />
                  </button>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-[color:var(--text-color)] opacity-50">
                    {bottomLabel}
                  </span>
                  <span className="text-xs font-bold text-blue-600 dark:text-blue-400">
                    {resultUnit}
                  </span>
                </div>

                <div className="mt-1 text-3xl font-extrabold tracking-tighter text-[color:var(--text-blue-800)] sm:text-4xl">
                  <RollingNumber value={resultText} />
                </div>

                <div className="mt-3 min-h-[1.25rem] text-xs text-[color:var(--text-color)] opacity-70">
                  {!data && "Buscando cotizaciones..."}
                  {data && !best && "No hay cotizaciones disponibles para este activo."}
                  {best && (
                    <>
                      Con{" "}
                      <span className="font-semibold text-[color:var(--text-color)] opacity-100">
                        {best.prettyName}
                      </span>
                      {tied > 1 && ` y ${tied - 1} más`}, a {arsFormatter.format(best.ask)} por{" "}
                      {ticker}
                    </>
                  )}
                </div>
              </div>

              {/* Apilados en mobile los separa una linea arriba; al lado, una
                  al costado. */}
              <AnimatePresence initial={false}>
                {showOthers && (
                  <motion.div
                    key="otros"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="min-w-0 border-t border-[color:var(--border-color)] pt-4 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0"
                  >
                    <p className="px-1 pb-2 text-[10px] font-semibold uppercase tracking-widest text-[color:var(--text-color)] opacity-40">
                      Otros proveedores
                    </p>

                    <ul className="flex flex-col gap-1">
                      {others.map((provider) => {
                        const value = yieldFor(provider, amount, inverted);
                        const delta = value - bestYield;
                        return (
                          <li key={provider.slug ?? provider.prettyName}>
                            <a
                              href={provider.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-between gap-3 rounded-2xl border border-transparent px-3 py-2.5 transition-colors duration-200 hover:bg-[color:var(--hero-update-bg)]"
                            >
                              <span className="flex min-w-0 items-center gap-2.5">
                                <img
                                  src={provider.logoUrl || provider.logo || default_img}
                                  alt=""
                                  className="h-6 w-6 shrink-0 rounded-full border border-[color:var(--border-color)] bg-white object-cover"
                                  onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = default_img;
                                  }}
                                />
                                <span className="truncate text-sm font-medium text-[color:var(--text-color)]">
                                  {provider.prettyName}
                                </span>
                              </span>
                              <span className="flex shrink-0 items-baseline gap-2 tabular-nums">
                                <RollingNumber
                                  className="text-sm font-bold text-[color:var(--text-color)]"
                                  value={inverted
                                    ? arsFormatter.format(value)
                                    : formatAsset(value, selectedCurrency.name)}
                                />
                                <span className="flex w-16 justify-end text-xs font-semibold text-rose-500 dark:text-rose-400">
                                  {delta === 0 ? "—" : (
                                    <RollingNumber
                                      value={formatSigned(delta, inverted ? 2 : assetDecimals)}
                                    />
                                  )}
                                </span>
                              </span>
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Calculator;
