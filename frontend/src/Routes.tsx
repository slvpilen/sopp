import { Routes, Route } from "react-router-dom";
import HomePage from "./components/scenes/HomePage";
import QuizPage from "./components/scenes/QuizPage";

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
