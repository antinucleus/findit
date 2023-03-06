import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from 'react-native';
import Animated from 'react-native-reanimated';

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
        <Text style={styles.title}>{title}</Text>
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
    fontSize: 16,
    color: '#FFF',
  },
});
