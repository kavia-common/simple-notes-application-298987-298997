# Notes Frontend (React)

Modern, lightweight React UI for a simple notes app. It consumes the Notes Backend (FastAPI) CRUD endpoints.

## Features
- Sidebar list + main detail layout
- Client-side routing (React Router v6)
- Create, edit, delete notes (API wiring added in later step)
- Light theme with #3b82f6 primary and #06b6d4 accents
- Environment-configurable backend base URL

## Quick start
1. Install deps: `npm install`
2. Set backend base URL (optional): copy `.env.example` to `.env` and set:
   - `REACT_APP_NOTES_API_BASE_URL=http://localhost:3001`
   If not set, defaults to `http://localhost:3001`.
3. Run: `npm start` then open http://localhost:3000

### Routes
- `/` -> redirects to `/notes`
- `/notes` -> index view
- `/notes/new` -> create note
- `/notes/:noteId` -> note detail
- `/notes/:noteId/edit` -> edit note

## Backend endpoints
The app expects a REST API:
- GET `/notes` -> list of notes
- POST `/notes` -> create { title, content } -> returns created note with id
- PUT `/notes/{id}` -> update { title, content } -> returns updated note
- DELETE `/notes/{id}` -> delete note

## Notes
- Styles are in `src/App.css`
- Components:
  - `src/components/Header.js`
  - `src/components/NoteList.js`
  - `src/components/NoteDetail.js`
  - `src/components/NoteForm.js`
  - `src/components/DeleteModal.js`
- API utility: `src/utils/api.js` (not used in scaffolding; to be wired later)

## Scripts
- `npm start` - dev server
- `npm run build` - production build
- `npm test` - tests
