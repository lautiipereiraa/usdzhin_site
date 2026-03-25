import EmailIcon from "@icons/EmailIcon";
import HeartIcon from "@icons/HeartIcon";
import GitHubIcon from "@icons/GitHubIcon";
import LinkedinIcon from "@icons/LinkedinIcon";

const Footer = () => {
  return (
    <footer className="w-full border-t border-[color:var(--border-color)] bg-[color:var(--background-color)] mt-auto transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div className="flex flex-col items-center md:items-start space-y-2">
            <div className="flex items-center space-x-2">
              <span className="font-bold text-xl text-[color:var(--text-color)] tracking-tighter">USDzhin</span>
            </div>
            <p className="text-sm text-[color:var(--text-color)] opacity-70">
              Datos actualizados cada minuto
            </p>
            <p className="text-xs text-[color:var(--text-color)] opacity-50 uppercase tracking-widest font-medium">
              Fuente: DolarApi y ComparaDolar
            </p>
            <a 
              href="https://github.com/lautiipereiraa/usdzhinbot" 
              target="_blank" 
              rel="noopener noreferrer"
              className="mt-4 pt-2 text-xs font-semibold text-[color:var(--text-color)] opacity-80 hover:opacity-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-1.5"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
              USDzhin Bot para Telegram (en desarrollo)
            </a>
          </div>

          <div className="flex justify-center space-x-4">
            <a
              href="https://www.linkedin.com/in/lautaro-pereira-garobi-394810229/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <LinkedinIcon className="w-5 h-5" />
            </a>
            <a
              href="https://github.com/lautiipereiraa"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              <GitHubIcon className="w-5 h-5" />
            </a>
            <a
              href="https://mail.google.com/mail/?view=cm&to=lautaropereirag@gmail.com"
              target="_blank"
              className="p-2 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <EmailIcon className="w-5 h-5" />
            </a>
          </div>

          <div className="flex flex-col items-center md:items-end text-sm text-slate-500 dark:text-slate-400">
            <div className="flex items-center space-x-1.5">
              <span>© {new Date().getFullYear()} USDzhin.</span>
            </div>
            <div className="flex items-center mt-1 space-x-1">
              <span>Made in Argentina</span>
              <HeartIcon className="w-3.5 h-3.5 text-rose-500" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
