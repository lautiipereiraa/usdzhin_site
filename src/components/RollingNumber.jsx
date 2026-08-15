/* eslint-disable no-unused-vars */
// El disable es por `motion`: se usa como `motion.span` en el JSX, pero esta
// config de eslint no lo detecta. Mismo workaround que Card.jsx.
import { motion, useReducedMotion } from "framer-motion";

const DIGITS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

// Una cinta de 0 a 9 recortada a la altura de un renglon. Cambiar el valor la
// desplaza, y el digito viejo sale mientras entra el nuevo.
const Digit = ({ value, still }) => (
  <span className="inline-block h-[1em] overflow-hidden align-bottom leading-none">
    <motion.span
      className="flex flex-col"
      // Los digitos nuevos tambien giran, desde el cero. Con initial={false}
      // aparecian plantados en su valor, y como al tipear el numero crece hacia
      // la izquierda, los que se agregaban eran justo los mas grandes: la
      // animacion existia pero casi nunca se veia.
      initial={{ y: "0em" }}
      animate={{ y: `-${value}em` }}
      transition={still
        ? { duration: 0 }
        : { type: "spring", stiffness: 280, damping: 30, mass: 0.6 }}
    >
      {DIGITS.map((digit) => (
        <span key={digit} className="h-[1em] leading-none">
          {digit}
        </span>
      ))}
    </motion.span>
  </span>
);

// Los digitos se identifican desde la derecha, no desde la izquierda: asi las
// unidades siguen siendo las unidades cuando el numero cambia de largo, y al
// pasar de 500.000 a 5.000.000 los digitos existentes no se reasignan todos.
const RollingNumber = ({ value, className = "" }) => {
  const still = useReducedMotion();
  const chars = String(value).split("");

  return (
    <span className={`inline-flex tabular-nums ${className}`} aria-label={String(value)}>
      {chars.map((char, index) => {
        const key = chars.length - index;
        return /\d/.test(char) ? (
          <Digit key={key} value={Number(char)} still={still} />
        ) : (
          // Misma caja que los digitos: la coma y el punto de miles van en un
          // inline normal y quedan desfasados contra las cintas.
          <span
            key={key}
            aria-hidden="true"
            className="inline-block h-[1em] align-bottom leading-none"
          >
            {char}
          </span>
        );
      })}
    </span>
  );
};

export default RollingNumber;
