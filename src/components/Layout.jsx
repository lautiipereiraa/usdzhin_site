import Footer from "./Footer";
import Topbar from "./Topbar";

const Layout = ({ children }) => {
    return (
        <div id="top" className="flex flex-col min-h-screen bg-[color:var(--background-color)] selection:bg-[color:var(--hero-update-bg)] selection:text-[color:var(--text-blue-800)] transition-colors duration-300">
            {/* El toggle de tema dejo de flotar suelto arriba a la izquierda: ahora
                vive dentro de la pildora del topbar. */}
            <Topbar />
            <main className="flex-1 flex flex-col pt-24 pb-12 sm:pt-28">{children}</main>
            <Footer />
        </div>
    );
};

export default Layout;
