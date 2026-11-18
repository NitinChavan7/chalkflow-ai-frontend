import React from "react";
import { ArrowRight, ArrowUpRight, Clock3 } from "lucide-react";

export function LessonCard({ lesson, onClick }) {
  return (
    <button className="lesson-card" onClick={onClick}>
      <div className="card-top">
        <span className="pill">{lesson.level}</span>
        <ArrowUpRight size={17} />
      </div>
      <h3>{lesson.title}</h3>
      <p>{lesson.description}</p>
      <div className="card-meta">
        <Clock3 size={14} /> {lesson.estimatedDuration} min{" "}
        <span>
          VIEW LESSON <ArrowRight size={14} />
        </span>
      </div>
    </button>
  );
}
