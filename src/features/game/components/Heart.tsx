import React, {useEffect} from 'react';

import {StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import {useHealth} from '../stores';

// TODO : Heart style shadow does not work properly on android
// fix shadow using elevation
type Props = {
  id: number;
};

export const Heart = ({id}: Props) => {
  const {health, isDecreased} = useHealth();

  const heartPosition = useSharedValue(0);

  const heartAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: heartPosition.value,
        },
      ],
    };
  });

  useEffect(() => {
    if (id === health && isDecreased) {
      heartPosition.value = withTiming(-100);
    }
  }, [id, health, heartPosition, isDecreased]);

  return (
    <Animated.View style={[heartAnimatedStyle]}>
      <Icon style={styles.heart} name="heart" color="red" size={40} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  heart: {
    marginHorizontal: 8,
    shadowColor: '#000',
    shadowRadius: 1,
    shadowOpacity: 0.5,
  },
});
