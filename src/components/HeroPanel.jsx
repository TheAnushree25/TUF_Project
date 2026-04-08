import React, { useEffect, useRef } from 'react';
import { format, getYear, setYear } from 'date-fns';
import { Sun, Moon } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import './HeroPanel.css';

// Centralised image logic based on month
const getImageUrl = (monthIndex) => {
  const themes = [
    'winter', 'coffee', 'spring', 'rain',
    'sunny', 'beach', 'ocean', 'forest',
    'autumn', 'halloween', 'thanksgiving', 'christmas'
  ];
  const theme = themes[monthIndex] || 'nature';
  // using lock prevents the image from randomly changing on re-renders, while still providing thematic images!
  return `https://loremflickr.com/800/1200/${theme}?lock=${monthIndex + 1}`;
};

export function HeroPanel({ currentMonth, setCurrentMonth, theme, toggleTheme }) {
  const contentRef = useRef(null);

  // Preload all 12 month images in the background so there's no delay!
  useEffect(() => {
    for (let i = 0; i < 12; i++) {
      const img = new Image();
      img.src = getImageUrl(i);
    }
  }, []);

  useGSAP(() => {
    gsap.from('.hero-content > *', {
      y: 20,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power3.out'
    });
  }, { scope: contentRef, dependencies: [currentMonth] });

  const handleYearChange = (e) => {
    const newYear = parseInt(e.target.value, 10);
    setCurrentMonth(setYear(currentMonth, newYear));
  };

  const currentYear = getYear(currentMonth);
  // Generate a list from 50 years in the past to 50 years in the future
  const years = Array.from({ length: 101 }, (_, i) => currentYear - 50 + i);

  const imageUrl = getImageUrl(currentMonth.getMonth());

  return (
    <div className="hero-panel">
      {/* Background Image */}
      <img 
        src={imageUrl} 
        alt="Month visual" 
        className="hero-image"
        onError={(e) => {
          e.target.onerror = null; // Prevent infinite loop
          e.target.src = `https://picsum.photos/seed/${currentMonth.getMonth()}/800/1200`;
        }}
      />
      
      {/* Overlay to ensure text readability */}
      <div className="hero-overlay"></div>

      {/* Month Display */}
      <div className="hero-content" ref={contentRef}>
        <h1 className="hero-month">{format(currentMonth, 'MMM')}</h1>
        <div className="year-selector-container">
          <select 
            className="hero-year-select"
            value={currentYear}
            onChange={handleYearChange}
            aria-label="Select Year"
          >
            {years.map(y => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Theme Toggle Button */}
      <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
      </button>
    </div>
  );
}
