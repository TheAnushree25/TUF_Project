import React, { useRef } from 'react';
import { 
  startOfMonth, endOfMonth, startOfWeek, endOfWeek, 
  eachDayOfInterval, format, isSameMonth, isSameDay, 
  isWithinInterval, isAfter, isBefore, addMonths, subMonths, 
  isToday as isDateToday 
} from 'date-fns';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import './CalendarGrid.css';

const HOLIDAYS = {
  '01-01': "New Year's Day",
  '01-14': "Makar Sankranti",
  '01-26': "Republic Day",
  '02-14': "Valentine's Day",
  '03-08': "Women's Day",
  '03-17': "St. Patrick's Day",
  '04-01': "April Fools'",
  '04-22': "Earth Day",
  '05-01': "Labour Day",
  '06-05': "Environment Day",
  '06-21': "Yoga Day",
  '08-15': "Independence Day",
  '10-02': "Gandhi Jayanti",
  '10-31': "Halloween",
  '11-14': "Children's Day",
  '12-25': "Christmas",
  '12-31': "New Year's Eve"
};

export function CalendarGrid({ 
  currentMonth, setCurrentMonth,
  startDate, setStartDate,
  endDate, setEndDate 
}) {
  const containerRef = useRef(null);
  
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDateOfWeek = startOfWeek(monthStart);
  const endDateOfWeek = endOfWeek(monthEnd);

  const days = eachDayOfInterval({
    start: startDateOfWeek,
    end: endDateOfWeek
  });

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const onDateClick = (day) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(day);
      setEndDate(null);
    } else if (startDate && !endDate) {
      if (isBefore(day, startDate)) {
        setEndDate(startDate);
        setStartDate(day);
      } else {
        setEndDate(day);
      }
    }
  };

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const goToToday = () => setCurrentMonth(new Date());

  useGSAP(() => {
    // Stunning stagger drop-in effect whenever the month changes
    gsap.from('.day-cell', {
      y: 15,
      opacity: 0,
      duration: 0.3,
      stagger: {
        amount: 0.25,
        from: "start"
      },
      ease: 'back.out(1.5)'
    });
  }, { scope: containerRef, dependencies: [currentMonth] });

  return (
    <div className="calendar-grid-container" ref={containerRef}>
      <div className="calendar-header">
        <div className="month-title-group">
          <h2 className="month-title">{format(currentMonth, 'MMMM yyyy')}</h2>
          <button className="today-btn" onClick={goToToday} aria-label="Go to Today">
            <CalendarIcon size={16} />
            <span>Today</span>
          </button>
        </div>
        <div className="nav-buttons">
          <button onClick={prevMonth} className="nav-btn"><ChevronLeft size={20} /></button>
          <button onClick={nextMonth} className="nav-btn"><ChevronRight size={20} /></button>
        </div>
      </div>

      <div className="week-days">
        {weekDays.map(d => <div key={d} className="week-day">{d}</div>)}
      </div>

      <div className="days-grid">
        {days.map((day, idx) => {
          const isSelectedStart = startDate && isSameDay(day, startDate);
          const isSelectedEnd = endDate && isSameDay(day, endDate);
          const isInRange = startDate && endDate && isWithinInterval(day, { start: startDate, end: endDate });
          const isCurrentMonth = isSameMonth(day, monthStart);
          const isToday = isDateToday(day);
          const holidayName = HOLIDAYS[format(day, 'MM-dd')];
          
          // Check if a note exists!
          const lsKey = `calendar_notes_${format(day, 'yyyy-MM-dd')}`;
          const hasNote = localStorage.getItem(lsKey) && localStorage.getItem(lsKey).trim().length > 0;

          let classNames = 'day-cell';
          if (!isCurrentMonth) classNames += ' outside-month';
          if (isToday) classNames += ' today';
          if (holidayName) classNames += ' is-holiday';
          if (isSelectedStart) classNames += ' range-start';
          if (isSelectedEnd) classNames += ' range-end';
          if (isInRange && !isSelectedStart && !isSelectedEnd) classNames += ' in-range';
          if ((isSelectedStart && !endDate) || (isSelectedStart && isSelectedEnd)) classNames += ' selected-single';

          return (
            <div 
              key={day.toString()} 
              className={classNames}
              onClick={() => onDateClick(day)}
              title={holidayName || undefined}
            >
              <div className="day-number">{format(day, 'd')}</div>
              {hasNote && <div className="has-note-dot"></div>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
