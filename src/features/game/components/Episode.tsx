import React, { useEffect } from 'react';

import { BoxCollection } from './BoxCollection';
import {
  useHealth,
  useTime,
  useGameState,
  useBoxState,
  useUserSelections,
  useBox,
} from '../stores';
import { selectColor } from '@/utils';

export const Episode = () => {
  const { decreaseHealth, setIsDecreased } = useHealth();
  const { time } = useTime();
  const { isStarted, setisStarted } = useGameState();
  const { markedId } = useBoxState();
  const { userSelections, setUserSelections } = useUserSelections();
  const { selectedIds } = useBox();

  useEffect(() => {
    setTimeout(() => {
      if (!isStarted) {
        setisStarted(true);
      }
    }, time);
  }, [isStarted, setisStarted, time]);

  useEffect(() => {
    if (isStarted) {
      if (!selectedIds.includes(markedId)) {
        // TODO: Maybe user press the box under 300ms
        // so, user does not want to wait.
        // If selected id is wrong , immediately
        // decrease health. Find another solution
        // to show animation of Heart component

        setIsDecreased(true);
        setTimeout(() => {
          decreaseHealth();
        }, 300);
      } else {
        const currentUserSelections = [...userSelections];
        if (!currentUserSelections.includes(markedId)) {
          currentUserSelections.push(markedId);
          setUserSelections(currentUserSelections);
        }
      }
    }
  }, [markedId]);

  return <BoxCollection setColor={(id) => selectColor({ id })} />;
};
