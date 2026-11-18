import React, { useCallback, useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { api } from "./api";
import { Dashboard } from "./pages/Dashboard";
import { Lessons } from "./pages/Lessons";
import { Create } from "./pages/Create";
import { Lesson } from "./pages/Lesson";
import { Board } from "./pages/Board";
import { Tutor } from "./pages/Tutor";
import { Quiz } from "./pages/Quiz";
import { Sidebar } from "./components/layout/Sidebar";
import { Header } from "./components/layout/Header";

export default function App() {
  const [status, setStatus] = useState("checking"),
    [lesson, setLesson] = useState(null),
    [recent, setRecent] = useState([]),
    [menu, setMenu] = useState(false),
    [question, setQuestion] = useState(""),
    [tutorSession, setTutorSession] = useState({
      lessonId: null,
      messages: [],
      conversationId: null,
    }),
    [highlight, setHighlight] = useState(null),
    [board, setBoard] = useState(null),
    [libraryLoading, setLibraryLoading] = useState(true),
    [libraryError, setLibraryError] = useState("");
  const navigate = useNavigate();
  const check = useCallback(() => {
    setStatus("checking");
    api
      .health()
      .then(() => setStatus("connected"))
      .catch(() => setStatus("disconnected"));
  }, []);
  const select = useCallback((l) => {
    setLesson(l);
    setTutorSession((session) =>
      session.lessonId === l._id
        ? session
        : { lessonId: l._id, messages: [], conversationId: null },
    );
    setQuestion("");
    setBoard(l.whiteboard);
    setHighlight(null);
    localStorage.setItem("chalkflow-selected", l._id);
  }, []);
  useEffect(() => {
    check();
    let ids;
    try {
      ids = JSON.parse(localStorage.getItem("chalkflow-lessons") || "[]");
    } catch {
      ids = [];
    }
    if (!Array.isArray(ids)) ids = [];
    Promise.allSettled(ids.map((id) => api.getLesson(id)))
      .then((results) => {
        const lessons = results
          .filter((r) => r.status === "fulfilled")
          .map((r) => r.value.lesson);
        setRecent(lessons);
        const selected = lessons.find(
          (l) => l._id === localStorage.getItem("chalkflow-selected"),
        );
        if (selected) select(selected);
        if (results.some((r) => r.status === "rejected"))
          setLibraryError(
            "Some saved lessons could not be loaded. Check your connection and refresh to try again.",
          );
      })
      .finally(() => setLibraryLoading(false));
  }, [check, select]);
  const save = useCallback(
    (l) => {
      select(l);
      setRecent((old) =>
        [l, ...old.filter((x) => x._id !== l._id)].slice(0, 12),
      );
      const ids = JSON.parse(localStorage.getItem("chalkflow-lessons") || "[]");
      localStorage.setItem(
        "chalkflow-lessons",
        JSON.stringify(
          [l._id, ...ids.filter((id) => id !== l._id)].slice(0, 12),
        ),
      );
    },
    [select],
  );
  const askNode = (node) => {
    setQuestion(`Explain ${node.data.label} in more detail.`);
    navigate("/tutor");
  };
  return (
    <div className="app-shell">
      <Sidebar
        menu={menu}
        onClose={() => setMenu(false)}
        status={status}
        check={check}
      />
      {menu && <div className="scrim" onClick={() => setMenu(false)} />}
      <main className="main">
        <Header onOpen={() => setMenu(true)} />
        <Routes>
          <Route
            path="/"
            element={
              <Dashboard
                recent={recent}
                select={select}
                loading={libraryLoading}
                error={libraryError}
              />
            }
          />
          <Route
            path="/lessons"
            element={
              <Lessons
                recent={recent}
                select={select}
                loading={libraryLoading}
                error={libraryError}
              />
            }
          />
          <Route path="/create" element={<Create save={save} />} />
          <Route
            path="/lesson"
            element={<Lesson lesson={lesson} setQuestion={setQuestion} />}
          />
          <Route
            path="/whiteboard"
            element={
              <Board
                lesson={lesson}
                board={board}
                highlight={highlight}
                askNode={askNode}
              />
            }
          />
          <Route
            path="/tutor"
            element={
              <Tutor
                lesson={lesson}
                session={tutorSession}
                setSession={setTutorSession}
                question={question}
                setQuestion={setQuestion}
                setHighlight={setHighlight}
                setBoard={setBoard}
              />
            }
          />
          <Route path="/quiz" element={<Quiz lesson={lesson} />} />
          <Route
            path="*"
            element={
              <Dashboard
                recent={recent}
                select={select}
                loading={libraryLoading}
                error={libraryError}
              />
            }
          />
        </Routes>
      </main>
    </div>
  );
}
