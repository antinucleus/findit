/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useLayoutEffect} from 'react';
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
        resetStores({health: true});

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

      setTimeout(() => {
        navigation.navigate('Result');
      }, 500);
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

  useEffect(() => {
    navigation.addListener('beforeRemove', e => {
      e.preventDefault();
    });
  }, [navigation]);

  return isWin ? <Loading /> : <Episode />;
};
