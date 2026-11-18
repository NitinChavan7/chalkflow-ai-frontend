import React from "react";
import { Menu } from "lucide-react";
import { useLocation } from "react-router-dom";
const titles = {
  "/": "Overview",
  "/lessons": "My lessons",
  "/create": "Create lesson",
  "/lesson": "Lesson",
  "/whiteboard": "Whiteboard",
  "/tutor": "AI tutor",
  "/quiz": "Quiz center",
};
export function Header({ onOpen }) {
  const { pathname } = useLocation();
  return (
    <header className="topbar">
      <button
        className="menu-button icon-button"
        onClick={onOpen}
        aria-label="Open menu"
      >
        <Menu size={21} />
      </button>
      <div className="breadcrumb">
        <span>Workspace</span>
        <span className="slash">/</span>
        <strong>{titles[pathname] || "Overview"}</strong>
      </div>
      <div className="top-right">
        <span className="header-description">
          Your personal learning workspace
        </span>
      </div>
    </header>
  );
}
