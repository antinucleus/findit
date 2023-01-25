import React from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';

type Props = {
  title: string;
  onPress: () => void;
};

export const CustomButton = ({title, onPress}: Props) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'blue',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  title: {
    color: '#fff',
  },
});
