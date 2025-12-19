import React from 'react';
import PropTypes from 'prop-types';

// PUBLIC_INTERFACE
export default function DeleteModal({ isOpen, noteTitle, onConfirm, onCancel }) {
  /** Simple confirmation modal for delete action. */
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label="Delete confirmation">
      <div className="modal">
        <div className="title" style={{ marginBottom: 6 }}>Delete note</div>
        <div style={{ color: 'var(--text-muted)', marginBottom: 14 }}>
          Are you sure you want to delete “{noteTitle || 'Untitled'}”? This action cannot be undone.
        </div>
        <div className="toolbar">
          <button className="btn secondary" onClick={onCancel}>Cancel</button>
          <button className="btn danger" onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  );
}

DeleteModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  noteTitle: PropTypes.string,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
};
