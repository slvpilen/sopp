/*
* Question is a question about a single mushroom. One correct, multiple alternatives.
*/
export interface Question {
    questionMultiplePicture: string;
    questionMultipleNames: string;
    options: Mushroom[];
    correctAnswer: Mushroom;
  }

  /*
  * QuestionGroup is a question about a group of mushrooms. One correct, multiple alternatives.
  */
  export interface QuesionGroup {
    correctMushroomGroup: MushroomGroup;
    alternatives: MushroomGroup[];
  }

export interface Mushroom {
    name: string;
    image: string;
    description: string;
    isPoisonous: boolean;
    isFood: boolean;
    needExtraHeat: boolean;
  }

export interface MushroomGroup {
    name: string;
    description: string; 
  }