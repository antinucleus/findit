import {clusterApiUrl, PublicKey, Connection} from '@solana/web3.js';

const URI = 'findit://wallet';

export const PROGRAM_ID = new PublicKey(
  '8Ha1HELQHNZfHxjpkbbMn9Zuvc1VwAU82PeHEJPeLJAB',
);

export const NetworkName = 'devnet';
export const NETWORK = clusterApiUrl(NetworkName);
export const connection = new Connection(NETWORK);

export const onConnectRedirectLink = `${URI}/onConnect`;
export const onDisconnectRedirectLink = `${URI}/onDisconnect`;
export const onSignAndSendTransactionRedirectLink = `${URI}/onSignAndSendTransaction`;
