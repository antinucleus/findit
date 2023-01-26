import React from 'react';
import {View, StyleSheet} from 'react-native';

import {Game, Health, Timer} from '../components';

export const Main = () => {
  return (
    <View style={styles.container}>
      <View style={styles.health}>
        <Health />
      </View>
      <View style={styles.timer}>
        <Timer />
      </View>
      <View style={styles.game}>
        <Game />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#FFF',
    backgroundColor: '#c5c4ff',
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: 'gray',
  },
  health: {
    height: '10%',
  },
  game: {
    opacity: 1,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timer: {
    position: 'absolute',
    zIndex: 30,
    elevation: 30,
    left: 160,
    top: 100,
  },
});
