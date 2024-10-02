import { Routes, Route } from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import QuizPage from "./components/pages/QuizPage";

export const PublicPaths = {
  base: "/",
  quiz: "/quiz",
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* When the times come, separate private and public routes */}
      <Route path={PublicPaths.base} element={<HomePage />} />
      <Route path={PublicPaths.quiz} element={<QuizPage />} />
    </Routes>
  );
};

export default AppRoutes;
