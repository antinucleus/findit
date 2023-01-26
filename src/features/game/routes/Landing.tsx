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
import {formatPublicKey, setUsername} from '@/utils';
import {Chip} from '../components';

export const Landing = () => {
  const navigation = useNavigation<PrivateRoutesScreenNavigationProp>();
  const [input, setInput] = useState<string>();
  const {phantomWalletPublicKey} = useWalletStore();
  const {user} = useUserStore();
  const [loading, setLoading] = useState<boolean>(false);

  useLayoutEffect(() => {
    if (user) {
      setInput(user);
    }
  }, []);

  const handleGoInside = async () => {
    if (input) {
      try {
        await setUsername(input);
        navigation.navigate('Main');
      } catch (error) {
        console.log('Error:', error);
      }
    }
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

      <TouchableOpacity disabled={!input} onPress={handleGoInside}>
        <View
          style={[
            styles.textContainer,
            {backgroundColor: input ? '#00f' : '#343a40'},
          ]}>
          <Text style={styles.startText}>Start</Text>
        </View>
      </TouchableOpacity>
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
  startText: {
    fontSize: 18,
    color: '#FFF',
  },
  textContainer: {
    padding: 5,
    borderRadius: 10,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    marginBottom: 20,
    fontSize: 20,
    color: '#FFF',
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
