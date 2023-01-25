import bs58 from 'bs58';
import {BoxKeyPair} from 'tweetnacl';
import {Linking} from 'react-native';

import {onDisconnectRedirectLink} from '@/config';
import {encryptPayload} from './encryptPayload';
import {buildUrl} from './buildUrl';

export const disconnectFromWallet = async (
  dappKeyPair: BoxKeyPair,
  sharedSecret?: Uint8Array,
  session?: string,
) => {
  const payload = {
    session,
  };
  const [nonce, encryptedPayload] = encryptPayload(payload, sharedSecret);

  const params = new URLSearchParams({
    dapp_encryption_public_key: bs58.encode(dappKeyPair.publicKey),
    nonce: bs58.encode(nonce),
    redirect_link: onDisconnectRedirectLink,
    payload: bs58.encode(encryptedPayload),
  });

  const url = buildUrl('disconnect', params);
  Linking.openURL(url);
};
