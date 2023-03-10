import React, {useState, useLayoutEffect, useEffect} from 'react';
import {View, StyleSheet, TextInput} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

import {useWalletStore, useUserStore} from '@/stores';
import {
  ICollectionNftData,
  INftData,
  PrivateRoutesScreenNavigationProp,
} from '@/types';
import {formatPublicKey, setUsername, resetStores} from '@/utils';
import {CustomButton, CustomText} from '@/components';
import {Info, ScoreList} from '../components';
import {connection} from '@/config';

import {
  Metaplex,
  keypairIdentity,
  bundlrStorage,
} from '@metaplex-foundation/js';
import {Keypair} from '@solana/web3.js';
// import {uploadMetadata} from '@/utils/uploadMetadata';
// import {createCollectionNft} from '@/utils/createCollectionNft';
// import {createNft} from '@/utils/createNft';

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

  const usernameTextInputColor = useSharedValue('#fff');
  const usernameTextInputAnimatedStyle = useAnimatedStyle(() => {
    return {
      borderBottomColor: usernameTextInputColor.value,
    };
  });

  useEffect(() => {
    setTimeout(() => {
      usernameTextInputColor.value = withRepeat(
        withTiming('#f80', {duration: 500}),
        10,
        true,
      );
    }, 300);
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

  const nftUse = async () => {
    const keypair = Keypair.generate();

    const metaplex = Metaplex.make(connection)
      .use(keypairIdentity(keypair))
      .use(
        bundlrStorage({
          address: 'https://devnet.bundlr.network',
          providerUrl: 'https://api.devnet.solana.com',
          timeout: 60000,
        }),
      );

    const collectionNftData: ICollectionNftData = {
      name: 'TestCollectionNFT',
      symbol: 'TEST',
      description: 'Test Description Collection',
      sellerFeeBasisPoints: 100,
      imageFile: 'success.png',
      isCollection: true,
      collectionAuthority: keypair,
    };

    const nftData: INftData = {
      name: 'Name',
      symbol: 'SYMBOL',
      description: 'Description',
      sellerFeeBasisPoints: 0,
      imageFile: 'img.png',
    };

    // example data for updating an existing NFT
    // const updateNftData: INftData = {
    //   name: 'Update',
    //   symbol: 'UPDATE',
    //   description: 'Update Description',
    //   sellerFeeBasisPoints: 100,
    //   imageFile: 'img.png',
    // };

    // upload the NFT data and get the URI for the metadata
    // const collectionUri = await uploadMetadata(metaplex, collectionNftData);

    // // create a collection NFT using the helper function and the URI from the metadata
    // const collectionNft = await createCollectionNft(
    //   metaplex,
    //   collectionUri,
    //   collectionNftData,
    // );

    // // upload the NFT data and get the URI for the metadata
    // const uri = await uploadMetadata(metaplex, nftData);

    // create an NFT using the helper function and the URI from the metadata
    // const nft = await createNft(
    //   metaplex,
    //   uri,
    //   nftData,
    //   collectionNft.mint.address,
    // );

    // // upload updated NFT data and get the new URI for the metadata
    // const updatedUri = await uploadMetadata(metaplex, updateNftData);
  };

  // phantomWalletPublicKey

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
          <>
            <TextInput
              placeholderTextColor="#fff"
              style={styles.usernameTextInput}
              placeholder="Enter your username"
              value={input}
              onChangeText={handleUsernameChange}
            />
            <Animated.View
              style={[usernameTextInputAnimatedStyle, styles.divider]}
            />
          </>
        )}
      </View>

      <View style={styles.scoreListContainer}>
        <CustomText style={styles.lastScoreLabel}>3 Highest Scores</CustomText>
        <ScoreList page={1} pageSize={3} />
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
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  divider: {
    borderWidth: 1,
    width: '50%',
  },
  infoContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lastScoreLabel: {
    fontSize: 18,
    marginBottom: 10,
  },
  scoreListContainer: {
    flex: 1,
    width: '100%',
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
    color: '#fff',
    borderColor: '#fff',
    // width: '100%',
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
