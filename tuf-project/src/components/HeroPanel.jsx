import React from 'react';
import { format } from 'date-fns';
import { Sun, Moon } from 'lucide-react';
import './HeroPanel.css';

// Unsplash random nature photo, but seeded by month for consistency
const getImageUrl = (monthIndex) => {
  const seeds = [
    'winter,snow', 'coffee,cozy', 'spring,flower', 'rain,nature',
    'summer,beach', 'sunny,field', 'ocean,sunset', 'forest,sun',
    'autumn,leaves', 'halloween,fall', 'thanksgiving,food', 'christmas,cozy'
  ];
  const query = seeds[monthIndex] || 'nature';
  return `https://source.unsplash.com/800x1200/?${query}`;
};

export function HeroPanel({ currentMonth, theme, toggleTheme }) {
  const imageUrl = getImageUrl(currentMonth.getMonth());

  return (
    <div className="hero-panel">
      {/* Background Image */}
      <img 
        src={imageUrl} 
        alt="Month visual" 
        className="hero-image"
        onError={(e) => {
          e.target.src = 'https://images.unsplash.com/photo-1506744626753-1fa44df31c78?auto=format&fit=crop&w=800&q=80';
        }}
      />
      
      {/* Overlay to ensure text readability */}
      <div className="hero-overlay"></div>

      {/* Month Display */}
      <div className="hero-content">
        <h1 className="hero-month">{format(currentMonth, 'MMM')}</h1>
        <p className="hero-year">{format(currentMonth, 'yyyy')}</p>
      </div>

      {/* Theme Toggle Button */}
      <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
      </button>
    </div>
  );
}
