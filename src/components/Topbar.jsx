import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import ThemeToggle from "./ThemeToggle";
import ArrowTelegram from "@icons/ArrowTelegram";

const LINKS = [
  { id: "precios", label: "Precios" },
  { id: "proveedores", label: "Proveedores" },
  { id: "dolares", label: "Dólares" },
  { id: "info", label: "Info" },
];

// Alto de la pildora mas aire. Tiene que coincidir con el scroll-margin-top de
// index.css, que es el que resuelve el caso de entrar directo a /#precios.
const TOP_OFFSET = 112;

const easeInOutCubic = (t) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const Topbar = () => {
  // La pildora arranca traslucida y se opaca al scrollear: sobre el hero se ve
  // el billete detras, pero sobre las tarjetas de precios necesita fondo propio
  // para que el texto no compita con lo que pasa debajo.
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState(null);
  const tweenRef = useRef(0);

  // Scroll propio en vez de dejarselo al navegador. Dos razones: el ancla nativa
  // reescribe la URL a /#precios, y con scroll-behavior el timing y la curva los
  // elige el navegador, que no es lo mismo en cada uno.
  const scrollToId = useCallback((id) => {
    const el = document.getElementById(id);
    const from = window.scrollY;
    const to = el
      ? Math.max(0, el.getBoundingClientRect().top + from - TOP_OFFSET)
      : 0;
    const distance = to - from;

    cancelAnimationFrame(tweenRef.current);
    if (Math.abs(distance) < 2) return;

    if (prefersReducedMotion()) {
      window.scrollTo(0, to);
      return;
    }

    // Un recorrido largo no puede durar lo mismo que uno corto, pero tampoco
    // escalar sin techo: nadie quiere esperar tres segundos para bajar.
    const duration = Math.min(1000, Math.max(420, Math.abs(distance) * 0.55));
    const start = performance.now();

    // Si el usuario mueve la rueda a mitad de camino, manda el usuario.
    const abort = () => cancelAnimationFrame(tweenRef.current);
    window.addEventListener("wheel", abort, { passive: true, once: true });
    window.addEventListener("touchstart", abort, { passive: true, once: true });

    const step = (now) => {
      const t = Math.min(1, (now - start) / duration);
      window.scrollTo(0, from + distance * easeInOutCubic(t));
      if (t < 1) {
        tweenRef.current = requestAnimationFrame(step);
      } else {
        window.removeEventListener("wheel", abort);
        window.removeEventListener("touchstart", abort);
      }
    };
    tweenRef.current = requestAnimationFrame(step);
  }, []);

  const handleNav = (event, id) => {
    event.preventDefault();
    scrollToId(id);
  };

  useEffect(() => {
    let queued = false;

    const read = () => {
      queued = false;
      setScrolled(window.scrollY > 24);

      // La seccion activa es la ultima que ya paso por debajo del topbar. Se
      // recorre en orden de documento, asi que alcanza con quedarse con la
      // ultima que cumple.
      const probe = window.scrollY + TOP_OFFSET + 40;
      let current = null;
      for (const link of LINKS) {
        const el = document.getElementById(link.id);
        if (el && el.getBoundingClientRect().top + window.scrollY <= probe) {
          current = link.id;
        }
      }
      setActive(current);
    };

    // El handler de scroll no lee layout en cada evento: lo agenda para el
    // proximo frame y listo.
    const onScroll = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(read);
    };

    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(tweenRef.current);
    };
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-3 z-50 px-3 sm:top-5 sm:px-6"
    >
      <nav
        className={`mx-auto flex max-w-6xl items-center justify-between gap-3 rounded-full border px-3 py-2 backdrop-blur-xl transition-colors duration-300 sm:px-4
          ${scrolled
            ? "border-[color:var(--border-color)] bg-[color:var(--card-bg)]/85 shadow-sm dark:shadow-none"
            : "border-[color:var(--border-color)]/60 bg-[color:var(--card-bg)]/50"}`}
      >
        <motion.a
          href="#top"
          onClick={(e) => handleNav(e, "top")}
          whileHover="hover"
          whileTap={{ scale: 0.97 }}
          className="flex shrink-0 items-center gap-2 rounded-full pl-1 pr-2 text-lg font-extrabold tracking-tighter text-[color:var(--text-color)]"
        >
          <motion.span
            variants={{ hover: { rotate: -8, scale: 1.08 } }}
            transition={{ type: "spring", stiffness: 400, damping: 14 }}
            className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-800 text-base font-extrabold text-white shadow-sm dark:from-blue-400 dark:to-blue-600"
          >
            $
          </motion.span>
          <span>
            USD<span className="text-blue-600 dark:text-blue-400">zhin</span>
          </span>
        </motion.a>

        <ul className="hidden items-center gap-1 md:flex">
          {LINKS.map((link) => {
            const isActive = active === link.id;
            return (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={(e) => handleNav(e, link.id)}
                  className={`relative block rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors duration-200
                    ${isActive
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-[color:var(--text-color)] opacity-60 hover:opacity-100"}`}
                >
                  {/* layoutId: la pildora no aparece y desaparece, se desliza
                      desde el link anterior hasta el nuevo. */}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-full bg-[color:var(--hero-update-bg)]"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex shrink-0 items-center gap-2">
          <ThemeToggle />
          <motion.a
            href="https://github.com/lautiipereiraa/usdzhinbot"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: "spring", stiffness: 400, damping: 22 }}
            className="flex items-center gap-1.5 rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400"
          >
            <ArrowTelegram />
            <span className="hidden sm:inline">Telegram</span>
          </motion.a>
        </div>
      </nav>
    </motion.header>
  );
};

export default Topbar;
