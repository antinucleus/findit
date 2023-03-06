import React from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import {CustomText} from './CustomText';

const WIDTH = Dimensions.get('window').width;
const size = WIDTH / 4;

type Props = {
  score: number;
};

export const Score = ({score}: Props) => {
  return (
    <View style={styles.container}>
      <CustomText style={styles.scoreText}>Your score</CustomText>
      <CustomText style={styles.scoreText}> {score} </CustomText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#fff',
    backgroundColor: 'transparent',
    borderRadius: size / 2,
    width: size,
    height: size,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scoreText: {
    color: '#fff',
    marginVertical: 3,
    fontSize: 16,
  },
});
