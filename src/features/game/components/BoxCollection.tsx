import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';

import { Box } from './Box';
import { useBox, useHealth, useGameState } from '../stores';

type Props = {
  setColor: (id: string) => string;
};

export const BoxCollection = memo(({ setColor }: Props) => {
  const { rowArray, columnArray } = useBox();
  const { isDecreased } = useHealth();
  const { isStarted } = useGameState();

  return (
    <View style={styles.container}>
      {columnArray.map((c) => {
        return (
          <View key={`container-${c}`}>
            {rowArray.map((i) => {
              let id = String(c).concat(String(i));
              return (
                <Box
                  id={id}
                  key={`path-${id}`}
                  disableClick={!isStarted || isDecreased}
                  color={setColor(id)}
                />
              );
            })}
          </View>
        );
      })}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
});
