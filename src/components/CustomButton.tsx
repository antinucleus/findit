import React from 'react';
import {TouchableOpacity, StyleSheet, StyleProp, ViewStyle} from 'react-native';
import Animated from 'react-native-reanimated';
import {CustomText} from './CustomText';

type Props = {
  title: string;
  onPress?: () => void;
  disabled?: boolean;
  style?: StyleProp<Animated.AnimateStyle<StyleProp<ViewStyle>>>;
};

export const CustomButton = ({style, title, disabled, onPress}: Props) => {
  return (
    <TouchableOpacity disabled={disabled} onPress={onPress}>
      <Animated.View
        style={[
          styles.textContainer,
          {backgroundColor: disabled ? '#343a40' : '#00f'},
          style,
        ]}>
        <CustomText style={styles.title}>{title}</CustomText>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    backgroundColor: 'blue',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 50,
    paddingVertical: 7,
  },
  title: {
    fontFamily: 'CrimsonText-Italic',
    fontSize: 19,
    color: '#FFF',
  },
});
