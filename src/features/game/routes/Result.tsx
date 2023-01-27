import React, {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {useScore} from '../stores';
import {Loading, CustomButton} from '@/components';

export const Result = () => {
  const {score} = useScore();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.addListener('beforeRemove', e => {
      e.preventDefault();
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text>Score : {score} </Text>
      <CustomButton title="Save Score" />
      <Text>or</Text>
      <CustomButton title="Go Main Page" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
