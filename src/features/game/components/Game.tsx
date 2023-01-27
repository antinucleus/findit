/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Modal from 'react-native-modal';
import {View, Text, StyleSheet} from 'react-native';

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
import {CustomButton, Loading} from '@/components';
import {PrivateRoutesScreenNavigationProp} from '@/types';

export const Game = () => {
  const {selectedIds, setRowsColumns} = useBox();
  const {health} = useHealth();
  const {userSelections} = useUserSelections();
  const {isWin, setisWin} = useUserState();
  const {score, setScore} = useScore();
  const {setisStarted} = useGameState();
  const [showModal, setShowModal] = useState<boolean>(false);

  const navigation = useNavigation<PrivateRoutesScreenNavigationProp>();

  useEffect(() => {
    if (isWin) {
      setTimeout(() => {
        resetStores({health: true});

        setScore(score + 1);

        console.log({score});

        const data = levelData();

        if (data.columnCount === 0 && data.rowCount === 0) {
          setShowModal(true);
        } else {
          setRowsColumns(data);

          setisWin(false);
        }
      }, 100);
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

  const handleNavigateMain = () => navigation.navigate('Landing');

  return isWin ? (
    <Loading />
  ) : (
    <View>
      <Modal
        backdropColor="#CED4DA"
        backdropOpacity={0.7}
        animationIn="zoomInDown"
        animationOut="zoomOutUp"
        animationInTiming={2000}
        animationOutTiming={600}
        backdropTransitionInTiming={600}
        backdropTransitionOutTiming={600}
        isVisible={showModal}>
        <View style={styles.container}>
          <Text style={styles.winText}>You won!!</Text>
          <CustomButton title="Main Page" onPress={handleNavigateMain} />
        </View>
      </Modal>
      <Episode />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  winText: {
    color: '#000',
    fontSize: 22,
  },
});
