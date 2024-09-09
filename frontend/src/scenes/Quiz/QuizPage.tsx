import React, { useState } from "react";
import "./QuizPage.css"; // Import the CSS for styling
import "../../styles/global.css"; // Import the global CSS for styling
import { Quiz, Mushroom } from "../../types/quiz";
import { generateQuiz } from "./QuizFactory";
import mushroms from "./DemoData";
import Button from "../../components/Button/Button";
import { MultipleNamesQuestion, MultiplePicturesQuestion } from "./Question";

const QuizPage = () => {
  const NUMBER_OF_OPTIONS = 8;

  const [mushormeNotChosenJet, setMushormeNotChosenJet] = useState(mushroms);
  const [currentQuiz, setCurrentQuiz] = useState(
    generateQuiz(mushroms, NUMBER_OF_OPTIONS)
  );

  const [message, setMessage] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);

  const [questionCounter, setQuestionCounter] = useState(0);

  const [isCorrectFirstTry, setIsCorrectFirstTry] = useState(true);
  const [quizScore, setQuizScore] = useState(0);

  const correctMushrome = currentQuiz.correctAnswer; // Hardcoded for now to always check first mushroom

  const handleImageClick = (selectedMushroom: Mushroom) => {
    if (selectedMushroom === correctMushrome) {
      handleCorrectMushromClicker(selectedMushroom);
    } else {
      setIsCorrectFirstTry(false);
      if (selectedMushroom.isPoisonous && !correctMushrome.isPoisonous) {
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
    let copyOfMushroms = mushormeNotChosenJet;
    let newNotChoosenJet: Mushroom[] = [];
    console.log(mushormeNotChosenJet);
    copyOfMushroms.forEach(
      (mushrom) => mushrom !== correctMushrome && newNotChoosenJet.push(mushrom)
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

  return (
    <div className="quiz-page-container">
      {questionCounter % 2 === 0 ? (
        <MultiplePicturesQuestion
          currentQuiz={currentQuiz}
          handleImageClick={handleImageClick}
        />
      ) : (
        <MultipleNamesQuestion
          currentQuiz={currentQuiz}
          handleImageClick={handleImageClick}
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
            setMessage("Gratulerer! Du klarte alle!");
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
    </div>
  );
};

export default QuizPage;
