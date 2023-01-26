import bs58 from 'bs58';
import {Linking} from 'react-native';

import {createTransferTransaction, encryptPayload, buildUrl} from '@/utils';
import {onSignAndSendTransactionRedirectLink} from '@/config';
import {useAuthStore} from '@/stores';

export const signAndSendTransaction = async () => {
  const {session, sharedSecret, dappKeyPair} = useAuthStore.getState();

  const transaction = await createTransferTransaction();

  const serializedTransaction = transaction.serialize({
    requireAllSignatures: false,
  });

  const payload = {
    session,
    transaction: bs58.encode(serializedTransaction),
  };

  const [nonce, encryptedPayload] = encryptPayload(payload, sharedSecret);

  const params = new URLSearchParams({
    dapp_encryption_public_key: bs58.encode(dappKeyPair.publicKey),
    nonce: bs58.encode(nonce),
    redirect_link: onSignAndSendTransactionRedirectLink,
    payload: bs58.encode(encryptedPayload),
  });

  console.log('Sending transaction...');
  const url = buildUrl('signAndSendTransaction', params);
  Linking.openURL(url);
};
