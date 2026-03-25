import { useTheme } from '@context/ThemeContext';
import { SunIcon } from './icons/SunIcon';
import { MoonIcon } from './icons/MoonIcon';
import { motion } from 'framer-motion';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={toggleTheme}
      className="flex items-center justify-center p-2 rounded-full border border-slate-200 dark:border-slate-800 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800/80 hover:text-slate-900 dark:hover:text-slate-100 transition-colors duration-300 shadow-sm hover:shadow dark:shadow-none bg-white dark:bg-black cursor-pointer"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? <MoonIcon className="w-4 h-4 text-blue-600" /> : <SunIcon className="w-4 h-4 text-blue-400" />}
    </motion.button>
  );
};

export default ThemeToggle;
