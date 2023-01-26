import {create} from 'zustand';

type State = {
  isWin?: boolean;
};

type Actions = {
  setisWin: (win: boolean) => void;
  reset: () => void;
};

const initialState: State = {
  isWin: undefined,
};

export const useUserState = create<State & Actions>(set => ({
  ...initialState,
  setisWin: (isWin: boolean) => set({isWin}),
  reset: () => {
    set(initialState);
  },
}));
