import { useEffect, useState } from "react";
import "./QuizPage.css"; // Import the CSS for styling
import "../../../styles/global.css"; // Import the global CSS for styling
import { Mushroom, Quiz } from "@shared/types";
import { generateQuiz } from "./QuizFactory";
import Button from "../../Button/Button";
import { MultipleNamesQuestion, MultiplePicturesQuestion } from "./Question";
import { useMushrooms } from "../../../api/useMushrooms";
import LoadingAnimation from "../../../components/LoadingAnimation/LoadingAnimation";

const QuizPage = () => {
  const NUMBER_OF_OPTIONS = 8;

  const { data: mushrooms = [], isLoading, error } = useMushrooms();
  const [mushormeNotChosenJet, setMushormeNotChosenJet] = useState<Mushroom[]>(
    []
  );
  const [currentQuiz, setCurrentQuiz] = useState<Quiz>();
  const [message, setMessage] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const [questionCounter, setQuestionCounter] = useState(0);
  const [isCorrectFirstTry, setIsCorrectFirstTry] = useState(true);
  const [quizScore, setQuizScore] = useState(0);

  useEffect(() => {
    initQuizPage();
  }, [mushrooms]);

  // Called as long mushrrom is loading. Stop calling when its stable
  function initQuizPage() {
    if (mushrooms.length > 0) {
      setMushormeNotChosenJet(mushrooms);
      setCurrentQuiz(generateQuiz(mushrooms, NUMBER_OF_OPTIONS));
    }
  }

  const handleAlternativeClicked = (selectedMushroom: Mushroom) => {
    if (selectedMushroom === currentQuiz?.correctAnswer) {
      handleCorrectMushromClicker(selectedMushroom);
    } else {
      setIsCorrectFirstTry(false);
      if (
        selectedMushroom.isPoisonous &&
        !currentQuiz?.correctAnswer.isPoisonous
      ) {
        setMessage(
          "Oops! Det er ikke riktig sopp. Du valgte: " +
            selectedMushroom.name +
            " " +
            getInfoAboutMushrome(selectedMushroom)
        );
      } else {
        setMessage(
          "Oops! Det er ikke riktig sopp. Du valgte: " +
            selectedMushroom.name +
            " " +
            getInfoAboutMushrome(selectedMushroom)
        );
      }
      // Add info youe died?Was the mushorme you should select eatable and you choose one not? => you loose
      setIsCorrect(false);
    }
  };
  function handleCorrectMushromClicker(selectedMushroom: Mushroom) {
    setMessage("RIKTIG! " + getInfoAboutMushrome(selectedMushroom));
    setIsCorrect(true);
    if (isCorrectFirstTry) {
      setQuizScore(quizScore + 1);
    }
    let copyOfMushroms: Mushroom[] = mushormeNotChosenJet;
    let newNotChoosenJet: Mushroom[] = [];
    copyOfMushroms.forEach(
      (mushrom) =>
        mushrom !== currentQuiz?.correctAnswer && newNotChoosenJet.push(mushrom)
    );
    setMushormeNotChosenJet(newNotChoosenJet);
  }

  function getInfoAboutMushrome(selectedMushroom: Mushroom) {
    if (selectedMushroom.isPoisonous) {
      return selectedMushroom.description + " SOPPEN ER GIFTIG";
    }
    if (selectedMushroom.isFood) {
      return selectedMushroom.description + " Det er en matsopp";
    }
    if (selectedMushroom.isFood && selectedMushroom.needExtraHeat) {
      return (
        selectedMushroom.description +
        " Det er en matsopp, men MÅ varmebehandles ekstra godt"
      );
    }
    if (
      !selectedMushroom.isFood &&
      !selectedMushroom.needExtraHeat &&
      !selectedMushroom.isPoisonous
    ) {
      return (
        selectedMushroom.description + " er ikke giftig, men ingen matsopp"
      );
    }
  }

  if (isLoading || !currentQuiz) {
    return <LoadingAnimation />;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <main className="quiz-page-container">
      {questionCounter % 2 === 0 ? (
        <MultiplePicturesQuestion
          currentQuiz={currentQuiz}
          handleAlternativeClicked={handleAlternativeClicked}
        />
      ) : (
        <MultipleNamesQuestion
          currentQuiz={currentQuiz}
          handleAlternativeClicked={handleAlternativeClicked}
        />
      )}
      {isCorrect && message && (
        <p className="quiz-message-correct">{message}</p>
      )}

      {!isCorrect && message && <p className="quiz-message-wrong">{message}</p>}
      <p className="quiz-score">{`Score: ${quizScore}`}</p>
      <Button
        label={"Neste"}
        onClick={function (): void {
          if (mushormeNotChosenJet.length < NUMBER_OF_OPTIONS) {
            setMessage("Gratulerer! Du kom igjennom quizen!");
          } else {
            setCurrentQuiz(
              generateQuiz(mushormeNotChosenJet, NUMBER_OF_OPTIONS)
            );
            setMessage("");
            setIsCorrectFirstTry(true);
            setQuestionCounter(questionCounter + 1);
          }
        }}
        type="secondary"
      ></Button>
    </main>
  );
};

export default QuizPage;
