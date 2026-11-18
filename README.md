# ChalkFlow AI

ChalkFlow AI is a visual learning workspace for people learning programming who understand individual terms but struggle to see how they fit together. A learner enters a topic, reads a structured lesson, explores an interactive concept map, asks a question about a node, and practices with a quiz. The focus is on connecting explanations to a visual structure rather than presenting a standalone chat window.

## Reviewer walkthrough

1. Enter a programming topic such as `JavaScript closures`, select a level, and generate a lesson.
2. Read a section and open the whiteboard. Select a node to see its explanation and choose **Ask tutor about this**.
3. Ask a follow-up question, then return to the board. The current conversation remains available while navigating within the app.
4. Open Quiz center, generate a quiz, answer questions, and submit it to see server-graded results and explanations.

There is no required login. Lessons are retrieved using IDs remembered by the browser; there is no backend lesson-list endpoint. A different browser will not automatically see them.

## Live AI and data

Lesson content, diagrams, tutor responses and quiz questions are generated live through the Express backend using Groq. Quiz scoring is performed by the backend against its saved answer key. Suggested topic and question buttons are examples of input, not simulated AI output. Tutor-generated board changes are real model output, but because the backend response does not include positions or node types, the frontend assigns those visually. Backend tests mock AI and database services; production UI requests do not.

The topic, questions, relevant lesson content and recent conversation context are sent to the AI provider. The backend stores lessons, conversations and quizzes in MongoDB. Do not enter sensitive information. AI can be incorrect; verify important claims independently. Provider availability, latency, model output and usage limits affect the experience.

## Architecture and decisions

- React, Vite and JavaScript provide a responsive interface. React Flow renders the generated graph; React Markdown renders explanations.
- Express separates routes, controllers, services and repositories. MongoDB stores generated records. Groq is accessed only by the server.
- The backend validates structured AI output and diagram references, retries invalid output once, and returns a clear error if generation fails.
- This is a focused prototype: there is no authentication, user profile, server-side lesson library, conversation retrieval, streaming or collaborative editing. A browser can reopen locally remembered lesson IDs, but chat is only retained while the app remains open.
- Board updates are validated against the original lesson diagram and are not persisted. The health endpoint checks service liveness, not MongoDB or Groq readiness.

## Local setup

Requires Node.js 20+, npm, MongoDB and a Groq API key. The frontend and backend are currently separate sibling directories; a reviewer needs access to both source directories.

1. In `chalkflow-ai-backend`, copy `.env.example` to `.env`, fill in `MONGODB_URI`, `GROQ_API_KEY`, `GROQ_MODEL` and `CLIENT_URL=http://localhost:5173`, then run `npm install` and `npm run dev`.
2. In this frontend directory, run `npm install`. Copy `.env.example` to `.env` if changing `VITE_API_BASE_URL` (default `http://localhost:3000`). Run `npm run dev` and open http://localhost:5173.
3. Run `npm run build` here and `npm test` in the backend for the existing checks.

Use placeholder values in shared configuration. Never commit real environment files or API keys. The exact browser origin must be in backend `CLIENT_URL`.

## API mapping

| Endpoint | Purpose |
| --- | --- |
| `GET /api/health` | Service liveness indicator |
| `POST /api/lessons/generate` | Generate and store a lesson and diagram |
| `GET /api/lessons/:id` | Retrieve a lesson by ID |
| `POST /api/tutor/ask` | Contextual tutor and optional board changes |
| `POST /api/quiz/generate` | Generate and store questions |
| `POST /api/quiz/submit` | Grade answers and return explanations |

## Submission and known limitations

No public demo URL or submission repository is asserted here. Before submitting, publish both frontend and backend source in accessible repository or repositories, deploy a working demo, and verify the URLs from a private browser session. A public backend currently has no authentication or authorization: anyone with an ID can access the associated record. Rate limiting is per process and does not provide a distributed quota; persistent records have no retention policy. Add access controls, shared rate limiting, cost limits and retention/deletion before exposing real user data or an unrestricted public service. Do not put credentials in the demo.

The next improvements would be a server-backed user library and conversation retrieval, persistent board changes, stronger accessibility testing, cost/abuse controls, and review of generated factual accuracy. The current production build warns that its JavaScript bundle is large. See the backend README and `docs/API.md` for server-specific setup and API details.
