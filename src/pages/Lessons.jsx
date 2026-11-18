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
import { LessonCard } from "../components/lessons/LessonCard";

export function Lessons({ recent, select, loading, error }) {
  const navigate = useNavigate();
  return (
    <div className="page">
      <PageHead
        eyebrow="YOUR LIBRARY"
        title={
          <>
            Your lessons<span className="blue-text">.</span>
          </>
        }
        desc="A space for everything you’re learning."
        action={
          <button
            className="button primary"
            onClick={() => navigate("/create")}
          >
            <Plus size={16} /> New lesson
          </button>
        }
      />
      <p className="subtle-note">
        Lessons created in this browser appear here. Your lessons are stored by
        the backend.
      </p>
      {error && <Notice>{error}</Notice>}
      {loading ? (
        <p className="subtle-note">Loading your lessons...</p>
      ) : recent.length ? (
        <div className="lesson-grid">
          {recent.map((l) => (
            <LessonCard
              key={l._id}
              lesson={l}
              onClick={() => {
                select(l);
                navigate("/lesson");
              }}
            />
          ))}
        </div>
      ) : (
        <Empty
          icon={BookOpen}
          title="Your library is ready when you are"
          text="Create your first lesson to start building your collection."
          action="Create a lesson"
          to="/create"
        />
      )}
    </div>
  );
}
