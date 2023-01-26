import {create} from 'zustand';

type State = {
  userSelections: string[];
};

type Actions = {
  setUserSelections: (userSelections: string[]) => void;
  reset: () => void;
};

const initialState: State = {
  userSelections: [],
};

export const useUserSelections = create<State & Actions>(set => ({
  ...initialState,
  setUserSelections: (userSelections: string[]) => set({userSelections}),
  reset: () => {
    set(initialState);
  },
}));
