export interface Quiz {
    questionMultiplePicture: string;
    questionMultipleNames: string;
    options: Mushroom[];
    correctAnswer: Mushroom;
  }

export interface Mushroom {
    name: string;
    image: string;
    description: string;
    isPoisonous: boolean;
    isFood: boolean;
    needExtraHeat: boolean;
    /* Add more whn the times comes */
  }