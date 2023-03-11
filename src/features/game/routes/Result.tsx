import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Linking} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {useScore} from '../stores';
import {Score, CustomButton, CustomText} from '@/components';
import {useDeepLinkStore, useAuthStore, useUserStore} from '@/stores';
import {showToast, decryptPayload} from '@/utils';
import {signAndSendTransaction} from '../api';
import {SendData, PrivateRoutesScreenNavigationProp} from '@/types';

export const Result = () => {
  const navigation = useNavigation<PrivateRoutesScreenNavigationProp>();

  const {deepLink, setDeepLink} = useDeepLinkStore();
  const {sharedSecret} = useAuthStore();
  const {user} = useUserStore();
  const {score} = useScore();
  const [loading, setLoading] = useState<boolean>(false);
  const [saveScore, setSaveScore] = useState(false);

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

    if (params.get('errorCode') && saveScore) {
      const entries: {[k: string]: string} = Object.fromEntries([...params]);

      if (entries.errorCode === '4001') {
        showToast({
          title: 'Error',
          description: 'User rejected the request',
          type: 'error',
        });
        setSaveScore(false);
        setDeepLink('');

        return;
      }
    }

    if (/onSignAndSendTransaction/.test(url.pathname) && saveScore) {
      decryptPayload(params.get('data')!, params.get('nonce')!, sharedSecret);

      showToast({
        title: 'Success',
        description: 'Score saved successfully',
        type: 'success',
      });

      setSaveScore(false);
      setDeepLink('');

      setTimeout(() => {
        navigation.navigate('Landing');
      }, 1000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deepLink, saveScore]);

  const handleSendData = async () => {
    if (score && user) {
      setLoading(true);
      const data: SendData = {
        score,
        username: user,
        time: new Date().getTime().toString(),
      };

      try {
        setSaveScore(true);

        await signAndSendTransaction(data);
      } catch (error) {
        setSaveScore(false);
        showToast({
          title: 'Error',
          description: 'Error occured while sending transaction',
          type: 'error',
        });
      }
      setLoading(false);
    } else {
      setSaveScore(false);

      showToast({
        title: 'Missing information',
        description: 'Username or score are not found',
        type: 'error',
      });
      setLoading(false);
    }
  };

  const handleNavigateLandingPage = () => {
    navigation.navigate('Landing');
  };

  return (
    <View style={styles.container}>
      <View style={styles.scoreTextContainer}>
        <Score score={score} />
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton
          disabled={loading}
          onPress={handleSendData}
          title="Save score"
        />
        <CustomText style={styles.orText}>or</CustomText>
        <CustomButton
          disabled={loading}
          onPress={handleNavigateLandingPage}
          title="Go main page"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#000',
    flex: 1,
  },
  orText: {
    marginVertical: 10,
    color: '#fff',
    fontSize: 18,
  },
  scoreText: {
    color: '#fff',
    fontSize: 20,
  },
  scoreTextContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
