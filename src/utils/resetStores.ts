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

type Parameters = {
  health?: boolean;
};

export const resetStores = (params?: Parameters) => {
  useBox.getState().reset();
  useBoxState.getState().reset();
  useGameState.getState().reset();
  useTime.getState().reset();
  useUserSelections.getState().reset();
  useUserState.getState().reset();
  useScore.getState().reset();

  if (!params?.health) {
    useHealth.getState().reset();
  }
};
