import {clusterApiUrl, PublicKey, Connection} from '@solana/web3.js';

const URI = 'findit://wallet';

export const PROGRAM_ID = new PublicKey(
  'AXc2viiwUX2McnPookbCfrTdsKoCPtm71K7B4m6DpSmv',
);

export const NetworkName = 'devnet';
export const NETWORK = clusterApiUrl(NetworkName);
export const connection = new Connection(NETWORK);

export const onConnectRedirectLink = `${URI}/onConnect`;
export const onDisconnectRedirectLink = `${URI}/onDisconnect`;
export const onSignAndSendTransactionRedirectLink = `${URI}/onSignAndSendTransaction`;
export const onSignAllTransactionsRedirectLink = `${URI}/onSignAllTransactions`;
export const onSignTransactionRedirectLink = `${URI}/onSignTransaction`;
export const onSignMessageRedirectLink = `${URI}/onSignMessage`;
