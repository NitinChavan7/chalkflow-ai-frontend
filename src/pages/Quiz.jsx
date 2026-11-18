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

export function Quiz({ lesson }) {
  const [quiz, setQuiz] = useState(null),
    [answers, setAnswers] = useState({}),
    [index, setIndex] = useState(0),
    [result, setResult] = useState(null),
    [loading, setLoading] = useState(false),
    [error, setError] = useState("");
  useEffect(() => {
    setQuiz(null);
    setAnswers({});
    setIndex(0);
    setResult(null);
    setError("");
  }, [lesson?._id]);
  async function generate() {
    setLoading(true);
    setError("");
    try {
      setQuiz(await api.generateQuiz(lesson._id, 5));
      setAnswers({});
      setIndex(0);
      setResult(null);
    } catch (e) {
      setError(errorText(e));
    } finally {
      setLoading(false);
    }
  }
  async function submit() {
    setLoading(true);
    setError("");
    try {
      setResult(
        await api.submitQuiz(
          quiz.quizId,
          Object.entries(answers).map(([questionId, selectedOptionIndex]) => ({
            questionId,
            selectedOptionIndex,
          })),
        ),
      );
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
          icon={ListChecks}
          title="Ready to put it into practice?"
          text="Choose a lesson first, then generate a quiz based on what you’ve learned."
          action="Go to my lessons"
          to="/lessons"
        />
      </div>
    );
  const q = quiz?.questions[index];
  return (
    <div className="page narrow">
      <PageHead
        eyebrow="PRACTICE QUIZ"
        title={
          <>
            Check your <em>understanding.</em>
          </>
        }
        desc={`Check your understanding of ${lesson.title}.`}
      />
      <Notice>{error}</Notice>
      {!quiz ? (
        <div className="quiz-intro">
          <span className="feature-icon sage">
            <ListChecks size={22} />
          </span>
          <h2>Ready for a quick check-in?</h2>
          <p>
            Generate five questions based on your lesson. You’ll get
            explanations after you submit.
          </p>
          <button
            className="button primary"
            onClick={generate}
            disabled={loading}
          >
            {loading ? (
              <>
                <LoaderCircle size={17} className="spin" /> Creating questions…
              </>
            ) : (
              <>
                Generate quiz <ArrowRight size={17} />
              </>
            )}
          </button>
        </div>
      ) : result ? (
        <div className="quiz-intro results">
          <span className="section-index">QUIZ COMPLETE</span>
          <h2>
            {result.score} <span>/ {result.totalQuestions}</span>
          </h2>
          <p>
            You got {result.percentage}% correct. Every question is a chance to
            learn.
          </p>
          {result.results.map((r, i) => (
            <div className="result-row" key={r.questionId}>
              <strong>
                {r.correct ? "Correct" : "×"} {quiz.questions[i].question}
              </strong>
              <p>
                Correct answer:{" "}
                {quiz.questions[i].options[r.correctOptionIndex]}
              </p>
              <p>{r.explanation}</p>
            </div>
          ))}
          <button
            className="button primary"
            onClick={generate}
            disabled={loading}
          >
            {loading ? "Creating questions…" : "Generate another quiz"}{" "}
            <ArrowRight size={16} />
          </button>
        </div>
      ) : (
        <div className="quiz-box">
          <div className="reading-meta">
            <span>
              QUESTION {index + 1} OF {quiz.questions.length}
            </span>
            <span>{Object.keys(answers).length} ANSWERED</span>
          </div>
          <div className="progress">
            <span
              style={{
                width: `${((index + 1) / quiz.questions.length) * 100}%`,
              }}
            />
          </div>
          <h2>{q.question}</h2>
          <div className="options">
            {q.options.map((o, i) => (
              <button
                key={i}
                className={answers[q.questionId] === i ? "chosen" : ""}
                onClick={() => setAnswers({ ...answers, [q.questionId]: i })}
              >
                <span>{String.fromCharCode(65 + i)}</span>
                {o}
                {answers[q.questionId] === i && <Check size={17} />}
              </button>
            ))}
          </div>
          <div className="reading-nav">
            <button
              className="button outline"
              onClick={() => setIndex(index - 1)}
              disabled={!index}
            >
              <ArrowLeft size={16} /> Previous
            </button>
            {index < quiz.questions.length - 1 ? (
              <button
                className="button primary"
                onClick={() => setIndex(index + 1)}
              >
                Next question <ArrowRight size={16} />
              </button>
            ) : (
              <button
                className="button primary"
                onClick={submit}
                disabled={loading}
              >
                {loading ? "Submitting…" : "Submit quiz"}{" "}
                <ArrowRight size={16} />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
