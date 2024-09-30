// src/scenes/Quiz/utils/quizFactory.ts
import { Mushroom, Quiz } from "@shared/types";

/**
 * Shuffle array helper function to randomize options
 */
const shuffleArray = (array: any[]): any[] => {
  return array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
};

/**
 * Quiz factory that generates a quiz from an array of mushrooms
 * @param mushrooms Array of mushroom objects
 * @param optionsCount Number of options to present in the quiz (default is 4)
 * @returns A generated Quiz object
 */
export const generateQuiz = (mushrooms: Mushroom[], optionsCount = 4): Quiz => {
  if (mushrooms.length < optionsCount) {
    throw new Error("Not enough mushrooms to generate the quiz");
  }

  // Randomly select the correct mushroom
  const correctAnswer = mushrooms[Math.floor(Math.random() * mushrooms.length)];

  // Create a question
  const questionMultiplePicture = `Hvilken sopp er: ${correctAnswer.name}?`;
  const questionMultipleNames = `Hvilken sopp er dette?`;

  // Select random options including the correct one
  const shuffledMushrooms = shuffleArray(mushrooms);
  const options = shuffledMushrooms.slice(0, optionsCount);

  // Ensure the correct answer is in the options
  if (!options.includes(correctAnswer)) {
    options[Math.floor(Math.random() * options.length)] = correctAnswer;
  }

  // Shuffle options again to randomize the position of the correct answer
  const shuffledOptions = shuffleArray(options);

  return {
    questionMultiplePicture,
    questionMultipleNames,
    options: shuffledOptions,
    correctAnswer,
  };
};
