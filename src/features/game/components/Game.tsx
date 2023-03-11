/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {Episode} from './Episode';
import {
  useHealth,
  useUserSelections,
  useUserState,
  useBox,
  useScore,
  useGameState,
} from '../stores';
import {resetStores, levelData} from '@/utils';
import {Loading} from '@/components';
import {PrivateRoutesScreenNavigationProp} from '@/types';

export const Game = () => {
  const navigation = useNavigation<PrivateRoutesScreenNavigationProp>();

  const {selectedIds, setRowsColumns} = useBox();
  const {health} = useHealth();
  const {userSelections} = useUserSelections();
  const {isWin, setisWin} = useUserState();
  const {score, setScore} = useScore();
  const {setisStarted} = useGameState();

  useEffect(() => {
    if (isWin) {
      setTimeout(() => {
        resetStores({health: true});

        setScore(score + 1);

        console.log({score});

        const data = levelData();

        if (data.columnCount === 0 && data.rowCount === 0) {
          setTimeout(() => {
            navigation.navigate('Result');
          }, 200);
        }

        setisWin(false);
      }, 500);
    }
  }, [isWin, score]);

  useEffect(() => {
    const data = levelData();

    setRowsColumns(data);
  }, [isWin]);

  useEffect(() => {
    if (health === 0) {
      setisWin(false);
      setisStarted(false);

      setTimeout(() => {
        navigation.navigate('Result');
      }, 700);
    }
  }, [health, setisWin]);

  useEffect(() => {
    if (
      userSelections.length === selectedIds.length &&
      selectedIds.length > 0
    ) {
      setisWin(true);
    }
  }, [userSelections, setisWin, selectedIds, setRowsColumns]);

  return isWin ? (
    <View style={styles.loadingContainer}>
      <Loading />
    </View>
  ) : (
    <View style={styles.episodeContainer}>
      <Episode />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 0,
    flex: 1,
  },
  episodeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
