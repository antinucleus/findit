import {StyleSheet, TouchableHighlight, Dimensions} from 'react-native';
import React, {useEffect, useState} from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

import {useBoxState, useHealth, useBox} from '../stores';

const WINDOW_WIDTH = Dimensions.get('window').width;

type Props = {
  id: string;
  color?: string;
  disableClick: boolean;
};

export const Box = ({id, color, disableClick}: Props) => {
  const {markedId, setMarkedId} = useBoxState();
  const {health, isDecreased} = useHealth();
  const {boxHeight, boxWidth, boxMargin} = useBox();

  const [disableSelf, setDisableSelf] = useState(false);

  const boxScale = useSharedValue(1);
  const boxTranslate = useSharedValue(0);

  const boxAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scaleX: boxScale.value,
        },
        {
          scaleY: boxScale.value,
        },
        {translateX: boxTranslate.value},
      ],
    };
  });

  useEffect(() => {
    if (health === 0) {
      boxTranslate.value = withTiming(
        Number(id) % 2 === 0 ? -WINDOW_WIDTH : WINDOW_WIDTH,
        {
          duration: 1200,
        },
      );
    }

    if (isDecreased && markedId === id && boxScale.value === 1) {
      boxScale.value = withTiming(0, {duration: 300});
      setDisableSelf(true);
    }
  }, [isDecreased, boxScale, markedId, id, health, boxTranslate]);

  const handleOnPress = () => {
    setMarkedId(id);
  };

  return (
    <TouchableHighlight
      activeOpacity={0.3}
      underlayColor="#000"
      disabled={disableClick || disableSelf || health === 0}
      onPress={handleOnPress}
      style={[
        styles.container,
        {width: boxWidth, height: boxHeight, margin: boxMargin},
      ]}>
      <Animated.View
        style={[styles.inside, boxAnimatedStyle, {backgroundColor: color}]}
      />
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
  },
  inside: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 40,
  },
});
