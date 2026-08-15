// Ranking de proveedores por precio de compra.
//
// Comprar dolares con pesos es pagar el `ask` del proveedor, asi que el mejor
// precio es el `ask` mas bajo.

// El mismo criterio que usa el podio en pricesSlice: se compara entre los
// proveedores 24/7 y solo se cae a la lista completa si no hay ninguno. Tiene
// que ser el mismo o la calculadora nombraria un ganador distinto al de las
// tarjetas que estan justo abajo, y eso se lee como un bug.
//
// En USDT y USDC no cambia nada: esos endpoints no traen `is24x7`, el filtro da
// vacio y siempre cae a la lista completa.
export const podiumPool = (data) => {
  if (!Array.isArray(data)) return [];
  const around = data.filter((provider) => provider.is24x7);
  return around.length > 0 ? around : data;
};

export const rankByAsk = (data) =>
  podiumPool(data)
    .filter((provider) => provider.ask > 0)
    .sort((a, b) => a.ask - b.ask);

// Cuantos comparten el primer puesto. Los empates existen y la UI tiene que
// poder decir "y 1 mas" en vez de elegir uno en silencio.
export const countTiedAtBest = (ranking) => {
  if (ranking.length === 0) return 0;
  const best = ranking[0].ask;
  return ranking.filter((provider) => provider.ask === best).length;
};

// Cuanto entrega un proveedor para el monto pedido.
//   directo   : cuantos dolares recibis por esos pesos
//   invertido : cuantos pesos necesitas para esos dolares
export const yieldFor = (provider, amount, inverted) =>
  inverted ? amount * provider.ask : amount / provider.ask;
