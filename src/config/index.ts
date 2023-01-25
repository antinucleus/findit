import {clusterApiUrl} from '@solana/web3.js';

const URI = 'findit://wallet';

export const NETWORK = clusterApiUrl('mainnet-beta');
export const onConnectRedirectLink = `${URI}/onConnect`;
export const onDisconnectRedirectLink = `${URI}/onDisconnect`;
export const onSignAndSendTransactionRedirectLink = `${URI}/onSignAndSendTransaction`;
export const onSignAllTransactionsRedirectLink = `${URI}/onSignAllTransactions`;
export const onSignTransactionRedirectLink = `${URI}/onSignTransaction`;
export const onSignMessageRedirectLink = `${URI}/onSignMessage`;
