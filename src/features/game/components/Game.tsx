/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import Modal from 'react-native-modal';
import {View, StyleSheet} from 'react-native';

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
import {Result} from './Result';

export const Game = () => {
  const {selectedIds, setRowsColumns} = useBox();
  const {health} = useHealth();
  const {userSelections} = useUserSelections();
  const {isWin, setisWin} = useUserState();
  const {score, setScore} = useScore();
  const {setisStarted} = useGameState();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (isWin) {
      setTimeout(() => {
        resetStores({health: true});

        setScore(score + 1);

        console.log({score});

        const data = levelData();

        if (data.columnCount === 0 && data.rowCount === 0) {
          setTimeout(() => {
            setShowModal(true);
          }, 700);
        } else {
          setRowsColumns(data);

          setisWin(false);
        }
      }, 100);
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
        setShowModal(true);
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
    <Loading />
  ) : (
    <>
      <Modal
        coverScreen
        style={styles.container}
        backdropColor="#444"
        backdropOpacity={0.7}
        animationIn="zoomInDown"
        animationOut="zoomOutUp"
        animationInTiming={2000}
        animationOutTiming={600}
        backdropTransitionInTiming={600}
        backdropTransitionOutTiming={600}
        isVisible={showModal}>
        <Result />
      </Modal>
      <View style={styles.episodeContainer}>
        <Episode />
      </View>
    </>
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
});
