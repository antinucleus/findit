import {TransactionInstruction, Transaction} from '@solana/web3.js';

import {useWalletStore} from '@/stores';
import {connection, PROGRAM_ID} from '@/config';

export const createTransferTransaction = async () => {
  const {phantomWalletPublicKey} = useWalletStore.getState();

  if (!phantomWalletPublicKey) {
    throw new Error('missing public key from user');
  }

  const transaction = new Transaction();

  const instruction = new TransactionInstruction({
    keys: [],
    programId: PROGRAM_ID,
  });

  transaction.add(instruction);

  transaction.feePayer = phantomWalletPublicKey;

  console.log('Getting recent blockhash');

  const anyTransaction: any = transaction;

  anyTransaction.recentBlockhash = (
    await connection.getLatestBlockhash()
  ).blockhash;

  return transaction;
};
