import React from "react";
import { ArrowUpRight } from "lucide-react";

export function Feature({
  icon: Icon,
  number,
  title,
  text,
  link,
  onClick,
  color,
}) {
  return (
    <button className="feature" onClick={onClick}>
      <div className="feature-top">
        <span className={"feature-icon " + color}>
          <Icon size={20} />
        </span>
        <span>{number} /</span>
      </div>
      <h3>{title}</h3>
      <p>{text}</p>
      <div className="feature-link">
        {link}
        <ArrowUpRight size={16} />
      </div>
    </button>
  );
}
