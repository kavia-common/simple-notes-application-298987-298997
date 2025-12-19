import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// PUBLIC_INTERFACE
export default function NoteForm({ initialNote, onCancel, onSave }) {
  /** Form to create or edit a note. Calls onSave with {title, content}. */
  const [title, setTitle] = useState(initialNote?.title || '');
  const [content, setContent] = useState(initialNote?.content || '');
  const [saving, setSaving] = useState(false);
  const isEdit = Boolean(initialNote?.id);

  useEffect(() => {
    setTitle(initialNote?.title || '');
    setContent(initialNote?.content || '');
  }, [initialNote]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await onSave({ title: title.trim(), content });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="card">
      <div className="header">
        <div className="title">{isEdit ? 'Edit note' : 'Create note'}</div>
      </div>
      <form className="form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            className="input"
            placeholder="Note title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={255}
          />
        </div>
        <div>
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            className="textarea"
            placeholder="Write your note here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div className="toolbar">
          <button type="button" className="btn secondary" onClick={onCancel} disabled={saving}>Cancel</button>
          <button type="submit" className="btn" disabled={saving}>{saving ? 'Saving…' : 'Save'}</button>
        </div>
      </form>
    </div>
  );
}

NoteForm.propTypes = {
  initialNote: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    content: PropTypes.string
  }),
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired
};
