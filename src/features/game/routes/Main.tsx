import React, {useEffect} from 'react';
import {View, Text} from 'react-native';

import {useDeepLinkStore, useAuthStore} from '@/stores';
import {showToast, decryptPayload} from '@/utils';
import {signAndSendTransaction} from '../api';
import {CustomButton} from '@/features/auth/components';
import {SendData} from '@/types';

export const Main = () => {
  const {deepLink} = useDeepLinkStore();
  const {sharedSecret} = useAuthStore();

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
          description: 'User rejected request',
          type: 'error',
        });

        return;
      }
    }

    if (/onSignAndSendTransaction/.test(url.pathname)) {
      const signAndSendTransactionData = decryptPayload(
        params.get('data')!,
        params.get('nonce')!,
        sharedSecret,
      );

      console.log(JSON.stringify(signAndSendTransactionData, null, 2));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deepLink]);

  const handleSignAndSendTransaction = async () => {
    // await signAndSendTransaction(data);
  };

  return (
    <View>
      <Text>Main</Text>
      <CustomButton onPress={() => {}} title="Send transaction" />
    </View>
  );
};
