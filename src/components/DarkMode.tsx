import { useState, useEffect } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';

const DarkMode = () => {
  // O tema agora começa como 'dark'
  const [theme, setTheme] = useState<'light' | 'dark'>('dark'); 

  useEffect(() => {
    // Carregar o tema salvo no localStorage ou usar o tema padrão 'dark'
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark';
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.add(savedTheme);
    } else {
      // Caso não haja tema salvo, definir como 'dark' e atualizar o localStorage
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'; 
    setTheme(newTheme);
    document.documentElement.classList.remove(theme);
    document.documentElement.classList.add(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      className="absolute -top-16 left-2 p-2 rounded-3xl bg-blue-500 text-white hover:bg-blue-600 transition duration-200 flex items-center justify-center text-lg"
    >
      {theme === 'light' ? <FaMoon size={20} /> : <FaSun size={20} />}
    </button>
  );
};

export default DarkMode;
