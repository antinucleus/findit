import React, {useEffect, useState} from 'react';
import {View, Text, Button} from 'react-native';
import {Keypair, Connection, clusterApiUrl} from '@solana/web3.js';

export const Register = () => {
  const [keypair, setKeypair] = useState<Keypair>(() => Keypair.generate());
  const randomKeypair = () => {
    setKeypair(() => Keypair.generate());
  };

  const [version, setVersion] = useState<any>('');
  useEffect(() => {
    const conn = new Connection(clusterApiUrl('devnet'));
    conn.getVersion().then(r => {
      setVersion(r);
    });
  }, []);
  return (
    <View>
      {version ? (
        <View>
          <Text>{JSON.stringify(version, null, 2)}</Text>
        </View>
      ) : null}
      {keypair ? (
        <View>
          <Text>{JSON.stringify(keypair?.publicKey?.toBase58(), null, 2)}</Text>
        </View>
      ) : null}
      <Button title="New Keypair" onPress={randomKeypair} />
    </View>
  );
};
