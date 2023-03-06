import React from 'react';
import {View, StyleSheet} from 'react-native';
import {CustomText} from './CustomText';

type Props = {
  children: string;
};

export const Chip = ({children}: Props) => {
  return (
    <View style={styles.container}>
      <CustomText style={styles.text}>{children}</CustomText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1d3557',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  text: {
    color: '#fff',
    fontSize: 20,
  },
});
