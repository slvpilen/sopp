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
  }

export interface MushroomGroup {
    name: string;
    description: string; 
  }