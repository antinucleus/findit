import {create} from 'zustand';

type State = {
  isStarted: boolean;
};

type Actions = {
  setisStarted: (isStarted: boolean) => void;
  reset: () => void;
};

const initialState: State = {
  isStarted: false,
};

export const useGameState = create<State & Actions>(set => ({
  ...initialState,
  setisStarted: (isStarted: boolean) => set({isStarted}),
  reset: () => {
    set(initialState);
  },
}));
