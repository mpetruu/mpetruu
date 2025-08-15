import React, { useState, useEffect } from 'react';

const DarkModeToggle: React.FC = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const darkMode = localStorage.getItem('darkMode') === 'true';
    setIsDark(darkMode);
    if (darkMode) {
      document.body.classList.add('dark-mode');
    }
  }, []);

  const createBubbles = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    
    // Create multiple bubbles
    for (let i = 0; i < 8; i++) {
      const bubble = document.createElement('div');
      bubble.className = 'water-bubble';
      
      // Random size between 10px and 20px
      const size = Math.random() * 10 + 10;
      bubble.style.width = `${size}px`;
      bubble.style.height = `${size}px`;
      
      // Random position around the button
      const angle = (Math.PI * 2 * i) / 8;
      const distance = 50 + Math.random() * 30;
      const tx = Math.cos(angle) * distance;
      const ty = Math.sin(angle) * distance;
      
      bubble.style.setProperty('--tx', `${tx}px`);
      bubble.style.setProperty('--ty', `${ty}px`);
      
      // Position bubble at button center
      bubble.style.left = `${rect.left + rect.width / 2 - size / 2}px`;
      bubble.style.top = `${rect.top + rect.height / 2 - size / 2}px`;
      
      document.body.appendChild(bubble);
      
      // Remove bubble after animation
      bubble.addEventListener('animationend', () => {
        document.body.removeChild(bubble);
      });
    }
  };

  const toggleDarkMode = (e: React.MouseEvent<HTMLButtonElement>) => {
    const newDarkMode = !isDark;
    setIsDark(newDarkMode);
    localStorage.setItem('darkMode', String(newDarkMode));
    document.body.classList.toggle('dark-mode');
    createBubbles(e);
  };

  return (
    <button
      className={`dark-mode-toggle ${isDark ? 'dark' : ''}`}
      onClick={toggleDarkMode}
      aria-label="Toggle dark mode"
    />
  );
};

export default DarkModeToggle; 