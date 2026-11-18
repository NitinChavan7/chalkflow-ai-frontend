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
import ReactMarkdown from "react-markdown";

export function Tutor({
  lesson,
  session,
  setSession,
  question,
  setQuestion,
  setHighlight,
  setBoard,
}) {
  const { messages, conversationId } = session;
  const [loading, setLoading] = useState(false),
    [error, setError] = useState("");
  async function send(e) {
    e.preventDefault();
    const q = question.trim();
    if (!q || loading) return;
    setLoading(true);
    setError("");
    try {
      const result = await api.ask(lesson._id, q, conversationId);
      setSession((current) =>
        current.lessonId !== lesson._id
          ? current
          : {
              ...current,
              messages: [
                ...current.messages,
                { role: "user", content: q },
                { role: "assistant", content: result.answer },
              ],
              conversationId: result.conversationId,
            },
      );
      setQuestion("");
      setHighlight(result.highlightNodeId);
      const update = result.boardUpdate;
      if (update && update.action !== "none") {
        setBoard(() => {
          const original = lesson.whiteboard;
          const added = update.nodes.map((n, i) => ({
            id: n.id,
            type: "concept",
            position: { x: (i % 3) * 260, y: 300 + Math.floor(i / 3) * 180 },
            data: { label: n.label, description: n.description },
          }));
          return update.action === "replace"
            ? { nodes: added, edges: update.edges }
            : {
                nodes: [...original.nodes, ...added],
                edges: [...original.edges, ...update.edges],
              };
        });
      }
    } catch (e) {
      setError(errorText(e));
    } finally {
      setLoading(false);
    }
  }
  if (!lesson)
    return (
      <div className="page">
        <Empty
          icon={MessageCircle}
          title="Your tutor is ready"
          text="Choose a lesson first, so your tutor knows what you’re learning."
          action="Go to my lessons"
          to="/lessons"
        />
      </div>
    );
  return (
    <div className="page tutor-page">
      <PageHead
        eyebrow="AI TUTOR"
        title={
          <>
            Let’s talk it <em>through.</em>
          </>
        }
        desc="Ask questions about your selected lesson and get an explanation."
      />
      <div className="chat">
        <div className="chat-header">
          <span className="feature-icon blue">
            <Sparkles size={19} />
          </span>
          <div>
            <strong>ChalkFlow tutor</strong>
            <p>Learning together · {lesson.title}</p>
          </div>
          <span className="chat-status">
            <span className="status-dot connected" /> LESSON CONTEXT
          </span>
        </div>
        <div className="chat-body">
          {!messages.length && (
            <div className="chat-welcome">
              <div className="welcome-icon">
                <Sparkles size={23} />
              </div>
              <h2>What would you like to understand?</h2>
              <p>
                What would you like to understand about{" "}
                <strong>{lesson.title}</strong>?
              </p>
              <div className="suggestions">
                {[
                  "Explain the main idea simply.",
                  "Can you give me an example?",
                  "What should I remember?",
                ].map((q) => (
                  <button key={q} onClick={() => setQuestion(q)}>
                    {q} <ArrowUpRight size={14} />
                  </button>
                ))}
              </div>
            </div>
          )}
          {messages.map((m, i) => (
            <div key={i} className={"message " + m.role}>
              <span>{m.role === "assistant" ? "CF" : "YOU"}</span>
              <div className="markdown">
                <ReactMarkdown>{m.content}</ReactMarkdown>
              </div>
            </div>
          ))}
          {loading && (
            <div className="message assistant">
              <span>CF</span>
              <div>
                <LoaderCircle size={17} className="spin" /> Thinking it through…
              </div>
            </div>
          )}
        </div>
        <form className="chat-form" onSubmit={send}>
          <Notice>{error}</Notice>
          <div>
            <input
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              maxLength={2000}
              placeholder="Ask a question about your lesson…"
              aria-label="Your question"
            />
            <button
              disabled={loading || !question.trim()}
              aria-label="Send question"
            >
              <Send size={18} />
            </button>
          </div>
          <p>
            Live AI response based on your lesson. AI can make mistakes; verify
            important details.
          </p>
        </form>
      </div>
    </div>
  );
}
