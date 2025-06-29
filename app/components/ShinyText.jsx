import React from "react";

const ShinyText = ({ text, speed = 2, disabled = false, className = "" }) => {
  const animationDuration = `${speed}s`;

  return (
    <div
      className={`shiny-text ${disabled ? "disabled" : ""} ${className}`}
      style={{ animationDuration }}
    >
      {text}
    </div>
  );
};

export default ShinyText;
