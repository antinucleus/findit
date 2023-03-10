import {create} from 'zustand';

type State = {
  time: number;
};

type Actions = {
  setTime: (time: number) => void;
  reset: () => void;
};

const initialState: State = {
  time: 1 * 1000, // 1000 ms
};

export const useTime = create<State & Actions>(set => ({
  ...initialState,
  setTime: (time: number) => set({time}),
  reset: () => {
    set(initialState);
  },
}));
