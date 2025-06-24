import { useState, useEffect } from 'react';

const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Load saved theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light-mode';
    const isDark = savedTheme === 'dark-mode';
    setIsDarkMode(isDark);

    const html = document.documentElement;
    html.classList.add(savedTheme);
    html.classList.remove(isDark ? 'light-mode' : 'dark-mode');
  }, []);

  // Apply theme on toggle
  useEffect(() => {
    const html = document.documentElement;
    const newClass = isDarkMode ? 'dark-mode' : 'light-mode';
    const oldClass = isDarkMode ? 'light-mode' : 'dark-mode';

    html.classList.add(newClass);
    html.classList.remove(oldClass);
    localStorage.setItem('theme', newClass);
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  return (
    <button
      onClick={toggleTheme}
      style={{
        position: 'fixed',
        top: '16px',
        right: '16px',
        padding: '10px 12px',
        borderRadius: '8px',
        fontSize: '14px',
        backgroundColor: isDarkMode ? '#333' : '#eee',
        color: isDarkMode ? '#fff' : '#111',
        border: '1px solid #ccc',
        cursor: 'pointer',
        zIndex: 9999,
        transition: 'all 0.3s ease'
      }}
    >
      {isDarkMode ? '☀️' : '🌙'}
    </button>
  );
};

export default ThemeToggle;
