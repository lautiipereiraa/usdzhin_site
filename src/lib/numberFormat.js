// Formato y parseo de montos en es-AR: punto de miles, coma decimal.

// Decimales por activo. Dos para los estables, que es lo que la gente espera de
// un monto en dolares; BTC y ETH necesitan mas o todo monto razonable en pesos
// se muestra como 0,00.
const DECIMALS_BY_ASSET = { usd: 2, usdt: 2, usdc: 2, btc: 6, eth: 5 };

export const decimalsFor = (assetName) => DECIMALS_BY_ASSET[assetName] ?? 2;

export const arsFormatter = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const assetFormatters = new Map();

export const formatAsset = (value, assetName) => {
  const decimals = decimalsFor(assetName);
  if (!assetFormatters.has(decimals)) {
    assetFormatters.set(decimals, new Intl.NumberFormat("es-AR", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }));
  }
  return assetFormatters.get(decimals).format(value);
};

// Diferencia contra el mejor, siempre con signo explicito. El signo ya dice
// todo: en modo normal recibis menos dolares (negativo) y en modo invertido
// necesitas mas pesos (positivo). En los dos casos es peor.
const signedFormatters = new Map();

export const formatSigned = (value, decimals) => {
  if (!signedFormatters.has(decimals)) {
    signedFormatters.set(decimals, new Intl.NumberFormat("es-AR", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
      signDisplay: "always",
    }));
  }
  return signedFormatters.get(decimals).format(value);
};

// --- el campo de texto -------------------------------------------------------
//
// Mientras se tipea, el unico separador decimal es la coma y todos los puntos
// del valor los puso el agrupador. Eso lo garantiza el componente, que
// intercepta el punto del teclado y lo convierte en coma antes de que llegue
// al input. Asi no hay que adivinar despues cual punto es de quien.

export const formatAmountText = (text, maxDecimals) => {
  const [intPart, ...restParts] = String(text).split(",");
  const hasComma = restParts.length > 0;

  // Agrupado a mano y no con Number().toLocaleString(): arriba de 2^53 el
  // numero pierde precision y el texto que escribio el usuario cambia solo.
  const grouped = intPart
    .replace(/\D/g, "")
    .replace(/^0+(?=\d)/, "")
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  if (!hasComma) return grouped;

  const decimals = restParts.join("").replace(/\D/g, "").slice(0, maxDecimals);
  return `${grouped || "0"},${decimals}`;
};

export const parseAmountText = (text) => {
  const [intPart, decPart = ""] = String(text).split(",");
  const intDigits = intPart.replace(/\D/g, "");
  const decDigits = decPart.replace(/\D/g, "");
  if (!intDigits && !decDigits) return null;

  const parsed = Number(`${intDigits || "0"}.${decDigits || "0"}`);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
};

// Para texto pegado, donde no sabemos quien escribio cada separador. El usuario
// argentino escribe "1.000,50", pero tambien puede pegar "1000.5". Se resuelve
// asi: si hay coma, la coma es el decimal y los puntos son de miles. Si solo hay
// puntos, son de miles unicamente cuando el ultimo grupo tiene 3 digitos exactos
// ("1.000"); en cualquier otro caso el punto es decimal ("1.5").
export const parsePastedAmount = (raw) => {
  const clean = String(raw).trim().replace(/[^\d.,]/g, "");
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

export const toAmountText = (value, maxDecimals) =>
  formatAmountText(
    value.toFixed(maxDecimals).replace(".", ",").replace(/,?0+$/, ""),
    maxDecimals
  );

// El cursor se cuenta en digitos, no en posiciones: al reformatear se corren
// los puntos y una posicion cruda dejaria el cursor en cualquier lado.
export const digitsBefore = (text, caret) =>
  (text.slice(0, caret).match(/[\d,]/g) || []).length;

export const caretAfterDigits = (text, count) => {
  if (count <= 0) return 0;
  let seen = 0;
  for (let i = 0; i < text.length; i++) {
    if (/[\d,]/.test(text[i])) {
      seen++;
      if (seen === count) return i + 1;
    }
  }
  return text.length;
};
