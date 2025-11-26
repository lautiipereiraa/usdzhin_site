import Footer from "./Footer";
import ThemeToggle from "./ThemeToggle";

const Layout = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen">
            <div className="fixed top-4 left-4 z-50">
                <ThemeToggle />
            </div>
            <main className="flex-1">{children}</main>
            <Footer />
        </div>
    );
};

export default Layout;
