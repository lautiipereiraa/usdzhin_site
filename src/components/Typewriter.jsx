import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

const TYPE_MS = 55;
const DELETE_MS = 30;
const HOLD_MS = 2000;
const GAP_MS = 400;

// El h1 entra con un blur-in de 1.2s. Sin esta espera el tipeo arranca en el
// montaje y la primera frase entera pasa detras del desenfoque, o sea que no se
// ve: es la unica que el visitante mira con atencion.
const START_MS = 700;

// Solo la geometria del cursor. La capa fantasma monta esta misma caja sin
// fondo ni parpadeo para que el ancho del cursor entre en la altura reservada:
// si no, en el caracter justo donde la linea se llena, el cursor empuja un
// renglon que la capa fantasma no habia medido.
const CARET = "type-caret";

const Typewriter = ({
  prefix,
  phrases,
  label,
  prefixClassName = "",
  className = "",
}) => {
  const still = useReducedMotion();

  const [index, setIndex] = useState(0);
  const [count, setCount] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [started, setStarted] = useState(false);
  const [hidden, setHidden] = useState(() => document.hidden);
  const timerRef = useRef(0);

  useEffect(() => {
    if (still) return;
    const timer = setTimeout(() => setStarted(true), START_MS);
    return () => clearTimeout(timer);
  }, [still]);

  // Con la pestaña en segundo plano no hay nadie mirando el efecto, y los
  // timers de una pestaña oculta los agrupa el navegador igual: la animacion
  // volveria descoordinada. Mismo criterio que el refresco de precios de App.
  useEffect(() => {
    const handleVisibility = () => setHidden(document.hidden);
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  // Un solo setTimeout encadenado, no un setInterval: cada estado dura distinto
  // y el cleanup de un unico timer cubre tanto el cambio de paso como el
  // desmontaje. Al volver de la pestaña oculta el efecto se vuelve a montar y
  // retoma el paso en el que habia quedado.
  useEffect(() => {
    if (still || !started || hidden) return;

    const phrase = phrases[index];
    let delay;
    let step;

    if (!deleting && count < phrase.length) {
      delay = TYPE_MS;
      step = () => setCount((prev) => prev + 1);
    } else if (!deleting) {
      delay = HOLD_MS;
      step = () => setDeleting(true);
    } else if (count > 0) {
      delay = DELETE_MS;
      step = () => setCount((prev) => prev - 1);
    } else {
      delay = GAP_MS;
      step = () => {
        setDeleting(false);
        setIndex((prev) => (prev + 1) % phrases.length);
      };
    }

    // El chequeo de document.hidden se repite adentro del callback y no solo en
    // la guarda de arriba: entre que se dispara visibilitychange y que React
    // corre este cleanup pasa un render, y el timeout ya agendado alcanzaba a
    // colar un caracter mas. Si sale por aca no reagenda nada, y de volver a
    // mostrar la pestaña se encarga el efecto, que vuelve a correr solo.
    timerRef.current = setTimeout(() => {
      if (document.hidden) return;
      step();
    }, delay);
    return () => clearTimeout(timerRef.current);
  }, [still, started, hidden, index, count, deleting, phrases]);

  const typed = still ? phrases[0] : phrases[index].slice(0, count);

  return (
    <span className={`block ${className}`}>
      {/* La altura la fija la frase mas larga al ancho real, medida por el
          navegador con la tipografia real: las cuatro frases viven apiladas en
          la misma celda del grid que el texto vivo, con visibility hidden para
          que sigan ocupando lugar. Sin esto la pagina salta cuando una frase
          pasa de dos lineas a tres, que en 375px es siempre.

          items-start y no centrado: si el bloque se centrara en la celda, el
          "El dolar," se moveria solo cada vez que cambia la cantidad de lineas. */}
      <span aria-hidden="true" className="grid items-start">
        {phrases.map((phrase) => (
          <span
            key={phrase}
            className="pointer-events-none invisible select-none col-start-1 row-start-1"
          >
            <span className={prefixClassName}>{prefix}</span> {phrase}
            <span className={CARET} />
          </span>
        ))}

        <span className="col-start-1 row-start-1">
          <span className={prefixClassName}>{prefix}</span> {typed}
          <span className={`${CARET} ${still ? "" : `${CARET}--on`}`} />
        </span>
      </span>

      {/* El titulo real de la pagina. Lo de arriba es una frase a medio escribir
          la mayor parte del tiempo: un lector de pantalla o un buscador tienen
          que encontrar una sola oracion completa y coherente. */}
      <span className="sr-only">{label}</span>
    </span>
  );
};

export default Typewriter;
