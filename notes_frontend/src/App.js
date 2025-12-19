import React, { useState, useEffect, useMemo, useCallback } from 'react';
import './App.css';
import NoteList from './components/NoteList';
import NoteDetail from './components/NoteDetail';
import NoteForm from './components/NoteForm';
import DeleteModal from './components/DeleteModal';
import { apiRequest } from './utils/api';

// PUBLIC_INTERFACE
function App() {
  /** Notes app: sidebar list + main detail/editor, with theme toggle and CRUD wired to backend. */
  const [theme, setTheme] = useState('light');

  const [notes, setNotes] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [isEditing, setIsEditing] = useState(false);
  const [editingNote, setEditingNote] = useState(null);

  const [showDelete, setShowDelete] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  // Apply theme to <html>
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => (prev === 'light' ? 'dark' : 'light'));

  // Fetch all notes
  const fetchNotes = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await apiRequest('/notes', { method: 'GET' });
      setNotes(Array.isArray(data) ? data : []);
      // maintain selected if exists
      if (data?.length && !data.find(n => n.id === selectedId)) {
        setSelectedId(data[0]?.id ?? null);
      } else if (!data?.length) {
        setSelectedId(null);
      }
    } catch (e) {
      setError(e.message || 'Failed to load notes.');
    } finally {
      setLoading(false);
    }
  }, [selectedId]);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  const selectedNote = useMemo(
    () => notes.find(n => n.id === selectedId) || null,
    [notes, selectedId]
  );

  const handleSelect = (id) => {
    setSelectedId(id);
    setIsEditing(false);
    setEditingNote(null);
  };

  const handleCreate = () => {
    setIsEditing(true);
    setEditingNote(null);
  };

  const handleEdit = (note) => {
    setIsEditing(true);
    setEditingNote(note);
  };

  const handleSave = async (payload) => {
    try {
      if (editingNote?.id) {
        // update
        const updated = await apiRequest(`/notes/${editingNote.id}`, {
          method: 'PUT',
          body: JSON.stringify(payload)
        });
        // update local
        setNotes(prev => prev.map(n => (n.id === updated.id ? updated : n)));
        setSelectedId(updated.id);
      } else {
        // create
        const created = await apiRequest('/notes', {
          method: 'POST',
          body: JSON.stringify(payload)
        });
        setNotes(prev => [created, ...prev]);
        setSelectedId(created.id);
      }
      setIsEditing(false);
      setEditingNote(null);
    } catch (e) {
      alert(e.message || 'Save failed');
    }
  };

  const requestDelete = (note) => {
    setDeleteTarget(note);
    setShowDelete(true);
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    try {
      await apiRequest(`/notes/${deleteTarget.id}`, { method: 'DELETE' });
      setNotes(prev => prev.filter(n => n.id !== deleteTarget.id));
      if (selectedId === deleteTarget.id) {
        const next = notes.find(n => n.id !== deleteTarget.id);
        setSelectedId(next?.id ?? null);
      }
    } catch (e) {
      alert(e.message || 'Delete failed');
    } finally {
      setShowDelete(false);
      setDeleteTarget(null);
    }
  };

  const cancelDelete = () => {
    setShowDelete(false);
    setDeleteTarget(null);
  };

  return (
    <div className="App">
      <div className="layout">
        <aside className="sidebar">
          <div className="header">
            <div className="title">Simple Notes</div>
            <button
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
            </button>
          </div>
          <NoteList
            notes={notes}
            selectedId={selectedId}
            onSelect={handleSelect}
            onCreate={handleCreate}
          />
        </aside>
        <main className="main">
          {loading && <div className="card">Loading notes…</div>}
          {!!error && <div className="card" style={{ borderColor: 'var(--color-error)', color: 'var(--color-error)' }}>{error}</div>}
          {!loading && !isEditing && (
            <NoteDetail
              note={selectedNote}
              onEdit={handleEdit}
              onDelete={requestDelete}
            />
          )}
          {!loading && isEditing && (
            <NoteForm
              initialNote={editingNote}
              onCancel={() => { setIsEditing(false); setEditingNote(null); }}
              onSave={handleSave}
            />
          )}
        </main>
      </div>

      <DeleteModal
        isOpen={showDelete}
        noteTitle={deleteTarget?.title}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </div>
  );
}

export default App;
