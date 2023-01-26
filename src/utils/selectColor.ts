import {useGameState, useUserSelections, useBox} from '@/features/game/stores';

let DEFAULT_COLOR: string = '#fff';
let SELECTED_COLOR: string = '#0f0';
let MARKED_COLOR: string = '#00f';

type Parameters = {
  id: string;
  colors?: {
    defaultColor: string;
    selectedColor: string;
    markedColor: string;
  };
};

export const selectColor = ({id, colors}: Parameters) => {
  if (colors) {
    const {defaultColor, markedColor, selectedColor} = colors;
    DEFAULT_COLOR = defaultColor;
    SELECTED_COLOR = selectedColor;
    MARKED_COLOR = markedColor;
  }

  const {isStarted} = useGameState.getState();
  const {userSelections} = useUserSelections.getState();
  const {selectedIds} = useBox.getState();

  return !isStarted
    ? selectedIds.includes(id)
      ? SELECTED_COLOR
      : DEFAULT_COLOR
    : userSelections.includes(id)
    ? MARKED_COLOR
    : DEFAULT_COLOR;
};
