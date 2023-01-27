import React, {useEffect, useLayoutEffect, useState} from 'react';
import {View, Linking, StyleSheet, Text} from 'react-native';
import nacl from 'tweetnacl';
import bs58 from 'bs58';
import {PublicKey} from '@solana/web3.js';

import {
  useAuthStore,
  useWalletStore,
  useDeepLinkStore,
  useUserStore,
} from '@/stores';
import {decryptPayload, connectToWallet, showToast, getUsername} from '@/utils';
import {CustomButton, Chip, Loading} from '@/components';

export const Login = () => {
  const {dappKeyPair, setSharedSecret, setSession} = useAuthStore();
  const {deepLink, setDeepLink} = useDeepLinkStore();
  const {setPhantomWalletPublicKey} = useWalletStore();
  const {user, setUser} = useUserStore();
  const [loading, setLoading] = useState<boolean>(false);

  useLayoutEffect(() => {
    const get = async () => {
      const username = await getUsername();

      if (username) {
        setUser(username);
      }
    };

    get();
  }, []);

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
          title: 'Error',
          description: 'User rejected the request',
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

      showToast({
        title: 'Success',
        description: 'Connected to wallet',
        type: 'success',
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deepLink]);

  const handleConnectToWallet = async () => {
    setLoading(true);
    try {
      await connectToWallet(dappKeyPair);
      setLoading(false);
    } catch (error) {
      showToast({
        title: 'Error',
        description: 'Error occured while connectting to wallet',
        type: 'error',
      });
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Find It</Text>
      </View>
      {loading ? (
        <Loading />
      ) : (
        <View style={styles.bottomContainer}>
          {user ? (
            <View>
              <Text style={styles.welcomeText}>Welcome</Text>
              <Chip children={user || ''} />
            </View>
          ) : (
            <></>
          )}

          <CustomButton
            onPress={handleConnectToWallet}
            title="Connect to wallet"
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  bottomContainer: {
    flex: 2,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#023e8a',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  buttonContainer: {},
  container: {
    backgroundColor: '#0096c7',
    justifyContent: 'center',
    flex: 1,
  },
  title: {
    color: '#fff',
    fontSize: 25,
  },
  titleContainer: {
    flex: 1,
    backgroundColor: '#0096c7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    color: '#fff',
    fontSize: 25,
    marginVertical: 15,
  },
});
