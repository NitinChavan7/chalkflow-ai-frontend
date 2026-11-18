# ChalkFlow AI frontend

React/Vite learning studio for the sibling `chalkflow-ai-backend` project.

## Start locally

1. In `../chalkflow-ai-backend`, configure `.env` as described in its README (MongoDB, Groq, and `CLIENT_URL=http://localhost:5173`), then run `npm install` and `npm run dev`.
2. In this directory, run `npm install`, copy `.env.example` to `.env` if you need to change the API URL, and run `npm run dev`.
3. Open http://localhost:5173. Use this hostname rather than 127.0.0.1 unless that origin is also included in the backend's `CLIENT_URL`.

`npm run build` produces the production bundle. Never put Groq credentials in the frontend.

## API mapping

- `GET /api/health`: sidebar connection status (liveness only).
- `POST /api/lessons/generate`: create and save a lesson.
- `GET /api/lessons/:id`: retrieve lessons whose IDs were saved in this browser.
- `POST /api/tutor/ask`: lesson-context chat, conversation ID, and visual board updates.
- `POST /api/quiz/generate`: create questions for the selected lesson.
- `POST /api/quiz/submit`: submit answers and display server evaluation.

The API has no lesson list, authentication, profile, or conversation retrieval endpoint. Recent lesson IDs are stored in localStorage, so the library is browser-specific. Chat history is held in memory for the current page session. The tutor's board updates do not include positions or node types; the frontend assigns a layout and concept type to those updates. The backend validates each update against the original lesson board, so the UI does the same. The health endpoint does not verify database or Groq readiness.
