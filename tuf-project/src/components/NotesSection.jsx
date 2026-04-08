import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { PencilLine, Calendar as CalendarIcon, Save } from 'lucide-react';
import './NotesSection.css';

export function NotesSection({ currentMonth, startDate, endDate }) {
  const monthKey = format(currentMonth, 'yyyy-MM');
  const [notes, setNotes] = useState('');
  const [isSaved, setIsSaved] = useState(true);

  // Load notes from local storage based on the view month
  useEffect(() => {
    const savedNotes = localStorage.getItem(`calendar_notes_${monthKey}`);
    if (savedNotes) {
      setNotes(savedNotes);
    } else {
      setNotes('');
    }
    setIsSaved(true);
  }, [monthKey]);

  const handleNotesChange = (e) => {
    setNotes(e.target.value);
    setIsSaved(false);
  };

  const saveNotes = () => {
    localStorage.setItem(`calendar_notes_${monthKey}`, notes);
    setIsSaved(true);
  };

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

  return (
    <div className="notes-container">
      <div className="notes-header">
        <h3 className="notes-title">
          <PencilLine size={18} />
          Monthly Notes
        </h3>
        <span className={`save-status ${isSaved ? 'saved' : 'saving'}`}>
          {isSaved ? <Save size={14} /> : 'Saving...'}
        </span>
      </div>
      
      <div className="selection-indicator">
        <CalendarIcon size={14} className="selection-icon" />
        <span className="selection-text">{selectionText}</span>
      </div>

      <textarea
        className="notes-textarea"
        placeholder={`Jot down things to remember for ${format(currentMonth, 'MMMM')}...`}
        value={notes}
        onChange={handleNotesChange}
      />
    </div>
  );
}
