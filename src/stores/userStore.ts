import {create} from 'zustand';

type User = {
  username?: string;
  setUserName: (username: string) => void;
};

export const useUserStore = create<User>(set => ({
  username: undefined,
  setUserName: (username: string) => set({username}),
}));
