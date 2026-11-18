import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  LayoutGrid,
  ListChecks,
  MessageCircle,
  Plus,
  Sparkles,
  X,
} from "lucide-react";
const nav = [
  { to: "/", label: "Overview", icon: LayoutGrid },
  { to: "/lessons", label: "My lessons", icon: BookOpen },
  { to: "/create", label: "Create lesson", icon: Plus },
  { to: "/whiteboard", label: "AI whiteboard", icon: LayoutGrid },
  { to: "/tutor", label: "AI tutor", icon: MessageCircle },
  { to: "/quiz", label: "Quiz center", icon: ListChecks },
];
export function Sidebar({ menu, onClose, status, check }) {
  const navigate = useNavigate();
  return (
    <aside className={"sidebar " + (menu ? "open" : "")}>
      <div className="brand">
        <span className="brand-mark">
          <span>c</span>
          <i />
        </span>
        <div>
          <strong>
            chalkflow<span>ai</span>
          </strong>
          <small>YOUR LEARNING STUDIO</small>
        </div>
        <button
          className="mobile-close icon-button"
          onClick={() => onClose()}
          aria-label="Close menu"
        >
          <X size={19} />
        </button>
      </div>
      <div className="side-label">WORKSPACE</div>
      <nav>
        {nav.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/"}
            onClick={() => onClose()}
            className={({ isActive }) =>
              "nav-item " + (isActive ? "active" : "")
            }
          >
            <Icon size={18} strokeWidth={1.8} />
            <span>{label}</span>
            {to === "/create" && <span className="nav-plus">+</span>}
          </NavLink>
        ))}
      </nav>
      <div className="side-bottom">
        <div className="side-note">
          <div className="side-note-icon">
            <Sparkles size={17} />
          </div>
          <strong>
            A little learning,
            <br />
            every day.
          </strong>
          <p>Big ideas start with a single question.</p>
          <button
            onClick={() => {
              navigate("/create");
              onClose();
            }}
          >
            Start learning <ArrowRight size={14} />
          </button>
        </div>
        <button
          className="connection"
          onClick={check}
          title="Check connection again"
        >
          <span className={"status-dot " + status} />
          <span>Backend {status}</span>
          <span className="connection-refresh">&#8635;</span>
        </button>
      </div>
    </aside>
  );
}
