import React from 'react';
import {StyleProp, StyleSheet, Text, TextStyle} from 'react-native';

type Props = {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
};

export const CustomText = ({style, children}: Props) => {
  return <Text style={[styles.text, style]}> {children} </Text>;
};

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    fontFamily: 'CrimsonText-Regular',
  },
});
