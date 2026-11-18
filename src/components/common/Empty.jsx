import React from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles, ArrowRight } from "lucide-react";

export function Empty({
  icon: Icon = Sparkles,
  title,
  text,
  action,
  to = "/create",
}) {
  const navigate = useNavigate();
  return (
    <div className="empty-large">
      <span className="empty-icon">
        <Icon size={24} />
      </span>
      <h3>{title}</h3>
      <p>{text}</p>
      {action && (
        <button className="button primary" onClick={() => navigate(to)}>
          {action} <ArrowRight size={16} />
        </button>
      )}
    </div>
  );
}
