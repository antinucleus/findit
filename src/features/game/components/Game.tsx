/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useLayoutEffect} from 'react';
import {View, Text} from 'react-native';
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
import {PrivateRoutesScreenNavigationProp} from '@/types';

export const Game = () => {
  const {selectedIds, setRowsColumns} = useBox();
  const {health} = useHealth();
  const {userSelections} = useUserSelections();
  const {isWin, setisWin} = useUserState();
  const {score, setScore} = useScore();
  const {setisStarted} = useGameState();

  const navigation = useNavigation<PrivateRoutesScreenNavigationProp>();

  useEffect(() => {
    if (isWin) {
      setTimeout(() => {
        resetStores();

        setScore(score + 1);

        console.log({score});

        const data = levelData();

        setRowsColumns(data);

        setisWin(false);

        console.log('Winner');
      }, 1000);
    }
  }, [isWin, score]);

  useLayoutEffect(() => {
    const data = levelData();

    setRowsColumns(data);
  }, [isWin]);

  useEffect(() => {
    if (health === 0) {
      setisWin(false);
      setisStarted(false);
      navigation.navigate('Landing');
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
    <View>
      <Text>Loading</Text>
    </View>
  ) : (
    <Episode />
  );
};
