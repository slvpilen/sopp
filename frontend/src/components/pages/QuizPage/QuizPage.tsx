import { useEffect, useState } from "react";
import "./QuizPage.css";
import "src/styles/global.css";
import { Mushroom, Question } from "@shared/types";
import { generateQuiz } from "./QuizFactory";
import Button from "src/components/shared/Button/Button";
import { MultipleNamesQuestion, MultiplePicturesQuestion } from "./Question";
import { useMushrooms } from "src/api/useMushrooms";
import LoadingAnimation from "src/components/shared/LoadingAnimation/LoadingAnimation";
import { getInfoAboutMushrome } from "./helpers";
import { PublicPage } from "src/components/shared/Page/PublicPage";

const QuizPage = () => {
  const NUMBER_OF_OPTIONS = 8;

  const { data: mushrooms = [], isLoading, error } = useMushrooms();
  const [mushormeNotChosenJet, setMushormeNotChosenJet] = useState<Mushroom[]>(
    []
  );
  const [currentQuestion, setCurrentQuestion] = useState<Question>();
  const [message, setMessage] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const [questionCounter, setQuestionCounter] = useState(0);
  const [hasGuessed, setHasGuessed] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  useEffect(() => {
    initQuizPage();
  }, [mushrooms]);

  // Called as long mushrrom is loading. Stop calling when its stable
  function initQuizPage() {
    if (mushrooms.length > 0) {
      setMushormeNotChosenJet(mushrooms);
      setCurrentQuestion(generateQuiz(mushrooms, NUMBER_OF_OPTIONS));
    }
  }

  const handleAlternativeClicked = (selectedMushroom: Mushroom) => {
    if (selectedMushroom === currentQuestion?.correctAnswer) {
      handleCorrectMushromClicker(selectedMushroom);
    } else {
      if (
        selectedMushroom.isPoisonous &&
        !currentQuestion?.correctAnswer.isPoisonous
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
    setHasGuessed(true);
  };
  function handleCorrectMushromClicker(selectedMushroom: Mushroom) {
    setMessage("RIKTIG! " + getInfoAboutMushrome(selectedMushroom));
    setIsCorrect(true);
    if (!hasGuessed) {
      setQuizScore(quizScore + 1);
    }
    let copyOfMushroms: Mushroom[] = mushormeNotChosenJet;
    let newNotChoosenJet: Mushroom[] = [];
    copyOfMushroms.forEach(
      (mushrom) =>
        mushrom !== currentQuestion?.correctAnswer &&
        newNotChoosenJet.push(mushrom)
    );
    setMushormeNotChosenJet(newNotChoosenJet);
  }
  function handleNewQuestion() {
    setCurrentQuestion(generateQuiz(mushormeNotChosenJet, NUMBER_OF_OPTIONS));
    setMessage("");
    setHasGuessed(false);
    setQuestionCounter(questionCounter + 1);
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (isLoading || !currentQuestion) {
    return <LoadingAnimation overlay={true} />;
  }

  return (
    <PublicPage>
      <main className="quiz-page-container">
        {isLoading && <LoadingAnimation overlay={true} />}
        {questionCounter % 2 === 0 ? (
          <MultiplePicturesQuestion
            questionType="multiplePictures"
            question={currentQuestion}
            handleAlternativeClicked={handleAlternativeClicked}
          />
        ) : (
          <MultipleNamesQuestion
            questionType="multipleNames"
            question={currentQuestion}
            handleAlternativeClicked={handleAlternativeClicked}
          />
        )}
        <section className="quiz-message-score-next">
          {message && (
            <p
              className={
                isCorrect ? "quiz-message-correct" : "quiz-message-wrong"
              }
            >
              {message}
            </p>
          )}
          <section className="score-and-next-button">
            <p className="quiz-score">{`Score: ${quizScore}`}</p>
            <Button
              label={"Neste"}
              onClick={() => {
                mushormeNotChosenJet.length < NUMBER_OF_OPTIONS
                  ? setMessage("Gratulerer! Du kom igjennom quizen!")
                  : handleNewQuestion();
              }}
              type="secondary"
            ></Button>
          </section>
        </section>
      </main>
    </PublicPage>
  );
};

export default QuizPage;
