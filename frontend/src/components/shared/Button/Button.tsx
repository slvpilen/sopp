import React from "react";
import "./Button.css"; // Import CSS for styling

type ButtonProps = {
  label: string;
  onClick: () => void;
  type?: "primary" | "secondary" | "answer" | "answer-clicked";
  disabled?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  type = "primary",
  disabled = false,
}) => {
  return (
    <button className={`btn ${type}`} onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
};

export default Button;
