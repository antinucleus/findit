import React, {useEffect, useState} from 'react';
import {View, Linking, Button} from 'react-native';
import nacl from 'tweetnacl';
import bs58 from 'bs58';
import {Connection, PublicKey} from '@solana/web3.js';

import {useWalletStore} from '@/stores';
import {decryptPayload, connectToWallet, showToast} from '@/utils';
import {NETWORK} from '@/config';

export const Login = () => {
  const connection = new Connection(NETWORK);
  const [deepLink, setDeepLink] = useState<string>('');
  const [dappKeyPair] = useState(nacl.box.keyPair());
  const [sharedSecret, setSharedSecret] = useState<Uint8Array>();
  const [session, setSession] = useState<string | undefined>();
  const {setPhantomWalletPublicKey} = useWalletStore();

  useEffect(() => {
    const getInitialUrl = async () => {
      const initialUrl = await Linking.getInitialURL();
      if (initialUrl) {
        setDeepLink(initialUrl);
      }
    };

    getInitialUrl();

    Linking.addEventListener('url', ({url}) => setDeepLink(url));

    return () => {
      Linking.removeAllListeners('url');
    };
  }, []);

  useEffect(() => {
    if (!deepLink) {
      return;
    }

    const url = new URL(deepLink);
    const params = url.searchParams;

    if (params.get('errorCode')) {
      const entries: {[k: string]: string} = Object.fromEntries([...params]);

      if (entries.errorCode === '4001') {
        showToast({
          title: 'Hata',
          description: 'Kullanıcı isteği reddetti',
          type: 'error',
        });

        return;
      }
    }

    if (/onConnect/.test(url.pathname)) {
      const sharedSecretDapp = nacl.box.before(
        bs58.decode(params.get('phantom_encryption_public_key')!),
        dappKeyPair.secretKey,
      );

      const connectData = decryptPayload(
        params.get('data')!,
        params.get('nonce')!,
        sharedSecretDapp,
      );

      setSharedSecret(sharedSecretDapp);
      setSession(connectData.session);
      setPhantomWalletPublicKey(new PublicKey(connectData.public_key));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deepLink]);

  const handleConnectToWallet = async () => {
    try {
      await connectToWallet(dappKeyPair);
    } catch (error) {
      console.log('Error occured:', error);
    }
  };

  return (
    <View style={{backgroundColor: '#743'}}>
      <Button title="connect" onPress={handleConnectToWallet} />
    </View>
  );
};
