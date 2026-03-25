import Footer from "./Footer";
import ThemeToggle from "./ThemeToggle";

const Layout = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen bg-[color:var(--background-color)] selection:bg-[color:var(--hero-update-bg)] selection:text-[color:var(--text-blue-800)] transition-colors duration-300">
            <div className="fixed top-6 left-6 sm:top-8 sm:left-8 z-50">
                <ThemeToggle />
            </div>
            <main className="flex-1 flex flex-col pt-12 pb-12">{children}</main>
            <Footer />
        </div>
    );
};

export default Layout;
