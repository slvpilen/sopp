import { useState } from "react";
import Button from "../../Button/Button";
import { Mushroom, Quiz } from "@shared/types";
import "./Question.css";

type QuestionProps = {
  currentQuiz: Quiz;
  handleAlternativeClicked: (mushrom: Mushroom) => void;
};

const MultiplePicturesQuestion: React.FC<QuestionProps> = ({
  currentQuiz,
  handleAlternativeClicked,
}) => {
  const [clickedImage, setClickedImage] = useState<string | null>(null);
  const [isCorrectClickedImage, setIsCorrectClickedImage] =
    useState<boolean>(false);

  return (
    <figure className="multiple-pictures-question">
      <h1>{currentQuiz.questionMultiplePicture}</h1>
      <section className="image-grid">
        {currentQuiz.options.map((mushroom, index) => (
          <img
            key={index}
            src={mushroom.image}
            alt={`Valg ${index}`}
            className={
              clickedImage === mushroom.name && isCorrectClickedImage
                ? "quiz-image-alternative-clicked-correct"
                : clickedImage == mushroom.name
                ? "quiz-image-alternative-clicked"
                : "quiz-image-alternative"
            }
            onClick={() => {
              handleAlternativeClicked(mushroom);
              setClickedImage(mushroom.name);
              if (mushroom == currentQuiz.correctAnswer) {
                setIsCorrectClickedImage(true);
              } else {
                setIsCorrectClickedImage(false);
              }
            }}
          />
        ))}
      </section>
    </figure>
  );
};

const MultipleNamesQuestion: React.FC<QuestionProps> = ({
  currentQuiz,
  handleAlternativeClicked,
}) => {
  const [clickedImage, setClickedImage] = useState<string | null>(null);

  return (
    <figure className="multiple-names-question">
      <img
        src={currentQuiz.correctAnswer.image}
        alt={`Valg`}
        className="quiz-image-question"
      />
      <section className="alternative-grid">
        <h1>{currentQuiz.questionMultipleNames}</h1>
        {currentQuiz.options.map((mushroom) => (
          <Button
            key={mushroom.name}
            label={mushroom.name}
            onClick={() => {
              handleAlternativeClicked(mushroom);
              setClickedImage(mushroom.name); // Track which image is clicked
            }}
            type={clickedImage === mushroom.name ? "answer-clicked" : "answer"}
          />
        ))}
      </section>
    </figure>
  );
};

const MushroomGroupQuestion: React.FC<QuestionProps> = ({
  currentQuiz,
  handleAlternativeClicked,
}) => {
  const [clickedImage, setClickedImage] = useState<string | null>(null);

  return (
    <figure className="multiple-names-question">
      <img
        src={currentQuiz.correctAnswer.image}
        alt={`Valg`}
        className="quiz-image-question"
      />
      <div className="image-grid">
        <h1>{currentQuiz.questionMultipleNames}</h1>
        {currentQuiz.options.map((mushroom) => (
          <Button
            key={mushroom.name}
            label={mushroom.name}
            onClick={() => {
              handleAlternativeClicked(mushroom);
              setClickedImage(mushroom.name); // Track which image is clicked
            }}
            type={clickedImage === mushroom.name ? "answer-clicked" : "answer"}
          />
        ))}
      </div>
    </figure>
  );
};

export {
  MultiplePicturesQuestion,
  MultipleNamesQuestion,
  MushroomGroupQuestion,
};
