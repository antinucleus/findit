import {
  TransactionInstruction,
  SystemProgram,
  Transaction,
  PublicKey,
} from '@solana/web3.js';
import * as borsh from '@project-serum/borsh';

import {useWalletStore} from '@/stores';
import {connection, PROGRAM_ID} from '@/config';
import {showToast} from '@/utils';
import {SendData} from '@/types';

export const createTransferTransaction = async (data: SendData) => {
  const {phantomWalletPublicKey} = useWalletStore.getState();

  if (!phantomWalletPublicKey) {
    showToast({
      title: 'Error',
      description: 'Missing public key from user',
      type: 'error',
    });
    return;
  }

  const borshInstructionSchema = borsh.struct([
    borsh.u8('operation'),
    borsh.str('username'),
    borsh.u8('score'),
    borsh.str('time'),
  ]);

  const buffer = Buffer.alloc(1000);

  borshInstructionSchema.encode(
    {
      ...data,
      operation: 0,
    },
    buffer,
  );

  const slicedBuffer = buffer.slice(0, borshInstructionSchema.getSpan(buffer));

  const transaction = new Transaction();

  const [pda] = await PublicKey.findProgramAddress(
    [
      phantomWalletPublicKey.toBuffer(),
      Buffer.from(data.username),
      Buffer.from(data.time),
    ],
    PROGRAM_ID,
  );

  const instruction = new TransactionInstruction({
    keys: [
      {
        pubkey: phantomWalletPublicKey,
        isSigner: true,
        isWritable: false,
      },
      {
        pubkey: pda,
        isSigner: false,
        isWritable: true,
      },
      {
        pubkey: SystemProgram.programId,
        isSigner: false,
        isWritable: false,
      },
    ],
    data: slicedBuffer,
    programId: PROGRAM_ID,
  });

  transaction.add(instruction);

  transaction.feePayer = phantomWalletPublicKey;

  const anyTransaction: Transaction = transaction;

  anyTransaction.recentBlockhash = (
    await connection.getLatestBlockhash()
  ).blockhash;

  return transaction;
};
