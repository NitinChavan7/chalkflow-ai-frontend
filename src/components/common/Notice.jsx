import React from "react";

export function Notice({ children }) {
  return (
    children && (
      <div className="error" role="alert">
        {children}
      </div>
    )
  );
}
