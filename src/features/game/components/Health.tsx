import React from 'react';
import { View, StyleSheet } from 'react-native';

import { Heart } from './Heart';

import { useHealth } from '../stores';

export const Health = () => {
  const { health } = useHealth();
  const TOTAL_HEALTH: number[] = Array.from(Array(health), (_, i) => i++);

  return (
    <View style={styles.container}>
      {TOTAL_HEALTH.map((i) => (
        <Heart id={i + 1} key={i} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    margin: 10,
  },
});
