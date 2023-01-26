import {clusterApiUrl, PublicKey, Connection} from '@solana/web3.js';

const URI = 'findit://wallet';

export const PROGRAM_ID = new PublicKey(
  '2HtmpzThK8Su7fUH47gaG7h3RzutF7Kb8W5bnY9vGA2P',
);

export const NetworkName = 'devnet';
export const NETWORK = clusterApiUrl(NetworkName);
export const connection = new Connection(NETWORK);

export const onConnectRedirectLink = `${URI}/onConnect`;
export const onDisconnectRedirectLink = `${URI}/onDisconnect`;
export const onSignAndSendTransactionRedirectLink = `${URI}/onSignAndSendTransaction`;
