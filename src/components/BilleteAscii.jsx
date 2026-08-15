import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "@context/ThemeContext";

// El billete vive en /billete-ascii.html (public/) y no como componente: es una
// escena three.js con su propio loop de render y sus texturas embebidas en
// base64. En un iframe no compite con React por el frame ni arrastra 385 KB al
// bundle, y la pagina sigue sirviendo suelta para mirarla sin el sitio alrededor.
const BilleteAscii = ({ className = "h-[44vh] min-h-[280px] sm:h-[60vh] sm:min-h-[420px] max-h-[680px]" }) => {
  const { theme } = useTheme();
  const frameRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

  // El tema viaja por postMessage y no por el src: cambiar el src recargaria los
  // 385 KB del iframe y reiniciaria la animacion en cada toggle.
  useEffect(() => {
    if (!loaded) return;
    frameRef.current?.contentWindow?.postMessage(
      { type: "usdzhin:theme", theme },
      window.location.origin
    );
  }, [theme, loaded]);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8 }}
      className={`relative w-full overflow-hidden ${className}`}
    >
      {/* El mismo halo azul difuminado que hay detras del titulo del Hero: ata
          la pieza al resto de la pagina en vez de dejarla flotando sola. */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-[80px] dark:bg-blue-500/20" />

      {/* La pagina embebida es transparente: el fondo lo pone el sitio, y el
          tema se sincroniza por mensaje una vez que el iframe cargo. */}
      <iframe
        ref={frameRef}
        src={`/billete-ascii.html?theme=${theme}`}
        title="Billete de cien dolares en arte ASCII"
        loading="lazy"
        scrolling="no"
        onLoad={() => setLoaded(true)}
        className="absolute inset-0 h-full w-full border-0"
      />
    </motion.section>
  );
};

export default BilleteAscii;
