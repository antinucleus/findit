import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

type Props = {
  children: string;
};

export const Chip = ({children}: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1d3557',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  text: {
    color: '#fff',
    fontSize: 12,
    textAlign: 'center',
  },
});
