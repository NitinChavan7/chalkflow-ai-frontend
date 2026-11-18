import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Check,
  Clock3,
  LayoutGrid,
  Lightbulb,
  ListChecks,
  LoaderCircle,
  Maximize2,
  MessageCircle,
  MousePointer2,
  Plus,
  Send,
  Sparkles,
  X,
  Zap,
} from "lucide-react";
import { PageHead, Empty, Notice } from "../components/common";
import { api } from "../api";
import { errorText } from "../utils/errors";

export function Create({ save }) {
  const navigate = useNavigate();
  const [topic, setTopic] = useState(history.state?.usr?.topic || ""),
    [level, setLevel] = useState(history.state?.usr?.level || "beginner"),
    [loading, setLoading] = useState(false),
    [error, setError] = useState("");
  async function submit(e) {
    e.preventDefault();
    if (!topic.trim()) return;
    setLoading(true);
    setError("");
    try {
      const data = await api.generateLesson(topic.trim(), level);
      save(data.lesson);
      navigate("/lesson");
    } catch (e) {
      setError(errorText(e));
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="page narrow">
      <PageHead
        eyebrow="CREATE A LESSON"
        title={
          <>
            Let’s learn something <em>new.</em>
          </>
        }
        desc="Tell us what’s on your mind. We’ll turn it into a lesson you can explore."
      />
      <div className="form-panel">
        <div className="panel-heading">
          <span className="feature-icon blue">
            <Sparkles size={20} />
          </span>
          <div>
            <h2>Create a lesson</h2>
            <p>Your lesson includes explanations, examples, and a whiteboard.</p>
          </div>
        </div>
        <form onSubmit={submit}>
          <label htmlFor="topic">What would you like to learn?</label>
          <input
            id="topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g. JavaScript event loop"
            maxLength={200}
            required
          />
          <small>Choose a programming concept you’re curious about.</small>
          <label htmlFor="level">Choose your level</label>
          <select
            id="level"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
          >
            <option value="beginner">
              Beginner — start with the foundations
            </option>
            <option value="intermediate">
              Intermediate — build on what I know
            </option>
            <option value="advanced">Advanced — go deeper</option>
          </select>
          <Notice>{error}</Notice>
          <button className="button primary wide" disabled={loading}>
            {loading ? (
              <>
                <LoaderCircle className="spin" size={17} /> Creating your
                lesson…
              </>
            ) : (
              <>
                Generate my lesson <ArrowRight size={17} />
              </>
            )}
          </button>
          {loading && (
            <p className="loading-note">
              Building your lesson and visual map. This can take a little while.
            </p>
          )}
        </form>
      </div>
      <div className="under-note">
        <Lightbulb size={17} /> The more specific your topic, the more focused
        your lesson will be.
      </div>
    </div>
  );
}
