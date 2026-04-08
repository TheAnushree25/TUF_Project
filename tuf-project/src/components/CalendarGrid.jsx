import React from 'react';
import { 
  startOfMonth, endOfMonth, startOfWeek, endOfWeek, 
  eachDayOfInterval, format, isSameMonth, isSameDay, 
  isWithinInterval, isAfter, isBefore, addMonths, subMonths 
} from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './CalendarGrid.css';

export function CalendarGrid({ 
  currentMonth, setCurrentMonth,
  startDate, setStartDate,
  endDate, setEndDate 
}) {
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

  return (
    <div className="calendar-grid-container">
      <div className="calendar-header">
        <h2 className="month-title">{format(currentMonth, 'MMMM yyyy')}</h2>
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
          const isToday = isSameDay(day, new Date());

          let classNames = 'day-cell';
          if (!isCurrentMonth) classNames += ' outside-month';
          if (isToday) classNames += ' today';
          if (isSelectedStart) classNames += ' range-start';
          if (isSelectedEnd) classNames += ' range-end';
          if (isInRange && !isSelectedStart && !isSelectedEnd) classNames += ' in-range';
          if ((isSelectedStart && !endDate) || (isSelectedStart && isSelectedEnd)) classNames += ' selected-single';

          return (
            <div 
              key={day.toString()} 
              className={classNames}
              onClick={() => onDateClick(day)}
            >
              <div className="day-number">{format(day, 'd')}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
