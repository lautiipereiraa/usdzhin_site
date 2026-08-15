import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ThemeToggle from "./ThemeToggle";
import ArrowTelegram from "@icons/ArrowTelegram";

const LINKS = [
  { href: "#precios", label: "Precios" },
  { href: "#proveedores", label: "Proveedores" },
  { href: "#dolares", label: "Dólares" },
  { href: "#info", label: "Info" },
];

const Topbar = () => {
  // La pildora arranca traslucida y se opaca al scrollear: sobre el hero se ve
  // el billete detras, pero sobre las tarjetas de precios necesita fondo propio
  // para que el texto no compita con lo que pasa debajo.
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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
        <a
          href="#top"
          className="flex shrink-0 items-center gap-2 rounded-full pl-1 pr-2 text-lg font-extrabold tracking-tighter text-[color:var(--text-color)]"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-800 text-base font-extrabold text-white shadow-sm dark:from-blue-400 dark:to-blue-600">
            $
          </span>
          <span>
            USD<span className="text-blue-600 dark:text-blue-400">zhin</span>
          </span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="rounded-full px-3.5 py-1.5 text-sm font-medium text-[color:var(--text-color)] opacity-70 transition-all duration-200 hover:bg-[color:var(--hero-update-bg)] hover:opacity-100"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex shrink-0 items-center gap-2">
          <ThemeToggle />
          <a
            href="https://github.com/lautiipereiraa/usdzhinbot"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-all duration-200 hover:bg-blue-700 hover:shadow-md dark:bg-blue-500 dark:hover:bg-blue-400"
          >
            <ArrowTelegram />
            <span className="hidden sm:inline">Telegram</span>
          </a>
        </div>
      </nav>
    </motion.header>
  );
};

export default Topbar;
