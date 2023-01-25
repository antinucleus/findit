import {create} from 'zustand';

type Secret = {
  auth: string | undefined;
  setAuth: (walletPubKey: string | undefined) => void;
};

export const useAuthStore = create<Secret>(set => ({
  auth: undefined,
  setAuth: (walletPubKey: string | undefined) => set({auth: walletPubKey}),
}));
