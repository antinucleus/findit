import React from 'react';
import {View, StyleSheet} from 'react-native';

import {Game, Health} from '../components';

export const Main = () => {
  return (
    <View style={styles.container}>
      <View style={styles.health}>
        <Health />
      </View>
      {/* <View style={styles.timer}>
        <Timer />
      </View> */}
      <View style={styles.game}>
        <Game />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
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
    flex: 1,
  },
  timer: {
    position: 'absolute',
    zIndex: 30,
    elevation: 30,
    left: 160,
    top: 100,
  },
});
