import React from "react";
import "./LoadingAnimation.css";

interface LoadingAnimationProps {
  overlay?: boolean;
}

const LoadingAnimation: React.FC<LoadingAnimationProps> = ({ overlay }) => {
  return (
    <div
      className={
        overlay ? "mushroom-loader-overlay" : "mushroom-loader-container"
      }
    >
      <img src="/mushroom.gif" alt="Mushroom" className="mushroom-image" />
    </div>
  );
};

export default LoadingAnimation;
