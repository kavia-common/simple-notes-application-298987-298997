import React from 'react';
import PropTypes from 'prop-types';

// PUBLIC_INTERFACE
export default function NoteList({ notes, selectedId, onSelect, onCreate }) {
  /** Renders list of notes in sidebar with create button. */
  return (
    <div>
      <div className="header">
        <div className="title">Notes</div>
        <button className="btn" onClick={onCreate} aria-label="Create new note">+ New</button>
      </div>
      <div className="note-list" role="list" aria-label="Notes list">
        {notes.length === 0 && (
          <div className="card" style={{ color: 'var(--text-muted)' }}>
            No notes yet. Click “New” to create your first note.
          </div>
        )}
        {notes.map(n => (
          <button
            key={n.id}
            className={`note-item ${selectedId === n.id ? 'active' : ''}`}
            onClick={() => onSelect(n.id)}
            role="listitem"
          >
            <div style={{ textAlign: 'left' }}>
              <div className="title">{n.title || 'Untitled'}</div>
              <div className="snippet">{(n.content || '').slice(0, 80)}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

NoteList.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    content: PropTypes.string
  })).isRequired,
  selectedId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onSelect: PropTypes.func.isRequired,
  onCreate: PropTypes.func.isRequired
};
