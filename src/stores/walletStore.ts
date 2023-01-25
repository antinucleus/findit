import {create} from 'zustand';
import {PublicKey} from '@solana/web3.js';

type Wallet = {
  phantomWalletPublicKey: PublicKey | undefined;
  setPhantomWalletPublicKey: (pubKey: PublicKey) => void;
};

export const useWalletStore = create<Wallet>(set => ({
  phantomWalletPublicKey: undefined,
  setPhantomWalletPublicKey: (pubKey: PublicKey) =>
    set({phantomWalletPublicKey: pubKey}),
}));
