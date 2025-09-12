import EmailIcon from "@icons/EmailIcon";
import HeartIcon from "@icons/HeartIcon";
import GitHubIcon from "@icons/GitHubIcon";
import LinkedinIcon from "@icons/LinkedinIcon";

const Footer = () => {
  return (
    <>
      <footer className="bg-gradient-to-r from-blue-50 to-indigo-50 border-t border-blue-100 mt-12">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">

            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start space-x-2 mb-2">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">$</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800">USDzhin</h3>
              </div>
            </div>

            <div className="flex flex-col items-center space-y-4">
              <div className="flex space-x-4">
                <a
                  href="https://www.linkedin.com/in/lautaro-pereira-garobi-394810229/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 group"
                >
                  <LinkedinIcon />
                </a>

                <a
                  href="https://github.com/lautiipereiraa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 group"
                >
                  <GitHubIcon />
                </a>

                <a
                  href="https://mail.google.com/mail/?view=cm&to=lautaropereirag@gmail.com"
                  target="_blank"
                  className="flex items-center justify-center w-10 h-10 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 group"
                >
                  <EmailIcon />
                </a>
              </div>
            </div>

            <div className="text-center md:text-right">
              <div className="text-sm text-gray-600 space-y-1">
                <p>Datos actualizados cada minuto</p>
                <p className="text-xs">Fuente: DolarApi y ComparaDolar</p>
              </div>
            </div>
          </div>

          <div className="border-t border-blue-200 mt-6 pt-6">
            <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">

              <div className="flex items-center space-x-1 mb-2 md:mb-0">
                <span>© 2024 USDzhin. Made in Argentina, Buenos Aires. </span>
                <HeartIcon />
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
