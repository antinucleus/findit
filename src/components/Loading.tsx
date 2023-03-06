import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import {CustomText} from './CustomText';

type Props = {
  info?: string;
};

export const Loading = ({info}: Props) => {
  return (
    <View>
      <ActivityIndicator size="large" color="#f80" />
      <CustomText style={styles.text}> {info ? info : 'Loading'} </CustomText>
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
