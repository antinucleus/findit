import {
  useBox,
  useBoxState,
  useGameState,
  useTime,
  useUserSelections,
  useUserState,
  useScore,
  useHealth,
} from '@/features/game/stores';

export const resetStores = () => {
  useBox.getState().reset();
  useBoxState.getState().reset();
  useGameState.getState().reset();
  useTime.getState().reset();
  useUserSelections.getState().reset();
  useUserState.getState().reset();
  useScore.getState().reset();
  useHealth.getState().reset();
};
