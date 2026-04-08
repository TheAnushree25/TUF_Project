import React, { useState, useEffect, useRef } from 'react';
import { format } from 'date-fns';
import { PencilLine, Calendar as CalendarIcon, Save, Trash2 } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import './NotesSection.css';

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

export function NotesSection({ currentMonth, startDate, endDate }) {
  const containerRef = useRef(null);
  // Use the uniquely selected start date as the key, or null if nothing is selected.
  const noteKey = startDate ? format(startDate, 'yyyy-MM-dd') : null;
  const [notes, setNotes] = useState('');
  const [isSaved, setIsSaved] = useState(true);

  // Load notes from local storage strictly based on the clicked date!
  useEffect(() => {
    if (!noteKey) {
      setNotes('');
      setIsSaved(true);
      return;
    }
    const savedNotes = localStorage.getItem(`calendar_notes_${noteKey}`);
    if (savedNotes) {
      setNotes(savedNotes);
    } else {
      setNotes('');
    }
    setIsSaved(true);
  }, [noteKey]);

  const handleNotesChange = (e) => {
    setNotes(e.target.value);
    setIsSaved(false);
  };

  const saveNotes = () => {
    if (!noteKey) return;
    localStorage.setItem(`calendar_notes_${noteKey}`, notes);
    setIsSaved(true);
    // Force a tiny re-render on the calendar grid so the note dot appears without needing to switch months
    window.dispatchEvent(new Event('storage'));
  };

  const clearNote = () => {
    if (!noteKey) return;
    setNotes('');
    localStorage.removeItem(`calendar_notes_${noteKey}`);
    setIsSaved(true);
    window.dispatchEvent(new Event('storage'));
  };

  useGSAP(() => {
    // Beautiful slide-in effect whenever the selected date changes, indicating a fresh page!
    if (startDate) {
      gsap.fromTo('.notes-header, .selection-indicator, .notes-textarea', 
        { x: 15, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.4, stagger: 0.1, ease: 'power2.out' }
      );
    }
  }, { scope: containerRef, dependencies: [startDate] });

  // Auto-save debounced
  useEffect(() => {
    if (isSaved) return;
    const timeoutId = setTimeout(() => {
      saveNotes();
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [notes, isSaved]);

  let selectionText = 'Select a date range';
  if (startDate && !endDate) {
    selectionText = format(startDate, 'MMM d, yyyy');
  } else if (startDate && endDate) {
    selectionText = `${format(startDate, 'MMM d')} - ${format(endDate, 'MMM d, yyyy')}`;
  }

  // Derive if the selected day is a special holiday
  const holidayName = startDate ? HOLIDAYS[format(startDate, 'MM-dd')] : null;

  return (
    <div className="notes-container" ref={containerRef}>
      <div className="notes-header">
        <h3 className="notes-title">
          <PencilLine size={18} />
          {holidayName ? `${holidayName} Notes` : (startDate ? "Daily Notes" : "Daily Agenda")}
        </h3>
        <div className="notes-actions">
          {startDate && notes.trim().length > 0 && (
            <button onClick={clearNote} className="clear-note-btn" title="Clear Note">
              <Trash2 size={14} />
            </button>
          )}
          <span className={`save-status ${isSaved ? 'saved' : 'saving'}`}>
            {isSaved ? <Save size={14} /> : 'Saving...'}
          </span>
        </div>
      </div>
      
      <div className="selection-indicator">
        <CalendarIcon size={14} className="selection-icon" />
        <span className="selection-text">
          {selectionText}
          {holidayName && <span style={{display: 'block', color: 'var(--accent-hover)', marginTop: '4px', fontWeight: 600}}>🎉 {holidayName}!</span>}
        </span>
      </div>

      <textarea
        className="notes-textarea"
        placeholder={startDate ? `Jot down things to remember for ${format(startDate, 'MMM d, yyyy')}...` : 'Please select a date on the calendar first to write notes...'}
        value={notes}
        onChange={handleNotesChange}
        disabled={!startDate}
      />
    </div>
  );
}
