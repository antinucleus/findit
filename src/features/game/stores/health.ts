import {create} from 'zustand';

type State = {
  health: number;
  isDecreased: boolean;
};

type Actions = {
  setIsDecreased: (isDecreased: boolean) => void;
  setHealth: (health: number) => void;
  increaseHealth: () => void;
  decreaseHealth: () => void;
  reset: () => void;
};

const initialState: State = {
  health: 3,
  isDecreased: false,
};

export const useHealth = create<State & Actions>(set => ({
  ...initialState,
  setHealth: (health: number) => set({health}),
  increaseHealth: () => set(state => ({health: state.health + 1})),
  decreaseHealth: () =>
    set(state => ({
      health: state.health > 0 ? state.health - 1 : state.health,
      isDecreased: false,
    })),
  setIsDecreased: (isDecreased: boolean) =>
    set({
      isDecreased,
    }),
  reset: () => {
    set(initialState);
  },
}));
