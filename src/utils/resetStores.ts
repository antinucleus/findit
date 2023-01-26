import {
  useBox,
  useBoxState,
  useGameState,
  useHealth,
  useTime,
  useUserSelections,
  useUserState,
} from '@/features/game/stores';

export const resetStores = () => {
  useBox.getState().reset();
  useBoxState.getState().reset();
  useGameState.getState().reset();
  useHealth.getState().reset();
  useTime.getState().reset();
  useUserSelections.getState().reset();
  useUserState.getState().reset();
};
