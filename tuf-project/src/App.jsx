import React, { useState, useEffect } from 'react';
import { HeroPanel } from './components/HeroPanel';
import { CalendarGrid } from './components/CalendarGrid';
import { NotesSection } from './components/NotesSection';

function App() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  
  // Theme state
  const [theme, setTheme] = useState('light');

  // Initialize theme from system preference or local storage
  useEffect(() => {
    const savedTheme = localStorage.getItem('calendar_theme');
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('calendar_theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <div className="app-container">
      <HeroPanel 
        currentMonth={currentMonth} 
        theme={theme}
        toggleTheme={toggleTheme}
      />
      
      <CalendarGrid
        currentMonth={currentMonth}
        setCurrentMonth={setCurrentMonth}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
      />
      
      <NotesSection 
        currentMonth={currentMonth}
        startDate={startDate}
        endDate={endDate}
      />
    </div>
  );
}

export default App;
