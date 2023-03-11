import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

import {useTime} from '../stores';

export const Timer = () => {
  const {time} = useTime();

  const [currentTime, setCurrentTime] = useState(time / 1000); // milliseconds to seconds
  const [timerDisplay, setTimerDisplay] = useState(true);

  const fontScale = useSharedValue(0);

  const fontAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{rotateY: `${fontScale.value}deg`}],
    };
  });

  function updateRemainingTime(remainingTime: number) {
    let currentRemainingTime = remainingTime;
    currentRemainingTime--;

    if (currentRemainingTime === 0) {
      setTimerDisplay(false);
    } else {
      setTimerDisplay(true);
    }
    setCurrentTime(currentRemainingTime);
    fontScale.value = withTiming(currentRemainingTime % 2 === 0 ? 360 : 0, {
      duration: 500,
    });
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      currentTime > 0 && updateRemainingTime(currentTime);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [currentTime]);

  return (
    <View style={{display: timerDisplay ? 'flex' : 'none'}}>
      <Animated.Text style={[styles.time, fontAnimatedStyle]}>
        {currentTime}
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  time: {
    fontFamily: 'lobstertwo',
    fontSize: 80,
    color: '#fff',
  },
});
