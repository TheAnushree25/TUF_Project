import React, { useState, useEffect, useRef } from 'react';
import { addMonths, subMonths } from 'date-fns';
import { HeroPanel } from './components/HeroPanel';
import { CalendarGrid } from './components/CalendarGrid';
import { NotesSection } from './components/NotesSection';
import { FloatingBackground } from './components/FloatingBackground';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

function App() {
  const appRef = useRef(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Load dates from LocalStorage so selection persists!
  const [startDate, setStartDate] = useState(() => {
    const saved = localStorage.getItem('calendar_startDate');
    return saved ? new Date(saved) : null;
  });
  const [endDate, setEndDate] = useState(() => {
    const saved = localStorage.getItem('calendar_endDate');
    return saved ? new Date(saved) : null;
  });
  
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

  // Sync date selections to localStorage
  useEffect(() => {
    if (startDate) localStorage.setItem('calendar_startDate', startDate.toISOString());
    else localStorage.removeItem('calendar_startDate');
  }, [startDate]);

  useEffect(() => {
    if (endDate) localStorage.setItem('calendar_endDate', endDate.toISOString());
    else localStorage.removeItem('calendar_endDate');
  }, [endDate]);

  // Global Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't swallow arrows if the user is typing in a textarea!
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;
      if (e.key === 'ArrowLeft') setCurrentMonth(m => subMonths(m, 1));
      if (e.key === 'ArrowRight') setCurrentMonth(m => addMonths(m, 1));
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Master Initial App Mount Animation
  useGSAP(() => {
    const tl = gsap.timeline();
    tl.from('.hero-panel', { x: -30, opacity: 0, duration: 0.8, ease: 'power3.out' })
      .from('.calendar-grid-container', { y: 30, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.5')
      .from('.notes-container', { x: 30, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.6');
  }, { scope: appRef });

  return (
    <>
      <FloatingBackground />
      <div className="app-container" ref={appRef}>
        <HeroPanel 
          currentMonth={currentMonth} 
          setCurrentMonth={setCurrentMonth}
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
    </>
  );
}

export default App;
