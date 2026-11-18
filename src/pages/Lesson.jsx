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
import ReactMarkdown from "react-markdown";

export function Lesson({ lesson, setQuestion }) {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  useEffect(() => setIndex(0), [lesson?._id]);
  if (!lesson)
    return (
      <div className="page">
        <Empty
          title="No lesson selected yet"
          text="Create a lesson or choose one from your library to begin."
          action="Go to my lessons"
          to="/lessons"
        />
      </div>
    );
  const section = lesson.sections?.[index];
  return (
    <div className="page lesson-page">
      <button className="back-link" onClick={() => navigate("/lessons")}>
        <ArrowLeft size={15} /> My lessons
      </button>
      <PageHead
        eyebrow="YOUR LESSON"
        title={lesson.title}
        desc={lesson.description}
        action={
          <button
            className="button outline"
            onClick={() => navigate("/whiteboard")}
          >
            <LayoutGrid size={16} /> Open whiteboard
          </button>
        }
      />
      <div className="lesson-layout">
        <aside className="lesson-nav">
          <span className="section-index">IN THIS LESSON</span>
          {lesson.sections?.map((s, i) => (
            <button
              key={i}
              className={i === index ? "selected" : ""}
              onClick={() => setIndex(i)}
            >
              <span>{String(i + 1).padStart(2, "0")}</span>
              {s.title}
            </button>
          ))}
          <div className="objectives">
            <span className="section-index">WHAT YOU’LL LEARN</span>
            {lesson.learningObjectives?.map((o, i) => (
              <p key={i}>
                <Check size={14} />
                {o}
              </p>
            ))}
          </div>
        </aside>
        <article className="reading">
          <div className="reading-meta">
            <span>
              SECTION {String(index + 1).padStart(2, "0")} /{" "}
              {String(lesson.sections?.length).padStart(2, "0")}
            </span>
            <span>
              <Clock3 size={14} /> {lesson.estimatedDuration} MIN LESSON
            </span>
          </div>
          <h2>{section?.title}</h2>
          <div className="markdown">
            <ReactMarkdown>{section?.explanation || ""}</ReactMarkdown>
          </div>
          {section?.example && (
            <div className="example">
              <span>LET’S LOOK AT AN EXAMPLE</span>
              <ReactMarkdown>{section.example}</ReactMarkdown>
            </div>
          )}
          <h3>Key takeaways</h3>
          <ul>
            {section?.keyPoints?.map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </ul>
          <div className="reading-nav">
            <button
              className="button outline"
              disabled={index === 0}
              onClick={() => setIndex(index - 1)}
            >
              <ArrowLeft size={16} /> Previous
            </button>
            <button
              className="button primary"
              disabled={index === lesson.sections.length - 1}
              onClick={() => setIndex(index + 1)}
            >
              Next section <ArrowRight size={16} />
            </button>
          </div>
        </article>
        <aside className="tutor-prompt">
          <span className="feature-icon peach">
            <MessageCircle size={19} />
          </span>
          <h3>Something not clicking?</h3>
          <p>Your AI tutor is here to help you make sense of it.</p>
          <button
            className="text-link"
            onClick={() => {
              setQuestion(`Explain ${section?.title} in more detail.`);
              navigate("/tutor");
            }}
          >
            Ask about this concept <ArrowRight size={15} />
          </button>
        </aside>
      </div>
    </div>
  );
}
