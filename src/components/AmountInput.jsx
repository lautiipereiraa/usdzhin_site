import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAmount } from "@store/pricesSlice";

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

  // El texto crudo vive local para que se pueda borrar el campo y escribir a
  // medias sin que el store quede con un monto invalido en el medio.
  const [raw, setRaw] = useState("1");

  const ticker = selectedCurrency.label.match(/\(([^)]+)\)/)?.[1] ?? "";
  const invalid = raw.trim() !== "" && parseAmount(raw) === null;
  const presets = presets_by_currency[selectedCurrency.name] ?? default_presets;

  const handleChange = (value) => {
    setRaw(value);
    const parsed = parseAmount(value);
    dispatch(setAmount(parsed ?? 1));
  };

  const applyPreset = (preset) => {
    setRaw(preset.toLocaleString("es-AR"));
    dispatch(setAmount(preset));
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={`flex items-center px-5 py-3 bg-[color:var(--card-bg)] border rounded-xl shadow-sm transition-all duration-300 min-w-[220px]
          ${invalid
            ? 'border-rose-400 dark:border-rose-500/60'
            : 'border-[color:var(--border-color)] focus-within:border-blue-500/50 hover:border-blue-500/50 hover:shadow-md'
          }`}
      >
        <label
          htmlFor="amount"
          className="mr-3 text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 shrink-0"
        >
          Monto
        </label>
        <input
          id="amount"
          type="text"
          inputMode="decimal"
          value={raw}
          onChange={(e) => handleChange(e.target.value)}
          onFocus={(e) => e.target.select()}
          placeholder="1"
          aria-label={`Monto en ${ticker || selectedCurrency.label}`}
          aria-invalid={invalid}
          className="w-full min-w-0 bg-transparent text-right text-lg font-bold text-[color:var(--text-color)] tracking-tight outline-none placeholder:font-normal placeholder:text-slate-400"
        />
        <span className="ml-2 text-sm font-semibold text-blue-600 dark:text-blue-400 shrink-0">
          {ticker}
        </span>
      </div>

      <div className="flex items-center gap-1">
        {presets.map((preset) => (
          <button
            key={preset}
            type="button"
            onClick={() => applyPreset(preset)}
            className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition-colors duration-200 cursor-pointer
              ${amount === preset
                ? 'bg-blue-50 text-blue-700 dark:bg-[color:var(--hero-update-bg)] dark:text-blue-400'
                : 'text-slate-500 dark:text-slate-400 hover:bg-[color:var(--hero-update-bg)] hover:text-blue-600 dark:hover:text-blue-400'
              }`}
          >
            {preset.toLocaleString("es-AR")}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AmountInput;
