import { Key, useState } from "react";
import Button from "../../shared/Button/Button";
import { Mushroom, MushroomGroup, QuesionGroup, Question } from "@shared/types";
import "./Question.css";

type QuestionProps = {
  questionType: QuestionType;
  question: Question;
  handleAlternativeClicked: (mushrom: Mushroom) => void;
};

type QuestionType = "multiplePictures" | "multipleNames" | "mushroomGroup";

const MultiplePicturesQuestion: React.FC<QuestionProps> = ({
  question,
  handleAlternativeClicked,
}) => {
  const [clickedImage, setClickedImage] = useState<string | null>(null);
  const [isCorrectClickedImage, setIsCorrectClickedImage] =
    useState<boolean>(false);

  return (
    <figure className="multiple-pictures-question">
      <h1>{question.questionMultiplePicture}</h1>
      <section className="image-grid">
        {question.options.map(
          (mushroom: Mushroom, index: Key | null | undefined) => (
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
                if (mushroom == question.correctAnswer) {
                  setIsCorrectClickedImage(true);
                } else {
                  setIsCorrectClickedImage(false);
                }
              }}
            />
          )
        )}
      </section>
    </figure>
  );
};

const MultipleNamesQuestion: React.FC<QuestionProps> = ({
  question,
  handleAlternativeClicked,
}) => {
  const [clickedImage, setClickedImage] = useState<string | null>(null);

  return (
    <figure className="multiple-names-question">
      <img
        src={question.correctAnswer.image}
        alt={`Valg`}
        className="quiz-image-question"
      />
      <section className="alternative-grid">
        <h1>{question.questionMultipleNames}</h1>
        {question.options.map((mushroom: Mushroom) => (
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

type QuestionGroupProps = {
  quesionGroup: QuesionGroup;
  handleAlternativeClicked: (mushroomGroup: MushroomGroup) => void;
};

const MushroomGroupQuestion: React.FC<QuestionGroupProps> = ({
  quesionGroup,
  handleAlternativeClicked,
}) => {
  const [clickedImage, setClickedImage] = useState<string | null>(null);

  return (
    <figure className="mushroom-group-question">
      <h1>{quesionGroup.correctMushroomGroup.description}</h1>
      <div className="image-grid">
        {quesionGroup.alternatives.map((mushroomGroup: MushroomGroup) => (
          <Button
            key={mushroomGroup.name}
            label={mushroomGroup.name}
            onClick={() => {
              handleAlternativeClicked(mushroomGroup);
              setClickedImage(mushroomGroup.name); // Track which image is clicked
            }}
            type={
              clickedImage === mushroomGroup.name ? "answer-clicked" : "answer"
            }
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
