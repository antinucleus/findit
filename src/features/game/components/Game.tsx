import React, {useEffect, useLayoutEffect} from 'react';

import {Episode} from './Episode';
import {useHealth, useUserSelections, useUserState, useBox} from '../stores';
import {resetStores} from '@/utils';

export const Game = () => {
  const {selectedIds, setRowsColumns} = useBox();
  const {health} = useHealth();
  const {userSelections} = useUserSelections();
  const {isWin, setisWin} = useUserState();

  // useEffect(() => {
  //   if (isWin) {
  //     resetStores();
  //     setRowsColumns({
  //       rowCount: 4,
  //       columnCount: 4,
  //       selectableBoxCount: 1,
  //       boxMargin: 10,
  //     });
  //     setisWin(false);
  //   }
  // }, [isWin]);

  useLayoutEffect(() => {
    setRowsColumns({
      rowCount: 5,
      columnCount: 5,
      selectableBoxCount: 6,
      boxMargin: 5,
    });
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
  return <Episode />;
};
