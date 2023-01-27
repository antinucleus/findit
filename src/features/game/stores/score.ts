import {create} from 'zustand';

type Score = {
  score: number;
};

type Actions = {
  setScore: (score: number) => void;
  reset: () => void;
};

const initialState: Score = {
  score: 0,
};

export const useScore = create<Score & Actions>(set => ({
  ...initialState,
  setScore: (score: number) => set({score}),
  reset: () => {
    set(initialState);
  },
}));
