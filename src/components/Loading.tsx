import React from 'react';
import {View, ActivityIndicator, StyleSheet, Text} from 'react-native';

type Props = {
  info?: string;
};

export const Loading = ({info}: Props) => {
  return (
    <View>
      <ActivityIndicator size="large" color="#f80" />
      <Text style={styles.text}> {info ? info : 'Loading'} </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    marginTop: 5,
    fontSize: 18,
    color: '#fff',
  },
});
