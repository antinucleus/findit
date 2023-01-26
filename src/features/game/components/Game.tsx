import React, {useEffect, useLayoutEffect} from 'react';
import {View, Text} from 'react-native';

import {Episode} from './Episode';
import {
  useHealth,
  useUserSelections,
  useUserState,
  useBox,
  useScore,
} from '../stores';
import {resetStores, levelData} from '@/utils';

export const Game = () => {
  const {selectedIds, setRowsColumns} = useBox();
  const {health} = useHealth();
  const {userSelections} = useUserSelections();
  const {isWin, setisWin} = useUserState();
  const {score, setScore} = useScore();

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
  }, [setRowsColumns]);

  useEffect(() => {
    if (health === 0) {
      setisWin(false);
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
