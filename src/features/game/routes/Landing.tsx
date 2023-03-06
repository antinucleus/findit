import React, {useState, useLayoutEffect} from 'react';
import {View, StyleSheet, TextInput} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {useWalletStore, useUserStore} from '@/stores';
import {PrivateRoutesScreenNavigationProp} from '@/types';
import {formatPublicKey, setUsername, resetStores} from '@/utils';
import {CustomButton} from '@/components';
import {Info} from '../components';

export const Landing = () => {
  const navigation = useNavigation<PrivateRoutesScreenNavigationProp>();
  const [input, setInput] = useState<string>();
  const {phantomWalletPublicKey} = useWalletStore();
  const {user, setUser} = useUserStore();

  useLayoutEffect(() => {
    if (user) {
      setInput(user);
    }
  }, []);

  const handleStartGame = async () => {
    if (!user && input) {
      try {
        console.log('saving');
        await setUsername(input);
        setUser(input);
      } catch (error) {
        console.log('Error:', error);
      }
    }

    resetStores();
    navigation.navigate('Main');
  };

  const handleUsernameChange = (text: string) => setInput(text);

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Info
          title="Wallet Address"
          content={formatPublicKey(phantomWalletPublicKey?.toBase58() || '')}
        />
        {user ? (
          <Info title="Username" content={input || ''} />
        ) : (
          <TextInput
            placeholderTextColor="#fff"
            style={styles.usernameTextInput}
            placeholder="Enter your username"
            value={input}
            onChangeText={handleUsernameChange}
          />
        )}
      </View>

      <View style={styles.buttonContainer}>
        <CustomButton
          disabled={!input}
          onPress={handleStartGame}
          title="Start"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  infoContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userInfoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    marginTop: 40,
  },
  usernameText: {
    fontSize: 20,
    color: '#fff',
    marginBottom: 5,
  },
  usernameTextInput: {
    fontFamily: 'CrimsonText-Regular',
    padding: 10,
    borderWidth: 1,
    width: 200,
    borderRadius: 10,
    margin: 10,
    borderColor: '#fff',
    color: '#fff',
  },
  walletInfoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  walletText: {
    fontSize: 20,
    color: '#fff',
    marginBottom: 5,
  },
});
