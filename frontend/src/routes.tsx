import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./scenes/HomePage/HomePage";
import QuizPage from "./scenes/Quiz/QuizPage";

const AppRoutes = () => {
  return (
    <Routes>
      {/* When the times come, separate private and public routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/quiz" element={<QuizPage />} />
    </Routes>
  );
};

export default AppRoutes;
