import React from 'react';
import {StyleSheet, View, Text, Dimensions} from 'react-native';

const WIDTH = Dimensions.get('window').width;
const size = WIDTH / 4;

type Props = {
  score: number;
};

export const Score = ({score}: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.scoreText}>Your score</Text>
        <Text style={styles.scoreText}> {score} </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: size / 2,
    width: size,
    height: size,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    backgroundColor: '#000',
    borderRadius: size / 2,
    width: size - 4,
    height: size - 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scoreText: {
    color: '#fff',
    marginVertical: 3,
    fontSize: 16,
  },
});
