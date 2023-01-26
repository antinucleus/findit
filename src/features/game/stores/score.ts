import {create} from 'zustand';

type Score = {
  score: number;
  setScore: (score: number) => void;
};

export const useScore = create<Score>(set => ({
  score: 0,
  setScore: (score: number) => set({score}),
}));
