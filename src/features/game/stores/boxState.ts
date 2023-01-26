import {create} from 'zustand';

type State = {
  markedId: string;
};

type Actions = {
  setMarkedId: (markedId: string) => void;
  reset: () => void;
};

const initialState: State = {
  markedId: '',
};

export const useBoxState = create<State & Actions>(set => ({
  ...initialState,
  setMarkedId: (markedId: string) => set({markedId}),
  reset: () => {
    set(initialState);
  },
}));
