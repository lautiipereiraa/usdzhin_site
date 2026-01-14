import { useTheme } from '@context/ThemeContext';
import { SunIcon } from './icons/SunIcon';
import { MoonIcon } from './icons/MoonIcon';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center justify-center w-10 h-10 rounded-full bg-[color:var(--hero-update-bg)] text-[color:var(--text-color)]"
    >
      {theme === 'light' ? <MoonIcon className="text-[#023aaf]" /> : <SunIcon />}
    </button>
  );
};

export default ThemeToggle;
