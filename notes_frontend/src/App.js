import React, { useEffect, useMemo, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useParams, Link } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import NoteList from './components/NoteList';
import NoteDetail from './components/NoteDetail';
import NoteForm from './components/NoteForm';
import DeleteModal from './components/DeleteModal';

/**
 * This version provides the scaffolding requested:
 * - Sidebar + main editor layout skeleton
 * - Core components (Header, NotesList, NoteEditor (NoteForm))
 * - Client-side routing using React Router v6
 * - Minimal placeholder state (no API calls yet)
 * - Light theme tokens applied via App.css
 */

// PUBLIC_INTERFACE
function App() {
  /** App shell with theme control and router wrapper. */
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'));

  return (
    <div className="App">
      <BrowserRouter>
        <div className="layout">
          <aside className="sidebar">
            <Header title="Simple Notes" theme={theme} onToggleTheme={toggleTheme} />
            <SidebarContainer />
          </aside>
          <main className="main">
            <MainRoutes />
          </main>
        </div>
      </BrowserRouter>
    </div>
  );
}

/**
 * SidebarContainer provides placeholder notes list state and wiring.
 * This is intentionally static for scaffolding and will be replaced by API-backed state later.
 */
function SidebarContainer() {
  const navigate = useNavigate();
  const { noteId } = useParams();

  // Placeholder notes state (no API calls yet)
  const [notes] = useState([
    { id: '1', title: 'Welcome', content: 'This is a placeholder note.' },
    { id: '2', title: 'Second note', content: 'Edit me later.' },
  ]);

  const selectedId = useMemo(() => noteId || null, [noteId]);

  const onSelect = (id) => {
    navigate(`/notes/${id}`);
  };

  const onCreate = () => {
    navigate('/notes/new');
  };

  return (
    <NoteList
      notes={notes}
      selectedId={selectedId}
      onSelect={onSelect}
      onCreate={onCreate}
    />
  );
}

/**
 * MainRoutes defines application routes:
 * - / -> redirects to /notes
 * - /notes -> placeholder empty state
 * - /notes/new -> NoteForm for creating a note
 * - /notes/:noteId -> NoteDetail for viewing a note
 * - /notes/:noteId/edit -> NoteForm for editing
 */
function MainRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/notes" replace />} />
      <Route path="/notes" element={<NotesIndexView />} />
      <Route path="/notes/new" element={<NoteCreateView />} />
      <Route path="/notes/:noteId" element={<NoteDetailView />} />
      <Route path="/notes/:noteId/edit" element={<NoteEditView />} />
      <Route path="*" element={<NotFoundView />} />
    </Routes>
  );
}

function NotesIndexView() {
  return (
    <div className="card">
      <div className="title">No note selected</div>
      <div style={{ color: 'var(--text-muted)', marginTop: 8 }}>
        Choose a note from the list or{' '}
        <Link to="/notes/new">create a new note</Link>.
      </div>
    </div>
  );
}

function NoteCreateView() {
  const navigate = useNavigate();
  const handleCancel = () => navigate('/notes');

  // Placeholder save handler (no API calls)
  const handleSave = async () => {
    // Will be replaced with API call; for now navigate to index
    navigate('/notes');
  };

  return (
    <NoteForm initialNote={null} onCancel={handleCancel} onSave={handleSave} />
  );
}

function NoteDetailView() {
  const { noteId } = useParams();
  const navigate = useNavigate();

  // Placeholder: find in static list mirrored in SidebarContainer
  const notes = [
    { id: '1', title: 'Welcome', content: 'This is a placeholder note.' },
    { id: '2', title: 'Second note', content: 'Edit me later.' },
  ];
  const note = notes.find((n) => n.id === noteId) || null;

  const onEdit = () => {
    navigate(`/notes/${noteId}/edit`);
  };

  const onDelete = () => {
    // In scaffolding, just navigate back; real app will show DeleteModal and call API
    navigate('/notes');
  };

  return (
    <NoteDetail note={note} onEdit={onEdit} onDelete={onDelete} />
  );
}

function NoteEditView() {
  const { noteId } = useParams();
  const navigate = useNavigate();

  // Placeholder: load from static list
  const notes = [
    { id: '1', title: 'Welcome', content: 'This is a placeholder note.' },
    { id: '2', title: 'Second note', content: 'Edit me later.' },
  ];
  const note = notes.find((n) => n.id === noteId) || null;

  const handleCancel = () => navigate(`/notes/${noteId}`);
  const handleSave = async () => {
    // Will be replaced with API call; for now navigate to detail
    navigate(`/notes/${noteId}`);
  };

  return <NoteForm initialNote={note} onCancel={handleCancel} onSave={handleSave} />;
}

function NotFoundView() {
  return (
    <div className="card">
      <div className="title">Page not found</div>
      <div style={{ color: 'var(--text-muted)', marginTop: 8 }}>
        Go back to <Link to="/notes">notes</Link>.
      </div>
    </div>
  );
}

export default App;
