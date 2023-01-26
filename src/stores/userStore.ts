import {create} from 'zustand';

type User = {
  user?: string;
  setUser: (user: string) => void;
};

export const useUserStore = create<User>(set => ({
  user: undefined,
  setUser: (user: string) => set({user}),
}));
