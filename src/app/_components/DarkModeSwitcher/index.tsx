import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

export function DarkmodeSwitch() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const theme = localStorage.getItem('theme');
    if (theme !== 'light') {
      window.document.documentElement.classList.add('dark');
      setIsDarkMode(true);
    } else {
      window.document.documentElement.classList.remove('dark');
      setIsDarkMode(false);
    }
  }, []);

  const handleClick = () => {
    if (isDarkMode) {
      window.document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      localStorage.setItem('theme', 'dark');
      window.document.documentElement.classList.add('dark');
    }
    setIsDarkMode(!isDarkMode);
  };

  return (
    <button
      className="text-avid-text-muted hover:text-avid-purple p-1 mx-2 flex items-center justify-center rounded-md transition-colors"
      onClick={handleClick}
      aria-label={`Toggle ${isDarkMode ? 'light' : 'dark'} mode`}
    >
      {isDarkMode ? <Sun /> : <Moon />}
    </button>
  );
}
