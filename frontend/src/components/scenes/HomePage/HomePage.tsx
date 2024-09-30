import LoadingAnimation from "../../LoadingAnimation/LoadingAnimation";
import "./HomePage.css";
import Button from "../../Button/Button";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
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
  );
};

export default HomePage;
