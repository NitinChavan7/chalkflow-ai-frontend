import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  CircleHelp,
  Layers3,
  ListChecks,
  Plus,
  Sparkles,
} from "lucide-react";
import { Notice } from "../components/common";
import { LessonCard } from "../components/lessons/LessonCard";

const tools = [
  {
    icon: Layers3,
    title: "Whiteboard",
    text: "Explore the concepts and connections in your lesson.",
    action: "Open whiteboard",
    path: "/whiteboard",
    tone: "blue",
  },
  {
    icon: CircleHelp,
    title: "AI tutor",
    text: "Ask a follow-up question about anything in your lesson.",
    action: "Ask a question",
    path: "/tutor",
    tone: "orange",
  },
  {
    icon: ListChecks,
    title: "Practice quiz",
    text: "Check what you understand with a lesson-based quiz.",
    action: "Start a quiz",
    path: "/quiz",
    tone: "green",
  },
];

export function Dashboard({ recent, select, loading, error }) {
  const navigate = useNavigate();
  const [topic, setTopic] = useState("");
  const [level, setLevel] = useState("beginner");
  const startLesson = (event) => {
    event.preventDefault();
    navigate("/create", { state: { topic: topic.trim(), level } });
  };

  return (
    <div className="page dashboard redesigned-dashboard">
      <div className="dashboard-heading">
        <div>
          <span className="dashboard-kicker">YOUR LEARNING WORKSPACE</span>
          <h1>Learn something new.</h1>
          <p>Build a lesson, explore the ideas, and learn at your own pace.</p>
        </div>
        <button
          className="button outline dashboard-library-button"
          onClick={() => navigate("/lessons")}
        >
          <BookOpen size={16} /> My lessons
        </button>
      </div>

      <div className="dashboard-main-grid">
        <section className="start-panel" aria-labelledby="start-title">
          <div className="start-panel-header">
            <span className="start-icon">
              <Plus size={20} />
            </span>
            <span className="start-label">START A NEW LESSON</span>
          </div>
          <h2 id="start-title">
            What do you want
            <br />
            to understand?
          </h2>
          <p>
            Choose a programming topic and your experience level. We will create
            a lesson with explanations, examples, and a visual map.
          </p>
          <form onSubmit={startLesson} className="dashboard-form">
            <div className="dashboard-field topic-field">
              <label htmlFor="quick-topic">Topic</label>
              <input
                id="quick-topic"
                value={topic}
                onChange={(event) => setTopic(event.target.value)}
                placeholder="e.g. JavaScript closures"
                maxLength={200}
                required
              />
            </div>
            <div className="dashboard-field level-field">
              <label htmlFor="quick-level">Your level</label>
              <select
                id="quick-level"
                value={level}
                onChange={(event) => setLevel(event.target.value)}
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
            <button className="button primary dashboard-submit">
              Continue <ArrowRight size={17} />
            </button>
          </form>
          <div className="example-topics">
            <span>Try a topic:</span>
            {["JavaScript event loop", "React hooks", "Python decorators"].map(
              (item) => (
                <button key={item} type="button" onClick={() => setTopic(item)}>
                  {item}
                </button>
              ),
            )}
          </div>
        </section>

        <aside className="how-panel" aria-label="How ChalkFlow works">
          <div className="how-top">
            <span>YOUR LEARNING PATH</span>
            <Sparkles size={16} />
          </div>
          <h2>
            From question
            <br />
            to understanding.
          </h2>
          <p>One topic, a few ways to make it click.</p>
          <div className="how-steps">
            <div>
              <span>01</span>
              <p>
                <strong>Read the lesson</strong>
                <small>Get a clear explanation and examples.</small>
              </p>
            </div>
            <div>
              <span>02</span>
              <p>
                <strong>Explore the whiteboard</strong>
                <small>See how the ideas connect.</small>
              </p>
            </div>
            <div>
              <span>03</span>
              <p>
                <strong>Ask and practice</strong>
                <small>Use your tutor and test your knowledge.</small>
              </p>
            </div>
          </div>
          <div className="how-bottom">LEARN VISUALLY. UNDERSTAND DEEPLY.</div>
        </aside>
      </div>

      <section className="dashboard-section" aria-labelledby="recent-title">
        <div className="dashboard-section-heading">
          <div>
            <span className="dashboard-kicker">PICK UP WHERE YOU LEFT OFF</span>
            <h2 id="recent-title">Recent lessons</h2>
          </div>
          <button className="text-link" onClick={() => navigate("/lessons")}>
            View all <ArrowRight size={15} />
          </button>
        </div>
        {error && <Notice>{error}</Notice>}
        {loading ? (
          <p className="dashboard-loading">Loading your lessons...</p>
        ) : recent.length ? (
          <div className="lesson-grid">
            {recent.slice(0, 3).map((lesson) => (
              <LessonCard
                key={lesson._id}
                lesson={lesson}
                onClick={() => {
                  select(lesson);
                  navigate("/lesson");
                }}
              />
            ))}
          </div>
        ) : (
          <div className="dashboard-empty">
            <span className="dashboard-empty-icon">
              <BookOpen size={21} />
            </span>
            <div>
              <strong>No lessons yet</strong>
              <p>When you create a lesson, it will appear here.</p>
            </div>
            <button className="text-link" onClick={() => navigate("/create")}>
              Create a lesson <ArrowRight size={15} />
            </button>
          </div>
        )}
      </section>

      <section
        className="dashboard-section tools-section"
        aria-labelledby="tools-title"
      >
        <div className="dashboard-section-heading">
          <div>
            <span className="dashboard-kicker">KEEP LEARNING</span>
            <h2 id="tools-title">Your learning tools</h2>
          </div>
          <p>Choose a lesson first to use these tools.</p>
        </div>
        <div className="dashboard-tools">
          {tools.map(({ icon: Icon, title, text, action, path, tone }) => (
            <button
              className="dashboard-tool"
              key={title}
              onClick={() => navigate(path)}
            >
              <span className={`tool-icon ${tone}`}>
                <Icon size={20} />
              </span>
              <span className="tool-copy">
                <strong>{title}</strong>
                <small>{text}</small>
                <span>
                  {action} <ArrowRight size={14} />
                </span>
              </span>
            </button>
          ))}
        </div>
      </section>
      <footer>
        CHALKFLOW AI <span>YOUR LEARNING WORKSPACE</span>
      </footer>
    </div>
  );
}
