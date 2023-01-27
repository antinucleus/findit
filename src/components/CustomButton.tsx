import React from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';

type Props = {
  title: string;
  onPress?: () => void;
  disabled?: boolean;
};

export const CustomButton = ({title, disabled, onPress}: Props) => {
  return (
    <TouchableOpacity disabled={disabled} onPress={onPress}>
      <View
        style={[
          styles.textContainer,
          {backgroundColor: disabled ? '#343a40' : '#00f'},
        ]}>
        <Text style={styles.title}>{title}</Text>
      </View>
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
    paddingVertical: 3,
  },
  title: {
    fontSize: 18,
    color: '#FFF',
  },
});
