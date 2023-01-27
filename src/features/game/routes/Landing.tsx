import React, {useState, useLayoutEffect, useEffect} from 'react';
import {View, StyleSheet, Text, TextInput} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';

import {useWalletStore, useUserStore} from '@/stores';
import {PrivateRoutesScreenNavigationProp} from '@/types';
import {formatPublicKey, setUsername, resetStores} from '@/utils';
import {Chip} from '@/components';
import {CustomButton} from '@/components';

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
        <View style={styles.walletInfoContainer}>
          <Text style={styles.walletText}>Wallet Address</Text>
          <Chip>
            {formatPublicKey(phantomWalletPublicKey?.toBase58() || '')}
          </Chip>
        </View>
        <View style={styles.userInfoContainer}>
          <Text style={styles.usernameText}>Username</Text>
          {user ? (
            <Chip>{input || ''}</Chip>
          ) : (
            <TextInput
              style={styles.usernameTextInput}
              placeholder="Username"
              value={input}
              onChangeText={handleUsernameChange}
            />
          )}
        </View>
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
    backgroundColor: '#5390D9',
  },
  infoContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userInfoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  usernameText: {
    fontSize: 20,
    color: '#fff',
    marginBottom: 5,
  },
  usernameTextInput: {
    padding: 10,
    borderWidth: 1,
    width: 200,
    borderRadius: 10,
    margin: 10,
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
