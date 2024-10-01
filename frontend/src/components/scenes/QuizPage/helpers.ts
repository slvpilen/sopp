import { Mushroom } from "@shared/types";

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

export { getInfoAboutMushrome };