import React from 'react';
import PropTypes from 'prop-types';

// PUBLIC_INTERFACE
export default function NoteDetail({ note, onEdit, onDelete }) {
  /** Displays the selected note with actions to edit or delete. */
  if (!note) {
    return (
      <div className="card">
        <div style={{ color: 'var(--text-muted)' }}>Select a note from the list or create a new one.</div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="header">
        <div className="title">{note.title || 'Untitled'}</div>
        <div className="toolbar">
          <button className="btn secondary" onClick={() => onEdit(note)}>Edit</button>
          <button className="btn danger" onClick={() => onDelete(note)}>Delete</button>
        </div>
      </div>
      <div style={{ whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>
        {note.content || 'No content'}
      </div>
    </div>
  );
}

NoteDetail.propTypes = {
  note: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    content: PropTypes.string
  }),
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};
