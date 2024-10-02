import LoadingAnimation from "../../shared/LoadingAnimation/LoadingAnimation";
import "./HomePage.css";
import Button from "../../shared/Button/Button";
import { useNavigate } from "react-router-dom";
import PublicPage from "src/components/shared/Page";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <PublicPage>
      <main className="home-page-container">
        <h1>Velkommen til sopphimmelen!</h1>
        <p>Dette er sopphimmelen. Alt av sopp er her. Nå snakker vi, eller?</p>
        <Button
          label="Til quiz"
          type="secondary"
          onClick={() => navigate("/quiz")}
        />
        <LoadingAnimation />
      </main>
    </PublicPage>
  );
};

export default HomePage;
