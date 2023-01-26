import {create} from 'zustand';
import nacl from 'tweetnacl';

type Secret = {
  dappKeyPair: nacl.BoxKeyPair;
  sharedSecret?: Uint8Array;
  setSharedSecret: (sharedSecret: Uint8Array) => void;
  session?: string;
  setSession: (session: string) => void;
};

export const useAuthStore = create<Secret>(set => ({
  dappKeyPair: nacl.box.keyPair(),
  sharedSecret: undefined,
  setSharedSecret: (sharedSecret: Uint8Array) => set({sharedSecret}),
  session: undefined,
  setSession: (session: string) => set({session}),
}));
