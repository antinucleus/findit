import React, {useState, useLayoutEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {useWalletStore, useUserStore} from '@/stores';
import {PrivateRoutesScreenNavigationProp} from '@/types';
import {formatPublicKey, setUsername, resetStores} from '@/utils';
import {Chip} from '../components';
import {CustomButton} from '@/components';

export const Landing = () => {
  const navigation = useNavigation<PrivateRoutesScreenNavigationProp>();
  const [input, setInput] = useState<string>();
  const {phantomWalletPublicKey} = useWalletStore();
  const {user} = useUserStore();

  useLayoutEffect(() => {
    if (user) {
      setInput(user);
    }
  }, []);

  const handleStartGame = async () => {
    if (!user && input) {
      try {
        await setUsername(input);
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
      <View style={styles.walletInfo}>
        <Text style={styles.walletText}>Wallet Address</Text>
        <Chip>
          {formatPublicKey(
            phantomWalletPublicKey?.toBase58() || 'Afklsejfj3r23klrjlkjflkj23r',
          )}
        </Chip>
      </View>
      {user ? (
        <Text>{input}</Text>
      ) : (
        <TextInput
          style={styles.usernameTextInput}
          placeholder="Username"
          value={input}
          onChangeText={handleUsernameChange}
        />
      )}

      <CustomButton disabled={!input} onPress={handleStartGame} title="Start" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#5390D9',
  },
  usernameTextInput: {
    padding: 10,
    borderWidth: 1,
    width: 200,
    borderRadius: 10,
    margin: 10,
  },
  walletInfo: {
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
