import bs58 from 'bs58';
import {BoxKeyPair} from 'tweetnacl';
import {Linking} from 'react-native';

import {onConnectRedirectLink, NetworkName} from '@/config';
import {buildUrl} from './buildUrl';

export const connectToWallet = async (dappKeyPair: BoxKeyPair) => {
  const params = new URLSearchParams({
    dapp_encryption_public_key: bs58.encode(dappKeyPair.publicKey),
    cluster: NetworkName,
    app_url: 'https://phantom.app',
    redirect_link: onConnectRedirectLink,
  });

  const url = buildUrl('connect', params);
  Linking.openURL(url);
};
