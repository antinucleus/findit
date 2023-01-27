import React, {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {useScore} from '../stores';
import {Loading, CustomButton} from '@/components';
import {useDeepLinkStore, useAuthStore, useUserStore} from '@/stores';
import {showToast, decryptPayload} from '@/utils';
import {signAndSendTransaction} from '../api';
import {SendData} from '@/types';

export const Result = () => {
  const navigation = useNavigation();

  const {deepLink} = useDeepLinkStore();
  const {sharedSecret} = useAuthStore();
  const {user} = useUserStore();
  const {score} = useScore();

  useEffect(() => {
    if (!deepLink) {
      return;
    }

    const url = new URL(deepLink);
    const params = url.searchParams;

    if (params.get('errorCode')) {
      console.log('Errr');
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

  useEffect(() => {
    navigation.addListener('beforeRemove', e => {
      e.preventDefault();
    });
  }, [navigation]);

  const handleSendData = async () => {
    if (score && user) {
      const data: SendData = {
        score,
        username: user,
        time: new Date().getTime().toString(),
      };
      console.log({data});

      try {
        await signAndSendTransaction(data);
      } catch (error) {
        console.log('Error : ', error);
      }
    } else {
      showToast({
        title: 'Missing information',
        description: 'Username or score are not fond',
        type: 'error',
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text>Score : {score} </Text>
      <CustomButton onPress={handleSendData} title="Save Score" />
      <Text>or</Text>
      <CustomButton title="Go Main Page" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
